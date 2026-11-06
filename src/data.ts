export const profile = {
  name: 'Aditya Verma',
  headline: 'Building reliable data platforms, forecasting models, and analytics products.',
  title: 'Data Analytics · AI Engineering · Decision Science',
  subtitle: 'M.Sc. Data Analytics & Decision Science at RWTH Aachen',
  location: 'Aachen, Germany',
  phone: '+49 1525 3178975',
  email: 'av23315@gmail.com',
  github: 'https://github.com/adi-alt',
  linkedin: 'https://www.linkedin.com/in/av2331/',
  availability: 'Open for Werkstudent / Internship (up to 20h/week)',
  storyLead:
    'I studied Electrical Engineering at NSUT in New Delhi, where I wrote Python scripts to generate circuit schematics and 3D CAD enclosures and modelled wind turbine power curves. That hands-on systems work pulled me naturally into data engineering, AI evaluation, and decision science.',
  storyBody:
    'Over the last two years in industry, I led a four-person engineering team building internal analytics tools, ran more than 50 rounds of RLHF model evaluation to raise Large Action Model precision from 10% to 50%, and built Apex F1 Hub from the ground up. Today I am based in Aachen pursuing my M.Sc. in Data Analytics and Decision Science at RWTH Aachen University.',
}

export const focusAreas = [
  {
    label: 'Data & BI',
    title: 'Data Analytics & BI',
    focus: 'EDA · KPI Dashboards · Statistical Analysis',
    evidence: 'RWTH M.Sc. · 40% efficiency gain at Softage AI',
  },
  {
    label: 'ML & RLHF',
    title: 'Machine Learning & Evaluation',
    focus: 'Time-Series (LSTM / GRU) · Monte Carlo · RLHF',
    evidence: '50+ RLHF evaluation rounds · AIP 2025 paper',
  },
  {
    label: 'ETL & DB',
    title: 'Data Engineering & Databases',
    focus: 'PostgreSQL · Supabase · Apache Kafka · Elasticsearch',
    evidence: '15-min automated ETL · 50% feed relevance lift',
  },
  {
    label: 'Full-Stack',
    title: 'Full-Stack Data Products',
    focus: 'Next.js · TypeScript · REST APIs · Playwright CI',
    evidence: 'Apex F1 Hub live · 156 automated test files',
  },
  {
    label: 'CAD & PCB',
    title: 'Programmatic CAD & PCB',
    focus: 'Python (build123d, SKiDL) · KiCad · B.Tech. EE',
    evidence: '183 automated PCB & 3D CAD designs delivered',
  },
]

export const counters = [
  { value: '2+ yrs', label: 'Industry experience', detail: 'AI evaluation, ETL pipelines & full-stack analytics' },
  { value: '10% → 50%', label: 'Autopilot precision gain', detail: 'Achieved over 50+ RLHF evaluation and data curation rounds' },
  { value: '1.7 s', label: 'Median summary latency', detail: 'Reduced from 14 to 90 seconds on Apex F1 Hub' },
  { value: '183', label: 'Automated PCB & CAD models', detail: 'Generated programmatically in Python with SKiDL and build123d' },
]

export type Job = {
  company: string
  role: string
  place: string
  period: string
  level: string
  context: string
  points: string[]
  tags: string[]
}

export const experience: Job[] = [
  {
    company: 'Softage AI',
    role: 'AI Engineer (Data Analytics & Evaluation)',
    place: 'Gurugram, India',
    period: 'Jun 2024 – Sep 2026',
    level: '01',
    context:
      'Brought quantitative structure to how we evaluated Large Action Models and internal automation workflows while leading the internal analytics platform team and a programmatic hardware design pipeline.',
    points: [
      'Designed relational database schemas, REST APIs, analytics dashboards, and automated evaluation reports while leading 4 full-stack engineers, increasing operational efficiency by 40%.',
      'Led quantitative analysis across 50+ RLHF evaluation rounds, tuning K-values, alpha thresholds, and sampling parameters to benchmark model output quality.',
      'Audited, cleaned, and curated 15% of large-scale training datasets, lifting Large Action Model and autopilot precision from 10% to 50%.',
      'Improved ACE automation workflow execution accuracy by 50% while tracking operational KPIs and guiding 8 trainers across Git and GitHub automation workflows.',
      'Delivered 183 automated PCB layouts and parametric 3D CAD models in Python using SKiDL, build123d, and KiCad in coordination with 25 mechanical engineers.',
    ],
    tags: ['Python', 'RLHF', 'LLM Evaluation', 'PostgreSQL', 'REST APIs', 'Git & GitHub', 'SKiDL', 'build123d', 'KiCad'],
  },
  {
    company: 'Sphinx Worldbiz Limited',
    role: 'Software Engineering Intern',
    place: 'Noida, India',
    period: 'May 2023 – Jul 2023',
    level: '02',
    context:
      'Worked inside a 7-member engineering squad on the Vinivia platform, building data-driven user analytics and media views.',
    points: [
      'Developed 10+ data-driven frontend components covering user analytics, order history, channels, and playlists with a 7-member team.',
      'Integrated real-time data flows through 5+ production REST APIs for the Vinivia project.',
    ],
    tags: ['REST APIs', 'TypeScript', 'JavaScript', 'User Analytics'],
  },
  {
    company: 'Behere Elite Technologies Private Limited',
    role: 'Product Engineering Intern',
    place: 'New Delhi, India',
    period: 'Jan 2023 – Apr 2023',
    level: '03',
    context:
      'Paired quantitative market analysis and product KPI management with real-time backend data streaming.',
    points: [
      'Increased operational efficiency by 20% by conducting quantitative market analysis and managing product KPIs from ideation to release.',
      'Improved user recommendation feed relevance by 50% through a real-time data pipeline using Apache Kafka and Elasticsearch.',
    ],
    tags: ['Apache Kafka', 'Elasticsearch', 'Product KPIs', 'Market Analysis'],
  },
]

