import { Team } from "./Team"

export type Match = {
    id: number,
    teamA: Team,
    teamB: Team,
    date: string,
    score: {
        teamA: number,
        teamB: number,
    }
}