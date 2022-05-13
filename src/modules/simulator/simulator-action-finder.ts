import { Action } from "../game/action";

export interface SimulatorActionFinder<STATE> {
    getPossibleActions(currentState:STATE):Action[]
}