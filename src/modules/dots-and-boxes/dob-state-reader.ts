import { StateReader } from "../game/state-reader";
import { Logger } from "../logger";
import { DobBox, DobPlayableBox, DobState } from "./dob-state";

export class DobStateReader implements StateReader<DobState> {

    private logger = new Logger('STATE READER')
    private turn = 0

    canRead(): boolean {
        return true
    }

    readInitial(): DobState {
        this.logger.info('init')
        const boardSize = parseInt(readline()); // The size of the board.
        const opponentScore = 0
        const playableBoxes:{id:string, sides:string}[] = []
        const playableBoxesCount = 0
        const playerId = readline() as 'A'|'B' // The ID of the player. 'A'=first player, 'B'=second player.
        const playerScore = 0
        const state:DobState = {
            boardSize: boardSize,
            boxes: this.createInitialBoxes(boardSize),
            opponentScore: opponentScore,
            playableBoxes: playableBoxes,
            playableBoxesCount: playableBoxesCount,
            playerId: playerId,
            playerScore: playerScore
        }
        return state
    }

    read(current: DobState): DobState {
        const scores = readline().split(' ');
        const playerScore = parseInt(scores[0]); // The player's score.
        const opponentScore = parseInt(scores[1]); // The opponent's score.
        const playableBoxesCount = parseInt(readline()); // The number of playable boxes.
        let boxes = this.getResetBoxes(current.boxes)
        let playableBoxes = []
        for (let i = 0; i < playableBoxesCount; i++) {
            var boxValues = readline().split(' ');
            const playableBox = {
                id: boxValues[0], // The ID of the playable box.
                sides: boxValues[1] // Playable sides of the box.
            }
            playableBoxes.push(playableBox)
            if(boxes[playableBox.id]){
                this.updateBoxSideUsage(boxes[playableBox.id], playableBox)
            }
        }
        this.turn++
        this.logger.info(`turn ${this.turn}`)
        return {
            boardSize: current.boardSize,
            boxes: boxes,
            opponentScore: opponentScore,
            playableBoxes: playableBoxes,
            playableBoxesCount: playableBoxesCount,
            playerId: current.playerId,
            playerScore: playerScore
        }
    }

    private createInitialBoxes(boardSize:number):DobState['boxes'] {
        if(!boardSize || boardSize <= 0){
            return {}
        }
        let boxes:DobState['boxes'] = {}
        const initCharCode = 'A'.charCodeAt(0)
        for(let i=0; i<boardSize; i++){
            const char = String.fromCharCode(initCharCode+i)
            for(let j=1; j<=boardSize; j++){
                const key = `${char}${j}`
                boxes[key] = {
                    id:key,
                    sides: {
                        'T': {
                            id: 'T',
                            used: true
                        },
                        'B': {
                            id: 'B',
                            used: true
                        },
                        'L': {
                            id: 'L',
                            used: true
                        },
                        'R': {
                            id: 'R',
                            used: true
                        }
                    }
                }
            }
        }
        return boxes
    }

    private getResetBoxes(boxes:DobState['boxes']){
        let newBoxes:DobState['boxes'] = {}
        for(let key in boxes){
            newBoxes[key] = {
                id: key,
                sides: {}
            }
            for(let sideId in boxes[key].sides){
                newBoxes[key].sides[sideId] = {
                    id: sideId,
                    used: true
                }
            }
        }
        return newBoxes
    }

    private updateBoxSideUsage(box:DobBox, playableBox:DobPlayableBox){
        for(let i=0; i<playableBox.sides.length; i++){
            const side = playableBox.sides[i]
            if(box.sides[side]){
                box.sides[side].used = false
            }
        }
    }

}
