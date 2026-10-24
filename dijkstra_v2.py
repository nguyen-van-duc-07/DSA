from edge import DirectedEdge, EdgeWeightedDigraph
from minpq import IndexMinPQ

class DijkstraSP:
    def __init__(self, G: EdgeWeightedDigraph, s: int):
        self._s = s
        self._edge_to = [None] * G.V
        self._dist_to = [float('inf')] * G.V
        self._pq = IndexMinPQ(G.V)

        # Khởi tạo khoảng cách ban đầu
        self._dist_to[s] = 0.0
        self._pq.insert(s, 0.0)

        # Lặp rút đỉnh có khoảng cách nhỏ nhất và relax các cạnh liên kề
        while not self._pq.is_empty():
            v = self._pq.del_min()
            for e in G.adj(v):
                self._relax(e)

    def _relax(self, e: DirectedEdge):
        v = e.from_vertex()
        w = e.to_vertex()
        new_dist = self._dist_to[v] + e.weight()
        if new_dist < self._dist_to[w]:
            self._dist_to[w] = new_dist
            self._edge_to[w] = e
            if self._pq.contains(w):
                self._pq.decrease_key(w, self._dist_to[w])
            else:
                self._pq.insert(w, self._dist_to[w])

    def dist_to(self, v: int) -> float:
        """Trả về khoảng cách ngắn nhất từ s đến v"""
        return self._dist_to[v]

    def has_path_to(self, v: int) -> bool:
        """Kiểm tra xem có đường đi từ s đến v không"""
        return self._dist_to[v] < float('inf')

    def path_to(self, v: int) -> list[DirectedEdge] | None:
        """Trả về danh sách các cạnh tạo nên đường đi ngắn nhất từ s đến v"""
        if not self.has_path_to(v):
            return None
        path = []
        e = self._edge_to[v]
        while e is not None:
            path.append(e)
            e = self._edge_to[e.from_vertex()]
        path.reverse()
        return path

if __name__ == "__main__":
    # Tạo đồ thị 8 đỉnh (0 đến 7)
    G = EdgeWeightedDigraph(8)
    
    # Thêm một số cạnh ví dụ
    G.add_edge(DirectedEdge(0, 4, 0.38))
    G.add_edge(DirectedEdge(4, 5, 0.35))
    G.add_edge(DirectedEdge(5, 1, 0.32))
    G.add_edge(DirectedEdge(0, 2, 0.26))
    G.add_edge(DirectedEdge(2, 7, 0.34))
    G.add_edge(DirectedEdge(7, 3, 0.39))

    s = 0
    sp = DijkstraSP(G, s)

    print(f"--- ĐƯỜNG ĐI NGẮN NHẤT TỪ ĐỈNH {s} ---")
    for v in range(G.V):
        if sp.has_path_to(v):
            path_str = "  ".join(str(e) for e in sp.path_to(v))
            print(f"{s} to {v} ({sp.dist_to(v):.2f}): {path_str}")
        else:
            print(f"{s} to {v}: No path")