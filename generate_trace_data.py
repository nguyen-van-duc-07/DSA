"""
generate_trace_data.py
Script tự động chạy các thuật toán từ shortest_path_solvers.py và smart_emergency_system.py,
sau đó xuất ra file data/trace_data.js gán vào biến toàn cục window.PRESENTATION_DATA.
"""

import json
import math
from typing import Any
from shortest_path_solvers import DijkstraSolver, FloydWarshallSolver

def sanitize_value(val: Any) -> Any:
    """Chuyển đổi math.inf thành null (hoặc 'INF') và chuẩn hóa dữ liệu cho JSON."""
    if isinstance(val, float):
        if math.isinf(val):
            return None
        return round(val, 2)
    elif isinstance(val, dict):
        return {k: sanitize_value(v) for k, v in val.items()}
    elif isinstance(val, (list, tuple)):
        return [sanitize_value(v) for v in val]
    return val

def build_data():
    # -------------------------------------------------------------
    # 1. Đồ thị mẫu 5 đỉnh (A, B, C, D, E)
    # -------------------------------------------------------------
    vertices_5 = ["A", "B", "C", "D", "E"]
    edges_5 = [
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

    # Chạy Dijkstra trên đồ thị 5 đỉnh
    dijkstra_5 = DijkstraSolver(vertices_5)
    for e in edges_5:
        dijkstra_5.add_edge(e["source"], e["target"], e["weight"])
    dijkstra_dist_5 = dijkstra_5.solve("A")
    dijkstra_trace_5 = dijkstra_5.trace_steps

    # Tái tạo lộ trình cho mọi đỉnh từ A
    dijkstra_paths_5 = {}
    for v in vertices_5:
        dijkstra_paths_5[v] = {
            "path": dijkstra_5.get_path("A", v),
            "distance": sanitize_value(dijkstra_dist_5[v])
        }

    # Chạy Floyd-Warshall trên đồ thị 5 đỉnh
    fw_5 = FloydWarshallSolver(vertices_5)
    for e in edges_5:
        fw_5.add_edge(e["source"], e["target"], e["weight"])
    fw_5.solve()
    fw_trace_5 = fw_5.trace_steps
    fw_has_neg_cycle_5 = fw_5.detect_negative_cycle()

    # Tái tạo lộ trình Floyd-Warshall giữa mọi cặp
    fw_paths_5 = {}
    for u in vertices_5:
        fw_paths_5[u] = {}
        for v in vertices_5:
            fw_paths_5[u][v] = {
                "path": fw_5.get_path(u, v),
                "distance": sanitize_value(fw_5.dist[fw_5.v_to_idx[u]][fw_5.v_to_idx[v]])
            }

    # -------------------------------------------------------------
    # 2. Đồ thị Hệ thống Điều phối Cấp cứu Đô thị 6 địa điểm
    # -------------------------------------------------------------
    locations_6 = ["H1", "H2", "R1", "R2", "R3", "R4"]
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
    edges_6 = [
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

    # Dijkstra từ H1
    d_h1 = DijkstraSolver(locations_6)
    for e in edges_6:
        d_h1.add_edge(e["source"], e["target"], e["weight"])
    dist_h1 = d_h1.solve("H1")
    trace_h1 = d_h1.trace_steps

    # Dijkstra từ H2
    d_h2 = DijkstraSolver(locations_6)
    for e in edges_6:
        d_h2.add_edge(e["source"], e["target"], e["weight"])
    dist_h2 = d_h2.solve("H2")
    trace_h2 = d_h2.trace_steps

    # Floyd-Warshall trên đồ thị 6 địa điểm
    fw_emergency = FloydWarshallSolver(locations_6)
    for e in edges_6:
        fw_emergency.add_edge(e["source"], e["target"], e["weight"])
    fw_emergency.solve()

    # LeetCode 743 - Network Delay Time (từ H1 tới 4 khu dân cư)
    res_areas = ["R1", "R2", "R3", "R4"]
    delays_h1 = {r: dist_h1[r] for r in res_areas}
    max_delay_h1 = max(delays_h1.values()) if all(d != math.inf for d in delays_h1.values()) else -1

    # LeetCode 1334 - Đánh giá Vị trí Trạm Cấp cứu (Threshold <= 15 phút)
    threshold = 15.0
    candidate_evaluations = []
    candidates = ["H1", "H2", "R1", "R2", "R3"]
    for c in candidates:
        c_idx = fw_emergency.v_to_idx[c]
        times = {r: fw_emergency.dist[c_idx][fw_emergency.v_to_idx[r]] for r in res_areas}
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

    # Sắp xếp candidate theo: độ phủ giảm dần, sau đó worst_case_time tăng dần
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
            "version": "2.0.0",
            "generated_at": "2026-10-24",
            "author": "DSA Teaching & Engineering Team",
        },
        "sample_graph_5": {
            "vertices": vertices_5,
            "nodes_layout": nodes_5_layout,
            "edges": edges_5,
            "dijkstra": {
                "source": "A",
                "final_dist": sanitize_value(dijkstra_dist_5),
                "paths": dijkstra_paths_5,
                "trace_steps": sanitize_value(dijkstra_trace_5),
            },
            "floyd_warshall": {
                "vertices": vertices_5,
                "has_negative_cycle": fw_has_neg_cycle_5,
                "final_dist_matrix": sanitize_value(fw_5.dist),
                "final_next_matrix": sanitize_value(fw_5.next_node),
                "paths": fw_paths_5,
                "trace_steps": sanitize_value(fw_trace_5),
            }
        },
        "emergency_system": {
            "locations": locations_6,
            "location_details": location_details,
            "nodes_layout": nodes_6_layout,
            "edges": edges_6,
            "residential_areas": res_areas,
            "dispatch_to_r4": {
                "target": "R4",
                "from_h1": {
                    "distance": sanitize_value(dist_h1["R4"]),
                    "path": d_h1.get_path("H1", "R4"),
                },
                "from_h2": {
                    "distance": sanitize_value(dist_h2["R4"]),
                    "path": d_h2.get_path("H2", "R4"),
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
            "dijkstra_h1_trace": sanitize_value(trace_h1),
            "dijkstra_h2_trace": sanitize_value(trace_h2),
            "floyd_warshall_trace": sanitize_value(fw_emergency.trace_steps),
            "apsp_matrix": sanitize_value(fw_emergency.dist),
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
    js_content = f"/**\n * trace_data.js\n * Dữ liệu vết thực thi thuật toán được tự động sinh bởi generate_trace_data.py\n * Cập nhật: 2026-10-24\n */\nwindow.PRESENTATION_DATA = {json_str};\n"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Xuất file thành công: {filepath}")
    print(f"Tổng số bước Dijkstra mẫu 5 đỉnh: {len(data['sample_graph_5']['dijkstra']['trace_steps'])}")
    print(f"Tổng số trạng thái Floyd-Warshall mẫu 5 đỉnh: {len(data['sample_graph_5']['floyd_warshall']['trace_steps'])}")


if __name__ == "__main__":
    export_to_javascript()
