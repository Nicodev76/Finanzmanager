function nav_main() {
    const home = document.querySelector(".dashboard_div");
    const analyse = document.querySelector(".analyse_div");
    const aktien = document.querySelector(".aktien_div");
    const sparen = document.querySelector(".sparen_div");
    const reports = document.querySelector(".reports_div");
    const mehr = document.querySelector(".mehr_div");
    const eingabe = document.querySelector(".eingabe_div");

    home.style.display = "none";
    analyse.style.display = "none";
    aktien.style.display = "none";
    sparen.style.display = "none";
    reports.style.display = "none";
    mehr.style.display = "none";
    eingabe.style.display = "none";

    
}

function nav_home() {
    nav_main();

    const home = document.querySelector(".dashboard_div");
    home.style.display ="flex"
}
function nav_analyse() {
    nav_main();

    const analyse = document.querySelector(".analyse_div");
    analyse.style.display ="flex"
}
function nav_aktien() {
    nav_main();

    const aktien = document.querySelector(".aktien_div");
    aktien.style.display ="flex"
}
function nav_sparen() {
    nav_main();

    const sparen = document.querySelector(".sparen_div");
    sparen.style.display ="flex"
}
function nav_reports() {
    nav_main();

    const reports = document.querySelector(".reports_div");
    reports.style.display ="flex"
}
function nav_mehr() {
    nav_main();

    const mehr = document.querySelector(".mehr_div");
    mehr.style.display ="flex"
}

function eingabe_MenueAnzeigen() {
    nav_main();

    const mehr = document.querySelector(".eingabe_div");
    mehr.style.display ="flex"
}

nav_analyse();