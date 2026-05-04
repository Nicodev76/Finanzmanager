const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(express.static("."));
app.use(express.json());

const datum = new Date().toISOString().split("T")[0];

const db = new sqlite3.Database("meine_finazen.db");
const bauplan = `
  CREATE TABLE IF NOT EXISTS finanzdaten (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    datum     TEXT NOT NULL,
    kategorie TEXT NOT NULL,
    betrag    REAL NOT NULL
  )
`;

db.run(bauplan);

app.post("/speichern", (req, res) => {
  const { kategorie, betrag } = req.body;

  const datumHeute = new Date().toISOString().split("T")[0];

  const sql = "INSERT INTO finanzdaten (datum, kategorie, betrag) VALUES (?, ?, ?)";

  db.run(sql, [datumHeute, kategorie, betrag], function (err) {
    if (err) {
      res.status(500).send("Fehler beim Speichern");
    } else {
      res.send("Gespeichert mit Datum: " + datumHeute);
    }
  });
});

app.get("/daten-holen", (req, res) => {
  const sql = "SELECT * FROM finanzdaten";

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send("Fehler beim Abrufen der Daten");
    } else {
      res.json(rows);
    }
  });
});

app.listen(3000, () => {
  console.log("Server läuft auf Port 3000");
});
