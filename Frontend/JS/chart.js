let mainDiagramm;

async function datenFuerDiagramm() {
    
    const antwort = await fetch("/daten-holen");
    const alleEintraege = await antwort.json();

    let monatsdaten = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    alleEintraege.forEach((eintrag) => {

        let datum = new Date(eintrag.datum);

        let monatsIndex = datum.getMonth();

        monatsdaten[monatsIndex] += eintrag.betrag;
    });

    mainDiagramm.updateSeries([{ 
        name: "Umsatz",
        data: monatsdaten
     }]);
}

function diagrammInitialisieren() {
  let chartElement = document.getElementById("mainFinanzChart");

  let optionen = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
    },

    series: [
      {
        name: "Umsatz",
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
    },

    //Hab hier ist das sytling vom diagramm.

    colors: ["#00E296"],
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
  };

  mainDiagramm = new ApexCharts(chartElement, optionen);

  mainDiagramm.render();

  datenFuerDiagramm();
}


window.addEventListener("DOMContentLoaded", diagrammInitialisieren);

window.aktualisierenDiagramm = datenFuerDiagramm;
