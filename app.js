/* ============================================
   JUNIOR PORTFOLIO DASHBOARD — Application
   ============================================ */

(function () {
  "use strict";

  /* ------------------------------------------
     DATA
  ------------------------------------------ */
  const HOLDINGS = [
    {
      ticker: "KFAFIX-A", name: "Krungsri Active Fixed Income Fund-A", sleeve: "Fixed Income", type: "Onshore, Thai Mutual Fund",
      target: 0.20, amount: 200000, returns: 0.025, expense: 0.005, maxDD: -0.0173,
      geo: { Thailand: 80, Qatar: 12.3, "United States": 3.3, "United Kingdom": 2.3, "Hong Kong": 1.5, Singapore: 1 },
      sector: { "Corporates": 46, "Financial Institutions": 24, "Bank of Thailand": 16, "Sovereign": 14 },
      dollarImpact: "Neutral", dollarExplain: "THB hedged; minimal USD exposure",
      pros: ["Strong outperformance vs benchmark", "Low fees 0.41%", "Active management with low volatility", "Diversified fixed income"],
      cons: ["Interest rate risk", "Credit risk from corporates", "Limited upside in low-yield environment", "Small unhedged FX exposure"]
    },
    {
      ticker: "K-APB-A(A)", name: "Kasikorn Asia Pacific Bond Fund-A", sleeve: "Fixed Income", type: "Onshore, Thai Mutual Fund",
      target: 0.10, amount: 100000, returns: 0.05, expense: 0.013, maxDD: -0.3606,
      geo: { India: 18, "Hong Kong": 11.7, Japan: 10.8, China: 10, "Saudi Arabia": 8.6, "Other Asia": 41 },
      sector: { "BBB Bonds": 46, "Below BBB": 40, "AA/A Bonds": 14 },
      dollarImpact: "Slightly Negative", dollarExplain: "75%+ hedged, residual USD exposure on hard-currency bonds",
      pros: ["Asia-Pacific hard-currency bond exposure", "Active management by Lombard Odier", "FX hedging 88–92%", "Competitive cost for active foreign bond fund"],
      cons: ["~40% below investment grade", "Massive -36% max drawdown", "Underperformed benchmark over 5Y", "Residual FX risk"]
    },
    {
      ticker: "CSPX", name: "iShares Core S&P 500 UCITS ETF", sleeve: "Equities", type: "Offshore, UCITS ETF",
      target: 0.16, amount: 160000, returns: 0.10, expense: 0.0007, maxDD: -0.3365,
      geo: { "United States": 100 },
      sector: { Technology: 33.3, Financials: 12.2, "Comm Services": 10.6, "Consumer Cyclical": 10, "Healthcare": 9.7, "Other": 24.2 },
      dollarImpact: "Negative", dollarExplain: "100% US exposure; THB investor loses when USD weakens",
      pros: ["Ultra-low cost 0.07%", "Broad 500-stock diversification", "Massive $136B AUM", "Strong 5Y 14% annualized"],
      cons: ["100% US exposure", "Tech-heavy 33%", "Vulnerable to US recessions", "USD FX risk for THB investor"]
    },
    {
      ticker: "TDIV", name: "VanEck Morningstar Dev. Mkts Dividend Leaders", sleeve: "Equities", type: "Offshore, UCITS ETF",
      target: 0.16, amount: 160000, returns: 0.11, expense: 0.0038, maxDD: -0.3606,
      geo: { "United States": 24, "United Kingdom": 11, Switzerland: 10, France: 10, Germany: 7, Japan: 7, Australia: 7, Canada: 6, "Other": 18 },
      sector: { Financials: 33, Energy: 17, "Healthcare": 13, "Consumer Staples": 9, "Other": 28 },
      dollarImpact: "Positive", dollarExplain: "76% non-US holdings benefit from weak USD translation",
      pros: ["High sustainable 3% dividend yield", "Strong 20% annualized 5Y", "Low cost 0.38%", "Diversified developed markets"],
      cons: ["-36% max drawdown", "Currency risk unhedged", "Financials heavy 33%", "Potential dividend cuts in downturns"]
    },
    {
      ticker: "VAPX", name: "Vanguard FTSE Dev. Asia Pacific ex Japan", sleeve: "Equities", type: "Offshore, UCITS ETF",
      target: 0.10, amount: 100000, returns: 0.08, expense: 0.0015, maxDD: -0.3777,
      geo: { Australia: 37.9, "South Korea": 36.7, "Hong Kong": 10.9, Singapore: 8.2, "Other": 6.3 },
      sector: { Financials: 28, Technology: 21, Industrials: 11, Materials: 10, "Other": 30 },
      dollarImpact: "Positive", dollarExplain: "AUD/KRW appreciate when USD weakens",
      pros: ["Ultra-low cost 0.15%", "373 holdings diversification", "Strong recent performance", "2.3–3.3% dividend yield"],
      cons: ["High volatility 21%", "Currency risk unhedged", "Australia/Korea concentration", "Lower risk-adjusted returns"]
    },
    {
      ticker: "DXJ", name: "WisdomTree Japan Hedged Equity ETF", sleeve: "Equities", type: "Offshore, US ETF",
      target: 0.07, amount: 70000, returns: 0.10, expense: 0.0048, maxDD: -0.45,
      geo: { Japan: 100 },
      sector: { Industrials: 25, "Consumer Disc": 19, Financials: 17, Technology: 10, Materials: 9, "Other": 20 },
      dollarImpact: "Neutral", dollarExplain: "JPY hedged to USD; currency-neutral exposure",
      pros: ["Outstanding 5Y 27.7% annualized", "Currency hedge removes yen risk", "Exporter tilt benefits", "Low correlation to S&P 500"],
      cons: ["Higher 0.48% expense", "Hedging drag when yen strengthens", "Cyclical sector concentration", "-45% max drawdown"]
    },
    {
      ticker: "EMXC", name: "iShares MSCI EM ex China ETF", sleeve: "Equities", type: "Offshore, US ETF",
      target: 0.06, amount: 60000, returns: 0.10, expense: 0.0025, maxDD: -0.45,
      geo: { Taiwan: 28, India: 21, "South Korea": 18, Brazil: 6, "South Africa": 5, "Saudi Arabia": 4, "Other": 18 },
      sector: { Technology: 36, Financials: 24, Materials: 8, Industrials: 8, "Consumer Disc": 6, "Other": 18 },
      dollarImpact: "Positive", dollarExplain: "Weak USD drives capital flows to higher-yield EM",
      pros: ["Strong 3Y 18% return", "Low cost 0.25%", "642 holdings diversification", "Avoids China regulatory risk"],
      cons: ["EM volatility", "-45% max drawdown", "TSM concentration 17%", "Political/currency risks"]
    },
    {
      ticker: "HGER", name: "Harbor Commodity All-Weather Strategy", sleeve: "Alternatives", type: "Offshore, US ETF",
      target: 0.05, amount: 50000, returns: 0.08, expense: 0.0068, maxDD: -0.2331,
      geo: { Global: 100 },
      sector: { "Precious Metals": 34.6, "Refined Products": 25.4, "Base Metals": 8.2, Agriculture: 14.4, "Crude Oil": 6.6, "Other Commodities": 10.8 },
      dollarImpact: "Positive", dollarExplain: "Commodities rise when USD weakens",
      pros: ["Strong outperformance vs Bloomberg Commodity Index", "Inflation hedge", "Low equity correlation", "35% gold tilt"],
      cons: ["Commodity volatility", "Contango/roll yield losses", "Limited track record since 2022", "Higher expense 0.68%"]
    },
    {
      ticker: "IGF", name: "iShares Global Infrastructure ETF", sleeve: "Alternatives", type: "Offshore, US ETF",
      target: 0.05, amount: 50000, returns: 0.09, expense: 0.0039, maxDD: -0.5833,
      geo: { "United States": 39, Australia: 9, Spain: 9, Mexico: 8, Canada: 7, France: 6, China: 5, "Other": 17 },
      sector: { "Transportation": 41, Utilities: 40, Energy: 18, "Other": 1 },
      dollarImpact: "Positive", dollarExplain: "60% non-US holdings benefit from weak USD",
      pros: ["Stable infrastructure assets", "Inflation hedging", "3% dividend yield", "Global diversification"],
      cons: ["Worst max drawdown -58%", "Interest rate sensitivity", "Sector concentration", "Geopolitical risk in EM holdings"]
    },
    {
      ticker: "DBMF", name: "iMGP DBi Managed Futures Strategy", sleeve: "Hedges", type: "Offshore, US ETF",
      target: 0.05, amount: 50000, returns: 0.07, expense: 0.0085, maxDD: 0.204,
      geo: { Global: 100 },
      sector: { "Fixed Income Futures": 45, Currencies: 40, Equities: 10, Commodities: 5 },
      dollarImpact: "Positive", dollarExplain: "Long commodities and EUR when USD weakens; trend-following adapts",
      pros: ["Near-zero correlation to stocks (-0.09)", "Crisis alpha (+31% in 2022)", "CTA replication at 0.85% vs hedge fund 2/20", "Trend capture long/short"],
      cons: ["Struggles in choppy markets", "Leverage risk", "Higher 0.85% expense", "Non-diversified structure"]
    }
  ];

  const SLEEVE_COLORS = {
    "Fixed Income": "#20808D",
    "Equities": "#2d7ec7",
    "Alternatives": "#c49a2a",
    "Hedges": "#7c5cbf"
  };

  const SLEEVE_ORDER = ["Fixed Income", "Equities", "Alternatives", "Hedges"];

  const CHART_COLORS = [
    "#20808D", "#437a22", "#A84B2F", "#7c5cbf", "#c49a2a",
    "#2d7ec7", "#c75a8a", "#5ca3a8", "#a86b32", "#6b8fa3",
    "#8b6bbf", "#4a9e6b", "#d4774b", "#5b8fb8", "#b8954a"
  ];

  /* Approximate correlation matrix for the 10 holdings */
  const CORRELATION = [
    [1.00, 0.65, 0.10, 0.15, 0.12, 0.08, 0.10, -0.05, 0.20, -0.15],
    [0.65, 1.00, 0.25, 0.30, 0.35, 0.20, 0.40, 0.10, 0.30, -0.10],
    [0.10, 0.25, 1.00, 0.70, 0.55, 0.40, 0.65, 0.30, 0.50, -0.09],
    [0.15, 0.30, 0.70, 1.00, 0.60, 0.45, 0.55, 0.35, 0.55, -0.05],
    [0.12, 0.35, 0.55, 0.60, 1.00, 0.50, 0.70, 0.25, 0.45, -0.08],
    [0.08, 0.20, 0.40, 0.45, 0.50, 1.00, 0.45, 0.20, 0.35, -0.10],
    [0.10, 0.40, 0.65, 0.55, 0.70, 0.45, 1.00, 0.30, 0.40, -0.05],
    [-0.05, 0.10, 0.30, 0.35, 0.25, 0.20, 0.30, 1.00, 0.40, 0.15],
    [0.20, 0.30, 0.50, 0.55, 0.45, 0.35, 0.40, 0.40, 1.00, 0.00],
    [-0.15, -0.10, -0.09, -0.05, -0.08, -0.10, -0.05, 0.15, 0.00, 1.00]
  ];

  const REGION_MAP = {
    "United States": "North America", Canada: "North America", Mexico: "Latin America",
    Brazil: "Latin America",
    "United Kingdom": "Europe", Switzerland: "Europe", France: "Europe", Germany: "Europe",
    Spain: "Europe",
    Japan: "Asia-Pacific Developed", Australia: "Asia-Pacific Developed", "South Korea": "Asia-Pacific Developed",
    "Hong Kong": "Asia-Pacific Developed", Singapore: "Asia-Pacific Developed",
    Taiwan: "Asia-Pacific Developed",
    India: "Emerging Markets", China: "Emerging Markets", "South Africa": "Emerging Markets",
    Thailand: "Asia-Pacific Developed",
    Qatar: "Middle East", "Saudi Arabia": "Middle East",
    Global: "Global/Other", "Other": "Global/Other", "Other Asia": "Emerging Markets",
    "Other Commodities": "Global/Other"
  };

  /* Chart.js global config */
  Chart.defaults.color = "#8b949e";
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 11;
  Chart.defaults.plugins.legend.labels.padding = 12;
  Chart.defaults.plugins.legend.labels.boxWidth = 12;
  Chart.defaults.plugins.legend.labels.boxHeight = 12;
  Chart.defaults.plugins.tooltip.backgroundColor = "#22272e";
  Chart.defaults.plugins.tooltip.borderColor = "rgba(139,148,158,0.2)";
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.titleFont = { weight: "600", size: 12 };
  Chart.defaults.plugins.tooltip.bodyFont = { size: 11 };
  Chart.defaults.scale.grid.color = "rgba(139,148,158,0.08)";

  let charts = {};
  let currentInvestment = 1000000;

  /* ------------------------------------------
     UTILITY FUNCTIONS
  ------------------------------------------ */
  function fmt(n, decimals) {
    if (decimals === undefined) { decimals = 2; }
    return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  function fmtPct(n) {
    return (n * 100).toFixed(2) + "%";
  }

  function fmtPctRaw(n) {
    return n.toFixed(2) + "%";
  }

  function getSleeveData() {
    var data = {};
    HOLDINGS.forEach(function (h) {
      if (!data[h.sleeve]) { data[h.sleeve] = 0; }
      data[h.sleeve] += h.target;
    });
    return data;
  }

  function computeWeightedReturn() {
    var total = 0;
    HOLDINGS.forEach(function (h) {
      total += h.target * h.returns;
    });
    return total;
  }

  function computeWeightedExpense() {
    var total = 0;
    HOLDINGS.forEach(function (h) {
      total += h.target * h.expense;
    });
    return total;
  }

  function computeWeightedMaxDD() {
    var total = 0;
    HOLDINGS.forEach(function (h) {
      total += h.target * h.maxDD;
    });
    return total;
  }

  function computeGeoWeights() {
    var geo = {};
    HOLDINGS.forEach(function (h) {
      var keys = Object.keys(h.geo);
      keys.forEach(function (country) {
        if (!geo[country]) { geo[country] = 0; }
        geo[country] += (h.target * h.geo[country]) / 100;
      });
    });
    /* Convert to percentage */
    var result = {};
    var keys = Object.keys(geo);
    keys.forEach(function (k) {
      result[k] = geo[k] * 100;
    });
    return result;
  }

  function computeSectorWeights() {
    var sectors = {};
    HOLDINGS.forEach(function (h) {
      var keys = Object.keys(h.sector);
      keys.forEach(function (s) {
        if (!sectors[s]) { sectors[s] = 0; }
        sectors[s] += (h.target * h.sector[s]) / 100;
      });
    });
    var result = {};
    var keys = Object.keys(sectors);
    keys.forEach(function (k) {
      result[k] = sectors[k] * 100;
    });
    return result;
  }

  function computeRegionalBreakdown(geoWeights) {
    var regions = {};
    var keys = Object.keys(geoWeights);
    keys.forEach(function (country) {
      var region = REGION_MAP[country] || "Global/Other";
      if (!regions[region]) { regions[region] = 0; }
      regions[region] += geoWeights[country];
    });
    return regions;
  }

  function sortObj(obj, ascending) {
    var entries = Object.entries(obj);
    entries.sort(function (a, b) {
      return ascending ? a[1] - b[1] : b[1] - a[1];
    });
    return entries;
  }

  /* ------------------------------------------
     NAVIGATION
  ------------------------------------------ */
  function initNavigation() {
    var btns = document.querySelectorAll(".nav-btn");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tab = btn.getAttribute("data-tab");
        window.location.hash = tab;
        switchTab(tab);
      });
    });
  }

  var tabInitialized = { overview: true, geography: false, sectors: false, diversification: false, proscons: false, compounding: false };

  function initTab(tabId) {
    if (tabInitialized[tabId]) { return; }
    tabInitialized[tabId] = true;
    switch (tabId) {
      case "geography": renderGeoCharts(); break;
      case "sectors": renderSectorCharts(); break;
      case "diversification": renderCorrelationMatrix(); renderDiversificationScore(); renderRiskMetrics(); renderDollarTable(); break;
      case "proscons": renderProsConsCards(); break;
      case "compounding": renderCompounding(); initCompoundingInput(); break;
    }
  }

  function switchTab(tabId) {
    document.querySelectorAll(".nav-btn").forEach(function (b) {
      b.classList.remove("active");
      b.removeAttribute("aria-current");
    });
    document.querySelector("[data-tab=\"" + tabId + "\"]").classList.add("active");
    document.querySelector("[data-tab=\"" + tabId + "\"]").setAttribute("aria-current", "page");

    document.querySelectorAll(".tab-content").forEach(function (t) {
      t.classList.remove("active");
    });
    document.getElementById("tab-" + tabId).classList.add("active");

    /* Lazy-init charts on first view */
    initTab(tabId);

    /* Scroll main to top */
    document.querySelector(".main").scrollTop = 0;

    /* Resize charts after tab switch (Chart.js needs this) */
    setTimeout(function () {
      Object.keys(charts).forEach(function (k) {
        if (charts[k] && typeof charts[k].resize === "function") { charts[k].resize(); }
      });
    }, 100);
    setTimeout(function () {
      Object.keys(charts).forEach(function (k) {
        if (charts[k] && typeof charts[k].resize === "function") { charts[k].resize(); }
      });
    }, 300);
  }

  /* ------------------------------------------
     TAB 1: OVERVIEW
  ------------------------------------------ */
  function renderKPIs() {
    var grid = document.getElementById("kpi-grid");
    var weightedReturn = computeWeightedReturn();
    var weightedExpense = computeWeightedExpense();
    var weightedDD = computeWeightedMaxDD();
    var scaledInvestment = currentInvestment;

    var kpis = [
      { label: "Total Investment", value: "฿" + fmt(scaledInvestment, 0), sub: "THB", cls: "" },
      { label: "Weighted Return", value: fmtPct(weightedReturn), sub: "Annual expected", cls: "positive" },
      { label: "Weighted Expense", value: fmtPct(weightedExpense), sub: "Annual cost", cls: "" },
      { label: "Wtd. Max Drawdown", value: fmtPct(weightedDD), sub: "Historical worst", cls: "negative" },
      { label: "Blended Growth", value: "฿" + fmt(scaledInvestment * (1 + weightedReturn), 0), sub: "Year 1 expected", cls: "positive" }
    ];

    grid.innerHTML = kpis.map(function (k) {
      return "<div class=\"kpi-card\">" +
        "<span class=\"kpi-label\">" + k.label + "</span>" +
        "<span class=\"kpi-value " + k.cls + "\">" + k.value + "</span>" +
        "<span class=\"kpi-sub\">" + k.sub + "</span>" +
        "</div>";
    }).join("");
  }

  function renderSleeveDonut() {
    var ctx = document.getElementById("chart-sleeve-donut").getContext("2d");
    var data = getSleeveData();

    if (charts.sleeveDonut) { charts.sleeveDonut.destroy(); }
    charts.sleeveDonut = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: SLEEVE_ORDER,
        datasets: [{
          data: SLEEVE_ORDER.map(function (s) { return +(data[s] * 100).toFixed(1); }),
          backgroundColor: SLEEVE_ORDER.map(function (s) { return SLEEVE_COLORS[s]; }),
          borderColor: "#161b22",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: function (ctx2) { return ctx2.label + ": " + ctx2.raw + "%"; }
            }
          }
        }
      }
    });
  }

  function renderHoldingsBar() {
    var canvas = document.getElementById("chart-holdings-bar");
    var ctx = canvas.getContext("2d");
    var sorted = HOLDINGS.slice().sort(function (a, b) { return a.returns - b.returns; });

    var colors = [
      "#20808D", "#20808D", "#c49a2a", "#c49a2a",
      "#2d7ec7", "#2d7ec7", "#2d7ec7",
      "#2d7ec7", "#2d7ec7", "#7c5cbf"
    ];
    var bgColors = sorted.map(function (h) {
      switch (h.sleeve) {
        case "Fixed Income": return "rgba(32, 128, 141, 0.85)";
        case "Equities": return "rgba(45, 126, 199, 0.85)";
        case "Alternatives": return "rgba(196, 154, 42, 0.85)";
        case "Hedges": return "rgba(124, 92, 191, 0.85)";
        default: return "rgba(139, 148, 158, 0.85)";
      }
    });

    if (charts.holdingsBar) { charts.holdingsBar.destroy(); }
    charts.holdingsBar = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sorted.map(function (h) { return h.ticker; }),
        datasets: [{
          data: sorted.map(function (h) { return Math.round(h.returns * 10000) / 100; }),
          backgroundColor: bgColors,
          borderColor: bgColors.map(function (c) { return c.replace("0.85", "1"); }),
          borderWidth: 1,
          borderRadius: 3,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: function (items) { return items[0].label; },
              label: function (item) { return "Return: " + item.raw + "%"; }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            min: 0,
            max: 13,
            ticks: {
              callback: function (v) { return v + "%"; },
              stepSize: 2
            },
            grid: { color: "rgba(139,148,158,0.08)" }
          },
          y: {
            grid: { display: false },
            ticks: {
              color: "#8b949e",
              font: { size: 11, family: "'Inter', sans-serif" }
            }
          }
        }
      }
    });
  }

  function renderHoldingsTable() {
    var tbody = document.getElementById("holdings-tbody");
    var scale = currentInvestment / 1000000;
    tbody.innerHTML = HOLDINGS.map(function (h) {
      var ddVal = h.maxDD;
      var ddClass = ddVal > 0 ? "positive" : "negative";
      var retClass = h.returns > 0 ? "positive" : "negative";
      return "<tr>" +
        "<td><strong>" + h.ticker + "</strong></td>" +
        "<td>" + h.name + "</td>" +
        "<td><span class=\"tag tag--neutral\">" + h.sleeve + "</span></td>" +
        "<td class=\"num\">" + fmtPctRaw(h.target * 100) + "</td>" +
        "<td class=\"num\">฿" + fmt(h.amount * scale, 0) + "</td>" +
        "<td class=\"num " + retClass + "\">" + fmtPct(h.returns) + "</td>" +
        "<td class=\"num\">" + fmtPct(h.expense) + "</td>" +
        "<td class=\"num " + ddClass + "\">" + fmtPct(ddVal) + "</td>" +
        "</tr>";
    }).join("");
  }

  /* Table sorting */
  function initTableSort() {
    var table = document.getElementById("holdings-table");
    if (!table) { return; }
    var headers = table.querySelectorAll("th[data-sort]");
    headers.forEach(function (th) {
      th.addEventListener("click", function () {
        var field = th.getAttribute("data-sort");
        var asc = th.classList.contains("sort-asc");
        headers.forEach(function (h2) { h2.classList.remove("sort-asc", "sort-desc"); });
        th.classList.add(asc ? "sort-desc" : "sort-asc");

        HOLDINGS.sort(function (a, b) {
          var va, vb;
          switch (field) {
            case "ticker": va = a.ticker; vb = b.ticker; break;
            case "name": va = a.name; vb = b.name; break;
            case "sleeve": va = a.sleeve; vb = b.sleeve; break;
            case "target": va = a.target; vb = b.target; break;
            case "amount": va = a.amount; vb = b.amount; break;
            case "returns": va = a.returns; vb = b.returns; break;
            case "expense": va = a.expense; vb = b.expense; break;
            case "maxdd": va = a.maxDD; vb = b.maxDD; break;
            default: va = 0; vb = 0;
          }
          if (typeof va === "string") {
            return asc ? vb.localeCompare(va) : va.localeCompare(vb);
          }
          return asc ? va - vb : vb - va;
        });

        renderHoldingsTable();
      });
    });
  }

  /* ------------------------------------------
     TAB 2: GEOGRAPHY
  ------------------------------------------ */
  function renderGeoCharts() {
    var geoWeights = computeGeoWeights();
    var sorted = sortObj(geoWeights, false);
    var top15 = sorted.slice(0, 15);

    /* Horizontal bar */
    var ctx = document.getElementById("chart-geo-bar").getContext("2d");
    if (charts.geoBar) { charts.geoBar.destroy(); }
    charts.geoBar = new Chart(ctx, {
      type: "bar",
      data: {
        labels: top15.map(function (e) { return e[0]; }),
        datasets: [{
          label: "Portfolio Exposure",
          data: top15.map(function (e) { return +e[1].toFixed(2); }),
          backgroundColor: top15.map(function (_, i) { return CHART_COLORS[i % CHART_COLORS.length]; }),
          borderColor: top15.map(function (_, i) { return CHART_COLORS[i % CHART_COLORS.length]; }),
          borderWidth: 1,
          borderRadius: 3,
          borderSkipped: false,
          minBarLength: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: function (ctx2) { return ctx2.raw + "%"; } }
          }
        },
        scales: {
          x: {
            beginAtZero: true, min: 0,
            ticks: { callback: function (v) { return v + "%"; } },
            grid: { color: "rgba(139,148,158,0.06)" }
          },
          y: { grid: { display: false } }
        }
      }
    });

    /* Regional donut */
    var regions = computeRegionalBreakdown(geoWeights);
    var regionSorted = sortObj(regions, false);

    var ctx2 = document.getElementById("chart-region-donut").getContext("2d");
    if (charts.regionDonut) { charts.regionDonut.destroy(); }
    charts.regionDonut = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: regionSorted.map(function (e) { return e[0]; }),
        datasets: [{
          data: regionSorted.map(function (e) { return +e[1].toFixed(2); }),
          backgroundColor: regionSorted.map(function (_, i) { return CHART_COLORS[i % CHART_COLORS.length]; }),
          borderColor: "#161b22",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: { label: function (ctx3) { return ctx3.label + ": " + ctx3.raw + "%"; } }
          }
        }
      }
    });

    /* Geo table */
    var tbody = document.getElementById("geo-tbody");
    tbody.innerHTML = sorted.map(function (entry) {
      var country = entry[0];
      var pct = entry[1];
      /* Find contributors */
      var contributors = [];
      HOLDINGS.forEach(function (h) {
        if (h.geo[country]) {
          var contrib = (h.target * h.geo[country] / 100) * 100;
          if (contrib >= 0.1) {
            contributors.push(h.ticker + " (" + contrib.toFixed(1) + "%)");
          }
        }
      });
      return "<tr>" +
        "<td><strong>" + country + "</strong></td>" +
        "<td class=\"num\">" + pct.toFixed(2) + "%</td>" +
        "<td>" + contributors.join(", ") + "</td>" +
        "</tr>";
    }).join("");
  }

  /* ------------------------------------------
     TAB 3: SECTORS
  ------------------------------------------ */
  function renderSectorCharts() {
    var sectorWeights = computeSectorWeights();
    var sorted = sortObj(sectorWeights, false);

    /* Only show top 12 sectors in bar chart, aggregate rest into "Other (Remaining)" */
    var barSorted = sorted.slice(0, 12);
    var remaining = 0;
    sorted.slice(12).forEach(function (e) { remaining += e[1]; });
    if (remaining > 0) {
      barSorted.push(["Other (Small)", +remaining.toFixed(2)]);
    }

    /* Bar chart */
    var ctx = document.getElementById("chart-sector-bar").getContext("2d");
    if (charts.sectorBar) { charts.sectorBar.destroy(); }
    charts.sectorBar = new Chart(ctx, {
      type: "bar",
      data: {
        labels: barSorted.map(function (e) { return e[0]; }),
        datasets: [{
          label: "Sector Weight",
          data: barSorted.map(function (e) { return +e[1].toFixed(2); }),
          backgroundColor: barSorted.map(function (e) {
            return e[1] > 20 ? "rgba(196, 154, 42, 0.85)" : "rgba(32, 128, 141, 0.85)";
          }),
          borderColor: barSorted.map(function (e) {
            return e[1] > 20 ? "#c49a2a" : "#20808D";
          }),
          borderWidth: 1,
          borderRadius: 3,
          borderSkipped: false,
          minBarLength: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function (ctx2) { return ctx2.raw + "%"; } } }
        },
        scales: {
          x: {
            beginAtZero: true, min: 0,
            ticks: { callback: function (v) { return v + "%"; } },
            grid: { color: "rgba(139,148,158,0.06)" }
          },
          y: { grid: { display: false } }
        }
      }
    });

    /* Alerts */
    var alerts = document.getElementById("sector-alerts");
    var html = "";
    sorted.forEach(function (e) {
      if (e[1] > 20) {
        html += "<div class=\"alert alert--warn\">" +
          "<span class=\"alert-icon\">&#9888;</span>" +
          "<span><strong>" + e[0] + "</strong> at " + e[1].toFixed(1) + "% exceeds 20% concentration threshold</span>" +
          "</div>";
      }
    });
    if (!html) {
      html = "<div class=\"alert alert--ok\"><span class=\"alert-icon\">&#10003;</span><span>No sector exceeds 20% concentration</span></div>";
    }
    alerts.innerHTML = html;

    /* Top 5 donut */
    var top5 = sorted.slice(0, 5);
    var otherVal = 0;
    sorted.slice(5).forEach(function (e) { otherVal += e[1]; });
    var labels = top5.map(function (e) { return e[0]; });
    var data = top5.map(function (e) { return +e[1].toFixed(2); });
    if (otherVal > 0) {
      labels.push("Other");
      data.push(+otherVal.toFixed(2));
    }

    var ctx2 = document.getElementById("chart-sector-donut").getContext("2d");
    if (charts.sectorDonut) { charts.sectorDonut.destroy(); }
    charts.sectorDonut = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: labels.map(function (_, i) { return CHART_COLORS[i % CHART_COLORS.length]; }),
          borderColor: "#161b22",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
        plugins: {
          legend: { position: "bottom" },
          tooltip: { callbacks: { label: function (ctx3) { return ctx3.label + ": " + ctx3.raw + "%"; } } }
        }
      }
    });
  }

  /* ------------------------------------------
     TAB 4: DIVERSIFICATION
  ------------------------------------------ */
  function renderCorrelationMatrix() {
    var ctx = document.getElementById("chart-correlation").getContext("2d");
    var tickers = HOLDINGS.map(function (h) { return h.ticker; });
    var n = tickers.length;

    /* Build data for a custom scatter/bubble representation */
    var dataPoints = [];
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        dataPoints.push({ x: j, y: i, v: CORRELATION[i][j] });
      }
    }

    if (charts.correlation) { charts.correlation.destroy(); }
    charts.correlation = new Chart(ctx, {
      type: "bubble",
      data: {
        datasets: [{
          data: dataPoints.map(function (p) {
            return { x: p.x, y: p.y, r: Math.abs(p.v) * 14 + 2 };
          }),
          backgroundColor: dataPoints.map(function (p) {
            if (p.v > 0.5) { return "rgba(32,128,141,0.8)"; }
            if (p.v > 0.2) { return "rgba(32,128,141,0.4)"; }
            if (p.v > -0.1) { return "rgba(139,148,158,0.3)"; }
            return "rgba(168,75,47,0.6)";
          }),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx2) {
                var raw = ctx2.raw;
                var i2 = Math.round(raw.y);
                var j2 = Math.round(raw.x);
                return tickers[i2] + " vs " + tickers[j2] + ": " + CORRELATION[i2][j2].toFixed(2);
              }
            }
          }
        },
        scales: {
          x: {
            type: "linear",
            min: -0.5,
            max: n - 0.5,
            ticks: {
              stepSize: 1,
              callback: function (v) { return tickers[v] || ""; }
            },
            grid: { color: "rgba(139,148,158,0.06)" }
          },
          y: {
            type: "linear",
            min: -0.5,
            max: n - 0.5,
            reverse: true,
            ticks: {
              stepSize: 1,
              callback: function (v) { return tickers[v] || ""; }
            },
            grid: { color: "rgba(139,148,158,0.06)" }
          }
        }
      }
    });
  }

  function renderDiversificationScore() {
    var container = document.getElementById("diversification-score");

    /* Simple scoring */
    var holdingScore = Math.min(HOLDINGS.length / 12, 1) * 25; /* 10/12 = 20.8 */
    var geoWeights = computeGeoWeights();
    var geoCount = Object.keys(geoWeights).filter(function (k) { return geoWeights[k] > 1; }).length;
    var geoScore = Math.min(geoCount / 15, 1) * 25; /* count of countries > 1% */
    var sectorWeights = computeSectorWeights();
    var sectorCount = Object.keys(sectorWeights).filter(function (k) { return sectorWeights[k] > 2; }).length;
    var sectorScore = Math.min(sectorCount / 10, 1) * 25;
    /* Sleeve diversification */
    var sleeveData = getSleeveData();
    var sleeveCount = Object.keys(sleeveData).length;
    var sleeveScore = Math.min(sleeveCount / 5, 1) * 25;

    var totalScore = Math.round(holdingScore + geoScore + sectorScore + sleeveScore);
    var circumference = 2 * Math.PI * 56;
    var offset = circumference - (totalScore / 100) * circumference;

    container.innerHTML =
      "<div class=\"score-ring\">" +
      "<svg viewBox=\"0 0 140 140\"><circle class=\"score-ring-bg\" cx=\"70\" cy=\"70\" r=\"56\"/>" +
      "<circle class=\"score-ring-fill\" cx=\"70\" cy=\"70\" r=\"56\" stroke-dasharray=\"" + circumference + "\" stroke-dashoffset=\"" + offset + "\"/></svg>" +
      "<div class=\"score-number\">" + totalScore + "</div></div>" +
      "<div class=\"score-label\">Diversification Score (0–100)</div>" +
      "<div class=\"score-breakdown\">" +
      "<div class=\"score-item\"><span>Holdings (10)</span><span class=\"score-item-val\">" + holdingScore.toFixed(0) + "/25</span></div>" +
      "<div class=\"score-item\"><span>Countries (" + geoCount + ")</span><span class=\"score-item-val\">" + geoScore.toFixed(0) + "/25</span></div>" +
      "<div class=\"score-item\"><span>Sectors (" + sectorCount + ")</span><span class=\"score-item-val\">" + sectorScore.toFixed(0) + "/25</span></div>" +
      "<div class=\"score-item\"><span>Sleeves (" + sleeveCount + ")</span><span class=\"score-item-val\">" + sleeveScore.toFixed(0) + "/25</span></div>" +
      "</div>";
  }

  function renderRiskMetrics() {
    var container = document.getElementById("risk-metrics");
    var wr = computeWeightedReturn();
    var we = computeWeightedExpense();
    var wdd = computeWeightedMaxDD();
    var netReturn = wr - we;

    container.innerHTML = [
      { label: "Net Expected Return", value: fmtPct(netReturn) },
      { label: "Weighted Expense", value: fmtPct(we) },
      { label: "Weighted Max DD", value: fmtPct(wdd) },
      { label: "Holdings Count", value: "10" },
      { label: "DBMF Correlation", value: "-0.09" },
      { label: "USD Exposure", value: "~40%" }
    ].map(function (m) {
      return "<div class=\"metric-item\"><div class=\"metric-label\">" + m.label + "</div><div class=\"metric-value\">" + m.value + "</div></div>";
    }).join("");
  }

  function renderDollarTable() {
    var tbody = document.getElementById("dollar-tbody");
    tbody.innerHTML = HOLDINGS.map(function (h) {
      var impactClass = "neutral";
      if (h.dollarImpact === "Positive") { impactClass = "positive"; }
      else if (h.dollarImpact === "Negative" || h.dollarImpact === "Slightly Negative") { impactClass = "negative"; }
      return "<tr>" +
        "<td><strong>" + h.ticker + "</strong></td>" +
        "<td>" + h.name + "</td>" +
        "<td class=\"num\">" + fmtPctRaw(h.target * 100) + "</td>" +
        "<td><span class=\"tag tag--" + impactClass + "\">" + h.dollarImpact + "</span></td>" +
        "<td>" + h.dollarExplain + "</td>" +
        "</tr>";
    }).join("");
  }

  /* ------------------------------------------
     TAB 5: PROS & CONS
  ------------------------------------------ */
  function renderProsConsCards() {
    var grid = document.getElementById("proscons-grid");
    grid.innerHTML = HOLDINGS.map(function (h, idx) {
      var impactClass = "neutral";
      if (h.dollarImpact === "Positive") { impactClass = "positive"; }
      else if (h.dollarImpact === "Negative" || h.dollarImpact === "Slightly Negative") { impactClass = "negative"; }

      return "<div class=\"proscons-card" + (idx < 2 ? " open" : "") + "\" data-idx=\"" + idx + "\">" +
        "<div class=\"proscons-header\" tabindex=\"0\" role=\"button\" aria-expanded=\"" + (idx < 2 ? "true" : "false") + "\">" +
        "<div><div class=\"proscons-ticker\">" + h.ticker + "</div>" +
        "<div class=\"proscons-name\">" + h.name + "</div>" +
        "<div class=\"proscons-sleeve\">" + h.sleeve + " — " + fmtPctRaw(h.target * 100) + " allocation</div></div>" +
        "<div class=\"proscons-toggle\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path d=\"M4 6l4 4 4-4\" stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"none\" stroke-linecap=\"round\"/></svg></div>" +
        "</div>" +
        "<div class=\"proscons-body\"><div class=\"proscons-content\">" +
        "<div class=\"proscons-section\"><div class=\"proscons-section-title pros\">Strengths</div>" +
        "<ul class=\"proscons-list pros-list\">" + h.pros.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul></div>" +
        "<div class=\"proscons-section\"><div class=\"proscons-section-title cons\">Weaknesses</div>" +
        "<ul class=\"proscons-list cons-list\">" + h.cons.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul></div>" +
        "<div class=\"proscons-section\"><div class=\"proscons-section-title impact\">Dollar Weakening Impact</div>" +
        "<p class=\"impact-text\"><span class=\"tag tag--" + impactClass + "\">" + h.dollarImpact + "</span> — " + h.dollarExplain + "</p></div>" +
        "</div></div></div>";
    }).join("");

    /* Toggle listeners */
    grid.querySelectorAll(".proscons-header").forEach(function (header) {
      header.addEventListener("click", function () {
        var card = header.closest(".proscons-card");
        var isOpen = card.classList.contains("open");
        card.classList.toggle("open");
        header.setAttribute("aria-expanded", !isOpen);
      });
      header.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          header.click();
        }
      });
    });
  }

  /* ------------------------------------------
     TAB 6: COMPOUNDING
  ------------------------------------------ */
  function renderCompounding() {
    var wr = computeWeightedReturn();
    var baseRate = wr;
    var boostRate = wr + 0.015;
    var stressRate = wr - 0.02;

    /* Scenario KPIs */
    var skpis = document.getElementById("scenario-kpis");
    skpis.innerHTML =
      "<div class=\"scenario-kpi\"><span class=\"scenario-kpi-label\">Weighted Return</span><span class=\"scenario-kpi-value\">" + fmtPct(wr) + "</span></div>" +
      "<div class=\"scenario-kpi\"><span class=\"scenario-kpi-label\">Investment</span><span class=\"scenario-kpi-value\">฿" + fmt(currentInvestment, 0) + "</span></div>" +
      "<div class=\"scenario-kpi\"><span class=\"scenario-kpi-label\">Holdings</span><span class=\"scenario-kpi-value\">10</span></div>";

    /* Build 20-year data */
    var years = [];
    var baseData = [currentInvestment];
    var boostData = [currentInvestment];
    var stressData = [currentInvestment];
    var tableRows = [];

    for (var y = 1; y <= 20; y++) {
      years.push(y);
      var bBegin = baseData[y - 1];
      var bReturn = bBegin * baseRate;
      var bEnd = bBegin + bReturn;
      baseData.push(bEnd);

      boostData.push(boostData[y - 1] * (1 + boostRate));
      stressData.push(stressData[y - 1] * (1 + stressRate));

      tableRows.push({
        year: y,
        begin: bBegin,
        ret: bReturn,
        end: bEnd
      });
    }

    /* Chart */
    var ctx = document.getElementById("chart-compounding").getContext("2d");
    if (charts.compounding) { charts.compounding.destroy(); }
    charts.compounding = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["0"].concat(years.map(function (y) { return "Y" + y; })),
        datasets: [
          {
            label: "Base (" + fmtPct(baseRate) + ")",
            data: baseData,
            borderColor: "#20808D",
            backgroundColor: "rgba(32,128,141,0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 2,
            borderWidth: 2
          },
          {
            label: "USD Erosion Boost (" + fmtPct(boostRate) + ")",
            data: boostData,
            borderColor: "#437a22",
            backgroundColor: "rgba(67,122,34,0.05)",
            fill: true,
            tension: 0.3,
            pointRadius: 2,
            borderWidth: 2
          },
          {
            label: "Stress (" + fmtPct(stressRate) + ")",
            data: stressData,
            borderColor: "#A84B2F",
            backgroundColor: "rgba(168,75,47,0.05)",
            fill: true,
            tension: 0.3,
            pointRadius: 2,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { position: "top" },
          tooltip: {
            callbacks: {
              label: function (ctx2) {
                return ctx2.dataset.label + ": ฿" + fmt(ctx2.raw, 0);
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function (v) {
                if (v >= 1000000) { return "฿" + (v / 1000000).toFixed(1) + "M"; }
                return "฿" + fmt(v, 0);
              }
            },
            grid: { color: "rgba(139,148,158,0.06)" }
          },
          x: {
            grid: { color: "rgba(139,148,158,0.04)" }
          }
        }
      }
    });

    /* Scenario cards */
    var baseFinal = baseData[20];
    var boostFinal = boostData[20];
    var stressFinal = stressData[20];

    document.getElementById("base-rate").textContent = fmtPct(baseRate) + " p.a.";
    document.getElementById("base-final").textContent = "฿" + fmt(baseFinal, 0);
    document.getElementById("base-gain").textContent = "+" + fmt(baseFinal - currentInvestment, 0) + " gain";

    document.getElementById("boost-rate").textContent = fmtPct(boostRate) + " p.a.";
    document.getElementById("boost-final").textContent = "฿" + fmt(boostFinal, 0);
    document.getElementById("boost-gain").textContent = "+" + fmt(boostFinal - currentInvestment, 0) + " gain";

    document.getElementById("stress-rate").textContent = fmtPct(stressRate) + " p.a.";
    document.getElementById("stress-final").textContent = "฿" + fmt(stressFinal, 0);
    document.getElementById("stress-gain").textContent = "+" + fmt(stressFinal - currentInvestment, 0) + " gain";

    /* Table */
    var tbody = document.getElementById("compounding-tbody");
    tbody.innerHTML = tableRows.map(function (r) {
      return "<tr>" +
        "<td class=\"num\">" + r.year + "</td>" +
        "<td class=\"num\">฿" + fmt(r.begin, 2) + "</td>" +
        "<td class=\"num positive\">฿" + fmt(r.ret, 2) + "</td>" +
        "<td class=\"num\">฿" + fmt(r.end, 2) + "</td>" +
        "</tr>";
    }).join("");
  }

  function initCompoundingInput() {
    var input = document.getElementById("investment-input");
    input.addEventListener("input", function () {
      var raw = input.value.replace(/[^0-9]/g, "");
      var num = parseInt(raw, 10);
      if (isNaN(num) || num <= 0) { num = 0; }
      currentInvestment = num;

      /* Format display */
      if (num > 0) {
        input.value = num.toLocaleString("en-US");
      }

      /* Re-render affected components */
      renderKPIs();
      renderHoldingsTable();
      renderCompounding();
    });
  }

  /* ------------------------------------------
     INITIALIZATION
  ------------------------------------------ */
  function init() {
    initNavigation();

    /* Render overview (visible tab) */
    renderKPIs();
    renderSleeveDonut();
    renderHoldingsBar();
    renderHoldingsTable();
    initTableSort();

    /* Other tabs are lazy-initialized on first view via initTab() */

    /* Hash-based routing */
    var hash = window.location.hash.replace("#", "");
    if (hash) { switchTab(hash); }
    window.addEventListener("hashchange", function () {
      var h = window.location.hash.replace("#", "");
      if (h) { switchTab(h); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
