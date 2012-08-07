These tests are meant to be with the Jasmine BDD testing framework: http://pivotal.github.com/jasmine/
The jasmine-1.2 library is included in the lib directory of this repo.

Unlike the jsTestDriver tests, this one does include HTML and a DOM to test against.  However, the events are still simulated via stubs, but the DOM is manipulated in response back on the actions of the event listeners registered with the capsLockCore library.

----

There are two tests:
* capsLockSimpleWarnings.spec.js with SpecRunner.simpleWarnings.html
* capsLockWithDojo.spec.js with SpecRunner.dojo.html

The former just uses simple warnings when CapsLock is on using text in divs. It can be tested by loading the file into the browser using the `file://` protocol.

The latter uses the dojo-1.4.1 library's master tooltip.

To run it, you'll need to download and install the dojo-1.4.1 library in the lib directory: `lib/dojo-1.4.1`.  (Why dojo 1.4.1? - that's the library I know from my job, so I stuck with it for this.)  Link: http://download.dojotoolkit.org/release-1.4.1/

In theory you can use the Google CDN by putting this in the SpecRunner.dojo.html:  `<script src="http://ajax.googleapis.com/ajax/libs/dojo/1.4.1/dojo/dojo.js"></script>`, but I seem to constantly struggle with getting dojo requires to work and never got this route to work for me.

The next problem is that due to the same origin policy issues and dojo's require loader being finicky in ways I don't fully comprehend, you can't just fire it up in the browser from file and have it work. 

I know of three ways to run this successfully:

**Option 1**:
With Chrome/Chromium, from this (test/jasmine) directory run:
`google-chrome --disable-web-security --allow-file-access-from-files SpecRunner.dojo.html`
`chromium-browser --disable-web-security --allow-file-access-from-files SpecRunner.dojo.html`

**Option 2**:
Use a web server from the top capslock directory. The SimpleHTTPServer that comes with python is the simplest way I know of.  From the top level dir (capslock) execute `python -m SimpleHTTPServer 8222` (or whatever port you prefer).

Then in your browser enter: http://localhost:8222/test/jasmine/SpecRunner.dojo.html

**Option 3**:
Copy or move the dojo-release-1.4.1 directory to this (test/jasmine) directory and change the references in the SpecRunner.dojo.html file and open it from file in your browser (no need for a web server).
