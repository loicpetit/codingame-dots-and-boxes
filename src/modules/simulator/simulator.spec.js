describe("Simulator", function() {
    var Action, Simulator
    var testSimulator, initialState, simulatorActionFinder, simulatorBreaker, simulatorProcessor

    describe("with mock", function() {
  
        beforeEach(function() {
            Action = require('../../../dist/modules').Action
            Simulator = require('../../../dist/modules').Simulator
            initialState = {
                sum: 0
            }
            simulatorActionFinder = {
                getPossibleActions: function(currentState) {
                    var delta = Math.abs(currentState.sum) + 1
                    //console.log(`get possibles actions, delta ${delta}`)
                    return [
                        new Action('Add', [delta]),
                        new Action('Sub', [delta]),
                    ]
                }
            }
            simulatorBreaker = {
                nbState: 5,
                break: function(){
                    if(this.nbState > 0){
                        this.nbState--
                        //console.log(`do not break, rest ${this.nbState}`)
                        return false
                    }
                    //console.log(`break`)
                    return true
                }
            }
            simulatorProcessor = {
                process: function(currentState, action){
                    var newState = {
                        sum: currentState.sum
                    }
                    switch(action.value){
                        case 'Add':
                            newState.sum = newState.sum + action.parameters[0]
                            break
                        case 'Sub':
                            newState.sum = newState.sum - action.parameters[0]
                            break
                    }
                    //console.log(`new state sum: ${newState.sum}`)
                    return newState
                }
            }
            testSimulator = new Simulator(initialState, simulatorActionFinder, simulatorBreaker, simulatorProcessor)
        })
      
        it("should generate the expected state tree", function() {
            testSimulator.run()
            var node, parent

            // root
            node = testSimulator.stateTree
            expect(node.state.sum).withContext('root sum').toEqual(0)
            expect(node.action).withContext('root action').toBeUndefined()
            expect(node.children.length).withContext('root nb children').toEqual(2)
            expect(node.parent).withContext('root parent').toBeUndefined()
            expect(node.value).withContext('root value').toBeUndefined()

            // children depth 1
            parent = testSimulator.stateTree
            node = parent.children[0]
            expect(node.state.sum).withContext('child 0 sum').toEqual(1)
            expect(node.action.value).withContext('child 0 action value').toEqual('Add')
            expect(node.action.parameters[0]).withContext('child 0 action parameter').toEqual(1)
            expect(node.children.length).withContext('child 0 nb children').toEqual(2)
            expect(node.parent).withContext('child 0 parent').toBe(parent)
            expect(node.value).withContext('child 0 value').toBeUndefined()
            node = parent.children[1]
            expect(node.state.sum).withContext('child 1 sum').toEqual(-1)
            expect(node.action.value).withContext('child 1 action value').toEqual('Sub')
            expect(node.action.parameters[0]).withContext('child 1 action parameter').toEqual(1)
            expect(node.children.length).withContext('child 1 nb children').toEqual(2)
            expect(node.parent).withContext('child 1 parent').toBe(parent)
            expect(node.value).withContext('child 1 value').toBeUndefined()

            // children depth 2
            parent = testSimulator.stateTree.children[0]
            node = parent.children[0]
            expect(node.state.sum).withContext('child 0.0 sum').toEqual(3)
            expect(node.action.value).withContext('child 0.0 action value').toEqual('Add')
            expect(node.action.parameters[0]).withContext('child 0.0 action parameter').toEqual(2)
            expect(node.children.length).withContext('child 0.0 nb children').toEqual(2)
            expect(node.parent).withContext('child 0.0 parent').toBe(parent)
            expect(node.value).withContext('child 0.0 value').toBeUndefined()
            node = parent.children[1]
            expect(node.state.sum).withContext('child 0.1 sum').toEqual(-1)
            expect(node.action.value).withContext('child 0.1 action value').toEqual('Sub')
            expect(node.action.parameters[0]).withContext('child 0.1 action parameter').toEqual(2)
            expect(node.children.length).withContext('child 0.1 nb children').toEqual(2)
            expect(node.parent).withContext('child 0.1 parent').toBe(parent)
            expect(node.value).withContext('child 0.1 value').toBeUndefined()
            parent = testSimulator.stateTree.children[1] // children should not be processed because sixth node
            node = parent.children[0]
            expect(node.state.sum).withContext('child 1.0 sum').toEqual(1)
            expect(node.action.value).withContext('child 1.0 action value').toEqual('Add')
            expect(node.action.parameters[0]).withContext('child 1.0 action parameter').toEqual(2)
            expect(node.children.length).withContext('child 1.0 nb children').toEqual(0)
            expect(node.parent).withContext('child 1.0 parent').toBe(parent)
            expect(node.value).withContext('child 1.0 value').toBeUndefined()
            node = parent.children[1]
            expect(node.state.sum).withContext('child 1.1 sum').toEqual(-3)
            expect(node.action.value).withContext('child 1.1 action value').toEqual('Sub')
            expect(node.action.parameters[0]).withContext('child 1.1 action parameter').toEqual(2)
            expect(node.children.length).withContext('child 1.1 nb children').toEqual(0)
            expect(node.parent).withContext('child 1.1 parent').toBe(parent)
            expect(node.value).withContext('child 1.1 value').toBeUndefined()
            // could continue with children of 0.0 and 0.1 to check they have no children too
        })

    })

})