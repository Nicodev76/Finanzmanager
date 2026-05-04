# Wir wechseln auf das volle Bookworm-Image (moderner & kompatibler)
FROM node:20-bookworm

# Arbeitsverzeichnis festlegen
WORKDIR /app

# System-Abhängigkeiten für SQLite sicherheitshalber installieren
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Erst die Listen kopieren
COPY package*.json ./

# Alles frisch installieren
RUN npm install

# Den Rest des Codes kopieren
COPY . .

# Port freigeben
EXPOSE 3000

# Startbefehl
CMD ["node", "db.js"]