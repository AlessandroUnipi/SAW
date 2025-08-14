import { useState } from "react";
import { createPortal } from "react-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "../styles/Login.css";

interface Props {
  onClose: () => void;
}

export default function LoginModal ({onClose}: Props) {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleSignup = async () => {
    setLoading(true);
    setError (null);

    try {
      if (mode == "login"){
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      };

      onClose(); // Chiudo il popup
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    };
  };

  const googleLogin = async() => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      onClose();
    } catch (e: any){
      setError(e.message);
    }
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick = {e => e.stopPropagation()}>
        <h2>{mode === "login" ? "Accedi" : "Crea account"}</h2>

        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type = "password"
          placeholder="Password"
          value = {password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleSignup} disabled={loading}>
          {mode === "login" ? "Entra" : "Registrati"}
        </button>

        <button onClick={googleLogin}>Continua con Google</button>

        <p className="switch">
          {mode === "login" ? (
            <>
              Non hai un Account?{" "}
              <span onClick={() => setMode("signup")}>Registrati</span>
              </>
          ) : (
            <>
              Hai gia un Account?{" "}
              <span onClick={() => setMode("login")}>Accedi</span>
            </>
          )}
        </p>

        <button className="close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>,
    document.body
  );


}

