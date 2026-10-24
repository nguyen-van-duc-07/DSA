"""
shortest_path_solvers.py
Module cung cấp các bộ giải thuật toán tìm đường đi ngắn nhất chuẩn mực:
- DijkstraSolver: Giải bài toán Single-Source Shortest Path (SSSP).
- FloydWarshallSolver: Giải bài toán All-Pairs Shortest Path (APSP).

Tác giả: Nhóm Nghiên cứu & Giảng dạy Cấu trúc Dữ liệu & Giải thuật
Phiên bản: 2.0.0
"""

from typing import List, Dict, Tuple, Optional, Any
import heapq
import math


class DijkstraSolver:
    """
    Bộ giải thuật toán Dijkstra sử dụng Hàng đợi ưu tiên (Min-Heap)
    kết hợp kỹ thuật Lazy Deletion.
    
    Phù hợp cho đồ thị có trọng số cạnh không âm.
    Hỗ trợ lưu lại toàn bộ các bước thực thi để trực quan hóa động.
    """

    def __init__(self, vertices: List[str]) -> None:
        """
        Khởi tạo đối tượng DijkstraSolver.

        :param vertices: Danh sách định danh các đỉnh trong đồ thị.
        """
        self.vertices: List[str] = list(vertices)
        # Danh sách kề: {u: [(v, weight), ...]}
        self.adj: Dict[str, List[Tuple[str, float]]] = {v: [] for v in self.vertices}
        self.dist: Dict[str, float] = {}
        self.parent: Dict[str, Optional[str]] = {}
        self.trace_steps: List[Dict[str, Any]] = []

    def add_edge(self, u: str, v: str, weight: float) -> None:
        """
        Thêm một cạnh có hướng từ u đến v với trọng số xác định.

        :param u: Đỉnh xuất phát.
        :param v: Đỉnh kết thúc.
        :param weight: Trọng số không âm của cạnh.
        :raises ValueError: Nếu trọng số cạnh âm.
        """
        if weight < 0:
            raise ValueError(f"Dijkstra không hỗ trợ cạnh có trọng số âm: ({u} -> {v}, {weight})")
        self.adj[u].append((v, float(weight)))

    def solve(self, start_node: str) -> Dict[str, float]:
        """
        Thực thi thuật toán Dijkstra xuất phát từ đỉnh start_node.

        :param start_node: Đỉnh nguồn.
        :return: Từ điển chứa khoảng cách ngắn nhất từ start_node tới mọi đỉnh.
        """
        if start_node not in self.adj:
            raise KeyError(f"Đỉnh nguồn '{start_node}' không tồn tại trong đồ thị.")

        self.dist = {v: math.inf for v in self.vertices}
        self.parent = {v: None for v in self.vertices}
        self.trace_steps = []

        self.dist[start_node] = 0.0
        # Min-Heap lưu trữ các tuple: (khoảng_cách_tạm_thời, tên_đỉnh)
        pq: List[Tuple[float, str]] = [(0.0, start_node)]

        step_counter = 0
        self.trace_steps.append({
            "step": step_counter,
            "action": "INIT",
            "current_node": start_node,
            "current_dist": 0.0,
            "heap_snapshot": list(pq),
            "dist_snapshot": dict(self.dist),
            "parent_snapshot": dict(self.parent),
            "relaxed_edges": []
        })

        while pq:
            current_dist, u = heapq.heappop(pq)
            step_counter += 1

            # Kỹ thuật Lazy Deletion: Bỏ qua các bản ghi lỗi thời đã có đường đi tốt hơn
            if current_dist > self.dist[u]:
                self.trace_steps.append({
                    "step": step_counter,
                    "action": "LAZY_SKIP",
                    "current_node": u,
                    "current_dist": current_dist,
                    "best_known_dist": self.dist[u],
                    "heap_snapshot": list(pq),
                    "dist_snapshot": dict(self.dist),
                    "parent_snapshot": dict(self.parent),
                    "relaxed_edges": []
                })
                continue

            relaxed_edges: List[Dict[str, Any]] = []

            # Nới lỏng tất cả các cạnh kề của u
            for v, weight in self.adj[u]:
                new_dist = self.dist[u] + weight
                if new_dist < self.dist[v]:
                    old_dist = self.dist[v]
                    self.dist[v] = new_dist
                    self.parent[v] = u
                    heapq.heappush(pq, (new_dist, v))
                    relaxed_edges.append({
                        "from": u,
                        "to": v,
                        "weight": weight,
                        "old_dist": old_dist,
                        "new_dist": new_dist
                    })

            self.trace_steps.append({
                "step": step_counter,
                "action": "SETTLE_AND_RELAX",
                "current_node": u,
                "current_dist": current_dist,
                "heap_snapshot": list(pq),
                "dist_snapshot": dict(self.dist),
                "parent_snapshot": dict(self.parent),
                "relaxed_edges": relaxed_edges
            })

        return self.dist

    def get_path(self, start_node: str, end_node: str) -> List[str]:
        """
        Khôi phục lộ trình ngắn nhất từ start_node đến end_node.

        :param start_node: Đỉnh xuất phát.
        :param end_node: Đỉnh đích.
        :return: Danh sách các đỉnh biểu diễn thứ tự di chuyển. Trả về [] nếu không tới được.
        """
        if end_node not in self.dist or self.dist[end_node] == math.inf:
            return []

        path: List[str] = []
        curr: Optional[str] = end_node
        while curr is not None:
            path.append(curr)
            if curr == start_node:
                break
            curr = self.parent.get(curr)

        if not path or path[-1] != start_node:
            return []

        path.reverse()
        return path


