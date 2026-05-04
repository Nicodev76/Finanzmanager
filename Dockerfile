# Wir nutzen Node.js Version 20
FROM node:20-slim

# Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die Paketlisten und installiere Abhängigkeiten
COPY package*.json ./
RUN npm install

# Kopiere den Rest des Codes (Frontend, db.js, etc.)
COPY . .

# Dein Backend nutzt Port 3000
EXPOSE 3000

# Starte die App
CMD ["node", "db.js"]