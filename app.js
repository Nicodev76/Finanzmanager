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
    `CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE
  )`,

    (err) => {
      if (err) {
        console.error(
          "Es ist ein Fehler bei der erstellung der user Tabbelle aufgetreten",
          err.message,
        );
      } else {
        console.log("Die user Tabbele wurde erfolgreich erstellt");
      }
    },
  );

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

  db.run(
    `CREATE TABLE IF NOT EXISTS sparen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nutzerid INTEGER NOT NULL,
    name TEXT NOT NULL,
    zielbetrag INTEGER NOT NULL,
    eingezahlterbetrag INTEGER NOT NULL

  )`,

    (err) => {
      if (err) {
        console.error(
          "Es ist ein Fehler bei der erstellung der Spar Tabbelle aufgetreten",
          err.message,
        );
      } else {
        console.log("Die Spar Tabbele wurde erfolgreich erstellt");
      }
    },
  );
});

const express = require("express");
const app = express();
app.use(express.json());
const path = require("path");
const bcrypt = require("bcryptjs");

app.use(express.static(path.join(__dirname, "Frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "login.html"));
});

//finazdaten

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
  const nutzerid = req.query.nutzerid;

  if (!nutzerid) {
    return res.status(400).json({
      fehler: "keine Nutzer ID angegeben",
    });
  }

  const sql = "SELECT * FROM finanzdaten WHERE nutzerid = ?";

  db.all(sql, [nutzerid], (err, rows) => {
    if (err) {
      console.error("fehler beim ausgelessen:", err.message);
      return res
        .status(500)
        .json({ fehler: "Daten konnten nicht ausgelessen werden" });
    }

    res.json(rows);
  });
});

//user daten

app.post("/api/user", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hasheadPasswort = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO user (username, password, email) VALUES (?,?,?)";

    db.run(sql, [username, hasheadPasswort, email], function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(400).json({
            fehler: "Dieser Benutzername ist leider schon vergeben!",
          });
        }

        console.error("Fehler beim speichern des Users:", err.message);
        return res
          .status(500)
          .json({ fehler: "Benutzer konnte nicht gespeichert werden" });
      }

      res.json({
        meldung: "Benutzer erfolgreich gespeichert",
        id: this.lastID,
      });
    });
  } catch (error) {
    console.error("Fehler beim HAshen", error);
    res.status(500).json({
      fehler: "Interner Serverfehler",
    });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM user WHERE username = ?";

  db.get(sql, [username], async (err, row) => {
    if (err) {
      console.error("Fehler beim LOgin:", err.message);
      return res
        .status(500)
        .json({ fehler: "Ein Serverfehler ist aufgetreten" });
    }

    if (!row) {
      return res.status(400).json({ fehler: "Benutzer nicht gefunden" });
    }

    const passwortKorrekt = await bcrypt.compare(password, row.password);

    if (!passwortKorrekt) {
      return res.status(400).json({ fehler: "Falsches password" });
    }

    res.json({
      meldung: "Erfolgreich eingeloggt!",
      userId: row.id,
      username: row.username,
    });
  });
});

//spar daten 

app.post("/api/sparen", (req, res) => {
  const { nutzerid, name, zielbetrag, eingezahlterbetrag } = req.body;

  const sql =
    "INSERT INTO finanzdaten (nutzerid, name, zielbetrag, eingezahlterbetrag) VALUES (?,?,?,?,?,?)";

  db.run(sql, [nutzerid, name, zielbetrag, eingezahlterbetrag], function (err) {
    if (err) {
      console.error("Fehler beim speichern der Spar daten", err.message);
      return res
        .status(500)
        .json({ fehler: "Spar Daten konnten nicht gespeichert werden" });
    }

    res.json({
      meldung: "Spar Daten wurden erfolgreich gespeichert",
      id: this.lastID,
    });
  });
});


app.get("/api/sparen", (req, res) => {
  const nutzerid = req.query.nutzerid;

  if (!nutzerid) {
    return res.status(400).json({
      fehler: "keine Nutzer ID angegeben",
    });
  }

  const sql = "SELECT * FROM finanzdaten WHERE nutzerid = ?";

  db.all(sql, [nutzerid], (err, rows) => {
    if (err) {
      console.error("fehler beim ausgelessen der spar daten:", err.message);
      return res
        .status(500)
        .json({ fehler: "Spar Daten konnten nicht ausgelessen werden" });
    }

    res.json(rows);
  });
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
