import { useCallback, useEffect, useState } from "react";
import {
  requestFcmToken,
  removeFcmToken,
  onForegroundMessage
} from "../firebase/fcm";
import { useAuth } from "./useAuth";
import { db } from "../firebase/firebaseConfig";
import {
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

export function useFcm(vapidKey: string) {
  const { user } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>(Notification.permission);

  // Mostra notifica quando ricevi in foreground
  useEffect(() => {
    onForegroundMessage(payload => {
      console.log("[FCM] foreground:", payload);
      const { title, body, icon } = payload.notification || {};
      if (Notification.permission === "granted" && navigator.serviceWorker?.ready) {
        navigator.serviceWorker.ready.then(reg => {
          reg.showNotification(title || "Notifica", {
            body: body || "",
            icon: icon || "./assets/Calendar.png",
            tag: "foreground-tag",
            renotify: true,
      }as any);
    });
}
    });
  }, []);

  useEffect(() => {
  async function restoreToken() {
    if (Notification.permission === "granted") {
      const tok = await requestFcmToken(vapidKey);
      if (tok) {
        setToken(tok);
        setPermission("granted");

        const data = {
          createdAt: serverTimestamp(),
          ua: navigator.userAgent,
        };

        if (user) {
          await setDoc(doc(db, `users/${user.uid}/fcmTokens/${tok}`), data);
        } else {
          await setDoc(doc(db, `guests/${tok}`), data);
        }
      }
    }
  }

  restoreToken();
}, [user, vapidKey]);


  // Log del token appena disponibile
  useEffect(() => {
    if (token) {
      console.log("[FCM Token]", token);
    }
  }, [token]);

  const enable = useCallback(async () => {
    const tok = await requestFcmToken(vapidKey);
    setPermission(Notification.permission);
    if (!tok) return null;
    setToken(tok);

    const data = {
      createdAt: serverTimestamp(),
      ua: navigator.userAgent,
    };

    if (user) {
      // Utente registrato
      await setDoc(doc(db, `users/${user.uid}/fcmTokens/${tok}`), data);
    } else {
      // Ospite
      await setDoc(doc(db, `guests/${tok}`), data);
    }

    return tok;
  }, [user, vapidKey]);

  const disable = useCallback(async () => {
    const ok = await removeFcmToken();
    if (ok) {
      const tok = token;
      setToken(null);

      if (tok) {
        if (user) {
          await deleteDoc(doc(db, `users/${user.uid}/fcmTokens/${tok}`));
        } else {
          await deleteDoc(doc(db, `guests/${tok}`));
        }
      }
    }
    return ok;
  }, [user, token]);

  return { token, permission, enable, disable };
}
