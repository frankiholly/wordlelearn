const https = require('https');

function testPiano() {
  return new Promise((resolve, reject) => {
    const word = 'PIANO';
    console.log('Testing PIANO specifically...');
    
    const req = https.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`, (res) => {
      console.log(`Status: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        console.log('✓ PIANO is VALID in API');
        resolve(true);
      } else if (res.statusCode === 404) {
        console.log('✗ PIANO is INVALID in API');
        resolve(false);
      } else {
        console.log(`? PIANO returned status ${res.statusCode}`);
        resolve(false);
      }
      
      // Consume response data
      res.on('data', () => {});
      res.on('end', () => {});
    });
    
    req.on('error', (err) => {
      console.log('Error:', err.message);
      reject(err);
    });
    
    req.setTimeout(3000, () => {
      req.destroy();
      console.log('Timeout');
      reject(new Error('Timeout'));
    });
  });
}

testPiano()
  .then(result => {
    console.log(`Final result: PIANO is ${result ? 'VALID' : 'INVALID'}`);
    process.exit(0);
  })
  .catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });
