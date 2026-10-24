/**
 * app.js - Full-Screen Slide Deck Engine & Interactive Visualizations
 * Clean & Bright Light Theme Edition (20 Slides)
 * Authors: Senior Frontend Engineer & UI/UX Designer
 * Version: 4.0.0
 */

// Global slide state
let currentSlide = 1;
const TOTAL_SLIDES = 20;

// Slide metadata for timeline drawer
const SLIDE_METADATA = [
  { num: 1, title: "Trang bìa (Hero Cover)", tag: "Mở đầu" },
  { num: 2, title: "Lộ trình bài thuyết trình (8 Chặng)", tag: "Mục lục" },
  { num: 3, title: "Bài toán của Dijkstra (SSSP)", tag: "Định nghĩa" },
  { num: 4, title: "Bài toán của Floyd-Warshall (APSP)", tag: "Định nghĩa" },
  { num: 5, title: "Ý tưởng Dijkstra: Tham lam & Nới lỏng", tag: "Ý tưởng" },
  { num: 6, title: "Ý tưởng Dijkstra: Min-Heap & Lazy Deletion", tag: "Ý tưởng" },
  { num: 7, title: "Ý tưởng Floyd: Đỉnh trung gian", tag: "Ý tưởng" },
  { num: 8, title: "Ý tưởng Floyd: Công thức & Bộ nhớ In-place", tag: "Ý tưởng" },
  { num: 9, title: "Mô phỏng Dijkstra trên đồ thị 5 đỉnh", tag: "Mô phỏng" },
  { num: 10, title: "Mô phỏng Floyd-Warshall ma trận D<sup>(k)</sup>", tag: "Mô phỏng" },
  { num: 11, title: "Cài đặt Python: Lớp DijkstraSolver", tag: "Mã nguồn" },
  { num: 12, title: "Cài đặt Python: Lớp FloydWarshallSolver", tag: "Mã nguồn" },
  { num: 13, title: "Kết quả Kiểm thử Python thực tế", tag: "Kiểm thử" },
  { num: 14, title: "Phân tích Độ phức tạp Thời gian", tag: "Hiệu năng" },
  { num: 15, title: "Độ phức tạp Bộ nhớ & CPU Cache", tag: "Phần cứng" },
  { num: 16, title: "Giới hạn: Cạnh âm & Chu trình âm", tag: "Trường hợp biên" },
  { num: 17, title: "Ứng dụng: Điều phối Cấp cứu (LC 743)", tag: "Thực tế" },
  { num: 18, title: "Ứng dụng: Quy hoạch Trạm Y tế (LC 1334)", tag: "Thực tế" },
  { num: 19, title: "Mở rộng: So sánh thuật toán & Google Maps", tag: "Mở rộng" },
  { num: 20, title: "Tổng kết bài học & Lời cảm ơn", tag: "Kết luận" }
];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) window.lucide.createIcons();

  // 2. Initialize KaTeX Math
  initMath();

  // 3. Initialize Slide Deck Navigation
  initSlideEngine();

  // 4. Initialize Floating Bottom Bar & Timer
  initFloatingBar();

  // 5. Initialize Timeline Sidebar Drawer
  initTimelineDrawer();

  // 6. Initialize Help Modal
  initHelpModal();

  // 7. Initialize Graph Simulations (Slide 9 & 10)
  initDijkstraSim();
  initFloydSim();

  // 8. Initialize Emergency Visuals (Slide 17 & 18)
  initEmergencySlide();

  // 9. Handle URL Hash Navigation
  handleHashNavigation();
});

/* ==========================================================================
   1. Math Rendering (KaTeX)
   ========================================================================== */
function initMath() {
  if (typeof renderMathInElement === "function") {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false,
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
    });
  }
}

/* ==========================================================================
   2. Full-Screen Slide Deck Navigation Engine
   ========================================================================== */
function initSlideEngine() {
  // Keyboard Navigation: Arrow Left/Right, Space, PageUp/Down
  window.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "t" || e.key === "T") {
      e.preventDefault();
      toggleTimelineDrawer();
    } else if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === "?") {
      e.preventDefault();
      toggleHelpModal();
    } else if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // Mouse Wheel Navigation (600ms debounce with conflict prevention)
  let lastWheelTime = 0;
  const WHEEL_COOLDOWN = 600;

  window.addEventListener("wheel", (e) => {
    // If modal or timeline drawer is open, let user scroll inside it
    const helpModal = document.getElementById("help-modal");
    const timelineDrawer = document.getElementById("timeline-drawer");
    if (helpModal?.classList.contains("open") || timelineDrawer?.classList.contains("open")) {
      return;
    }

    // If cursor is inside a scrollable container (e.g. pre, code block), allow native scrolling
    const scrollable = e.target.closest("pre, #timeline-slide-list, .terminal-window");
    if (scrollable) {
      const canScrollDown = scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 2;
      const canScrollUp = scrollable.scrollTop > 2;
      if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
        return;
      }
    }

    if (Math.abs(e.deltaY) < 25) return;

    const now = Date.now();
    if (now - lastWheelTime < WHEEL_COOLDOWN) {
      e.preventDefault();
      return;
    }

    if (e.deltaY > 25) {
      e.preventDefault();
      lastWheelTime = now;
      nextSlide();
    } else if (e.deltaY < -25) {
      e.preventDefault();
      lastWheelTime = now;
      prevSlide();
    }
  }, { passive: false });

  // Start button on Hero Cover
  const heroBtn = document.getElementById("hero-start-btn");
  if (heroBtn) {
    heroBtn.addEventListener("click", () => goToSlide(2));
  }
}

