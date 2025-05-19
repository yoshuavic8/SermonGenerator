export type SermonStructureType =
  | "topical"
  | "exegesis"
  | "textual"
  | "expository"
  | "narrative";

export type AudienceType = "general" | "youth";

export interface SermonFormData {
  topic: string;
  bibleVerse?: string;
  structure: SermonStructureType;
  audience: AudienceType;
  customPromptOptions?: {
    includePurpose?: boolean;
    includeBibleResearch?: boolean;
    includeApplications?: boolean;
    includeCallToAction?: boolean;
    customInstructions?: string;
  };
}

export interface SermonResponse {
  content: string;
  error?: string;
}

export interface SermonHistoryItem {
  id: string;
  date: string;
  topic: string;
  bibleVerse?: string;
  structure: SermonStructureType;
  audience: AudienceType;
  content: string;
}
