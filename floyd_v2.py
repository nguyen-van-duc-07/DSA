from edge import DirectedEdge, EdgeWeightedDigraph

class FloydWarshall:
    def __init__(self, G: EdgeWeightedDigraph):
        """
        G: Đồ thị có hướng, có trọng số (EdgeWeightedDigraph)
        """
        self.V = G.V
        
        # 1. Khởi tạo ma trận khoảng cách _dist và ma trận truy ngược _parent
        self._dist = [[float('inf')] * self.V for _ in range(self.V)]
        self._parent = [[-1] * self.V for _ in range(self.V)]

        # Khoảng cách từ một đỉnh đến chính nó luôn bằng 0.0
        for i in range(self.V):
            self._dist[i][i] = 0.0

        # Khởi tạo giá trị từ các cạnh trong đồ thị G
        for u in range(self.V):
            for e in G.adj(u):
                v = e.to_vertex()
                w = e.weight()
                if w < self._dist[u][v]:  # Chọn cạnh nhỏ nhất nếu có đa đồ thị
                    self._dist[u][v] = w
                    self._parent[u][v] = u  # Đỉnh đứng ngay trước v là u

        # 2. THUẬT TOÁN FLOYD-WARSHALL (Quy hoạch động)
        for k in range(self.V):
            for i in range(self.V):
                for j in range(self.V):
                    if self._dist[i][k] != float('inf') and self._dist[k][j] != float('inf'):
                        new_dist = self._dist[i][k] + self._dist[k][j]
                        
                        if new_dist < self._dist[i][j]:
                            self._dist[i][j] = new_dist
                            self._parent[i][j] = self._parent[k][j]  # Cập nhật đỉnh đứng trước j

    def has_negative_cycle(self) -> bool:
        """Kiểm tra đồ thị có chứa chu trình âm hay không"""
        for i in range(self.V):
            if self._dist[i][i] < 0:
                return True
        return False

    def dist(self, u: int, v: int) -> float:
        """Trả về khoảng cách ngắn nhất từ u đến v"""
        return self._dist[u][v]

    def has_path(self, u: int, v: int) -> bool:
        """Kiểm tra có đường đi từ u đến v không"""
        return self._dist[u][v] < float('inf')

    def path_to(self, u: int, v: int) -> list[int] | None:
        """Trả về đường đi ngắn nhất từ u đến v (dùng phương pháp truy ngược)"""
        if not self.has_path(u, v):
            return None
        
        if u == v:
            return [u]

        path = []
        curr = v
        
        # Truy ngược từ v về u thông qua ma trận _parent
        while curr != -1:
            path.append(curr)
            if curr == u:
                break
            curr = self._parent[u][curr]

        if path[-1] != u:  # Không truy về được đỉnh nguồn u
            return None

        path.reverse()  # Lật ngược lại để thu được đường đi từ u -> v
        return path

    def print_tables(self):
        """In bảng ma trận khoảng cách _dist và bảng ma trận truy vết _parent"""
        v_range = range(self.V)
        
        # 1. IN BẢNG MA TRẬN KHOẢNG CÁCH (_dist)
        print("\n" + "═" * 55)
        print(" BẢNG KHOẢNG CÁCH NGẮN NHẤT (_dist) ".center(55, "═"))
        print("═" * 55)
        
        header = " From \\ To │ " + " ".join(f"{j:>7}" for j in v_range)
        print(header)
        print("─" * len(header))
        
        for i in v_range:
            row_cells = []
            for j in v_range:
                if self._dist[i][j] == float('inf'):
                    row_cells.append(f"{'∞':>7}")
                else:
                    row_cells.append(f"{self._dist[i][j]:>7.1f}")
            print(f"    {i:<7} │ " + " ".join(row_cells))
            
        # 2. IN BẢNG MA TRẬN TRUY VẾT (_parent)
        print("\n" + "═" * 55)
        print(" BẢNG ĐỈNH ĐỨNG TRƯỚC ĐỂ TRUY VẾT (_parent) ".center(55, "═"))
        print("═" * 55)
        print(header)
        print("─" * len(header))
        
        for i in v_range:
            row_cells = []
            for j in v_range:
                val = self._parent[i][j]
                val_str = "-" if val == -1 else str(val)
                row_cells.append(f"{val_str:>7}")
            print(f"    {i:<7} │ " + " ".join(row_cells))
            
        print("═" * 55 + "\n")


# =====================================================================
# CHẠY THỬ CHƯƠNG TRÌNH
# =====================================================================
if __name__ == "__main__":
    # Khởi tạo đồ thị 4 đỉnh từ lớp EdgeWeightedDigraph
    G = EdgeWeightedDigraph(4)
    
    edges = [
        (0, 1, 5.0),
        (0, 3, 10.0),
        (1, 2, 3.0),
        (2, 3, 1.0),
        (3, 1, 2.0)
    ]
    for u, v, w in edges:
        G.add_edge(DirectedEdge(u, v, w))

    fw = FloydWarshall(G)

    if fw.has_negative_cycle():
        print("❌ Đồ thị chứa chu trình âm!")
    else:
        fw.print_tables()
        
        u, v = 0, 3
        if fw.has_path(u, v):
            path_str = " -> ".join(map(str, fw.path_to(u, v)))
            print(f"Khoảng cách {u} -> {v}: {fw.dist(u, v)}")
            print(f"Đường đi: {path_str}")