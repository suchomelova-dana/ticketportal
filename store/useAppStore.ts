import { Match } from "@/types/Match";
import { Team } from "@/types/Team";
import { create } from 'zustand'


type AppStoreType = {
    teams: Team[],
    addTeam: (newTeam: Team) => void;
    removeTeam: (id: Team["id"]) => void;
    matches: Match[];
    addMatch: (newMatch: Match) => void;
    removeMatch: (id: Match["id"]) => void;
}

export const useAppStore = create<AppStoreType>((set) => ({
    teams: [],
    addTeam: (newTeam: Team) => set(state => ({teams: [...state.teams, newTeam]})),
    removeTeam: (id: Team["id"]) => set(state => ({teams: state.teams.filter(t => t.id !== id)})),
    matches: [],
    addMatch: (newMatch: Match) => set(state => ({matches: [...state.matches, newMatch]})),
    removeMatch: (id: Match["id"]) => set(state => ({matches: state.matches.filter(m => m.id !== id)})),
}))