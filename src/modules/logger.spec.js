describe("Game", function() {
    var Logger, updateLogConfig
    var category, log, logs, testLogger
  
    beforeEach(function() {
        Logger = require('../../dist/modules').Logger
        updateLogConfig = require('../../dist/modules').updateLogConfig
        category = 'TEST'
        logs = []
        log = function(){
            logs.push(arguments)
        }
        testLogger = new Logger(category, log)
    })
  
    afterEach(function() {
        updateLogConfig({
            defaultLevel: 4,
            levelByCategory: {}
        })
    })

    describe("with default log", function() {        
      
        it("should be visible", function() {
            testLogger = new Logger(category)
            testLogger.warning('hi!')
        })

    })

    describe("with default config", function() {
      
        it("should log warning / error messages", function() {
            testLogger.warning('warning')
            testLogger.error('error')
            expect(logs.length).toEqual(2)
            expect(logs[0].length).toEqual(3)
            expect(logs[1].length).toEqual(3)
            // do not test time value at index 0
            expect(logs[0][1]).toEqual('[TEST]')
            expect(logs[0][2]).toEqual(['warning'])
            expect(logs[1][1]).toEqual('[TEST]')
            expect(logs[1][2]).toEqual(['error'])
        })
      
        it("should not log verbose / debug / info messages", function() {
            testLogger.verbose('verbose')
            testLogger.debug('debug')
            testLogger.info('info')
            expect(logs.length).toEqual(0)
        })
      
        it("should work with several inputs", function() {
            testLogger.warning('warning', 'the famous issue')
            expect(logs.length).toEqual(1)
            expect(logs[0].length).toEqual(3)
            expect(logs[0][1]).toEqual('[TEST]')
            expect(logs[0][2]).toEqual(['warning', 'the famous issue'])
        })

    })

    describe("with custom config", function() {

        beforeEach(function() {
            updateLogConfig({
                defaultLevel: 6,
                levelByCategory: {
                    'CUSTOM': 1
                }
            })
        })

        it("should not log test category", function(){
            testLogger.verbose('verbose')
            testLogger.debug('debug')
            testLogger.info('info')
            testLogger.warning('warning')
            testLogger.error('error')
            expect(logs.length).toEqual(0)
        })

        it("should log custom category", function(){
            testLogger = new Logger('CUSTOM', log)
            testLogger.verbose('verbose')
            testLogger.debug('debug')
            testLogger.info('info')
            testLogger.warning('warning')
            testLogger.error('error')
            expect(logs.length).toEqual(5)
        })

    })

})