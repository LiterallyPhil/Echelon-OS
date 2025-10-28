# 🚀 Using Node.js 22 with Forge CLI

You want to use Node.js v22.21.0 instead of downgrading. Here's how to make it work!

## The Issue

Forge CLI 6.4.1 shows a warning because it officially supports Node.js 14.x, 16.x, or 18.x, but:
- **You can still use Node.js 22** with newer Forge CLI versions
- The warning is just a check, not a hard requirement
- Most Forge operations will work fine

## Solution 1: Ignore the Warning (Recommended)

The warning is **non-blocking**. You can proceed with your commands:

```powershell
# The warning appears but you can still:
cd forge-app
forge deploy -e development    # This will work
forge install                   # This will work
```

Just ignore the warning message. Your app will function correctly.

## Solution 2: Update to Latest Forge CLI

Update to a newer version that better supports Node 22:

```powershell
# Update Forge CLI globally
npm uninstall -g @forge/cli
npm install -g @forge/cli@latest

# Check version
forge --version
```

## Solution 3: Use .nvmrc to Override

Create an `.nvmrc` file in your project root:

```bash
echo "22.21.0" > forge-app/.nvmrc
```

This tells tools to use Node 22.

## Solution 4: Suppress Warnings

Set this environment variable to suppress the version warning:

```powershell
$env:FORGECLI_SUPPRESS_NODE_WARNINGS = "1"
```

Then run your commands:
```powershell
forge deploy -e development
forge install
```

## Your Current Setup

You have:
- ✅ Node.js v22.21.0
- ✅ npm 10.9.4
- ⚠️ Forge CLI 6.4.1 (shows warning)
- ✅ Site: https://echelonhq.atlassian.net/

## Recommended Approach

**Step 1: Update Forge CLI** (Simple fix)

```powershell
npm uninstall -g @forge/cli
npm install -g @forge/cli@latest
```

**Step 2: Deploy with Node 22** (The warning won't stop you)

```powershell
cd forge-app
forge build
forge login
forge deploy -e development
forge install
```

The warning message says "We recommend you update to the latest version" - but it's just a recommendation, not a requirement.

## Complete Working Commands

Here's your working sequence with Node 22:

```powershell
# 1. Make sure you're in the right directory
cd forge-app

# 2. Build the app
forge build

# 3. Login (if not already)
forge login

# 4. Deploy to development (This is what you missed!)
forge deploy -e development

# 5. Now install on your site
forge install
```

When prompted, select:
- **Product:** Jira
- **Site URL:** https://echelonhq.atlassian.net

## Why This Works

1. **Forge CLI 12.7.1** has better Node 22 support than 6.4.1
2. The version check is **advisory**, not required
3. Node 22 is compatible with all the packages you're using
4. Your TypeScript config is set for ES2023 (Node 22 compatible)

## Quick Test

To verify everything works:

```powershell
# Check your versions
node --version    # Should show v22.21.0
npm --version     # Should show 10.x.x
forge --version   # Should show 6.4.1 or better

# If forge version is old, update it
npm uninstall -g @forge/cli
npm install -g @forge/cli@latest
```

## Your Next Steps

Since the error was **"Forge apps must be deployed before installation"**, just run:

```powershell
cd forge-app
forge deploy -e development
forge install
```

The Node version warning is just informational - you can proceed! 🎉

## Alternative: Use Docker (If Really Stuck)

If you absolutely need to avoid all warnings, use Docker:

```powershell
# Create a container with Node 18 for Forge
docker run --rm -it -v ${PWD}:/app -w /app node:18 npx @forge/cli deploy -e development
```

But honestly, you don't need this. Just deploy with your current setup!

---

**TL;DR**: The Node 22 warning is just a recommendation. Run `forge deploy -e development` and `forge install` - it will work fine! 🚀

