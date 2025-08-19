import { useCallback, useEffect, useState } from "react";
import { requestFcmToken, removeFcmToken, onForegroundMessage } from "../firebase/fcm";
import { useAuth } from "./useAuth";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

export function useFcm(vapidKey: string) {
  const { user } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>(Notification.permission);

  useEffect(() => {
    onForegroundMessage(p => {
      console.log("[FCM] foreground:", p);
      // qui puoi mostrare un toast/snackbar
    });
  }, []);

  const enable = useCallback(async () => {
    const tok = await requestFcmToken(vapidKey);
    setPermission(Notification.permission);
    if (!tok) return null;
    setToken(tok);
    if (user) {
      await setDoc(doc(db, `users/${user.uid}/fcmTokens/${tok}`), {
        createdAt: serverTimestamp(),
        ua: navigator.userAgent,
      });
    }
    return tok;
  }, [user, vapidKey]);

  const disable = useCallback(async () => {
    const ok = await removeFcmToken();
    if (ok) {
      const tok = token;
      setToken(null);
      if (user && tok) {
        await deleteDoc(doc(db, `users/${user.uid}/fcmTokens/${tok}`));
      }
    }
    return ok;
  }, [user, token]);

  return { token, permission, enable, disable };
}
