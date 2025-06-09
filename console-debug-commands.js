// Console commands to debug PIANO issue in the live app
// Copy and paste these into the browser console at https://frankiholly.github.io/wordlelearn/

console.log('=== PIANO Debug Commands v3.4.3 ===');

// 1. Check current version
console.log('Current version check:');
console.log('Look for version number on the page (should be 3.4.3)');

// 2. Check if debug functions exist
console.log('Checking debug functions...');
if (typeof window.debugValidateWord === 'function') {
    console.log('✅ debugValidateWord function exists');
} else {
    console.log('❌ debugValidateWord function not found');
}

if (typeof window.debugTestPiano === 'function') {
    console.log('✅ debugTestPiano function exists');
} else {
    console.log('❌ debugTestPiano function not found');
}

// 3. Test the API directly
console.log('Testing API directly in console...');
async function testAPIDirectly() {
    try {
        const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/piano');
        console.log('Direct API test for PIANO:', response.status, response.ok);
        if (response.ok) {
            const data = await response.json();
            console.log('PIANO API response:', data);
            console.log('✅ PIANO is valid according to API');
        } else {
            console.log('❌ PIANO API check failed');
        }
    } catch (error) {
        console.log('❌ API test error:', error);
    }
}

// 4. Manual test instructions
console.log(`
MANUAL TEST STEPS:
1. Type "PIANO" in the game input
2. Press Enter
3. Watch console for debug messages
4. Check if word is accepted

Expected behavior:
- Should see "Checking dictionary..." message
- Console should show validation steps
- Word should be accepted and added to game

If not working:
- Check browser cache (try Ctrl+F5 or Cmd+Shift+R)
- Check if version shows 3.4.3
- Look for any JavaScript errors in console
`);

// Run the API test
testAPIDirectly();

// 5. Add instructions for cache clearing
console.log(`
CACHE CLEARING INSTRUCTIONS:
If the app still shows old version or behavior:
1. Press Ctrl+Shift+R (or Cmd+Shift+R on Mac) to hard refresh
2. Open DevTools > Application > Storage > Clear site data
3. Or try incognito/private browsing mode
`);
