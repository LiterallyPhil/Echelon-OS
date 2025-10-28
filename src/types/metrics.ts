export interface FocusScore {
  focusScore: number;
  totalIssues?: number;
  completedCount?: number;
}

export interface TaskLoad {
  taskCount: number;
  totalStoryPoints: number;
  averagePerSprint?: number;
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface BurnoutRisk {
  riskLevel: RiskLevel;
  burnoutScore: number;
  issueCount?: number;
  commentCount?: number;
}

export interface TeamMetrics {
  totalIssues: number;
  highPriorityCount: number;
  teamSize: number;
  averageIssuesPerMember: number;
}

export interface TeamHealthData {
  focus: FocusScore;
  workload: TaskLoad;
  burnout: BurnoutRisk;
  team?: TeamMetrics;
}

export interface FocusReport {
  title: string;
  completedCount: number;
  activeCount: number;
  completionRate: number;
  focusScore: number;
  estimatedHours: number;
  highPriorityCompleted: number;
  insights: string[];
  period: string;
}


