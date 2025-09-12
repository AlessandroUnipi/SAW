SAW Boghiu Alexandru 654734
Calendario PWA – React + TypeScript + Firebase

Progetto d’esame per Applicazioni Web (SAW) – Università di Pisa.
Web App installabile come PWA, con autenticazione utenti, gestione ToDo e notifiche push.

Funzionalità:

Vista Calendario mensile + dettaglio giornaliero con ToDo.

Operazioni CRUD: aggiunta, modifica, completamento/non completamento, eliminazione.

Autenticazione utenti con Firebase Authentication (Email/Password e/o Google).

Notifiche push: inviate 10 minuti prima del ToDo (via Firebase Cloud Messaging).

Offline support: cache asset e pagina di fallback.

Installabile come PWA.


Stack Tecnico:

React 18, TypeScript, Vite

Firebase: Authentication, Firestore, Cloud Messaging

Service Worker per cache e notifiche

CSS per lo stile


Istruzioni per l’avvio:
1. Prerequisiti

Node.js versione >= 18

npm installato

2. Clonare il repository
git clone https://github.com/AlessandroUnipi/SAW.git
cd SAW

3. Installare le dipendenze
npm install

4. File di configurazione .env

Per avviare l’app è necessario il file .env (allegato insieme alla consegna).

5. Avvio in modalità sviluppo
npm run dev

🧪 Credenziali di test

Per accedere, utilizzare le credenziali di test fornite:

Email: utente1@gmail.com
Password: a12345


Firestore – Modello dati
/users/{userId}/todos/{todoId}
  - text: string        # descrizione attività
  - completed: boolean  # stato completamento
  - dayKey: string      # es. "2025-09-12"
  - hour: string        # es. "14:00"
  - userId: string      # riferimento all'utente proprietario
  - notifyAt: timestamp # momento in cui mandare notifica
  - createdAt: timestamp
  - updatedAt: timestamp


Repository

👉 https://github.com/AlessandroUnipi/SAW

