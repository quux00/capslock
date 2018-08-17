# CapsLock Detection Library for Web Browsers

This is a very small "CapsLock" library is provided in the src/capsLockCore.js file.  It is meant to provide detection of when the Caps Lock key is on in a web browser setting by watching keypress and keyup/keydown DOM events and reading the "keyCode" or "charCode" of the keypresses.

See the test code examples for usage patterns.

*Documentation Incomplete at Present*

## Tests

I also include tests in 5 formats:

1. A simple HTML and JS file for manual testing - see the `test/manual` directory.
2. A test case for the Google's [JsTestDriver](http://code.google.com/p/js-test-driver/) unit test framework and test runner.  See the `test/jsTestDriver` directory.
3. A BDD style test using [Jasmine](https://jasmine.github.io/) - see the `test/jasmine`
directory.
4. Selenium WebDriver tests - **In progress and not yet included**
5. HtmlUnit tests -  **In progress and not yet included**

### Why so many tests?

I wanted to learn out a number of JavaScript / HTML testing frameworks and this was a nice clean small project to do that with.

