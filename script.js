/* ==========================================================================
   KIRTHI SABARI KUMAR - PORTFOLIO INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticleBackground();
  initCounters();
  initProjectFilters();
  initProjectModals();
  initCertificateModals();
  initNavbar();
});

/* --------------------------------------------------------------------------
   1. Floating Particle Canvas Background
   -------------------------------------------------------------------------- */
function initParticleBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 15), 80);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      color: Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(129, 140, 248, ',
      alpha: Math.random() * 0.5 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. Animated Counter Numbers
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.metric-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const duration = 1500; // ms
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target.toString();
              clearInterval(timer);
            } else {
              counter.textContent = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const metricsSection = document.querySelector('.profile-card');
  if (metricsSection) observer.observe(metricsSection);
}

/* --------------------------------------------------------------------------
   3. Projects Search and Category Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const searchInput = document.getElementById('project-search');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterProjects() {
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const keywords = card.getAttribute('data-keywords').toLowerCase();
      const title = card.querySelector('h3').textContent.toLowerCase();

      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = searchQuery === '' || keywords.includes(searchQuery) || title.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      filterProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterProjects();
    });
  }
}

/* --------------------------------------------------------------------------
   4. Project Detailed Case Study Modals (All 13 Projects)
   -------------------------------------------------------------------------- */
