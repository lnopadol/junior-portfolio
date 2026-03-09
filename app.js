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

  /* Jargon tooltip helper — wraps a term with data-tip for fixed tooltip */
  function jargon(term, tip) {
    return '<span class="jargon" data-tip="' + tip.replace(/"/g, '&quot;') + '">' + term + '</span>';
  }

  /* Auto-replace known jargon in free-text strings (pros/cons/macro) */
  var GLOSSARY = [
    ["Contango/roll yield losses", "Contango/roll yield losses", "Contango happens when future prices are higher than today\u2019s price. Funds that hold futures contracts lose a small amount each time they \u201Croll\u201D to the next contract."],
    ["CTA replication", "CTA replication", "CTA stands for Commodity Trading Advisor \u2014 a type of hedge fund. This fund replicates their strategies at a fraction of the cost."],
    ["2/20", "2/20", "The traditional hedge fund fee: 2% annual management fee plus 20% of profits. Very expensive compared to ETFs."],
    ["Crisis alpha", "Crisis alpha", "The ability to generate positive returns during market crises when most investments are losing money."],
    ["max drawdown", "max drawdown", "The largest peak-to-trough drop in value. Shows the worst temporary loss you might face."],
    ["risk-adjusted returns", "risk-adjusted returns", "Returns measured relative to how much risk was taken. Higher risk-adjusted returns means better reward per unit of risk."],
    ["annualized", "annualized", "Converted to an annual rate. If a fund returned 50% over 3 years, the annualized return is about 14.5% per year."],
    ["FX risk", "FX risk", "Foreign exchange risk \u2014 the chance that currency movements between THB and the fund\u2019s currency will affect your returns."],
    ["FX hedging", "FX hedging", "A strategy that locks in exchange rates to reduce the impact of currency fluctuations on your returns."],
    ["investment grade", "investment grade", "Bonds rated BBB or higher by rating agencies. Below investment grade (\u201Cjunk bonds\u201D) carry higher risk of default but pay more interest."],
    ["AUM", "AUM", "Assets Under Management \u2014 the total amount of money investors have put into the fund. Larger AUM usually means more liquidity and lower costs."],
    ["Currency hedge", "Currency hedge", "Insurance against exchange rate changes. It locks in the conversion rate so currency swings don\u2019t affect your returns."],
    ["de-dollarization", "de-dollarization", "The global trend of countries reducing their dependence on the US dollar for trade and reserves."],
    ["fiscal expansion", "fiscal expansion", "When governments increase spending or cut taxes to stimulate the economy. This can lead to higher inflation and more government debt."],
    ["geopolitical fragmentation", "geopolitical fragmentation", "The world splitting into competing blocs (e.g. US vs China), which disrupts global trade and supply chains."]
  ];

  function glossaryReplace(text) {
    GLOSSARY.forEach(function (entry) {
      var searchStr = entry[0];
      var displayStr = entry[1];
      var tipStr = entry[2];
      if (text.indexOf(searchStr) !== -1) {
        text = text.replace(searchStr, jargon(displayStr, tipStr));
      }
    });
    return text;
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

  /* Store original (default) weights for reset */
  var DEFAULT_WEIGHTS = HOLDINGS.map(function (h) { return h.target; });

  var tabInitialized = { overview: true, geography: false, sectors: false, diversification: false, learn: false, proscons: false, weights: false, compounding: false };

  function initTab(tabId) {
    if (tabInitialized[tabId]) { return; }
    tabInitialized[tabId] = true;
    switch (tabId) {
      case "geography": renderGeoCharts(); break;
      case "sectors": renderSectorCharts(); break;
      case "diversification": renderCorrelationMatrix(); renderDiversificationScore(); renderRiskMetrics(); renderDollarTable(); break;
      case "learn": renderLearnCards(); break;
      case "proscons": renderProsConsCards(); break;
      case "weights": renderWeightsTab(); break;
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
      { label: "Total Investment", value: "\u0E3F" + fmt(scaledInvestment, 0), sub: "THB", cls: "" },
      { label: jargon("Weighted Return", "The average expected annual gain across all holdings, weighted by how much you invest in each one."), value: fmtPct(weightedReturn), sub: "Annual expected", cls: "positive" },
      { label: jargon("Weighted Expense", "The average annual fee you pay across all holdings, weighted by each fund\u2019s share. This is deducted from your returns automatically."), value: fmtPct(weightedExpense), sub: "Annual cost", cls: "" },
      { label: jargon("Wtd. Max Drawdown", "The worst peak-to-trough drop the portfolio could experience, based on each fund\u2019s historical worst. Think of it as the biggest possible temporary loss."), value: fmtPct(weightedDD), sub: "Historical worst", cls: "negative" },
      { label: jargon("Blended Growth", "Your estimated portfolio value after one year of growth, before fees."), value: "\u0E3F" + fmt(scaledInvestment * (1 + weightedReturn), 0), sub: "Year 1 expected", cls: "positive" }
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
      { label: jargon("Net Expected Return", "Your weighted return minus weighted expense. This is what you actually keep after fees.", true), value: fmtPct(netReturn) },
      { label: jargon("Weighted Expense", "The average annual fee across all your holdings, weighted by allocation size.", true), value: fmtPct(we) },
      { label: jargon("Weighted Max DD", "Maximum Drawdown \u2014 the biggest potential temporary loss, based on the historical worst of each fund.", true), value: fmtPct(wdd) },
      { label: "Holdings Count", value: "10" },
      { label: jargon("DBMF Correlation", "How closely DBMF (the hedge fund) moves with stocks. \u22120.09 means almost no connection \u2014 when stocks fall, DBMF doesn\u2019t necessarily follow.", true), value: "-0.09" },
      { label: jargon("USD Exposure", "The portion of your portfolio invested in US dollar-denominated assets. If the dollar weakens, this part may lose value in THB terms.", true), value: "~40%" }
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
     TAB 5: LEARN — Beginner-Friendly Asset Explanations
  ------------------------------------------ */
  var LEARN_DATA = {
    "KFAFIX-A": {
      explain: "This is a Thai bond fund that invests your money in loans to Thai companies and government agencies. Think of it like lending money to stable Thai organizations — they pay you a small but steady interest. It\u2019s one of the safest parts of your portfolio, designed to keep things stable when stock markets get bumpy.",
      tip: "Bonds are like IOUs. You lend money, and the borrower pays you back with interest. Thai bonds are especially stable for a THB investor because there\u2019s no currency risk.",
      iconClass: "fi"
    },
    "K-APB-A(A)": {
      explain: "This fund buys bonds issued by companies and governments across Asia — India, Hong Kong, Japan, Saudi Arabia, and more. It\u2019s still bonds (loans), but spread across the whole Asia-Pacific region. It pays more than Thai-only bonds because it takes on a bit more risk from different countries and currencies.",
      tip: "The \u201CAsia-Pacific\u201D label means your money is earning interest from borrowers across the region, giving you exposure beyond Thailand while still keeping things relatively stable.",
      iconClass: "fi"
    },
    "CSPX": {
      explain: "This is an index fund that owns tiny slices of the 500 largest US companies — Apple, Microsoft, Amazon, Google, and hundreds more. When these companies grow and profit, your investment grows too. It\u2019s the single most popular way to invest in the US stock market.",
      tip: "An index fund doesn\u2019t try to pick winners — it owns everything in the index. This means lower fees and broad diversification. The S&P 500 has historically returned about 10% per year over the long run.",
      iconClass: "eq"
    },
    "TDIV": {
      explain: "This fund focuses on large, established companies across the developed world that regularly pay dividends — cash payments to shareholders. These are companies in the US, UK, Switzerland, France, and more that share their profits with you every quarter.",
      tip: "Dividend stocks tend to be mature, profitable companies. The regular cash payments can provide income even when share prices aren\u2019t rising. Think of it like owning rental property — you earn both from price appreciation and regular payouts.",
      iconClass: "eq"
    },
    "VAPX": {
      explain: "This fund gives you ownership in companies across developed Asia-Pacific countries — primarily Australia and South Korea, plus Hong Kong and Singapore. These are established economies with mature stock markets, but outside of Japan (which is covered separately by DXJ).",
      tip: "Asia-Pacific is home to some of the world\u2019s fastest-growing economies. This fund captures that growth through established companies like Samsung, BHP, and Commonwealth Bank.",
      iconClass: "eq"
    },
    "DXJ": {
      explain: "This fund invests in Japanese companies — Toyota, Sony, Mitsubishi, and many more — but with a special feature: it hedges away the yen currency risk. That means you get the returns of Japanese stocks without worrying about the yen going up or down against the dollar.",
      tip: "Japan is the world\u2019s 4th largest economy with globally dominant exporters. The currency hedge is like insurance — it removes one layer of risk so you can focus purely on how Japanese companies perform.",
      iconClass: "eq"
    },
    "EMXC": {
      explain: "This fund invests in emerging market countries — Taiwan, India, South Korea, Brazil, South Africa — but deliberately excludes China. These are fast-growing economies where companies can grow quickly, though with more volatility than developed markets.",
      tip: "Emerging markets offer higher growth potential because these economies are still developing. Excluding China removes concerns about Chinese regulatory crackdowns and geopolitical tensions.",
      iconClass: "eq"
    },
    "HGER": {
      explain: "This fund invests in physical commodities — gold, silver, oil, copper, wheat, and more. About a third is in gold alone. Commodities are real, tangible things the world needs, and their prices tend to rise when inflation goes up or the dollar weakens.",
      tip: "Commodities are the original inflation hedge. When everyday prices rise, commodity producers benefit. Gold especially has been a store of value for thousands of years and tends to shine during uncertain times.",
      iconClass: "alt"
    },
    "IGF": {
      explain: "This fund owns shares in companies that build and operate essential infrastructure — toll roads, airports, power plants, water utilities, cell towers, and pipelines around the world. These are things society always needs, providing stable and predictable income.",
      tip: "Infrastructure assets are often called \u201Creal assets\u201D because they\u2019re physical and essential. Many have government contracts with built-in inflation adjustments, meaning their revenues naturally keep up with rising prices.",
      iconClass: "alt"
    },
    "DBMF": {
      explain: "This is a \u201Cmanaged futures\u201D fund — it uses a computer-driven strategy to follow market trends across stocks, bonds, currencies, and commodities. When markets are falling, it can bet on further declines (go short). When markets rise, it rides the trend up. It\u2019s designed to make money in crashes when everything else is losing.",
      tip: "Think of this as portfolio insurance. In 2022 when both stocks and bonds fell sharply, this fund gained +31%. It won\u2019t always be the highest performer, but it\u2019s there to protect you during the worst times.",
      iconClass: "hedge"
    }
  };

  function renderLearnCards() {
    var grid = document.getElementById("learn-grid");
    grid.innerHTML = HOLDINGS.map(function (h) {
      var ld = LEARN_DATA[h.ticker] || { explain: "", tip: "", iconClass: "fi" };
      var iconCls = "learn-card-icon learn-card-icon--" + ld.iconClass;
      var initials = h.ticker.substring(0, 2);

      return '<div class="learn-card">' +
        '<div class="learn-card-header">' +
          '<div class="' + iconCls + '">' + initials + '</div>' +
          '<div class="learn-card-title">' +
            '<div class="learn-card-ticker">' + h.ticker + '</div>' +
            '<div class="learn-card-name">' + h.name + '</div>' +
          '</div>' +
          '<span class="learn-card-sleeve">' + h.sleeve + '</span>' +
        '</div>' +
        '<div class="learn-card-explain">' + ld.explain + '</div>' +
        '<div class="learn-card-meta">' +
          '<div class="learn-meta-item"><span class="learn-meta-label">Target</span><span class="learn-meta-value">' + fmtPctRaw(h.target * 100) + '</span></div>' +
          '<div class="learn-meta-item"><span class="learn-meta-label">Exp. Return</span><span class="learn-meta-value">' + fmtPctRaw(h.returns * 100) + '</span></div>' +
          '<div class="learn-meta-item"><span class="learn-meta-label">Cost</span><span class="learn-meta-value">' + fmtPctRaw(h.expense * 100) + '</span></div>' +
        '</div>' +
        '<div class="learn-card-tip"><strong>Why it matters:</strong> ' + ld.tip + '</div>' +
      '</div>';
    }).join("");
  }

  /* ------------------------------------------
     TAB 6: PROS & CONS
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
        "<ul class=\"proscons-list pros-list\">" + h.pros.map(function (p) { return "<li>" + glossaryReplace(p) + "</li>"; }).join("") + "</ul></div>" +
        "<div class=\"proscons-section\"><div class=\"proscons-section-title cons\">Weaknesses</div>" +
        "<ul class=\"proscons-list cons-list\">" + h.cons.map(function (c) { return "<li>" + glossaryReplace(c) + "</li>"; }).join("") + "</ul></div>" +
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
     TAB 6: WEIGHTS — Two-Level Lock & Rebalance
  ------------------------------------------ */

  /* State: sleeve weights (percent 0-100) and locks */
  var sleeveWeights = {};
  var sleeveLocked  = {};
  /* State: asset share within sleeve (percent 0-100, sums to 100 per sleeve) */
  var assetShares   = {};  /* keyed by HOLDINGS index */
  var assetLocked   = {};  /* keyed by HOLDINGS index */

  /* SVG icons for lock/unlock */
  var ICON_LOCK   = '<svg class="icon-lock" width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  var ICON_UNLOCK = '<svg class="icon-unlock" width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M5 7V5a3 3 0 0 1 6 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

  /* ------------------------------------------
     PORTFOLIO ADVISOR — Rule-Based Engine
  ------------------------------------------ */
  var ADVISOR_RULES = [
    {
      id: "less-risk",
      keywords: ["less risk", "lower risk", "reduce risk", "safer", "safe", "conservative", "protect", "defensive", "stability", "stable", "volatile", "volatility", "scared", "worry", "worried", "crash", "drawdown", "loss"],
      goal: "Reduce Portfolio Risk",
      explain: "To lower risk, we shift weight from volatile equity and alternative funds toward stable fixed income. Fixed income has much lower drawdowns and provides steady, predictable returns.",
      sleeves: { "Fixed Income": 45, "Equities": 40, "Alternatives": 8, "Hedges": 7 },
      note: "This brings the weighted max drawdown from about &minus;28% closer to &minus;20%, but also lowers expected return from ~7.6% to ~6.5%. A safer ride, but slower compounding."
    },
    {
      id: "more-income",
      keywords: ["more income", "dividend", "dividends", "cash flow", "cashflow", "yield", "passive income", "regular income", "payout", "payouts", "monthly income", "interest"],
      goal: "Maximize Income & Dividends",
      explain: "For more income, we tilt toward dividend-paying equities (TDIV yields ~3%), fixed income bonds, and infrastructure (IGF yields ~3%). These generate regular cash payouts.",
      sleeves: { "Fixed Income": 35, "Equities": 45, "Alternatives": 12, "Hedges": 8 },
      assetHints: [
        { ticker: "TDIV", target: 0.22, reason: "Highest dividend yield (~3%) among equities" },
        { ticker: "IGF", target: 0.08, reason: "Infrastructure pays ~3% dividend" },
        { ticker: "KFAFIX-A", target: 0.22, reason: "Steady Thai bond interest" }
      ],
      note: "This tilts toward income-producing assets. Expected dividend + interest income rises from ~1.5% to ~2.3% annually. Trade-off: slightly more concentrated in financials-heavy TDIV."
    },
    {
      id: "more-growth",
      keywords: ["more growth", "higher return", "higher returns", "aggressive", "maximize", "grow faster", "growth", "returns", "more return", "better return", "upside", "performance", "outperform", "wealth", "rich", "compound faster"],
      goal: "Maximize Growth",
      explain: "For higher growth, we shift heavily into equities — especially high-return funds like S&P 500 (CSPX ~10%), Japan (DXJ ~10%), and EM ex-China (EMXC ~10%). We reduce the stable but low-return fixed income.",
      sleeves: { "Fixed Income": 15, "Equities": 68, "Alternatives": 10, "Hedges": 7 },
      note: "This pushes the weighted expected return from ~7.6% to ~9.3%, which compounds to nearly 5x in 20 years vs 4.3x with the default. Trade-off: the max drawdown deepens to about &minus;35%, so prepare for bigger temporary losses."
    },
    {
      id: "lower-fees",
      keywords: ["lower fees", "lower cost", "cheaper", "reduce expense", "reduce fees", "fee", "fees", "expense", "expenses", "cost", "costs", "expensive", "save money", "minimize cost", "minimize fees"],
      goal: "Minimize Fees & Expenses",
      explain: "To cut costs, we shift toward ultra-low-cost index ETFs like CSPX (0.07%) and VAPX (0.15%), and reduce expensive active funds like DBMF (0.85%), HGER (0.68%), and K-APB-A(A) (1.30%).",
      sleeves: { "Fixed Income": 25, "Equities": 65, "Alternatives": 7, "Hedges": 3 },
      assetHints: [
        { ticker: "CSPX", target: 0.22, reason: "Ultra-low 0.07% expense" },
        { ticker: "VAPX", target: 0.14, reason: "Low 0.15% expense" },
        { ticker: "KFAFIX-A", target: 0.20, reason: "Low 0.50% expense for active" },
        { ticker: "K-APB-A(A)", target: 0.05, reason: "Reduce 1.30% active fund" },
        { ticker: "DBMF", target: 0.03, reason: "Reduce 0.85% hedge fund" }
      ],
      note: "This cuts the weighted expense from ~0.46% to ~0.22% — saving roughly ฿2,400 per year on a ฿1M portfolio. Trade-off: less hedging protection and less diversification into alternatives."
    }
  ];

  function matchAdvisorIntent(query) {
    var q = query.toLowerCase().trim();
    var bestMatch = null;
    var bestScore = 0;

    ADVISOR_RULES.forEach(function (rule) {
      var score = 0;
      rule.keywords.forEach(function (kw) {
        if (q.indexOf(kw) !== -1) {
          /* Longer keyword matches are more specific */
          score += kw.split(" ").length;
        }
      });
      if (score > bestScore) {
        bestScore = score;
        bestMatch = rule;
      }
    });

    return bestMatch;
  }

  function computeAdvisorChanges(rule) {
    var changes = [];
    SLEEVE_ORDER.forEach(function (sleeve) {
      var current = sleeveWeights[sleeve];
      var proposed = rule.sleeves[sleeve];
      if (Math.abs(current - proposed) >= 0.5) {
        changes.push({
          label: sleeve,
          from: current,
          to: proposed,
          delta: proposed - current
        });
      }
    });
    return changes;
  }

  function renderAdvisorResponse(rule) {
    var responseEl = document.getElementById("advisor-response");
    var changes = computeAdvisorChanges(rule);

    var changesHtml = changes.map(function (c) {
      var arrow = c.delta > 0 ? "\u2191" : "\u2193";
      var cls = c.delta > 0 ? "positive" : "negative";
      return '<div class="advisor-change-row">' +
        '<span class="advisor-change-label">' + c.label + '</span>' +
        '<span class="advisor-change-from">' + c.from.toFixed(1) + '%</span>' +
        '<span class="advisor-change-arrow">\u2192</span>' +
        '<span class="advisor-change-to ' + cls + '">' + c.to.toFixed(1) + '% ' + arrow + '</span>' +
        '</div>';
    }).join('');

    responseEl.innerHTML =
      '<div class="advisor-msg">' +
        '<div class="advisor-msg-goal">' + rule.goal + '</div>' +
        '<p>' + rule.explain + '</p>' +
        '<div class="advisor-changes">' + changesHtml + '</div>' +
        '<button class="advisor-apply-btn" id="advisor-apply-btn">' +
          '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8.5l4 4 8-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          'Apply These Changes' +
        '</button>' +
        '<div class="advisor-note">' + rule.note + '</div>' +
      '</div>';

    responseEl.classList.add("visible");

    /* Bind apply button */
    document.getElementById("advisor-apply-btn").addEventListener("click", function () {
      applyAdvisorRule(rule);
    });
  }

  function renderAdvisorFallback(query) {
    var responseEl = document.getElementById("advisor-response");
    var chipHtml = ADVISOR_RULES.map(function (r) {
      return '<button class="advisor-chip advisor-retry-chip" data-query="' + r.keywords[0] + '">' + r.goal + '</button>';
    }).join(' ');

    responseEl.innerHTML =
      '<div class="advisor-msg">' +
        '<p>I\'m not sure how to help with <strong>"' + query + '"</strong>, but I can advise on these goals:</p>' +
        '<div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;">' + chipHtml + '</div>' +
      '</div>';
    responseEl.classList.add("visible");

    /* Bind retry chips */
    responseEl.querySelectorAll(".advisor-retry-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        processAdvisorQuery(chip.getAttribute("data-query"));
      });
    });
  }

  function applyAdvisorRule(rule) {
    /* Apply sleeve weights */
    SLEEVE_ORDER.forEach(function (sleeve) {
      sleeveWeights[sleeve] = rule.sleeves[sleeve];
      sleeveLocked[sleeve] = false;
    });

    /* Apply asset-level hints if provided */
    if (rule.assetHints) {
      rule.assetHints.forEach(function (hint) {
        HOLDINGS.forEach(function (h, idx) {
          if (h.ticker === hint.ticker) {
            /* Compute new share within sleeve */
            var sleeveTotal = 0;
            HOLDINGS.forEach(function (h2) {
              if (h2.sleeve === h.sleeve) { sleeveTotal += h2.target; }
            });
            var proposedSleeveWeight = rule.sleeves[h.sleeve] / 100;
            if (proposedSleeveWeight > 0) {
              assetShares[idx] = (hint.target / proposedSleeveWeight) * 100;
            }
          }
        });
      });

      /* Re-normalize shares within each sleeve to 100% */
      SLEEVE_ORDER.forEach(function (sleeve) {
        var indices = [];
        var total = 0;
        HOLDINGS.forEach(function (h, idx) {
          if (h.sleeve === sleeve) {
            indices.push(idx);
            total += assetShares[idx];
          }
        });
        if (total > 0 && Math.abs(total - 100) > 0.1) {
          indices.forEach(function (idx) {
            assetShares[idx] = (assetShares[idx] / total) * 100;
          });
        }
      });
    }

    /* Sync and re-render everything */
    syncHoldingsFromState();
    renderSleeveSliders();
    renderWeightsTotalBar();
    renderAssetSliders();
    renderWeightsKPIs();
    refreshAllTabs();

    /* Visual feedback on the apply button */
    var btn = document.getElementById("advisor-apply-btn");
    if (btn) {
      btn.textContent = "\u2713 Applied!";
      btn.disabled = true;
      btn.style.opacity = "0.6";
    }
  }

  function processAdvisorQuery(query) {
    var rule = matchAdvisorIntent(query);
    if (rule) {
      renderAdvisorResponse(rule);
    } else {
      renderAdvisorFallback(query);
    }
  }

  function initAdvisor() {
    var input = document.getElementById("advisor-input");
    var sendBtn = document.getElementById("advisor-send-btn");
    if (!input || !sendBtn) { return; }

    function submit() {
      var q = input.value.trim();
      if (!q) { return; }
      processAdvisorQuery(q);
      input.value = "";
    }

    sendBtn.addEventListener("click", submit);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
    });

    /* Suggestion chips */
    document.querySelectorAll(".advisor-chip[data-query]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var q = chip.getAttribute("data-query");
        input.value = q;
        processAdvisorQuery(q);
      });
    });
  }

  function initWeightsState() {
    /* Compute initial sleeve weights from HOLDINGS targets */
    SLEEVE_ORDER.forEach(function (s) {
      var total = 0;
      HOLDINGS.forEach(function (h) { if (h.sleeve === s) { total += h.target; } });
      sleeveWeights[s] = +(total * 100).toFixed(2);
      sleeveLocked[s] = false;
    });
    /* Compute initial asset shares (% within their sleeve, summing to 100) */
    HOLDINGS.forEach(function (h, idx) {
      var sleeveTotal = 0;
      HOLDINGS.forEach(function (h2) { if (h2.sleeve === h.sleeve) { sleeveTotal += h2.target; } });
      assetShares[idx] = sleeveTotal > 0 ? +((h.target / sleeveTotal) * 100).toFixed(2) : 0;
      assetLocked[idx] = false;
    });
  }

  /* Recompute HOLDINGS.target and .amount from sleeve weights + asset shares */
  function syncHoldingsFromState() {
    HOLDINGS.forEach(function (h, idx) {
      var sleevePct = sleeveWeights[h.sleeve] / 100;  /* e.g. 0.55 */
      var sharePct  = assetShares[idx] / 100;          /* e.g. 0.29 within sleeve */
      h.target = +(sleevePct * sharePct).toFixed(6);
      h.amount = Math.round(h.target * 1000000);
    });
  }

  /* ---------- Render ---------- */
  function renderWeightsTab() {
    initWeightsState();
    initAdvisor();
    renderWeightsKPIs();
    renderSleeveSliders();
    renderWeightsTotalBar();
    renderAssetSliders();
    bindResetButton();
  }

  function renderWeightsKPIs() {
    var el = document.getElementById("weights-kpi-strip");
    if (!el) { return; }
    var wr  = computeWeightedReturn();
    var we  = computeWeightedExpense();
    var wdd = computeWeightedMaxDD();
    var yr1 = currentInvestment * (1 + wr);
    var kpis = [
      { label: jargon("Wtd. Return", "Weighted Return \u2014 the average expected annual gain, weighted by each fund\u2019s allocation."), value: fmtPct(wr),  cls: "positive" },
      { label: jargon("Wtd. Expense", "Weighted Expense \u2014 the average annual fee across all holdings."), value: fmtPct(we),  cls: "" },
      { label: jargon("Wtd. Max DD", "Weighted Max Drawdown \u2014 the biggest potential temporary loss based on historical data."), value: fmtPct(wdd), cls: "negative" },
      { label: "Year 1 Value", value: "\u0E3F" + fmt(yr1, 0), cls: "positive" }
    ];
    el.innerHTML = kpis.map(function (k) {
      return '<div class="weights-kpi-chip">' +
        '<div class="weights-kpi-chip-label">' + k.label + '</div>' +
        '<div class="weights-kpi-chip-value ' + k.cls + '">' + k.value + '</div>' +
        '</div>';
    }).join('');
  }

  /* --- Sleeve sliders --- */
  function renderSleeveSliders() {
    var container = document.getElementById("sleeve-sliders");
    container.innerHTML = SLEEVE_ORDER.map(function (sleeve) {
      var pct = sleeveWeights[sleeve].toFixed(1);
      var locked = sleeveLocked[sleeve];
      var key = sleeve.replace(/\s/g, "-");
      return '<div class="w-slider-row" data-sleeve="' + sleeve + '">' +
        '<button class="w-lock-btn' + (locked ? ' locked' : '') + '" data-sleeve-lock="' + sleeve + '" title="' + (locked ? 'Unlock' : 'Lock') + ' ' + sleeve + '">' + ICON_LOCK + ICON_UNLOCK + '</button>' +
        '<div class="w-slider-label"><span class="w-dot" style="background:' + SLEEVE_COLORS[sleeve] + '"></span>' + sleeve + '</div>' +
        '<input type="range" class="w-range" min="0" max="80" step="0.5" value="' + pct + '"' + (locked ? ' disabled' : '') + ' id="sleeve-range-' + key + '">' +
        '<div class="w-slider-value" id="sleeve-val-' + key + '">' + pct + '%</div>' +
        '</div>';
    }).join('');

    /* Bind sleeve slider events */
    container.querySelectorAll('input.w-range').forEach(function (slider) {
      slider.addEventListener('input', function () {
        var row = slider.closest('.w-slider-row');
        var sleeve = row.getAttribute('data-sleeve');
        onSleeveSliderChange(sleeve, parseFloat(slider.value));
      });
    });

    /* Bind sleeve lock buttons */
    container.querySelectorAll('.w-lock-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sleeve = btn.getAttribute('data-sleeve-lock');
        sleeveLocked[sleeve] = !sleeveLocked[sleeve];
        btn.classList.toggle('locked');
        var key = sleeve.replace(/\s/g, '-');
        var slider = document.getElementById('sleeve-range-' + key);
        if (slider) { slider.disabled = sleeveLocked[sleeve]; }
        btn.title = (sleeveLocked[sleeve] ? 'Unlock' : 'Lock') + ' ' + sleeve;
      });
    });
  }

  function onSleeveSliderChange(changedSleeve, newVal) {
    var oldVal = sleeveWeights[changedSleeve];
    var delta  = newVal - oldVal;
    if (Math.abs(delta) < 0.01) { return; }

    /* Compute total of locked sleeves (excluding changed) */
    var lockedTotal = 0;
    var unlocked = [];
    SLEEVE_ORDER.forEach(function (s) {
      if (s === changedSleeve) { return; }
      if (sleeveLocked[s]) {
        lockedTotal += sleeveWeights[s];
      } else {
        unlocked.push(s);
      }
    });

    if (unlocked.length === 0) {
      /* No unlocked sleeves to absorb — cap the change */
      newVal = 100 - lockedTotal;
      delta = newVal - oldVal;
    }

    /* Set the changed sleeve */
    sleeveWeights[changedSleeve] = newVal;

    /* Distribute -delta among unlocked sleeves proportionally */
    var unlockedTotal = 0;
    unlocked.forEach(function (s) { unlockedTotal += sleeveWeights[s]; });

    var target = unlockedTotal - delta;
    if (target < 0) { target = 0; }

    if (unlockedTotal > 0.01) {
      unlocked.forEach(function (s) {
        var share = sleeveWeights[s] / unlockedTotal;
        sleeveWeights[s] = Math.max(0, +(share * target).toFixed(2));
      });
    } else {
      /* Equal split fallback */
      var each = target / unlocked.length;
      unlocked.forEach(function (s) {
        sleeveWeights[s] = Math.max(0, +each.toFixed(2));
      });
    }

    /* Snap total to 100 by nudging largest unlocked */
    var total = 0;
    SLEEVE_ORDER.forEach(function (s) { total += sleeveWeights[s]; });
    var diff = +(100 - total).toFixed(2);
    if (Math.abs(diff) > 0.01 && unlocked.length > 0) {
      var largest = unlocked[0];
      unlocked.forEach(function (s) {
        if (sleeveWeights[s] > sleeveWeights[largest]) { largest = s; }
      });
      sleeveWeights[largest] = Math.max(0, +(sleeveWeights[largest] + diff).toFixed(2));
    }

    syncHoldingsFromState();
    updateSleeveUI();
    updateAssetSlidersUI();
    renderWeightsTotalBar();
    renderWeightsKPIs();
    refreshAllTabs();
  }

  function updateSleeveUI() {
    SLEEVE_ORDER.forEach(function (sleeve) {
      var key = sleeve.replace(/\s/g, '-');
      var slider = document.getElementById('sleeve-range-' + key);
      var valEl  = document.getElementById('sleeve-val-' + key);
      if (slider && !sleeveLocked[sleeve]) { slider.value = sleeveWeights[sleeve].toFixed(1); }
      if (valEl)  { valEl.textContent = sleeveWeights[sleeve].toFixed(1) + '%'; }
    });
  }

  /* --- Asset sliders --- */
  function renderAssetSliders() {
    var container = document.getElementById('asset-sliders-container');
    var html = '';

    SLEEVE_ORDER.forEach(function (sleeve) {
      var items = [];
      HOLDINGS.forEach(function (h, idx) {
        if (h.sleeve === sleeve) { items.push({ h: h, idx: idx }); }
      });
      if (items.length === 0) { return; }

      var key = sleeve.replace(/\s/g, '-');
      html += '<div class="asset-sleeve-card" data-sleeve="' + sleeve + '">';
      html += '<div class="asset-sleeve-card-header">';
      html += '<div class="ash-name"><span class="w-dot" style="background:' + SLEEVE_COLORS[sleeve] + '"></span>' + sleeve + '</div>';
      html += '<div class="ash-budget" id="ash-budget-' + key + '">' + sleeveWeights[sleeve].toFixed(1) + '% of portfolio</div>';
      html += '</div>';
      html += '<div class="asset-sleeve-card-body">';

      items.forEach(function (item) {
        var share = assetShares[item.idx].toFixed(1);
        var absPct = (item.h.target * 100).toFixed(1);
        var locked = assetLocked[item.idx];
        html += '<div class="a-slider-row" data-idx="' + item.idx + '">';
        html += '<button class="w-lock-btn' + (locked ? ' locked' : '') + '" data-asset-lock="' + item.idx + '" title="' + (locked ? 'Unlock' : 'Lock') + ' ' + item.h.ticker + '">' + ICON_LOCK + ICON_UNLOCK + '</button>';
        html += '<div class="w-slider-label">' + item.h.ticker + '<small>' + absPct + '% abs</small></div>';
        html += '<input type="range" class="w-range" min="0" max="100" step="0.5" value="' + share + '"' + (locked ? ' disabled' : '') + ' id="asset-range-' + item.idx + '">';
        html += '<div class="w-slider-value" id="asset-val-' + item.idx + '">' + share + '%</div>';
        html += '</div>';
      });

      html += '</div></div>';
    });

    container.innerHTML = html;

    /* Bind asset slider events */
    container.querySelectorAll('input.w-range').forEach(function (slider) {
      slider.addEventListener('input', function () {
        var row = slider.closest('.a-slider-row');
        var idx = parseInt(row.getAttribute('data-idx'), 10);
        onAssetSliderChange(idx, parseFloat(slider.value));
      });
    });

    /* Bind asset lock buttons */
    container.querySelectorAll('.w-lock-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-asset-lock'), 10);
        assetLocked[idx] = !assetLocked[idx];
        btn.classList.toggle('locked');
        var slider = document.getElementById('asset-range-' + idx);
        if (slider) { slider.disabled = assetLocked[idx]; }
        btn.title = (assetLocked[idx] ? 'Unlock' : 'Lock') + ' ' + HOLDINGS[idx].ticker;
      });
    });
  }

  function onAssetSliderChange(changedIdx, newShare) {
    var sleeve = HOLDINGS[changedIdx].sleeve;
    var oldShare = assetShares[changedIdx];
    var delta = newShare - oldShare;
    if (Math.abs(delta) < 0.01) { return; }

    /* Gather siblings in same sleeve */
    var lockedTotal = 0;
    var unlocked = [];
    HOLDINGS.forEach(function (h, idx) {
      if (h.sleeve !== sleeve || idx === changedIdx) { return; }
      if (assetLocked[idx]) {
        lockedTotal += assetShares[idx];
      } else {
        unlocked.push(idx);
      }
    });

    /* Cap if no unlocked siblings */
    if (unlocked.length === 0) {
      newShare = 100 - lockedTotal;
      delta = newShare - oldShare;
    }

    assetShares[changedIdx] = newShare;

    /* Distribute -delta among unlocked siblings proportionally */
    var unlockedTotal = 0;
    unlocked.forEach(function (idx) { unlockedTotal += assetShares[idx]; });

    var target = unlockedTotal - delta;
    if (target < 0) { target = 0; }

    if (unlockedTotal > 0.01) {
      unlocked.forEach(function (idx) {
        var share = assetShares[idx] / unlockedTotal;
        assetShares[idx] = Math.max(0, +(share * target).toFixed(2));
      });
    } else {
      var each = target / unlocked.length;
      unlocked.forEach(function (idx) {
        assetShares[idx] = Math.max(0, +each.toFixed(2));
      });
    }

    /* Snap to 100 within sleeve */
    var sleeveSum = 0;
    HOLDINGS.forEach(function (h, idx) {
      if (h.sleeve === sleeve) { sleeveSum += assetShares[idx]; }
    });
    var diff = +(100 - sleeveSum).toFixed(2);
    if (Math.abs(diff) > 0.01 && unlocked.length > 0) {
      var largest = unlocked[0];
      unlocked.forEach(function (idx) {
        if (assetShares[idx] > assetShares[largest]) { largest = idx; }
      });
      assetShares[largest] = Math.max(0, +(assetShares[largest] + diff).toFixed(2));
    }

    syncHoldingsFromState();
    updateAssetSlidersUI();
    renderWeightsKPIs();
    refreshAllTabs();
  }

  function updateAssetSlidersUI() {
    HOLDINGS.forEach(function (h, idx) {
      var slider = document.getElementById('asset-range-' + idx);
      var valEl  = document.getElementById('asset-val-' + idx);
      var share  = assetShares[idx];
      if (slider && !assetLocked[idx]) { slider.value = share.toFixed(1); }
      if (valEl)  { valEl.textContent = share.toFixed(1) + '%'; }

      /* Update the absolute % label */
      var row = slider ? slider.closest('.a-slider-row') : null;
      if (row) {
        var small = row.querySelector('.w-slider-label small');
        if (small) { small.textContent = (h.target * 100).toFixed(1) + '% abs'; }
      }
    });

    /* Update sleeve budget labels */
    SLEEVE_ORDER.forEach(function (sleeve) {
      var key = sleeve.replace(/\s/g, '-');
      var budgetEl = document.getElementById('ash-budget-' + key);
      if (budgetEl) { budgetEl.textContent = sleeveWeights[sleeve].toFixed(1) + '% of portfolio'; }
    });
  }

  /* --- Total bar --- */
  function renderWeightsTotalBar() {
    var el = document.getElementById('weights-total-row');
    if (!el) { return; }
    var total = 0;
    SLEEVE_ORDER.forEach(function (s) { total += sleeveWeights[s]; });

    var cls = '';
    if (total > 100.1) { cls = 'over'; }
    else if (total < 99.9) { cls = 'under'; }

    el.innerHTML = '<span class="wt-label">Total</span>' +
      '<div class="wt-track"><div class="wt-fill ' + cls + '" style="width:' + Math.min(total, 100) + '%"></div></div>' +
      '<span class="wt-pct ' + cls + '">' + total.toFixed(1) + '%</span>';
  }

  /* --- Reset button --- */
  function bindResetButton() {
    var btn = document.getElementById('weights-reset-btn');
    if (!btn) { return; }
    btn.addEventListener('click', function () {
      /* Restore default targets */
      HOLDINGS.forEach(function (h, idx) {
        h.target = DEFAULT_WEIGHTS[idx];
        h.amount = Math.round(h.target * 1000000);
      });
      /* Re-derive state */
      SLEEVE_ORDER.forEach(function (s) { sleeveLocked[s] = false; });
      HOLDINGS.forEach(function (_, idx) { assetLocked[idx] = false; });
      initWeightsState();
      /* Re-render everything */
      renderSleeveSliders();
      renderWeightsTotalBar();
      renderAssetSliders();
      renderWeightsKPIs();
      refreshAllTabs();
    });
  }

  /* --- Refresh all other tabs --- */
  function refreshAllTabs() {
    renderKPIs();
    renderSleeveDonut();
    renderHoldingsBar();
    renderHoldingsTable();

    tabInitialized.geography = false;
    tabInitialized.sectors = false;
    tabInitialized.diversification = false;
    tabInitialized.learn = false;
    tabInitialized.proscons = false;
    tabInitialized.compounding = false;

    var activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
      var activeId = activeTab.id.replace('tab-', '');
      if (activeId !== 'overview' && activeId !== 'weights') {
        initTab(activeId);
      }
    }
  }

  /* ------------------------------------------
     TAB 7: COMPOUNDING
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
     TOOLTIP MANAGER (fixed-position, body-level)
  ------------------------------------------ */
  function initTooltipManager() {
    var tipEl = document.createElement("div");
    tipEl.className = "jargon-tip-fixed";
    document.body.appendChild(tipEl);

    var hideTimeout = null;

    function show(target) {
      var text = target.getAttribute("data-tip");
      if (!text) { return; }
      clearTimeout(hideTimeout);

      tipEl.textContent = text;
      tipEl.classList.remove("below");
      tipEl.style.left = "0";
      tipEl.style.top = "0";
      tipEl.classList.add("visible");

      /* Measure */
      var rect = target.getBoundingClientRect();
      var tipRect = tipEl.getBoundingClientRect();
      var pad = 8;

      /* Horizontal: center on target, clamp to viewport */
      var left = rect.left + rect.width / 2 - tipRect.width / 2;
      left = Math.max(pad, Math.min(left, window.innerWidth - tipRect.width - pad));

      /* Vertical: prefer above */
      var top = rect.top - tipRect.height - pad;
      var showBelow = false;
      if (top < pad) {
        top = rect.bottom + pad;
        showBelow = true;
      }

      tipEl.style.left = left + "px";
      tipEl.style.top = top + "px";
      if (showBelow) { tipEl.classList.add("below"); }

      /* Arrow position relative to tooltip */
      var arrowLeft = rect.left + rect.width / 2 - left;
      arrowLeft = Math.max(10, Math.min(arrowLeft, tipRect.width - 10));
      tipEl.style.setProperty("--arrow-left", arrowLeft + "px");
    }

    function hide() {
      hideTimeout = setTimeout(function () {
        tipEl.classList.remove("visible", "below");
      }, 80);
    }

    /* Event delegation on document — works for dynamically-injected jargon too */
    document.addEventListener("mouseenter", function (e) {
      var jargonEl = e.target.closest(".jargon[data-tip]");
      if (jargonEl) { show(jargonEl); }
    }, true);

    document.addEventListener("mouseleave", function (e) {
      var jargonEl = e.target.closest(".jargon[data-tip]");
      if (jargonEl) { hide(); }
    }, true);

    /* Touch support */
    document.addEventListener("touchstart", function (e) {
      var jargonEl = e.target.closest(".jargon[data-tip]");
      if (jargonEl) {
        show(jargonEl);
        setTimeout(hide, 3000);
      } else {
        hide();
      }
    }, { passive: true });
  }

  /* ------------------------------------------
     INITIALIZATION
  ------------------------------------------ */
  function init() {
    initNavigation();
    initTooltipManager();

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
