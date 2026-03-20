export type StudentStatus = "clear" | "warning" | "flagged";

export interface StudentSession {
  id: string;
  name: string;
  status: StudentStatus;
  trustScore: number;
  lastFlag: string | null;
  sentinelBattery: number;
  sentinelConnected: boolean;
  gazeStatus: "centered" | "away" | "unknown";
  heartbeatMs: number;
  flags: string[];
}

export const mockStudents: StudentSession[] = [
  { id: "s1", name: "Alice Chen", status: "clear", trustScore: 97, lastFlag: null, sentinelBattery: 82, sentinelConnected: true, gazeStatus: "centered", heartbeatMs: 120, flags: [] },
  { id: "s2", name: "Brian Kim", status: "warning", trustScore: 74, lastFlag: "GAZE_AWAY", sentinelBattery: 45, sentinelConnected: true, gazeStatus: "away", heartbeatMs: 95, flags: ["GAZE_AWAY"] },
  { id: "s3", name: "Carlos Ramirez", status: "clear", trustScore: 91, lastFlag: null, sentinelBattery: 68, sentinelConnected: true, gazeStatus: "centered", heartbeatMs: 110, flags: [] },
  { id: "s4", name: "Diana Osei", status: "flagged", trustScore: 32, lastFlag: "PHONE_DETECTED", sentinelBattery: 55, sentinelConnected: true, gazeStatus: "centered", heartbeatMs: 130, flags: ["PHONE_DETECTED", "GAZE_AWAY", "ALT_TAB"] },
  { id: "s5", name: "Elena Volkov", status: "clear", trustScore: 99, lastFlag: null, sentinelBattery: 91, sentinelConnected: true, gazeStatus: "centered", heartbeatMs: 88, flags: [] },
  { id: "s6", name: "Fatima Al-Rashid", status: "warning", trustScore: 65, lastFlag: "BATTERY_LOW", sentinelBattery: 12, sentinelConnected: true, gazeStatus: "centered", heartbeatMs: 200, flags: ["BATTERY_LOW"] },
  { id: "s7", name: "George Tanaka", status: "clear", trustScore: 88, lastFlag: null, sentinelBattery: 76, sentinelConnected: true, gazeStatus: "centered", heartbeatMs: 102, flags: [] },
  { id: "s8", name: "Hannah Müller", status: "flagged", trustScore: 18, lastFlag: "HEARTBEAT_LOST", sentinelBattery: 0, sentinelConnected: false, gazeStatus: "unknown", heartbeatMs: 0, flags: ["HEARTBEAT_LOST", "POSSIBLE_CIRCUMVENTION"] },
  { id: "s9", name: "Isaac Park", status: "clear", trustScore: 95, lastFlag: null, sentinelBattery: 60, sentinelConnected: true, gazeStatus: "centered", heartbeatMs: 115, flags: [] },
  { id: "s10", name: "Julia Santos", status: "warning", trustScore: 71, lastFlag: "EXTRA_PERSON", sentinelBattery: 53, sentinelConnected: true, gazeStatus: "centered", heartbeatMs: 140, flags: ["EXTRA_PERSON"] },
  { id: "s11", name: "Kevin O'Brien", status: "clear", trustScore: 93, lastFlag: null, sentinelBattery: 88, sentinelConnected: true, gazeStatus: "centered", heartbeatMs: 98, flags: [] },
  { id: "s12", name: "Lina Johansson", status: "clear", trustScore: 96, lastFlag: null, sentinelBattery: 72, sentinelConnected: true, gazeStatus: "centered", heartbeatMs: 105, flags: [] },
];
