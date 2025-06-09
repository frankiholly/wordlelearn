const { chromium } = require('playwright');

async function testWordValidation() {
  console.log('Starting browser test for word validation...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Enable console logging
  page.on('console', msg => {
    if (msg.text().includes('isValidWord') || msg.text().includes('Online check') || msg.text().includes('dictionary')) {
      console.log(`Browser: ${msg.text()}`);
    }
  });
  
  await page.goto('http://localhost:3000/wordlelearn');
  
  // Wait for the game to load
  await page.waitForTimeout(2000);
  
  console.log('Testing word "PIANO"...');
  
  // Type PIANO
  await page.keyboard.type('PIANO');
  
  // Wait a moment
  await page.waitForTimeout(1000);
  
  // Press Enter
  await page.keyboard.press('Enter');
  
  // Wait for the API check to complete
  await page.waitForTimeout(5000);
  
  // Check if the word was accepted (look for guess tiles)
  const guessRows = await page.$$('.guess-row .tile');
  if (guessRows.length >= 5) {
    console.log('SUCCESS: PIANO was accepted and added to the game board!');
  } else {
    console.log('FAIL: PIANO was not accepted');
  }
  
  await browser.close();
}

testWordValidation().catch(console.error);
