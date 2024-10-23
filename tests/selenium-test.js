const { Builder } = require('selenium-webdriver');

(async function exampleTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://example.com');
    let title = await driver.getTitle();
    console.log(`Page title is: ${title}`);

    if (title === 'Example Domain') {
      console.log('Test Passed!');
      process.exit(0);
    } else {
      console.error('Test Failed! Incorrect title.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Test Failed with Error:', error);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();