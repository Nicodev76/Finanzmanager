async function sparziel_anzeigen() {
  const leeren = document.querySelector(".sparen_div");
  leeren.innerHTML = "";

  const nutzerid = localStorage.getItem("userId");

  if (!nutzerid) {
    alert("Du bist nicht eingeloggt!");
    window.location.href = "login.html";
    return;
  }

  const response = await fetch(`/api/sparen?nutzerid=${nutzerid}`);

  const alleDaten = await response.json();

  alleDaten.forEach((eintrag) => {
    const div = document.querySelector(".sparen_div");
    div.innerHTML +=
      "<div class='sparziel_div'><p>" +
      eintrag.name +
      "</p><div><div class='sparziel_beschriftungs_div'><p>" +
      eintrag.eingezahlterbetrag +
      "/" +
      eintrag.zielbetrag +
      "€</p><p>0%</p></div><div>Fortschrits Balken</div></div></div>";
  });
}

async function spazielerstellen() {
  const nutzerid = localStorage.getItem("userId");

  if (!nutzerid) {
    alert("Du bist nicht eingeloggt!");
    window.location.href = "login.html";
    return;
  }

  const name = document.getElementById("sparenEingabeNameInput").value;
  const zielbetrag = document.getElementById("sparenEingabeBetragInput").value;
  const eingezahlt = 0;

  const datenPaket = {
    name: name,
    zielbetrag: zielbetrag,
    eingezahlterbetrag: eingezahlt,
    nutzerid: nutzerid,
  };

  try {
    const response = await fetch("/api/sparen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datenPaket),
    });

    const ergebnis = await response.json();

    if (response.ok) {
      alert(ergebnis.meldung);
    } else {
      alert("Fehler:" + ergebnis.fehler);
    }
  } catch (error) {
    console.error("verbindung zum Server fehlgeschlagen:", error);
    alert("Der Server ist nicht erreichbar!");
  }

  sparziel_anzeigen();
}

sparziel_anzeigen();
