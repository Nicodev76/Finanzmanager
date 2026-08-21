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
app.use(express.json());
const path = require("path");

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "Index.html"));
});

app.post("/api/finanzdaten", (req, res) => {
  const { typ, beschreibung, kategorie, datum, betrag, nutzerid } = req.body;

  const sql =
    "INSERT INTO finanzdaten (typ, beschreibung, kategorie, datum, betrag, nutzerid) VALUES (?,?,?,?,?,?)";

  db.run(
    sql,
    [typ, beschreibung, kategorie, datum, betrag, nutzerid],
    function (err) {
      if (err) {
        console.error("Fehler beim speichern", err.message);
        return res
          .status(500)
          .json({ fehler: "Daten konnten nicht gespeichert werden" });
      }

      res.json({
        meldung: "Daten wurden erfolgreich gespeichert",
        id: this.lastID,
      });
    },
  );
});

app.get("/api/finanzdaten", (req, res) => {
  const sql = "SELECT * FROM finanzdaten";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("fehler beim ausgelessen:", err.message);
      return res
        .status(500)
        .json({ fehler: "Daten konnten nicht ausgelessen werden" });
    }

    res.json(rows);
  });
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
