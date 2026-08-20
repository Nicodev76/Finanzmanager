async function datenLaden(){
    const response = await fetch ("/api/finanzdaten");
    const alleDaten = await response.json();


    let summeEinnahmen = 0;
    let summeAusgaben = 0;

    alleDaten.forEach(eintrag => {
        if (eintrag.typ === "e") {
            summeEinnahmen += eintrag.betrag;
        }
        else if (eintrag.typ === "a") {
            summeAusgaben +=eintrag.betrag;
        }
    });

    const gesamtBetrag = summeEinnahmen - summeAusgaben;

    console.log("gesamt: ",gesamtBetrag);
    console.log("einnahmen: ", summeEinnahmen);
    console.log("ausgaben: ",summeAusgaben);

   document.getElementById("dashboardKontostand").innerHTML = gesamtBetrag + "€";

    
}

datenLaden()