# 🧠 Life OS - Project Index

**Complete guide to the Life OS Atlassian Forge application**

## 📁 Project Structure

```
forge-app/
├── src/                          # Source code
│   ├── frontend/                 # React UI components
│   │   ├── index.tsx            # Main dashboard
│   │   ├── sidebar.tsx          # Rovo chat assistant
│   │   └── report.tsx           # Confluence report viewer
│   ├── rovo-actions/            # Rovo AI agent actions
│   │   ├── analyzeTeamHealth.ts
│   │   ├── suggestWellnessActions.ts
│   │   └── generateFocusReport.ts
│   ├── triggers/                 # Event handlers
│   │   └── issueUpdated.ts      # Jira event triggers
│   ├── resolvers/               # Backend logic
│   │   └── api.ts               # API handlers
│   ├── index.ts                  # Main Forge functions
│   ├── index-triggers.ts        # Trigger exports
│   └── confluence-reports.ts   # Report generation
├── manifest.yml                  # Forge configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── .eslintrc.js                 # Linting rules
├── .gitignore                   # Git ignore rules
└── .forgerc.json               # Forge RC config

Documentation:
├── README.md                     # Main documentation
├── QUICK_START.md               # 5-minute setup guide
├── DEPLOYMENT.md                # Production deployment
├── PROJECT_SUMMARY.md           # Executive overview
├── DEMO_VIDEO_SCRIPT.md         # Video recording script
└── INDEX.md                     # This file
```

## 🚀 Quick Navigation

### For Developers
- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[README.md](README.md)** - Complete technical documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide

### For Users
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - What this app does
- **[DEMO_VIDEO_SCRIPT.md](DEMO_VIDEO_SCRIPT.md)** - See it in action

### For Managers
- **Executive summary** in PROJECT_SUMMARY.md
- **Business value** in README.md
- **ROI metrics** in PROJECT_SUMMARY.md

## 🎯 Key Features

### 1. Focus Score Dashboard 📊
**File**: `src/frontend/index.tsx`

Real-time visualization of:
- Focus Score (0-100%)
- Active Tasks & Story Points
- Burnout Risk Level
- Team Overview Metrics

**Teal/Gold Theme**: Professional executive dashboard design

### 2. Rovo AI Assistant 🤖
**File**: `src/frontend/sidebar.tsx`

Conversational interface for:
- Asking about focus scores
- Getting wellness recommendations
- Analyzing team health
- Understanding burnout risk

**Rovo Actions**: `src/rovo-actions/`

### 3. Automated Reports 📄
**File**: `src/confluence-reports.ts`, `src/frontend/report.tsx`

Weekly Confluence reports with:
- Task completion metrics
- Focus score trends
- Actionable insights
- Team recommendations

### 4. Real-Time Triggers ⚡
**File**: `src/triggers/issueUpdated.ts`

Automatic updates on:
- Issue status changes
- Sprint start events
- Weekly report scheduling
- Burnout risk alerts

## 🔧 Technical Components

### Backend Functions
| File | Purpose | Key Functions |
|------|---------|---------------|
| `src/index.ts` | Core metrics | `getFocusScore`, `getTaskLoad`, `getBurnoutRisk` |
| `src/resolvers/api.ts` | API handlers | Request routing |
| `src/confluence-reports.ts` | Report generation | `generateWeeklyReport` |

### Frontend Components
| File | Component | Purpose |
|------|-----------|---------|
| `src/frontend/index.tsx` | `Dashboard` | Main metrics display |
| `src/frontend/sidebar.tsx` | `RovoAgentSidebar` | Chat interface |
| `src/frontend/report.tsx` | `ConfluenceReport` | Report viewer |

### AI Actions
| File | Action | Purpose |
|------|--------|---------|
| `analyzeTeamHealth.ts` | `analyzeTeamHealth` | Health assessment |
| `suggestWellnessActions.ts` | `suggestWellnessActions` | Recommendations |
| `generateFocusReport.ts` | `generateFocusReport` | Report data |

## 📊 Architecture

### Data Flow
```
Jira Issues
    ↓
Forge Resolvers (src/index.ts)
    ↓
Metric Calculation
    ↓
Rovo AI Processing (src/rovo-actions/)
    ↓
Storage API (Persistent Metrics)
    ↓
UI Display (src/frontend/)
```

### Event Flow
```
Issue Updated (Jira)
    ↓
Trigger Handler (src/triggers/)
    ↓
Update Metrics
    ↓
Check Burnout Risk
    ↓
Generate Alerts
```

## 🎨 Design System

