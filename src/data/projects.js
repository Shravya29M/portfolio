export const projects = [
  {
    id: 1,
    slug: 'elyssa',
    title: 'Elyssa',
    description:
      'An AI therapist — architected as microservices (inference, sentiment, response) deployed on Kubernetes. Holds Indian Patent No. 202541093582A.',
    tags: ['Python', 'Docker', 'Kubernetes', 'LLMs', 'FastAPI'],
    github: 'https://github.com/Shravya29M/Elyssa',
    live: null,
    featured: true,
    badge: 'Featured',
    year: '2024',
    role: 'Architect & ML Engineer',
    duration: '6 months',
    heroImage:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    ],
    longDescription:
      "Elyssa started as a question I kept circling: what would it take for an AI therapist to feel like more than a chatbot? Mental health support is hard to access, and while no model can replace a clinician, the gap between 'nothing' and 'something thoughtful' felt worth closing.\n\nI architected Elyssa as a set of independent microservices — inference, sentiment analysis, and response generation — each containerized and orchestrated on Kubernetes. The split lets us scale the heavy LLM calls separately from the lighter sentiment pipeline, and it makes the system actually debuggable in production.\n\nThe work eventually led to Indian Patent No. 202541093582A, which I'm proud of, but honestly the part I learned the most from was watching real conversations route through the system and tuning how the services talk to each other.",
    problem:
      'Existing mental-health chatbots tend to be monolithic, hard to scale, and brittle when the conversation drifts off-script. There was no clean way to swap models or independently scale the components that actually need it.',
    solution:
      'A microservices architecture with a FastAPI gateway, a dedicated inference service for the LLM, a sentiment service, and a response composer. Each service owns its own state, scales independently, and can be replaced without touching the others.',
    architecture:
      'FastAPI gateway → routes requests to the inference service (LLM), sentiment service (BERT-based classifier), and a response composer that blends outputs into a single empathetic reply. Everything runs as Docker containers under Kubernetes with horizontal pod autoscaling on the inference service.',
    challenges: [
      'Keeping latency low while routing through three services per turn',
      'Designing a sentiment-aware response layer that did not feel robotic',
      'Patent filing and prior-art research alongside the engineering work',
    ],
    outcomes: [
      'Granted Indian Patent No. 202541093582A',
      'Sub-second median response across the full pipeline',
      'Clean separation of concerns that made model swaps trivial',
    ],
    techStack: [
      'Python',
      'FastAPI',
      'PyTorch',
      'HuggingFace Transformers',
      'Docker',
      'Kubernetes',
      'Redis',
    ],
  },
  {
    id: 2,
    slug: 'viz-public-trust',
    title: 'Interactive Visualization Platform',
    description:
      'Built for my Scientific Visualization course at Brown — UMAP clustering + custom radial encodings for high-dimensional survey data. User study (n=25) showed 18.5% faster task completion.',
    tags: ['JavaScript', 'UMAP', 'D3.js', 'HTML/CSS'],
    github: 'https://github.com/Shravya29M/VizPublicTrust',
    live: 'https://viz.gordanmilovac.com',
    featured: false,
    year: '2025',
    role: 'Designer & Engineer',
    duration: '1 semester',
    heroImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ],
    longDescription:
      "This was my final project for Brown's Scientific Visualization course, and it ended up being the most fun I've had with a class assignment in a while. The dataset was a public-trust survey with dozens of dimensions per respondent — exactly the kind of thing that turns into a wall of bar charts if you're not careful.\n\nI wanted something that let people actually explore the structure of the data, so I leaned on UMAP for the clustering and built custom radial glyphs in D3 for each respondent. The radial encoding meant you could compare two clusters at a glance instead of squinting at parallel coordinates.\n\nWe ran a small user study (n=25) and the radial+UMAP combo came out 18.5% faster than the baseline view on comparison tasks. Small win, but it was real.",
    problem:
      'Public-trust survey data is high-dimensional and the standard tools (parallel coordinates, heatmaps) make cross-cluster comparison painful.',
    solution:
      'UMAP for 2D projection plus custom radial glyphs that encode each respondent compactly enough to compare clusters side by side.',
    architecture:
      'Static frontend (vanilla JS + D3) loading a precomputed UMAP projection. Radial glyphs are drawn per-point on demand, with brushing and linked highlighting between the projection view and the detail panel.',
    challenges: [
      'Designing a radial encoding that stayed legible at small sizes',
      'Tuning UMAP parameters so clusters were stable across reloads',
      'Running and analyzing the user study under a tight deadline',
    ],
    outcomes: [
      '18.5% faster task completion vs. baseline (n=25)',
      'Deployed live at viz.gordanmilovac.com',
      'Positive feedback from the course instructors',
    ],
    techStack: ['JavaScript', 'D3.js', 'UMAP', 'HTML/CSS', 'Python (preprocessing)'],
  },
  {
    id: 3,
    slug: 'auto-news-summarizer',
    title: 'AutoNewsSummarizer',
    description:
      'FastAPI backend that takes a URL, pulls the article, and summarizes it using BART + BERT. Real-time, low-latency.',
    tags: ['FastAPI', 'PyTorch', 'BART', 'BERT', 'NLP'],
    github: 'https://github.com/Shravya29M/Abstractive-Text-Summarization',
    live: null,
    featured: false,
    year: '2023',
    role: 'Solo build',
    duration: '3 weeks',
    heroImage:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&q=80',
    ],
    longDescription:
      "I built this because I was drowning in tabs. The idea was simple: paste a URL, get a summary that's actually readable, in under a second. The interesting part was getting BART and BERT to play nicely in the same pipeline without blowing the latency budget.\n\nFastAPI handles the request, a scraper pulls the article body, BERT does the extractive pass to pick the important sentences, and BART rewrites them abstractively. The two-stage approach meant BART had less to chew on and the responses stayed fast.",
    problem:
      'Most summarizers are either accurate but slow, or fast but extractive and stiff. I wanted both.',
    solution:
      'A two-stage extractive→abstractive pipeline: BERT picks salient sentences, BART rewrites them into a fluent summary.',
    architecture:
      'FastAPI endpoint → article scraper → BERT extractor → BART summarizer → JSON response. All running in a single container.',
    challenges: [
      'Handling messy HTML from arbitrary news sites',
      'Keeping BART inference fast enough for an interactive feel',
    ],
    outcomes: [
      'Sub-second end-to-end on average news articles',
      'Clean REST API that I still use for my own reading list',
    ],
    techStack: ['Python', 'FastAPI', 'PyTorch', 'HuggingFace', 'BeautifulSoup'],
  },
  {
    id: 4,
    slug: 'alzheimers-detection',
    title: "Alzheimer's Detection",
    description:
      "Deep learning pipeline (DenseNet201 + VGG16 with CUDA acceleration) for classifying Alzheimer's from brain scans. Published in IEEE ICICNIS 2024.",
    tags: ['TensorFlow', 'DenseNet201', 'VGG16', 'CUDA', 'Medical Imaging'],
    github: 'https://github.com/Shravya29M/Alzeihmer-s-Detection',
    live: null,
    featured: false,
    badge: 'IEEE Published',
    year: '2024',
    role: 'Lead author',
    duration: '4 months',
    heroImage:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80',
      'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80',
    ],
    longDescription:
      "This was my first end-to-end medical imaging project and it taught me how careful you have to be with healthcare data. The dataset was small, imbalanced, and the cost of a false negative is real. We landed on an ensemble — DenseNet201 and VGG16 — because no single backbone was reliable enough on its own.\n\nThe paper made it into IEEE ICICNIS 2024, which felt great, but the part I'm prouder of is the preprocessing pipeline. Half the gains came from getting the input data right.",
    problem:
      "Early Alzheimer's detection from MRI is hard because the visual differences are subtle and datasets are small.",
    solution:
      'Ensemble two pretrained backbones (DenseNet201 + VGG16), aggressive preprocessing, CUDA-accelerated training, and careful evaluation across multiple folds.',
    architecture:
      'Preprocessing pipeline → DenseNet201 + VGG16 in parallel → soft-vote ensemble → final classification. Trained on a CUDA-enabled GPU.',
    challenges: [
      'Class imbalance and small dataset size',
      'Avoiding overfitting on the validation folds',
      'Writing the IEEE paper in parallel with the code',
    ],
    outcomes: [
      'Published at IEEE ICICNIS 2024',
      'Strong validation accuracy across folds',
      'Reusable preprocessing pipeline I have leaned on in later projects',
    ],
    techStack: ['Python', 'TensorFlow', 'Keras', 'CUDA', 'NumPy', 'OpenCV'],
  },
  {
    id: 5,
    slug: 'schizophrenia-detection',
    title: 'Schizophrenia Detection',
    description:
      'ML pipeline for detecting schizophrenia from clinical data — part of my broader healthcare AI research focus.',
    tags: ['Python', 'Scikit-learn', 'Jupyter'],
    github: 'https://github.com/Shravya29M/Schizophrenia-Detection',
    live: null,
    featured: false,
    year: '2023',
    role: 'Researcher',
    duration: '2 months',
    heroImage:
      'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80',
    ],
    longDescription:
      "A research-style project applying classical ML to a structured clinical dataset. The goal wasn't to build a product — it was to see how far you could get without deep learning when the dataset is small and interpretability matters. Turns out, pretty far.",
    problem:
      'Clinical datasets for schizophrenia are small, and interpretability matters more than raw accuracy for downstream use.',
    solution:
      'Classical ML pipeline (logistic regression, random forests, SVMs) with careful feature engineering and cross-validation.',
    architecture:
      'Pandas-based preprocessing → feature engineering → scikit-learn model zoo → cross-validation harness → interpretability plots.',
    challenges: [
      'Small sample size',
      'Balancing accuracy with interpretability',
    ],
    outcomes: [
      'Comparable accuracy to deep models on this dataset size',
      'Interpretable feature importances for downstream discussion',
    ],
    techStack: ['Python', 'scikit-learn', 'pandas', 'Jupyter', 'matplotlib'],
  },
  {
    id: 6,
    slug: 'ipfs-healthcare',
    title: 'IPFS for Healthcare',
    description:
      'Explored decentralized file storage for healthcare records using IPFS — because patient data deserves better than a single point of failure.',
    tags: ['JavaScript', 'IPFS', 'Blockchain', 'Healthcare'],
    github: 'https://github.com/Shravya29M/IPFS-For-Healthcare',
    live: null,
    featured: false,
    year: '2023',
    role: 'Solo build',
    duration: '1 month',
    heroImage:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    ],
    longDescription:
      "This one was an exploration. Centralized health record systems have a long history of breaches and outages, and I wanted to see what it actually feels like to build on top of IPFS for that use case. The answer: surprisingly workable for storage, still rough for access control.",
    problem:
      'Centralized healthcare record systems are a single point of failure and a high-value breach target.',
    solution:
      'A small prototype that stores encrypted patient records on IPFS with content-addressed retrieval and a thin permissioning layer.',
    architecture:
      'Browser client → encryption layer → IPFS node → content hash registry. Permissioning handled with a lightweight smart contract sketch.',
    challenges: [
      'Access control on a content-addressed store',
      'Key management for patients vs. providers',
    ],
    outcomes: [
      'Working prototype demonstrating encrypted upload + retrieval',
      'A much clearer view of where decentralized storage helps and where it does not',
    ],
    techStack: ['JavaScript', 'IPFS', 'Node.js', 'Solidity (sketch)'],
  },
];
