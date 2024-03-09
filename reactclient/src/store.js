import { create } from 'zustand'

export const store = create((set) => ({
    sequenceFromHistory: {},
    setSequenceFromHistory: (sequenceObject) => set((state) => ({sequenceFromHistory:sequenceObject}))

    
}))

