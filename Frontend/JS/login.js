async function neuesKonto() {
  const benutzername = document.getElementById("benutzername").value;
  const passwort1 = document.getElementById("passwort1").value;
  const passwort2 = document.getElementById("passwort2").value;

  if (passwort1 !== passwort2) {
    alert("Die Passwörter stimmen nicht überein!");
  } else if (passwort1 === passwort2) {
    const neuesKontoDaten = {
      benutzername: benutzername,
      passwort: passwort1,
    };

    fetch("/registrieren", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(neuesKontoDaten),
    });
  } else {
    console.log("Fehler: Unbekannter Fehler bei der Registrierung.");
    alert("Fehler: Unbekannter Fehler bei der Registrierung.");
  }
}

async function login() {
  const benutzername = document.getElementById("benutzername").value;
  const passwort = document.getElementById("passwort").value;

  const loginDaten = {
    benutzername: benutzername,
    passwort: passwort,
  };

  const antwort = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDaten),
  });

  const daten = await antwort.json();

  if (antwort.status === 200) {
    // Bei Erfolg schickt das Backend { message: "Login erfolgreich" }
    alert(daten.message); 
    window.location.href = "/dashboard.html"; 
  } else {
    // Bei Fehlern schickt das Backend { error: "Benutzername oder Passwort falsch" }
    // HIER steckte das "undefined" – wir ändern es auf daten.error
    alert("Login fehlgeschlagen: " + daten.error);
  }
}