function goToSlide(slideNum) {
  if (slideNum < 1 || slideNum > TOTAL_SLIDES) return;

  // Deactivate current slide
  const currentEl = document.getElementById(`slide-${currentSlide}`);
  if (currentEl) currentEl.classList.remove("active");

  currentSlide = slideNum;

  // Activate target slide
  const targetEl = document.getElementById(`slide-${currentSlide}`);
  if (targetEl) targetEl.classList.add("active");

  // Update URL hash
  window.history.replaceState(null, "", `#${currentSlide}`);

  // Update floating bar controls
  updateFloatingBarUI();

  // Update timeline drawer active item
  updateTimelineActiveItem();

  // Slide specific lifecycle triggers
  if (currentSlide === 9 && typeof window.s9_renderStep === "function") {
    window.s9_renderStep(window.s9_step || 0);
  } else if (currentSlide === 10 && typeof window.s10_renderStep === "function") {
    window.s10_renderStep(window.s10_step || 0);
  } else if (currentSlide === 17) {
    renderEmergencyMap();
  }

  // Refresh math formulas
  setTimeout(initMath, 40);
}

function nextSlide() {
  if (currentSlide < TOTAL_SLIDES) {
    goToSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 1) {
    goToSlide(currentSlide - 1);
  }
}

function handleHashNavigation() {
  const hash = window.location.hash.replace("#", "");
  const num = parseInt(hash, 10);
  if (!isNaN(num) && num >= 1 && num <= TOTAL_SLIDES) {
    goToSlide(num);
  } else {
    goToSlide(1);
  }
}

/* ==========================================================================
   3. Floating Bottom Control Bar & Presentation Timer
   ========================================================================== */
let timerSeconds = 0;
let timerRunning = true;
let timerInterval = null;

