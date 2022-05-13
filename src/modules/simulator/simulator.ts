import { SimulatorActionFinder } from "./simulator-action-finder";
import { SimulatorBreaker } from "./simulator-breaker";
import { SimulalorNode } from "./simulator-node";
import { SimulatorProcessor } from "./simulator-processor";

export class Simulator<STATE,VALUE> {

    stateTree:SimulalorNode<STATE,VALUE>

    constructor(
        initialState:STATE,
        private simulatorActionFinder:SimulatorActionFinder<STATE>,
        private simulatorBreaker:SimulatorBreaker,
        private simulatorProcessor:SimulatorProcessor<STATE>
        ){
        this.stateTree= new SimulalorNode(initialState)
    }

    run(){
        let nodesToProcess = [this.stateTree]
        while(!this.simulatorBreaker.break() && nodesToProcess.length > 0){
            let nodeToProcess = nodesToProcess.shift() as SimulalorNode<STATE,VALUE>
            const actions = this.simulatorActionFinder.getPossibleActions(nodeToProcess.state)
            for(const action of actions){
                const newState = this.simulatorProcessor.process(nodeToProcess.state, action)
                const newNode = new SimulalorNode<STATE,VALUE>(newState).setAction(action)
                nodeToProcess.addChild(newNode)
                nodesToProcess.push(newNode)
            }
        }
    }

}