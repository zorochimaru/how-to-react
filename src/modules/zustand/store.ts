import { nanoid } from 'nanoid';
import { create } from 'zustand';

export interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesState {
  notes: Note[];
  selectedNoteId: string | null;
  past: Note[][];
  future: Note[][];
  addNote: (title: string, content: string) => void;
  deleteNote: (id: string) => void;
  selectNote: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  selectedNoteId: null,
  past: [],
  future: [],
  addNote: (title, content) => {
    const prev = get().notes;
    const newNote = { id: nanoid(), title, content };
    set({
      notes: [...prev, newNote],
      past: [...get().past, prev],
      future: [],
    });
  },
  deleteNote: (id) => {
    const prev = get().notes;
    set({
      notes: prev.filter((note) => note.id !== id),
      past: [...get().past, prev],
      future: [],
    });
  },
  selectNote: (id) => {
    set({ selectedNoteId: id });
  },
  undo: () => {
    const past = get().past;
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    set({
      notes: previous,
      past: past.slice(0, -1),
      future: [get().notes, ...get().future],
    });
  },
  redo: () => {
    const future = get().future;
    if (future.length === 0) return;
    const next = future[0];
    set({
      notes: next,
      past: [...get().past, get().notes],
      future: future.slice(1),
    });
  },
}));
