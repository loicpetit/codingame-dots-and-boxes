import { Action } from "./action";
import { ActionWriter } from "./action-writer";
import { StateReader } from "./state-reader";
import { Strategy } from "./strategy";

export class Game<STATE> {

    actionsHistory:Action[][]
    stateHistory:STATE[]

    constructor(private stateReader:StateReader<STATE>, private strategy:Strategy<STATE>, private actionWriter:ActionWriter){
        this.actionsHistory = []
        this.stateHistory = []
    }

    run(){
        try {
            const initialState = this.stateReader.readInitial()
            while(this.stateReader.canRead()){
                const state = this.stateReader.read(initialState)
                this.stateHistory.push(state)
                const actions = this.strategy.process(state)
                this.actionsHistory.push(actions)
                this.actionWriter.write(actions)
            }
        }
        catch(error){
            console.error('Unexpected error during game run. Error: ', error)
        }
    }

}