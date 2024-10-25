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

    const testCase = suite.testCase().className('ExampleTest').name('Check Page Title');

    if (title === 'Example Domain') {
      console.log('Test Passed!');
      process.exit(0);
    } else {
      console.error('Test Failed! Incorrect title.');
      testCase.failure('Title did not match')
      process.exit(1);
    }
  } catch (error) {
    console.error('Test Failed with Error:', error);
    
    const testCase = suite.testCase().className('ExampleTest').name('Check Page Title');
    testCase.failure(error.message);

    process.exit(1);
  } finally {
    await driver.quit();
    
    junit.writeTo('/var/lib/jenkins/workspace/Selenium-CI/selenium-test-results.xml');
  }
})();