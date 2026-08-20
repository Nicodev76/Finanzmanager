const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./Datenbank.db", (err) => {
  if (err) {
    console.error(
      "Es ist ein fehler bei der erstellng der Datenbank passiert",
      err.message,
    );
  } else {
    console.log("verbunden mit der Datenbank");
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS finanzdaten (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    typ TEXT NOT NULL,
    beschreibung TEXT NOT NULL,
    kategorie TEXT NOT NULL,
    datum TEXT NOT NULL,
    betrag REAL NOT NULL,
    nutzerid INTEGER NOT NULL
  )`,

    (err) => {
      if (err) {
        console.error(
          "Es ist ein Fehler bei der erstellung der Tabbelle aufgetreten",
          err.message,
        );
      } else {
        console.log("Die Tabbele wurde erfolgreich erstellt");
      }
    },
  );
});

const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "Index.html"));
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
