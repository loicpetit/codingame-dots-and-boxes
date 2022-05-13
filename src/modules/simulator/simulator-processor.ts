import { Action } from "../game/action"

export interface SimulatorProcessor<STATE> {
    process(currentState:STATE, action:Action):STATE
}