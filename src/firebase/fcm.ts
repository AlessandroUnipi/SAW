import { app } from "../firebase/firebaseConfig";
import { getMessaging, getToken, onMessage, isSupported, deleteToken } from "firebase/messaging";

export async function getMessagingIfSupported() {
  return (await isSupported()) ? getMessaging(app) : null;
}

export async function requestFcmToken(vapidKey: string) {
  const m = await getMessagingIfSupported();
  if (!m) return null;
  const perm = await Notification.requestPermission(); // <-- chiedi permesso
  if (perm !== "granted") return null;
  return await getToken(m, { vapidKey });
}

export async function removeFcmToken() {
  const m = await getMessagingIfSupported();
  if (!m) return false;
  try { return await deleteToken(m); } catch { return false; }
}

export function onForegroundMessage(cb: (p: any) => void) {
  getMessagingIfSupported().then(m => { if (m) onMessage(m, cb); });
}
