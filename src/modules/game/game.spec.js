describe("Game", function() {
    var Game
    var actionWriter, stateReader, strategy, testGame

    describe("with string state", function() {
  
        beforeEach(function() {
            Game = require('../../../dist/modules').Game
            actionWriter = {
                actions: [],
                write: function(actions){
                    let myActions = actions.map(function(a){ return '[WRITE] ' + a})
                    this.actions.push(myActions)
                }
            }
            stateReader = {
                states: ['state1','state2','state3'],
                canRead: function() {
                    return this.states.length > 0
                },
                readInitial: function() {
                    return ''
                },
                read: function(current){
                    if(this.states.length > 0){
                        return this.states.shift()
                    }
                    throw 'state reader states is empty'
                }    
            }
            strategy = {
                process: function(state){
                    return [`process ${state}`]
                }
            }
            testGame = new Game(stateReader, strategy, actionWriter)
        })
      
        it("should work and write actions", function() {
          testGame.run()
          expect(actionWriter.actions.length).toEqual(3)
          expect(actionWriter.actions[0].length).toEqual(1)
          expect(actionWriter.actions[0][0]).toEqual('[WRITE] process state1')
          expect(actionWriter.actions[1].length).toEqual(1)
          expect(actionWriter.actions[1][0]).toEqual('[WRITE] process state2')
          expect(actionWriter.actions[2].length).toEqual(1)
          expect(actionWriter.actions[2][0]).toEqual('[WRITE] process state3')
        })
      
        it("should work and save state history", function() {
          testGame.run()
          expect(testGame.stateHistory.length).toEqual(3)
          expect(testGame.stateHistory[0]).toEqual('state1')
          expect(testGame.stateHistory[1]).toEqual('state2')
          expect(testGame.stateHistory[2]).toEqual('state3')
        })
      
        it("should work and save actions history", function() {
          testGame.run()
          expect(testGame.actionsHistory.length).toEqual(3)
          expect(testGame.actionsHistory[0].length).toEqual(1)
          expect(testGame.actionsHistory[0][0]).toEqual('process state1')
          expect(testGame.actionsHistory[1].length).toEqual(1)
          expect(testGame.actionsHistory[1][0]).toEqual('process state2')
          expect(testGame.actionsHistory[2].length).toEqual(1)
          expect(testGame.actionsHistory[2][0]).toEqual('process state3')
        })

    })

})