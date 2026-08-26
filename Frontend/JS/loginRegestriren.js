function regestriren() {
  let benutzernameEingabe = document.getElementById("benutzernameR").value;

  const zeichen = [...benutzernameEingabe];

  console.log(zeichen);

  const length = zeichen.length;

  if (length < 3) {
    console.log(
      "Bitte gebe einen benutzernamen ein der mindestens 1 bustaben hat.",
    );
    alert(
      "Bitte gebe einen benutzernamen ein der mindestens 1 bustaben hat.frage sollt eich wie den benutzernamen ihn erstmal auslessen und dann kucken ob er",
    );
  }

  if (length > 20) {
    console.log(
      "Der Benutzername ist zu lang gebe ein benutzernamne mit maximal 20 Zeichen ein",
    );
    alert(
      "Der Benutzername ist zu lang gebe ein benutzernamne mit maximal 20 Zeichen ein",
    );
  } else if (length < 21) {
    const erlaubtMuster = /^[a-zA-Z0-9-_]+$/;
    let istGueltig = erlaubtMuster.test(benutzernameEingabe);

    if (!istGueltig) {
      console.log(
        "Fehler: Der Benutzername enthält unerlaubte Zeichen! (Erlaubt: a-z, A-Z, 0-9, -, _)",
      );
      alert(
        "Fehler: Der Benutzername enthält unerlaubte Zeichen! (Erlaubt: a-z, A-Z, 0-9, -, _)",
      );
    } else {
      console.log("Der Benutzername ist gültig!");
      // Einfügen von Benutzername speicehrn
    }
  } else {
    console.error("Es ist ein fehler aufgetreten");
    alert("Es ist ein fehler aufgetreten");
  }

  const passwort1 = document.getElementById("passwort1R").value;
  const passwort2 = document.getElementById("passwort2R").value;

  const erlaubtMusterpasswort = /^[a-zA-Z0-9]+$/;

  let istGueltigpasswort = erlaubtMusterpasswort.test(passwort1);

  if (passwort1 === passwort2) {
    console.log("Die Passwörter sind gleich.");

    if (!istGueltigpasswort) {
      console.log(
        "Fehler: Das Passwort enthält unerlaubte Zeichen! (Erlaubt: a-z, A-Z, 0-9)",
      );
      alert(
        "Fehler: Das Passwort enthält unerlaubte Zeichen! (Erlaubt: a-z, A-Z, 0-9)",
      );
    } else {
      console.log("Das Passwort ist gültig");
      // Einfügen von passwort speicehrn
    }
  } else {
    console.log("Die passwöter stimmen nicht überein");
    alert("Die passwöter stimmen nicht überein");
  }
}

function login() {
  let benutzernameEingabe = document.getElementById("benutzernameL").value;

  const zeichen = [...benutzernameEingabe];

  console.log(zeichen);

  const length = zeichen.length;

  if (length < 3) {
    console.log(
      "Bitte gebe einen benutzernamen ein der mindestens 1 bustaben hat.",
    );
    alert(
      "Bitte gebe einen benutzernamen ein der mindestens 1 bustaben hat.frage sollt eich wie den benutzernamen ihn erstmal auslessen und dann kucken ob er",
    );
  }

  if (length > 20) {
    console.log(
      "Der Benutzername ist zu lang gebe ein benutzernamne mit maximal 20 Zeichen ein",
    );
    alert(
      "Der Benutzername ist zu lang gebe ein benutzernamne mit maximal 20 Zeichen ein",
    );
  } else if (length < 21) {
    const erlaubtMuster = /^[a-zA-Z0-9-_]+$/;
    let istGueltig = erlaubtMuster.test(benutzernameEingabe);

    if (!istGueltig) {
      console.log(
        "Fehler: Der Benutzername enthält unerlaubte Zeichen! (Erlaubt: a-z, A-Z, 0-9, -, _)",
      );
      alert(
        "Fehler: Der Benutzername enthält unerlaubte Zeichen! (Erlaubt: a-z, A-Z, 0-9, -, _)",
      );
    } else {
      console.log("Der Benutzername ist gültig!");
      // Einfügen von Benutzername speicehrn
    }
  } else {
    console.error("Es ist ein fehler aufgetreten");
    alert("Es ist ein fehler aufgetreten");
  }

  const passwort = document.getElementById("passwortL").value;

  const erlaubtMusterpasswort = /^[a-zA-Z0-9]+$/;

  let istGueltigpasswort = erlaubtMusterpasswort.test(passwort);

  if (!istGueltigpasswort) {
    console.log(
      "Fehler: Das Passwort enthält unerlaubte Zeichen! (Erlaubt: a-z, A-Z, 0-9)",
    );
    alert(
      "Fehler: Das Passwort enthält unerlaubte Zeichen! (Erlaubt: a-z, A-Z, 0-9)",
    );
  } else {
    console.log("Das Passwort ist gültig");
    // Einfügen von passwort speicehrn
  }
}
