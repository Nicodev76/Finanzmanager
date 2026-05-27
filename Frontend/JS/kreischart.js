let Pluswerte;
let Minuswerte;

let Pluslabels;
let Minuslabels;

let PlusDiagramm;
let minusDiagramm;

async function datenFürDiagramm() {
  const antwort = await fetch("/daten-holen");
  const alleEintraege = await antwort.json();

  // KORREKTUR 1: Sammler direkt als leere Objekte {} starten!
  let plusSammler = {};
  let minusSammler = {};

  alleEintraege.forEach((eintrag) => {
    if (eintrag.betrag > 0) {
      let kategorie = eintrag.kategorie;
      let betrag = eintrag.betrag;

      // KORREKTUR 2: Überall "plusSammler" mit kleinem "p" genutzt
      if (!plusSammler[kategorie]) {
        plusSammler[kategorie] = 0;
      }

      plusSammler[kategorie] += betrag;
      // KORREKTUR 3: Das verirrte "F;" wurde gelöscht

    } else if (eintrag.betrag < 0) {
      let kategorie = eintrag.kategorie;
      let betrag = eintrag.betrag;

      if (!minusSammler[kategorie]) {
        minusSammler[kategorie] = 0;
      }

      minusSammler[kategorie] -= betrag;
    } else {
      console.log("Fehler: Betrag ist 0");
    }
  });

  // KORREKTUR 2b: Variablen-Namen exakt wie oben definiert (Großes P und M)
  Pluswerte = Object.values(plusSammler);
  Minuswerte = Object.values(minusSammler);
  
  Pluslabels = Object.keys(plusSammler);
  Minuslabels = Object.keys(minusSammler);
}

async function diagrammUpdate() {
  await datenFürDiagramm();

  let chartElementPlus = document.getElementById("KreisChartPlus");
  let chartElementMinus = document.getElementById("KreisChartMinus");

  let optionenPlus = {
    chart: {
      type: "donut",
      height: 400,
      toolbar: {
        show: false,
      },
    },

    legend: {
      labels: {
        colors: "#ffffff",
      },
    },
    // KORREKTUR 4: Eckige Klammern entfernt, da die Variablen schon Arrays sind
    series: Pluswerte,
    labels: Pluslabels,
  };

  let optionenMinus = {
    chart: {
      type: "donut",
      height: 400,
      toolbar: {
        show: false,
      },
    },

    legend: {
      labels: {
        colors: "#ffffff",
      },
    },
    // KORREKTUR 4: Eckige Klammern entfernt
    series: Minuswerte,
    labels: Minuslabels,
  };

  if (PlusDiagramm) {
    PlusDiagramm.destroy();
  }
  if (minusDiagramm) {
    minusDiagramm.destroy();
  }

  minusDiagramm = new ApexCharts(chartElementMinus, optionenMinus);
  PlusDiagramm = new ApexCharts(chartElementPlus, optionenPlus);

  PlusDiagramm.render();
  minusDiagramm.render();
}

diagrammUpdate();