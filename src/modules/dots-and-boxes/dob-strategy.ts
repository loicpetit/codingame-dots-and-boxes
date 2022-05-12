import { Action } from "../game/action";
import { Strategy } from "../game/strategy";
import { DobFirstAvailableStrategy } from "./dob-first-available-strategy";
import { DobState } from "./dob-state";

export class DobStrategy implements Strategy<DobState> {

    process(state: DobState): Action[] {
        return new DobFirstAvailableStrategy().process(state)
    }

}