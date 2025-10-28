# 🚀 Life OS - Setup Guide

Quick setup for Forge 12.7.1 and Node.js v22.

## Prerequisites

Your current environment:
- ✅ Node.js: v22.21.0
- ✅ npm: 10.9.4
- ✅ Forge CLI: 12.7.1

## Step 1: Navigate to Project

```bash
cd forge-app
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install:
- `@forge/api` (v4.2.0)
- `@forge/cli` (v12.7.1)
- TypeScript (v5.6.0)

## Step 3: Build the App

```bash
forge build
```

This compiles TypeScript and prepares the app for deployment.

## Step 4: Login to Atlassian

```bash
forge login
```

Opens browser to authenticate with Atlassian.

## Step 5: Register Your App

```bash
forge register
```

Creates your Forge app instance.

## Step 6: Deploy

```bash
forge deploy
```

Uploads your app to Forge cloud.

## Step 7: Install in Your Site

```bash
forge install
```

Installs the app in your Jira/Confluence instance.

## Step 8: Test the Dashboard

1. Go to your Atlassian site
2. Create or edit a page
3. Add the "Life OS Dashboard" macro
4. View your beautiful teal/gold metrics!

## Available Commands

```bash
npm run build    # Build the app
forge build      # Same as above
forge watch      # Watch mode for development
forge lint       # Lint code
forge tunnel     # Development tunnel
forge logs       # View app logs
```

## Project Structure

```
forge-app/
├── manifest.yml           # App configuration
├── package.json          # Dependencies
├── index.ts              # Main backend
├── ui/                   # HTML UI files
│   ├── dashboard.html    # Main dashboard
│   ├── sidebar.html      # AI chat
│   └── report.html       # Reports
├── src/
│   ├── rovo-actions/     # Rovo AI handlers
│   ├── triggers/         # Event handlers
│   └── resolvers/        # API resolvers
└── docs/                 # Documentation
```

## Customization

### Change App ID

Edit `manifest.yml`:
```yaml
app:
  id: 'ari:cloud:ecosystem::app/YOUR-APP-ID'
```

### Modify Colors

Edit UI files in `ui/` directory:
- `dashboard.html` - Main dashboard colors
- `sidebar.html` - Chat interface
- `report.html` - Report styling

Colors used:
- Teal (Primary): `#009688`
- Gold (Accent): `#FFD700`
- Background: `#FAFAFA`

### Adjust Metrics

Edit calculation functions in:
- `src/rovo-actions/analyzeTeamHealth.ts`
- `src/rovo-actions/suggestWellnessActions.ts`
- `src/rovo-actions/generateFocusReport.ts`

## Troubleshooting

### "Command not found: forge"

Install Forge CLI globally:
```bash
npm install -g @forge/cli
```

### Build Errors

```bash
npm install
forge clean
forge build
```

### Permission Errors

Check `manifest.yml` has required scopes:
- `read:jira-work`
- `write:jira-work`
- `rovo:agent`

### UI Not Loading

1. Verify `ui/` directory exists
2. Check manifest.yml resource paths
3. Run `forge lint`

## Next Steps

1. ✅ Followed setup guide
2. ⏭ Read `UPGRADE_NOTES.md` for details
3. ⏭ Read `README.md` for full docs
4. ⏭ Create demo video (see `DEMO_VIDEO_SCRIPT.md`)

## Support

- 📖 Full docs: `README.md`
- 🔄 Upgrade notes: `UPGRADE_NOTES.md`
- 📝 Project summary: `PROJECT_SUMMARY.md`

---

**Ready to build! Run `npm install && forge build`** 🚀

