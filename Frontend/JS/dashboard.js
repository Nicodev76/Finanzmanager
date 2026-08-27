async function datenLaden() {
  const nutzerid = localStorage.getItem("userId");

  if (!nutzerid) {
    console.error("Keine Nutzer-ID gefunden. Bitte einloggen.");
    window.location.href = "login.html";
    return;
  }

  const response = await fetch(`/api/finanzdaten?nutzerid=${nutzerid}`)

  const alleDaten = await response.json();

  let summeEinnahmen = 0;
  let summeAusgaben = 0;

  alleDaten.forEach((eintrag) => {
    if (eintrag.typ === "e") {
      summeEinnahmen += eintrag.betrag;
    } else if (eintrag.typ === "a") {
      summeAusgaben += eintrag.betrag;
    }
  });

  const gesamtBetrag = summeEinnahmen - summeAusgaben;

  console.log("gesamt: ", gesamtBetrag);
  console.log("einnahmen: ", summeEinnahmen);
  console.log("ausgaben: ", summeAusgaben);

  document.getElementById("dashboardKontostand").innerHTML = gesamtBetrag + "€";
}

datenLaden();
