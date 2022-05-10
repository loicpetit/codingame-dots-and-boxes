export enum LogLevel {
    Verbose = 1,
    Debug = 2,
    Info = 3,
    Warning = 4,
    Error = 5,
    None = 6
}

export interface LoggerConfig {
    defaultLevel: LogLevel,
    levelByCategory: { [key:string]: LogLevel }
}

let config:LoggerConfig = {
    defaultLevel: LogLevel.Warning,
    levelByCategory: {}
}

export function updateLogConfig(newConfig:LoggerConfig){
    if(newConfig){
        config = newConfig
    }
}

export class Logger {

    private log:(...data:any[]) => void

    constructor(private category:string, log?:(...data:any[]) => void) { 
        if(log) {
            this.log = log
        }
        else {
            this.log = console.error
        }
    }

    private canLog(level:LogLevel){
        if(config.levelByCategory[this.category]) {
            return level >= config.levelByCategory[this.category]
        }
        return level >= config.defaultLevel
    }

    private logIfPossible(level:LogLevel, ...data:any[]){
        if(this.canLog(level)){
            var time = new Date().toISOString()
            this.log.apply(this, [time, `[${this.category}]`].concat(data))            
        }
    }

    verbose(...data:any[]) {
        this.logIfPossible(LogLevel.Verbose, data)
    }

    debug(...data:any[]) {
        this.logIfPossible(LogLevel.Debug, data)
    }

    info(...data:any[]) {
        this.logIfPossible(LogLevel.Info, data)
    }

    warning(...data:any[]) {
        this.logIfPossible(LogLevel.Warning, data)
    }

    error(...data:any) {
        this.logIfPossible(LogLevel.Error, data)
    }

}