function initFloatingBar() {
  const btnPrev = document.getElementById("btn-prev-slide");
  const btnNext = document.getElementById("btn-next-slide");
  const btnTimeline = document.getElementById("btn-open-timeline");
  const btnFullscreen = document.getElementById("btn-toggle-fullscreen");
  const btnHelp = document.getElementById("btn-open-help");
  const timerToggle = document.getElementById("btn-deck-timer-toggle");

  if (btnPrev) btnPrev.addEventListener("click", prevSlide);
  if (btnNext) btnNext.addEventListener("click", nextSlide);
  if (btnTimeline) btnTimeline.addEventListener("click", toggleTimelineDrawer);
  if (btnFullscreen) btnFullscreen.addEventListener("click", toggleFullscreen);
  if (btnHelp) btnHelp.addEventListener("click", toggleHelpModal);

  if (timerToggle) {
    timerToggle.addEventListener("click", () => {
      timerRunning = !timerRunning;
      const icon = document.getElementById("icon-deck-timer");
      if (icon) {
        icon.setAttribute("data-lucide", timerRunning ? "pause" : "play");
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  // Start presentation timer (seconds)
  timerInterval = setInterval(() => {
    if (timerRunning) {
      timerSeconds++;
      updateTimerDisplay();
    }
  }, 1000);
}

function updateFloatingBarUI() {
  const indicator = document.getElementById("slide-indicator");
  const progressFill = document.getElementById("slide-progress-fill");
  const btnPrev = document.getElementById("btn-prev-slide");
  const btnNext = document.getElementById("btn-next-slide");

  if (indicator) indicator.textContent = `${currentSlide} / ${TOTAL_SLIDES}`;
  if (progressFill) {
    const pct = (currentSlide / TOTAL_SLIDES) * 100;
    progressFill.style.width = `${pct}%`;
  }
  if (btnPrev) btnPrev.disabled = currentSlide === 1;
  if (btnNext) btnNext.disabled = currentSlide === TOTAL_SLIDES;
}

function updateTimerDisplay() {
  const timerEl = document.getElementById("deck-timer");
  if (!timerEl) return;

  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  timerEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  if (mins >= 20) {
    timerEl.className = "text-rose-600 font-bold animate-pulse";
  } else if (mins >= 15) {
    timerEl.className = "text-amber-600 font-semibold";
  } else {
    timerEl.className = "text-slate-700";
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

/* ==========================================================================
   4. Timeline Sidebar Drawer
   ========================================================================== */
function initTimelineDrawer() {
  const container = document.getElementById("timeline-slide-list");
  const drawer = document.getElementById("timeline-drawer");
  const backdrop = document.getElementById("timeline-backdrop");
  const btnClose = document.getElementById("btn-close-timeline");

  if (!container) return;
  container.innerHTML = "";

  SLIDE_METADATA.forEach((item) => {
    const div = document.createElement("div");
    div.className = `timeline-item ${item.num === currentSlide ? "active" : ""}`;
    div.setAttribute("data-slide-target", item.num);
    div.innerHTML = `
      <span class="timeline-num w-7 h-7 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-slate-200">
        ${item.num}
      </span>
      <div class="flex-1 min-w-0">
        <span class="text-sm font-semibold text-slate-800 block truncate">${item.title}</span>
        <span class="text-[11px] font-mono text-slate-500 uppercase">${item.tag}</span>
      </div>
    `;
    div.addEventListener("click", () => {
      goToSlide(item.num);
      closeTimelineDrawer();
    });
    container.appendChild(div);
  });

  if (backdrop) backdrop.addEventListener("click", closeTimelineDrawer);
  if (btnClose) btnClose.addEventListener("click", closeTimelineDrawer);
}

function toggleTimelineDrawer() {
  const drawer = document.getElementById("timeline-drawer");
  const backdrop = document.getElementById("timeline-backdrop");
  if (!drawer) return;
  const isOpen = drawer.classList.contains("open");
  if (isOpen) {
    closeTimelineDrawer();
  } else {
    drawer.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
  }
}

function closeTimelineDrawer() {
  const drawer = document.getElementById("timeline-drawer");
  const backdrop = document.getElementById("timeline-backdrop");
  if (drawer) drawer.classList.remove("open");
  if (backdrop) backdrop.classList.remove("open");
}

function updateTimelineActiveItem() {
  const items = document.querySelectorAll("#timeline-slide-list .timeline-item");
  items.forEach((it) => {
    const target = parseInt(it.getAttribute("data-slide-target"), 10);
    if (target === currentSlide) {
      it.classList.add("active");
    } else {
      it.classList.remove("active");
    }
  });
}

/* ==========================================================================
   5. Help Modal
   ========================================================================== */
function initHelpModal() {
  const modal = document.getElementById("help-modal");
  const btnClose = document.getElementById("btn-close-help");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) toggleHelpModal();
    });
  }
  if (btnClose) btnClose.addEventListener("click", toggleHelpModal);
}

function toggleHelpModal() {
  const modal = document.getElementById("help-modal");
  if (modal) modal.classList.toggle("open");
}

function closeAllModals() {
  closeTimelineDrawer();
  const modal = document.getElementById("help-modal");
  if (modal) modal.classList.remove("open");
}

/* ==========================================================================
   6. Simulation Engine: Slide 9 (Dijkstra)
   ========================================================================== */
window.s9_step = 0;
let s9_playTimer = null;

// Natural, human, pedagogical step-by-step descriptions for DijkstraSP + IndexMinPQ
const DIJKSTRA_HUMAN_DESCRIPTIONS = [
  "Bước 0 (Khởi tạo): Đặt _dist_to[A] = 0.0, các đỉnh còn lại là vô cùng (∞). Đưa (A: 0.0) vào IndexMinPQ.",
  "Bước 1: pq.del_min() rút đỉnh nguồn A (dist=0.0) và chốt đỉnh A. Nới lỏng cạnh A→B (5.0) và A→C (2.0) qua lệnh pq.insert(B, 5.0) và pq.insert(C, 2.0).",
  "Bước 2: pq.del_min() rút đỉnh C (dist=2.0) và chốt đỉnh C. Cạnh C→B (2+1=3.0 < 5.0) gọi pq.decrease_key(B, 3.0) trực tiếp giảm khóa! Thêm D (9.0) và E (11.0) qua pq.insert().",
  "Bước 3: pq.del_min() rút đỉnh B (dist=3.0) và chốt đỉnh B. Cạnh B→D (3+4=7.0 < 9.0) gọi pq.decrease_key(D, 7.0) trực tiếp giảm khóa! Cạnh B→E (3+8=11.0) không cải thiện (bỏ qua).",
  "Bước 4: pq.del_min() rút đỉnh D (dist=7.0) và chốt đỉnh D. Cạnh D→E (7+3=10.0 < 11.0) gọi pq.decrease_key(E, 10.0) trực tiếp giảm khóa!",
  "Bước 5: pq.del_min() rút đỉnh E (dist=10.0) và chốt đỉnh E. Đỉnh E không có cạnh đi ra. Hàng đợi IndexMinPQ rỗng. Toàn bộ 5 đỉnh đã chốt tối ưu!"
];

function computeEdgeGeometry(sNode, tNode, curve, rStart, rEnd) {
  const dx = tNode.x - sNode.x;
  const dy = tNode.y - sNode.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;

  if (!curve || curve === 0) {
    const startX = sNode.x + ux * rStart;
    const startY = sNode.y + uy * rStart;
    const endX = tNode.x - ux * (rEnd + 6);
    const endY = tNode.y - uy * (rEnd + 6);
    const dStr = `M ${startX.toFixed(1)} ${startY.toFixed(1)} L ${endX.toFixed(1)} ${endY.toFixed(1)}`;
    const midX = (sNode.x + tNode.x) / 2 + nx * 16;
    const midY = (sNode.y + tNode.y) / 2 + ny * 16;
    return { dStr, midX, midY, nx, ny };
  } else {
    const ctrlX = (sNode.x + tNode.x) / 2 - dy * curve;
    const ctrlY = (sNode.y + tNode.y) / 2 + dx * curve;

    const dx1 = ctrlX - sNode.x;
    const dy1 = ctrlY - sNode.y;
    const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) || 1;
    const startX = sNode.x + (dx1 / len1) * rStart;
    const startY = sNode.y + (dy1 / len1) * rStart;

    const dx2 = tNode.x - ctrlX;
    const dy2 = tNode.y - ctrlY;
    const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 1;
    const endX = tNode.x - (dx2 / len2) * (rEnd + 6);
    const endY = tNode.y - (dy2 / len2) * (rEnd + 6);

    const dStr = `M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`;
    const curveSign = curve > 0 ? 1 : -1;
    const midX = 0.25 * sNode.x + 0.5 * ctrlX + 0.25 * tNode.x + nx * (16 * curveSign);
    const midY = 0.25 * sNode.y + 0.5 * ctrlY + 0.25 * tNode.y + ny * (16 * curveSign);
    return { dStr, midX, midY, nx, ny };
  }
}

function initDijkstraSim() {
  const data = window.PRESENTATION_DATA;
  if (!data || !data.sample_graph_5) return;

  const nodes = data.sample_graph_5.nodes_layout;
  const edges = data.sample_graph_5.edges;

  // Render SVG base graph in Light Theme
  const edgesLayer = document.getElementById("s9-edges-layer");
  const nodesLayer = document.getElementById("s9-nodes-layer");

  if (edgesLayer && nodesLayer) {
    edgesLayer.innerHTML = "";
    nodesLayer.innerHTML = "";

    edges.forEach((edge) => {
      const sNode = nodes.find((n) => n.id === edge.source);
      const tNode = nodes.find((n) => n.id === edge.target);
      if (!sNode || !tNode) return;

      const geom = computeEdgeGeometry(sNode, tNode, edge.curve || 0, 34, 34);

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("id", `s9-edge-${edge.id}`);
      path.setAttribute("d", geom.dStr);
      path.setAttribute("stroke", "#94A3B8");
      path.setAttribute("stroke-width", "3");
      path.setAttribute("fill", "none");
      path.setAttribute("marker-end", "url(#s9-arrowhead)");
      edgesLayer.appendChild(path);

      // Weight Label with white background box to prevent line crossing
      const labelG = document.createElementNS("http://www.w3.org/2000/svg", "g");

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", geom.midX - 18);
      rect.setAttribute("y", geom.midY - 12);
      rect.setAttribute("width", "36");
      rect.setAttribute("height", "24");
      rect.setAttribute("rx", "6");
      rect.setAttribute("fill", "#FFFFFF");
      rect.setAttribute("stroke", "#CBD5E1");
      rect.setAttribute("stroke-width", "1.5");
      labelG.appendChild(rect);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", geom.midX);
      text.setAttribute("y", geom.midY + 5);
      text.setAttribute("fill", "#2563EB");
      text.setAttribute("font-size", "14");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "middle");
      text.textContent = edge.weight;
      labelG.appendChild(text);

      edgesLayer.appendChild(labelG);
    });

    nodes.forEach((node) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("id", `s9-node-${node.id}`);
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", "34"); // Enlarge node size
      circle.setAttribute("fill", "#FFFFFF");
      circle.setAttribute("stroke", "#64748B");
      circle.setAttribute("stroke-width", "3.5");
      g.appendChild(circle);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", node.x);
      text.setAttribute("y", node.y + 6);
      text.setAttribute("fill", "#0F172A");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("font-size", "19");
      text.setAttribute("text-anchor", "middle");
      text.textContent = node.label;
      g.appendChild(text);

      nodesLayer.appendChild(g);
    });
  }

  // Simulation controls
  const btnNext = document.getElementById("s9-btn-next");
  const btnPrev = document.getElementById("s9-btn-prev");
  const btnReset = document.getElementById("s9-btn-reset");
  const btnPlay = document.getElementById("s9-btn-play");

  if (btnNext) btnNext.addEventListener("click", () => s9_changeStep(1));
  if (btnPrev) btnPrev.addEventListener("click", () => s9_changeStep(-1));
  if (btnReset) btnReset.addEventListener("click", () => {
    s9_stopPlay();
    window.s9_step = 0;
    window.s9_renderStep(0);
  });
  if (btnPlay) btnPlay.addEventListener("click", s9_togglePlay);

  window.s9_renderStep(0);
}

