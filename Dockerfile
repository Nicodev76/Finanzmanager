# Wir nutzen die Standard-Node Version (kein slim!)
FROM node:20-bookworm

# System-Tools für den Build von sqlite3 installieren
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# NUR package-Dateien kopieren
COPY package*.json ./

# WICHTIG: Wir löschen evtl. vorhandene Reste und bauen sqlite3 neu für Linux
RUN npm install && npm rebuild sqlite3 --build-from-source

# Jetzt erst den Rest kopieren
COPY . .

EXPOSE 3000

CMD ["node", "db.js"]