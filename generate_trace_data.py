"""
generate_trace_data.py
Script tự động chạy các thuật toán từ edge.py, minpq.py, dijkstra_v2.py và floyd_v2.py,
sau đó xuất ra file data/trace_data.js gán vào biến toàn cục window.PRESENTATION_DATA.
Tất cả các bước chạy của DijkstraSP dùng IndexMinPQ (với insert / decrease_key)
và FloydWarshall (với ma trận khoảng cách _dist và ma trận truy vết _parent)
được lưu lại chi tiết, chính xác tuyệt đối.
"""

import json
import math
import copy
from typing import Any, List, Dict, Tuple, Optional

from edge import DirectedEdge, EdgeWeightedDigraph
from minpq import IndexMinPQ
from dijkstra_v2 import DijkstraSP
from floyd_v2 import FloydWarshall


def sanitize_value(val: Any) -> Any:
    """Chuyển đổi math.inf thành null và làm tròn số float cho JSON."""
    if isinstance(val, float):
        if math.isinf(val):
            return None
        return round(val, 2)
    elif isinstance(val, dict):
        return {k: sanitize_value(v) for k, v in val.items()}
    elif isinstance(val, (list, tuple)):
        return [sanitize_value(v) for v in val]
    return val


class InstrumentedDijkstra:
    """
    Theo dõi chi tiết từng bước thực thi của DijkstraSP kết hợp IndexMinPQ.
    Ghi nhận chính xác các lệnh pq.insert(w, dist) và pq.decrease_key(w, dist).
    """
    def __init__(self, G: EdgeWeightedDigraph, s: int, v_names: List[str]):
        self.G = G
        self.s = s
        self.v_names = v_names
        self.V = G.V
        self._edge_to: List[Optional[DirectedEdge]] = [None] * self.V
        self._dist_to: List[float] = [float('inf')] * self.V
        self._pq = IndexMinPQ(self.V)
        self.trace_steps: List[Dict[str, Any]] = []
        self.settled: List[int] = []

        # Bước 0: Khởi tạo nguồn
        self._dist_to[s] = 0.0
        self._pq.insert(s, 0.0)
        self._record_step(
            step_idx=0,
            phase="INIT",
            current_v=None,
            action_summary=f"Khởi tạo nguồn s = {v_names[s]}: gán _dist_to[{v_names[s]}] = 0.0, gọi pq.insert({v_names[s]}, 0.0).",
            relaxed_edges=[],
            decrease_keys=[]
        )

        # Các bước lặp rút đỉnh và nới lỏng
        step_counter = 1
        while not self._pq.is_empty():
            v = self._pq.del_min()
            self.settled.append(v)
            v_name = self.v_names[v]
            relaxed_edges: List[Dict[str, Any]] = []
            decrease_keys: List[str] = []

            for e in self.G.adj(v):
                u = e.from_vertex()
                w = e.to_vertex()
                weight = e.weight()
                w_name = self.v_names[w]
                edge_id = f"e_{self.v_names[u]}_{w_name}"
                new_dist = self._dist_to[u] + weight
                old_dist = self._dist_to[w]

                if new_dist < old_dist:
                    self._dist_to[w] = new_dist
                    self._edge_to[w] = e
                    if self._pq.contains(w):
                        action = "decrease_key"
                        self._pq.decrease_key(w, new_dist)
                        decrease_keys.append(w_name)
                        detail = f"pq.decrease_key({w_name}, {new_dist:.1f}): giảm từ {old_dist:.1f} xuống {new_dist:.1f}"
                    else:
                        action = "insert"
                        self._pq.insert(w, new_dist)
                        detail = f"pq.insert({w_name}, {new_dist:.1f})"
                    relaxed_edges.append({
                        "edge_id": edge_id,
                        "from": self.v_names[u],
                        "to": w_name,
                        "weight": weight,
                        "old_dist": None if math.isinf(old_dist) else old_dist,
                        "new_dist": new_dist,
                        "action": action,
                        "detail": detail,
                    })
                else:
                    relaxed_edges.append({
                        "edge_id": edge_id,
                        "from": self.v_names[u],
                        "to": w_name,
                        "weight": weight,
                        "old_dist": old_dist,
                        "new_dist": old_dist,
                        "action": "skip",
                        "detail": f"Bỏ qua: khoảng cách cũ {old_dist:.1f} <= đường mới {new_dist:.1f}"
                    })

            # Tóm tắt hành động
            if v == s:
                summary = f"Bước {step_counter}: pq.del_min() rút đỉnh nguồn {v_name} (dist={self._dist_to[v]:.1f}). Nới lỏng các cạnh kề, thêm vào IndexMinPQ."
            elif not self.G.adj(v):
                summary = f"Bước {step_counter}: pq.del_min() rút đỉnh {v_name} (dist={self._dist_to[v]:.1f}). Đỉnh không có cạnh đi ra. Hàng đợi rỗng."
            else:
                relax_strs = []
                for r in relaxed_edges:
                    if r["action"] == "decrease_key":
                        relax_strs.append(f"giảm {r['to']} ({r['old_dist']:.1f}→{r['new_dist']:.1f}) qua decrease_key")
                    elif r["action"] == "insert":
                        relax_strs.append(f"thêm {r['to']} ({r['new_dist']:.1f}) qua insert")
                summary = f"Bước {step_counter}: pq.del_min() rút đỉnh {v_name} (dist={self._dist_to[v]:.1f}). Nới lỏng: {', '.join(relax_strs) if relax_strs else 'các cạnh không cải thiện'}."

            self._record_step(
                step_idx=step_counter,
                phase="DEL_MIN",
                current_v=v,
                action_summary=summary,
                relaxed_edges=relaxed_edges,
                decrease_keys=decrease_keys
            )
            step_counter += 1

    def _record_step(self, step_idx: int, phase: str, current_v: Optional[int],
                     action_summary: str, relaxed_edges: List[Dict[str, Any]],
                     decrease_keys: List[str]):
        # Lấy danh sách phần tử trong IndexMinPQ
        pq_items = []
        for k in range(1, self._pq.n + 1):
            idx = self._pq.pq[k]
            pq_items.append({
                "vertex": self.v_names[idx],
                "idx": idx,
                "dist": self._pq.keys[idx],
                "heap_pos": k
            })
        pq_items.sort(key=lambda item: item["dist"])

        # Mảng dist_to dạng dict và list
        dist_dict = {self.v_names[i]: (None if math.isinf(self._dist_to[i]) else self._dist_to[i]) for i in range(self.V)}
        edge_dict = {}
        for i in range(self.V):
            e = self._edge_to[i]
            if e:
                edge_dict[self.v_names[i]] = {
                    "from": self.v_names[e.from_vertex()],
                    "to": self.v_names[e.to_vertex()],
                    "weight": e.weight(),
                    "edge_id": f"e_{self.v_names[e.from_vertex()]}_{self.v_names[e.to_vertex()]}"
                }
            else:
                edge_dict[self.v_names[i]] = None

        # Danh sách cạnh trong SPT
        spt_edges = [f"e_{self.v_names[e.from_vertex()]}_{self.v_names[e.to_vertex()]}" for e in self._edge_to if e is not None]

        self.trace_steps.append({
            "step_index": step_idx,
            "phase": phase,
            "current_vertex": self.v_names[current_v] if current_v is not None else None,
            "current_vertex_idx": current_v,
            "current_dist": None if current_v is None else self._dist_to[current_v],
            "settled_vertices": [self.v_names[i] for i in self.settled],
            "pq_snapshot": pq_items,
            "dist_to": dist_dict,
            "edge_to": edge_dict,
            "relaxed_edges": relaxed_edges,
            "decrease_key_nodes": decrease_keys,
            "spt_edges": spt_edges,
            "action_summary": action_summary
        })

    def get_path(self, v_idx: int) -> List[str]:
        if self._dist_to[v_idx] == float('inf'):
            return []
        path = []
        curr = v_idx
        while curr != self.s:
            e = self._edge_to[curr]
            if e is None:
                break
            path.append(self.v_names[curr])
            curr = e.from_vertex()
        path.append(self.v_names[self.s])
        path.reverse()
        return path


