describe("CapsLockFunctions", function() {
  var expected;

  describe("Helper Functions", function() {
    var node, origClass;
    beforeEach(function() {
      node = document.getElementById("aboveWarning");
      origClass = node.className;
    });
    afterEach(function() {
      node.className = origClass;
    });

    it("addClass should add class to DOM node", function() {
      capsLock.addClass(node, "foo");
      expect(node.className).toMatch(origClass);
      expect(node.className).toMatch(/\bfoo\b/);
    });

    it("removeClass should remove class from DOM node", function() {
      expect(node.className).not.toMatch(/\bfoo\b/);

      capsLock.addClass(node, "foo");
      expect(node.className).toMatch(origClass);
      expect(node.className).toMatch(/\bfoo\b/);

      capsLock.removeClass(node, "foo");
      expect(node.className).toMatch(origClass);
      expect(node.className).not.toMatch(/\bfoo\b/);
    });
  })
  
});
