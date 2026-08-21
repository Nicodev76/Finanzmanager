Das ist ein finazmanager der regelmäßig updates bekommt und mit modernen fichas ausgestatet wird und so efizent wie möglich ihre datenspeichert wir danken für ihre unterstützung.


==================================================
  FINANZMANAGER - SERVER BEFEHLE & WERKZEUGKISTE
==================================================

1. APP AKTUALISIEREN & NEU STARTEN (Standard-Workflow)
--------------------------------------------------
cd /home/nicolay/finanzmanager
git pull
pm2 restart all


2. ÜBERWACHUNG & LOGS (Monitoring)
--------------------------------------------------
# Status aller PM2-Prozesse anzeigen
pm2 status

# Live-Logs der Anwendung ansehen (Beenden mit Strg + C)
pm2 logs finanzmanager

# Live-Ressourcenverbrauch (CPU & RAM) anzeigen
pm2 monit


3. PROZESS-STEUERUNG (PM2)
--------------------------------------------------
# App stoppen
pm2 stop finanzmanager

# App starten
pm2 start finanzmanager

# App neu starten
pm2 restart finanzmanager


4. WEBSERVER (CADDY) BEFEHLE
--------------------------------------------------
# Caddy-Konfiguration nach Änderungen neu laden
sudo systemctl reload caddy

# Status des Caddy-Webservers prüfen
sudo systemctl status caddy

# Caddy-Logs einsehen (z.B. bei Zertifikats- oder Domain-Fehlern)
sudo journalctl -u caddy -e


5. DATENBANK & DATEIEN VERWALTEN
--------------------------------------------------
# In den Projektordner wechseln
cd /home/nicolay/finanzmanager

# Alte/versehentlich hochgeladene Datenbank löschen
rm Datenbank.db

# Inhalt des Frontend-Ordners anzeigen
ls -la /home/nicolay/finanzmanager/Frontend