

class IndexMinPQ:
    def __init__(self, max_n: int):
        self.max_n = max_n
        self.n = 0
        self.keys = [None] * (max_n + 1)   # keys[i] = độ ưu tiên của đỉnh i
        self.pq = [0] * (max_n + 1)        # Binary heap chứa các chỉ số đỉnh (1-indexed)
        self.qp = [-1] * (max_n + 1)       # qp[i] = vị trí của đỉnh i trong mảng pq (-1 nếu không có)

    def is_empty(self) -> bool:
        return self.n == 0

    def contains(self, i: int) -> bool:
        return self.qp[i] != -1

    def insert(self, i: int, key: float):
        if self.contains(i):
            raise ValueError(f"Đỉnh {i} đã tồn tại trong PQ")
        self.n += 1
        self.qp[i] = self.n
        self.pq[self.n] = i
        self.keys[i] = key
        self._swim(self.n)

    def del_min(self) -> int:
        if self.n == 0:
            raise IndexError("Priority Queue rỗng")
        min_idx = self.pq[1]
        self._exch(1, self.n)
        self.n -= 1
        self._sink(1)
        self.qp[min_idx] = -1
        self.keys[min_idx] = None
        return min_idx

    def decrease_key(self, i: int, key: float):
        if not self.contains(i):
            raise IndexError(f"Đỉnh {i} không có trong PQ")
        if self.keys[i] <= key:
            return
        self.keys[i] = key
        self._swim(self.qp[i])

    # --- Helper methods cho Heap ---
    def _greater(self, i: int, j: int) -> bool:
        return self.keys[self.pq[i]] > self.keys[self.pq[j]]

    def _exch(self, i: int, j: int):
        self.pq[i], self.pq[j] = self.pq[j], self.pq[i]
        self.qp[self.pq[i]] = i
        self.qp[self.pq[j]] = j

    def _swim(self, k: int):
        while k > 1 and self._greater(k // 2, k):
            self._exch(k, k // 2)
            k = k // 2

    def _sink(self, k: int):
        while 2 * k <= self.n:
            j = 2 * k
            if j < self.n and self._greater(j, j + 1):
                j += 1
            if not self._greater(k, j):
                break
            self._exch(k, j)
            k = j