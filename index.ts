/**
 * Life OS for Business Teams
 * Main backend handler for Forge 12.x
 */

// Import Rovo actions
import { analyzeTeamHealth } from './src/rovo-actions/analyzeTeamHealth';
import { suggestWellnessActions } from './src/rovo-actions/suggestWellnessActions';
import { generateFocusReport } from './src/rovo-actions/generateFocusReport';

// Re-export for Rovo agent handlers
export { analyzeTeamHealth, suggestWellnessActions, generateFocusReport };

// Main function entry point
export const run = async (event: any) => {
  console.log('Life OS backend running');
  return { success: true };
};


