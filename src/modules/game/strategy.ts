import { Action } from "./action";

export interface Strategy<STATE> {
    process(state:STATE):Action[]
}