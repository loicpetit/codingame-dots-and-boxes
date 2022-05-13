import { Action } from "../game/action"

export class SimulalorNode<STATE,VALUE> {
    
    action?:Action
    children:SimulalorNode<STATE,VALUE>[]
    parent?:SimulalorNode<STATE,VALUE>
    value?:VALUE

    constructor(public state:STATE){
        this.children = []
    }

    addChild(child:SimulalorNode<STATE,VALUE>){
        this.children.push(child)
        child.setParent(this)
        return this
    }

    setAction(action:Action){
        this.action = action
        return this
    }

    setParent(parent:SimulalorNode<STATE,VALUE>){
        this.parent = parent
        return this
    }

    setValue(value:VALUE){
        this.value = value
        return this
    }
}