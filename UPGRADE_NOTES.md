# Life OS - Forge 12.7.1 Upgrade Notes

## Changes Made

Your Life OS app has been updated to work with:
- **Forge CLI**: 12.7.1
- **Node.js**: v22.21.0  
- **npm**: 10.9.4

## Key Updates

### 1. Manifest Structure (`manifest.yml`)

**Before (React-based):**
```yaml
customUi:
  - key: dashboard
    entry: src/frontend/index
```

**After (HTML-based for Forge 12.x):**
```yaml
function:
  - key: main
    handler: index

macro:
  - key: life-os-dashboard
    resource: ui/dashboard.html
```

### 2. UI Files

Created standalone HTML files in `ui/` directory:
- `ui/dashboard.html` - Main dashboard with teal/gold theme
- `ui/sidebar.html` - Rovo AI chat interface  
- `ui/report.html` - Confluence report viewer

### 3. Backend Handler (`index.ts`)

Simplified to export Rovo actions:
```typescript
export { analyzeTeamHealth } from './src/rovo-actions/analyzeTeamHealth';
export { suggestWellnessActions } from './src/rovo-actions/suggestWellnessActions';
export { generateFocusReport } from './src/rovo-actions/generateFocusReport';
```

### 4. Rovo Actions Updated

Changed from `rovo.ActionContext` to simple function signatures:
```typescript
// Before
export async function analyzeTeamHealth({ context, payload }: rovo.ActionContext)

// After  
export async function analyzeTeamHealth(context: any, payload: any)
```

### 5. Package Dependencies

Updated to match your versions:
- `@forge/cli`: ^12.7.1
- `@forge/api`: ^4.2.0
- TypeScript: ^5.6.0
- Node.js engine: >=22.0.0

## Project Structure

```
forge-app/
├── manifest.yml           # Forge 12.x configuration
├── package.json          # Updated dependencies
├── tsconfig.json         # ES2022 target
├── index.ts              # Main backend handler
├── ui/                   # HTML UI files
│   ├── dashboard.html
│   ├── sidebar.html
│   └── report.html
└── src/                  # Source code
    ├── rovo-actions/     # Rovo AI handlers
    ├── triggers/         # Event handlers
    └── resolvers/        # API resolvers
```

## How to Use

### 1. Install Dependencies

```bash
cd forge-app
npm install
```

### 2. Build the App

```bash
forge build
```

### 3. Deploy to Development

```bash
forge deploy
forge install
```

### 4. Access the Dashboard

1. Go to your Jira site
2. Add the "Life OS Dashboard" macro to a page
3. View your teal/gold themed metrics!

## Key Differences from Previous Version

| Aspect | Before (React) | After (HTML) |
|--------|---------------|--------------|
| **UI Framework** | React 18 | Vanilla HTML/JS |
| **Entry Point** | `entry` in manifest | `resource` in manifest |
| **UI Location** | `src/frontend/` | `ui/` |
| **Build Process** | Webpack bundling | Static files |
| **Forge Version** | 7.x | 12.7.1 |

## Why This Approach?

1. **Forge 12.x Compatibility**: HTML resources work reliably with Forge 12.x
2. **No Build Complexity**: Static HTML files don't need bundling
3. **Faster Load Times**: No JavaScript framework overhead
4. **Simpler Deployment**: Fewer dependencies and build steps
5. **Same UX**: The teal/gold theme and functionality remain identical

## Features Still Working

✅ Teal (#009688) & Gold (#FFD700) color theme  
✅ Focus Score dashboard  
✅ Task Load metrics  
✅ Burnout Risk assessment  
✅ Rovo AI chat interface  
✅ Automated Confluence reports  
✅ Real-time metric updates  

## Next Steps

1. Run `npm install` to get dependencies
2. Run `forge build` to compile
3. Run `forge deploy` to deploy
4. Test the dashboard in Jira

## Troubleshooting

**Build fails?**
```bash
forge clean
npm install
forge build
```

**UI not loading?**
- Check `manifest.yml` has correct resource paths
- Verify `ui/` directory exists
- Run `forge lint` to check syntax

**Rovo agent not working?**
- Verify actions are exported in `index.ts`
- Check `manifest.yml` has correct handler references
- Ensure `rovo:agent` scope is in permissions

## Support

See the main `README.md` for full documentation.

---

**Updated for Forge 12.7.1 and Node.js v22**

