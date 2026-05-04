# 1. Nutze das volle Bookworm-Image für maximale Kompatibilität mit SQLite
FROM node:20-bookworm

# 2. Installiere notwendige Build-Tools für native Pakete (wie sqlite3)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 3. Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# 4. Kopiere nur die Abhängigkeitslisten (Caching-Vorteil)
COPY package*.json ./

# 5. Installiere alle Pakete und erzwinge den Build von sqlite3 für Linux
# Das löst den "invalid ELF header" und "GLIBC" Fehler
RUN npm install && npm rebuild sqlite3 --build-from-source

# 6. Kopiere den restlichen Quellcode
COPY . .

# 7. Dein Node.js App-Port (muss mit deinem Code übereinstimmen)
EXPOSE 3000

# 8. Startbefehl (Achte darauf, dass db.js wirklich deine Startdatei ist)
CMD ["node", "db.js"]