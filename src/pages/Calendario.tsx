import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { FirestoreCalendario } from "./FirestoreCalendario";
import { LocalCalendario } from "./LocalCalendario";
import "../styles/Calendario.css";

export default function CalendarioPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!id) {
      if (user) {
        navigate(`/Calendario/${user.uid}`, { replace: true });
      } else {
        navigate("/", { replace: true });             // ← Home quando sloggato
      }
      return;
    }

    if (user) {
      if (id !== user.uid) navigate(`/Calendario/${user.uid}`, { replace: true });
      return;
    }

    // utente NON loggato
    if (id !== "ospite") {
      navigate("/", { replace: true });               // ← niente più salto a /Calendario/ospite
    }
  }, [id, user, loading, navigate]);

  if (loading) return <div className="calendario-page">Caricamento...</div>;
  if (!id)     return <div className="calendario-page">Path non valido</div>;

  // Monta un SOLO ramo → niente problemi coi hook
  if (user && id === user.uid) {
    return <FirestoreCalendario />;
  }
  if (!user && id === "ospite") {
    return <LocalCalendario id={id!} />;
  }
  return <div className="calendario-page">Path non valido</div>;
}
