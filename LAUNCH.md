# 🚀 Launch Life OS - Step by Step Guide

You have an Atlassian account and API key. Let's get Life OS running!

## Step 1: Set Up Your API Key

Create a `.env` file in the `forge-app` directory:

```bash
cd forge-app
```

Create `.env` file:
```env
FORGE_API_KEY=your-api-key-here
```

Or you can set it when you login later.

## Step 2: Install Dependencies

```bash
npm install
```

This installs:
- `@forge/api` (v4.2.0)
- `@forge/cli` (v12.7.1)
- TypeScript compiler

## Step 3: Build the App

```bash
forge build
```

You should see:
```
✓ Built successfully
```

## Step 4: Login to Atlassian Forge

```bash
forge login
```

This will:
- Open your browser
- Ask you to log in with your Atlassian account
- Authenticate your CLI

## Step 5: Register Your App

```bash
forge register
```

Follow the prompts:
- **Choose:** "Create a new app"
- **App name:** "Life OS" (or your preferred name)
- **App type:** "Forge"
- **Site:** Select your Atlassian cloud site

This creates your app and returns an App ID (looks like: `ari:cloud:ecosystem::app/...`)

## Step 6: Update App ID in Manifest

After registration, update `manifest.yml`:

Open `manifest.yml` and find line 2:
```yaml
app:
  id: 'ari:cloud:ecosystem::app/0f9aa23a-dd35-45fe-8c72-cd2c7c2c044a'
```

Replace with your actual App ID from registration:
```yaml
app:
  id: 'ari:cloud:ecosystem::app/YOUR-ACTUAL-APP-ID'
```

## Step 7: Deploy to Development

```bash
forge deploy
```

You should see:
```
✓ Deploying...
✓ Successfully deployed
```

## Step 8: Install to Your Site

```bash
forge install
```

Select your Atlassian cloud site when prompted.

You should see:
```
✓ Installing...
✓ Life OS installed successfully
```

## Step 9: Access Your Dashboard

### Option A: As a Macro in Jira/Confluence

1. Go to your Jira or Confluence site
2. Create or edit a page
3. Type `/life` or search for "Life OS"
4. Select "Life OS Dashboard" macro
5. Insert the macro
6. View your dashboard!

### Option B: Via App Switcher

1. Go to your Jira/Confluence site
2. Click the app switcher (9 squares icon)
3. Look for "Life OS" or your app name
4. Click to open

## Step 10: Verify It Works

You should see:
- ✅ Teal and gold colored dashboard
- ✅ Focus Score display
- ✅ Task Load metrics
- ✅ Burnout Risk indicator
- ✅ Beautiful UI theme

## Troubleshooting

### "forge: command not found"

Install Forge CLI globally:
```bash
npm install -g @forge/cli
```

### Build Errors

Try cleaning and rebuilding:
```bash
forge clean
npm install
forge build
```

### Permission Errors During Install

Check that `manifest.yml` has these scopes:
```yaml
permissions:
  scopes:
    - read:jira-work
    - write:jira-work
    - read:jira-user
    - read:confluence-content.all
    - write:confluence-content.all
    - storage:app
    - rovo:agent
```

### Can't See Dashboard

1. Clear browser cache
2. Make sure you're logged into the right Atlassian site
3. Check app installation status: Go to Settings → Apps → Manage apps

### "App not found" Error

Make sure you:
1. Updated the App ID in `manifest.yml`
2. Ran `forge deploy` after updating
3. Have the right Atlassian account logged in

## Development Commands

### Watch Mode (Auto-rebuild on changes)

```bash
forge watch
```

### View Logs

```bash
forge logs
```

### Development Tunnel

```bash
forge tunnel
```

This creates a local development server.

## Your App Should Be Live!

After `forge install` completes, your Life OS dashboard should be accessible in your Jira/Confluence site.

### Next Steps:

1. Test the dashboard (should show mock data)
2. Test the Rovo chat (open any Jira issue, see sidebar)
3. Try the Confluence report
4. Customize colors if desired
5. Deploy to production when ready

## Quick Command Reference

```bash
npm install       # Install dependencies
forge build      # Build the app
forge login      # Login to Atlassian
forge register   # Register new app
forge deploy     # Deploy to development
forge install    # Install on your site
forge logs       # View app logs
forge tunnel     # Development tunnel
forge watch      # Watch mode
```

## Video Walkthrough Coming Soon

A video tutorial will be added to the docs showing the entire launch process.

---

**Need Help?**
- Check `SETUP_GUIDE.md` for detailed setup
- Check `UPGRADE_NOTES.md` for technical details
- Check `README.md` for full documentation

Good luck! 🚀

