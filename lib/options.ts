// Canonical picker options for listing niches + platforms. Single
// source of truth shared between /sell/new (create) and
// /dashboard/listings/[id]/edit (update) — adding a niche or platform
// here lights it up in both places.

export const NICHE_OPTIONS = [
  'Real Estate',
  'Property Mgmt',
  'Tradies',
  'Builders',
  'Plumbers',
  'Electricians',
  'Accountants',
  'Bookkeepers',
  'Lawyers',
  'Consultants',
  'Coaches',
  'E-commerce',
  'Hospitality',
  'Restaurants',
  'Cafes',
  'Healthcare',
  'Dentists',
  'Vets',
  'Therapists',
  'Education',
  'Tutors',
  'Fitness',
  'Salons',
  'Marketing',
  'Agencies',
  'Recruiters',
  'Photographers',
  'Designers',
]

export const PLATFORM_OPTIONS = [
  // 2026 refresh — Claude ecosystem front + centre (Anthropic's Skills
  // + MCP are the fastest-growing native distribution surfaces), then
  // major consumer LLMs, then AI code editors (Cursor/Windsurf sell
  // via rule/skill files), then aggregation / automation platforms,
  // then open + local models.
  'Claude Skills',
  'Claude',
  'MCP',
  'ChatGPT',
  'Grok',
  'Grok Bots',
  'Gemini',
  'Cursor',
  'Windsurf',
  'OpenClaw',
  'Manus',
  'Hermes',
  'Ollama',
  'Mistral',
  'DeepSeek',
  'n8n',
  'Make',
  'Zapier',
]
