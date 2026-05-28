const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: true, // Erlaubt der Electron-App (egal welches Protokoll) zuzugreifen
    credentials: true, // Erlaubt das Senden und Empfangen von Cookies/Sessions!
  }),
);

// 1. Middleware einrichten
app.use(express.static("Frontend"));
app.use(express.json());

// SESSIONS EINRICHTEN: Muss vor den Routen stehen!
app.use(
  session({
    secret: "dein_geheimer_schluessel_fuer_cookies",
    resave: false,
    saveUninitialized: false,
  }),
);

// 2. Startseite festlegen
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Frontend/login.html");
});

const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "meine_finazen.db"));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS benutzer (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      benutzername  TEXT UNIQUE NOT NULL,
      passwort      TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS finanzdaten (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      benutzer_id   INTEGER NOT NULL,
      datum         TEXT NOT NULL,
      kategorie     TEXT NOT NULL,
      betrag        REAL NOT NULL
    )
  `);
});

// ==========================================
// ROUTE: REGISTRIEREN (Saubere Version)
// ==========================================
app.post("/registrieren", async (req, res) => {
  const { benutzername, passwort } = req.body;
  const sql = "SELECT * FROM benutzer WHERE benutzername = ?";

  db.get(sql, [benutzername], (err, row) => {
    if (err) {
      console.error("Fehler bei der Datenbankabfrage:", err.message);
      return res.status(500).json({ error: "Interner Serverfehler" });
    }

    if (row) {
      return res
        .status(400)
        .json({ error: "Benutzername ist bereits vergeben" });
    } else {
      bcrypt.hash(passwort, 10, (err, hash) => {
        if (err) {
          console.error("Fehler beim Hashen des Passworts:", err.message);
          return res.status(500).json({ error: "Interner Serverfehler" });
        } else {
          const insertSql =
            "INSERT INTO benutzer (benutzername, passwort) VALUES (?, ?)";

          db.run(insertSql, [benutzername, hash], (err) => {
            if (err) {
              console.error("Fehler beim Einfügen des Benutzers:", err.message);
              return res.status(500).json({ error: "Interner Serverfehler" });
            } else {
              // SCHICKT SAUBERES JSON!
              res
                .status(201)
                .json({ message: "Benutzer erfolgreich registriert" });
            }
          });
        }
      });
    }
  });
});

// ==========================================
// ROUTE: LOGIN (Perfekt als JSON)
// ==========================================
app.post("/login", (req, res) => {
  const { benutzername, passwort } = req.body;
  const sql = "SELECT * FROM benutzer WHERE benutzername = ?";

  db.get(sql, [benutzername], (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "Benutzername oder Passwort falsch" });
    }

    bcrypt.compare(passwort, user.passwort, (err, isMatch) => {
      if (err || !isMatch) {
        return res
          .status(400)
          .json({ error: "Benutzername oder Passwort falsch" });
      }

      // Login erfolgreich – Session erstellen
      req.session.benutzerId = user.id;
      res.json({ message: "Login erfolgreich" });
    });
  });
});

// ==========================================
// ROUTE: DATEN HOLEN
// ==========================================
app.get("/daten-holen", (req, res) => {
  if (!req.session.benutzerId) {
    return res.status(401).json({ error: "Bitte zuerst einloggen!" });
  }

  const sql = "SELECT * FROM finanzdaten WHERE benutzer_id = ?";
  db.all(sql, [req.session.benutzerId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
    } else {
      res.json(rows);
    }
  });
});

// ==========================================
// ROUTE: SPEICHERN
// ==========================================
app.post("/speichern", (req, res) => {
  if (!req.session.benutzerId) {
    return res.status(401).json({ error: "Bitte zuerst einloggen!" });
  }

  const { kategorie, betrag } = req.body;
  const datumHeute = new Date().toISOString().split("T")[0];
  const sql =
    "INSERT INTO finanzdaten (benutzer_id, datum, kategorie, betrag) VALUES (?, ?, ?, ?)";

  db.run(
    sql,
    [req.session.benutzerId, datumHeute, kategorie, betrag],
    function (err) {
      if (err) {
        res.status(500).json({ error: "Fehler beim Speichern" });
      } else {
        res.json({ message: "Gespeichert!" }); // Als JSON umgewandelt
      }
    },
  );
});

// ==========================================
// ROUTE: LÖSCHEN
// ==========================================
app.delete("/eintrag-loeschen/:id", (req, res) => {
  if (!req.session.benutzerId) {
    return res.status(401).json({ error: "Bitte zuerst einloggen!" });
  }

  const { id } = req.params;
  const sql = "DELETE FROM finanzdaten WHERE id = ? AND benutzer_id = ?";

  db.run(sql, [id, req.session.benutzerId], function (err) {
    if (err) {
      res.status(500).json({ error: "Fehler beim Löschen des Eintrags" });
    } else {
      res.json({ message: "Eintrag gelöscht" }); // Als JSON umgewandelt
    }
  });
});

// Server starten
app.listen(3000, () => {
  console.log("Server läuft auf Port 3000 und das Loginsystem ist aktiv!");
});
