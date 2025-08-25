#!/bin/bash
# Generate version files from centralized config

# Extract version info from the config file
VERSION=$(node -e "const config = require('./src/config/version.js').default; console.log(config.version)")
BUILD_ID=$(node -e "const config = require('./src/config/version.js').default; console.log(config.buildId)")
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.%03NZ")

echo "Updating version files..."
echo "Version: $VERSION"
echo "Build ID: $BUILD_ID"
echo "Timestamp: $TIMESTAMP"

# Update version.txt
cat > public/version.txt << EOF
Version: $VERSION
Timestamp: $TIMESTAMP
Commit: $BUILD_ID
EOF

# Update version.html
cat > public/version.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wordle Version</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #121213;
            color: white;
            text-align: center;
        }
        .version-marker {
            background-color: #333333;
            padding: 20px;
            margin: 20px auto;
            max-width: 500px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
        }
        .link {
            margin: 20px;
        }
        .link a {
            color: #4CAF50;
            text-decoration: none;
            padding: 10px 20px;
            border: 1px solid #4CAF50;
            border-radius: 4px;
        }
        .link a:hover {
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
<body>
    <h1>Wordle Version Check</h1>
    
    <div class="version-marker">
        Current Version: vVERSION_PLACEHOLDER<br>
        Build Date: <!-- Auto-replaced by deploy script -->
    </div>
    
    <div class="link">
        <a href="index.html?nocache=CACHE_PLACEHOLDER">Go to Wordle</a>
    </div>
    
    <div>
        <p>If you're not seeing the latest version, try clearing your browser cache or opening in incognito/private mode.</p>
        <p>You can also try adding <code>?nocache=CACHE_PLACEHOLDER</code> to the URL.</p>
        <p>Last updated: BUILD_DATE_PLACEHOLDER</p>
    </div>
    
    <style>
        code {
            background-color: #333;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: monospace;
        }
    </style>
</body>
</html>
EOF

# Replace placeholders in version.html
sed -i.bak "s/VERSION_PLACEHOLDER/$VERSION/g" public/version.html
sed -i.bak "s/CACHE_PLACEHOLDER/$VERSION/g" public/version.html  
sed -i.bak "s/BUILD_DATE_PLACEHOLDER/$TIMESTAMP/g" public/version.html
rm public/version.html.bak

# Update workflow file
sed -i.bak "s/Version: [0-9.]\+/Version: $VERSION/g" .github/workflows/deploy.yml
rm .github/workflows/deploy.yml.bak

echo "Version files updated successfully!"
echo "✅ public/version.txt"
echo "✅ public/version.html" 
echo "✅ .github/workflows/deploy.yml"
