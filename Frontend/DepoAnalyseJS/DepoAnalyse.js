function meilenstin_hinzufügen_button() {
    const button = document.querySelector("#meilensteinplanerHinzufügenButton");
    const button2 = document.querySelector("#meilensteinplanerBestätigungsButton");
    
    button.style.display = "none";
    button2.style.display = "unset";
}   

function meilensteinplaner_bestätigungs_button() {
    const button = document.querySelector("#meilensteinplanerBestätigungsButton");
    const button2 = document.querySelector("#meilensteinplanerHinzufügenButton");
    
    button.style.display = "none";
    button2.style.display = "unset";
}
