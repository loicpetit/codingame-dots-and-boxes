import { LogLevel, updateLogConfig } from './modules/logger'
import { DobStateReader } from './modules/dots-and-boxes/dob-state-reader'
import { DobStrategy } from './modules/dots-and-boxes/dob-strategy'
import { DobActionWriter } from './modules/dots-and-boxes/dob-action-writer'
import { Game } from './modules/game/game'

updateLogConfig({
    defaultLevel: LogLevel.Error,
    levelByCategory: {
        'STATE READER': LogLevel.Info,
        //'STRATEGY': LogLevel.Verbose,
    }
})

const game = new Game(new DobStateReader(), new DobStrategy(), new DobActionWriter())
game.run()
