export type AgentOperatorOffer = {
  id: string;
  repoName: string;
  repoUrl: string;
  product: string;
  service: string;
  marketRateCredits: number;
  marketRatePriceCents: number;
  pipeline: string[];
};

export const AGENT_OPERATOR_OFFERS: AgentOperatorOffer[] = [
  {
    id: "awesome-llm-apps",
    repoName: "awesome-llm-apps",
    repoUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps",
    product: "Production AI application blueprints",
    service: "Build and launch production-ready LLM applications",
    marketRateCredits: 8,
    marketRatePriceCents: 240000,
    pipeline: ["Assess use case and success metric", "Select reference architecture", "Implement and validate MVP", "Deploy and monitor KPI loop"],
  },
  {
    id: "langchain",
    repoName: "LangChain",
    repoUrl: "https://github.com/langchain-ai/langchain",
    product: "LLM app framework",
    service: "Design modular AI workflow chains for business operations",
    marketRateCredits: 6,
    marketRatePriceCents: 180000,
    pipeline: ["Map workflow inputs/outputs", "Build chain modules", "Integrate tools + prompts", "Harden for production use"],
  },
  {
    id: "langgraph",
    repoName: "LangGraph",
    repoUrl: "https://github.com/langchain-ai/langgraph",
    product: "Agent orchestration runtime",
    service: "Build stateful production agent systems",
    marketRateCredits: 10,
    marketRatePriceCents: 320000,
    pipeline: ["Design state graph", "Define nodes + transitions", "Implement retries/guards", "Ship observability and ops runbook"],
  },
  {
    id: "crewai",
    repoName: "CrewAI",
    repoUrl: "https://github.com/crewAIInc/crewAI",
    product: "Multi-agent coordination framework",
    service: "Deploy multi-agent teams for research and execution",
    marketRateCredits: 9,
    marketRatePriceCents: 285000,
    pipeline: ["Define agent roles", "Design task handoffs", "Connect shared context", "Tune quality and latency"],
  },
  {
    id: "ollama",
    repoName: "Ollama",
    repoUrl: "https://github.com/ollama/ollama",
    product: "Local LLM runtime",
    service: "Set up private/local model environments",
    marketRateCredits: 5,
    marketRatePriceCents: 150000,
    pipeline: ["Select model and hardware", "Install and baseline inference", "Integrate local workloads", "Establish update + governance policy"],
  },
  {
    id: "awesome-mcp-servers",
    repoName: "awesome-mcp-servers",
    repoUrl: "https://github.com/punkpeye/awesome-mcp-servers",
    product: "MCP integration catalog",
    service: "Implement MCP-based tool connectivity for agents",
    marketRateCredits: 7,
    marketRatePriceCents: 210000,
    pipeline: ["Audit required tools", "Select MCP servers", "Implement secure context pathways", "Validate task completion paths"],
  },
  {
    id: "qdrant",
    repoName: "Qdrant",
    repoUrl: "https://github.com/qdrant/qdrant",
    product: "Vector database for RAG",
    service: "Deploy retrieval systems and semantic search pipelines",
    marketRateCredits: 8,
    marketRatePriceCents: 250000,
    pipeline: ["Model document ingestion", "Build embedding pipeline", "Tune retrieval + reranking", "Measure relevance + response quality"],
  },
  {
    id: "ai-agents-for-beginners",
    repoName: "AI-Agents-for-Beginners",
    repoUrl: "https://github.com/microsoft/ai-agents-for-beginners",
    product: "Agent training curriculum",
    service: "Upskill internal teams into Agent Operators",
    marketRateCredits: 4,
    marketRatePriceCents: 120000,
    pipeline: ["Baseline current skill level", "Run guided lessons", "Apply on internal workflow", "Certify operating playbook"],
  },
  {
    id: "system-design-primer",
    repoName: "system-design-primer",
    repoUrl: "https://github.com/donnemartin/system-design-primer",
    product: "System design patterns",
    service: "Architect scalable AI/agent infrastructure",
    marketRateCredits: 9,
    marketRatePriceCents: 300000,
    pipeline: ["Define non-functional requirements", "Choose architecture pattern", "Model capacity + failure paths", "Document scaling and reliability strategy"],
  },
  {
    id: "awesome-claude-code",
    repoName: "awesome-claude-code",
    repoUrl: "https://github.com/hesreallyhim/awesome-claude-code",
    product: "Claude Code implementation playbook",
    service: "Deploy coding agents into engineering workflows",
    marketRateCredits: 7,
    marketRatePriceCents: 225000,
    pipeline: ["Identify engineering bottlenecks", "Configure agent roles + guardrails", "Integrate with repo workflow", "Track velocity and quality improvements"],
  },
];

export const MARKET_RATE_PACKS = [
  { slug: "starter", title: "Starter pack", credits: 3, priceCents: 90000, displayOrder: 1 },
  { slug: "bench", title: "Bench pack", credits: 8, priceCents: 224000, displayOrder: 2 },
  { slug: "field", title: "Field pack", credits: 20, priceCents: 520000, displayOrder: 3 },
] as const;