function s9_changeStep(delta) {
  const trace = window.PRESENTATION_DATA.sample_graph_5.dijkstra.trace_steps;
  const newStep = window.s9_step + delta;
  if (newStep >= 0 && newStep < trace.length) {
    window.s9_step = newStep;
    window.s9_renderStep(newStep);
  } else {
    s9_stopPlay();
  }
}

function s9_togglePlay() {
  if (s9_playTimer) {
    s9_stopPlay();
  } else {
    const playText = document.getElementById("s9-play-text");
    const playIcon = document.getElementById("s9-play-icon");
    if (playText) playText.textContent = "Tạm dừng [P]";
    if (playIcon) playIcon.setAttribute("data-lucide", "pause");
    if (window.lucide) window.lucide.createIcons();

    s9_playTimer = setInterval(() => {
      const trace = window.PRESENTATION_DATA.sample_graph_5.dijkstra.trace_steps;
      if (window.s9_step < trace.length - 1) {
        s9_changeStep(1);
      } else {
        s9_stopPlay();
      }
    }, 1800);
  }
}

function s9_stopPlay() {
  if (s9_playTimer) {
    clearInterval(s9_playTimer);
    s9_playTimer = null;
  }
  const playText = document.getElementById("s9-play-text");
  const playIcon = document.getElementById("s9-play-icon");
  if (playText) playText.textContent = "Tự động Chạy [P]";
  if (playIcon) playIcon.setAttribute("data-lucide", "play");
  if (window.lucide) window.lucide.createIcons();
}

