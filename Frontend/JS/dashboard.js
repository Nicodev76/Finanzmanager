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
      summeEinnahmen += Math.round(eintrag.betrag * 100) /100; 
    } else if (eintrag.typ === "a") {
      summeAusgaben += Math.round(eintrag.betrag * 100) /100;
    }
  });

  const gesamtBetrag = Math.round(summeEinnahmen * 100 - summeAusgaben * 100) / 100;

  console.log("gesamt: ", gesamtBetrag);
  console.log("einnahmen: ", summeEinnahmen);
  console.log("ausgaben: ", summeAusgaben);

  document.getElementById("dashboardKontostand").innerHTML = gesamtBetrag + "€";
}

datenLaden();
