let mainDiagramm;

async function datenFuerDiagramm() {
  const antwort = await fetch("/daten-holen");
  const alleEintraege = await antwort.json();

  let einnahmen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let ausgaben = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let gesamt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  alleEintraege.forEach((eintrag) => {
    let datum = new Date(eintrag.datum);

    let monatsIndex = datum.getMonth();

    let betragAlsZahl = parseFloat(eintrag.betrag);

    gesamt[monatsIndex] += betragAlsZahl;

    if (betragAlsZahl > 0) {
      einnahmen[monatsIndex] += betragAlsZahl;
    } else {
      ausgaben[monatsIndex] -= betragAlsZahl;
    }
  });

  mainDiagramm.updateSeries([
    {
      name: "Gesamt in €",
      data: gesamt,
    },
    {
      name: "Einnahmen in €",
      data: einnahmen,
    },
    {
      name: "Ausgaben in €",
      data: ausgaben,
    },
  ]);
}

function diagrammInitialisieren() {
  let chartElement = document.getElementById("mainFinanzChart");

  let optionen = {
    chart: {
      type: "line",
      height: "90%",
      toolbar: {
        show: false,
      },
    },

    series: [
      {
        name: "Gesamt in €",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },

      {
        name: "Einnahmen in €",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },

      {
        name: "Ausgaben in €",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],

    xaxis: {
      categories: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ],

      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },

    //Hab hier ist das sytling vom diagramm.

    colors: ["#0074D9", "#2ECC40", "#FF4136"],
    stroke: {
      curve: "smooth",
      width: 3,
    },

    dataLabels: {
      enabled: false,
    },

    tooltip: {
      enabled: true,
      theme: "dark",
    },

    x: {
      show: true,
    },

    y: {
      title: {
        formatter: (seriesName) => "Umsatz in €",
      },
    },

    marker: {
      show: true,
    },

    yaxis: {
      forceNiceScale: true,
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
  };

  mainDiagramm = new ApexCharts(chartElement, optionen);

  mainDiagramm.render();

  datenFuerDiagramm();
}

window.addEventListener("DOMContentLoaded", diagrammInitialisieren);

window.aktualisierenDiagramm = datenFuerDiagramm;
