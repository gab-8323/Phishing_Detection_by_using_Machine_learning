
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface ScanResult {
  riskScore: number; // 0 to 100
  riskLevel: RiskLevel;
  verdict: string;
  threats: string[];
  recommendations: string[];
  groundingSources?: { title: string; uri: string }[];
  technicalDetails?: string;
}

export type ScanType = 'url' | 'email' | 'screenshot';

export interface ScanHistory {
  id: string;
  type: ScanType;
  target: string;
  timestamp: number;
  result: ScanResult;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
