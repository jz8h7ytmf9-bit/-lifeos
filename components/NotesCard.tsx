"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type Note = {
  id: string;
  text: string;
};

export default function NotesCard() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState("");
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
  setNotes([]);
  setLoading(false);
  return;
}

      const q = query(
        collection(db, "notes"),
        where("uid", "==", user.uid)
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const data: Note[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Note, "id">),
        }));

        setNotes(data);
        setLoading(false);

      });

      return unsubscribeSnapshot;
    });

    return unsubscribeAuth;
  }, []);

  async function addNote() {
    if (!note.trim()) return;

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      await addDoc(collection(db, "notes"), {
        text: note,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      setNote("");
    } catch (error) {
      console.error(error);
      alert("Failed to save note.");
    }
  }

  async function deleteNote(id: string) {
    if (!confirm("Delete this note?")) return;

    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete note.");
    }
  }

  async function saveNote(id: string) {
  if (!editingText.trim()) return;

  try {
    await updateDoc(doc(db, "notes", id), {
      text: editingText,
    });

    setEditingId("");
    setEditingText("");
  } catch (error) {
    console.error(error);
    alert("Failed to update note.");
  }
}

  return (
    <div className="bg-gray-900 rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        📝 Notes
      </h2>

      <div className="flex gap-4 mb-6">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note..."
          className="flex-1 h-32 bg-gray-800 rounded-xl p-4 outline-none resize-none"
        />

        <button
          onClick={addNote}
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl font-semibold"
        >
          Save
        </button>
      </div>

      {loading ? (
  <div className="text-center py-8 text-gray-400">
    Loading notes...
  </div>
) : notes.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-8 text-center">
  <div className="text-5xl mb-3">📝</div>

  <h3 className="text-xl font-semibold">
    No Notes Yet
  </h3>

  <p className="text-gray-400 mt-2">
    Save your ideas and thoughts here.
  </p>
</div>
      ) : (
        <div className="space-y-3">
          {notes.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between bg-gray-800 rounded-xl p-4"
            >
              {editingId === n.id ? (
  <input
    value={editingText}
    onChange={(e) => setEditingText(e.target.value)}
    className="flex-1 bg-gray-700 rounded-lg px-3 py-2 outline-none"
  />
) : (
  <p>{n.text}</p>
)}

              <div className="flex gap-2">
  {editingId === n.id ? (
    <button
      onClick={() => saveNote(n.id)}
      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg"
    >
     💾 Save Note
    </button>
  ) : (
    <button
      onClick={() => {
        setEditingId(n.id);
        setEditingText(n.text);
      }}
      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-lg"
    >
      Edit
    </button>
  )}

  <button
    onClick={() => deleteNote(n.id)}
    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
  >
    Delete
  </button>
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}