window.s9_renderStep = function(stepIdx) {
  const data = window.PRESENTATION_DATA;
  if (!data || !data.sample_graph_5) return;

  const trace = data.sample_graph_5.dijkstra.trace_steps;
  const frame = trace[stepIdx];
  if (!frame) return;

  const indicator = document.getElementById("s9-step-indicator");
  const badge = document.getElementById("s9-action-badge");
  const desc = document.getElementById("s9-desc-text");
  const heapBox = document.getElementById("s9-heap-container");
  const pathBox = document.getElementById("s9-path-display");

  if (indicator) indicator.textContent = `${stepIdx} / ${trace.length - 1}`;

  if (badge) {
    if (stepIdx === 0) {
      badge.textContent = "KHỞI TẠO NGUỒN A (ĐỈNH 0)";
      badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 font-sans";
    } else if (frame.decrease_key_nodes && frame.decrease_key_nodes.length > 0) {
      badge.textContent = `RÚT ĐỈNH ${frame.current_vertex} • CÓ DECREASE_KEY`;
      badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 font-sans";
    } else {
      badge.textContent = `RÚT ĐỈNH ${frame.current_vertex} (dist = ${frame.current_dist !== null ? frame.current_dist.toFixed(1) : "0.0"})`;
      badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 font-sans";
    }
  }

  if (desc) {
    desc.textContent = DIJKSTRA_HUMAN_DESCRIPTIONS[stepIdx] || frame.action_summary || "Đang thực hiện bước lặp của thuật toán...";
  }

  // Update SVG node circle colors
  const nodes = data.sample_graph_5.nodes_layout;
  const settled = frame.settled_vertices || [];
  const inPQ = (frame.pq_snapshot || []).map(p => p.vertex);
  const decNodes = frame.decrease_key_nodes || [];

  nodes.forEach((n) => {
    const circle = document.getElementById(`s9-node-${n.id}`);
    if (!circle) return;

    if (settled.includes(n.id)) {
      circle.setAttribute("fill", "#D1FAE5");
      circle.setAttribute("stroke", "#059669");
      circle.setAttribute("stroke-width", "4");
    } else if (decNodes.includes(n.id)) {
      circle.setAttribute("fill", "#FEF3C7");
      circle.setAttribute("stroke", "#D97706");
      circle.setAttribute("stroke-width", "4.5");
    } else if (inPQ.includes(n.id)) {
      circle.setAttribute("fill", "#EFF6FF");
      circle.setAttribute("stroke", "#2563EB");
      circle.setAttribute("stroke-width", "3.5");
    } else {
      circle.setAttribute("fill", "#FFFFFF");
      circle.setAttribute("stroke", "#64748B");
      circle.setAttribute("stroke-width", "3.5");
    }
  });

  // Highlight tree edges in SVG
  const edges = data.sample_graph_5.edges;
  const sptEdges = frame.spt_edges || [];
  const decEdges = (frame.relaxed_edges || [])
    .filter(r => r.action === "decrease_key")
    .map(r => r.edge_id);

  edges.forEach((edge) => {
    const path = document.getElementById(`s9-edge-${edge.id}`);
    if (!path) return;

    if (decEdges.includes(edge.id)) {
      path.setAttribute("stroke", "#D97706");
      path.setAttribute("stroke-width", "4.5");
      path.setAttribute("marker-end", "url(#s9-arrowhead-amber)");
    } else if (sptEdges.includes(edge.id)) {
      path.setAttribute("stroke", "#059669");
      path.setAttribute("stroke-width", "4");
      path.setAttribute("marker-end", "url(#s9-arrowhead-active)");
    } else {
      path.setAttribute("stroke", "#CBD5E1");
      path.setAttribute("stroke-width", "2.5");
      path.setAttribute("marker-end", "url(#s9-arrowhead)");
    }
  });

  // Update IndexMinPQ Badges
  if (heapBox) {
    heapBox.innerHTML = "";
    const pqItems = frame.pq_snapshot || [];
    if (pqItems.length > 0) {
      pqItems.forEach((item) => {
        const isDecreased = decNodes.includes(item.vertex);
        const span = document.createElement("span");
        if (isDecreased) {
          span.className = "px-3 py-1 rounded-xl bg-amber-50 border-2 border-amber-500 text-amber-900 font-bold shadow-sm flex items-center gap-1.5 animate-pulse";
          span.innerHTML = `<span>(${item.vertex}: ${item.dist.toFixed(1)})</span> <span class="text-[10px] font-sans px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-bold uppercase">decrease_key</span>`;
        } else {
          span.className = "px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 font-bold shadow-sm";
          span.textContent = `(${item.vertex}: ${item.dist.toFixed(1)})`;
        }
        heapBox.appendChild(span);
      });
    } else {
      heapBox.innerHTML = `<span class="text-slate-400 text-sm font-sans font-medium">IndexMinPQ rỗng (Cả 5 đỉnh đã chốt tối ưu)</span>`;
    }
  }

  // Update dist & edge_to table
  const distMap = frame.dist_to || {};
  const edgeMap = frame.edge_to || {};

  ["A", "B", "C", "D", "E"].forEach((v) => {
    const tdD = document.getElementById(`s9-d-${v}`);
    const tdP = document.getElementById(`s9-p-${v}`);
    const dVal = distMap[v];
    const eVal = edgeMap[v];

    if (tdD) {
      tdD.textContent = dVal === null || dVal === undefined ? "∞" : dVal.toFixed(1);
      tdD.className = (dVal !== null && dVal !== undefined) ? "p-2 text-emerald-700 font-extrabold text-base" : "p-2 text-slate-400";
    }
    if (tdP) {
      if (eVal && eVal.from) {
        tdP.textContent = `${eVal.from}→${eVal.to} (${eVal.weight.toFixed(1)})`;
        tdP.className = "p-2 text-blue-700 font-semibold text-xs";
      } else {
        tdP.textContent = "-";
        tdP.className = "p-2 text-slate-400 text-xs";
      }
    }
  });

  // Path reconstructed
  if (pathBox) {
    if (stepIdx >= 4) {
      pathBox.textContent = "A → C → B → D → E (Tổng chi phí = 10.0)";
      pathBox.className = "font-extrabold text-emerald-700 text-base font-mono";
    } else {
      pathBox.textContent = "Đang thực thi các bước nới lỏng...";
      pathBox.className = "font-semibold text-slate-500 text-sm font-sans";
    }
  }
};

/* ==========================================================================
   7. Simulation Engine: Slide 10 (Floyd-Warshall)
   ========================================================================== */
window.s10_step = 0;
let s10_playTimer = null;

// Natural human pedagogical descriptions for Floyd-Warshall
const FLOYD_HUMAN_DESCRIPTIONS = [
  "Khởi tạo ma trận D<sup>(0)</sup>: Các giá trị là khoảng cách nối trực tiếp giữa hai đỉnh, nếu không có đường nối thì đặt là vô cùng (∞).",
  "Thử cho phép đỉnh A làm trạm trung gian (k = 1): Vì đỉnh A không có cạnh nào đi vào nên không có cặp đỉnh nào được rút ngắn hơn qua A.",
  "Thử cho phép đỉnh B làm trạm trung gian (k = 2): Rút ngắn được 3 cặp! Cặp A→D giảm còn 9, A→E giảm còn 13 và C→D giảm còn 5.",
  "Thử cho phép đỉnh C làm trạm trung gian (k = 3): Tối ưu ngoạn mục! Đường A→B giảm từ 5 xuống 3 (qua C), A→D giảm còn 7 và A→E giảm còn 11.",
  "Thử cho phép đỉnh D làm trạm trung gian (k = 4): Rút ngắn tiếp 3 cặp! Đặc biệt đường A→E giảm từ 11 xuống 10 (A→D là 7 cộng D→E là 3), B→E giảm còn 7 và C→E giảm còn 8.",
  "Thử cho phép đỉnh E làm trạm trung gian (k = 5): Vì E không có cạnh đi tiếp nên không cập nhật thêm. Toàn bộ ma trận đã hội tụ khoảng cách ngắn nhất tuyệt đối!"
];

