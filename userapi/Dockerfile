# Utilisation d'une image de base officielle Node.js
FROM node:16

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copier tout le code source de l'application
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
