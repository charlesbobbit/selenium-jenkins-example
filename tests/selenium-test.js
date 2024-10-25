const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const junit = require('junit-report-builder');

(async function exampleTest() {
  let options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  const suite = junit.testSuite().name('Selenium Test Suite'); 
  
  try {
    await driver.get('https://example.com');
    let title = await driver.getTitle();
    console.log(`Page title is: ${title}`);

    if (title === 'Example Domain') {
      console.log('Test Passed!');
      suite.testCase().className('ExampleTest').name('Check Page Title').time(1).success();
      process.exit(0);
    } else {
      console.error('Test Failed! Incorrect title.');
      suite.testCase().className('ExampleTest').name('Check Page Title').time(1).failure('Title did not match');
      process.exit(1);
    }
  } catch (error) {
    console.error('Test Failed with Error:', error);
    suite.testCase().className('ExampleTest').name('Check Page Title').time(1).failure(error.message);
    process.exit(1);
  } finally {
    await driver.quit();
    junit.writeTo('selenium-test-results.xml');
  }
})();