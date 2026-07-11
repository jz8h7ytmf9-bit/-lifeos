import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function saveMessage(
  uid: string,
  chatId: string,
  role: "user" | "assistant",
  content: string
) {
  await addDoc(
    collection(
      db,
      "users",
      uid,
      "chats",
      chatId,
      "messages"
    ),
    {
      role,
      content,
      createdAt: serverTimestamp(),
    }
  );
}

export async function loadMessages(
  uid: string,
  chatId: string
) {
  const q = query(
    collection(
      db,
      "users",
      uid,
      "chats",
      chatId,
      "messages"
    ),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    role: doc.data().role,
    content: doc.data().content,
  })) as ChatMessage[];
}