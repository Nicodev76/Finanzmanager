

async function tabelleUpdate() {

    const antwort =await fetch("/daten-holen");
    const daten = await antwort.json();

    let tabelle =  "<div class='transactions_header'> <h3 class='datum_h3'>Datum</h3> <h3 class='kategorie_h3'>Kategorie</h3> <h3 class='betrag_h3'>Betrag</h3> <h3 class='aktione_h3'>Aktionen</h3>  </div> <hr> ";

    daten.reverse(); //Um den code umzukehren das die tabbelle in der richtigen rienfolge ist also die neusten einträge oben stehen

    daten.forEach(eintrag => {

        if(eintrag.betrag < 0){
            tabelle += "<div class='transactions_header'> <h3 class='datum_h3'>" + eintrag.datum + "</h3> <h3 class='kategorie_h3'>"+eintrag.kategorie+"</h3> <h3 class='betrag_h3_minus'>"+eintrag.betrag+"</h3> <h3 class='aktione_h3'>🗑️</h3> </div> <hr> ";
        }
        else if(eintrag.betrag > 0){
            tabelle += "<div class='transactions_header'> <h3 class='datum_h3'>" + eintrag.datum + "</h3> <h3 class='kategorie_h3'>"+eintrag.kategorie+"</h3> <h3 class='betrag_h3_plus'>"+eintrag.betrag+"</h3> <h3 class='aktione_h3'>🗑️</h3>  </div> <hr> ";
        }
        
        
    });

    document.getElementById("transactionsListDiv").innerHTML = tabelle;

}

tabelleUpdate();