class InstrumentedFloydWarshall:
    """
    Theo dõi chi tiết từng bước k (0..V-1) của FloydWarshall.
    Ghi nhận snapshot của cả ma trận khoảng cách _dist và ma trận đỉnh đứng trước _parent.
    """
    def __init__(self, G: EdgeWeightedDigraph, v_names: List[str]):
        self.G = G
        self.V = G.V
        self.v_names = v_names
        self.trace_steps: List[Dict[str, Any]] = []

        # 1. Khởi tạo
        self._dist = [[float('inf')] * self.V for _ in range(self.V)]
        self._parent = [[-1] * self.V for _ in range(self.V)]

        for i in range(self.V):
            self._dist[i][i] = 0.0

        for u in range(self.V):
            for e in self.G.adj(u):
                v = e.to_vertex()
                w = e.weight()
                if w < self._dist[u][v]:
                    self._dist[u][v] = w
                    self._parent[u][v] = u

        # Ghi nhận Bước 0 (Khởi tạo từ đồ thị kề)
        self._record_step(
            step_idx=0,
            k=None,
            k_vertex=None,
            updated_cells=[],
            description="Khởi tạo ma trận ban đầu từ trọng số cạnh: _dist[i][j] = w(i, j) và _parent[i][j] = i."
        )

        # 2. Các bước lặp k từ 0 đến V-1
        for k in range(self.V):
            k_name = self.v_names[k]
            updated_cells = []

            for i in range(self.V):
                for j in range(self.V):
                    if self._dist[i][k] != float('inf') and self._dist[k][j] != float('inf'):
                        new_dist = self._dist[i][k] + self._dist[k][j]
                        if new_dist < self._dist[i][j]:
                            old_dist = self._dist[i][j]
                            old_parent = self._parent[i][j]
                            self._dist[i][j] = new_dist
                            self._parent[i][j] = self._parent[k][j]
                            updated_cells.append({
                                "i": self.v_names[i],
                                "j": self.v_names[j],
                                "i_idx": i,
                                "j_idx": j,
                                "old_dist": None if math.isinf(old_dist) else old_dist,
                                "new_dist": new_dist,
                                "old_parent": self.v_names[old_parent] if old_parent != -1 else "-",
                                "new_parent": self.v_names[self._parent[i][j]],
                                "formula": f"D[{self.v_names[i]}][{self.v_names[j]}] = min({old_dist if not math.isinf(old_dist) else '∞'}, D[{self.v_names[i]}][{k_name}] + D[{k_name}][{self.v_names[j]}]) = {new_dist:.1f}"
                            })

            if updated_cells:
                updates_str = ", ".join([f"({u['i']}→{u['j']}: {u['new_dist']:.1f})" for u in updated_cells])
                desc = f"Bước k = {k} (xét đỉnh trung gian {k_name}): Cập nhật tối ưu {len(updated_cells)} ô [{updates_str}]. Gán _parent[i][j] = _parent[{k_name}][j]."
            else:
                desc = f"Bước k = {k} (xét đỉnh trung gian {k_name}): Không có đường đi nào qua đỉnh {k_name} ngắn hơn đường hiện tại. Ma trận giữ nguyên."

            self._record_step(
                step_idx=k + 1,
                k=k,
                k_vertex=k_name,
                updated_cells=updated_cells,
                description=desc
            )

    def _record_step(self, step_idx: int, k: Optional[int], k_vertex: Optional[str],
                     updated_cells: List[Dict[str, Any]], description: str):
        # Sao chép ma trận khoảng cách và ma trận parent
        dist_copy = copy.deepcopy(self._dist)
        parent_copy = copy.deepcopy(self._parent)

        # Chuyển parent indices sang tên đỉnh hoặc "-"
        parent_labels = []
        for row in parent_copy:
            parent_labels.append([self.v_names[idx] if idx != -1 else "-" for idx in row])

        self.trace_steps.append({
            "step_index": step_idx,
            "k": k,
            "k_vertex": k_vertex,
            "dist_matrix": sanitize_value(dist_copy),
            "parent_matrix": parent_copy,
            "parent_labels_matrix": parent_labels,
            "updated_cells": updated_cells,
            "description": description
        })

    def has_negative_cycle(self) -> bool:
        for i in range(self.V):
            if self._dist[i][i] < 0:
                return True
        return False

    def get_path(self, u: int, v: int) -> List[str]:
        if self._dist[u][v] == float('inf'):
            return []
        if u == v:
            return [self.v_names[u]]
        path = []
        curr = v
        while curr != -1:
            path.append(self.v_names[curr])
            if curr == u:
                break
            curr = self._parent[u][curr]
        if path[-1] != self.v_names[u]:
            return []
        path.reverse()
        return path


