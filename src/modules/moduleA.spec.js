describe("ModuleA", function() {
    var ModuleA = null
  
    beforeEach(function() {
        ModuleA = require('../../dist/modules').ModuleA
    })
  
    it("should get message", function() {
      var message = ModuleA.getMessage()
      expect(message).toEqual("module A message")
    })
})