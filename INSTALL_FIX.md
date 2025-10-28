# 🔧 Installation Fix Guide

## Issue 1: Node.js Version Mismatch

Forge CLI 12.7.1 requires **Node.js 18.x** (LTS version), but you have Node.js 22.21.0.

### Option A: Use Node Version Manager (Recommended)

Install nvm-windows to manage multiple Node.js versions:

```powershell
# Install nvm-windows from:
# https://github.com/coreybutler/nvm-windows/releases

# Then install Node 18:
nvm install 18
nvm use 18

# Verify:
node --version  # Should show v18.x.x
```

### Option B: Install Node.js 18 Directly

Download and install Node.js 18 LTS from:
- https://nodejs.org/ (select version 18.x LTS)

After installing:
```powershell
node --version  # Should show v18.x.x
npm --version
```

## Issue 2: Update Forge CLI

Your current Forge CLI (6.4.1) is outdated. Update to 12.7.1:

```powershell
npm uninstall -g @forge/cli
npm install -g @forge/cli@12.7.1

# Verify:
forge --version  # Should show 12.7.1
```

## Issue 3: Deploy Before Install

You must **deploy** the app before installing:

```powershell
# Make sure you're logged in:
forge login

# Deploy to development:
forge deploy -e development

# Then install:
forge install
```

## Complete Step-by-Step Fix

### 1. Switch to Node.js 18

```powershell
# Using nvm-windows:
nvm use 18

# OR install Node 18 fresh from nodejs.org
```

### 2. Update Forge CLI

```powershell
npm uninstall -g @forge/cli
npm install -g @forge/cli@12.7.1
forge --version  # Verify it's 12.7.1
```

### 3. Clean and Rebuild

```powershell
cd forge-app
npm install
forge build
```

### 4. Login and Deploy

```powershell
forge login
forge deploy -e development
```

### 5. Install on Your Site

```powershell
forge install
```

Select your site when prompted.

## Alternative: Use Docker (If Still Having Issues)

If Node version switching is problematic, you can use Docker:

```powershell
# Create Dockerfile
docker run --rm -it -v ${PWD}:/app -w /app node:18 npm install
docker run --rm -it -v ${PWD}:/app -w /app node:18 npx @forge/cli deploy
```

## Check Your Environment

Run these to verify everything is set up:

```powershell
node --version    # Should be v18.x.x
npm --version     # Should be 10.x.x
forge --version   # Should be 12.7.1
```

## Quick Commands Reference

```powershell
# Check versions
node --version
npm --version  
forge --version

# Update Forge CLI
npm uninstall -g @forge/cli
npm install -g @forge/cli@12.7.1

# Switch to Node 18 (if using nvm)
nvm install 18
nvm use 18

# In your project
cd forge-app
npm install
forge build
forge login
forge deploy -e development
forge install
```

## Most Likely Solution

Run these commands in order:

```powershell
# 1. Update Forge CLI
npm uninstall -g @forge/cli
npm install -g @forge/cli@12.7.1

# 2. Install Node 18 if needed
# Download from nodejs.org

# 3. Rebuild project
cd forge-app
npm install
forge build

# 4. Deploy
forge login
forge deploy -e development

# 5. Install
forge install
```

## Still Having Issues?

Check that you have:
- ✅ Node.js 18.x installed
- ✅ Forge CLI 12.7.1 installed globally
- ✅ Logged into Atlassian (`forge login`)
- ✅ Deployed before install (`forge deploy -e development`)
- ✅ Correct App ID in manifest.yml

---

**Next Step**: Follow the commands above to get Life OS running! 🚀

