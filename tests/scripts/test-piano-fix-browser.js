// Test the fixed validation logic for PIANO using browser-compatible syntax
async function testPianoFix() {
    console.log('=== Testing PIANO validation fix v3.4.3 ===');
    
    // Recreate the checkWordOnline function directly here
    async function checkWordOnline(word) {
        try {
            console.log(`Checking online dictionary for word: ${word}`);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                console.log(`API fetch timeout triggered for word: ${word}`);
                controller.abort();
            }, 3000);
            
            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`, {
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (response.ok) {
                    console.log(`Online dictionary API check for '${word}': Valid`);
                    return true;
                }
                
                if (response.status === 404) {
                    console.log(`Online dictionary API check for '${word}': Invalid`);
                    return false;
                }
                
                console.log(`API check failed with status ${response.status} for word '${word}'`);
                return false;
                
            } catch (fetchError) {
                clearTimeout(timeoutId);
                console.log('Fetch operation failed or timed out:', fetchError);
                
                if (fetchError.name === 'AbortError') {
                    console.log(`Fetch operation timed out for word '${word}' - rejecting word`);
                    return false;
                }
                
                console.log(`Fetch operation failed for word '${word}' - rejecting word`);
                return false;
            }
            
        } catch (error) {
            console.error('Unexpected error in dictionary check:', error);
            return false;
        }
    }
    
    try {
        console.log('Testing checkWordOnline directly...');
        const result = await checkWordOnline('PIANO');
        console.log(`checkWordOnline('PIANO') returned: ${result}`);
        
        if (result === true) {
            console.log('✅ SUCCESS: PIANO is recognized as valid by the online dictionary');
        } else {
            console.log('❌ FAIL: PIANO is not recognized as valid');
        }
        
        // Test a few more words
        const testWords = ['HOUSE', 'WORLD', 'INVALID', 'ZZZZZ'];
        for (const word of testWords) {
            const wordResult = await checkWordOnline(word);
            console.log(`checkWordOnline('${word}') returned: ${wordResult}`);
        }
        
    } catch (error) {
        console.error('Error testing PIANO:', error);
    }
}

testPianoFix();
