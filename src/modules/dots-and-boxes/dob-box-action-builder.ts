import { Action } from "../game/action"

export class DobBoxActionBuilder {

    private box:string = ''
    private side:string = ''
    private message?:string

    setBox(box:string){
        this.box = box
        this.side = ''
        this.message = undefined
        return this
    }

    onSide(side:string){
        switch(side){
            case 'L': return this.onLeft()
            case 'R': return this.onRight()
            case 'T': return this.onTop()
            case 'B': return this.onBottom()
            default: return this
        }
    }

    onLeft(){
        this.side = 'L'
        return this
    }

    onRight(){
        this.side = 'R'
        return this
    }

    onTop(){
        this.side = 'T'
        return this
    }

    onBottom(){
        this.side = 'B'
        return this
    }

    withMessage(message: string){
        this.message = message
        return this
    }

    build(){
        let parameters:string[] = []
        parameters.push(this.side)
        if(this.message){
            parameters.push(this.message)
        }
        return new Action(this.box, parameters)
    }

}