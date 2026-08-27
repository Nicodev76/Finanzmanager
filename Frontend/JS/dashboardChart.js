async function dashboardChartLaden() {
  let einnahmendata = new Array(30).fill(0);
  let ausgabendata = new Array(30).fill(0);
  let gesamtdataz = new Array(30).fill(0);
  let gesamtdata = new Array(30).fill(0);
  let ausgabenmonat = 0;
  let einnahmenmonat = 0;

  const nutzerid = localStorage.getItem("userId");

  if (!nutzerid) {
    console.error("Keine Nutzer-ID gefunden. Bitte einloggen.");
    window.location.href = "login.html";
    return;
  }

  const response = await fetch(`/api/finanzdaten?nutzerid=${nutzerid}`);

  const alleDaten = await response.json();

  const lezteTage = [];
  const heute = new Date();

  for (let i = 0; i < 30; i++) {
    const d = new Date(heute);
    d.setDate(heute.getDate() - i);
    lezteTage.push(d.toISOString().split("T")[0]);
  }

  alleDaten.forEach((daten) => {
    let i = 0;
    if (daten.typ === "e") {
      while (i < 30) {
        let d = 29 - i;

        if (daten.datum === lezteTage[i]) {
          einnahmendata[d] += daten.betrag;

          gesamtdataz[d] += daten.betrag;

          i = 30;
        } else {
          i++;
        }
      }
    } else if (daten.typ === "a") {
      while (i < 30) {
        let d = 29 - i;

        if (daten.datum === lezteTage[i]) {
          ausgabendata[d] += daten.betrag;

          gesamtdataz[d] -= daten.betrag;

          i = 30;
        } else {
          i++;
        }
      }
    }
  });

  let i = 0;
  gesamtdataz.forEach((daten) => {
    if (i === 0) {
      gesamtdata[i] = daten;
    } else if (i > 0) {
      let d = i - 1;
      gesamtdata[i] = daten + gesamtdata[d];
    }

    i++;
  });

  einnahmendata.forEach((daten) => {
    einnahmenmonat += daten;
  });

  ausgabendata.forEach((daten) => {
    ausgabenmonat += daten;
  });

  let gesamtmonat = einnahmenmonat - ausgabenmonat;

  console.log(lezteTage);

  document.getElementById("dashboardKontostandÄnderung").innerHTML =
    gesamtmonat + "€  " + "(0.00 %)"; //Wird noch ersezt durch den bergleich zum vormonat
  document.getElementById("dashboardMonatlicheAusgaben").innerHTML =
    ausgabenmonat;

  let datums = lezteTage.reverse();

  let options = {
    chart: {
      type: "line",
      height: 250,
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    series: [
      {
        name: "Einnahmen",
        data: einnahmendata,
      },
      {
        name: "Ausgaben",
        data: ausgabendata,
      },
      {
        name: "Gesamt",
        data: gesamtdata,
      },
    ],
    xaxis: {
      categories: datums,
    },
    yaxis: {
      forceNiceScale: true,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#00E396", "#FF4560", "#008FFB"],
  };

  let chart = new ApexCharts(
    document.querySelector("#dashboradDiagramm"),
    options,
  );
  chart.render();
}

dashboardChartLaden();
