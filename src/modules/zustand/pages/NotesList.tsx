import { useState } from 'react';
import { useNotesStore } from '../store';

export const NotesList = () => {
  const { notes, selectedNoteId, addNote, deleteNote, selectNote, undo, redo, past, future } =
    useNotesStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const handleAdd = () => {
    if (!title.trim()) return;
    addNote(title.trim(), content.trim());
    setTitle('');
    setContent('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow space-y-6">
      <div className="flex items-end gap-10">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Note Manager</h1>
        <a
          href="https://github.com/zorochimaru/how-to-react/blob/main/src/modules/zustand"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code {'</>'}
        </a>
      </div>

      <div className="space-y-2">
        <input
          className="w-full border px-2 py-1 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border px-2 py-1 rounded"
          placeholder="Content"
          value={content}
          rows={4}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add Note
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={undo}
          disabled={past.length === 0}
          className={`px-3 py-1 rounded ${
            past.length === 0
              ? 'bg-gray-200 text-gray-400'
              : 'bg-yellow-400 hover:bg-yellow-500 text-white'
          }`}
        >
          Undo
        </button>
        <button
          onClick={redo}
          disabled={future.length === 0}
          className={`px-3 py-1 rounded ${
            future.length === 0
              ? 'bg-gray-200 text-gray-400'
              : 'bg-green-400 hover:bg-green-500 text-white'
          }`}
        >
          Redo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h2 className="font-semibold">All Notes</h2>
          <ul className="space-y-1">
            {notes.map((note) => (
              <li
                key={note.id}
                className={`p-2 border rounded cursor-pointer ${
                  note.id === selectedNoteId ? 'bg-blue-400' : ''
                }`}
                onClick={() => selectNote(note.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{note.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold">Selected Note</h2>
          {selectedNote ? (
            <div className="border rounded p-3">
              <h3 className="font-bold text-lg">{selectedNote.title}</h3>
              <p className="text-gray-700 dark:text-gray-200 mt-2">{selectedNote.content}</p>
            </div>
          ) : (
            <p className="text-gray-400  italic">No note selected</p>
          )}
        </div>
      </div>
    </div>
  );
};
