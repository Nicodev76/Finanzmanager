let entscheidung = "e";

const einnahme = document.querySelector(".einnahme_p");
const ausgabe = document.querySelector(".ausgabe_p");

const heute = new Date();

const jahr = heute.getFullYear();
const monat = String(heute.getMonth() + 1).padStart(2, "0");
const tag = String(heute.getDate()).padStart(2, "0");

const aktuellesDatum = `${jahr}-${monat}-${tag}`;

document.getElementById("eingabeDatumFeld").value = aktuellesDatum;

function einnahmeClick() {
  einnahme.style.backgroundColor = "rgba(36, 122, 240)";
  ausgabe.style.backgroundColor = "rgba(36, 122, 240, 0.00)";

  entscheidung = "e";
}

function ausgabeClick() {
  ausgabe.style.backgroundColor = "rgba(36, 122, 240)";
  einnahme.style.backgroundColor = "rgba(36, 122, 240, 0.00)";

  entscheidung = "a";
}

async function EingabeSpeichern() {
  const typWert = entscheidung;
  const beschreibungWert = document.getElementById(
    "eingabeBeschreibungsFeld",
  ).value;
  const kategorieWert = document.getElementById("eingabeKategorieFeld").value;
  const datumWert = document.getElementById("eingabeDatumFeld").value;
  const betragWert = document.getElementById("eingabeBetragFeld").value;
  const nutzeridWert = 1;

  console.log(
    typWert,
    beschreibungWert,
    kategorieWert,
    datumWert,
    betragWert,
    nutzeridWert,
  );

  const datenPaket = {
    typ: typWert,
    beschreibung: beschreibungWert,
    kategorie: kategorieWert,
    datum: datumWert,
    betrag: betragWert,
    nutzerid: nutzeridWert,
  };

  try {
    const response = await fetch("/api/finanzdaten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datenPaket),
    });

    const ergebnis = await response.json();

    if (response.ok) {
      alert(ergebnis.meldung);
    } else {
      alert("Fehler:" + ergebnis.fehler);
    }
  } catch (error) {
    console.error("verbindung zum Server fehlgeschlagen:", error);
    alert("Der Server ist nicht erreichbar!");
  }

  document.getElementById("eingabeBeschreibungsFeld").value = "";
  document.getElementById("eingabeKategorieFeld").value = "";
  document.getElementById("eingabeBetragFeld").value = "";
  const heute = new Date();

  const jahr = heute.getFullYear();
  const monat = String(heute.getMonth() + 1).padStart(2, "0");
  const tag = String(heute.getDate()).padStart(2, "0");

  const aktuellesDatum = `${jahr}-${monat}-${tag}`;

  document.getElementById("eingabeDatumFeld").value = aktuellesDatum;
}