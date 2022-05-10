import { Action } from "./action";

export interface ActionWriter {
    write(actions:Action[]):void
}