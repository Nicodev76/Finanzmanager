async function transaktionenLadenUndAnzeigen() {
  const nutzerid = localStorage.getItem("userId");

  const response = await fetch(`/api/finanzdaten?nutzerid=${nutzerid}`);

  const alleDaten = await response.json();

  const responsetransaktion = await fetch(
    `/api/sparentransaktion?nutzerid=${nutzerid}`,
  );

  const alleDatentransaktion = await responsetransaktion.json();

  const alleEintrage = [...alleDaten, ...alleDatentransaktion];

  alleEintrage.sort((a, b) => new Date(b.datum) - new Date(a.datum));

  const anzeigeelment = document.querySelector(
    ".analyse_transaktions_anzeige_div",
  );
  anzeigeelment.innerHTML = "";

  console.log(alleEintrage);

  alleEintrage.forEach((eintrag) => {
    if (eintrag.typ === "e") {
      anzeigeelment.innerHTML +=
        "<div class='analyse_transaktions_anzeige'><div><h4>" +
        eintrag.beschreibung +
        "</h4><p>" +
        eintrag.datum +
        " : " +
        eintrag.kategorie +
        "</p></div><div class='analyse_transaktions_anzeige_betrag_div'><p style = 'color:#00E396'>" +
        eintrag.betrag +
        "€</p></div></div>";
    } else if (eintrag.typ === "a") {
      anzeigeelment.innerHTML +=
        "<div class='analyse_transaktions_anzeige'><div><h4>" +
        eintrag.beschreibung +
        "</h4><p>" +
        eintrag.datum +
        " : " +
        eintrag.kategorie +
        "</p></div><div class='analyse_transaktions_anzeige_betrag_div'><p style = 'color:#FF4560'> - " +
        eintrag.betrag +
        "€</p></div></div>";
    } else if (eintrag.typ === "einnahme") {
      anzeigeelment.innerHTML +=
        "<div class='analyse_transaktions_anzeige'><div><h4 style='color:#f59e0b;'>" +
        eintrag.name +
        "</h4><p>" +
        eintrag.datum +
        "</p></div><div class='analyse_transaktions_anzeige_betrag_div'><p style = 'color:#00E396'>" +
        eintrag.betrag +
        "€</p></div></div>";
    } else if (eintrag.typ === "ausgabe") {
      anzeigeelment.innerHTML +=
        "<div class='analyse_transaktions_anzeige'><div><h4 style='color:#f59e0b;'>" +
        eintrag.name +
        "</h4><p>" +
        eintrag.datum +
        "</p></div><div class='analyse_transaktions_anzeige_betrag_div'><p style = 'color:#FF4560'>" +
        eintrag.betrag +
        "€</p></div></div>";
    }
  });
}

// Laden von daten beim öffnen der webseite

transaktionenLadenUndAnzeigen();
