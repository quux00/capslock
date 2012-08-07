This is the 'first' and most basic test, since the test is run with no DOM / HTML interaction. All events are simulated using JavaScript stubs.

These tests are meant to be run with Google's JsTestDriver: http://code.google.com/p/js-test-driver/

Steps: 
1. Install the JsTestDriver.jar
2. Run the JsTestDriver server: `java -jar /path/to/JsTestDriver.jar --port 9876`
3. Open one or more browsers to: http://localhost:9876/capture or http://localhost:9876/capture?strict for ECMAScript 5 strict mode testing
4. Make a symlink in the current (jsTestDriver) directory to the capsLockCore.js source file: `ln -s ../../src/capsLockCore.js capsLockCore.js` (or copy it here on Windows)
5. Run the tests with `java -jar /path/to/JsTestDriver.jar --tests all --captureConsole`

You will run each test once in every browser you connect to the JsTestDriver.

