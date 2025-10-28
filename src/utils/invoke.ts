import api from '@forge/api';

type ResolverPayload = Record<string, unknown> | undefined;

export async function invoke<T>(functionName: string, payload?: ResolverPayload): Promise<T> {
  try {
    // Real Forge invocation would look like: await requestJira(...)
    // Placeholder: throw to use fallback while keeping API consistent
    throw new Error('invoke not wired to backend in demo env');
  } catch (_err) {
    return getMockData(functionName) as T;
  }
}

function getMockData(functionName: string): unknown {
  switch (functionName) {
    case 'getFocusScore':
      return { focusScore: 72, totalIssues: 8, completedCount: 12 };
    case 'getTaskLoad':
      return { taskCount: 8, totalStoryPoints: 21, averagePerSprint: 8 };
    case 'getBurnoutRisk':
      return { riskLevel: 'medium', burnoutScore: 45, issueCount: 32, commentCount: 28 };
    case 'getTeamMetrics':
      return { totalIssues: 45, highPriorityCount: 8, teamSize: 6, averageIssuesPerMember: 7.5 };
    default:
      return {};
  }
}


