#!/usr/bin/env node

// Test the fixed validation logic for PIANO
const { checkWordOnline } = require('./src/data/dictionary.js');

async function testPianoFix() {
    console.log('=== Testing PIANO validation fix v3.4.3 ===');
    
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
