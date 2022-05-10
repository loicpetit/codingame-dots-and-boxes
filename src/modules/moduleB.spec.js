describe("ModuleB", function() {
    var ModuleB = null
  
    beforeEach(function() {
        ModuleB = require('../../dist/modules').ModuleB
    })
  
    it("should get message", function() {
      var message = ModuleB.getMessage()
      expect(message).toEqual("module B message")
    })
})