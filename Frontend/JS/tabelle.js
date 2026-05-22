async function tabelleUpdate() {
  const antwort = await fetch("/daten-holen");
  const daten = await antwort.json();

  let tabelle =
    "<div class='transactions_header'> <h3 class='datum_h3'>Datum</h3> <h3 class='kategorie_h3'>Kategorie</h3> <h3 class='betrag_h3'>Betrag</h3> <h3 class='aktione_h3'>Aktionen</h3>  </div> <hr> ";

  daten.reverse(); // Die neuesten Einträge nach oben

  daten.forEach((eintrag) => {
    // SICHERHEITSMASSNAHME: Falls ein Eintrag keine ID hat, überspringen, um 404-Fehler zu vermeiden
    if (!eintrag.id) return;

    let loeschButton = `<button class="delete_btn" onclick="eintragLoeschen(${eintrag.id})">🗑️</button>`;

    // Wir nutzen "else", damit JEDER Eintrag ein HTML-Element bekommt, auch wenn der Betrag genau 0 ist
    if (eintrag.betrag < 0) {
      tabelle +=
        "<div class='transactions_header'> <h3 class='datum_h3'>" +
        eintrag.datum +
        "</h3> <h3 class='kategorie_h3'>" +
        eintrag.kategorie +
        "</h3> <h3 class='betrag_h3_minus'>" +
        eintrag.betrag +
        "</h3> <h3 class='aktione_h3'>" +
        loeschButton +
        "</h3> </div> <hr> ";
    } else {
      // Fängt alle positiven Beträge UND die 0 ab!
      tabelle +=
        "<div class='transactions_header'> <h3 class='datum_h3'>" +
        eintrag.datum +
        "</h3> <h3 class='kategorie_h3'>" +
        eintrag.kategorie +
        "</h3> <h3 class='betrag_h3_plus'>" +
        eintrag.betrag +
        "</h3> <h3 class='aktione_h3'>" +
        loeschButton +
        "</h3>  </div> <hr> ";
    }
  });

  document.getElementById("transactionsListDiv").innerHTML = tabelle;
}

async function eintragLoeschen(id) {
  if (confirm("Möchtest du diesen Eintrag wirklich löschen?")) {
    const antwort = await fetch("/eintrag-loeschen/" + id, {
      method: "DELETE",
    });

    // Die Überprüfung MUSS mit in die if-Klammer hinein,
    // damit JavaScript auf die Variable 'antwort' zugreifen kann!
    if (antwort.ok) {
      tabelleUpdate(); // Tabelle neu laden
      if (window.aktualisierenDiagramm) {
        window.aktualisierenDiagramm(); // Liniendiagramm neu laden
      }
    } else {
      alert("Fehler beim Löschen des Eintrags."); // Tippfehler 'altert' korrigiert
    }
  }
}

tabelleUpdate();
