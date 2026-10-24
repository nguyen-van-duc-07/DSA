"""
smart_emergency_system.py
Hệ thống Điều phối Cấp cứu Đô thị tích hợp LeetCode 743 & LeetCode 1334.
Tái sử dụng DijkstraSolver và FloydWarshallSolver từ module shortest_path_solvers.
"""

from shortest_path_solvers import DijkstraSolver, FloydWarshallSolver
import math


def run_emergency_system() -> None:
    print("=" * 85)
    print("HỆ THỐNG ĐIỀU PHỐI CẤP CỨU & QUY HOẠCH TRẠM Y TẾ THÔNG MINH")
    print("=" * 85)

    locations = ["H1", "H2", "R1", "R2", "R3", "R4"]
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

    # =========================================================================
    # BÀI TOÁN 1: ĐIỀU PHỐI THỜI GIAN THỰC (DIJKSTRA - LEETCODE 743)
    # =========================================================================
    print("\n[BÀI TOÁN 1: ĐIỀU PHỐI KHẨN CẤP ĐẾN KHU R4 & LAN TRUYỀN TÍN HIỆU]")
    
    # 1. Chạy Dijkstra từ Bệnh viện H1
    dijkstra_h1 = DijkstraSolver(locations)
    for u, v, w in traffic_edges:
        dijkstra_h1.add_edge(u, v, w)
    dist_from_h1 = dijkstra_h1.solve("H1")

    # 2. Chạy Dijkstra từ Trạm H2
    dijkstra_h2 = DijkstraSolver(locations)
    for u, v, w in traffic_edges:
        dijkstra_h2.add_edge(u, v, w)
    dist_from_h2 = dijkstra_h2.solve("H2")

    path_h1_r4 = dijkstra_h1.get_path("H1", "R4")
    path_h2_r4 = dijkstra_h2.get_path("H2", "R4")

    print(f"  Thời gian từ H1 đến R4: {dist_from_h1['R4']:.1f} phút | Lộ trình: {' -> '.join(path_h1_r4)}")
    print(f"  Thời gian từ H2 đến R4: {dist_from_h2['R4']:.1f} phút | Lộ trình: {' -> '.join(path_h2_r4)}")

    if dist_from_h2["R4"] < dist_from_h1["R4"]:
        print("  => QUYẾT ĐỊNH ĐIỀU PHỐI: Kích hoạt xe từ Trạm H2 (nhanh hơn 8.0 phút!).")
    else:
        print("  => QUYẾT ĐỊNH ĐIỀU PHỐI: Kích hoạt xe từ Bệnh viện H1.")

    # 3. Tính độ trễ phát tín hiệu toàn mạng từ H1 (LeetCode 743)
    residence_nodes = ["R1", "R2", "R3", "R4"]
    delays = [dist_from_h1[r] for r in residence_nodes]
    if any(d == math.inf for d in delays):
        broadcast_time = -1
    else:
        broadcast_time = max(delays)
    print(f"\n  Thời gian để tín hiệu từ H1 bao phủ toàn bộ 4 khu dân cư: {broadcast_time:.1f} phút.")

    # =========================================================================
    # BÀI TOÁN 2: QUY HOẠCH TRẠM Y TẾ TỐI ƯU (FLOYD-WARSHALL - LEETCODE 1334)
    # =========================================================================
    print("\n[BÀI TOÁN 2: QUY HOẠCH TRẠM CẤP CỨU VÀ TÌM VỊ TRÍ TỐI ƯU]")
    
    fw = FloydWarshallSolver(locations)
    for u, v, w in traffic_edges:
        fw.add_edge(u, v, w)
    fw.solve()

    print("\n  Ma trận Thời gian di chuyển giữa mọi địa điểm (phút):")
    header = "       " + "   ".join([f"{v:>4}" for v in locations])
    print(header)
    for i, u in enumerate(locations):
        row_str = f"  {u:>3}: "
        for j, v in enumerate(locations):
            val = fw.dist[i][j]
            row_str += f"{val:4.0f}   " if val != math.inf else "  inf   "
        print(row_str)

    # Đánh giá tiêu chuẩn thời gian vàng <= 15 phút tới tất cả khu dân cư
    gold_threshold = 15.0
    print(f"\n  Đánh giá Khả năng Tiếp cận trong 'Thời gian vàng' (<= {gold_threshold} phút):")
    
    candidate_hubs = ["H1", "H2", "R1", "R2", "R3"]
    best_hub = None
    min_worst_case_time = math.inf

    for hub in candidate_hubs:
        hub_idx = fw.v_to_idx[hub]
        times_to_residences = {r: fw.dist[hub_idx][fw.v_to_idx[r]] for r in residence_nodes}
        covered_count = sum(1 for t in times_to_residences.values() if t <= gold_threshold)
        worst_time = max(times_to_residences.values())

        print(f"  Ứng viên '{hub}': Phủ {covered_count}/4 khu dân cư | Thời gian tiếp cận xa nhất: {worst_time:.1f} phút")

        # Tiêu chí chọn hub có độ phủ 4/4 và worst_time nhỏ nhất
        if covered_count == len(residence_nodes) and worst_time < min_worst_case_time:
            min_worst_case_time = worst_time
            best_hub = hub

    print(f"\n  => KẾT QUẢ QUY HOẠCH: Vị trí tối ưu nhất là '{best_hub}'")
    print(f"     (Phủ 100% khu dân cư trong ngưỡng vàng, thời gian phản ứng tối đa chỉ {min_worst_case_time:.1f} phút).")


if __name__ == "__main__":
    run_emergency_system()
