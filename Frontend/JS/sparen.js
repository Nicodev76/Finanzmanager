function sparziel_anzeigen() {
  let name = document.getElementById("sparenEingabeNameInput").value;
  let betrag = document.getElementById("sparenEingabeBetragInput").value;

  const div = document.querySelector(".sparen_div")
  div.innerHTML +=
    "<div class='sparziel_div'><p>" + name +"</p><div><div class='sparziel_beschriftungs_div'><p>0€/" + betrag +"€</p><p>0%</p></div><div>Fortschrits Balken</div></div></div>";
}


