class DirectedEdge:
    def __init__(self, v: int, w: int, weight: float):
        self._v = v
        self._w = w
        self._weight = weight

    def from_vertex(self) -> int:
        return self._v

    def to_vertex(self) -> int:
        return self._w

    def weight(self) -> float:
        return self._weight

    def __str__(self) -> str:
        return f"{self._v} -> {self._w} {self._weight:.2f}"

    def __repr__(self) -> str:
        return self.__str__()

class EdgeWeightedDigraph:
    def __init__(self, V: int):
        self.V = V
        self._adj = [[] for _ in range(V)]

    def add_edge(self, e: DirectedEdge):
        v = e.from_vertex()
        self._adj[v].append(e)

    def adj(self, v: int) -> list[DirectedEdge]:
        return self._adj[v]

    def edges(self) -> list[DirectedEdge]:
        all_edges = []
        for v in range(self.V):
            all_edges.extend(self._adj[v])
        return all_edges