function initFloydSim() {
  const data = window.PRESENTATION_DATA;
  if (!data || !data.sample_graph_5) return;

  const nodes = data.sample_graph_5.nodes_layout;
  const edges = data.sample_graph_5.edges;

  // Render SVG base graph
  const edgesLayer = document.getElementById("s10-edges-layer");
  const nodesLayer = document.getElementById("s10-nodes-layer");

  if (edgesLayer && nodesLayer) {
    edgesLayer.innerHTML = "";
    nodesLayer.innerHTML = "";

    edges.forEach((edge) => {
      const sNode = nodes.find((n) => n.id === edge.source);
      const tNode = nodes.find((n) => n.id === edge.target);
      if (!sNode || !tNode) return;

      const geom = computeEdgeGeometry(sNode, tNode, edge.curve || 0, 34, 34);

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("id", `s10-edge-${edge.id}`);
      path.setAttribute("d", geom.dStr);
      path.setAttribute("stroke", "#94A3B8");
      path.setAttribute("stroke-width", "3");
      path.setAttribute("fill", "none");
      path.setAttribute("marker-end", "url(#s10-arrowhead)");
      edgesLayer.appendChild(path);

      // Weight Label with white background box to prevent line crossing
      const labelG = document.createElementNS("http://www.w3.org/2000/svg", "g");

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", geom.midX - 18);
      rect.setAttribute("y", geom.midY - 12);
      rect.setAttribute("width", "36");
      rect.setAttribute("height", "24");
      rect.setAttribute("rx", "6");
      rect.setAttribute("fill", "#FFFFFF");
      rect.setAttribute("stroke", "#CBD5E1");
      rect.setAttribute("stroke-width", "1.5");
      labelG.appendChild(rect);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", geom.midX);
      text.setAttribute("y", geom.midY + 5);
      text.setAttribute("fill", "#4F46E5");
      text.setAttribute("font-size", "14");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "middle");
      text.textContent = edge.weight;
      labelG.appendChild(text);

      edgesLayer.appendChild(labelG);
    });

    nodes.forEach((node) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("id", `s10-node-${node.id}`);
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", "34"); // Enlarge node size
      circle.setAttribute("fill", "#FFFFFF");
      circle.setAttribute("stroke", "#64748B");
      circle.setAttribute("stroke-width", "3.5");
      g.appendChild(circle);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", node.x);
      text.setAttribute("y", node.y + 6);
      text.setAttribute("fill", "#0F172A");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("font-size", "19");
      text.setAttribute("text-anchor", "middle");
      text.textContent = node.label;
      g.appendChild(text);

      nodesLayer.appendChild(g);
    });
  }

  // Simulation controls
  const btnNext = document.getElementById("s10-btn-next");
  const btnPrev = document.getElementById("s10-btn-prev");
  const btnReset = document.getElementById("s10-btn-reset");
  const btnPlay = document.getElementById("s10-btn-play");
  const tabDist = document.getElementById("s10-tab-dist");
  const tabParent = document.getElementById("s10-tab-parent");

  window.s10_active_tab = "dist";

  if (tabDist) {
    tabDist.addEventListener("click", () => {
      window.s10_active_tab = "dist";
      tabDist.className = "px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all font-sans";
      if (tabParent) tabParent.className = "px-3 py-1 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition-all font-sans";
      window.s10_renderStep(window.s10_step || 0);
    });
  }

  if (tabParent) {
    tabParent.addEventListener("click", () => {
      window.s10_active_tab = "parent";
      tabParent.className = "px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all font-sans";
      if (tabDist) tabDist.className = "px-3 py-1 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition-all font-sans";
      window.s10_renderStep(window.s10_step || 0);
    });
  }

  if (btnNext) btnNext.addEventListener("click", () => s10_changeStep(1));
  if (btnPrev) btnPrev.addEventListener("click", () => s10_changeStep(-1));
  if (btnReset) btnReset.addEventListener("click", () => {
    s10_stopPlay();
    window.s10_step = 0;
    window.s10_renderStep(0);
  });
  if (btnPlay) btnPlay.addEventListener("click", s10_togglePlay);

  window.s10_renderStep(0);
}

function s10_changeStep(delta) {
  const trace = window.PRESENTATION_DATA.sample_graph_5.floyd_warshall.trace_steps;
  const newStep = window.s10_step + delta;
  if (newStep >= 0 && newStep < trace.length) {
    window.s10_step = newStep;
    window.s10_renderStep(newStep);
  } else {
    s10_stopPlay();
  }
}

function s10_togglePlay() {
  if (s10_playTimer) {
    s10_stopPlay();
  } else {
    const playText = document.getElementById("s10-play-text");
    const playIcon = document.getElementById("s10-play-icon");
    if (playText) playText.textContent = "Tạm dừng";
    if (playIcon) playIcon.setAttribute("data-lucide", "pause");
    if (window.lucide) window.lucide.createIcons();

    s10_playTimer = setInterval(() => {
      const trace = window.PRESENTATION_DATA.sample_graph_5.floyd_warshall.trace_steps;
      if (window.s10_step < trace.length - 1) {
        s10_changeStep(1);
      } else {
        s10_stopPlay();
      }
    }, 2000);
  }
}

function s10_stopPlay() {
  if (s10_playTimer) {
    clearInterval(s10_playTimer);
    s10_playTimer = null;
  }
  const playText = document.getElementById("s10-play-text");
  const playIcon = document.getElementById("s10-play-icon");
  if (playText) playText.textContent = "Tự động Chạy";
  if (playIcon) playIcon.setAttribute("data-lucide", "play");
  if (window.lucide) window.lucide.createIcons();
}

