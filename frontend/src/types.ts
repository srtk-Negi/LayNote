export type TravelType = "general" | "layover";

export interface Question {
  id: string;
  question: string;
  type: "single" | "multiple" | "text" | "date";
  options?: string[];
  placeholder?: string;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  amenities: {
    lounges: string[];
    dining: string[];
    shopping: string[];
  };
}
