export type StateCode =
  | "TN" | "KA" | "MH" | "DL" | "KL" | "AP" | "TG" | "GJ" | "UP" | "WB";

export const STATES: { code: StateCode; name: string }[] = [
  { code: "TN", name: "Tamil Nadu" },
  { code: "KA", name: "Karnataka" },
  { code: "MH", name: "Maharashtra" },
  { code: "DL", name: "Delhi" },
  { code: "KL", name: "Kerala" },
  { code: "AP", name: "Andhra Pradesh" },
  { code: "TG", name: "Telangana" },
  { code: "GJ", name: "Gujarat" },
  { code: "UP", name: "Uttar Pradesh" },
  { code: "WB", name: "West Bengal" },
];

export type Violation = {
  id: string;
  label: string;
  description: string;
  fines: Partial<Record<StateCode, number>>;
  consequence: string;
};

export const VIOLATIONS: Violation[] = [
  {
    id: "no-helmet",
    label: "Riding without Helmet",
    description: "Two-wheeler rider or pillion without ISI helmet.",
    fines: { TN: 1000, KA: 500, MH: 500, DL: 1000, KL: 1000, AP: 1000, TG: 1000, GJ: 500, UP: 1000, WB: 1000 },
    consequence: "Disqualification of license for 3 months under MV Act §194D.",
  },
  {
    id: "no-seatbelt",
    label: "Driving without Seatbelt",
    description: "Driver or front passenger without fastened seatbelt.",
    fines: { TN: 1000, KA: 500, MH: 200, DL: 1000, KL: 500, AP: 1000, TG: 1000, GJ: 500, UP: 1000, WB: 500 },
    consequence: "Compounding fine under §194B of the Motor Vehicles Act.",
  },
  {
    id: "overspeed",
    label: "Overspeeding (LMV)",
    description: "Driving above the posted speed limit for the vehicle class.",
    fines: { TN: 1000, KA: 1000, MH: 2000, DL: 2000, KL: 1500, AP: 1500, TG: 1500, GJ: 1500, UP: 2000, WB: 1500 },
    consequence: "Up to ₹4,000 for HMV. Repeat offence: license suspension.",
  },
  {
    id: "drunk-driving",
    label: "Drunk Driving",
    description: "Driving with BAC above 30mg/100ml of blood.",
    fines: { TN: 10000, KA: 10000, MH: 10000, DL: 10000, KL: 10000, AP: 10000, TG: 10000, GJ: 10000, UP: 10000, WB: 10000 },
    consequence: "Up to 6 months jail (1st offence). 2 years + ₹15,000 (repeat).",
  },
  {
    id: "mobile-driving",
    label: "Mobile use while driving",
    description: "Holding or operating a mobile phone while driving.",
    fines: { TN: 1000, KA: 1500, MH: 1000, DL: 5000, KL: 2000, AP: 1000, TG: 1000, GJ: 1500, UP: 5000, WB: 2000 },
    consequence: "Up to ₹10,000 for repeat offences under §184.",
  },
  {
    id: "signal-jump",
    label: "Jumping Red Signal",
    description: "Crossing a stop line on a red traffic signal.",
    fines: { TN: 1000, KA: 500, MH: 1000, DL: 5000, KL: 1500, AP: 1000, TG: 1000, GJ: 500, UP: 5000, WB: 1000 },
    consequence: "License suspension for 3 months on repeat.",
  },
  {
    id: "no-parking",
    label: "No-Parking Violation",
    description: "Vehicle parked in a no-parking zone.",
    fines: { TN: 500, KA: 500, MH: 500, DL: 500, KL: 250, AP: 500, TG: 500, GJ: 500, UP: 500, WB: 100 },
    consequence: "Towing charges + compounding fine.",
  },
  {
    id: "no-license",
    label: "Driving without Licence",
    description: "Operating a vehicle without a valid driving licence.",
    fines: { TN: 5000, KA: 5000, MH: 5000, DL: 5000, KL: 5000, AP: 5000, TG: 5000, GJ: 5000, UP: 5000, WB: 5000 },
    consequence: "3 months imprisonment or fine, vehicle impoundment.",
  },
];

export const SPEED_LIMITS: Record<StateCode, { city: number; highway: number; expressway: number }> = {
  TN: { city: 50, highway: 80, expressway: 100 },
  KA: { city: 50, highway: 80, expressway: 100 },
  MH: { city: 50, highway: 80, expressway: 120 },
  DL: { city: 50, highway: 70, expressway: 100 },
  KL: { city: 50, highway: 70, expressway: 90 },
  AP: { city: 50, highway: 80, expressway: 100 },
  TG: { city: 50, highway: 80, expressway: 100 },
  GJ: { city: 50, highway: 80, expressway: 120 },
  UP: { city: 50, highway: 80, expressway: 100 },
  WB: { city: 50, highway: 70, expressway: 100 },
};

export const STATE_RULES: Record<StateCode, string[]> = {
  TN: [
    "Helmet mandatory for both rider and pillion (Tamil Nadu MV Rules).",
    "High beam prohibited within city limits.",
    "Children below 4 years exempt from helmets.",
  ],
  KA: [
    "Pillion helmets enforced strictly in Bengaluru.",
    "FASTag mandatory for all 4-wheelers on toll roads.",
    "No honking in silence zones (hospitals, schools).",
  ],
  MH: [
    "Mumbai: No-entry hours for heavy vehicles between 8am–11am.",
    "Pune ring-road has automated speed cameras every 2km.",
    "Riding triples is a compoundable offence.",
  ],
  DL: [
    "Odd-Even scheme may apply during high pollution alerts.",
    "Diesel vehicles older than 10 years are banned.",
    "BS-VI compliance required for all new vehicles.",
  ],
  KL: [
    "Pollution Under Control (PUC) certificate mandatory.",
    "AI cameras (Safe Kerala) detect violations 24/7.",
    "Helmet rule applies even for short distances.",
  ],
  AP: [ "Speed governors mandatory for commercial vehicles.", "Helmets compulsory across all districts." ],
  TG: [ "Hyderabad uses e-challan with face recognition.", "Triple riding strictly penalized." ],
  GJ: [ "Bullet-proof helmet rule applies on highways.", "PUC checked at all toll plazas." ],
  UP: [ "Highest fines for signal jumping in NCR region.", "Yellow-line lane discipline enforced on Yamuna Expressway." ],
  WB: [ "Kolkata: No two-wheelers on certain flyovers during peak hours.", "Compulsory reflective stickers on all vehicles." ],
};