class FloydWarshallSolver:
    """
    Bộ giải thuật toán Floyd-Warshall sử dụng Quy hoạch động để giải quyết
    bài toán All-Pairs Shortest Path (APSP).
    
    Hỗ trợ phát hiện chu trình âm và khôi phục lộ trình qua ma trận Next.
    """

    def __init__(self, vertices: List[str]) -> None:
        """
        Khởi tạo đối tượng FloydWarshallSolver.

        :param vertices: Danh sách các đỉnh trong đồ thị.
        """
        self.vertices: List[str] = list(vertices)
        self.V: int = len(vertices)
        self.v_to_idx: Dict[str, int] = {v: i for i, v in enumerate(vertices)}
        self.idx_to_v: Dict[int, str] = {i: v for i, v in enumerate(vertices)}

        # Ma trận khoảng cách D kích thước V x V
        self.dist: List[List[float]] = [[math.inf] * self.V for _ in range(self.V)]
        # Ma trận đỉnh kế tiếp Next kích thước V x V
        self.next_node: List[List[Optional[int]]] = [[None] * self.V for _ in range(self.V)]
        self.trace_steps: List[Dict[str, Any]] = []

        # Khoảng cách từ đỉnh đến chính nó bằng 0
        for i in range(self.V):
            self.dist[i][i] = 0.0

    def add_edge(self, u: str, v: str, weight: float) -> None:
        """
        Thêm cạnh có hướng từ u tới v. Cho phép cập nhật nếu có đa cạnh (chọn trọng số nhỏ nhất).

        :param u: Đỉnh nguồn.
        :param v: Đỉnh đích.
        :param weight: Trọng số của cạnh.
        """
        ui, vi = self.v_to_idx[u], self.v_to_idx[v]
        if weight < self.dist[ui][vi]:
            self.dist[ui][vi] = float(weight)
            self.next_node[ui][vi] = vi

    def solve(self) -> Tuple[List[List[float]], List[List[Optional[int]]]]:
        """
        Thực thi thuật toán Floyd-Warshall với 3 vòng lặp lồng nhau k, i, j.

        :return: Bộ đôi (ma trận khoảng cách, ma trận đỉnh kế tiếp).
        """
        self.trace_steps = []

        # Lưu trạng thái khởi tạo k = 0
        self.trace_steps.append({
            "k_step": 0,
            "k_vertex": None,
            "dist_matrix": [row[:] for row in self.dist],
            "next_matrix": [row[:] for row in self.next_node],
            "updated_cells": []
        })

        for k in range(self.V):
            k_v = self.idx_to_v[k]
            updated_cells: List[Dict[str, Any]] = []

            for i in range(self.V):
                for j in range(self.V):
                    if self.dist[i][k] != math.inf and self.dist[k][j] != math.inf:
                        new_candidate_dist = self.dist[i][k] + self.dist[k][j]
                        if new_candidate_dist < self.dist[i][j]:
                            old_val = self.dist[i][j]
                            self.dist[i][j] = new_candidate_dist
                            self.next_node[i][j] = self.next_node[i][k]
                            updated_cells.append({
                                "from": self.idx_to_v[i],
                                "to": self.idx_to_v[j],
                                "old_dist": old_val,
                                "new_dist": new_candidate_dist,
                                "via": k_v
                            })

            self.trace_steps.append({
                "k_step": k + 1,
                "k_vertex": k_v,
                "dist_matrix": [row[:] for row in self.dist],
                "next_matrix": [row[:] for row in self.next_node],
                "updated_cells": updated_cells
            })

        return self.dist, self.next_node

    def detect_negative_cycle(self) -> bool:
        """
        Kiểm tra xem đồ thị có chứa chu trình trọng số âm hay không.
        Nguyên lý: Nếu tồn tại đỉnh i mà dist[i][i] < 0, thì i thuộc một chu trình âm.

        :return: True nếu có chu trình âm, ngược lại False.
        """
        for i in range(self.V):
            if self.dist[i][i] < 0:
                return True
        return False

    def get_path(self, u: str, v: str) -> List[str]:
        """
        Khôi phục lộ trình ngắn nhất từ đỉnh u đến đỉnh v dựa trên ma trận next_node.

        :param u: Đỉnh xuất phát.
        :param v: Đỉnh đích.
        :return: Danh sách thứ tự các đỉnh trên lộ trình. Trả về [] nếu không có đường đi.
        """
        ui, vi = self.v_to_idx[u], self.v_to_idx[v]
        if self.dist[ui][vi] == math.inf:
            return []
        if ui == vi:
            return [u]

        path: List[str] = [u]
        curr = ui
        visited_count = 0

        while curr != vi:
            curr = self.next_node[curr][vi]
            if curr is None:
                return []
            path.append(self.idx_to_v[curr])
            visited_count += 1
            if visited_count > self.V:
                return []

        return path


