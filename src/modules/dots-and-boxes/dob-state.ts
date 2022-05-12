export interface DobBoxSide {
    id:string,
    used:boolean        
}

export interface DobBox {
    id:string,
    sides:{[key:string]:DobBoxSide}    
}

export interface DobPlayableBox {
    id:string
    sides:string
}

export interface DobState {
    boardSize:number
    boxes: {[key:string]:DobBox}
    opponentScore:number
    playableBoxes: DobPlayableBox[]
    playableBoxesCount:number
    playerId:'A'|'B'
    playerScore:number
}