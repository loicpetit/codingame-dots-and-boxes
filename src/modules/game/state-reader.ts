export interface StateReader<STATE> {
    canRead():boolean
    readInitial():STATE
    read(current:STATE):STATE
}