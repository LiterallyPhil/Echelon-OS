# 🧠 Life OS for Business Teams

**Team wellness and workload monitoring powered by Atlassian Forge & Rovo AI**

## Overview

Life OS is a comprehensive Atlassian Forge application that helps business teams monitor their wellness, workload, and productivity. It integrates seamlessly with Jira and Confluence to provide real-time insights into team health, burnout risk, and focus levels.

### Key Features

- **🎯 Focus Score Dashboard** - Real-time focus and productivity metrics
- **📊 Task Load Analysis** - Visual breakdown of workload and story points
- **⚠️ Burnout Risk Assessment** - AI-powered burnout prediction and prevention
- **💬 Rovo AI Assistant** - Conversational AI for team wellness insights
- **📈 Auto-Generated Reports** - Weekly team wellness summaries in Confluence
- **🎨 Premium UI** - Beautiful teal & gold theme for executive dashboards

## Architecture

### Tech Stack

- **Frontend**: React + TypeScript (Custom UI)
- **Backend**: Node.js (Forge Resolvers)
- **AI**: Atlassian Rovo Agent
- **Storage**: Forge Storage API
- **Integrations**: Jira Cloud API, Confluence Cloud API

### Components

1. **Dashboard** (`src/frontend/index.tsx`)
   - Main metrics visualization
   - Real-time focus score
   - Team overview cards

2. **Rovo Agent** (`src/rovo-actions/`)
   - Natural language processing
   - Team health analysis
   - Wellness recommendations

3. **Sidebar Chat** (`src/frontend/sidebar.tsx`)
   - Conversational UI
   - Real-time Q&A
   - Personalized insights

4. **Confluence Reports** (`src/frontend/report.tsx`)
   - Auto-generated weekly summaries
   - Team performance metrics
   - Actionable recommendations

## Setup & Installation

### Prerequisites

- Node.js 18.x or higher
- Atlassian Forge CLI (`npm install -g @forge/cli`)
- Atlassian Cloud Developer account
- Jira and Confluence site with admin access

### Installation Steps

1. **Install dependencies**
   ```bash
   cd forge-app
   npm install
   ```

2. **Configure Forge app**
   ```bash
   forge register
   ```

3. **Build the app**
   ```bash
   forge build
   ```

4. **Install app in your Atlassian site**
   ```bash
   forge deploy
   forge install
   ```

5. **Start development tunnel**
   ```bash
   forge tunnel
   ```

## Configuration

### Manifest Permissions

The app requires the following scopes (already configured in `manifest.yml`):

- `read:jira-work` - Read Jira issues and projects
- `write:jira-work` - Update issue assignments
- `read:jira-user` - Access user profile data
- `read:confluence-content.all` - Read Confluence pages
- `write:confluence-content.all` - Create Confluence reports
- `storage:app` - Store metrics and user data
- `rovo:agent` - Use Rovo AI capabilities

### Environment Variables

Create a `.env` file in the `forge-app` directory:

```env
FORGE_API_BASE_URL=https://api.atlassian.com
FORGE_APP_ID=your-app-id
```

## Usage

### Dashboard Access

1. Go to Jira or Confluence
2. Click on "Life OS Dashboard" in the Apps menu
3. View real-time team metrics

### Chat with Rovo Agent

1. Open the Life OS sidebar from any Jira issue or Confluence page
2. Ask questions like:
   - "What's my current focus score?"
   - "How can I reduce burnout risk?"
   - "Show me team wellness metrics"
   - "Suggest wellness improvements"

### Confluence Reports

Reports are automatically generated weekly and posted to your team's Confluence space.

## Development

### Project Structure

```
forge-app/
├── src/
│   ├── frontend/          # React UI components
│   │   ├── index.tsx      # Dashboard
│   │   ├── sidebar.tsx    # Rovo chat
│   │   └── report.tsx     # Confluence reports
│   ├── rovo-actions/      # Rovo AI agent actions
│   │   ├── analyzeTeamHealth.ts
│   │   ├── suggestWellnessActions.ts
│   │   └── generateFocusReport.ts
│   ├── resolvers/         # Backend logic
│   │   └── api.ts
│   └── index.ts           # Main Forge functions
├── manifest.yml           # Forge configuration
├── package.json
└── tsconfig.json
```

