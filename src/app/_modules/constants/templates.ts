import type { Template, TemplateSlot } from "../types/workspace.types"

const founders: TemplateSlot[] = [
  { doodleId: "desk-1", defaultPosition: { x: 0, y: 80 } },
  { doodleId: "chair", defaultPosition: { x: -20, y: 240 } },
  { doodleId: "monitor-1", defaultPosition: { x: -60, y: -40 } },
  { doodleId: "lamp-1", defaultPosition: { x: 200, y: 0 } },
]

const trading: TemplateSlot[] = [
  { doodleId: "desk-3", defaultPosition: { x: 0, y: 100 } },
  { doodleId: "chair", defaultPosition: { x: -20, y: 260 } },
  { doodleId: "monitor-2", defaultPosition: { x: -160, y: -40 } },
  { doodleId: "monitor-3", defaultPosition: { x: 40, y: -40 } },
  { doodleId: "lamp-2", defaultPosition: { x: 220, y: 20 } },
]

const creator: TemplateSlot[] = [
  { doodleId: "desk-2", defaultPosition: { x: 0, y: 100 } },
  { doodleId: "chair", defaultPosition: { x: -20, y: 260 } },
  { doodleId: "monitor-1", defaultPosition: { x: -60, y: -40 } },
  { doodleId: "lamp-2", defaultPosition: { x: 220, y: 0 } },
  { doodleId: "keyboard-fallback", defaultPosition: { x: -120, y: 140 } },
]

const minimal: TemplateSlot[] = [
  { doodleId: "desk-1", defaultPosition: { x: 0, y: 80 } },
  { doodleId: "chair", defaultPosition: { x: -20, y: 240 } },
  { doodleId: "monitor-2", defaultPosition: { x: -60, y: -40 } },
  { doodleId: "keyboard-fallback", defaultPosition: { x: -120, y: 140 } },
]

export const TEMPLATES: Template[] = [
  {
    id: "founders-oasis",
    emoji: "🌴",
    name: "Founder's Oasis",
    description: "Premium solo setup for Canggu coders.",
    slots: founders,
  },
  {
    id: "trading-floor",
    emoji: "📊",
    name: "Trading floor",
    description: "Multi-monitor workstation for serious screen time.",
    slots: trading,
  },
  {
    id: "creator-studio",
    emoji: "🎬",
    name: "Creator studio",
    description: "YouTuber-grade setup, mic and lighting included.",
    slots: creator,
  },
  {
    id: "minimal-nomad",
    emoji: "🏝",
    name: "Minimal nomad",
    description: "Compact kit for the road-warrior solo dev.",
    slots: minimal,
  },
]
