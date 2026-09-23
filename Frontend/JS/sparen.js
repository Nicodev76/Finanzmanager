async function sparziel_anzeigen() {
  const leeren = document.querySelector(".sparziel_anzeige");
  leeren.innerHTML = "";

  const nutzerid = localStorage.getItem("userId");

  if (!nutzerid) {
    alert("Du bist nicht eingeloggt!");
    window.location.href = "login.html";
    return;
  }

  const response = await fetch(`/api/sparen?nutzerid=${nutzerid}`);

  const alleDaten = await response.json();

  alleDaten.forEach((eintrag) => {
    const div = document.querySelector(".sparziel_anzeige");

    const prozentbetrag =
      Math.round((eintrag.eingezahlterbetrag / eintrag.zielbetrag) * 100) / 100;

    div.innerHTML +=
      "<div class='sparziel_div'><p>" +
      eintrag.name +
      "</p><div><div class='sparziel_beschriftungs_div'><p>" +
      Math.round(eintrag.eingezahlterbetrag * 100) / 100 +
      "/" +
      eintrag.zielbetrag +
      "€</p><p>" +
      prozentbetrag * 100 +
      "%</p></div><div>Fortschrits Balken</div></div></div>";
  });
}

async function spazielerstellen() {
  const nutzerid = localStorage.getItem("userId");

  if (!nutzerid) {
    alert("Du bist nicht eingeloggt!");
    window.location.href = "login.html";
    return;
  }

  const name = document.getElementById("sparenEingabeNameInput").value;
  const zielbetrag = document.getElementById("sparenEingabeBetragInput").value;
  const eingezahlt = 0;

  const datenPaket = {
    name: name,
    zielbetrag: zielbetrag,
    eingezahlterbetrag: eingezahlt,
    nutzerid: nutzerid,
  };

  try {
    const response = await fetch("/api/sparen", {
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

  sparziel_anzeigen();
}

let erstellen;
let eintrag;

function sparzielEnscheidungAnzeigeElmenteLaden() {
  erstellen = document.querySelector(".erstellenspar");
  eintrag = document.querySelector(".eintragspar");
}
let entscheidungEintragErstellen = "erstellen";

async function spareintragClickenscheidung() {
  sparzielEnscheidungAnzeigeElmenteLaden();

  eintrag.style.backgroundColor = "rgba(36, 122, 240)";
  erstellen.style.backgroundColor = "rgba(36, 122, 240, 0.00)";

  entscheidungEintragErstellen = "eintrag";

  let buttenname = document.querySelector(".sparen_eintrag_button");

  buttenname.textContent = "Eintragen";

  const sparzielselect = document.querySelector(
    ".sparenEintagSparzielAuswahlFeld",
  );

  const nutzerid = localStorage.getItem("userId");

  if (!nutzerid) {
    alert("Du bist nicht eingeloggt!");
    window.location.href = "login.html";
    return;
  }

  const response = await fetch(`/api/sparen?nutzerid=${nutzerid}`);

  const alleDaten = await response.json();

  sparzielselect.innerHTML = ""; //enferne alle optionenn das sie nicht doppelt angezeigt werden

  alleDaten.forEach((eintrag) => {
    sparzielselect.innerHTML +=
      "<option value='" + eintrag.id + "'>" + eintrag.name + "</option>";
  });

  const sparzselect = document.querySelector(
    ".sparenEintagSparzielAuswahlFeld",
  );
  const einnhamausgabenfeld = document.querySelector(
    ".einnahme_ausgabe_enscheidung_sparen_eintrag",
  );
  const datumfeld = document.querySelector(".datum_div_sparen_eintrag");

  sparzselect.classList.remove("verstecken");
  einnhamausgabenfeld.style.display = "flex";
  datumfeld.style.display = "flex";

  const heute = new Date();

  const jahr = heute.getFullYear();
  const monat = String(heute.getMonth() + 1).padStart(2, "0");
  const tag = String(heute.getDate()).padStart(2, "0");

  const aktuellesDatum = `${jahr}-${monat}-${tag}`;

  document.getElementById("eingabeDatumFeldSparenEintrag").value =
    aktuellesDatum;
}

async function sparerstellenClickenscheidung() {
  sparzielEnscheidungAnzeigeElmenteLaden();

  erstellen.style.backgroundColor = "rgba(36, 122, 240)";
  eintrag.style.backgroundColor = "rgba(36, 122, 240, 0.00)";

  entscheidungEintragErstellen = "erstellen";

  let buttenname = document.querySelector(".sparen_eintrag_button");

  buttenname.textContent = "Erstellen";

  const sparzselect = document.querySelector(
    ".sparenEintagSparzielAuswahlFeld",
  );
  const einnhamausgabenfeld = document.querySelector(
    ".einnahme_ausgabe_enscheidung_sparen_eintrag",
  );
  const datumfeld = document.querySelector(".datum_div_sparen_eintrag");

  sparzselect.classList.add("verstecken");
  einnhamausgabenfeld.style.display = "none";
  datumfeld.style.display = "none";
}

let enscheidungEinnahmeAusgabe = "einnahme";

let Einnahmefeld;
let Ausgabefeld;

function sparenEinnahmeAusgabeElmenteLaden() {
  Einnahmefeld = document.querySelector(".EinnahmeSparen");
  Ausgabefeld = document.querySelector(".AusgabeSparen");
}

function sparenEinnahmeClickEnscheidung() {
  sparenEinnahmeAusgabeElmenteLaden();

  Einnahmefeld.style.backgroundColor = "rgba(36, 122, 240)";
  Ausgabefeld.style.backgroundColor = "rgba(36, 122, 240, 0.00)";

  enscheidungEinnahmeAusgabe = "einnahme";
}

function sparenAusgabeClickEnscheidung() {
  sparenEinnahmeAusgabeElmenteLaden();

  Ausgabefeld.style.backgroundColor = "rgba(36, 122, 240)";
  Einnahmefeld.style.backgroundColor = "rgba(36, 122, 240, 0.00)";

  enscheidungEinnahmeAusgabe = "ausgabe";
}

const sparzselect = document.querySelector(".sparenEintagSparzielAuswahlFeld");
const einnhamausgabenfeld = document.querySelector(
  ".einnahme_ausgabe_enscheidung_sparen_eintrag",
);
const datumfeld = document.querySelector(".datum_div_sparen_eintrag");

sparzselect.classList.add("verstecken");
einnhamausgabenfeld.style.display = "none";
datumfeld.style.display = "none";

sparziel_anzeigen();
