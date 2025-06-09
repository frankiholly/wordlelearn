// Simple Node.js test for online dictionary API
// Run with: node tests/scripts/simple-test.js

const https = require('https');

function testWord(word) {
  return new Promise((resolve, reject) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`;
    
    console.log(`Testing word: ${word}`);
    console.log(`URL: ${url}`);
    
    const startTime = Date.now();
    
    const req = https.get(url, (res) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log(`  Status: ${res.statusCode}`);
      console.log(`  Duration: ${duration}ms`);
      
      if (res.statusCode === 200) {
        console.log(`  Result: VALID`);
        resolve(true);
      } else if (res.statusCode === 404) {
        console.log(`  Result: INVALID`);
        resolve(false);
      } else {
        console.log(`  Result: UNKNOWN (Status ${res.statusCode})`);
        resolve(false);
      }
      
      // Consume response data to free up memory
      res.on('data', () => {});
      res.on('end', () => {});
    });
    
    req.on('error', (error) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      console.log(`  Error: ${error.message}`);
      console.log(`  Duration: ${duration}ms`);
      reject(error);
    });
    
    req.setTimeout(3000, () => {
      req.destroy();
      console.log(`  Timeout after 3 seconds`);
      reject(new Error('Request timeout'));
    });
  });
}

async function runTests() {
  const testWords = ['HOUSE', 'PIANO', 'WORLD', 'BRAIN', 'WATER', 'XYZ123', 'QWERTY', 'HELLO'];
  
  console.log('Testing online dictionary API...\n');
  
  for (const word of testWords) {
    try {
      await testWord(word);
      console.log('');
    } catch (error) {
      console.log(`  Failed: ${error.message}`);
      console.log('');
    }
  }
}

runTests()
  .then(() => {
    console.log('All tests completed.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Test suite failed:', error);
    process.exit(1);
  });