### Running Locally

```bash
# Watch mode
forge watch

# Build
forge build

# Lint
forge lint
```

### Testing

```bash
# Run tests (when implemented)
npm test

# Lint
npm run lint
```

## Metrics Explained

### Focus Score

Calculated based on:
- Active task count (fewer = better)
- Completion rate (higher = better)
- Priority distribution (fewer high-priority = better)

**Score ranges:**
- 70-100: Excellent focus
- 40-69: Good focus, room for improvement
- 0-39: Low focus, intervention needed

### Task Load

Measures:
- Total active tasks assigned
- Story points in progress
- Average sprint velocity

**Recommended:**
- 5-10 tasks per sprint per person
- 15-25 story points average

### Burnout Risk

Assessed on:
- Issue volume in last 30 days
- Comment frequency
- Active task count
- Priority distribution

**Risk levels:**
- Low: <30
- Medium: 30-60
- High: >60

## Customization

### Theme Colors

Edit colors in any `src/frontend/*.tsx` file:

```typescript
// Teal primary
const TEAL = '#009688';

// Gold accent
const GOLD = '#FFD700';

// Background
const BG = '#FAFAFA';
```

### Metrics Calculation

Adjust formulas in `src/index.ts`:

```typescript
resolver.define('getFocusScore', async ({ payload }) => {
  // Modify calculation logic here
});
```

## Deployment

### To Atlassian Marketplace

1. Build production bundle
   ```bash
   forge build
   ```

2. Submit for review
   ```bash
   forge deploy --prod
   ```

3. Publish to marketplace via Atlassian Developer Console

### Enterprise Deployment

For enterprise installations:

1. Generate OAuth credentials
2. Configure SAML/SSO if required
3. Set up webhook endpoints
4. Deploy to private marketplace

## API Reference

### Forge Resolvers

#### `getFocusScore(accountId)`
Returns current focus score and metrics.

**Response:**
```typescript
{
  focusScore: number;
  totalIssues: number;
  completedCount: number;
}
```

#### `getTaskLoad(accountId)`
Returns task load breakdown.

**Response:**
```typescript
{
  taskCount: number;
  totalStoryPoints: number;
  averagePerSprint: number;
}
```

#### `getBurnoutRisk(accountId)`
Returns burnout risk assessment.

**Response:**
```typescript
{
  riskLevel: 'low' | 'medium' | 'high';
  burnoutScore: number;
  issueCount: number;
  commentCount: number;
}
```

### Rovo Actions

#### `analyzeTeamHealth(context, payload)`
AI-powered team health analysis.

**Input:**
```typescript
{
  accountId?: string;
  dateRange?: string;
}
```

**Output:**
```typescript
{
  status: string;
  healthScore: number;
  metrics: {...};
  recommendations: string[];
}
```

## Troubleshooting

### Common Issues

1. **"Permission denied" errors**
   - Check manifest.yml scopes
   - Verify app installation has required permissions

2. **Dashboard shows "No data"**
   - Ensure user has Jira issues assigned
   - Check storage API connectivity

3. **Rovo agent not responding**
   - Verify rovo:agent scope in manifest
   - Check Rovo API access

### Debugging

Enable debug logging:

```bash
export FORGE_DEBUG=1
forge tunnel
```

Check logs:

```bash
forge logs
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- 📧 Email: support@life-os.example.com
- 📖 Docs: https://life-os.docs.atlassian.net
- 🐛 Issues: Create an issue in this repository

## Roadmap

- [ ] Historical trend analysis
- [ ] Team comparison views
- [ ] Slack integration
- [ ] Mobile app
- [ ] Advanced ML predictions
- [ ] Custom metric definitions

## Credits

Built with:
- Atlassian Forge
- Atlassian Rovo AI
- React & TypeScript
- Team wellness research from UCL & MIT

---

Made with ❤️ for better team wellness

