# 🚀 Life OS - Deployment Guide

Complete step-by-step guide for deploying Life OS to Atlassian Cloud.

## Prerequisites

- Atlassian Cloud account with admin access
- Node.js 18+ installed
- Forge CLI installed globally
- Git repository access

## Step 1: Initial Setup

### Install Forge CLI

```bash
npm install -g @forge/cli
```

### Verify Installation

```bash
forge --version
```

## Step 2: Configure Forge

### Login to Atlassian

```bash
forge login
```

This will open your browser and prompt you to authorize the CLI.

### Register Your App

```bash
cd forge-app
forge register
```

Follow the prompts:
- Create a new app
- Name: "Life OS for Business Teams"
- Select scopes (already configured in manifest.yml)

## Step 3: Development Setup

### Install Dependencies

```bash
npm install
```

### Start Development Tunnel

```bash
forge tunnel
```

This creates a local tunnel for development. The app will be accessible at your Atlassian site with live-reload.

## Step 4: Build & Test

### Lint Your Code

```bash
forge lint
```

### Build the App

```bash
forge build
```

Fix any build errors before proceeding.

## Step 5: Install in Development

### Deploy to Development Environment

```bash
forge deploy
```

This uploads your app to Forge's development environment.

### Install in Your Site

```bash
forge install
```

Select your site when prompted. The app will be installed in development mode.

### Access the App

1. Go to your Jira or Confluence site
2. Navigate to Apps → Manage apps
3. Find "Life OS for Business Teams"
4. Click to open the dashboard

## Step 6: Production Configuration

### Update Production App ID

Edit `manifest.yml`:

```yaml
app:
  id: ari:cloud:ecosystem::app/YOUR-PRODUCTION-APP-ID
```

### Set Environment Variables

Create `.env.production`:

```env
FORGE_API_BASE_URL=https://api.atlassian.com
FORGE_APP_ID=your-production-app-id
NODE_ENV=production
```

## Step 7: Deploy to Production

### Build Production Version

```bash
forge build --prod
```

### Deploy to Production

```bash
forge deploy --prod
```

This uploads to production. Your app is now available to all users.

## Step 8: Marketplace Submission (Optional)

### Prepare Marketplace Listing

1. Create screenshots:
   - Dashboard overview
   - Rovo chat interface
   - Confluence reports

2. Write listing description (see MARKETPLACE.md)

3. Prepare demo video (≤5 min)

### Submit for Review

1. Go to Atlassian Developer Console
2. Click "Submit for certification"
3. Upload all required materials
4. Wait for approval (typically 2-4 weeks)

## Step 9: Post-Deployment

### Configure Webhooks (for real-time updates)

Edit your Forge triggers in `manifest.yml`:

```yaml
function:
  - key: issue-updated-trigger
    handler: src/triggers/issueUpdated
```

### Set Up Scheduled Reports

Configure weekly Confluence report generation in your backend:

```typescript
// Add to index.ts
resolver.define('scheduleWeeklyReport', async () => {
  await scheduleWeeklyReport();
});
```

## Troubleshooting

### "Permission denied" Errors

Solution:
1. Check manifest.yml scopes
2. Verify app has required permissions
3. Uninstall and reinstall app

### Build Errors

Solution:
1. Check TypeScript errors: `npx tsc --noEmit`
2. Verify all imports are correct
3. Ensure all dependencies are installed

### App Not Loading

Solution:
1. Check browser console for errors
2. Verify tunnel is running: `forge tunnel`
3. Check app logs: `forge logs`

### Storage API Issues

Solution:
1. Verify storage scope in manifest
2. Check storage quota limits
3. Clear old data if needed

## Environment-Specific Configurations

### Development

```bash
# Use tunnel for local development
forge tunnel

# Access at: https://your-domain.atlassian.net
```

### Staging

```bash
# Deploy to staging
forge deploy --env staging
```

### Production

```bash
# Deploy to production
forge deploy --prod

# Monitor logs
forge logs --env production
```

## Monitoring

### View Logs

```bash
# Development logs
forge logs

# Production logs
forge logs --env production

# Filter by function
forge logs --function life-os-resources
```

### Check App Health

```bash
# App status
forge status

# API usage
forge usage
```

## Rollback Procedures

### Rollback to Previous Version

```bash
# List versions
forge versions

# Restore version
forge restore VERSION_ID
```

### Uninstall App

```bash
# Uninstall from your site
forge uninstall

# Remove from marketplace
# Do this via Atlassian Developer Console
```

## Security Checklist

- [ ] All sensitive data encrypted
- [ ] API keys stored securely
- [ ] User permissions validated
- [ ] Rate limiting implemented
- [ ] Data retention policy set
- [ ] GDPR compliance verified

## Support & Contact

- 📧 Email: support@life-os.example.com
- 📖 Docs: https://life-os.docs.atlassian.net
- 🐛 Issues: GitHub issues
- 💬 Slack: #life-os-support

---

**Deployment Checklist:**

- [ ] Code tested locally
- [ ] All dependencies installed
- [ ] Build successful
- [ ] Deployed to development
- [ ] Tested in Jira
- [ ] Tested in Confluence
- [ ] Rovo agent working
- [ ] Reports generating
- [ ] Deployed to production
- [ ] Monitoring set up

