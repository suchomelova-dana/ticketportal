import { Team } from "./Team"

export type Match = {
    id: string,
    teamA: Team["id"] | null,
    teamB: Team["id"] | null,
    date: string | null,
    score: {
        teamA: number,
        teamB: number,
    }
}