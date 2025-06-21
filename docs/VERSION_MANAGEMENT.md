# Version Management

This project uses a centralized version management system to avoid having to update version numbers in multiple places.

## System Overview

### Single Source of Truth
- **File**: `src/config/version.js`
- Contains version number, build ID, and helper methods
- All other files get version info from this single source

### Automated Updates
- **Script**: `scripts/update-version.sh`
- Automatically updates all static files from the config
- Integrated into build and deploy scripts

## How to Update Version

### Method 1: Direct Edit (Recommended)
1. Edit `src/config/version.js`
2. Update the `version` and `buildId` fields
3. Run `./scripts/update-version.sh` to sync all files
4. Build and deploy as normal

### Method 2: Using Scripts
The build and deploy scripts automatically run the version update:
```bash
./build-with-nvm.sh    # Builds with version sync
./deploy-with-nvm.sh   # Deploys with version sync
```

## Files That Get Updated Automatically

When you run `scripts/update-version.sh`, these files are updated:
- `public/version.txt` - Static version file
- `public/version.html` - Version check page with cache-busting
- `.github/workflows/deploy.yml` - GitHub Actions workflow

## Files That Use Version at Runtime

These files import and use the version config:
- `src/App.js` - Shows version in UI
- Any other React components that need version info

## Example Workflow

1. **To release version 3.6.0:**
   ```javascript
   // Edit src/config/version.js
   export const VERSION_CONFIG = {
     version: '3.6.0',
     buildId: 'new_feature_name',
     // ...
   };
   ```

2. **Deploy:**
   ```bash
   ./deploy-with-nvm.sh  # Automatically syncs version and deploys
   ```

3. **Commit:**
   ```bash
   git add -A
   git commit -m "v3.6.0: Description of changes"
   git push origin main
   ```

## Benefits

- ✅ Single place to update version
- ✅ No more manual file syncing
- ✅ Automatic cache-busting parameters
- ✅ Consistent version across all files
- ✅ Build-time and runtime version access
