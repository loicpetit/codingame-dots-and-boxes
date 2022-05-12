import { Action } from "../game/action";
import { ActionWriter } from "../game/action-writer";

export class DobActionWriter implements ActionWriter {

    write(actions: Action[]): void {
        for(const action of actions){
            switch(action.value){
                default: 
                    this.writeBoxAction(action)
            }
        }
    }

    writeBoxAction(action: Action) {
        const box = action.value
        let side = ''
        let msg = ''
        if(action.parameters){
            if(action.parameters.length > 0){
                side = action.parameters[0]
            }
            if(action.parameters.length > 1){
                msg = ' MSG ' + action.parameters[1]
            }
        }
        console.log(`${box} ${side}${msg}`)   
    }

}
