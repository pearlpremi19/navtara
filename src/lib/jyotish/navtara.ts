export type TaraNature = "benefic" | "malefic" | "mixed";

export type Tara = {
  id: number;
  key: string;
  name: string;
  sanskrit: string;
  meaning: string;
  nature: TaraNature;
  ranks: [number, number, number];
  cycleLabels: [string, string, string];
  summary: string;
  suited: string[];
  avoid: string[];
};

export const TARAS: Tara[] = [
  {
    id: 0,
    key: "janma",
    name: "Janma",
    sanskrit: "जन्म",
    meaning: "Birth",
    nature: "mixed",
    ranks: [1, 10, 19],
    cycleLabels: ["Janma", "Karma", "Adhana"],
    summary:
      "The Moon returns to your own star. Sensitivity, health, and self-inquiry rise. Classical texts treat the day with respect, not as a launch pad.",
    suited: ["Meditation", "Rest", "Intention setting"],
    avoid: ["New ventures", "Surgery", "Long journeys"],
  },
  {
    id: 1,
    key: "sampat",
    name: "Sampat",
    sanskrit: "संपत्",
    meaning: "Wealth",
    nature: "benefic",
    ranks: [2, 11, 20],
    cycleLabels: ["Sampat", "Anusampat", "Trisampat"],
    summary:
      "Resources, gains, and material ease. One of the strongest windows for money, trade, and gathering what you need.",
    suited: ["Investments", "Business", "Purchases"],
    avoid: ["Wasteful spending"],
  },
  {
    id: 2,
    key: "vipat",
    name: "Vipat",
    sanskrit: "विपत्",
    meaning: "Calamity",
    nature: "malefic",
    ranks: [3, 12, 21],
    cycleLabels: ["Vipat", "Anuvipat", "Trivipat"],
    summary:
      "Danger of reversal. Plans that look settled can break. Keep the day small; do not invite risk.",
    suited: ["Review", "Study", "Quiet work"],
    avoid: ["Travel", "Surgery", "Commitments"],
  },
  {
    id: 3,
    key: "kshema",
    name: "Kshema",
    sanskrit: "क्षेम",
    meaning: "Welfare",
    nature: "benefic",
    ranks: [4, 13, 22],
    cycleLabels: ["Kshema", "Anukshema", "Trikshema"],
    summary:
      "Comfort, healing, and ease after strain. A day that restores rather than demands.",
    suited: ["Healing", "Family", "Settling in"],
    avoid: ["Unnecessary conflict"],
  },
  {
    id: 4,
    key: "pratyari",
    name: "Pratyari",
    sanskrit: "प्रत्यरी",
    meaning: "Obstacle",
    nature: "malefic",
    ranks: [5, 14, 23],
    cycleLabels: ["Pratyari", "Anupratyari", "Tripratyari"],
    summary:
      "Opposition and delay. Progress meets a wall. Better to clear the path than to force it.",
    suited: ["Planning", "Repair", "Patience"],
    avoid: ["Launches", "Confrontations", "Legal starts"],
  },
  {
    id: 5,
    key: "sadhaka",
    name: "Sadhaka",
    sanskrit: "साधक",
    meaning: "Accomplishment",
    nature: "benefic",
    ranks: [6, 15, 24],
    cycleLabels: ["Sadhaka", "Anusadhaka", "Trisadhaka"],
    summary:
      "Work takes. A favoured tara for beginning projects, sitting exams, and asking for results.",
    suited: ["New work", "Study", "Applications"],
    avoid: ["Idleness"],
  },
  {
    id: 6,
    key: "naidhana",
    name: "Naidhana",
    sanskrit: "नैधन",
    meaning: "Dissolution",
    nature: "malefic",
    ranks: [7, 16, 25],
    cycleLabels: ["Naidhana", "Anunaidhana", "Trinaidhana"],
    summary:
      "The most unfavourable tara. Endings, loss, and depletion. Keep rituals simple and postpone what can wait.",
    suited: ["Release", "Rest", "Closure"],
    avoid: ["Auspicious rites", "Travel", "Contracts"],
  },
  {
    id: 7,
    key: "mitra",
    name: "Mitra",
    sanskrit: "मित्र",
    meaning: "Friend",
    nature: "benefic",
    ranks: [8, 17, 26],
    cycleLabels: ["Mitra", "Anumitra", "Trimitra"],
    summary:
      "Allies, goodwill, and ease with others. A kind day for meetings, visits, and asking help.",
    suited: ["Meetings", "Alliances", "Visits"],
    avoid: ["Isolation"],
  },
  {
    id: 8,
    key: "atimitra",
    name: "Ati Mitra",
    sanskrit: "अतिमित्र",
    meaning: "Great friend",
    nature: "benefic",
    ranks: [9, 18, 27],
    cycleLabels: ["Ati Mitra", "Paramitra", "Maha Mitra"],
    summary:
      "The most supportive tara. Grace, protection, and things that open without being forced.",
    suited: ["Ceremonies", "Beginnings", "Travel"],
    avoid: ["Pessimism"],
  },
];

export function offsetFromJanma(transitIndex: number, janmaIndex: number): number {
  return (transitIndex - janmaIndex + 27) % 27;
}

export function taraFromOffset(offset: number): Tara {
  return TARAS[offset % 9]!;
}

export function taraForNakshatra(transitIndex: number, janmaIndex: number): Tara {
  return taraFromOffset(offsetFromJanma(transitIndex, janmaIndex));
}

export function nakshatrasForTara(janmaIndex: number, taraId: number): number[] {
  return [0, 9, 18].map((cycle) => (janmaIndex + taraId + cycle) % 27);
}

export function natureLabel(nature: TaraNature): string {
  if (nature === "benefic") return "Auspicious";
  if (nature === "malefic") return "Caution";
  return "Mixed";
}