def build_data() -> Dict[str, Any]:
    # -------------------------------------------------------------
    # 1. Đồ thị mẫu 5 đỉnh (A, B, C, D, E)
    # -------------------------------------------------------------
    vertices_5 = ["A", "B", "C", "D", "E"]
    v5_to_idx = {name: i for i, name in enumerate(vertices_5)}
    V5 = len(vertices_5)

    edges_5_defs = [
        {"id": "e_A_B", "source": "A", "target": "B", "weight": 5.0, "curve": 0},
        {"id": "e_A_C", "source": "A", "target": "C", "weight": 2.0, "curve": 0},
        {"id": "e_C_B", "source": "C", "target": "B", "weight": 1.0, "curve": 0},
        {"id": "e_B_D", "source": "B", "target": "D", "weight": 4.0, "curve": 0},
        {"id": "e_C_D", "source": "C", "target": "D", "weight": 7.0, "curve": 0},
        {"id": "e_C_E", "source": "C", "target": "E", "weight": 9.0, "curve": 0.2},
        {"id": "e_D_E", "source": "D", "target": "E", "weight": 3.0, "curve": 0},
        {"id": "e_B_E", "source": "B", "target": "E", "weight": 8.0, "curve": -0.2},
    ]

    nodes_5_layout = [
        {"id": "A", "label": "A", "x": 120, "y": 250, "role": "source"},
        {"id": "B", "label": "B", "x": 340, "y": 130, "role": "normal"},
        {"id": "C", "label": "C", "x": 340, "y": 370, "role": "normal"},
        {"id": "D", "label": "D", "x": 580, "y": 180, "role": "normal"},
        {"id": "E", "label": "E", "x": 780, "y": 250, "role": "target"},
    ]

    # Xây dựng EdgeWeightedDigraph cho đồ thị 5 đỉnh
    G5 = EdgeWeightedDigraph(V5)
    for e in edges_5_defs:
        G5.add_edge(DirectedEdge(v5_to_idx[e["source"]], v5_to_idx[e["target"]], e["weight"]))

    # Chạy DijkstraSP có lưu trace (kết hợp IndexMinPQ)
    dijkstra_tracer_5 = InstrumentedDijkstra(G5, v5_to_idx["A"], vertices_5)
    dijkstra_dist_5 = {vertices_5[i]: sanitize_value(dijkstra_tracer_5._dist_to[i]) for i in range(V5)}
    dijkstra_paths_5 = {}
    for v_name in vertices_5:
        dijkstra_paths_5[v_name] = {
            "path": dijkstra_tracer_5.get_path(v5_to_idx[v_name]),
            "distance": dijkstra_dist_5[v_name]
        }

    # Chạy FloydWarshall có lưu trace (_dist và _parent)
    fw_tracer_5 = InstrumentedFloydWarshall(G5, vertices_5)
    fw_paths_5 = {}
    for u_name in vertices_5:
        fw_paths_5[u_name] = {}
        for v_name in vertices_5:
            u_idx = v5_to_idx[u_name]
            v_idx = v5_to_idx[v_name]
            fw_paths_5[u_name][v_name] = {
                "path": fw_tracer_5.get_path(u_idx, v_idx),
                "distance": sanitize_value(fw_tracer_5._dist[u_idx][v_idx])
            }

    # -------------------------------------------------------------
    # 2. Đồ thị Hệ thống Điều phối Cấp cứu Đô thị 6 địa điểm
    # -------------------------------------------------------------
    locations_6 = ["H1", "H2", "R1", "R2", "R3", "R4"]
    loc_to_idx = {name: i for i, name in enumerate(locations_6)}
    V6 = len(locations_6)

    location_details = {
        "H1": {"name": "Bệnh viện Đa khoa Trung tâm", "type": "hospital", "color": "#ef4444"},
        "H2": {"name": "Trạm Cấp cứu Vệ tinh Nam", "type": "hospital", "color": "#ef4444"},
        "R1": {"name": "Khu Đô thị Cổ", "type": "residential", "color": "#06b6d4"},
        "R2": {"name": "Khu Đô thị Mới phía Đông", "type": "residential", "color": "#06b6d4"},
        "R3": {"name": "Khu Công nghệ cao phía Tây", "type": "residential", "color": "#06b6d4"},
        "R4": {"name": "Khu Dân cư Ven sông", "type": "residential", "color": "#06b6d4"},
    }

    nodes_6_layout = [
        {"id": "H1", "label": "H1 (Trung tâm)", "x": 150, "y": 150, "type": "hospital"},
        {"id": "H2", "label": "H2 (Vệ tinh)", "x": 150, "y": 380, "type": "hospital"},
        {"id": "R1", "label": "R1 (Phố Cổ)", "x": 380, "y": 120, "type": "residential"},
        {"id": "R2", "label": "R2 (KĐT Mới)", "x": 620, "y": 170, "type": "residential"},
        {"id": "R3", "label": "R3 (Khu CNC)", "x": 420, "y": 370, "type": "residential"},
        {"id": "R4", "label": "R4 (Ven sông)", "x": 700, "y": 370, "type": "residential"},
    ]

    edges_6_defs = [
        {"id": "em_H1_R1", "source": "H1", "target": "R1", "weight": 4.0},
        {"id": "em_H1_R2", "source": "H1", "target": "R2", "weight": 6.0},
        {"id": "em_R1_R2", "source": "R1", "target": "R2", "weight": 3.0},
        {"id": "em_R1_R3", "source": "R1", "target": "R3", "weight": 8.0},
        {"id": "em_R2_R3", "source": "R2", "target": "R3", "weight": 4.0},
        {"id": "em_R2_R4", "source": "R2", "target": "R4", "weight": 12.0},
        {"id": "em_R3_R4", "source": "R3", "target": "R4", "weight": 5.0},
        {"id": "em_H2_R3", "source": "H2", "target": "R3", "weight": 6.0},
        {"id": "em_H2_R4", "source": "H2", "target": "R4", "weight": 7.0},
        {"id": "em_R4_R1", "source": "R4", "target": "R1", "weight": 15.0},
    ]

    G6 = EdgeWeightedDigraph(V6)
    for e in edges_6_defs:
        G6.add_edge(DirectedEdge(loc_to_idx[e["source"]], loc_to_idx[e["target"]], e["weight"]))

    # Dijkstra từ H1
    d_h1 = InstrumentedDijkstra(G6, loc_to_idx["H1"], locations_6)
    dist_h1 = {locations_6[i]: d_h1._dist_to[i] for i in range(V6)}

    # Dijkstra từ H2
    d_h2 = InstrumentedDijkstra(G6, loc_to_idx["H2"], locations_6)
    dist_h2 = {locations_6[i]: d_h2._dist_to[i] for i in range(V6)}

    # Floyd-Warshall trên đồ thị 6 địa điểm
    fw_emergency = InstrumentedFloydWarshall(G6, locations_6)

    # LeetCode 743 - Network Delay Time (từ H1 tới 4 khu dân cư)
    res_areas = ["R1", "R2", "R3", "R4"]
    delays_h1 = {r: dist_h1[r] for r in res_areas}
    max_delay_h1 = max(delays_h1.values()) if all(d != float('inf') for d in delays_h1.values()) else -1

    # LeetCode 1334 - Đánh giá Vị trí Trạm Cấp cứu (Threshold <= 15 phút)
    threshold = 15.0
    candidate_evaluations = []
    candidates = ["H1", "H2", "R1", "R2", "R3"]
    for c in candidates:
        c_idx = loc_to_idx[c]
        times = {r: fw_emergency._dist[c_idx][loc_to_idx[r]] for r in res_areas}
        covered = [r for r, t in times.items() if t <= threshold]
        max_time = max(times.values())
        candidate_evaluations.append({
            "hub": c,
            "name": location_details[c]["name"],
            "covered_areas": covered,
            "covered_count": len(covered),
            "total_residential": len(res_areas),
            "is_fully_covered": len(covered) == len(res_areas),
            "times_to_residential": sanitize_value(times),
            "worst_case_time": sanitize_value(max_time),
        })

    candidate_evaluations.sort(key=lambda x: (-x["covered_count"], x["worst_case_time"]))
    best_hub = candidate_evaluations[0]

    # -------------------------------------------------------------
    # 3. Đồ thị Phản ví dụ 3 đỉnh có cạnh trọng số âm (Dijkstra thất bại)
    # -------------------------------------------------------------
    counter_nodes = [
        {"id": "A", "label": "A (Nguồn)", "x": 150, "y": 200},
        {"id": "B", "label": "B (Đích)", "x": 480, "y": 140},
        {"id": "C", "label": "C (Cầu nối)", "x": 300, "y": 320},
    ]
    counter_edges = [
        {"id": "ce_A_B", "source": "A", "target": "B", "weight": 1.0},
        {"id": "ce_A_C", "source": "A", "target": "C", "weight": 4.0},
        {"id": "ce_C_B", "source": "C", "target": "B", "weight": -5.0},
    ]

    counter_explanation = {
        "dijkstra_result": {
            "path": ["A", "B"],
            "reported_dist": 1.0,
            "error_reason": "Dijkstra tham lam chốt đỉnh B ngay bước đầu tiên với dist=1 vì 1 < 4 (khoảng cách tới C). Khi xét tiếp đỉnh C, cạnh C->B có trọng số -5 giúp đường đi A->C->B chỉ tốn 4 + (-5) = -1. Nhưng vì B đã bị đánh dấu đã chốt (settled), Dijkstra không quay lại cập nhật, dẫn tới kết quả sai hoàn toàn!",
        },
        "optimal_truth": {
            "path": ["A", "C", "B"],
            "actual_dist": -1.0,
            "correct_algorithm": "Floyd-Warshall hoặc Bellman-Ford",
        }
    }

    # -------------------------------------------------------------
    # Gói toàn bộ dữ liệu vào Object tổng thể
    # -------------------------------------------------------------
    presentation_data = {
        "metadata": {
            "title": "Thuật toán tìm đường đi ngắn nhất: Dijkstra và Floyd-Warshall",
            "version": "2.1.0",
            "generated_at": "2026-10-25",
            "author": "DSA Academic Teaching & Engineering Team",
            "architecture": "EdgeWeightedDigraph + IndexMinPQ + DijkstraSP + FloydWarshall (_parent)",
        },
        "sample_graph_5": {
            "vertices": vertices_5,
            "nodes_layout": nodes_5_layout,
            "edges": edges_5_defs,
            "dijkstra": {
                "source": "A",
                "final_dist": dijkstra_dist_5,
                "paths": dijkstra_paths_5,
                "trace_steps": dijkstra_tracer_5.trace_steps,
            },
            "floyd_warshall": {
                "vertices": vertices_5,
                "has_negative_cycle": fw_tracer_5.has_negative_cycle(),
                "final_dist_matrix": sanitize_value(fw_tracer_5._dist),
                "final_parent_matrix": fw_tracer_5._parent,
                "paths": fw_paths_5,
                "trace_steps": fw_tracer_5.trace_steps,
            }
        },
        "emergency_system": {
            "locations": locations_6,
            "location_details": location_details,
            "nodes_layout": nodes_6_layout,
            "edges": edges_6_defs,
            "residential_areas": res_areas,
            "dispatch_to_r4": {
                "target": "R4",
                "from_h1": {
                    "distance": sanitize_value(dist_h1["R4"]),
                    "path": d_h1.get_path(loc_to_idx["R4"]),
                },
                "from_h2": {
                    "distance": sanitize_value(dist_h2["R4"]),
                    "path": d_h2.get_path(loc_to_idx["R4"]),
                },
                "winner": "H2" if dist_h2["R4"] < dist_h1["R4"] else "H1",
                "saved_time": abs(dist_h1["R4"] - dist_h2["R4"]),
            },
            "network_delay_leetcode_743": {
                "source": "H1",
                "residential_delays": sanitize_value(delays_h1),
                "total_delay": sanitize_value(max_delay_h1),
                "all_reachable": max_delay_h1 != -1,
            },
            "hub_placement_leetcode_1334": {
                "threshold_minutes": threshold,
                "evaluations": candidate_evaluations,
                "optimal_hub": best_hub,
            },
            "dijkstra_h1_trace": d_h1.trace_steps,
            "dijkstra_h2_trace": d_h2.trace_steps,
            "floyd_warshall_trace": fw_emergency.trace_steps,
            "apsp_matrix": sanitize_value(fw_emergency._dist),
            "apsp_parent_matrix": fw_emergency._parent,
        },
        "counterexample_negative": {
            "nodes_layout": counter_nodes,
            "edges": counter_edges,
            "analysis": counter_explanation,
        }
    }

    return presentation_data


def export_to_javascript(filepath: str = "data/trace_data.js"):
    data = build_data()
    json_str = json.dumps(data, indent=2, ensure_ascii=False)
    js_content = f"/**\n * trace_data.js\n * Dữ liệu vết thực thi thuật toán sinh tự động từ edge.py, minpq.py, dijkstra_v2.py, floyd_v2.py\n * Cập nhật: 2026-10-25\n */\nwindow.PRESENTATION_DATA = {json_str};\n"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Xuất file thành công: {filepath}")
    print(f"Tổng số bước Dijkstra mẫu 5 đỉnh: {len(data['sample_graph_5']['dijkstra']['trace_steps'])} (Khởi tạo + 5 bước del_min)")
    print(f"Tổng số trạng thái Floyd-Warshall mẫu 5 đỉnh: {len(data['sample_graph_5']['floyd_warshall']['trace_steps'])} (Khởi tạo + 5 bước k)")


if __name__ == "__main__":
    export_to_javascript()
