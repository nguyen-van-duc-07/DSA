/**
 * app.js - Full-Screen Vertical Slide Deck Engine & Interactive Visualizations
 * Editorial Palette Edition | Zero-Overlap Slide 17 Map | Strict Code-Scroll Lock
 * Version: 6.0.0
 */

if (!window.__DSA_DECK_INITIALIZED__) {
  window.__DSA_DECK_INITIALIZED__ = true;

  let currentSlide = 1;
  const TOTAL_SLIDES = 20;

  const SLIDE_METADATA = [
    { num: 1, title: "Trang bìa (Hero Cover)", tag: "Mở đầu" },
    { num: 2, title: "Lộ trình bài thuyết trình (8 Chặng)", tag: "Mục lục" },
    { num: 3, title: "Bài toán của Dijkstra (SSSP)", tag: "Định nghĩa" },
    { num: 4, title: "Bài toán của Floyd-Warshall (APSP)", tag: "Định nghĩa" },
    { num: 5, title: "Ý tưởng Dijkstra: Tham lam & Nới lỏng", tag: "Ý tưởng" },
    { num: 6, title: "Ý tưởng Dijkstra: IndexMinPQ", tag: "Ý tưởng" },
    { num: 7, title: "Ý tưởng Floyd: Đỉnh trung gian", tag: "Ý tưởng" },
    { num: 8, title: "Ý tưởng Floyd: Công thức & Bộ nhớ In-place", tag: "Ý tưởng" },
    { num: 9, title: "Mô phỏng DijkstraSP & IndexMinPQ", tag: "Mô phỏng" },
    { num: 10, title: "Mô phỏng Floyd-Warshall ma trận D<sup>(k)</sup>", tag: "Mô phỏng" },
    { num: 11, title: "Cài đặt Python: edge.py & minpq.py", tag: "Mã nguồn" },
    { num: 12, title: "Cài đặt Python: dijkstra_v2.py & floyd_v2.py", tag: "Mã nguồn" },
    { num: 13, title: "Kết quả Kiểm thử Python thực tế", tag: "Kiểm thử" },
    { num: 14, title: "Phân tích Độ phức tạp Thời gian", tag: "Hiệu năng" },
    { num: 15, title: "Độ phức tạp Bộ nhớ & CPU Cache", tag: "Phần cứng" },
    { num: 16, title: "Giới hạn: Cạnh âm & Chu trình âm", tag: "Trường hợp biên" },
    { num: 17, title: "Ứng dụng Dijkstra: So sánh hai nguồn (LC 743)", tag: "Thực tế" },
    { num: 18, title: "Ứng dụng: Trạm Y tế (lấy cảm hứng từ LC 1334)", tag: "Thực tế" },
    { num: 19, title: "Mở rộng: So sánh thuật toán & định tuyến hiện đại", tag: "Mở rộng" },
    { num: 20, title: "Tổng kết bài học & Lời cảm ơn", tag: "Kết luận" }
  ];

  document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) window.lucide.createIcons();
    initMath();
    initSlideEngine();
    initFloatingBar();
    initTimelineDrawer();
    initHelpModal();
    initDijkstraSim();
    initFloydSim();
    initEmergencySlide();
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
          { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
      });
    }
  }

  /* ==========================================================================
     2. Vertical Slide Deck Navigation Engine (Strict Code Scroll Isolation)
     ========================================================================== */
  function initSlideEngine() {
    window.addEventListener("keydown", (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        toggleTimelineDrawer();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "p" || e.key === "P") {
        if (currentSlide === 9) s9_togglePlay();
        if (currentSlide === 10) s10_togglePlay();
      } else if (e.key === "n" || e.key === "N") {
        if (currentSlide === 9) s9_changeStep(1);
        if (currentSlide === 10) s10_changeStep(1);
      } else if (e.key === "r" || e.key === "R") {
        if (currentSlide === 9) { s9_stopPlay(); window.s9_step = 0; window.s9_renderStep(0); }
        if (currentSlide === 10) { s10_stopPlay(); window.s10_step = 0; window.s10_renderStep(0); }
      } else if (e.key === "?") {
        e.preventDefault();
        toggleHelpModal();
      } else if (e.key === "Escape") {
        closeAllModals();
      }
    });

    // Mouse Wheel Navigation: Chặn tuyệt đối chuyển slide khi trỏ chuột trong khung code/terminal
    let lastWheelTime = 0;
    const WHEEL_COOLDOWN = 620;

    window.addEventListener("wheel", (e) => {
      const helpModal = document.getElementById("help-modal");
      const timelineDrawer = document.getElementById("timeline-drawer");
      if (helpModal?.classList.contains("open") || timelineDrawer?.classList.contains("open")) {
        return;
      }

      // Khi con trỏ chuột đang nằm trong khung code hoặc terminal, dù kéo kịch trên hay kịch dưới cũng KHÔNG chuyển slide
      const insideCodeOrScrollable = e.target.closest("pre, code, .terminal-window, #timeline-slide-list");
      if (insideCodeOrScrollable) {
        return;
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

    const heroBtn = document.getElementById("hero-start-btn");
    if (heroBtn) {
      heroBtn.addEventListener("click", () => goToSlide(2));
    }
  }

  function updateSlideClasses() {
    for (let i = 1; i <= TOTAL_SLIDES; i++) {
      const el = document.getElementById(`slide-${i}`);
      if (!el) continue;
      el.classList.remove("active", "prev-slide", "next-slide");
      if (i < currentSlide) {
        el.classList.add("prev-slide");
      } else if (i > currentSlide) {
        el.classList.add("next-slide");
      } else {
        el.classList.add("active");
      }
    }
  }

  window.goToSlide = function(slideNum) {
    if (slideNum < 1 || slideNum > TOTAL_SLIDES) return;

    currentSlide = slideNum;
    updateSlideClasses();

    window.history.replaceState(null, "", `#${currentSlide}`);
    updateFloatingBarUI();
    updateTimelineActiveItem();

    if (currentSlide === 9 && typeof window.s9_renderStep === "function") {
      window.s9_renderStep(window.s9_step || 0);
    } else if (currentSlide === 10 && typeof window.s10_renderStep === "function") {
      window.s10_renderStep(window.s10_step || 0);
    } else if (currentSlide === 17) {
      renderEmergencyMap();
    }

    setTimeout(initMath, 40);
  };

  function nextSlide() {
    if (currentSlide < TOTAL_SLIDES) {
      window.goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      window.goToSlide(currentSlide - 1);
    }
  }

  function handleHashNavigation() {
    const hash = window.location.hash.replace("#", "");
    const num = parseInt(hash, 10);
    if (!isNaN(num) && num >= 1 && num <= TOTAL_SLIDES) {
      window.goToSlide(num);
    } else {
      window.goToSlide(1);
    }
  }

  /* ==========================================================================
     3. Floating Bottom Control Bar (Clean - No Timer)
     ========================================================================== */
  function initFloatingBar() {
    const btnPrev = document.getElementById("btn-prev-slide");
    const btnNext = document.getElementById("btn-next-slide");
    const btnTimeline = document.getElementById("btn-open-timeline");
    const btnFullscreen = document.getElementById("btn-toggle-fullscreen");
    const btnHelp = document.getElementById("btn-open-help");

    if (btnPrev) btnPrev.addEventListener("click", prevSlide);
    if (btnNext) btnNext.addEventListener("click", nextSlide);
    if (btnTimeline) btnTimeline.addEventListener("click", toggleTimelineDrawer);
    if (btnFullscreen) btnFullscreen.addEventListener("click", toggleFullscreen);
    if (btnHelp) btnHelp.addEventListener("click", toggleHelpModal);
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

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  /* ==========================================================================
     4. Timeline Sidebar Drawer & Help Modal
     ========================================================================== */
  function initTimelineDrawer() {
    const container = document.getElementById("timeline-slide-list");
    const backdrop = document.getElementById("timeline-backdrop");
    const btnClose = document.getElementById("btn-close-timeline");

    if (!container) return;
    container.innerHTML = "";

    SLIDE_METADATA.forEach((item) => {
      const div = document.createElement("div");
      div.className = `timeline-item ${item.num === currentSlide ? "active" : ""}`;
      div.setAttribute("data-slide-target", item.num);
      div.innerHTML = `
        <span class="timeline-num w-7 h-7 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 border border-slate-200">
          ${item.num}
        </span>
        <div class="flex-1 min-w-0">
          <span class="text-sm font-semibold text-slate-800 block truncate">${item.title}</span>
          <span class="text-[11px] text-slate-500 uppercase font-medium">${item.tag}</span>
        </div>
      `;
      div.addEventListener("click", () => {
        window.goToSlide(item.num);
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
    if (drawer.classList.contains("open")) {
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
     5. SVG Edge Geometry Helper
     ========================================================================== */
  function computeEdgeGeometry(sNode, tNode, curve = 0, rStart = 34, rEnd = 34, labelT = 0.5, normalOffset = 18) {
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
      const endX = tNode.x - ux * (rEnd + 3);
      const endY = tNode.y - uy * (rEnd + 3);
      const dStr = `M ${startX.toFixed(1)} ${startY.toFixed(1)} L ${endX.toFixed(1)} ${endY.toFixed(1)}`;
      const baseX = sNode.x + dx * labelT;
      const baseY = sNode.y + dy * labelT;
      const midX = baseX + nx * normalOffset;
      const midY = baseY + ny * normalOffset;
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
      const endX = tNode.x - (dx2 / len2) * (rEnd + 3);
      const endY = tNode.y - (dy2 / len2) * (rEnd + 3);

      const dStr = `M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`;
      const t = labelT;
      const invT = 1 - t;
      const bezX = invT * invT * sNode.x + 2 * invT * t * ctrlX + t * t * tNode.x;
      const bezY = invT * invT * sNode.y + 2 * invT * t * ctrlY + t * t * tNode.y;
      const midX = bezX + nx * normalOffset;
      const midY = bezY + ny * normalOffset;
      return { dStr, midX, midY, nx, ny };
    }
  }

  /* ==========================================================================
     6. Simulation Engine: Slide 9 (DijkstraSP + IndexMinPQ)
     ========================================================================== */
  window.s9_step = 0;
  let s9_playTimer = null;

  const DIJKSTRA_HUMAN_DESCRIPTIONS = [
    "Bước 0 (Khởi tạo): Đặt _dist_to[A] = 0.0, các đỉnh còn lại là vô cùng (∞). Đưa (A: 0.0) vào IndexMinPQ.",
    "Bước 1: pq.del_min() rút đỉnh nguồn A (dist=0.0) và chốt đỉnh A. Nới lỏng cạnh A→B (5.0) và A→C (2.0) qua lệnh pq.insert(B, 5.0) và pq.insert(C, 2.0).",
    "Bước 2: pq.del_min() rút đỉnh C (dist=2.0) và chốt đỉnh C. Cạnh C→B (2+1=3.0 < 5.0) gọi pq.decrease_key(B, 3.0) trực tiếp giảm khóa! Thêm D (9.0) và E (11.0) qua pq.insert().",
    "Bước 3: pq.del_min() rút đỉnh B (dist=3.0) và chốt đỉnh B. Cạnh B→D (3+4=7.0 < 9.0) gọi pq.decrease_key(D, 7.0) trực tiếp giảm khóa! Cạnh B→E (3+8=11.0) không cải thiện (bỏ qua).",
    "Bước 4: pq.del_min() rút đỉnh D (dist=7.0) và chốt đỉnh D. Cạnh D→E (7+3=10.0 < 11.0) gọi pq.decrease_key(E, 10.0) trực tiếp giảm khóa!",
    "Bước 5: pq.del_min() rút đỉnh E (dist=10.0) và chốt đỉnh E. Đỉnh E không có cạnh đi ra. Hàng đợi IndexMinPQ rỗng. Toàn bộ 5 đỉnh đã chốt tối ưu!"
  ];

  function initDijkstraSim() {
    const data = window.PRESENTATION_DATA;
    if (!data || !data.sample_graph_5) return;

    const nodes = data.sample_graph_5.nodes_layout;
    const edges = data.sample_graph_5.edges;

    const edgesLayer = document.getElementById("s9-edges-layer");
    const nodesLayer = document.getElementById("s9-nodes-layer");

    if (edgesLayer && nodesLayer) {
      edgesLayer.innerHTML = "";
      nodesLayer.innerHTML = "";

      edges.forEach((edge) => {
        const sNode = nodes.find((n) => n.id === edge.source);
        const tNode = nodes.find((n) => n.id === edge.target);
        if (!sNode || !tNode) return;

        const curveVal = edge.id === "e_B_E" ? -0.32 : (edge.curve || 0);
        const offsetSign = curveVal < 0 ? -16 : (edge.id === "e_C_B" ? -22 : 18);
        const geom = computeEdgeGeometry(sNode, tNode, curveVal, 34, 34, 0.5, offsetSign);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("id", `s9-edge-${edge.id}`);
        path.setAttribute("d", geom.dStr);
        path.setAttribute("stroke", "#A8A29E");
        path.setAttribute("stroke-width", "3");
        path.setAttribute("fill", "none");
        path.setAttribute("marker-end", "url(#s9-arrowhead)");
        edgesLayer.appendChild(path);

        const labelG = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", geom.midX - 18);
        rect.setAttribute("y", geom.midY - 12);
        rect.setAttribute("width", "36");
        rect.setAttribute("height", "24");
        rect.setAttribute("rx", "6");
        rect.setAttribute("fill", "#FFFFFF");
        rect.setAttribute("stroke", "#D6D1C7");
        rect.setAttribute("stroke-width", "1.5");
        labelG.appendChild(rect);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", geom.midX);
        text.setAttribute("y", geom.midY + 5);
        text.setAttribute("fill", "#C84B31");
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
        circle.setAttribute("r", "34");
        circle.setAttribute("fill", "#FFFFFF");
        circle.setAttribute("stroke", "#78716C");
        circle.setAttribute("stroke-width", "3.5");
        g.appendChild(circle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", node.x);
        text.setAttribute("y", node.y + 6);
        text.setAttribute("fill", "#181615");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("font-size", "19");
        text.setAttribute("text-anchor", "middle");
        text.textContent = node.label;
        g.appendChild(text);

        nodesLayer.appendChild(g);
      });
    }

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
        badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800";
      } else if (frame.decrease_key_nodes && frame.decrease_key_nodes.length > 0) {
        badge.textContent = `RÚT ĐỈNH ${frame.current_vertex} • CÓ DECREASE_KEY`;
        badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300";
      } else {
        badge.textContent = `RÚT ĐỈNH ${frame.current_vertex} (dist = ${frame.current_dist !== null ? frame.current_dist.toFixed(1) : "0.0"})`;
        badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800";
      }
    }

    if (desc) {
      desc.textContent = DIJKSTRA_HUMAN_DESCRIPTIONS[stepIdx] || frame.action_summary || "Đang thực hiện bước lặp của thuật toán...";
    }

    const nodes = data.sample_graph_5.nodes_layout;
    const settled = frame.settled_vertices || [];
    const inPQ = (frame.pq_snapshot || []).map(p => p.vertex);
    const decNodes = frame.decrease_key_nodes || [];

    nodes.forEach((n) => {
      const circle = document.getElementById(`s9-node-${n.id}`);
      if (!circle) return;

      if (settled.includes(n.id)) {
        circle.setAttribute("fill", "#D6F0E8");
        circle.setAttribute("stroke", "#1E6F5C");
        circle.setAttribute("stroke-width", "4");
      } else if (decNodes.includes(n.id)) {
        circle.setAttribute("fill", "#FDEFD2");
        circle.setAttribute("stroke", "#B4690E");
        circle.setAttribute("stroke-width", "4.5");
      } else if (inPQ.includes(n.id)) {
        circle.setAttribute("fill", "#FDF3F0");
        circle.setAttribute("stroke", "#C84B31");
        circle.setAttribute("stroke-width", "3.5");
      } else {
        circle.setAttribute("fill", "#FFFFFF");
        circle.setAttribute("stroke", "#78716C");
        circle.setAttribute("stroke-width", "3.5");
      }
    });

    const edges = data.sample_graph_5.edges;
    const sptEdges = frame.spt_edges || [];
    const decEdges = (frame.relaxed_edges || [])
      .filter(r => r.action === "decrease_key")
      .map(r => r.edge_id);

    edges.forEach((edge) => {
      const path = document.getElementById(`s9-edge-${edge.id}`);
      if (!path) return;

      path.classList.remove("edge-flow-active");
      if (decEdges.includes(edge.id)) {
        path.setAttribute("stroke", "#B4690E");
        path.setAttribute("stroke-width", "4.5");
        path.setAttribute("marker-end", "url(#s9-arrowhead-amber)");
        path.classList.add("edge-flow-active");
      } else if (sptEdges.includes(edge.id)) {
        path.setAttribute("stroke", "#1E6F5C");
        path.setAttribute("stroke-width", "4");
        path.setAttribute("marker-end", "url(#s9-arrowhead-active)");
        path.classList.add("edge-flow-active");
      } else {
        path.setAttribute("stroke", "#D6D1C7");
        path.setAttribute("stroke-width", "2.5");
        path.setAttribute("marker-end", "url(#s9-arrowhead)");
      }
    });

    if (heapBox) {
      heapBox.innerHTML = "";
      const pqItems = frame.pq_snapshot || [];
      if (pqItems.length > 0) {
        pqItems.forEach((item) => {
          const isDecreased = decNodes.includes(item.vertex);
          const span = document.createElement("span");
          if (isDecreased) {
            span.className = "px-3 py-1 rounded-xl bg-amber-50 border-2 border-amber-500 text-amber-900 font-bold shadow-sm flex items-center gap-1.5 animate-pulse";
            span.innerHTML = `<span>(${item.vertex}: ${item.dist.toFixed(1)})</span> <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-bold uppercase">decrease_key</span>`;
          } else {
            span.className = "px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 font-bold shadow-sm";
            span.textContent = `(${item.vertex}: ${item.dist.toFixed(1)})`;
          }
          heapBox.appendChild(span);
        });
      } else {
        heapBox.innerHTML = `<span class="text-slate-400 text-sm font-medium">IndexMinPQ rỗng (Cả 5 đỉnh đã chốt tối ưu)</span>`;
      }
    }

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

    if (pathBox) {
      if (stepIdx >= 4) {
        pathBox.textContent = "A → C → B → D → E (Tổng chi phí = 10.0)";
        pathBox.className = "font-extrabold text-emerald-700 text-base";
      } else {
        pathBox.textContent = "Đang thực thi các bước nới lỏng...";
        pathBox.className = "font-semibold text-slate-500 text-sm";
      }
    }
  };

  /* ==========================================================================
     7. Simulation Engine: Slide 10 (Floyd-Warshall)
     ========================================================================== */
  window.s10_step = 0;
  let s10_playTimer = null;

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

    const edgesLayer = document.getElementById("s10-edges-layer");
    const nodesLayer = document.getElementById("s10-nodes-layer");

    if (edgesLayer && nodesLayer) {
      edgesLayer.innerHTML = "";
      nodesLayer.innerHTML = "";

      edges.forEach((edge) => {
        const sNode = nodes.find((n) => n.id === edge.source);
        const tNode = nodes.find((n) => n.id === edge.target);
        if (!sNode || !tNode) return;

        const curveVal = edge.id === "e_B_E" ? -0.32 : (edge.curve || 0);
        const offsetSign = curveVal < 0 ? -16 : (edge.id === "e_C_B" ? -22 : 18);
        const geom = computeEdgeGeometry(sNode, tNode, curveVal, 34, 34, 0.5, offsetSign);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("id", `s10-edge-${edge.id}`);
        path.setAttribute("d", geom.dStr);
        path.setAttribute("stroke", "#A8A29E");
        path.setAttribute("stroke-width", "3");
        path.setAttribute("fill", "none");
        path.setAttribute("marker-end", "url(#s10-arrowhead)");
        edgesLayer.appendChild(path);

        const labelG = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", geom.midX - 18);
        rect.setAttribute("y", geom.midY - 12);
        rect.setAttribute("width", "36");
        rect.setAttribute("height", "24");
        rect.setAttribute("rx", "6");
        rect.setAttribute("fill", "#FFFFFF");
        rect.setAttribute("stroke", "#D6D1C7");
        rect.setAttribute("stroke-width", "1.5");
        labelG.appendChild(rect);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", geom.midX);
        text.setAttribute("y", geom.midY + 5);
        text.setAttribute("fill", "#0F4C5C");
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
        circle.setAttribute("r", "34");
        circle.setAttribute("fill", "#FFFFFF");
        circle.setAttribute("stroke", "#78716C");
        circle.setAttribute("stroke-width", "3.5");
        g.appendChild(circle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", node.x);
        text.setAttribute("y", node.y + 6);
        text.setAttribute("fill", "#181615");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("font-size", "19");
        text.setAttribute("text-anchor", "middle");
        text.textContent = node.label;
        g.appendChild(text);

        nodesLayer.appendChild(g);
      });
    }

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
        tabDist.className = "px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all cursor-pointer";
        if (tabParent) tabParent.className = "px-3 py-1 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
        window.s10_renderStep(window.s10_step || 0);
      });
    }

    if (tabParent) {
      tabParent.addEventListener("click", () => {
        window.s10_active_tab = "parent";
        tabParent.className = "px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all cursor-pointer";
        if (tabDist) tabDist.className = "px-3 py-1 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
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

    const nodes = data.sample_graph_5.nodes_layout;
    nodes.forEach((n) => {
      const circle = document.getElementById(`s10-node-${n.id}`);
      if (!circle) return;
      if (frame.k_vertex === n.id) {
        circle.setAttribute("fill", "#DCEEF2");
        circle.setAttribute("stroke", "#0F4C5C");
        circle.setAttribute("stroke-width", "4.5");
      } else {
        circle.setAttribute("fill", "#FFFFFF");
        circle.setAttribute("stroke", "#78716C");
        circle.setAttribute("stroke-width", "3.5");
      }
    });

    const edges = data.sample_graph_5.edges;
    edges.forEach((edge) => {
      const path = document.getElementById(`s10-edge-${edge.id}`);
      if (!path) return;
      path.classList.remove("edge-flow-active");
      const isConnToK = frame.k_vertex && (edge.source === frame.k_vertex || edge.target === frame.k_vertex);
      if (isConnToK) {
        path.setAttribute("stroke", "#0F4C5C");
        path.setAttribute("stroke-width", "3.5");
        path.setAttribute("marker-end", "url(#s10-arrowhead-active)");
        path.classList.add("edge-flow-active");
      } else {
        path.setAttribute("stroke", "#D6D1C7");
        path.setAttribute("stroke-width", "2.5");
        path.setAttribute("marker-end", "url(#s10-arrowhead)");
      }
    });

    if (container) {
      const vertices = ["A", "B", "C", "D", "E"];
      const isParentTab = window.s10_active_tab === "parent";

      if (legend) {
        legend.textContent = isParentTab ? "Ô vàng đồng = Đổi đỉnh đứng trước" : "Ô xanh lá = Được rút ngắn";
        legend.className = isParentTab ? "text-xs text-amber-700 font-bold" : "text-xs text-emerald-700 font-bold";
      }

      const mat = isParentTab ? frame.parent_labels_matrix : frame.dist_matrix;
      const headerTitle = isParentTab ? `_parent<sup>(${currentKStep})</sup>` : `_dist<sup>(${currentKStep})</sup>`;

      let html = `<table class="w-full text-center text-sm sm:text-base border-collapse">
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
              ? "bg-amber-100 text-amber-900 border border-amber-400 font-extrabold animate-pulse"
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
     8. Emergency Urban Map & Hub Candidates (Slide 17 & 18 - Hand-Crafted Zero-Overlap SVG)
     ========================================================================== */
  function initEmergencySlide() {
    const data = window.PRESENTATION_DATA;
    if (!data || !data.emergency_system) return;

    renderEmergencyMap();

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
    const mapSvg = document.getElementById("s17-map-svg");
    if (!mapSvg) return;

    // Tọa độ 6 địa điểm được bố trí thoáng, tách biệt hoàn toàn đường đi và nhãn
    const urbanNodes = [
      { id: "H1", label: "H1 (Trung tâm)", x: 125, y: 115, labelX: 125, labelY: 68,  type: "hospital" },
      { id: "R1", label: "R1 (Phố Cổ)",    x: 430, y: 80,  labelX: 430, labelY: 36,  type: "residential" },
      { id: "R2", label: "R2 (KĐT Mới)",   x: 725, y: 115, labelX: 725, labelY: 68,  type: "residential" },
      { id: "H2", label: "H2 (Vệ tinh)",   x: 125, y: 300, labelX: 125, labelY: 252, type: "hospital" },
      { id: "R3", label: "R3 (Khu CNC)",   x: 430, y: 300, labelX: 430, labelY: 348, type: "residential" },
      { id: "R4", label: "R4 (Ven sông)",  x: 725, y: 300, labelX: 725, labelY: 348, type: "residential" }
    ];

    // Tọa độ đường dẫn SVG và vị trí nhãn (lx, ly) được căn chỉnh thủ công chính xác từng pixel
    const customEdges = [
      {
        id: "em_H1_R1",
        d: "M 155 111 L 401 83",
        lx: 275, ly: 78, text: "4m", isWinner: false
      },
      {
        id: "em_R1_R2",
        d: "M 456 83 L 696 111",
        lx: 580, ly: 78, text: "3m", isWinner: false
      },
      {
        id: "em_H1_R2",
        d: "M 154 124 Q 430 185 696 124",
        lx: 285, ly: 158, text: "6m", isWinner: false
      },
      {
        id: "em_R1_R3",
        d: "M 430 106 L 430 271",
        lx: 394, ly: 205, text: "8m", isWinner: false
      },
      {
        id: "em_R2_R3",
        d: "M 702 128 Q 555 180 454 281",
        lx: 532, ly: 184, text: "4m", isWinner: false
      },
      {
        id: "em_R4_R1",
        d: "M 705 282 Q 605 220 452 98",
        lx: 635, ly: 242, text: "15m", isWinner: false
      },
      {
        id: "em_R2_R4",
        d: "M 725 141 L 725 271",
        lx: 770, ly: 208, text: "12m", isWinner: false
      },
      {
        id: "em_H2_R3",
        d: "M 155 300 L 401 300",
        lx: 278, ly: 278, text: "6m", isWinner: false
      },
      {
        id: "em_R3_R4",
        d: "M 456 300 L 696 300",
        lx: 578, ly: 278, text: "5m", isWinner: false
      },
      {
        // Tuyến H2 -> R4 vòng xuống dưới đáy (y = 460), tách biệt hoàn toàn với đỉnh R3
        id: "em_H2_R4",
        d: "M 149 318 Q 430 465 703 319",
        lx: 430, ly: 416, text: "7m (Trực tiếp)", isWinner: true
      }
    ];

    mapSvg.innerHTML = `
      <defs>
        <marker id="em-arrowhead" markerWidth="8" markerHeight="6" refX="7.5" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#78716C" />
        </marker>
        <marker id="em-arrowhead-green" markerWidth="8" markerHeight="6" refX="7.5" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#1E6F5C" />
        </marker>
      </defs>
    `;

    // 1. Vẽ toàn bộ các cạnh trước
    customEdges.forEach((e) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", e.d);
      path.setAttribute("stroke", e.isWinner ? "#1E6F5C" : "#A8A29E");
      path.setAttribute("stroke-width", e.isWinner ? "4.5" : "2.5");
      path.setAttribute("fill", "none");
      if (e.isWinner) {
        path.classList.add("edge-flow-active");
      }
      path.setAttribute("marker-end", e.isWinner ? "url(#em-arrowhead-green)" : "url(#em-arrowhead)");
      mapSvg.appendChild(path);
    });

    // 2. Vẽ các nhãn trọng số bọc hộp nền trắng độc lập
    customEdges.forEach((e) => {
      const labelG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const boxW = e.isWinner ? 116 : 44;

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", e.lx - boxW / 2);
      rect.setAttribute("y", e.ly - 13);
      rect.setAttribute("width", boxW);
      rect.setAttribute("height", "25");
      rect.setAttribute("rx", "7");
      rect.setAttribute("fill", e.isWinner ? "#EFF8F5" : "#FFFFFF");
      rect.setAttribute("stroke", e.isWinner ? "#1E6F5C" : "#D6D1C7");
      rect.setAttribute("stroke-width", "1.5");
      labelG.appendChild(rect);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", e.lx);
      text.setAttribute("y", e.ly + 4);
      text.setAttribute("fill", e.isWinner ? "#114539" : "#3D3935");
      text.setAttribute("font-size", "13");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "middle");
      text.textContent = e.text;
      labelG.appendChild(text);

      mapSvg.appendChild(labelG);
    });

    // 3. Vẽ các đỉnh và tên địa điểm
    urbanNodes.forEach((n) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const isHospital = n.type === "hospital";

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", n.x);
      circle.setAttribute("cy", n.y);
      circle.setAttribute("r", isHospital ? "30" : "26");
      circle.setAttribute("fill", isHospital ? "#FCE4E8" : "#F0F7F9");
      circle.setAttribute("stroke", isHospital ? "#A61C3C" : "#0F4C5C");
      circle.setAttribute("stroke-width", "3.5");
      g.appendChild(circle);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", n.x);
      text.setAttribute("y", n.y + 5);
      text.setAttribute("fill", isHospital ? "#701026" : "#082D36");
      text.setAttribute("font-size", "14");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "middle");
      text.textContent = n.id;
      g.appendChild(text);

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", n.labelX);
      label.setAttribute("y", n.labelY);
      label.setAttribute("fill", "#181615");
      label.setAttribute("font-size", "13");
      label.setAttribute("font-weight", "700");
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("class", "svg-label-protected");
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
      btnEdge.className = "px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm transition-all cursor-pointer";
      btnMinpq.className = "px-3 py-1 rounded-lg text-xs font-bold bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer";
      codeEdge.classList.remove("hidden");
      codeMinpq.classList.add("hidden");
    } else {
      btnMinpq.className = "px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm transition-all cursor-pointer";
      btnEdge.className = "px-3 py-1 rounded-lg text-xs font-bold bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer";
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
      btnDijkstra.className = "px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm transition-all cursor-pointer";
      btnFloyd.className = "px-3 py-1 rounded-lg text-xs font-bold bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer";
      codeDijkstra.classList.remove("hidden");
      codeFloyd.classList.add("hidden");
    } else {
      btnFloyd.className = "px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all cursor-pointer";
      btnDijkstra.className = "px-3 py-1 rounded-lg text-xs font-bold bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer";
      codeFloyd.classList.remove("hidden");
      codeDijkstra.classList.add("hidden");
    }
  };
}