### Colors
- **Primary Teal**: `#009688`
- **Accent Gold**: `#FFD700`
- **Background**: `#FAFAFA`
- **Text Dark**: `#1E1E1E`
- **Text Light**: `#666`

### Typography
- **Font**: Inter, Poppins (system fallbacks)
- **Weights**: 400, 500, 600, 700

### Components
- Metric Cards (Dashboard)
- Chat Bubbles (Sidebar)
- Report Sections (Confluence)
- Alert Banners (Dashboard)

## 📈 Metrics Explained

### Focus Score
**File**: `src/index.ts` → `getFocusScore`

Formula:
```typescript
focusScore = clamp(0, 100, 
  100 - (activeTasks * 5) - (highPriorityTasks * 10) + (completedTasks * 2)
)
```

### Burnout Risk
**File**: `src/index.ts` → `getBurnoutRisk`

Factors:
- Issues in last 30 days
- Comment frequency
- High-priority count
- Sprint velocity

### Task Load
**File**: `src/index.ts` → `getTaskLoad`

Measures:
- Total active tasks
- Story points assigned
- Average per sprint

## 🔗 Integration Points

### Jira Integration
**Files**: `src/index.ts`, `src/triggers/issueUpdated.ts`

- Read issues via Jira Cloud API
- Monitor issue updates
- Track sprint changes
- Calculate metrics in real-time

### Confluence Integration
**File**: `src/confluence-reports.ts`

- Generate weekly reports
- Post to team Confluence space
- Format with XHTML storage
- Schedule automatic publishing

### Rovo AI Integration
**Files**: `src/rovo-actions/*`, `manifest.yml`

- Define custom agent
- Create actionable insights
- Natural language processing
- Conversational interface

## 🚦 Getting Started

### 1. Quick Setup (5 min)
```bash
cd forge-app
npm install
forge login
forge register
forge build
forge deploy
forge install
```

**Guide**: [QUICK_START.md](QUICK_START.md)

### 2. Development
```bash
forge tunnel    # Live development
forge watch     # Auto-rebuild
forge logs      # View logs
```

### 3. Production
```bash
forge build --prod
forge deploy --prod
```

**Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

## 📝 Code Examples

### Calculate Focus Score
```typescript
// src/index.ts
resolver.define('getFocusScore', async ({ payload }) => {
  const { accountId } = payload;
  const issues = await fetchJiraIssues(accountId);
  const focusScore = calculateFocusScore(issues);
  return { focusScore };
});
```

### Rovo Chat Response
```typescript
// src/frontend/sidebar.tsx
const response = generateResponse(input);
messages.push({ text: response, sender: 'assistant' });
```

### Generate Report
```typescript
// src/confluence-reports.ts
const report = await generateReportData(accountId);
await confluenceClient.content.createContent({
  type: 'page',
  title: 'Life OS Report',
  body: { storage: { value: formatReport(report) } }
});
```

## 🧪 Testing Strategy

### Unit Tests
- Metric calculation functions
- Rovo action responses
- Data formatting utilities

### Integration Tests
- Jira API connectivity
- Storage persistence
- Trigger execution

### E2E Tests
- Dashboard rendering
- Chat interactions
- Report generation

## 📚 Documentation

| File | Audience | Purpose |
|------|----------|---------|
| README.md | Developers | Complete technical docs |
| QUICK_START.md | Everyone | Fast setup guide |
| DEPLOYMENT.md | DevOps | Production deployment |
| PROJECT_SUMMARY.md | Executives | High-level overview |
| DEMO_VIDEO_SCRIPT.md | Presenters | Demo video script |

## 🎯 Success Metrics

- ✅ Deployed to Forge platform
- ✅ Rovo agent functional
- ✅ Dashboard displays real Jira data
- ✅ Automated Confluence reports
- ✅ Real-time triggers working
- ✅ Beautiful teal/gold UI
- ✅ Complete documentation

## 🏆 Codegeist Highlights

1. **Forge Mastery**: Using full platform (UI, Resolvers, Rovo, Triggers)
2. **Rovo Innovation**: First-class AI agent integration
3. **Beautiful UI**: Professional teal/gold theme
4. **Real Impact**: Prevents burnout, improves wellness
5. **Production Ready**: Error handling, logging, docs

## 📞 Support

- 📖 Docs: README.md
- 🚀 Deploy: DEPLOYMENT.md
- ⚡ Quick: QUICK_START.md
- 🐛 Issues: Create GitHub issue

---

**Life OS - Built for Codegeist 2024** 🚀

Made with ❤️ using Atlassian Forge, React, and Rovo AI


