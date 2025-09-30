<div align="center">
  <img width="1200" height="475" alt="Concert Tracker Banner" src="https://github.com/user-attachments/assets/288ef80b-01d3-435e-9f73-ccf9bcb183b5">
</div>

# 🎸 Concert Tracker 🤘

Benvenuto in **Concert Tracker**, l'app definitiva per tutti gli amanti della musica e frequentatori di concerti!

Hai mai perso il conto di quanti artisti incredibili hai visto dal vivo? Vorresti avere un archivio digitale delle tue esperienze musicali più epiche? Con **Concert Tracker**, puoi finalmente tenere traccia di ogni concerto, ogni band e ogni location che ha reso indimenticabile il tuo percorso musicale.

Questa app, creata con passione, ti permette di:

-   **Registrare i tuoi concerti:** Aggiungi dettagli come artista, data, luogo e persino le tue note personali.
-   **Rivedere la tua storia musicale:** Guarda a colpo d'occhio tutti i concerti a cui hai partecipato.
-   **Scoprire statistiche interessanti:** Quante band diverse hai visto? Qual è il tuo genere preferito dal vivo?

Preparati a rivivere i tuoi momenti preferiti e a non perdere mai più un dettaglio della tua straordinaria avventura musicale!

---

## 🚀 Esegui l'app in locale

Questa sezione contiene tutto il necessario per avviare l'app "Concert Tracker" sul tuo computer.

**Prerequisiti:** Assicurati di avere [Node.js](https://nodejs.org/en/download/) installato sul tuo sistema.

1.  **Installa le dipendenze:**
    Apri il terminale nella directory del progetto ed esegui:
    ```bash
    npm install
    ```
2.  **Configura la chiave API:**
    Imposta la tua `GEMINI_API_KEY` nel file `.env.local` con la tua chiave API di Gemini.
    ```    GEMINI_API_KEY=la_tua_chiave_api_qui
    ```
3.  **Avvia l'app:**
    Sempre dal terminale, esegui:
    ```bash
    npm run dev
    ```

Ora puoi accedere all'app nel tuo browser all'indirizzo `http://localhost:3000` (o la porta indicata dal terminale)!

---

## 💾 Gestione dei Dati

Per una rapida dimostrazione, questa versione dell'app include una lista predefinita dei miei concerti.

-   Al primo avvio, i dati vengono caricati dal file `data/initialConcerts.ts` e salvati nel `localStorage` del tuo browser per un accesso più rapido.
-   Tutta la logica per l'aggiunta, la modifica e la rimozione dei concerti è centralizzata nell'hook custom `hooks/useConcerts.ts`.

### Come personalizzare la lista dei concerti

Per caricare la tua lista di concerti o iniziare da zero, segui questi passaggi.

#### 1. Usare la tua lista di concerti

1.  **Modifica il file dati:** Apri `data/initialConcerts.ts` e sostituisci il contenuto dell'array `initialConcertsData` con la tua lista, assicurandoti di mantenere lo stesso formato.
2.  **Pulisci il `localStorage` del browser:**
    -   Apri l'app nel browser e premi `F12` per aprire gli strumenti per sviluppatori.
    -   Vai alla scheda `Application` (o `Applicazione`).
    -   Nel menu a sinistra, vai su `Local Storage` e seleziona l'URL dell'app.
    -   Trova la chiave `concertTrackerData`, clicca con il tasto destro e seleziona `Delete` (o `Elimina`).
3.  **Ricarica la pagina:** L'applicazione caricherà la nuova lista di concerti che hai inserito.

#### 2. Iniziare con una lista vuota

1.  **Svuota il file dati:** Apri `data/initialConcerts.ts` e modifica l'array in modo che sia vuoto:
    ```typescript
    import type { Concert } from '../types';

    type InitialConcert = Omit<Concert, 'id'>;

    export const initialConcertsData: InitialConcert[] = []; // Array vuoto
    ```
2.  **Pulisci il `localStorage` e ricarica:** Segui i passaggi 2 e 3 della sezione precedente per eliminare i dati salvati e ricaricare la pagina. L'app si avvierà con una tabella vuota, pronta per essere riempita!

---

### Visualizza la tua app in AI Studio (se applicabile)

Se l'app è collegata ad AI Studio, puoi visualizzarla direttamente qui:
https://ai.studio/apps/drive/1jRPGz6hjs1lmZTVKDCAyUYL8nucXRkMi