export const education = [
  {
    school: 'RWTH Aachen University',
    degree: 'M.Sc. Data Analytics and Decision Science',
    period: 'Oct 2026 – Present',
    place: 'Aachen, Germany',
    note: 'Focus areas include Predictive Modeling, Decision Science, Operations Research, and Statistical Data Analysis.',
    url: 'https://www.rwth-aachen.de/',
  },
  {
    school: 'Netaji Subhas University of Technology (NSUT)',
    degree: 'B.Tech. in Electrical Engineering',
    period: '2020 – 2024',
    place: 'New Delhi, India',
    note: 'Final grade 7.8 / 10.0 (German grade equivalent 2.1) · Bachelor thesis on deep learning wind power forecasting.',
    url: 'http://www.nsut.ac.in/en/home',
  },
]

export type ProjectImage = {
  src: string
  caption: string
  label: string
}

export const projects = [
  {
    name: 'Apex F1 Hub',
    subtitle: 'Live Formula 1 Telemetry, Race Replay & Forecasting Platform',
    period: 'Aug 2026 – Present',
    url: 'https://www.apexf1hub.com/',
    linkLabel: 'Visit apexf1hub.com',
    stack: ['Next.js', 'TypeScript', 'Supabase PostgreSQL', 'Python', 'FastF1 / OpenF1', 'Groq', 'Playwright', 'Sentry'],
    images: [
      {
        src: '/projects/apex-f1-hub.png',
        label: 'Live Race Weekend Hub',
        caption: 'Live countdown, session schedule, circuit records, and championship ticker on apexf1hub.com.',
      },
      {
        src: '/projects/apex-f1-features.png',
        label: 'Predictions, Replay & AI Analyst',
        caption: 'Interactive race predictions, circuit telemetry replay, AI race analyst, and historical archive.',
      },
    ] as ProjectImage[],
    story:
      'Apex F1 Hub brings 76 years of Formula 1 race classifications, telemetry, and standings (back to 1950) into one fast web app. It runs automated 15-minute data syncs, an interactive race replay map, a prediction league, and an AI race analyst.',
    engineeringHighlights: [
      {
        title: '20% lower pole-position error on a 175-round backtest',
        detail:
          'Combined Random Forests, Elo ratings, and Monte Carlo simulation to cut pole prediction MAE from 3.595 to 2.872 (Spearman 0.762). Adding tyre feature engineering reduced race-pace MAE by another 5% (0.907 to 0.865).',
      },
      {
        title: 'Summary latency reduced from 14–90 s to a 1.7 s median',
        detail:
          'Benchmarked LLM inference providers and switched primary generation to Groq with an OpenRouter fallback and deterministic non-AI templates so race summaries load almost instantly.',
      },
      {
        title: '15-minute automated ETL with 156 test files',
        detail:
          'Python and GitHub Actions workflows sync Jolpica, OpenF1, and FastF1 APIs every 15 minutes, backed by data-consistency audits, Sentry alerts, and Playwright end-to-end CI checks.',
      },
    ],
    metric: { from: 3.595, to: 2.872, improvement: '20%', label: 'Pole Position MAE (175-round backtest)', base: 'Baseline' },
  },
  {
    name: 'Short-Term Wind Power Forecasting',
    subtitle: 'Deep Learning Comparative Study (LSTM, GRU & BiLSTM) Published in AIP',
    period: 'Jun 2023 – May 2024',
    url: 'https://github.com/adi-alt/Short-Term-Wind-Power-Forecasting',
    linkLabel: 'View GitHub Repo',
    stack: ['Python', 'TensorFlow / Keras', 'LSTM / GRU / BiLSTM', 'scikit-learn', 'Random Forest', 'pandas & NumPy', 'Rolling-Origin CV'],
    images: [
      {
        src: '/projects/wind-predictions.png',
        label: 'Forecast vs. Actual Output',
        caption: 'GRU, BiLSTM, and LSTM hourly power predictions (kW) plotted against actual fleet output over 1,000 test hours.',
      },
      {
        src: '/projects/wind-rose.png',
        label: 'Lakshadweep Wind Rose',
        caption: 'Directional wind-speed distribution (m/s) showing the dominant monsoon regimes that drive turbine output.',
      },
      {
        src: '/projects/wind-forecasting-repo.png',
        label: 'Reusable Pipeline Repo',
        caption: 'Modular Python pipeline shared across both Indian wind farm sites for training, tuning, and cross-validation.',
      },
    ] as ProjectImage[],
    story:
      'Conducted exploratory data analysis and time-series modelling on 52,560 hourly records (26,280 per site across 2 sites in Lakshadweep and Karnataka), benchmarking 6 deep-learning model variants across LSTM, GRU, and BiLSTM architectures.',
    engineeringHighlights: [
      {
        title: 'Test MSE of 0.1556 (3.8% below LSTM) and 0.1309 (9.7% below LSTM)',
        detail:
          'Evaluated robustness with 5-fold rolling-origin cross-validation (Lakshadweep GRU MSE 0.263 ± 0.083) and grid-search tuning, reducing test MSE from 0.1618 to 0.1556 (Lakshadweep) and from 0.1449 to 0.1309 (Karnataka).',
      },
      {
        title: 'Environmental driver attribution',
        detail:
          'Assessed variable impact using correlation analysis and Random Forest feature importance across meteorological variables, identifying wind speed as the primary driver of power output.',
      },
      {
        title: 'Published in AIP Conference Proceedings',
        detail:
          'Published the comparative findings in AIP Conference Proceedings (2025) and packaged the training, tuning, and evaluation workflow into a reusable open-source Python pipeline.',
      },
    ],
    metric: { from: 0.1449, to: 0.1309, improvement: '9.7%', label: 'Test MSE · Karnataka (vs. LSTM)', base: 'LSTM Baseline' },
  },
]