const projectsData = [
  {
    title: "Customer Churn Analysis Dashboard (Power BI)",
    category: "Power BI & Business Intelligence",
    badge: "Power BI Case Study",
    metrics: "26.86% overall churn rate; identified 38.46% churn rate among senior customers.",
    overview: "Analysed a dataset of 6,687 telecom customers (Databel) across 6 interactive report pages in Power BI to identify churn drivers and form actionable retention strategies.",
    details: [
      "Discovered competitor offers as the #1 churn driver (accounting for 44.82% of total churned customers).",
      "Identified senior customers (65+) as the highest-risk demographic with a 38.46% churn rate vs 26.86% baseline.",
      "Built star-schema data models and customized DAX measures for dynamic time-intelligence and demographic breakdown.",
      "Delivered strategic recommendations targeting high-churn customer segments to protect revenue."
    ],
    tools: ["Power BI", "DAX", "Data Modelling", "Segmentation Analysis", "Star Schema"]
  },
  {
    title: "Etsy Checkout Redesign A/B Test & Multi-Segment Launch Strategy",
    category: "Data Analysis & A/B Testing",
    badge: "A/B Testing & Experimentation Case Study",
    metrics: "31,000+ user sessions analyzed; +34.3% desktop conversion lift vs -23.0% mobile drop identified.",
    overview: "Analysed multi-device experiment logs (31K+ sessions) for Etsy's checkout redesign, executing statistical hypothesis testing, sample ratio mismatch (SRM) checks, and segment-specific revenue impact modeling.",
    details: [
      "Verified balanced treatment/control assignment using a Chi-Square goodness-of-fit test for Sample Ratio Mismatch (p = 0.421).",
      "Evaluated conversion rates, AOV, and revenue per user across desktop and mobile using proportion z-tests, Welch's t-tests, and Benjamini-Hochberg FDR corrections.",
      "Discovered a statistically significant +34.3% conversion lift on desktop, contrasted with a -23.0% conversion decline on mobile caused by payment form rendering friction.",
      "Formulated a multi-segment rollout strategy recommending an immediate desktop-only launch (+ $28,455/mo incremental revenue) while pausing mobile deployment to prevent a $42,000/mo loss."
    ],
    tools: ["Python", "Pandas", "NumPy", "SciPy", "Statsmodels", "A/B Testing", "Hypothesis Testing", "Seaborn"]
  },
  {
    title: "Cycle-Level Tool Condition Monitoring using Temporal Conv Autoencoder",
    category: "Deep Learning & Anomaly Detection",
    badge: "Deep Learning Paper",
    metrics: "97.64% cycle-level accuracy & 97.71% worn-cycle recall without labeled training data.",
    overview: "Developed an unsupervised deep learning framework to detect worn CNC milling tools from spindle-torque time-series data.",
    details: [
      "Trained a Temporal Convolutional Autoencoder on healthy spindle-torque data from two CNC machines.",
      "Evaluated model performance on an unseen third machine, proving cross-machine generalization.",
      "Applied reconstruction-error anomaly thresholds to flag tool wear early, eliminating the need for expensive worn-tool training labels.",
      "Prevents unexpected tool breakage, reduces scrap material rate, and enables predictive maintenance schedules."
    ],
    tools: ["Python", "PyTorch / TensorFlow", "Temporal Autoencoders", "Time-Series Anomaly Detection", "CNC Signal Processing"]
  },
  {
    title: "Non-Contact Heart Rate Prediction via Facial Video (rPPG)",
    category: "Computer Vision & Medical AI",
    badge: "Computer Vision System",
    metrics: "Real-time non-contact pulse extraction with noise reduction.",
    overview: "Engineered a non-contact heart rate monitoring system using standard webcam video feeds, facial landmark detection, and remote photoplethysmography (rPPG).",
    details: [
      "Used CNN-based face detection and facial landmark tracking to isolate the forehead and cheek ROI (Region of Interest).",
      "Extracted green-channel color intensity fluctuations caused by blood volume pulses.",
      "Applied Fast Fourier Transform (FFT) and Wavelet Denoising algorithms to eliminate motion artifacts.",
      "Provides a contact-free, non-invasive vital sign monitoring mechanism suitable for telemedicine."
    ],
    tools: ["Python", "OpenCV", "TensorFlow", "Signal Processing", "FFT", "Wavelet Denoising"]
  },
  {
    title: "Virtual Reality Fire Rescue Simulation - Offshore Oil Rig",
    category: "Virtual Reality & Safety Training",
    badge: "VR Simulation",
    metrics: "Optimized 3D interactive safety training environment for Oculus Quest 2.",
    overview: "Led a team to develop an immersive VR emergency response simulation in Unity designed for offshore oil rig personnel safety protocols.",
    details: [
      "Simulated real-time smoke propagation, fire hazards, and multi-path emergency evacuation procedures.",
      "Optimised high-poly 3D models and lighting pipelines to maintain 72+ FPS on standalone Oculus Quest 2 hardware.",
      "Integrated spatial audio cues and controller haptics to enhance emergency situational awareness."
    ],
    tools: ["Unity 3D", "C#", "Oculus SDK", "3D Modelling", "VR Simulation"]
  },
  {
    title: "Anti-Sleep Sensing & Auto-Parking System",
    category: "Computer Vision & Embedded IoT",
    badge: "Published Research Paper",
    metrics: "Published in TIJER International Journal (Impact Factor: 8.57).",
    overview: "Designed an active driver safety system combining real-time computer vision eye-closure detection with automatic microcontroller vehicle parking.",
    details: [
      "Trained YOLOv5 object detection and facial landmark models to detect driver eye closure and head tilt in real time.",
      "Interfaced computer vision alerts with microcontroller motor drivers to execute automated safe emergency parking.",
      "Published research paper in TIJER International Journal and presented at 6th IConIC Conference."
    ],
    tools: ["YOLOv5", "Python", "OpenCV", "Microcontrollers", "IoT", "Embedded C"]
  },
  {
    title: "Impact of Bonfire Night on Air Pollution Across Northern English Cities",
    category: "Data Analysis & Environmental EDA",
    badge: "Data Analysis & EDA",
    metrics: "5-6x PM2.5 pollution spike above baseline recorded during Bonfire Night.",
    overview: "Conducted spatial and time-series exploratory data analysis evaluating air quality metrics across major northern English cities during Bonfire Night celebrations.",
    details: [
      "Demonstrated that PM2.5 levels spiked sharply to 5-6 times above normal baseline concentrations.",
      "Proved through statistical modelling that event timing was a significantly stronger driver of pollution spikes than wind speed/direction alone.",
      "Helped regional environmental stakeholders understand firework-driven health risks and policy implications."
    ],
    tools: ["Data Analysis (EDA)", "Python", "Pandas", "Seaborn / Matplotlib", "Time-Series Analysis"]
  },
  {
    title: "Night-Time PM2.5 Patterns in 5 Northern English Cities (2017-2024)",
    category: "Data Analysis & Environmental Science",
    badge: "Data Analysis & EDA",
    metrics: "Uncovered persistent night-time PM2.5 exposure exceeding WHO safety guidelines across 8 years.",
    overview: "Produced a multi-city composite data visualization tracing nocturnal PM2.5 concentration patterns across five major Northern English cities between 2017 and 2024.",
    details: [
      "Extracted and cleaned multi-year air monitoring station data across 5 metropolitan regions.",
      "Revealed that nocturnal pollution exposure remained consistently above World Health Organization (WHO) annual safety targets.",
      "Identified clear inter-city exposure disparities where specific urban zones suffered disproportionate pollution burdens."
    ],
    tools: ["Exploratory Data Analysis", "Python", "Spatial Analytics", "Data Visualisation", "Trend Analysis"]
  },
  {
    title: "ICLR Big Data Analytics on Databricks (55,000+ Submissions)",
    category: "Big Data Analytics & PySpark",
    badge: "Databricks & PySpark",
    metrics: "Analyzed 55,906 papers spanning 2017-2024; calculated correlation r = 0.0435.",
    overview: "Conducted a large-scale PySpark data analysis on Databricks to investigate acceptance trends and long-term citation impact of ICLR conference submissions.",
    details: [
      "Discovered acceptance rates dropped from 50.1% in 2017 to 30.5% in 2024 due to exponentially increasing submission volume.",
      "Quantified correlation between initial peer-review scores and long-term citation impact (r = 0.0435), proving review scores alone do not reliably predict research longevity.",
      "Optimized PySpark transformations, aggregate queries, and visualization pipelines on distributed Databricks clusters."
    ],
    tools: ["PySpark", "Databricks", "Big Data Architecture", "Statistical Correlation", "Data Wrangling"]
  },
  {
    title: "easyJet Corporate Intelligence & Financial Recovery Report",
    category: "Corporate Intelligence & Financial Analysis",
    badge: "Financial Analysis",
    metrics: "Tracked revenue recovery from £1.458bn (FY21) to £10.106bn (FY25); profit from -£910m to +£696m.",
    overview: "Produced a comprehensive investor-grade financial intelligence report analyzing easyJet's post-pandemic financial trajectory.",
    details: [
      "Evaluated key performance metrics including yield per passenger, fleet capacity utilization, gearing ratios, and fuel hedging risks.",
      "Structured competitive benchmarking against low-cost carrier rivals in European airspace.",
      "Formulated clear capital allocation recommendations for financial stakeholders."
    ],
    tools: ["Financial Analytics", "Excel", "Market Share Analytics", "Corporate Valuation"]
  },
  {
    title: "DoorDash Food Delivery Time Prediction (XGBoost Regression)",
    category: "Machine Learning & Predictive Modeling",
    badge: "ML Predictive Model",
    metrics: "Achieved 3.23 min MAE — 63.3% error reduction over baseline across 8,000 historical orders.",
    overview: "Built a machine learning regression pipeline benchmarking XGBoost against Random Forest to predict order-to-door delivery duration from features available at order placement.",
    details: [
      "Evaluated 8,000 historical food delivery orders using 5-fold cross-validation; selected XGBoost after achieving 3.23 min MAE (0.11 std dev) vs baseline.",
      "Engineered domain features including prep-time-distance workload, travel-to-prep ratio, subtotal per item, rush-hour flags, and weather interactions.",
      "Combined prep-time and distance feature alone accounted for 54.1% of model feature importance.",
      "Diagnosed major residual bottlenecks during severe weather bike/scooter deliveries and weekend kitchen over-capacity."
    ],
    tools: ["Python", "XGBoost", "Random Forest", "Scikit-Learn", "Feature Engineering", "Cross-Validation"]
  },
  {
    title: "Housing Price Prediction in KNIME",
    category: "Predictive Analytics & Pipeline Automation",
    badge: "KNIME Workflow",
    metrics: "Achieved R² = 0.781, MAE = $19,866, RMSE = $35,423 on holdout dataset.",
    overview: "Built a codeless, modular machine learning pipeline in KNIME Analytics Platform to predict residential housing prices on the Ames dataset.",
    details: [
      "Preprocessed messy feature columns, handled missing values, and encoded categorical attributes.",
      "Compared multiple regression algorithms (Linear Regression, Random Forest, Gradient Boosted Trees).",
      "Gradient Boosted Trees yielded top performance; identified overall quality (`OverallQual`) and ground living area (`GrLivArea`) as primary drivers."
    ],
    tools: ["KNIME", "Gradient Boosted Trees", "Regression Pipelines", "Feature Engineering"]
  },
  {
    title: "Enhancing Cognitive Memory in Senior Citizens Using VR",
    category: "Virtual Reality & HCI Healthcare",
    badge: "VR Simulation App",
    metrics: "Improved user MoCA scores from 22.5 to 25.3 (+30% memory recall).",
    overview: "Developed a virtual reality cognitive training game in Unity aimed at stimulating executive memory function and spatial reasoning in elderly users.",
    details: [
      "Built interactive 3D environments featuring classic cognitive puzzles (e.g. Tower of Hanoi, pattern matching).",
      "Conducted usability testing resulting in 25% faster puzzle completion times and 92% user satisfaction.",
      "Demonstrated quantifiable MoCA score improvements from 22.5 (mild impairment) to 25.3 (normal cognitive range)."
    ],
    tools: ["Unity 3D", "C#", "Oculus SDK", "HCI Usability Testing", "3D Modelling"]
  }
];

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const viewBtns = document.querySelectorAll('.view-details-btn');

  if (!modal || !modalBody || !modalClose) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(btn.getAttribute('data-project'));
      const data = projectsData[index];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="modal-header-badge">${data.badge}</span>
        <h2 class="modal-title">${data.title}</h2>
        
        <div class="modal-section">
          <h4><i class="fa-solid fa-bullseye"></i> Key Result / Metric</h4>
          <div class="project-key-metric" style="font-size: 0.95rem; padding: 0.8rem;">
            ${data.metrics}
          </div>
        </div>

        <div class="modal-section">
          <h4><i class="fa-solid fa-file-lines"></i> Project Overview</h4>
          <p>${data.overview}</p>
        </div>

        <div class="modal-section">
          <h4><i class="fa-solid fa-list-check"></i> Key Implementation Highlights</h4>
          <ul>
            ${data.details.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-section">
          <h4><i class="fa-solid fa-layer-group"></i> Technologies & Tools Used</h4>
          <div class="project-tech-stack">
            ${data.tools.map(tool => `<span class="chip"><i class="fa-solid fa-check"></i> ${tool}</span>`).join('')}
          </div>
        </div>
      `;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Certificate & Copyright Image Modals
   -------------------------------------------------------------------------- */
function initCertificateModals() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const clickableCards = document.querySelectorAll('.clickable-card');

  if (!modal || !modalBody) return;

  clickableCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-cert-title');
      const issuer = card.getAttribute('data-cert-issuer');
      const imgSrc = card.getAttribute('data-cert-img');
      const pdfSrc = card.getAttribute('data-cert-pdf');

      if (!title || !imgSrc) return;

      modalBody.innerHTML = `
        <span class="modal-header-badge"><i class="fa-solid fa-shield-check"></i> Verified Document</span>
        <h2 class="modal-title">${title}</h2>
        <p style="color: var(--accent-cyan); font-weight: 500; margin-bottom: 1.2rem;">${issuer}</p>

        <div class="cert-image-container">
          <img src="${imgSrc}" alt="${title}" class="cert-modal-img" />
        </div>

        <div class="modal-actions" style="margin-top: 1.5rem; text-align: center;">
          <a href="${pdfSrc || imgSrc}" target="_blank" download class="btn btn-primary">
            <i class="fa-solid fa-file-pdf"></i> Download Official Document
          </a>
        </div>
      `;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   6. Navbar Scroll & Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   7. Copy to Clipboard Function
   -------------------------------------------------------------------------- */
window.copyToClipboard = function(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalIcon = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check" style="color: #34d399;"></i>';
    setTimeout(() => {
      btnElement.innerHTML = originalIcon;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
};

/* --------------------------------------------------------------------------
   8. Contact Form Submission Handler
   -------------------------------------------------------------------------- */
window.handleFormSubmit = function(e) {
  e.preventDefault();
  const nameEl = document.getElementById('form-name');
  const emailEl = document.getElementById('form-email');
  const subjectEl = document.getElementById('form-subject');
  const messageEl = document.getElementById('form-message');
  const status = document.getElementById('form-status');

  const name = nameEl ? nameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const subject = subjectEl ? subjectEl.value.trim() : 'Data Analyst Opportunity / Inquiry';
  const message = messageEl ? messageEl.value.trim() : '';

  if (!name || !email || !message) {
    if (status) {
      status.className = 'form-status error';
      status.textContent = 'Please fill out all required fields before sending.';
    }
    return;
  }

  // Construct mailto URL to send email directly to Kirthi Sabari
  const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject}`);
  const mailtoBody = encodeURIComponent(`Hello Kirthi,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via Portfolio Contact Form`);
  const mailtoUrl = `mailto:kirthisabari561@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  // Trigger default email client launch
  window.location.href = mailtoUrl;

  if (status) {
    status.className = 'form-status success';
    status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Opening your email client to send the message to <strong>kirthisabari561@gmail.com</strong>.<br><span style="font-size:0.82rem; opacity:0.85;">If your mail app didn't open automatically, <a href="${mailtoUrl}" style="color: var(--accent-cyan); text-decoration: underline;">click here to launch email directly</a>.</span>`;
  }

  const form = document.getElementById('contact-form');
  if (form) form.reset();
};
