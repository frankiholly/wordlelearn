// Verification script for v3.4.3 deployment
async function verifyDeployment() {
    console.log('=== Verifying v3.4.3 Deployment ===');
    
    try {
        // Check version endpoint
        console.log('Checking version endpoint...');
        const versionResponse = await fetch('https://wordle-ai-five.vercel.app/version.txt');
        const version = await versionResponse.text();
        console.log(`Version endpoint returns: ${version.trim()}`);
        
        if (version.trim() === '3.4.3') {
            console.log('✅ Version endpoint shows correct version');
        } else {
            console.log('❌ Version endpoint shows wrong version');
        }
        
        // Check if the main app loads
        console.log('Checking main app...');
        const appResponse = await fetch('https://wordle-ai-five.vercel.app/');
        if (appResponse.ok) {
            const appHtml = await appResponse.text();
            if (appHtml.includes('3.4.3')) {
                console.log('✅ Main app contains version 3.4.3');
            } else {
                console.log('❌ Main app does not contain version 3.4.3');
            }
        } else {
            console.log('❌ Failed to load main app');
        }
        
        console.log('Deployment verification complete.');
        console.log('Please test PIANO manually in the browser.');
        
    } catch (error) {
        console.error('Error verifying deployment:', error);
    }
}

verifyDeployment();
