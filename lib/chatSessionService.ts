import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export type ChatSession = {
  id: string;
  title: string;
};

export async function createChatSession(uid: string) {
  const docRef = await addDoc(
    collection(db, "users", uid, "chats"),
    {
      title: "New Chat",
      createdAt: serverTimestamp(),
    }
  );

  return docRef.id;
}

export async function loadChatSessions(uid: string) {
  const q = query(
    collection(db, "users", uid, "chats"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
  })) as ChatSession[];
}