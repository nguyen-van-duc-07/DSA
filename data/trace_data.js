/**
 * trace_data.js
 * Dữ liệu vết thực thi thuật toán sinh tự động từ edge.py, minpq.py, dijkstra_v2.py, floyd_v2.py
 * Cập nhật: 2026-10-25
 */
window.PRESENTATION_DATA = {
  "metadata": {
    "title": "Thuật toán tìm đường đi ngắn nhất: Dijkstra và Floyd-Warshall",
    "version": "2.1.0",
    "generated_at": "2026-10-25",
    "author": "DSA Academic Teaching & Engineering Team",
    "architecture": "EdgeWeightedDigraph + IndexMinPQ + DijkstraSP + FloydWarshall (_parent)"
  },
  "sample_graph_5": {
    "vertices": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "nodes_layout": [
      {
        "id": "A",
        "label": "A",
        "x": 120,
        "y": 250,
        "role": "source"
      },
      {
        "id": "B",
        "label": "B",
        "x": 340,
        "y": 130,
        "role": "normal"
      },
      {
        "id": "C",
        "label": "C",
        "x": 340,
        "y": 370,
        "role": "normal"
      },
      {
        "id": "D",
        "label": "D",
        "x": 580,
        "y": 180,
        "role": "normal"
      },
      {
        "id": "E",
        "label": "E",
        "x": 780,
        "y": 250,
        "role": "target"
      }
    ],
    "edges": [
      {
        "id": "e_A_B",
        "source": "A",
        "target": "B",
        "weight": 5.0,
        "curve": 0
      },
      {
        "id": "e_A_C",
        "source": "A",
        "target": "C",
        "weight": 2.0,
        "curve": 0
      },
      {
        "id": "e_C_B",
        "source": "C",
        "target": "B",
        "weight": 1.0,
        "curve": 0
      },
      {
        "id": "e_B_D",
        "source": "B",
        "target": "D",
        "weight": 4.0,
        "curve": 0
      },
      {
        "id": "e_C_D",
        "source": "C",
        "target": "D",
        "weight": 7.0,
        "curve": 0
      },
      {
        "id": "e_C_E",
        "source": "C",
        "target": "E",
        "weight": 9.0,
        "curve": 0.2
      },
      {
        "id": "e_D_E",
        "source": "D",
        "target": "E",
        "weight": 3.0,
        "curve": 0
      },
      {
        "id": "e_B_E",
        "source": "B",
        "target": "E",
        "weight": 8.0,
        "curve": -0.2
      }
    ],
    "dijkstra": {
      "source": "A",
      "final_dist": {
        "A": 0.0,
        "B": 3.0,
        "C": 2.0,
        "D": 7.0,
        "E": 10.0
      },
      "paths": {
        "A": {
          "path": [
            "A"
          ],
          "distance": 0.0
        },
        "B": {
          "path": [
            "A",
            "C",
            "B"
          ],
          "distance": 3.0
        },
        "C": {
          "path": [
            "A",
            "C"
          ],
          "distance": 2.0
        },
        "D": {
          "path": [
            "A",
            "C",
            "B",
            "D"
          ],
          "distance": 7.0
        },
        "E": {
          "path": [
            "A",
            "C",
            "B",
            "D",
            "E"
          ],
          "distance": 10.0
        }
      },
      "trace_steps": [
        {
          "step_index": 0,
          "phase": "INIT",
          "current_vertex": null,
          "current_vertex_idx": null,
          "current_dist": null,
          "settled_vertices": [],
          "pq_snapshot": [
            {
              "vertex": "A",
              "idx": 0,
              "dist": 0.0,
              "heap_pos": 1
            }
          ],
          "dist_to": {
            "A": 0.0,
            "B": null,
            "C": null,
            "D": null,
            "E": null
          },
          "edge_to": {
            "A": null,
            "B": null,
            "C": null,
            "D": null,
            "E": null
          },
          "relaxed_edges": [],
          "decrease_key_nodes": [],
          "spt_edges": [],
          "action_summary": "Khởi tạo nguồn s = A: gán _dist_to[A] = 0.0, gọi pq.insert(A, 0.0)."
        },
        {
          "step_index": 1,
          "phase": "DEL_MIN",
          "current_vertex": "A",
          "current_vertex_idx": 0,
          "current_dist": 0.0,
          "settled_vertices": [
            "A"
          ],
          "pq_snapshot": [
            {
              "vertex": "C",
              "idx": 2,
              "dist": 2.0,
              "heap_pos": 1
            },
            {
              "vertex": "B",
              "idx": 1,
              "dist": 5.0,
              "heap_pos": 2
            }
          ],
          "dist_to": {
            "A": 0.0,
            "B": 5.0,
            "C": 2.0,
            "D": null,
            "E": null
          },
          "edge_to": {
            "A": null,
            "B": {
              "from": "A",
              "to": "B",
              "weight": 5.0,
              "edge_id": "e_A_B"
            },
            "C": {
              "from": "A",
              "to": "C",
              "weight": 2.0,
              "edge_id": "e_A_C"
            },
            "D": null,
            "E": null
          },
          "relaxed_edges": [
            {
              "edge_id": "e_A_B",
              "from": "A",
              "to": "B",
              "weight": 5.0,
              "old_dist": null,
              "new_dist": 5.0,
              "action": "insert",
              "detail": "pq.insert(B, 5.0)"
            },
            {
              "edge_id": "e_A_C",
              "from": "A",
              "to": "C",
              "weight": 2.0,
              "old_dist": null,
              "new_dist": 2.0,
              "action": "insert",
              "detail": "pq.insert(C, 2.0)"
            }
          ],
          "decrease_key_nodes": [],
          "spt_edges": [
            "e_A_B",
            "e_A_C"
          ],
          "action_summary": "Bước 1: pq.del_min() rút đỉnh nguồn A (dist=0.0). Nới lỏng các cạnh kề, thêm vào IndexMinPQ."
        },
        {
          "step_index": 2,
          "phase": "DEL_MIN",
          "current_vertex": "C",
          "current_vertex_idx": 2,
          "current_dist": 2.0,
          "settled_vertices": [
            "A",
            "C"
          ],
          "pq_snapshot": [
            {
              "vertex": "B",
              "idx": 1,
              "dist": 3.0,
              "heap_pos": 1
            },
            {
              "vertex": "D",
              "idx": 3,
              "dist": 9.0,
              "heap_pos": 2
            },
            {
              "vertex": "E",
              "idx": 4,
              "dist": 11.0,
              "heap_pos": 3
            }
          ],
          "dist_to": {
            "A": 0.0,
            "B": 3.0,
            "C": 2.0,
            "D": 9.0,
            "E": 11.0
          },
          "edge_to": {
            "A": null,
            "B": {
              "from": "C",
              "to": "B",
              "weight": 1.0,
              "edge_id": "e_C_B"
            },
            "C": {
              "from": "A",
              "to": "C",
              "weight": 2.0,
              "edge_id": "e_A_C"
            },
            "D": {
              "from": "C",
              "to": "D",
              "weight": 7.0,
              "edge_id": "e_C_D"
            },
            "E": {
              "from": "C",
              "to": "E",
              "weight": 9.0,
              "edge_id": "e_C_E"
            }
          },
          "relaxed_edges": [
            {
              "edge_id": "e_C_B",
              "from": "C",
              "to": "B",
              "weight": 1.0,
              "old_dist": 5.0,
              "new_dist": 3.0,
              "action": "decrease_key",
              "detail": "pq.decrease_key(B, 3.0): giảm từ 5.0 xuống 3.0"
            },
            {
              "edge_id": "e_C_D",
              "from": "C",
              "to": "D",
              "weight": 7.0,
              "old_dist": null,
              "new_dist": 9.0,
              "action": "insert",
              "detail": "pq.insert(D, 9.0)"
            },
            {
              "edge_id": "e_C_E",
              "from": "C",
              "to": "E",
              "weight": 9.0,
              "old_dist": null,
              "new_dist": 11.0,
              "action": "insert",
              "detail": "pq.insert(E, 11.0)"
            }
          ],
          "decrease_key_nodes": [
            "B"
          ],
          "spt_edges": [
            "e_C_B",
            "e_A_C",
            "e_C_D",
            "e_C_E"
          ],
          "action_summary": "Bước 2: pq.del_min() rút đỉnh C (dist=2.0). Nới lỏng: giảm B (5.0→3.0) qua decrease_key, thêm D (9.0) qua insert, thêm E (11.0) qua insert."
        },
        {
          "step_index": 3,
          "phase": "DEL_MIN",
          "current_vertex": "B",
          "current_vertex_idx": 1,
          "current_dist": 3.0,
          "settled_vertices": [
            "A",
            "C",
            "B"
          ],
          "pq_snapshot": [
            {
              "vertex": "D",
              "idx": 3,
              "dist": 7.0,
              "heap_pos": 1
            },
            {
              "vertex": "E",
              "idx": 4,
              "dist": 11.0,
              "heap_pos": 2
            }
          ],
          "dist_to": {
            "A": 0.0,
            "B": 3.0,
            "C": 2.0,
            "D": 7.0,
            "E": 11.0
          },
          "edge_to": {
            "A": null,
            "B": {
              "from": "C",
              "to": "B",
              "weight": 1.0,
              "edge_id": "e_C_B"
            },
            "C": {
              "from": "A",
              "to": "C",
              "weight": 2.0,
              "edge_id": "e_A_C"
            },
            "D": {
              "from": "B",
              "to": "D",
              "weight": 4.0,
              "edge_id": "e_B_D"
            },
            "E": {
              "from": "C",
              "to": "E",
              "weight": 9.0,
              "edge_id": "e_C_E"
            }
          },
          "relaxed_edges": [
            {
              "edge_id": "e_B_D",
              "from": "B",
              "to": "D",
              "weight": 4.0,
              "old_dist": 9.0,
              "new_dist": 7.0,
              "action": "decrease_key",
              "detail": "pq.decrease_key(D, 7.0): giảm từ 9.0 xuống 7.0"
            },
            {
              "edge_id": "e_B_E",
              "from": "B",
              "to": "E",
              "weight": 8.0,
              "old_dist": 11.0,
              "new_dist": 11.0,
              "action": "skip",
              "detail": "Bỏ qua: khoảng cách cũ 11.0 <= đường mới 11.0"
            }
          ],
          "decrease_key_nodes": [
            "D"
          ],
          "spt_edges": [
            "e_C_B",
            "e_A_C",
            "e_B_D",
            "e_C_E"
          ],
          "action_summary": "Bước 3: pq.del_min() rút đỉnh B (dist=3.0). Nới lỏng: giảm D (9.0→7.0) qua decrease_key."
        },
        {
          "step_index": 4,
          "phase": "DEL_MIN",
          "current_vertex": "D",
          "current_vertex_idx": 3,
          "current_dist": 7.0,
          "settled_vertices": [
            "A",
            "C",
            "B",
            "D"
          ],
          "pq_snapshot": [
            {
              "vertex": "E",
              "idx": 4,
              "dist": 10.0,
              "heap_pos": 1
            }
          ],
          "dist_to": {
            "A": 0.0,
            "B": 3.0,
            "C": 2.0,
            "D": 7.0,
            "E": 10.0
          },
          "edge_to": {
            "A": null,
            "B": {
              "from": "C",
              "to": "B",
              "weight": 1.0,
              "edge_id": "e_C_B"
            },
            "C": {
              "from": "A",
              "to": "C",
              "weight": 2.0,
              "edge_id": "e_A_C"
            },
            "D": {
              "from": "B",
              "to": "D",
              "weight": 4.0,
              "edge_id": "e_B_D"
            },
            "E": {
              "from": "D",
              "to": "E",
              "weight": 3.0,
              "edge_id": "e_D_E"
            }
          },
          "relaxed_edges": [
            {
              "edge_id": "e_D_E",
              "from": "D",
              "to": "E",
              "weight": 3.0,
              "old_dist": 11.0,
              "new_dist": 10.0,
              "action": "decrease_key",
              "detail": "pq.decrease_key(E, 10.0): giảm từ 11.0 xuống 10.0"
            }
          ],
          "decrease_key_nodes": [
            "E"
          ],
          "spt_edges": [
            "e_C_B",
            "e_A_C",
            "e_B_D",
            "e_D_E"
          ],
          "action_summary": "Bước 4: pq.del_min() rút đỉnh D (dist=7.0). Nới lỏng: giảm E (11.0→10.0) qua decrease_key."
        },
        {
          "step_index": 5,
          "phase": "DEL_MIN",
          "current_vertex": "E",
          "current_vertex_idx": 4,
          "current_dist": 10.0,
          "settled_vertices": [
            "A",
            "C",
            "B",
            "D",
            "E"
          ],
          "pq_snapshot": [],
          "dist_to": {
            "A": 0.0,
            "B": 3.0,
            "C": 2.0,
            "D": 7.0,
            "E": 10.0
          },
          "edge_to": {
            "A": null,
            "B": {
              "from": "C",
              "to": "B",
              "weight": 1.0,
              "edge_id": "e_C_B"
            },
            "C": {
              "from": "A",
              "to": "C",
              "weight": 2.0,
              "edge_id": "e_A_C"
            },
            "D": {
              "from": "B",
              "to": "D",
              "weight": 4.0,
              "edge_id": "e_B_D"
            },
            "E": {
              "from": "D",
              "to": "E",
              "weight": 3.0,
              "edge_id": "e_D_E"
            }
          },
          "relaxed_edges": [],
          "decrease_key_nodes": [],
          "spt_edges": [
            "e_C_B",
            "e_A_C",
            "e_B_D",
            "e_D_E"
          ],
          "action_summary": "Bước 5: pq.del_min() rút đỉnh E (dist=10.0). Đỉnh không có cạnh đi ra. Hàng đợi rỗng."
        }
      ]
    },
    "floyd_warshall": {
      "vertices": [
        "A",
        "B",
        "C",
        "D",
        "E"
      ],
      "has_negative_cycle": false,
      "final_dist_matrix": [
        [
          0.0,
          3.0,
          2.0,
          7.0,
          10.0
        ],
        [
          null,
          0.0,
          null,
          4.0,
          7.0
        ],
        [
          null,
          1.0,
          0.0,
          5.0,
          8.0
        ],
        [
          null,
          null,
          null,
          0.0,
          3.0
        ],
        [
          null,
          null,
          null,
          null,
          0.0
        ]
      ],
      "final_parent_matrix": [
        [
          -1,
          2,
          0,
          1,
          3
        ],
        [
          -1,
          -1,
          -1,
          1,
          3
        ],
        [
          -1,
          2,
          -1,
          1,
          3
        ],
        [
          -1,
          -1,
          -1,
          -1,
          3
        ],
        [
          -1,
          -1,
          -1,
          -1,
          -1
        ]
      ],
      "paths": {
        "A": {
          "A": {
            "path": [
              "A"
            ],
            "distance": 0.0
          },
          "B": {
            "path": [
              "A",
              "C",
              "B"
            ],
            "distance": 3.0
          },
          "C": {
            "path": [
              "A",
              "C"
            ],
            "distance": 2.0
          },
          "D": {
            "path": [
              "A",
              "C",
              "B",
              "D"
            ],
            "distance": 7.0
          },
          "E": {
            "path": [
              "A",
              "C",
              "B",
              "D",
              "E"
            ],
            "distance": 10.0
          }
        },
        "B": {
          "A": {
            "path": [],
            "distance": null
          },
          "B": {
            "path": [
              "B"
            ],
            "distance": 0.0
          },
          "C": {
            "path": [],
            "distance": null
          },
          "D": {
            "path": [
              "B",
              "D"
            ],
            "distance": 4.0
          },
          "E": {
            "path": [
              "B",
              "D",
              "E"
            ],
            "distance": 7.0
          }
        },
        "C": {
          "A": {
            "path": [],
            "distance": null
          },
          "B": {
            "path": [
              "C",
              "B"
            ],
            "distance": 1.0
          },
          "C": {
            "path": [
              "C"
            ],
            "distance": 0.0
          },
          "D": {
            "path": [
              "C",
              "B",
              "D"
            ],
            "distance": 5.0
          },
          "E": {
            "path": [
              "C",
              "B",
              "D",
              "E"
            ],
            "distance": 8.0
          }
        },
        "D": {
          "A": {
            "path": [],
            "distance": null
          },
          "B": {
            "path": [],
            "distance": null
          },
          "C": {
            "path": [],
            "distance": null
          },
          "D": {
            "path": [
              "D"
            ],
            "distance": 0.0
          },
          "E": {
            "path": [
              "D",
              "E"
            ],
            "distance": 3.0
          }
        },
        "E": {
          "A": {
            "path": [],
            "distance": null
          },
          "B": {
            "path": [],
            "distance": null
          },
          "C": {
            "path": [],
            "distance": null
          },
          "D": {
            "path": [],
            "distance": null
          },
          "E": {
            "path": [
              "E"
            ],
            "distance": 0.0
          }
        }
      },
      "trace_steps": [
        {
          "step_index": 0,
          "k": null,
          "k_vertex": null,
          "dist_matrix": [
            [
              0.0,
              5.0,
              2.0,
              null,
              null
            ],
            [
              null,
              0.0,
              null,
              4.0,
              8.0
            ],
            [
              null,
              1.0,
              0.0,
              7.0,
              9.0
            ],
            [
              null,
              null,
              null,
              0.0,
              3.0
            ],
            [
              null,
              null,
              null,
              null,
              0.0
            ]
          ],
          "parent_matrix": [
            [
              -1,
              0,
              0,
              -1,
              -1
            ],
            [
              -1,
              -1,
              -1,
              1,
              1
            ],
            [
              -1,
              2,
              -1,
              2,
              2
            ],
            [
              -1,
              -1,
              -1,
              -1,
              3
            ],
            [
              -1,
              -1,
              -1,
              -1,
              -1
            ]
          ],
          "parent_labels_matrix": [
            [
              "-",
              "A",
              "A",
              "-",
              "-"
            ],
            [
              "-",
              "-",
              "-",
              "B",
              "B"
            ],
            [
              "-",
              "C",
              "-",
              "C",
              "C"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "D"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "-"
            ]
          ],
          "updated_cells": [],
          "description": "Khởi tạo ma trận ban đầu từ trọng số cạnh: _dist[i][j] = w(i, j) và _parent[i][j] = i."
        },
        {
          "step_index": 1,
          "k": 0,
          "k_vertex": "A",
          "dist_matrix": [
            [
              0.0,
              5.0,
              2.0,
              null,
              null
            ],
            [
              null,
              0.0,
              null,
              4.0,
              8.0
            ],
            [
              null,
              1.0,
              0.0,
              7.0,
              9.0
            ],
            [
              null,
              null,
              null,
              0.0,
              3.0
            ],
            [
              null,
              null,
              null,
              null,
              0.0
            ]
          ],
          "parent_matrix": [
            [
              -1,
              0,
              0,
              -1,
              -1
            ],
            [
              -1,
              -1,
              -1,
              1,
              1
            ],
            [
              -1,
              2,
              -1,
              2,
              2
            ],
            [
              -1,
              -1,
              -1,
              -1,
              3
            ],
            [
              -1,
              -1,
              -1,
              -1,
              -1
            ]
          ],
          "parent_labels_matrix": [
            [
              "-",
              "A",
              "A",
              "-",
              "-"
            ],
            [
              "-",
              "-",
              "-",
              "B",
              "B"
            ],
            [
              "-",
              "C",
              "-",
              "C",
              "C"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "D"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "-"
            ]
          ],
          "updated_cells": [],
          "description": "Bước k = 0 (xét đỉnh trung gian A): Không có đường đi nào qua đỉnh A ngắn hơn đường hiện tại. Ma trận giữ nguyên."
        },
        {
          "step_index": 2,
          "k": 1,
          "k_vertex": "B",
          "dist_matrix": [
            [
              0.0,
              5.0,
              2.0,
              9.0,
              13.0
            ],
            [
              null,
              0.0,
              null,
              4.0,
              8.0
            ],
            [
              null,
              1.0,
              0.0,
              5.0,
              9.0
            ],
            [
              null,
              null,
              null,
              0.0,
              3.0
            ],
            [
              null,
              null,
              null,
              null,
              0.0
            ]
          ],
          "parent_matrix": [
            [
              -1,
              0,
              0,
              1,
              1
            ],
            [
              -1,
              -1,
              -1,
              1,
              1
            ],
            [
              -1,
              2,
              -1,
              1,
              2
            ],
            [
              -1,
              -1,
              -1,
              -1,
              3
            ],
            [
              -1,
              -1,
              -1,
              -1,
              -1
            ]
          ],
          "parent_labels_matrix": [
            [
              "-",
              "A",
              "A",
              "B",
              "B"
            ],
            [
              "-",
              "-",
              "-",
              "B",
              "B"
            ],
            [
              "-",
              "C",
              "-",
              "B",
              "C"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "D"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "-"
            ]
          ],
          "updated_cells": [
            {
              "i": "A",
              "j": "D",
              "i_idx": 0,
              "j_idx": 3,
              "old_dist": null,
              "new_dist": 9.0,
              "old_parent": "-",
              "new_parent": "B",
              "formula": "D[A][D] = min(∞, D[A][B] + D[B][D]) = 9.0"
            },
            {
              "i": "A",
              "j": "E",
              "i_idx": 0,
              "j_idx": 4,
              "old_dist": null,
              "new_dist": 13.0,
              "old_parent": "-",
              "new_parent": "B",
              "formula": "D[A][E] = min(∞, D[A][B] + D[B][E]) = 13.0"
            },
            {
              "i": "C",
              "j": "D",
              "i_idx": 2,
              "j_idx": 3,
              "old_dist": 7.0,
              "new_dist": 5.0,
              "old_parent": "C",
              "new_parent": "B",
              "formula": "D[C][D] = min(7.0, D[C][B] + D[B][D]) = 5.0"
            }
          ],
          "description": "Bước k = 1 (xét đỉnh trung gian B): Cập nhật tối ưu 3 ô [(A→D: 9.0), (A→E: 13.0), (C→D: 5.0)]. Gán _parent[i][j] = _parent[B][j]."
        },
        {
          "step_index": 3,
          "k": 2,
          "k_vertex": "C",
          "dist_matrix": [
            [
              0.0,
              3.0,
              2.0,
              7.0,
              11.0
            ],
            [
              null,
              0.0,
              null,
              4.0,
              8.0
            ],
            [
              null,
              1.0,
              0.0,
              5.0,
              9.0
            ],
            [
              null,
              null,
              null,
              0.0,
              3.0
            ],
            [
              null,
              null,
              null,
              null,
              0.0
            ]
          ],
          "parent_matrix": [
            [
              -1,
              2,
              0,
              1,
              2
            ],
            [
              -1,
              -1,
              -1,
              1,
              1
            ],
            [
              -1,
              2,
              -1,
              1,
              2
            ],
            [
              -1,
              -1,
              -1,
              -1,
              3
            ],
            [
              -1,
              -1,
              -1,
              -1,
              -1
            ]
          ],
          "parent_labels_matrix": [
            [
              "-",
              "C",
              "A",
              "B",
              "C"
            ],
            [
              "-",
              "-",
              "-",
              "B",
              "B"
            ],
            [
              "-",
              "C",
              "-",
              "B",
              "C"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "D"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "-"
            ]
          ],
          "updated_cells": [
            {
              "i": "A",
              "j": "B",
              "i_idx": 0,
              "j_idx": 1,
              "old_dist": 5.0,
              "new_dist": 3.0,
              "old_parent": "A",
              "new_parent": "C",
              "formula": "D[A][B] = min(5.0, D[A][C] + D[C][B]) = 3.0"
            },
            {
              "i": "A",
              "j": "D",
              "i_idx": 0,
              "j_idx": 3,
              "old_dist": 9.0,
              "new_dist": 7.0,
              "old_parent": "B",
              "new_parent": "B",
              "formula": "D[A][D] = min(9.0, D[A][C] + D[C][D]) = 7.0"
            },
            {
              "i": "A",
              "j": "E",
              "i_idx": 0,
              "j_idx": 4,
              "old_dist": 13.0,
              "new_dist": 11.0,
              "old_parent": "B",
              "new_parent": "C",
              "formula": "D[A][E] = min(13.0, D[A][C] + D[C][E]) = 11.0"
            }
          ],
          "description": "Bước k = 2 (xét đỉnh trung gian C): Cập nhật tối ưu 3 ô [(A→B: 3.0), (A→D: 7.0), (A→E: 11.0)]. Gán _parent[i][j] = _parent[C][j]."
        },
        {
          "step_index": 4,
          "k": 3,
          "k_vertex": "D",
          "dist_matrix": [
            [
              0.0,
              3.0,
              2.0,
              7.0,
              10.0
            ],
            [
              null,
              0.0,
              null,
              4.0,
              7.0
            ],
            [
              null,
              1.0,
              0.0,
              5.0,
              8.0
            ],
            [
              null,
              null,
              null,
              0.0,
              3.0
            ],
            [
              null,
              null,
              null,
              null,
              0.0
            ]
          ],
          "parent_matrix": [
            [
              -1,
              2,
              0,
              1,
              3
            ],
            [
              -1,
              -1,
              -1,
              1,
              3
            ],
            [
              -1,
              2,
              -1,
              1,
              3
            ],
            [
              -1,
              -1,
              -1,
              -1,
              3
            ],
            [
              -1,
              -1,
              -1,
              -1,
              -1
            ]
          ],
          "parent_labels_matrix": [
            [
              "-",
              "C",
              "A",
              "B",
              "D"
            ],
            [
              "-",
              "-",
              "-",
              "B",
              "D"
            ],
            [
              "-",
              "C",
              "-",
              "B",
              "D"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "D"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "-"
            ]
          ],
          "updated_cells": [
            {
              "i": "A",
              "j": "E",
              "i_idx": 0,
              "j_idx": 4,
              "old_dist": 11.0,
              "new_dist": 10.0,
              "old_parent": "C",
              "new_parent": "D",
              "formula": "D[A][E] = min(11.0, D[A][D] + D[D][E]) = 10.0"
            },
            {
              "i": "B",
              "j": "E",
              "i_idx": 1,
              "j_idx": 4,
              "old_dist": 8.0,
              "new_dist": 7.0,
              "old_parent": "B",
              "new_parent": "D",
              "formula": "D[B][E] = min(8.0, D[B][D] + D[D][E]) = 7.0"
            },
            {
              "i": "C",
              "j": "E",
              "i_idx": 2,
              "j_idx": 4,
              "old_dist": 9.0,
              "new_dist": 8.0,
              "old_parent": "C",
              "new_parent": "D",
              "formula": "D[C][E] = min(9.0, D[C][D] + D[D][E]) = 8.0"
            }
          ],
          "description": "Bước k = 3 (xét đỉnh trung gian D): Cập nhật tối ưu 3 ô [(A→E: 10.0), (B→E: 7.0), (C→E: 8.0)]. Gán _parent[i][j] = _parent[D][j]."
        },
        {
          "step_index": 5,
          "k": 4,
          "k_vertex": "E",
          "dist_matrix": [
            [
              0.0,
              3.0,
              2.0,
              7.0,
              10.0
            ],
            [
              null,
              0.0,
              null,
              4.0,
              7.0
            ],
            [
              null,
              1.0,
              0.0,
              5.0,
              8.0
            ],
            [
              null,
              null,
              null,
              0.0,
              3.0
            ],
            [
              null,
              null,
              null,
              null,
              0.0
            ]
          ],
          "parent_matrix": [
            [
              -1,
              2,
              0,
              1,
              3
            ],
            [
              -1,
              -1,
              -1,
              1,
              3
            ],
            [
              -1,
              2,
              -1,
              1,
              3
            ],
            [
              -1,
              -1,
              -1,
              -1,
              3
            ],
            [
              -1,
              -1,
              -1,
              -1,
              -1
            ]
          ],
          "parent_labels_matrix": [
            [
              "-",
              "C",
              "A",
              "B",
              "D"
            ],
            [
              "-",
              "-",
              "-",
              "B",
              "D"
            ],
            [
              "-",
              "C",
              "-",
              "B",
              "D"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "D"
            ],
            [
              "-",
              "-",
              "-",
              "-",
              "-"
            ]
          ],
          "updated_cells": [],
          "description": "Bước k = 4 (xét đỉnh trung gian E): Không có đường đi nào qua đỉnh E ngắn hơn đường hiện tại. Ma trận giữ nguyên."
        }
      ]
    }
  },
  "emergency_system": {
    "locations": [
      "H1",
      "H2",
      "R1",
      "R2",
      "R3",
      "R4"
    ],
    "location_details": {
      "H1": {
        "name": "Bệnh viện Đa khoa Trung tâm",
        "type": "hospital",
        "color": "#ef4444"
      },
      "H2": {
        "name": "Trạm Cấp cứu Vệ tinh Nam",
        "type": "hospital",
        "color": "#ef4444"
      },
      "R1": {
        "name": "Khu Đô thị Cổ",
        "type": "residential",
        "color": "#06b6d4"
      },
      "R2": {
        "name": "Khu Đô thị Mới phía Đông",
        "type": "residential",
        "color": "#06b6d4"
      },
      "R3": {
        "name": "Khu Công nghệ cao phía Tây",
        "type": "residential",
        "color": "#06b6d4"
      },
      "R4": {
        "name": "Khu Dân cư Ven sông",
        "type": "residential",
        "color": "#06b6d4"
      }
    },
    "nodes_layout": [
      {
        "id": "H1",
        "label": "H1 (Trung tâm)",
        "x": 150,
        "y": 150,
        "type": "hospital"
      },
      {
        "id": "H2",
        "label": "H2 (Vệ tinh)",
        "x": 150,
        "y": 380,
        "type": "hospital"
      },
      {
        "id": "R1",
        "label": "R1 (Phố Cổ)",
        "x": 380,
        "y": 120,
        "type": "residential"
      },
      {
        "id": "R2",
        "label": "R2 (KĐT Mới)",
        "x": 620,
        "y": 170,
        "type": "residential"
      },
      {
        "id": "R3",
        "label": "R3 (Khu CNC)",
        "x": 420,
        "y": 370,
        "type": "residential"
      },
      {
        "id": "R4",
        "label": "R4 (Ven sông)",
        "x": 700,
        "y": 370,
        "type": "residential"
      }
    ],
    "edges": [
      {
        "id": "em_H1_R1",
        "source": "H1",
        "target": "R1",
        "weight": 4.0
      },
      {
        "id": "em_H1_R2",
        "source": "H1",
        "target": "R2",
        "weight": 6.0
      },
      {
        "id": "em_R1_R2",
        "source": "R1",
        "target": "R2",
        "weight": 3.0
      },
      {
        "id": "em_R1_R3",
        "source": "R1",
        "target": "R3",
        "weight": 8.0
      },
      {
        "id": "em_R2_R3",
        "source": "R2",
        "target": "R3",
        "weight": 4.0
      },
      {
        "id": "em_R2_R4",
        "source": "R2",
        "target": "R4",
        "weight": 12.0
      },
      {
        "id": "em_R3_R4",
        "source": "R3",
        "target": "R4",
        "weight": 5.0
      },
      {
        "id": "em_H2_R3",
        "source": "H2",
        "target": "R3",
        "weight": 6.0
      },
      {
        "id": "em_H2_R4",
        "source": "H2",
        "target": "R4",
        "weight": 7.0
      },
      {
        "id": "em_R4_R1",
        "source": "R4",
        "target": "R1",
        "weight": 15.0
      }
    ],
    "residential_areas": [
      "R1",
      "R2",
      "R3",
      "R4"
    ],
    "dispatch_to_r4": {
      "target": "R4",
      "from_h1": {
        "distance": 15.0,
        "path": [
          "H1",
          "R2",
          "R3",
          "R4"
        ]
      },
      "from_h2": {
        "distance": 7.0,
        "path": [
          "H2",
          "R4"
        ]
      },
      "winner": "H2",
      "saved_time": 8.0
    },
    "network_delay_leetcode_743": {
      "source": "H1",
      "residential_delays": {
        "R1": 4.0,
        "R2": 6.0,
        "R3": 10.0,
        "R4": 15.0
      },
      "total_delay": 15.0,
      "all_reachable": true
    },
    "hub_placement_leetcode_1334": {
      "threshold_minutes": 15.0,
      "evaluations": [
        {
          "hub": "R1",
          "name": "Khu Đô thị Cổ",
          "covered_areas": [
            "R1",
            "R2",
            "R3",
            "R4"
          ],
          "covered_count": 4,
          "total_residential": 4,
          "is_fully_covered": true,
          "times_to_residential": {
            "R1": 0.0,
            "R2": 3.0,
            "R3": 7.0,
            "R4": 12.0
          },
          "worst_case_time": 12.0
        },
        {
          "hub": "H1",
          "name": "Bệnh viện Đa khoa Trung tâm",
          "covered_areas": [
            "R1",
            "R2",
            "R3",
            "R4"
          ],
          "covered_count": 4,
          "total_residential": 4,
          "is_fully_covered": true,
          "times_to_residential": {
            "R1": 4.0,
            "R2": 6.0,
            "R3": 10.0,
            "R4": 15.0
          },
          "worst_case_time": 15.0
        },
        {
          "hub": "R2",
          "name": "Khu Đô thị Mới phía Đông",
          "covered_areas": [
            "R2",
            "R3",
            "R4"
          ],
          "covered_count": 3,
          "total_residential": 4,
          "is_fully_covered": false,
          "times_to_residential": {
            "R1": 24.0,
            "R2": 0.0,
            "R3": 4.0,
            "R4": 9.0
          },
          "worst_case_time": 24.0
        },
        {
          "hub": "R3",
          "name": "Khu Công nghệ cao phía Tây",
          "covered_areas": [
            "R3",
            "R4"
          ],
          "covered_count": 2,
          "total_residential": 4,
          "is_fully_covered": false,
          "times_to_residential": {
            "R1": 20.0,
            "R2": 23.0,
            "R3": 0.0,
            "R4": 5.0
          },
          "worst_case_time": 23.0
        },
        {
          "hub": "H2",
          "name": "Trạm Cấp cứu Vệ tinh Nam",
          "covered_areas": [
            "R3",
            "R4"
          ],
          "covered_count": 2,
          "total_residential": 4,
          "is_fully_covered": false,
          "times_to_residential": {
            "R1": 22.0,
            "R2": 25.0,
            "R3": 6.0,
            "R4": 7.0
          },
          "worst_case_time": 25.0
        }
      ],
      "optimal_hub": {
        "hub": "R1",
        "name": "Khu Đô thị Cổ",
        "covered_areas": [
          "R1",
          "R2",
          "R3",
          "R4"
        ],
        "covered_count": 4,
        "total_residential": 4,
        "is_fully_covered": true,
        "times_to_residential": {
          "R1": 0.0,
          "R2": 3.0,
          "R3": 7.0,
          "R4": 12.0
        },
        "worst_case_time": 12.0
      }
    },
    "dijkstra_h1_trace": [
      {
        "step_index": 0,
        "phase": "INIT",
        "current_vertex": null,
        "current_vertex_idx": null,
        "current_dist": null,
        "settled_vertices": [],
        "pq_snapshot": [
          {
            "vertex": "H1",
            "idx": 0,
            "dist": 0.0,
            "heap_pos": 1
          }
        ],
        "dist_to": {
          "H1": 0.0,
          "H2": null,
          "R1": null,
          "R2": null,
          "R3": null,
          "R4": null
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": null,
          "R2": null,
          "R3": null,
          "R4": null
        },
        "relaxed_edges": [],
        "decrease_key_nodes": [],
        "spt_edges": [],
        "action_summary": "Khởi tạo nguồn s = H1: gán _dist_to[H1] = 0.0, gọi pq.insert(H1, 0.0)."
      },
      {
        "step_index": 1,
        "phase": "DEL_MIN",
        "current_vertex": "H1",
        "current_vertex_idx": 0,
        "current_dist": 0.0,
        "settled_vertices": [
          "H1"
        ],
        "pq_snapshot": [
          {
            "vertex": "R1",
            "idx": 2,
            "dist": 4.0,
            "heap_pos": 1
          },
          {
            "vertex": "R2",
            "idx": 3,
            "dist": 6.0,
            "heap_pos": 2
          }
        ],
        "dist_to": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": null,
          "R4": null
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": {
            "from": "H1",
            "to": "R1",
            "weight": 4.0,
            "edge_id": "e_H1_R1"
          },
          "R2": {
            "from": "H1",
            "to": "R2",
            "weight": 6.0,
            "edge_id": "e_H1_R2"
          },
          "R3": null,
          "R4": null
        },
        "relaxed_edges": [
          {
            "edge_id": "e_H1_R1",
            "from": "H1",
            "to": "R1",
            "weight": 4.0,
            "old_dist": null,
            "new_dist": 4.0,
            "action": "insert",
            "detail": "pq.insert(R1, 4.0)"
          },
          {
            "edge_id": "e_H1_R2",
            "from": "H1",
            "to": "R2",
            "weight": 6.0,
            "old_dist": null,
            "new_dist": 6.0,
            "action": "insert",
            "detail": "pq.insert(R2, 6.0)"
          }
        ],
        "decrease_key_nodes": [],
        "spt_edges": [
          "e_H1_R1",
          "e_H1_R2"
        ],
        "action_summary": "Bước 1: pq.del_min() rút đỉnh nguồn H1 (dist=0.0). Nới lỏng các cạnh kề, thêm vào IndexMinPQ."
      },
      {
        "step_index": 2,
        "phase": "DEL_MIN",
        "current_vertex": "R1",
        "current_vertex_idx": 2,
        "current_dist": 4.0,
        "settled_vertices": [
          "H1",
          "R1"
        ],
        "pq_snapshot": [
          {
            "vertex": "R2",
            "idx": 3,
            "dist": 6.0,
            "heap_pos": 1
          },
          {
            "vertex": "R3",
            "idx": 4,
            "dist": 12.0,
            "heap_pos": 2
          }
        ],
        "dist_to": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": 12.0,
          "R4": null
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": {
            "from": "H1",
            "to": "R1",
            "weight": 4.0,
            "edge_id": "e_H1_R1"
          },
          "R2": {
            "from": "H1",
            "to": "R2",
            "weight": 6.0,
            "edge_id": "e_H1_R2"
          },
          "R3": {
            "from": "R1",
            "to": "R3",
            "weight": 8.0,
            "edge_id": "e_R1_R3"
          },
          "R4": null
        },
        "relaxed_edges": [
          {
            "edge_id": "e_R1_R2",
            "from": "R1",
            "to": "R2",
            "weight": 3.0,
            "old_dist": 6.0,
            "new_dist": 6.0,
            "action": "skip",
            "detail": "Bỏ qua: khoảng cách cũ 6.0 <= đường mới 7.0"
          },
          {
            "edge_id": "e_R1_R3",
            "from": "R1",
            "to": "R3",
            "weight": 8.0,
            "old_dist": null,
            "new_dist": 12.0,
            "action": "insert",
            "detail": "pq.insert(R3, 12.0)"
          }
        ],
        "decrease_key_nodes": [],
        "spt_edges": [
          "e_H1_R1",
          "e_H1_R2",
          "e_R1_R3"
        ],
        "action_summary": "Bước 2: pq.del_min() rút đỉnh R1 (dist=4.0). Nới lỏng: thêm R3 (12.0) qua insert."
      },
      {
        "step_index": 3,
        "phase": "DEL_MIN",
        "current_vertex": "R2",
        "current_vertex_idx": 3,
        "current_dist": 6.0,
        "settled_vertices": [
          "H1",
          "R1",
          "R2"
        ],
        "pq_snapshot": [
          {
            "vertex": "R3",
            "idx": 4,
            "dist": 10.0,
            "heap_pos": 1
          },
          {
            "vertex": "R4",
            "idx": 5,
            "dist": 18.0,
            "heap_pos": 2
          }
        ],
        "dist_to": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": 10.0,
          "R4": 18.0
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": {
            "from": "H1",
            "to": "R1",
            "weight": 4.0,
            "edge_id": "e_H1_R1"
          },
          "R2": {
            "from": "H1",
            "to": "R2",
            "weight": 6.0,
            "edge_id": "e_H1_R2"
          },
          "R3": {
            "from": "R2",
            "to": "R3",
            "weight": 4.0,
            "edge_id": "e_R2_R3"
          },
          "R4": {
            "from": "R2",
            "to": "R4",
            "weight": 12.0,
            "edge_id": "e_R2_R4"
          }
        },
        "relaxed_edges": [
          {
            "edge_id": "e_R2_R3",
            "from": "R2",
            "to": "R3",
            "weight": 4.0,
            "old_dist": 12.0,
            "new_dist": 10.0,
            "action": "decrease_key",
            "detail": "pq.decrease_key(R3, 10.0): giảm từ 12.0 xuống 10.0"
          },
          {
            "edge_id": "e_R2_R4",
            "from": "R2",
            "to": "R4",
            "weight": 12.0,
            "old_dist": null,
            "new_dist": 18.0,
            "action": "insert",
            "detail": "pq.insert(R4, 18.0)"
          }
        ],
        "decrease_key_nodes": [
          "R3"
        ],
        "spt_edges": [
          "e_H1_R1",
          "e_H1_R2",
          "e_R2_R3",
          "e_R2_R4"
        ],
        "action_summary": "Bước 3: pq.del_min() rút đỉnh R2 (dist=6.0). Nới lỏng: giảm R3 (12.0→10.0) qua decrease_key, thêm R4 (18.0) qua insert."
      },
      {
        "step_index": 4,
        "phase": "DEL_MIN",
        "current_vertex": "R3",
        "current_vertex_idx": 4,
        "current_dist": 10.0,
        "settled_vertices": [
          "H1",
          "R1",
          "R2",
          "R3"
        ],
        "pq_snapshot": [
          {
            "vertex": "R4",
            "idx": 5,
            "dist": 15.0,
            "heap_pos": 1
          }
        ],
        "dist_to": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": 10.0,
          "R4": 15.0
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": {
            "from": "H1",
            "to": "R1",
            "weight": 4.0,
            "edge_id": "e_H1_R1"
          },
          "R2": {
            "from": "H1",
            "to": "R2",
            "weight": 6.0,
            "edge_id": "e_H1_R2"
          },
          "R3": {
            "from": "R2",
            "to": "R3",
            "weight": 4.0,
            "edge_id": "e_R2_R3"
          },
          "R4": {
            "from": "R3",
            "to": "R4",
            "weight": 5.0,
            "edge_id": "e_R3_R4"
          }
        },
        "relaxed_edges": [
          {
            "edge_id": "e_R3_R4",
            "from": "R3",
            "to": "R4",
            "weight": 5.0,
            "old_dist": 18.0,
            "new_dist": 15.0,
            "action": "decrease_key",
            "detail": "pq.decrease_key(R4, 15.0): giảm từ 18.0 xuống 15.0"
          }
        ],
        "decrease_key_nodes": [
          "R4"
        ],
        "spt_edges": [
          "e_H1_R1",
          "e_H1_R2",
          "e_R2_R3",
          "e_R3_R4"
        ],
        "action_summary": "Bước 4: pq.del_min() rút đỉnh R3 (dist=10.0). Nới lỏng: giảm R4 (18.0→15.0) qua decrease_key."
      },
      {
        "step_index": 5,
        "phase": "DEL_MIN",
        "current_vertex": "R4",
        "current_vertex_idx": 5,
        "current_dist": 15.0,
        "settled_vertices": [
          "H1",
          "R1",
          "R2",
          "R3",
          "R4"
        ],
        "pq_snapshot": [],
        "dist_to": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": 10.0,
          "R4": 15.0
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": {
            "from": "H1",
            "to": "R1",
            "weight": 4.0,
            "edge_id": "e_H1_R1"
          },
          "R2": {
            "from": "H1",
            "to": "R2",
            "weight": 6.0,
            "edge_id": "e_H1_R2"
          },
          "R3": {
            "from": "R2",
            "to": "R3",
            "weight": 4.0,
            "edge_id": "e_R2_R3"
          },
          "R4": {
            "from": "R3",
            "to": "R4",
            "weight": 5.0,
            "edge_id": "e_R3_R4"
          }
        },
        "relaxed_edges": [
          {
            "edge_id": "e_R4_R1",
            "from": "R4",
            "to": "R1",
            "weight": 15.0,
            "old_dist": 4.0,
            "new_dist": 4.0,
            "action": "skip",
            "detail": "Bỏ qua: khoảng cách cũ 4.0 <= đường mới 30.0"
          }
        ],
        "decrease_key_nodes": [],
        "spt_edges": [
          "e_H1_R1",
          "e_H1_R2",
          "e_R2_R3",
          "e_R3_R4"
        ],
        "action_summary": "Bước 5: pq.del_min() rút đỉnh R4 (dist=15.0). Nới lỏng: các cạnh không cải thiện."
      }
    ],
    "dijkstra_h2_trace": [
      {
        "step_index": 0,
        "phase": "INIT",
        "current_vertex": null,
        "current_vertex_idx": null,
        "current_dist": null,
        "settled_vertices": [],
        "pq_snapshot": [
          {
            "vertex": "H2",
            "idx": 1,
            "dist": 0.0,
            "heap_pos": 1
          }
        ],
        "dist_to": {
          "H1": null,
          "H2": 0.0,
          "R1": null,
          "R2": null,
          "R3": null,
          "R4": null
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": null,
          "R2": null,
          "R3": null,
          "R4": null
        },
        "relaxed_edges": [],
        "decrease_key_nodes": [],
        "spt_edges": [],
        "action_summary": "Khởi tạo nguồn s = H2: gán _dist_to[H2] = 0.0, gọi pq.insert(H2, 0.0)."
      },
      {
        "step_index": 1,
        "phase": "DEL_MIN",
        "current_vertex": "H2",
        "current_vertex_idx": 1,
        "current_dist": 0.0,
        "settled_vertices": [
          "H2"
        ],
        "pq_snapshot": [
          {
            "vertex": "R3",
            "idx": 4,
            "dist": 6.0,
            "heap_pos": 1
          },
          {
            "vertex": "R4",
            "idx": 5,
            "dist": 7.0,
            "heap_pos": 2
          }
        ],
        "dist_to": {
          "H1": null,
          "H2": 0.0,
          "R1": null,
          "R2": null,
          "R3": 6.0,
          "R4": 7.0
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": null,
          "R2": null,
          "R3": {
            "from": "H2",
            "to": "R3",
            "weight": 6.0,
            "edge_id": "e_H2_R3"
          },
          "R4": {
            "from": "H2",
            "to": "R4",
            "weight": 7.0,
            "edge_id": "e_H2_R4"
          }
        },
        "relaxed_edges": [
          {
            "edge_id": "e_H2_R3",
            "from": "H2",
            "to": "R3",
            "weight": 6.0,
            "old_dist": null,
            "new_dist": 6.0,
            "action": "insert",
            "detail": "pq.insert(R3, 6.0)"
          },
          {
            "edge_id": "e_H2_R4",
            "from": "H2",
            "to": "R4",
            "weight": 7.0,
            "old_dist": null,
            "new_dist": 7.0,
            "action": "insert",
            "detail": "pq.insert(R4, 7.0)"
          }
        ],
        "decrease_key_nodes": [],
        "spt_edges": [
          "e_H2_R3",
          "e_H2_R4"
        ],
        "action_summary": "Bước 1: pq.del_min() rút đỉnh nguồn H2 (dist=0.0). Nới lỏng các cạnh kề, thêm vào IndexMinPQ."
      },
      {
        "step_index": 2,
        "phase": "DEL_MIN",
        "current_vertex": "R3",
        "current_vertex_idx": 4,
        "current_dist": 6.0,
        "settled_vertices": [
          "H2",
          "R3"
        ],
        "pq_snapshot": [
          {
            "vertex": "R4",
            "idx": 5,
            "dist": 7.0,
            "heap_pos": 1
          }
        ],
        "dist_to": {
          "H1": null,
          "H2": 0.0,
          "R1": null,
          "R2": null,
          "R3": 6.0,
          "R4": 7.0
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": null,
          "R2": null,
          "R3": {
            "from": "H2",
            "to": "R3",
            "weight": 6.0,
            "edge_id": "e_H2_R3"
          },
          "R4": {
            "from": "H2",
            "to": "R4",
            "weight": 7.0,
            "edge_id": "e_H2_R4"
          }
        },
        "relaxed_edges": [
          {
            "edge_id": "e_R3_R4",
            "from": "R3",
            "to": "R4",
            "weight": 5.0,
            "old_dist": 7.0,
            "new_dist": 7.0,
            "action": "skip",
            "detail": "Bỏ qua: khoảng cách cũ 7.0 <= đường mới 11.0"
          }
        ],
        "decrease_key_nodes": [],
        "spt_edges": [
          "e_H2_R3",
          "e_H2_R4"
        ],
        "action_summary": "Bước 2: pq.del_min() rút đỉnh R3 (dist=6.0). Nới lỏng: các cạnh không cải thiện."
      },
      {
        "step_index": 3,
        "phase": "DEL_MIN",
        "current_vertex": "R4",
        "current_vertex_idx": 5,
        "current_dist": 7.0,
        "settled_vertices": [
          "H2",
          "R3",
          "R4"
        ],
        "pq_snapshot": [
          {
            "vertex": "R1",
            "idx": 2,
            "dist": 22.0,
            "heap_pos": 1
          }
        ],
        "dist_to": {
          "H1": null,
          "H2": 0.0,
          "R1": 22.0,
          "R2": null,
          "R3": 6.0,
          "R4": 7.0
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": {
            "from": "R4",
            "to": "R1",
            "weight": 15.0,
            "edge_id": "e_R4_R1"
          },
          "R2": null,
          "R3": {
            "from": "H2",
            "to": "R3",
            "weight": 6.0,
            "edge_id": "e_H2_R3"
          },
          "R4": {
            "from": "H2",
            "to": "R4",
            "weight": 7.0,
            "edge_id": "e_H2_R4"
          }
        },
        "relaxed_edges": [
          {
            "edge_id": "e_R4_R1",
            "from": "R4",
            "to": "R1",
            "weight": 15.0,
            "old_dist": null,
            "new_dist": 22.0,
            "action": "insert",
            "detail": "pq.insert(R1, 22.0)"
          }
        ],
        "decrease_key_nodes": [],
        "spt_edges": [
          "e_R4_R1",
          "e_H2_R3",
          "e_H2_R4"
        ],
        "action_summary": "Bước 3: pq.del_min() rút đỉnh R4 (dist=7.0). Nới lỏng: thêm R1 (22.0) qua insert."
      },
      {
        "step_index": 4,
        "phase": "DEL_MIN",
        "current_vertex": "R1",
        "current_vertex_idx": 2,
        "current_dist": 22.0,
        "settled_vertices": [
          "H2",
          "R3",
          "R4",
          "R1"
        ],
        "pq_snapshot": [
          {
            "vertex": "R2",
            "idx": 3,
            "dist": 25.0,
            "heap_pos": 1
          }
        ],
        "dist_to": {
          "H1": null,
          "H2": 0.0,
          "R1": 22.0,
          "R2": 25.0,
          "R3": 6.0,
          "R4": 7.0
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": {
            "from": "R4",
            "to": "R1",
            "weight": 15.0,
            "edge_id": "e_R4_R1"
          },
          "R2": {
            "from": "R1",
            "to": "R2",
            "weight": 3.0,
            "edge_id": "e_R1_R2"
          },
          "R3": {
            "from": "H2",
            "to": "R3",
            "weight": 6.0,
            "edge_id": "e_H2_R3"
          },
          "R4": {
            "from": "H2",
            "to": "R4",
            "weight": 7.0,
            "edge_id": "e_H2_R4"
          }
        },
        "relaxed_edges": [
          {
            "edge_id": "e_R1_R2",
            "from": "R1",
            "to": "R2",
            "weight": 3.0,
            "old_dist": null,
            "new_dist": 25.0,
            "action": "insert",
            "detail": "pq.insert(R2, 25.0)"
          },
          {
            "edge_id": "e_R1_R3",
            "from": "R1",
            "to": "R3",
            "weight": 8.0,
            "old_dist": 6.0,
            "new_dist": 6.0,
            "action": "skip",
            "detail": "Bỏ qua: khoảng cách cũ 6.0 <= đường mới 30.0"
          }
        ],
        "decrease_key_nodes": [],
        "spt_edges": [
          "e_R4_R1",
          "e_R1_R2",
          "e_H2_R3",
          "e_H2_R4"
        ],
        "action_summary": "Bước 4: pq.del_min() rút đỉnh R1 (dist=22.0). Nới lỏng: thêm R2 (25.0) qua insert."
      },
      {
        "step_index": 5,
        "phase": "DEL_MIN",
        "current_vertex": "R2",
        "current_vertex_idx": 3,
        "current_dist": 25.0,
        "settled_vertices": [
          "H2",
          "R3",
          "R4",
          "R1",
          "R2"
        ],
        "pq_snapshot": [],
        "dist_to": {
          "H1": null,
          "H2": 0.0,
          "R1": 22.0,
          "R2": 25.0,
          "R3": 6.0,
          "R4": 7.0
        },
        "edge_to": {
          "H1": null,
          "H2": null,
          "R1": {
            "from": "R4",
            "to": "R1",
            "weight": 15.0,
            "edge_id": "e_R4_R1"
          },
          "R2": {
            "from": "R1",
            "to": "R2",
            "weight": 3.0,
            "edge_id": "e_R1_R2"
          },
          "R3": {
            "from": "H2",
            "to": "R3",
            "weight": 6.0,
            "edge_id": "e_H2_R3"
          },
          "R4": {
            "from": "H2",
            "to": "R4",
            "weight": 7.0,
            "edge_id": "e_H2_R4"
          }
        },
        "relaxed_edges": [
          {
            "edge_id": "e_R2_R3",
            "from": "R2",
            "to": "R3",
            "weight": 4.0,
            "old_dist": 6.0,
            "new_dist": 6.0,
            "action": "skip",
            "detail": "Bỏ qua: khoảng cách cũ 6.0 <= đường mới 29.0"
          },
          {
            "edge_id": "e_R2_R4",
            "from": "R2",
            "to": "R4",
            "weight": 12.0,
            "old_dist": 7.0,
            "new_dist": 7.0,
            "action": "skip",
            "detail": "Bỏ qua: khoảng cách cũ 7.0 <= đường mới 37.0"
          }
        ],
        "decrease_key_nodes": [],
        "spt_edges": [
          "e_R4_R1",
          "e_R1_R2",
          "e_H2_R3",
          "e_H2_R4"
        ],
        "action_summary": "Bước 5: pq.del_min() rút đỉnh R2 (dist=25.0). Nới lỏng: các cạnh không cải thiện."
      }
    ],
    "floyd_warshall_trace": [
      {
        "step_index": 0,
        "k": null,
        "k_vertex": null,
        "dist_matrix": [
          [
            0.0,
            null,
            4.0,
            6.0,
            null,
            null
          ],
          [
            null,
            0.0,
            null,
            null,
            6.0,
            7.0
          ],
          [
            null,
            null,
            0.0,
            3.0,
            8.0,
            null
          ],
          [
            null,
            null,
            null,
            0.0,
            4.0,
            12.0
          ],
          [
            null,
            null,
            null,
            null,
            0.0,
            5.0
          ],
          [
            null,
            null,
            15.0,
            null,
            null,
            0.0
          ]
        ],
        "parent_matrix": [
          [
            -1,
            -1,
            0,
            0,
            -1,
            -1
          ],
          [
            -1,
            -1,
            -1,
            -1,
            1,
            1
          ],
          [
            -1,
            -1,
            -1,
            2,
            2,
            -1
          ],
          [
            -1,
            -1,
            -1,
            -1,
            3,
            3
          ],
          [
            -1,
            -1,
            -1,
            -1,
            -1,
            4
          ],
          [
            -1,
            -1,
            5,
            -1,
            -1,
            -1
          ]
        ],
        "parent_labels_matrix": [
          [
            "-",
            "-",
            "H1",
            "H1",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "H2",
            "H2"
          ],
          [
            "-",
            "-",
            "-",
            "R1",
            "R1",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "R2",
            "R2"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "R3"
          ],
          [
            "-",
            "-",
            "R4",
            "-",
            "-",
            "-"
          ]
        ],
        "updated_cells": [],
        "description": "Khởi tạo ma trận ban đầu từ trọng số cạnh: _dist[i][j] = w(i, j) và _parent[i][j] = i."
      },
      {
        "step_index": 1,
        "k": 0,
        "k_vertex": "H1",
        "dist_matrix": [
          [
            0.0,
            null,
            4.0,
            6.0,
            null,
            null
          ],
          [
            null,
            0.0,
            null,
            null,
            6.0,
            7.0
          ],
          [
            null,
            null,
            0.0,
            3.0,
            8.0,
            null
          ],
          [
            null,
            null,
            null,
            0.0,
            4.0,
            12.0
          ],
          [
            null,
            null,
            null,
            null,
            0.0,
            5.0
          ],
          [
            null,
            null,
            15.0,
            null,
            null,
            0.0
          ]
        ],
        "parent_matrix": [
          [
            -1,
            -1,
            0,
            0,
            -1,
            -1
          ],
          [
            -1,
            -1,
            -1,
            -1,
            1,
            1
          ],
          [
            -1,
            -1,
            -1,
            2,
            2,
            -1
          ],
          [
            -1,
            -1,
            -1,
            -1,
            3,
            3
          ],
          [
            -1,
            -1,
            -1,
            -1,
            -1,
            4
          ],
          [
            -1,
            -1,
            5,
            -1,
            -1,
            -1
          ]
        ],
        "parent_labels_matrix": [
          [
            "-",
            "-",
            "H1",
            "H1",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "H2",
            "H2"
          ],
          [
            "-",
            "-",
            "-",
            "R1",
            "R1",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "R2",
            "R2"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "R3"
          ],
          [
            "-",
            "-",
            "R4",
            "-",
            "-",
            "-"
          ]
        ],
        "updated_cells": [],
        "description": "Bước k = 0 (xét đỉnh trung gian H1): Không có đường đi nào qua đỉnh H1 ngắn hơn đường hiện tại. Ma trận giữ nguyên."
      },
      {
        "step_index": 2,
        "k": 1,
        "k_vertex": "H2",
        "dist_matrix": [
          [
            0.0,
            null,
            4.0,
            6.0,
            null,
            null
          ],
          [
            null,
            0.0,
            null,
            null,
            6.0,
            7.0
          ],
          [
            null,
            null,
            0.0,
            3.0,
            8.0,
            null
          ],
          [
            null,
            null,
            null,
            0.0,
            4.0,
            12.0
          ],
          [
            null,
            null,
            null,
            null,
            0.0,
            5.0
          ],
          [
            null,
            null,
            15.0,
            null,
            null,
            0.0
          ]
        ],
        "parent_matrix": [
          [
            -1,
            -1,
            0,
            0,
            -1,
            -1
          ],
          [
            -1,
            -1,
            -1,
            -1,
            1,
            1
          ],
          [
            -1,
            -1,
            -1,
            2,
            2,
            -1
          ],
          [
            -1,
            -1,
            -1,
            -1,
            3,
            3
          ],
          [
            -1,
            -1,
            -1,
            -1,
            -1,
            4
          ],
          [
            -1,
            -1,
            5,
            -1,
            -1,
            -1
          ]
        ],
        "parent_labels_matrix": [
          [
            "-",
            "-",
            "H1",
            "H1",
            "-",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "H2",
            "H2"
          ],
          [
            "-",
            "-",
            "-",
            "R1",
            "R1",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "R2",
            "R2"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "R3"
          ],
          [
            "-",
            "-",
            "R4",
            "-",
            "-",
            "-"
          ]
        ],
        "updated_cells": [],
        "description": "Bước k = 1 (xét đỉnh trung gian H2): Không có đường đi nào qua đỉnh H2 ngắn hơn đường hiện tại. Ma trận giữ nguyên."
      },
      {
        "step_index": 3,
        "k": 2,
        "k_vertex": "R1",
        "dist_matrix": [
          [
            0.0,
            null,
            4.0,
            6.0,
            12.0,
            null
          ],
          [
            null,
            0.0,
            null,
            null,
            6.0,
            7.0
          ],
          [
            null,
            null,
            0.0,
            3.0,
            8.0,
            null
          ],
          [
            null,
            null,
            null,
            0.0,
            4.0,
            12.0
          ],
          [
            null,
            null,
            null,
            null,
            0.0,
            5.0
          ],
          [
            null,
            null,
            15.0,
            18.0,
            23.0,
            0.0
          ]
        ],
        "parent_matrix": [
          [
            -1,
            -1,
            0,
            0,
            2,
            -1
          ],
          [
            -1,
            -1,
            -1,
            -1,
            1,
            1
          ],
          [
            -1,
            -1,
            -1,
            2,
            2,
            -1
          ],
          [
            -1,
            -1,
            -1,
            -1,
            3,
            3
          ],
          [
            -1,
            -1,
            -1,
            -1,
            -1,
            4
          ],
          [
            -1,
            -1,
            5,
            2,
            2,
            -1
          ]
        ],
        "parent_labels_matrix": [
          [
            "-",
            "-",
            "H1",
            "H1",
            "R1",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "H2",
            "H2"
          ],
          [
            "-",
            "-",
            "-",
            "R1",
            "R1",
            "-"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "R2",
            "R2"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "R3"
          ],
          [
            "-",
            "-",
            "R4",
            "R1",
            "R1",
            "-"
          ]
        ],
        "updated_cells": [
          {
            "i": "H1",
            "j": "R3",
            "i_idx": 0,
            "j_idx": 4,
            "old_dist": null,
            "new_dist": 12.0,
            "old_parent": "-",
            "new_parent": "R1",
            "formula": "D[H1][R3] = min(∞, D[H1][R1] + D[R1][R3]) = 12.0"
          },
          {
            "i": "R4",
            "j": "R2",
            "i_idx": 5,
            "j_idx": 3,
            "old_dist": null,
            "new_dist": 18.0,
            "old_parent": "-",
            "new_parent": "R1",
            "formula": "D[R4][R2] = min(∞, D[R4][R1] + D[R1][R2]) = 18.0"
          },
          {
            "i": "R4",
            "j": "R3",
            "i_idx": 5,
            "j_idx": 4,
            "old_dist": null,
            "new_dist": 23.0,
            "old_parent": "-",
            "new_parent": "R1",
            "formula": "D[R4][R3] = min(∞, D[R4][R1] + D[R1][R3]) = 23.0"
          }
        ],
        "description": "Bước k = 2 (xét đỉnh trung gian R1): Cập nhật tối ưu 3 ô [(H1→R3: 12.0), (R4→R2: 18.0), (R4→R3: 23.0)]. Gán _parent[i][j] = _parent[R1][j]."
      },
      {
        "step_index": 4,
        "k": 3,
        "k_vertex": "R2",
        "dist_matrix": [
          [
            0.0,
            null,
            4.0,
            6.0,
            10.0,
            18.0
          ],
          [
            null,
            0.0,
            null,
            null,
            6.0,
            7.0
          ],
          [
            null,
            null,
            0.0,
            3.0,
            7.0,
            15.0
          ],
          [
            null,
            null,
            null,
            0.0,
            4.0,
            12.0
          ],
          [
            null,
            null,
            null,
            null,
            0.0,
            5.0
          ],
          [
            null,
            null,
            15.0,
            18.0,
            22.0,
            0.0
          ]
        ],
        "parent_matrix": [
          [
            -1,
            -1,
            0,
            0,
            3,
            3
          ],
          [
            -1,
            -1,
            -1,
            -1,
            1,
            1
          ],
          [
            -1,
            -1,
            -1,
            2,
            3,
            3
          ],
          [
            -1,
            -1,
            -1,
            -1,
            3,
            3
          ],
          [
            -1,
            -1,
            -1,
            -1,
            -1,
            4
          ],
          [
            -1,
            -1,
            5,
            2,
            3,
            -1
          ]
        ],
        "parent_labels_matrix": [
          [
            "-",
            "-",
            "H1",
            "H1",
            "R2",
            "R2"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "H2",
            "H2"
          ],
          [
            "-",
            "-",
            "-",
            "R1",
            "R2",
            "R2"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "R2",
            "R2"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "R3"
          ],
          [
            "-",
            "-",
            "R4",
            "R1",
            "R2",
            "-"
          ]
        ],
        "updated_cells": [
          {
            "i": "H1",
            "j": "R3",
            "i_idx": 0,
            "j_idx": 4,
            "old_dist": 12.0,
            "new_dist": 10.0,
            "old_parent": "R1",
            "new_parent": "R2",
            "formula": "D[H1][R3] = min(12.0, D[H1][R2] + D[R2][R3]) = 10.0"
          },
          {
            "i": "H1",
            "j": "R4",
            "i_idx": 0,
            "j_idx": 5,
            "old_dist": null,
            "new_dist": 18.0,
            "old_parent": "-",
            "new_parent": "R2",
            "formula": "D[H1][R4] = min(∞, D[H1][R2] + D[R2][R4]) = 18.0"
          },
          {
            "i": "R1",
            "j": "R3",
            "i_idx": 2,
            "j_idx": 4,
            "old_dist": 8.0,
            "new_dist": 7.0,
            "old_parent": "R1",
            "new_parent": "R2",
            "formula": "D[R1][R3] = min(8.0, D[R1][R2] + D[R2][R3]) = 7.0"
          },
          {
            "i": "R1",
            "j": "R4",
            "i_idx": 2,
            "j_idx": 5,
            "old_dist": null,
            "new_dist": 15.0,
            "old_parent": "-",
            "new_parent": "R2",
            "formula": "D[R1][R4] = min(∞, D[R1][R2] + D[R2][R4]) = 15.0"
          },
          {
            "i": "R4",
            "j": "R3",
            "i_idx": 5,
            "j_idx": 4,
            "old_dist": 23.0,
            "new_dist": 22.0,
            "old_parent": "R1",
            "new_parent": "R2",
            "formula": "D[R4][R3] = min(23.0, D[R4][R2] + D[R2][R3]) = 22.0"
          }
        ],
        "description": "Bước k = 3 (xét đỉnh trung gian R2): Cập nhật tối ưu 5 ô [(H1→R3: 10.0), (H1→R4: 18.0), (R1→R3: 7.0), (R1→R4: 15.0), (R4→R3: 22.0)]. Gán _parent[i][j] = _parent[R2][j]."
      },
      {
        "step_index": 5,
        "k": 4,
        "k_vertex": "R3",
        "dist_matrix": [
          [
            0.0,
            null,
            4.0,
            6.0,
            10.0,
            15.0
          ],
          [
            null,
            0.0,
            null,
            null,
            6.0,
            7.0
          ],
          [
            null,
            null,
            0.0,
            3.0,
            7.0,
            12.0
          ],
          [
            null,
            null,
            null,
            0.0,
            4.0,
            9.0
          ],
          [
            null,
            null,
            null,
            null,
            0.0,
            5.0
          ],
          [
            null,
            null,
            15.0,
            18.0,
            22.0,
            0.0
          ]
        ],
        "parent_matrix": [
          [
            -1,
            -1,
            0,
            0,
            3,
            4
          ],
          [
            -1,
            -1,
            -1,
            -1,
            1,
            1
          ],
          [
            -1,
            -1,
            -1,
            2,
            3,
            4
          ],
          [
            -1,
            -1,
            -1,
            -1,
            3,
            4
          ],
          [
            -1,
            -1,
            -1,
            -1,
            -1,
            4
          ],
          [
            -1,
            -1,
            5,
            2,
            3,
            -1
          ]
        ],
        "parent_labels_matrix": [
          [
            "-",
            "-",
            "H1",
            "H1",
            "R2",
            "R3"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "H2",
            "H2"
          ],
          [
            "-",
            "-",
            "-",
            "R1",
            "R2",
            "R3"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "R2",
            "R3"
          ],
          [
            "-",
            "-",
            "-",
            "-",
            "-",
            "R3"
          ],
          [
            "-",
            "-",
            "R4",
            "R1",
            "R2",
            "-"
          ]
        ],
        "updated_cells": [
          {
            "i": "H1",
            "j": "R4",
            "i_idx": 0,
            "j_idx": 5,
            "old_dist": 18.0,
            "new_dist": 15.0,
            "old_parent": "R2",
            "new_parent": "R3",
            "formula": "D[H1][R4] = min(18.0, D[H1][R3] + D[R3][R4]) = 15.0"
          },
          {
            "i": "R1",
            "j": "R4",
            "i_idx": 2,
            "j_idx": 5,
            "old_dist": 15.0,
            "new_dist": 12.0,
            "old_parent": "R2",
            "new_parent": "R3",
            "formula": "D[R1][R4] = min(15.0, D[R1][R3] + D[R3][R4]) = 12.0"
          },
          {
            "i": "R2",
            "j": "R4",
            "i_idx": 3,
            "j_idx": 5,
            "old_dist": 12.0,
            "new_dist": 9.0,
            "old_parent": "R2",
            "new_parent": "R3",
            "formula": "D[R2][R4] = min(12.0, D[R2][R3] + D[R3][R4]) = 9.0"
          }
        ],
        "description": "Bước k = 4 (xét đỉnh trung gian R3): Cập nhật tối ưu 3 ô [(H1→R4: 15.0), (R1→R4: 12.0), (R2→R4: 9.0)]. Gán _parent[i][j] = _parent[R3][j]."
      },
      {
        "step_index": 6,
        "k": 5,
        "k_vertex": "R4",
        "dist_matrix": [
          [
            0.0,
            null,
            4.0,
            6.0,
            10.0,
            15.0
          ],
          [
            null,
            0.0,
            22.0,
            25.0,
            6.0,
            7.0
          ],
          [
            null,
            null,
            0.0,
            3.0,
            7.0,
            12.0
          ],
          [
            null,
            null,
            24.0,
            0.0,
            4.0,
            9.0
          ],
          [
            null,
            null,
            20.0,
            23.0,
            0.0,
            5.0
          ],
          [
            null,
            null,
            15.0,
            18.0,
            22.0,
            0.0
          ]
        ],
        "parent_matrix": [
          [
            -1,
            -1,
            0,
            0,
            3,
            4
          ],
          [
            -1,
            -1,
            5,
            2,
            1,
            1
          ],
          [
            -1,
            -1,
            -1,
            2,
            3,
            4
          ],
          [
            -1,
            -1,
            5,
            -1,
            3,
            4
          ],
          [
            -1,
            -1,
            5,
            2,
            -1,
            4
          ],
          [
            -1,
            -1,
            5,
            2,
            3,
            -1
          ]
        ],
        "parent_labels_matrix": [
          [
            "-",
            "-",
            "H1",
            "H1",
            "R2",
            "R3"
          ],
          [
            "-",
            "-",
            "R4",
            "R1",
            "H2",
            "H2"
          ],
          [
            "-",
            "-",
            "-",
            "R1",
            "R2",
            "R3"
          ],
          [
            "-",
            "-",
            "R4",
            "-",
            "R2",
            "R3"
          ],
          [
            "-",
            "-",
            "R4",
            "R1",
            "-",
            "R3"
          ],
          [
            "-",
            "-",
            "R4",
            "R1",
            "R2",
            "-"
          ]
        ],
        "updated_cells": [
          {
            "i": "H2",
            "j": "R1",
            "i_idx": 1,
            "j_idx": 2,
            "old_dist": null,
            "new_dist": 22.0,
            "old_parent": "-",
            "new_parent": "R4",
            "formula": "D[H2][R1] = min(∞, D[H2][R4] + D[R4][R1]) = 22.0"
          },
          {
            "i": "H2",
            "j": "R2",
            "i_idx": 1,
            "j_idx": 3,
            "old_dist": null,
            "new_dist": 25.0,
            "old_parent": "-",
            "new_parent": "R1",
            "formula": "D[H2][R2] = min(∞, D[H2][R4] + D[R4][R2]) = 25.0"
          },
          {
            "i": "R2",
            "j": "R1",
            "i_idx": 3,
            "j_idx": 2,
            "old_dist": null,
            "new_dist": 24.0,
            "old_parent": "-",
            "new_parent": "R4",
            "formula": "D[R2][R1] = min(∞, D[R2][R4] + D[R4][R1]) = 24.0"
          },
          {
            "i": "R3",
            "j": "R1",
            "i_idx": 4,
            "j_idx": 2,
            "old_dist": null,
            "new_dist": 20.0,
            "old_parent": "-",
            "new_parent": "R4",
            "formula": "D[R3][R1] = min(∞, D[R3][R4] + D[R4][R1]) = 20.0"
          },
          {
            "i": "R3",
            "j": "R2",
            "i_idx": 4,
            "j_idx": 3,
            "old_dist": null,
            "new_dist": 23.0,
            "old_parent": "-",
            "new_parent": "R1",
            "formula": "D[R3][R2] = min(∞, D[R3][R4] + D[R4][R2]) = 23.0"
          }
        ],
        "description": "Bước k = 5 (xét đỉnh trung gian R4): Cập nhật tối ưu 5 ô [(H2→R1: 22.0), (H2→R2: 25.0), (R2→R1: 24.0), (R3→R1: 20.0), (R3→R2: 23.0)]. Gán _parent[i][j] = _parent[R4][j]."
      }
    ],
    "apsp_matrix": [
      [
        0.0,
        null,
        4.0,
        6.0,
        10.0,
        15.0
      ],
      [
        null,
        0.0,
        22.0,
        25.0,
        6.0,
        7.0
      ],
      [
        null,
        null,
        0.0,
        3.0,
        7.0,
        12.0
      ],
      [
        null,
        null,
        24.0,
        0.0,
        4.0,
        9.0
      ],
      [
        null,
        null,
        20.0,
        23.0,
        0.0,
        5.0
      ],
      [
        null,
        null,
        15.0,
        18.0,
        22.0,
        0.0
      ]
    ],
    "apsp_parent_matrix": [
      [
        -1,
        -1,
        0,
        0,
        3,
        4
      ],
      [
        -1,
        -1,
        5,
        2,
        1,
        1
      ],
      [
        -1,
        -1,
        -1,
        2,
        3,
        4
      ],
      [
        -1,
        -1,
        5,
        -1,
        3,
        4
      ],
      [
        -1,
        -1,
        5,
        2,
        -1,
        4
      ],
      [
        -1,
        -1,
        5,
        2,
        3,
        -1
      ]
    ]
  },
  "counterexample_negative": {
    "nodes_layout": [
      {
        "id": "A",
        "label": "A (Nguồn)",
        "x": 150,
        "y": 200
      },
      {
        "id": "B",
        "label": "B (Đích)",
        "x": 480,
        "y": 140
      },
      {
        "id": "C",
        "label": "C (Cầu nối)",
        "x": 300,
        "y": 320
      }
    ],
    "edges": [
      {
        "id": "ce_A_B",
        "source": "A",
        "target": "B",
        "weight": 1.0
      },
      {
        "id": "ce_A_C",
        "source": "A",
        "target": "C",
        "weight": 4.0
      },
      {
        "id": "ce_C_B",
        "source": "C",
        "target": "B",
        "weight": -5.0
      }
    ],
    "analysis": {
      "dijkstra_result": {
        "path": [
          "A",
          "B"
        ],
        "reported_dist": 1.0,
        "error_reason": "Dijkstra tham lam chốt đỉnh B ngay bước đầu tiên với dist=1 vì 1 < 4 (khoảng cách tới C). Khi xét tiếp đỉnh C, cạnh C->B có trọng số -5 giúp đường đi A->C->B chỉ tốn 4 + (-5) = -1. Nhưng vì B đã bị đánh dấu đã chốt (settled), Dijkstra không quay lại cập nhật, dẫn tới kết quả sai hoàn toàn!"
      },
      "optimal_truth": {
        "path": [
          "A",
          "C",
          "B"
        ],
        "actual_dist": -1.0,
        "correct_algorithm": "Floyd-Warshall hoặc Bellman-Ford"
      }
    }
  }
};
