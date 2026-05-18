async function mainTabelleLoad() {

    let code = "";

    console.log("funktion1")

    const antwort = await fetch("/daten-holen");
    const alleEintraege = await antwort.json();

    alleEintraege.forEach(element => {

        code += "<li>Kategorie : " + element.kategorie + "<br>Betrag : " + element.betrag.toFixed(2) + "€ <br>Zeit : " + element.datum + "</li><br>";
    });

    document.getElementById("mainPortfolioTabelle").innerHTML = code;

    console.log("funktion2")
}

mainTabelleLoad();