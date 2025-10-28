# ⚡ Life OS - Quick Start Guide

Get Life OS up and running in 5 minutes.

## Prerequisites Check

```bash
node --version  # Should be 18+
forge --version # Should be 7+
```

## Step 1: Clone & Setup

```bash
cd forge-app
npm install
```

## Step 2: Register App

```bash
forge login
forge register
```

Follow the prompts to create your Forge app.

## Step 3: Build & Deploy

```bash
forge build
forge deploy
forge install
```

## Step 4: Access Dashboard

1. Go to your Jira site
2. Click "Apps" in the menu
3. Click "Life OS Dashboard"
4. View your real-time metrics!

## Step 5: Test Rovo Chat

1. Open any Jira issue
2. Look for the "Life OS Assistant" sidebar
3. Ask: "What's my focus score?"

## Verify Installation

### ✅ Checklist

- [ ] App appears in Jira "Apps" menu
- [ ] Dashboard shows metrics
- [ ] Rovo chat responds to queries
- [ ] No console errors
- [ ] Colors are teal & gold

## Troubleshooting

**Dashboard shows "Loading..." forever?**
```bash
forge logs
# Check for errors in backend functions
```

**Rovo chat not responding?**
```bash
forge build --prod
forge deploy --prod
```

**Permission errors?**
Verify `manifest.yml` has all required scopes, then:
```bash
forge uninstall
forge install
```

## Next Steps

1. Customize colors (edit `src/frontend/*.tsx`)
2. Adjust metrics formulas (edit `src/index.ts`)
3. Set up Confluence reports (see README.md)
4. Submit to marketplace (see MARKETPLACE.md)

## Demo Commands

```bash
# Live development
forge tunnel

# Watch for changes
forge watch

# Check logs
forge logs --function life-os-resources

# Build production
forge build --prod
```

## Need Help?

- 📖 Full docs: README.md
- 🚀 Deployment: DEPLOYMENT.md
- 🐛 Issues: Create a GitHub issue

Happy coding! 🚀


