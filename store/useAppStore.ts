import { Team } from "@/types/Team";
import { create } from 'zustand'


type AppStoreType = {
    teams: Team[],
    addTeam: (newTeam: Team) => void;
    removeTeam: (name: Team["id"]) => void;
}

export const useAppStore = create<AppStoreType>((set) => ({
    teams: [],
    addTeam: (newTeam: Team) => set(state => ({teams: [...state.teams, newTeam]})),
    removeTeam: (id: Team["id"]) => set(state => ({teams: state.teams.filter(t => t.id !== id)})),
}))