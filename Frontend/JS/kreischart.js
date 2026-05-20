let kreisdiagramm = null; // Globale Referenz für das Chart-Objekt

async function datenFuerDiagrammUndRendern() {
    // 1. Variablen sauber auf 0 setzen
    let essen = 0;
    let freizeit = 0;
    let wohnen = 0;
    let gehalt = 0;

    try {
        // 2. Daten asynchron holen und warten (await), bis sie da sind
        const antwort = await fetch("/daten-holen");
        const alleEintraege = await antwort.json();

        // 3. Daten filtern und zusammenrechnen
        alleEintraege.forEach((eintrag) => {
            if (eintrag.kategorie === "essen") {
                essen += eintrag.betrag;
            } else if (eintrag.kategorie === "freizeit") {
                freizeit += eintrag.betrag;
            } else if (eintrag.kategorie === "wohnen") {
                wohnen += eintrag.betrag;
            } else if (eintrag.kategorie === "gehalt") {
                gehalt += eintrag.betrag;
            } else {
                console.log("Kategorie nicht gefunden: " + eintrag.kategorie);
            }
        });

        // 4. Diagramm erst bauen, WENN die Daten fertig berechnet sind
        let kreisChartElement = document.getElementById("KreisChartMain");
        
        if (!kreisChartElement) {
            console.error("HTML-Element 'KreisChartMain' wurde nicht gefunden!");
            return;
        }

        let optionen = {
            chart: {
                type: "donut",
                height: 400, // 10000 war vermutlich ein Tippfehler und viel zu groß :)
                toolbar: { show: false },
            },
            series: [essen, freizeit, wohnen, gehalt],
            labels: ["essen", "freizeit", "wohnen", "gehalt"],
        };

        // Falls das Diagramm schon existiert (z.B. bei einem Update), zerstören oder updaten
        if (kreisdiagramm) {
            kreisdiagramm.destroy();
        }

        kreisdiagramm = new ApexCharts(kreisChartElement, optionen);
        kreisdiagramm.render();
        console.log("Kreisdiagramm erfolgreich aktualisiert");

    } catch (error) {
        console.error("Fehler beim Laden oder Verarbeiten der Daten:", error);
    }
}

// NUR DIESER EINE Event-Listener startet alles zur richtigen Zeit (wenn das HTML bereit ist)
window.addEventListener("DOMContentLoaded", datenFuerDiagrammUndRendern);

// Falls du das Diagramm später manuell per Button updaten willst:
window.aktualisierenDiagramm = datenFuerDiagrammUndRendern;