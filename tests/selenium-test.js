const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function exampleTest() {
  let options = new chrome.Options();
  options.addArguments('--headless');        // Run in headless mode
  options.addArguments('--no-sandbox');      // Required for Jenkins environments
  options.addArguments('--disable-dev-shm-usage');  // Avoid shared memory issues

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://example.com');
    let title = await driver.getTitle();
    console.log(`Page title is: ${title}`);

    if (title === 'Example Domain') {
      console.log('Test Passed!');
      process.exit(0);  // Success
    } else {
      console.error('Test Failed! Incorrect title.');
      process.exit(1);  // Failure
    }
  } catch (error) {
    console.error('Test Failed with Error:', error);
    process.exit(1);  // Failure
  } finally {
    await driver.quit();
  }
})();