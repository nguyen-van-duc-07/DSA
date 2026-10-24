/**
 * trace_data.js
 * Dữ liệu vết thực thi thuật toán được tự động sinh bởi generate_trace_data.py
 * Cập nhật: 2026-10-24
 */
window.PRESENTATION_DATA = {
  "metadata": {
    "title": "Thuật toán tìm đường đi ngắn nhất: Dijkstra và Floyd-Warshall",
    "version": "2.0.0",
    "generated_at": "2026-10-24",
    "author": "DSA Teaching & Engineering Team"
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
          "step": 0,
          "action": "INIT",
          "current_node": "A",
          "current_dist": 0.0,
          "heap_snapshot": [
            [
              0.0,
              "A"
            ]
          ],
          "dist_snapshot": {
            "A": 0.0,
            "B": null,
            "C": null,
            "D": null,
            "E": null
          },
          "parent_snapshot": {
            "A": null,
            "B": null,
            "C": null,
            "D": null,
            "E": null
          },
          "relaxed_edges": []
        },
        {
          "step": 1,
          "action": "SETTLE_AND_RELAX",
          "current_node": "A",
          "current_dist": 0.0,
          "heap_snapshot": [
            [
              2.0,
              "C"
            ],
            [
              5.0,
              "B"
            ]
          ],
          "dist_snapshot": {
            "A": 0.0,
            "B": 5.0,
            "C": 2.0,
            "D": null,
            "E": null
          },
          "parent_snapshot": {
            "A": null,
            "B": "A",
            "C": "A",
            "D": null,
            "E": null
          },
          "relaxed_edges": [
            {
              "from": "A",
              "to": "B",
              "weight": 5.0,
              "old_dist": null,
              "new_dist": 5.0
            },
            {
              "from": "A",
              "to": "C",
              "weight": 2.0,
              "old_dist": null,
              "new_dist": 2.0
            }
          ]
        },
        {
          "step": 2,
          "action": "SETTLE_AND_RELAX",
          "current_node": "C",
          "current_dist": 2.0,
          "heap_snapshot": [
            [
              3.0,
              "B"
            ],
            [
              5.0,
              "B"
            ],
            [
              9.0,
              "D"
            ],
            [
              11.0,
              "E"
            ]
          ],
          "dist_snapshot": {
            "A": 0.0,
            "B": 3.0,
            "C": 2.0,
            "D": 9.0,
            "E": 11.0
          },
          "parent_snapshot": {
            "A": null,
            "B": "C",
            "C": "A",
            "D": "C",
            "E": "C"
          },
          "relaxed_edges": [
            {
              "from": "C",
              "to": "B",
              "weight": 1.0,
              "old_dist": 5.0,
              "new_dist": 3.0
            },
            {
              "from": "C",
              "to": "D",
              "weight": 7.0,
              "old_dist": null,
              "new_dist": 9.0
            },
            {
              "from": "C",
              "to": "E",
              "weight": 9.0,
              "old_dist": null,
              "new_dist": 11.0
            }
          ]
        },
        {
          "step": 3,
          "action": "SETTLE_AND_RELAX",
          "current_node": "B",
          "current_dist": 3.0,
          "heap_snapshot": [
            [
              5.0,
              "B"
            ],
            [
              7.0,
              "D"
            ],
            [
              9.0,
              "D"
            ],
            [
              11.0,
              "E"
            ]
          ],
          "dist_snapshot": {
            "A": 0.0,
            "B": 3.0,
            "C": 2.0,
            "D": 7.0,
            "E": 11.0
          },
          "parent_snapshot": {
            "A": null,
            "B": "C",
            "C": "A",
            "D": "B",
            "E": "C"
          },
          "relaxed_edges": [
            {
              "from": "B",
              "to": "D",
              "weight": 4.0,
              "old_dist": 9.0,
              "new_dist": 7.0
            }
          ]
        },
        {
          "step": 4,
          "action": "LAZY_SKIP",
          "current_node": "B",
          "current_dist": 5.0,
          "best_known_dist": 3.0,
          "heap_snapshot": [
            [
              7.0,
              "D"
            ],
            [
              11.0,
              "E"
            ],
            [
              9.0,
              "D"
            ]
          ],
          "dist_snapshot": {
            "A": 0.0,
            "B": 3.0,
            "C": 2.0,
            "D": 7.0,
            "E": 11.0
          },
          "parent_snapshot": {
            "A": null,
            "B": "C",
            "C": "A",
            "D": "B",
            "E": "C"
          },
          "relaxed_edges": []
        },
        {
          "step": 5,
          "action": "SETTLE_AND_RELAX",
          "current_node": "D",
          "current_dist": 7.0,
          "heap_snapshot": [
            [
              9.0,
              "D"
            ],
            [
              11.0,
              "E"
            ],
            [
              10.0,
              "E"
            ]
          ],
          "dist_snapshot": {
            "A": 0.0,
            "B": 3.0,
            "C": 2.0,
            "D": 7.0,
            "E": 10.0
          },
          "parent_snapshot": {
            "A": null,
            "B": "C",
            "C": "A",
            "D": "B",
            "E": "D"
          },
          "relaxed_edges": [
            {
              "from": "D",
              "to": "E",
              "weight": 3.0,
              "old_dist": 11.0,
              "new_dist": 10.0
            }
          ]
        },
        {
          "step": 6,
          "action": "LAZY_SKIP",
          "current_node": "D",
          "current_dist": 9.0,
          "best_known_dist": 7.0,
          "heap_snapshot": [
            [
              10.0,
              "E"
            ],
            [
              11.0,
              "E"
            ]
          ],
          "dist_snapshot": {
            "A": 0.0,
            "B": 3.0,
            "C": 2.0,
            "D": 7.0,
            "E": 10.0
          },
          "parent_snapshot": {
            "A": null,
            "B": "C",
            "C": "A",
            "D": "B",
            "E": "D"
          },
          "relaxed_edges": []
        },
        {
          "step": 7,
          "action": "SETTLE_AND_RELAX",
          "current_node": "E",
          "current_dist": 10.0,
          "heap_snapshot": [
            [
              11.0,
              "E"
            ]
          ],
          "dist_snapshot": {
            "A": 0.0,
            "B": 3.0,
            "C": 2.0,
            "D": 7.0,
            "E": 10.0
          },
          "parent_snapshot": {
            "A": null,
            "B": "C",
            "C": "A",
            "D": "B",
            "E": "D"
          },
          "relaxed_edges": []
        },
        {
          "step": 8,
          "action": "LAZY_SKIP",
          "current_node": "E",
          "current_dist": 11.0,
          "best_known_dist": 10.0,
          "heap_snapshot": [],
          "dist_snapshot": {
            "A": 0.0,
            "B": 3.0,
            "C": 2.0,
            "D": 7.0,
            "E": 10.0
          },
          "parent_snapshot": {
            "A": null,
            "B": "C",
            "C": "A",
            "D": "B",
            "E": "D"
          },
          "relaxed_edges": []
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
      "final_next_matrix": [
        [
          null,
          2,
          2,
          2,
          2
        ],
        [
          null,
          null,
          null,
          3,
          3
        ],
        [
          null,
          1,
          null,
          1,
          1
        ],
        [
          null,
          null,
          null,
          null,
          4
        ],
        [
          null,
          null,
          null,
          null,
          null
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
          "k_step": 0,
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
          "next_matrix": [
            [
              null,
              1,
              2,
              null,
              null
            ],
            [
              null,
              null,
              null,
              3,
              4
            ],
            [
              null,
              1,
              null,
              3,
              4
            ],
            [
              null,
              null,
              null,
              null,
              4
            ],
            [
              null,
              null,
              null,
              null,
              null
            ]
          ],
          "updated_cells": []
        },
        {
          "k_step": 1,
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
          "next_matrix": [
            [
              null,
              1,
              2,
              null,
              null
            ],
            [
              null,
              null,
              null,
              3,
              4
            ],
            [
              null,
              1,
              null,
              3,
              4
            ],
            [
              null,
              null,
              null,
              null,
              4
            ],
            [
              null,
              null,
              null,
              null,
              null
            ]
          ],
          "updated_cells": []
        },
        {
          "k_step": 2,
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
          "next_matrix": [
            [
              null,
              1,
              2,
              1,
              1
            ],
            [
              null,
              null,
              null,
              3,
              4
            ],
            [
              null,
              1,
              null,
              1,
              4
            ],
            [
              null,
              null,
              null,
              null,
              4
            ],
            [
              null,
              null,
              null,
              null,
              null
            ]
          ],
          "updated_cells": [
            {
              "from": "A",
              "to": "D",
              "old_dist": null,
              "new_dist": 9.0,
              "via": "B"
            },
            {
              "from": "A",
              "to": "E",
              "old_dist": null,
              "new_dist": 13.0,
              "via": "B"
            },
            {
              "from": "C",
              "to": "D",
              "old_dist": 7.0,
              "new_dist": 5.0,
              "via": "B"
            }
          ]
        },
        {
          "k_step": 3,
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
          "next_matrix": [
            [
              null,
              2,
              2,
              2,
              2
            ],
            [
              null,
              null,
              null,
              3,
              4
            ],
            [
              null,
              1,
              null,
              1,
              4
            ],
            [
              null,
              null,
              null,
              null,
              4
            ],
            [
              null,
              null,
              null,
              null,
              null
            ]
          ],
          "updated_cells": [
            {
              "from": "A",
              "to": "B",
              "old_dist": 5.0,
              "new_dist": 3.0,
              "via": "C"
            },
            {
              "from": "A",
              "to": "D",
              "old_dist": 9.0,
              "new_dist": 7.0,
              "via": "C"
            },
            {
              "from": "A",
              "to": "E",
              "old_dist": 13.0,
              "new_dist": 11.0,
              "via": "C"
            }
          ]
        },
        {
          "k_step": 4,
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
          "next_matrix": [
            [
              null,
              2,
              2,
              2,
              2
            ],
            [
              null,
              null,
              null,
              3,
              3
            ],
            [
              null,
              1,
              null,
              1,
              1
            ],
            [
              null,
              null,
              null,
              null,
              4
            ],
            [
              null,
              null,
              null,
              null,
              null
            ]
          ],
          "updated_cells": [
            {
              "from": "A",
              "to": "E",
              "old_dist": 11.0,
              "new_dist": 10.0,
              "via": "D"
            },
            {
              "from": "B",
              "to": "E",
              "old_dist": 8.0,
              "new_dist": 7.0,
              "via": "D"
            },
            {
              "from": "C",
              "to": "E",
              "old_dist": 9.0,
              "new_dist": 8.0,
              "via": "D"
            }
          ]
        },
        {
          "k_step": 5,
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
          "next_matrix": [
            [
              null,
              2,
              2,
              2,
              2
            ],
            [
              null,
              null,
              null,
              3,
              3
            ],
            [
              null,
              1,
              null,
              1,
              1
            ],
            [
              null,
              null,
              null,
              null,
              4
            ],
            [
              null,
              null,
              null,
              null,
              null
            ]
          ],
          "updated_cells": []
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
        "step": 0,
        "action": "INIT",
        "current_node": "H1",
        "current_dist": 0.0,
        "heap_snapshot": [
          [
            0.0,
            "H1"
          ]
        ],
        "dist_snapshot": {
          "H1": 0.0,
          "H2": null,
          "R1": null,
          "R2": null,
          "R3": null,
          "R4": null
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": null,
          "R2": null,
          "R3": null,
          "R4": null
        },
        "relaxed_edges": []
      },
      {
        "step": 1,
        "action": "SETTLE_AND_RELAX",
        "current_node": "H1",
        "current_dist": 0.0,
        "heap_snapshot": [
          [
            4.0,
            "R1"
          ],
          [
            6.0,
            "R2"
          ]
        ],
        "dist_snapshot": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": null,
          "R4": null
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": "H1",
          "R2": "H1",
          "R3": null,
          "R4": null
        },
        "relaxed_edges": [
          {
            "from": "H1",
            "to": "R1",
            "weight": 4.0,
            "old_dist": null,
            "new_dist": 4.0
          },
          {
            "from": "H1",
            "to": "R2",
            "weight": 6.0,
            "old_dist": null,
            "new_dist": 6.0
          }
        ]
      },
      {
        "step": 2,
        "action": "SETTLE_AND_RELAX",
        "current_node": "R1",
        "current_dist": 4.0,
        "heap_snapshot": [
          [
            6.0,
            "R2"
          ],
          [
            12.0,
            "R3"
          ]
        ],
        "dist_snapshot": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": 12.0,
          "R4": null
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": "H1",
          "R2": "H1",
          "R3": "R1",
          "R4": null
        },
        "relaxed_edges": [
          {
            "from": "R1",
            "to": "R3",
            "weight": 8.0,
            "old_dist": null,
            "new_dist": 12.0
          }
        ]
      },
      {
        "step": 3,
        "action": "SETTLE_AND_RELAX",
        "current_node": "R2",
        "current_dist": 6.0,
        "heap_snapshot": [
          [
            10.0,
            "R3"
          ],
          [
            12.0,
            "R3"
          ],
          [
            18.0,
            "R4"
          ]
        ],
        "dist_snapshot": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": 10.0,
          "R4": 18.0
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": "H1",
          "R2": "H1",
          "R3": "R2",
          "R4": "R2"
        },
        "relaxed_edges": [
          {
            "from": "R2",
            "to": "R3",
            "weight": 4.0,
            "old_dist": 12.0,
            "new_dist": 10.0
          },
          {
            "from": "R2",
            "to": "R4",
            "weight": 12.0,
            "old_dist": null,
            "new_dist": 18.0
          }
        ]
      },
      {
        "step": 4,
        "action": "SETTLE_AND_RELAX",
        "current_node": "R3",
        "current_dist": 10.0,
        "heap_snapshot": [
          [
            12.0,
            "R3"
          ],
          [
            18.0,
            "R4"
          ],
          [
            15.0,
            "R4"
          ]
        ],
        "dist_snapshot": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": 10.0,
          "R4": 15.0
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": "H1",
          "R2": "H1",
          "R3": "R2",
          "R4": "R3"
        },
        "relaxed_edges": [
          {
            "from": "R3",
            "to": "R4",
            "weight": 5.0,
            "old_dist": 18.0,
            "new_dist": 15.0
          }
        ]
      },
      {
        "step": 5,
        "action": "LAZY_SKIP",
        "current_node": "R3",
        "current_dist": 12.0,
        "best_known_dist": 10.0,
        "heap_snapshot": [
          [
            15.0,
            "R4"
          ],
          [
            18.0,
            "R4"
          ]
        ],
        "dist_snapshot": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": 10.0,
          "R4": 15.0
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": "H1",
          "R2": "H1",
          "R3": "R2",
          "R4": "R3"
        },
        "relaxed_edges": []
      },
      {
        "step": 6,
        "action": "SETTLE_AND_RELAX",
        "current_node": "R4",
        "current_dist": 15.0,
        "heap_snapshot": [
          [
            18.0,
            "R4"
          ]
        ],
        "dist_snapshot": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": 10.0,
          "R4": 15.0
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": "H1",
          "R2": "H1",
          "R3": "R2",
          "R4": "R3"
        },
        "relaxed_edges": []
      },
      {
        "step": 7,
        "action": "LAZY_SKIP",
        "current_node": "R4",
        "current_dist": 18.0,
        "best_known_dist": 15.0,
        "heap_snapshot": [],
        "dist_snapshot": {
          "H1": 0.0,
          "H2": null,
          "R1": 4.0,
          "R2": 6.0,
          "R3": 10.0,
          "R4": 15.0
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": "H1",
          "R2": "H1",
          "R3": "R2",
          "R4": "R3"
        },
        "relaxed_edges": []
      }
    ],
    "dijkstra_h2_trace": [
      {
        "step": 0,
        "action": "INIT",
        "current_node": "H2",
        "current_dist": 0.0,
        "heap_snapshot": [
          [
            0.0,
            "H2"
          ]
        ],
        "dist_snapshot": {
          "H1": null,
          "H2": 0.0,
          "R1": null,
          "R2": null,
          "R3": null,
          "R4": null
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": null,
          "R2": null,
          "R3": null,
          "R4": null
        },
        "relaxed_edges": []
      },
      {
        "step": 1,
        "action": "SETTLE_AND_RELAX",
        "current_node": "H2",
        "current_dist": 0.0,
        "heap_snapshot": [
          [
            6.0,
            "R3"
          ],
          [
            7.0,
            "R4"
          ]
        ],
        "dist_snapshot": {
          "H1": null,
          "H2": 0.0,
          "R1": null,
          "R2": null,
          "R3": 6.0,
          "R4": 7.0
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": null,
          "R2": null,
          "R3": "H2",
          "R4": "H2"
        },
        "relaxed_edges": [
          {
            "from": "H2",
            "to": "R3",
            "weight": 6.0,
            "old_dist": null,
            "new_dist": 6.0
          },
          {
            "from": "H2",
            "to": "R4",
            "weight": 7.0,
            "old_dist": null,
            "new_dist": 7.0
          }
        ]
      },
      {
        "step": 2,
        "action": "SETTLE_AND_RELAX",
        "current_node": "R3",
        "current_dist": 6.0,
        "heap_snapshot": [
          [
            7.0,
            "R4"
          ]
        ],
        "dist_snapshot": {
          "H1": null,
          "H2": 0.0,
          "R1": null,
          "R2": null,
          "R3": 6.0,
          "R4": 7.0
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": null,
          "R2": null,
          "R3": "H2",
          "R4": "H2"
        },
        "relaxed_edges": []
      },
      {
        "step": 3,
        "action": "SETTLE_AND_RELAX",
        "current_node": "R4",
        "current_dist": 7.0,
        "heap_snapshot": [
          [
            22.0,
            "R1"
          ]
        ],
        "dist_snapshot": {
          "H1": null,
          "H2": 0.0,
          "R1": 22.0,
          "R2": null,
          "R3": 6.0,
          "R4": 7.0
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": "R4",
          "R2": null,
          "R3": "H2",
          "R4": "H2"
        },
        "relaxed_edges": [
          {
            "from": "R4",
            "to": "R1",
            "weight": 15.0,
            "old_dist": null,
            "new_dist": 22.0
          }
        ]
      },
      {
        "step": 4,
        "action": "SETTLE_AND_RELAX",
        "current_node": "R1",
        "current_dist": 22.0,
        "heap_snapshot": [
          [
            25.0,
            "R2"
          ]
        ],
        "dist_snapshot": {
          "H1": null,
          "H2": 0.0,
          "R1": 22.0,
          "R2": 25.0,
          "R3": 6.0,
          "R4": 7.0
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": "R4",
          "R2": "R1",
          "R3": "H2",
          "R4": "H2"
        },
        "relaxed_edges": [
          {
            "from": "R1",
            "to": "R2",
            "weight": 3.0,
            "old_dist": null,
            "new_dist": 25.0
          }
        ]
      },
      {
        "step": 5,
        "action": "SETTLE_AND_RELAX",
        "current_node": "R2",
        "current_dist": 25.0,
        "heap_snapshot": [],
        "dist_snapshot": {
          "H1": null,
          "H2": 0.0,
          "R1": 22.0,
          "R2": 25.0,
          "R3": 6.0,
          "R4": 7.0
        },
        "parent_snapshot": {
          "H1": null,
          "H2": null,
          "R1": "R4",
          "R2": "R1",
          "R3": "H2",
          "R4": "H2"
        },
        "relaxed_edges": []
      }
    ],
    "floyd_warshall_trace": [
      {
        "k_step": 0,
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
        "next_matrix": [
          [
            null,
            null,
            2,
            3,
            null,
            null
          ],
          [
            null,
            null,
            null,
            null,
            4,
            5
          ],
          [
            null,
            null,
            null,
            3,
            4,
            null
          ],
          [
            null,
            null,
            null,
            null,
            4,
            5
          ],
          [
            null,
            null,
            null,
            null,
            null,
            5
          ],
          [
            null,
            null,
            2,
            null,
            null,
            null
          ]
        ],
        "updated_cells": []
      },
      {
        "k_step": 1,
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
        "next_matrix": [
          [
            null,
            null,
            2,
            3,
            null,
            null
          ],
          [
            null,
            null,
            null,
            null,
            4,
            5
          ],
          [
            null,
            null,
            null,
            3,
            4,
            null
          ],
          [
            null,
            null,
            null,
            null,
            4,
            5
          ],
          [
            null,
            null,
            null,
            null,
            null,
            5
          ],
          [
            null,
            null,
            2,
            null,
            null,
            null
          ]
        ],
        "updated_cells": []
      },
      {
        "k_step": 2,
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
        "next_matrix": [
          [
            null,
            null,
            2,
            3,
            null,
            null
          ],
          [
            null,
            null,
            null,
            null,
            4,
            5
          ],
          [
            null,
            null,
            null,
            3,
            4,
            null
          ],
          [
            null,
            null,
            null,
            null,
            4,
            5
          ],
          [
            null,
            null,
            null,
            null,
            null,
            5
          ],
          [
            null,
            null,
            2,
            null,
            null,
            null
          ]
        ],
        "updated_cells": []
      },
      {
        "k_step": 3,
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
        "next_matrix": [
          [
            null,
            null,
            2,
            3,
            2,
            null
          ],
          [
            null,
            null,
            null,
            null,
            4,
            5
          ],
          [
            null,
            null,
            null,
            3,
            4,
            null
          ],
          [
            null,
            null,
            null,
            null,
            4,
            5
          ],
          [
            null,
            null,
            null,
            null,
            null,
            5
          ],
          [
            null,
            null,
            2,
            2,
            2,
            null
          ]
        ],
        "updated_cells": [
          {
            "from": "H1",
            "to": "R3",
            "old_dist": null,
            "new_dist": 12.0,
            "via": "R1"
          },
          {
            "from": "R4",
            "to": "R2",
            "old_dist": null,
            "new_dist": 18.0,
            "via": "R1"
          },
          {
            "from": "R4",
            "to": "R3",
            "old_dist": null,
            "new_dist": 23.0,
            "via": "R1"
          }
        ]
      },
      {
        "k_step": 4,
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
        "next_matrix": [
          [
            null,
            null,
            2,
            3,
            3,
            3
          ],
          [
            null,
            null,
            null,
            null,
            4,
            5
          ],
          [
            null,
            null,
            null,
            3,
            3,
            3
          ],
          [
            null,
            null,
            null,
            null,
            4,
            5
          ],
          [
            null,
            null,
            null,
            null,
            null,
            5
          ],
          [
            null,
            null,
            2,
            2,
            2,
            null
          ]
        ],
        "updated_cells": [
          {
            "from": "H1",
            "to": "R3",
            "old_dist": 12.0,
            "new_dist": 10.0,
            "via": "R2"
          },
          {
            "from": "H1",
            "to": "R4",
            "old_dist": null,
            "new_dist": 18.0,
            "via": "R2"
          },
          {
            "from": "R1",
            "to": "R3",
            "old_dist": 8.0,
            "new_dist": 7.0,
            "via": "R2"
          },
          {
            "from": "R1",
            "to": "R4",
            "old_dist": null,
            "new_dist": 15.0,
            "via": "R2"
          },
          {
            "from": "R4",
            "to": "R3",
            "old_dist": 23.0,
            "new_dist": 22.0,
            "via": "R2"
          }
        ]
      },
      {
        "k_step": 5,
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
        "next_matrix": [
          [
            null,
            null,
            2,
            3,
            3,
            3
          ],
          [
            null,
            null,
            null,
            null,
            4,
            5
          ],
          [
            null,
            null,
            null,
            3,
            3,
            3
          ],
          [
            null,
            null,
            null,
            null,
            4,
            4
          ],
          [
            null,
            null,
            null,
            null,
            null,
            5
          ],
          [
            null,
            null,
            2,
            2,
            2,
            null
          ]
        ],
        "updated_cells": [
          {
            "from": "H1",
            "to": "R4",
            "old_dist": 18.0,
            "new_dist": 15.0,
            "via": "R3"
          },
          {
            "from": "R1",
            "to": "R4",
            "old_dist": 15.0,
            "new_dist": 12.0,
            "via": "R3"
          },
          {
            "from": "R2",
            "to": "R4",
            "old_dist": 12.0,
            "new_dist": 9.0,
            "via": "R3"
          }
        ]
      },
      {
        "k_step": 6,
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
        "next_matrix": [
          [
            null,
            null,
            2,
            3,
            3,
            3
          ],
          [
            null,
            null,
            5,
            5,
            4,
            5
          ],
          [
            null,
            null,
            null,
            3,
            3,
            3
          ],
          [
            null,
            null,
            4,
            null,
            4,
            4
          ],
          [
            null,
            null,
            5,
            5,
            null,
            5
          ],
          [
            null,
            null,
            2,
            2,
            2,
            null
          ]
        ],
        "updated_cells": [
          {
            "from": "H2",
            "to": "R1",
            "old_dist": null,
            "new_dist": 22.0,
            "via": "R4"
          },
          {
            "from": "H2",
            "to": "R2",
            "old_dist": null,
            "new_dist": 25.0,
            "via": "R4"
          },
          {
            "from": "R2",
            "to": "R1",
            "old_dist": null,
            "new_dist": 24.0,
            "via": "R4"
          },
          {
            "from": "R3",
            "to": "R1",
            "old_dist": null,
            "new_dist": 20.0,
            "via": "R4"
          },
          {
            "from": "R3",
            "to": "R2",
            "old_dist": null,
            "new_dist": 23.0,
            "via": "R4"
          }
        ]
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
