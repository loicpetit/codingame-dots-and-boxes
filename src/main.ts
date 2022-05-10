import { Game } from './modules/game/game'
import { LogLevel, updateLogConfig } from './modules/logger'

updateLogConfig({
    defaultLevel: LogLevel.Error,
    levelByCategory: {

    }
})
