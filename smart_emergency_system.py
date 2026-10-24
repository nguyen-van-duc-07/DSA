"""
smart_emergency_system.py
Hệ thống Điều phối Cấp cứu Đô thị tích hợp LeetCode 743 & LeetCode 1334.
Sử dụng kiến trúc hướng đối tượng chuẩn học thuật:
- DirectedEdge, EdgeWeightedDigraph từ edge.py
- DijkstraSP từ dijkstra_v2.py (dùng IndexMinPQ)
- FloydWarshall từ floyd_v2.py (dùng ma trận truy ngược _parent)
"""

import math
from edge import DirectedEdge, EdgeWeightedDigraph
from dijkstra_v2 import DijkstraSP
from floyd_v2 import FloydWarshall


def run_emergency_system() -> None:
    print("=" * 85)
    print("HỆ THỐNG ĐIỀU PHỐI CẤP CỨU & QUY HOẠCH TRẠM Y TẾ THÔNG MINH")
    print("Sử dụng EdgeWeightedDigraph, DijkstraSP (IndexMinPQ) & FloydWarshall (_parent)")
    print("=" * 85)

    locations = ["H1", "H2", "R1", "R2", "R3", "R4"]
    loc_to_idx = {name: i for i, name in enumerate(locations)}
    idx_to_loc = {i: name for i, name in enumerate(locations)}
    V = len(locations)

    traffic_edges = [
        ("H1", "R1", 4.0),
        ("H1", "R2", 6.0),
        ("R1", "R2", 3.0),
        ("R1", "R3", 8.0),
        ("R2", "R3", 4.0),
        ("R2", "R4", 12.0),
        ("R3", "R4", 5.0),
        ("H2", "R3", 6.0),
        ("H2", "R4", 7.0),
        ("R4", "R1", 15.0),
    ]

    # Xây dựng đồ thị có hướng có trọng số EdgeWeightedDigraph
    G = EdgeWeightedDigraph(V)
    for u_name, v_name, w in traffic_edges:
        u = loc_to_idx[u_name]
        v = loc_to_idx[v_name]
        G.add_edge(DirectedEdge(u, v, w))

    # =========================================================================
    # BÀI TOÁN 1: ĐIỀU PHỐI THỜI GIAN THỰC (DIJKSTRA - LEETCODE 743)
    # =========================================================================
    print("\n[BÀI TOÁN 1: ĐIỀU PHỐI KHẨN CẤP ĐẾN KHU R4 & LAN TRUYỀN TÍN HIỆU]")
    
    # 1. Chạy Dijkstra từ Bệnh viện H1 (đỉnh 0)
    sp_h1 = DijkstraSP(G, loc_to_idx["H1"])
    # 2. Chạy Dijkstra từ Trạm Cấp cứu H2 (đỉnh 1)
    sp_h2 = DijkstraSP(G, loc_to_idx["H2"])

    r4_idx = loc_to_idx["R4"]
    dist_h1_r4 = sp_h1.dist_to(r4_idx)
    dist_h2_r4 = sp_h2.dist_to(r4_idx)

    # Khôi phục lộ trình từ sp_h1 và sp_h2
    path_edges_h1 = sp_h1.path_to(r4_idx) or []
    path_h1_r4 = ["H1"] + [idx_to_loc[e.to_vertex()] for e in path_edges_h1]

    path_edges_h2 = sp_h2.path_to(r4_idx) or []
    path_h2_r4 = ["H2"] + [idx_to_loc[e.to_vertex()] for e in path_edges_h2]

    print(f"  Thời gian từ H1 đến R4: {dist_h1_r4:.1f} phút | Lộ trình: {' -> '.join(path_h1_r4)}")
    print(f"  Thời gian từ H2 đến R4: {dist_h2_r4:.1f} phút | Lộ trình: {' -> '.join(path_h2_r4)}")

    if dist_h2_r4 < dist_h1_r4:
        diff = dist_h1_r4 - dist_h2_r4
        print(f"  => QUYẾT ĐỊNH ĐIỀU PHỐI: Kích hoạt xe từ Trạm H2 (nhanh hơn {diff:.1f} phút!).")
    else:
        print("  => QUYẾT ĐỊNH ĐIỀU PHỐI: Kích hoạt xe từ Bệnh viện H1.")

    # 3. Tính độ trễ phát tín hiệu toàn mạng từ H1 (LeetCode 743)
    residence_names = ["R1", "R2", "R3", "R4"]
    residence_indices = [loc_to_idx[r] for r in residence_names]
    delays = [sp_h1.dist_to(r_idx) for r_idx in residence_indices]
    
    if any(d == float('inf') for d in delays):
        broadcast_time = -1
    else:
        broadcast_time = max(delays)
    print(f"\n  Thời gian để tín hiệu từ H1 bao phủ toàn bộ 4 khu dân cư: {broadcast_time:.1f} phút.")

    # =========================================================================
    # BÀI TOÁN 2: QUY HOẠCH TRẠM Y TẾ TỐI ƯU (FLOYD-WARSHALL - LEETCODE 1334)
    # =========================================================================
    print("\n[BÀI TOÁN 2: QUY HOẠCH TRẠM CẤP CỨU VÀ TÌM VỊ TRÍ TỐI ƯU]")
    
    fw = FloydWarshall(G)
    fw.print_tables()

    # Đánh giá tiêu chuẩn thời gian vàng <= 15 phút tới tất cả khu dân cư
    gold_threshold = 15.0
    print(f"  Đánh giá Khả năng Tiếp cận trong 'Thời gian vàng' (<= {gold_threshold} phút):")
    
    candidate_hubs = ["H1", "H2", "R1", "R2", "R3"]
    best_hub = None
    min_worst_case_time = float('inf')

    for hub in candidate_hubs:
        hub_idx = loc_to_idx[hub]
        times_to_residences = {r: fw.dist(hub_idx, loc_to_idx[r]) for r in residence_names}
        covered_count = sum(1 for t in times_to_residences.values() if t <= gold_threshold)
        worst_time = max(times_to_residences.values())

        print(f"  Ứng viên '{hub}': Phủ {covered_count}/4 khu dân cư | Thời gian tiếp cận xa nhất: {worst_time:.1f} phút")

        # Tiêu chí chọn hub có độ phủ 4/4 và worst_time nhỏ nhất
        if covered_count == len(residence_names) and worst_time < min_worst_case_time:
            min_worst_case_time = worst_time
            best_hub = hub

    print(f"\n  => KẾT QUẢ QUY HOẠCH: Vị trí tối ưu nhất là '{best_hub}'")
    print(f"     (Phủ 100% khu dân cư trong ngưỡng vàng, thời gian phản ứng tối đa chỉ {min_worst_case_time:.1f} phút).")


if __name__ == "__main__":
    run_emergency_system()
