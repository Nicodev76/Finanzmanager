let minusDiagramm;
let PlusDiagramm;

let plusEssen = 0;
let PlusFreizeit = 0;
let PlusWohnen = 0;
let PlusGehalt = 0;

let minusEssen = 0;
let minusFreizeit = 0;
let minusWohnen = 0;
let minusGehalt = 0;

async function datenFürDiagramm() {
  const antwort = await fetch("/daten-holen");
  const alleEintraege = await antwort.json();

  plusEssen = 0;
  PlusFreizeit = 0;
  PlusWohnen = 0;
  PlusGehalt = 0;

  minusEssen = 0;
  minusFreizeit = 0;
  minusWohnen = 0;
  minusGehalt = 0;

  alleEintraege.forEach((eintrag) => {
    if (eintrag.kategorie === "essen") {
      console.log("Kategorie essen erkannt ");

      if (eintrag.betrag > 0) {
        plusEssen += eintrag.betrag;
      } else if (eintrag.betrag < 0) {
        minusEssen -= eintrag.betrag;
      } else {
        console.log("Es gibt einen fehelr der betrag ist nicht positiv und auch icht negativ melden sie diesen fehler bitte das er behoben wird.");
      }
    } else if (eintrag.kategorie === "freizeit") {
      console.log("Kategorie freizeit erkannt ");

      if (eintrag.betrag > 0) {
        PlusFreizeit += eintrag.betrag;
      } else if (eintrag.betrag < 0) {
        minusFreizeit -= eintrag.betrag;
      } else {
        console.log("Es gibt einen fehelr der betrag ist nicht positiv und auch icht negativ melden sie diesen fehler bitte das er behoben wird.");
      }
    } else if (eintrag.kategorie === "wohnen") {
      console.log("Kategorie wohnen erkannt ");
      if (eintrag.betrag > 0) {
        PlusWohnen += eintrag.betrag;
      } else if (eintrag.betrag < 0) {
        minusWohnen -= eintrag.betrag;
      } else {
        console.log("Es gibt einen fehelr der betrag ist nicht positiv und auch icht negativ melden sie diesen fehler bitte das er behoben wird.");
      }
    } else if (eintrag.kategorie === "gehalt") {
      console.log("Kategorie gehalt erkannt ");
      if (eintrag.betrag > 0) {
        PlusGehalt += eintrag.betrag;
      } else if (eintrag.betrag < 0) {
        minusGehalt -= eintrag.betrag;
      } else {
        console.log("Es gibt einen fehelr der betrag ist nicht positiv und auch icht negativ melden sie diesen fehler bitte das er behoben wird.");
      }
    } else {
      console.log(
        "Es gibt einen fehler die kategory wurde nicht erkannt melden sie den fehler bitte das er behoben wird und geben sie die kategory an die nicht erkannt wurde mit einem bild von dieser fehlermeldung damit wir den fehler schneller beheben können die kategory lautet " +
          eintrag.kategorie,
      );
    }
  });

  console.log("Plus Essen: " + plusEssen);
  console.log("Plus Freizeit: " + PlusFreizeit);
  console.log("Plus Wohnen: " + PlusWohnen);
  console.log("Plus Gehalt: " + PlusGehalt);
  console.log("Minus Essen: " + minusEssen);
  console.log("Minus Freizeit: " + minusFreizeit);
  console.log("Minus Wohnen: " + minusWohnen);
  console.log("Minus Gehalt: " + minusGehalt);
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

    series: [plusEssen, PlusFreizeit, PlusWohnen, PlusGehalt],
    labels: ["Essen", "Freizeit", "Wohnen", "Gehalt"],
  };

  let optionenMinus = {
    chart: {
      type: "donut",
      height: 400,
      toolbar: {
        show: false,
      },
    },
    series: [minusEssen, minusFreizeit, minusWohnen, minusGehalt],
    labels: ["Essen", "Freizeit", "Wohnen", "Gehalt"],
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
