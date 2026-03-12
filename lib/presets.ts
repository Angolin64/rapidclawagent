/**
 * RapidClawAgent - Preset Definitions
 * Template configurations for different use cases
 */

export interface AgentPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  monthlyEstimate: {
    min: number;
    max: number;
  };
  channels: string[];
  skills: string[];
  modelStack: {
    primary: string;
    heartbeat: string;
    subagents: string;
  };
  config: {
    contextTokens: number;
    thinkingDefault: string;
    heartbeatEvery: string;
    bootstrapMaxChars: number;
  };
  useCase: string[];
}

export const PRESETS: AgentPreset[] = [
  {
    id: "personal-assistant",
    name: "Personal Assistant",
    description: "Your 24/7 AI companion for email, calendar, reminders, and daily tasks",
    icon: "🤖",
    monthlyEstimate: {
      min: 15,
      max: 35
    },
    channels: ["telegram", "whatsapp"],
    skills: ["gog", "himalaya", "weather", "reminders"],
    modelStack: {
      primary: "anthropic/claude-sonnet-4.5",
      heartbeat: "google/gemini-2.0-flash",
      subagents: "openrouter/deepseek/deepseek-chat"
    },
    config: {
      contextTokens: 50000,
      thinkingDefault: "off",
      heartbeatEvery: "1h",
      bootstrapMaxChars: 10000
    },
    useCase: [
      "Email triage and responses",
      "Calendar management",
      "Daily briefings",
      "Task reminders",
      "Research assistance"
    ]
  },
  {
    id: "business-automation",
    name: "Business Automation",
    description: "Automate customer support, content creation, and team workflows",
    icon: "💼",
    monthlyEstimate: {
      min: 50,
      max: 100
    },
    channels: ["slack", "discord", "telegram"],
    skills: ["slack", "discord-hub", "summarize", "deep-research"],
    modelStack: {
      primary: "openai/gpt-5.2",
      heartbeat: "google/gemini-2.0-flash",
      subagents: "openrouter/minimax/minimax-text-01"
    },
    config: {
      contextTokens: 75000,
      thinkingDefault: "off",
      heartbeatEvery: "30m",
      bootstrapMaxChars: 15000
    },
    useCase: [
      "Customer support automation",
      "Content generation at scale",
      "Team notifications",
      "Data analysis",
      "Report generation"
    ]
  },
  {
    id: "developer-agent",
    name: "Developer Agent",
    description: "Code review, documentation, testing, and DevOps automation",
    icon: "👨‍💻",
    monthlyEstimate: {
      min: 30,
      max: 70
    },
    channels: ["discord", "slack"],
    skills: ["github", "skill-creator", "summarize"],
    modelStack: {
      primary: "anthropic/claude-sonnet-4.5",
      heartbeat: "google/gemini-2.0-flash",
      subagents: "openrouter/deepseek/deepseek-chat"
    },
    config: {
      contextTokens: 100000,
      thinkingDefault: "off",
      heartbeatEvery: "2h",
      bootstrapMaxChars: 20000
    },
    useCase: [
      "Code reviews",
      "Documentation generation",
      "Test automation",
      "CI/CD monitoring",
      "Stack Overflow research"
    ]
  }
];

export const MODEL_PRICING = {
  "anthropic/claude-sonnet-4.5": { input: 3.0, output: 15.0 },
  "anthropic/claude-haiku-4.5": { input: 0.25, output: 1.25 },
  "openai/gpt-5.2": { input: 2.5, output: 10.0 },
  "openai/gpt-4.1": { input: 2.5, output: 10.0 },
  "google/gemini-2.0-flash": { input: 0.1, output: 0.4 },
  "google/gemini-3-flash-preview": { input: 0.1, output: 0.4 },
  "openrouter/deepseek/deepseek-chat": { input: 0.25, output: 0.38 },
  "openrouter/minimax/minimax-text-01": { input: 0.3, output: 1.2 }
};

export function getPreset(id: string): AgentPreset | undefined {
  return PRESETS.find(p => p.id === id);
}

export function calculateMonthlyCost(
  preset: AgentPreset,
  messagesPerDay: number = 30
): number {
  const pricing = MODEL_PRICING[preset.modelStack.primary as keyof typeof MODEL_PRICING];
  
  // Rough estimate: avg 1k input tokens, 500 output tokens per message
  const primaryCost = messagesPerDay * 30 * ((1 * pricing.input) + (0.5 * pricing.output)) / 1000;
  
  // Heartbeat cost (much lower with Flash)
  const heartbeatPricing = MODEL_PRICING[preset.modelStack.heartbeat as keyof typeof MODEL_PRICING];
  const heartbeatsPerMonth = preset.config.heartbeatEvery === "1h" ? 720 : 1440;
  const heartbeatCost = heartbeatsPerMonth * ((0.5 * heartbeatPricing.input) + (0.1 * heartbeatPricing.output)) / 1000;
  
  // Sub-agent cost (assume 10% of messages spawn sub-agents)
  const subagentPricing = MODEL_PRICING[preset.modelStack.subagents as keyof typeof MODEL_PRICING];
  const subagentCost = (messagesPerDay * 30 * 0.1) * ((2 * subagentPricing.input) + (1 * subagentPricing.output)) / 1000;
  
  // VPS cost
  const vpsCost = 6.99;
  
  return Math.round(primaryCost + heartbeatCost + subagentCost + vpsCost);
}
