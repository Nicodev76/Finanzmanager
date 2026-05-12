
async function allesLadenUndAnzeigen() {

    const antwort = await fetch("/daten-holen");
    const daten = await antwort.json();

    let einnahmen = 0;
    let ausgaben = 0;

    daten.forEach((eintrag) => {
        if (eintrag.betrag > 0) {
            einnahmen += eintrag.betrag;
        } else {
            ausgaben += eintrag.betrag;
        }
    });

    let gesamt = einnahmen + ausgaben;

    console.log("Einnahmen: " + einnahmen);
    console.log("Ausgaben: " + ausgaben);
    console.log("Gesamt: " + gesamt);

    document.getElementById("einnahmen_output").value = einnahmen.toFixed(2) + "€";
    document.getElementById("ausgaben_output").value = ausgaben.toFixed(2) + "€";
    document.getElementById("gesamt_output").value = gesamt.toFixed(2) + "€";

    window.aktualisierenDiagramm();
}

window.onload = allesLadenUndAnzeigen;

async function addEinnahme() {

    let betrag = document.getElementById("inputBetrag").value;
    let kategorie = document.getElementById("inputKategorie").value;

    const daten = {
        kategorie: kategorie,
        betrag: parseFloat(betrag)
    };

    await fetch("/speichern", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(daten)
    });

    allesLadenUndAnzeigen();
   
}

async function addAusgabe() {
     
    let betrag = document.getElementById("inputBetrag").value;
    let kategorie = document.getElementById("inputKategorie").value;

    const daten = {
        kategorie: kategorie,
        betrag: -Math.abs(parseFloat(betrag))
    };

    await fetch("/speichern", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(daten)
    });

    allesLadenUndAnzeigen();
}