def main() -> None:
    print("=" * 80)
    print("CHƯƠNG TRÌNH KIỂM THỬ SO SÁNH: DIJKSTRA vs. FLOYD-WARSHALL")
    print("=" * 80)

    vertices = ["A", "B", "C", "D", "E"]
    edges = [
        ("A", "B", 5.0),
        ("A", "C", 2.0),
        ("C", "B", 1.0),
        ("B", "D", 4.0),
        ("C", "D", 7.0),
        ("C", "E", 9.0),
        ("D", "E", 3.0),
        ("B", "E", 8.0),
    ]

    # 1. Thực thi Dijkstra từ nguồn A
    dijkstra = DijkstraSolver(vertices)
    for u, v, w in edges:
        dijkstra.add_edge(u, v, w)

    dijkstra_dist = dijkstra.solve("A")

    print("\n--- KẾT QUẢ DIJKSTRA (Nguồn: A) ---")
    for v in vertices:
        path = dijkstra.get_path("A", v)
        print(f"  Khoảng cách A -> {v}: {dijkstra_dist[v]:4.1f} | Lộ trình: {' -> '.join(path)}")

    # 2. Thực thi Floyd-Warshall
    fw = FloydWarshallSolver(vertices)
    for u, v, w in edges:
        fw.add_edge(u, v, w)

    fw.solve()

    print("\n--- KẾT QUẢ FLOYD-WARSHALL (Toàn bộ ma trận khoảng cách D) ---")
    header = "       " + "   ".join([f"{v:>4}" for v in vertices])
    print(header)
    for i, u in enumerate(vertices):
        row_str = f"  {u:>3}: "
        for j, v in enumerate(vertices):
            val = fw.dist[i][j]
            row_str += f"{val:4.1f}   " if val != math.inf else "  inf   "
        print(row_str)

    print("\n--- PHÁT HIỆN CHU TRÌNH ÂM ---")
    has_neg_cycle = fw.detect_negative_cycle()
    print(f"  Đồ thị có chu trình âm không? {'CÓ (CẢNH BÁO)' if has_neg_cycle else 'KHÔNG (HỢP LỆ)'}")

    print("\n--- ĐỐI CHIẾU LỘ TRÌNH ĐIỂM-ĐIỂM TỪ CẢ HAI THUẬT TOÁN (A -> E) ---")
    path_dijkstra = dijkstra.get_path("A", "E")
    path_fw = fw.get_path("A", "E")
    print(f"  Lộ trình theo Dijkstra      : {' -> '.join(path_dijkstra)} (Chi phí: {dijkstra_dist['E']})")
    print(f"  Lộ trình theo Floyd-Warshall: {' -> '.join(path_fw)} (Chi phí: {fw.dist[fw.v_to_idx['A']][fw.v_to_idx['E']]})")
    assert path_dijkstra == path_fw, "Cảnh báo: Hai thuật toán cho lộ trình khác nhau!"
    print("  => KẾT QUẢ ĐỒNG NHẤT TUYỆT ĐỐI!")


if __name__ == "__main__":
    main()