window.s10_renderStep = function(kIdx) {
  const data = window.PRESENTATION_DATA;
  if (!data || !data.sample_graph_5) return;

  const trace = data.sample_graph_5.floyd_warshall.trace_steps;
  const frame = trace[kIdx];
  if (!frame) return;

  const kBadge = document.getElementById("s10-k-badge");
  const kLabel = document.getElementById("s10-active-k-label");
  const desc = document.getElementById("s10-desc-text");
  const updateText = document.getElementById("s10-update-count-text");
  const container = document.getElementById("s10-matrix-container");
  const legend = document.getElementById("s10-matrix-legend");

  const currentKStep = frame.k === null ? 0 : frame.k + 1;
  if (kBadge) kBadge.textContent = `k = ${currentKStep} / 5`;
  if (kLabel) kLabel.textContent = frame.k_vertex ? `Đỉnh trung gian k = ${frame.k_vertex} (đỉnh ${frame.k})` : "k = 0 (Khởi tạo cạnh trực tiếp)";

  const updates = frame.updated_cells || [];
  if (updateText) updateText.textContent = `${updates.length} ô được rút ngắn`;

  if (desc) {
    desc.innerHTML = FLOYD_HUMAN_DESCRIPTIONS[kIdx] || frame.description || "Đang duyệt đỉnh trung gian...";
  }

  // Highlight intermediate node k in SVG
  const nodes = data.sample_graph_5.nodes_layout;
  nodes.forEach((n) => {
    const circle = document.getElementById(`s10-node-${n.id}`);
    if (!circle) return;
    if (frame.k_vertex === n.id) {
      circle.setAttribute("fill", "#EEF2FF");
      circle.setAttribute("stroke", "#4F46E5");
      circle.setAttribute("stroke-width", "4.5");
    } else {
      circle.setAttribute("fill", "#FFFFFF");
      circle.setAttribute("stroke", "#64748B");
      circle.setAttribute("stroke-width", "3.5");
    }
  });

  // Highlight edges connected to intermediate k
  const edges = data.sample_graph_5.edges;
  edges.forEach((edge) => {
    const path = document.getElementById(`s10-edge-${edge.id}`);
    if (!path) return;
    const isConnToK = frame.k_vertex && (edge.source === frame.k_vertex || edge.target === frame.k_vertex);
    if (isConnToK) {
      path.setAttribute("stroke", "#4F46E5");
      path.setAttribute("stroke-width", "3.5");
      path.setAttribute("marker-end", "url(#s10-arrowhead-active)");
    } else {
      path.setAttribute("stroke", "#CBD5E1");
      path.setAttribute("stroke-width", "2.5");
      path.setAttribute("marker-end", "url(#s10-arrowhead)");
    }
  });

  // Render Matrix Table: toggle between _dist and _parent
  if (container) {
    const vertices = ["A", "B", "C", "D", "E"];
    const isParentTab = window.s10_active_tab === "parent";

    if (legend) {
      legend.textContent = isParentTab ? "Ô tím = Đổi đỉnh đứng trước" : "Ô xanh lá = Được rút ngắn";
      legend.className = isParentTab ? "text-xs text-purple-700 font-bold font-sans" : "text-xs text-emerald-700 font-bold font-sans";
    }

    const mat = isParentTab ? frame.parent_labels_matrix : frame.dist_matrix;
    const headerTitle = isParentTab ? `_parent<sup>(${currentKStep})</sup>` : `_dist<sup>(${currentKStep})</sup>`;

    let html = `<table class="w-full text-center text-sm sm:text-base font-mono border-collapse">
      <thead class="bg-slate-100 text-slate-700">
        <tr>
          <th class="p-2.5 border-b border-slate-200 text-indigo-700 font-bold text-xs">${headerTitle}</th>
          ${vertices.map(v => `<th class="p-2.5 border-b border-slate-200 font-bold text-xs ${v === frame.k_vertex ? "text-indigo-800 bg-indigo-100" : ""}">${v}</th>`).join("")}
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 bg-white">`;

    for (let i = 0; i < vertices.length; i++) {
      html += `<tr><td class="p-2.5 font-bold text-xs ${vertices[i] === frame.k_vertex ? "text-indigo-800 bg-indigo-100" : "text-slate-700 bg-slate-50"}">${vertices[i]}</td>`;
      for (let j = 0; j < vertices.length; j++) {
        const val = mat[i][j];
        const isUpdated = updates.some(u => (u.i === vertices[i] && u.j === vertices[j]) || (u.from === vertices[i] && u.to === vertices[j]));
        const isKFocus = vertices[i] === frame.k_vertex || vertices[j] === frame.k_vertex;

        let cellClass = "p-2.5 text-xs font-semibold ";
        if (isUpdated) {
          cellClass += isParentTab
            ? "bg-purple-100 text-purple-900 border border-purple-400 font-extrabold animate-pulse"
            : "bg-emerald-100 text-emerald-900 border border-emerald-400 font-extrabold animate-pulse";
        } else if (isKFocus) {
          cellClass += "bg-indigo-50/70 text-indigo-900 font-bold";
        } else {
          cellClass += "text-slate-800";
        }

        const displayVal = val === null ? "∞" : (typeof val === "number" ? val.toFixed(1) : val);
        html += `<td class="${cellClass}">${displayVal}</td>`;
      }
      html += `</tr>`;
    }
    html += `</tbody></table>`;
    container.innerHTML = html;
  }
};

/* ==========================================================================
   8. Emergency Urban Map & Hub Candidates (Slide 17 & 18)
   ========================================================================== */