export const skills = [
  {
    group: 'Programming',
    note: 'Used daily for data pipelines, backend services, and numerical modelling',
    items: ['Python', 'C++', 'SQL', 'TypeScript', 'JavaScript'],
  },
  {
    group: 'Data Analytics & Visualization',
    note: 'Statistical analysis, scientific plotting, and executive KPI reporting',
    items: [
      'Exploratory Data Analysis (EDA)',
      'Statistical Analysis',
      'pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'KPI & Dashboard Reporting',
      'Feature Engineering',
      'Cross-Validation',
      'Correlation Analysis',
    ],
  },
  {
    group: 'Data Engineering & Databases',
    note: 'Relational storage, batch ETL syncs, and real-time event streaming',
    items: ['PostgreSQL', 'Supabase', 'Automated ETL Pipelines', 'Elasticsearch', 'Apache Kafka'],
  },
  {
    group: 'Machine Learning & AI',
    note: 'Sequence architectures, predictive modelling, and RLHF evaluation',
    items: [
      'scikit-learn',
      'Random Forest',
      'TensorFlow / Keras',
      'PyTorch',
      'LSTM / GRU / BiLSTM',
      'Time-Series Forecasting',
      'Predictive Modelling',
      'Monte Carlo Simulation',
      'LLM Evaluation',
      'RLHF',
    ],
  },
  {
    group: 'Web Development & DevOps',
    note: 'Full-stack delivery from REST APIs to automated end-to-end CI checks',
    items: [
      'Next.js',
      'React',
      'Node.js',
      'Express.js',
      'REST APIs',
      'Git',
      'GitHub Actions (CI/CD)',
      'Playwright',
      'Sentry',
    ],
  },
  {
    group: 'CAD & PCB Automation',
    note: 'Programmatic electronics schematics and parametric 3D models',
    items: ['Python (build123d, SKiDL)', 'KiCad', 'PCB Design'],
  },
]

export const publication = {
  title: 'Wind Power Forecasting Using Deep Learning Models A Comparative Study',
  authors: 'A. Verma, P. Aggarwal, A. Yadav, A. Kumar',
  venue: 'AIP Conference Proceedings 3297(1), Article 090030 · AIP Publishing, 2025 (ICOTET)',
  summary:
    'Comparative study evaluating LSTM, GRU, and BiLSTM architectures across 52,560 hourly records from two Indian sites (Lakshadweep and Karnataka), achieving test MSE values of 0.1556 (3.8% below LSTM) and 0.1309 (9.7% below LSTM) alongside 5-fold rolling-origin cross-validation.',
  url: 'https://pubs.aip.org/aip/acp/article-abstract/3297/1/090030/3369776/Wind-power-forecasting-using-deep-learning-models',
}

export const leadership = [
  {
    title: 'Advisory Consultant',
    org: '180DC-NSUT (2023)',
    text: 'Drove a 20% improvement in client operations across 3 consulting projects through quantitative market research on social commerce.',
  },
  {
    title: 'Team Lead · Smart India Hackathon',
    org: 'NSUT Squad (2023)',
    text: 'Led a 6-member team building an E-Waste Facility Locator that estimated recovery value from precious-metal composition data.',
  },
  {
    title: 'Security Head · Moksha-Innovision',
    org: 'NSUT Cultural Fest (2023 & 2024)',
    text: 'Coordinated on-ground operations and logistics for 200+ student volunteers at the university cultural festival.',
  },
]
