import { Action } from "../game/action";
import { Strategy } from "../game/strategy";
import { Logger } from "../logger";
import { DobBoxActionBuilder } from "./dob-box-action-builder";
import { DobState } from "./dob-state";

export class DobFirstAvailableStrategy implements Strategy<DobState> {

    private logger = new Logger('FIRST AVAILABLE STRATEGY')

    process(state: DobState): Action[] {
        this.logger.verbose('state', JSON.stringify(state, null, 2))
        const builder = new DobBoxActionBuilder()
        for(let key in state.boxes){
            for(let side in state.boxes[key].sides){
                if(!state.boxes[key].sides[side].used){
                    return [
                        builder.setBox(key).onSide(side).build()
                    ]
                }
            }
        }
        throw new Error()
    }

}