function initEmergencySlide() {
  const data = window.PRESENTATION_DATA;
  if (!data || !data.emergency_system) return;

  renderEmergencyMap();

  // Slide 18 Hub candidate cards
  const hubContainer = document.getElementById("s18-hub-cards");
  if (hubContainer) {
    hubContainer.innerHTML = "";
    const evals = data.emergency_system.hub_placement_leetcode_1334.evaluations;

    evals.forEach((ev) => {
      const isWinner = ev.hub === "R1";
      const div = document.createElement("div");
      div.className = isWinner
        ? "p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-left relative shadow-sm"
        : "p-4 rounded-xl bg-white border border-slate-200 text-left shadow-sm";

      div.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="font-bold text-base ${isWinner ? "text-emerald-800" : "text-slate-800"}">${ev.hub} (${ev.name})</span>
          ${isWinner ? `<span class="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">TỐI ƯU #1</span>` : ""}
        </div>
        <div class="text-sm text-slate-600 mt-1.5">Độ phủ: <span class="font-bold text-slate-900">${ev.covered_count}/4 khu</span> (ngưỡng ≤ 15m)</div>
        <div class="text-sm text-slate-600">Xa nhất: <span class="font-bold text-slate-900">${ev.worst_case_time} phút</span></div>
      `;
      hubContainer.appendChild(div);
    });
  }
}

function renderEmergencyMap() {
  const data = window.PRESENTATION_DATA;
  if (!data || !data.emergency_system) return;

  const mapSvg = document.getElementById("s17-map-svg");
  if (!mapSvg) return;

  const nodes = data.emergency_system.nodes_layout;
  const edges = data.emergency_system.edges;

  mapSvg.innerHTML = `
    <defs>
      <marker id="em-arrowhead" markerWidth="9" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <polygon points="0 0, 9 3.5, 0 7" fill="#64748B" />
      </marker>
      <marker id="em-arrowhead-green" markerWidth="9" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <polygon points="0 0, 9 3.5, 0 7" fill="#059669" />
      </marker>
    </defs>
  `;

  edges.forEach((e) => {
    const s = nodes.find(n => n.id === e.source);
    const t = nodes.find(n => n.id === e.target);
    if (!s || !t) return;

    const isWinnerRoute = (e.source === "H2" && e.target === "R4");
    const rStart = s.type === "hospital" ? 30 : 26;
    const rEnd = t.type === "hospital" ? 30 : 26;
    const geom = computeEdgeGeometry(s, t, 0, rStart, rEnd);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", geom.dStr);
    path.setAttribute("stroke", isWinnerRoute ? "#059669" : "#CBD5E1");
    path.setAttribute("stroke-width", isWinnerRoute ? "4.5" : "2.5");
    path.setAttribute("fill", "none");
    path.setAttribute("marker-end", isWinnerRoute ? "url(#em-arrowhead-green)" : "url(#em-arrowhead)");
    mapSvg.appendChild(path);

    // Label wrapped in white rounded box
    const labelG = document.createElementNS("http://www.w3.org/2000/svg", "g");

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", geom.midX - 22);
    rect.setAttribute("y", geom.midY - 12);
    rect.setAttribute("width", "44");
    rect.setAttribute("height", "24");
    rect.setAttribute("rx", "6");
    rect.setAttribute("fill", "#FFFFFF");
    rect.setAttribute("stroke", isWinnerRoute ? "#A7F3D0" : "#CBD5E1");
    rect.setAttribute("stroke-width", "1.5");
    labelG.appendChild(rect);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", geom.midX);
    text.setAttribute("y", geom.midY + 5);
    text.setAttribute("fill", isWinnerRoute ? "#047857" : "#475569");
    text.setAttribute("font-size", "13");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("text-anchor", "middle");
    text.textContent = `${e.weight}m`;
    labelG.appendChild(text);

    mapSvg.appendChild(labelG);
  });

  nodes.forEach((n) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const isHospital = n.type === "hospital";

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", n.x);
    circle.setAttribute("cy", n.y);
    circle.setAttribute("r", isHospital ? "30" : "26");
    circle.setAttribute("fill", isHospital ? "#FEE2E2" : "#EFF6FF");
    circle.setAttribute("stroke", isHospital ? "#E11D48" : "#2563EB");
    circle.setAttribute("stroke-width", "3.5");
    g.appendChild(circle);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", n.x);
    text.setAttribute("y", n.y + 5);
    text.setAttribute("fill", isHospital ? "#9F1239" : "#1E40AF");
    text.setAttribute("font-size", "14");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("text-anchor", "middle");
    text.textContent = n.id;
    g.appendChild(text);

    // Location name: top row (y < 200) places label ABOVE node (n.y - 40)
    // bottom row places label BELOW node (n.y + 46) to never cut through edges
    const labelY = n.y < 200 ? n.y - 40 : n.y + 46;
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", n.x);
    label.setAttribute("y", labelY);
    label.setAttribute("fill", "#0F172A");
    label.setAttribute("font-size", "13");
    label.setAttribute("font-weight", "600");
    label.setAttribute("text-anchor", "middle");
    label.textContent = n.label;
    g.appendChild(label);

    mapSvg.appendChild(g);
  });
}

/* ==========================================================================
   9. Code Window Tab Switchers (Slide 11 & Slide 12)
   ========================================================================== */
window.s11_switchTab = function(tab) {
  const btnEdge = document.getElementById("s11-btn-edge");
  const btnMinpq = document.getElementById("s11-btn-minpq");
  const codeEdge = document.getElementById("s11-code-edge");
  const codeMinpq = document.getElementById("s11-code-minpq");

  if (!btnEdge || !btnMinpq || !codeEdge || !codeMinpq) return;

  if (tab === "edge") {
    btnEdge.className = "px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm transition-all";
    btnMinpq.className = "px-3 py-1 rounded-lg text-xs font-bold bg-slate-700 text-slate-300 hover:text-white transition-all";
    codeEdge.classList.remove("hidden");
    codeMinpq.classList.add("hidden");
  } else {
    btnMinpq.className = "px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm transition-all";
    btnEdge.className = "px-3 py-1 rounded-lg text-xs font-bold bg-slate-700 text-slate-300 hover:text-white transition-all";
    codeMinpq.classList.remove("hidden");
    codeEdge.classList.add("hidden");
  }
};

window.s12_switchTab = function(tab) {
  const btnDijkstra = document.getElementById("s12-btn-dijkstra");
  const btnFloyd = document.getElementById("s12-btn-floyd");
  const codeDijkstra = document.getElementById("s12-code-dijkstra");
  const codeFloyd = document.getElementById("s12-code-floyd");

  if (!btnDijkstra || !btnFloyd || !codeDijkstra || !codeFloyd) return;

  if (tab === "dijkstra") {
    btnDijkstra.className = "px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm transition-all";
    btnFloyd.className = "px-3 py-1 rounded-lg text-xs font-bold bg-slate-700 text-slate-300 hover:text-white transition-all";
    codeDijkstra.classList.remove("hidden");
    codeFloyd.classList.add("hidden");
  } else {
    btnFloyd.className = "px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all";
    btnDijkstra.className = "px-3 py-1 rounded-lg text-xs font-bold bg-slate-700 text-slate-300 hover:text-white transition-all";
    codeFloyd.classList.remove("hidden");
    codeDijkstra.classList.add("hidden");
  }
};

