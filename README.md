# DevOps Project 2024

## Description du Projet
Ce projet implémente une API REST simple de gestion d'utilisateurs avec les fonctionnalités CRUD (Create, Read, Update, Delete). L'application est développée en Node.js avec Express.js et utilise Redis comme base de données.

## Fonctionnalités
- API REST complète pour la gestion des utilisateurs
- Stockage des données dans Redis
- Tests unitaires et d'intégration
- Endpoint de santé (/health)
- Documentation complète des endpoints

## Structure du Projet
```
.
├── userapi/
│   ├── src/
│   │   └── index.js          # Point d'entrée de l'application
│   ├── test/
│   │   ├── api.test.js       # Tests d'API
│   │   ├── unit.test.js      # Tests unitaires
│   │   ├── config.test.js    # Tests de configuration
│   │   └── test-setup.js     # Configuration des tests
│   ├── package.json          # Dépendances et scripts
│   └── CHANGELOG.md          # Journal des modifications
└── README.md
```

## Prérequis
- Node.js (v14 ou supérieur)
- Redis Server

## Installation

1. Cloner le repository :
```bash
git clone <url-du-repo>
cd devops-project-2024
```

2. Installer Redis :
```bash
sudo apt-get install redis-server
sudo service redis-server start
```

3. Installer les dépendances :
```bash
cd userapi
npm install
```

## Tests
Pour exécuter les tests :
```bash
npm test
```

Les tests incluent :
- Tests unitaires des opérations Redis
- Tests d'API pour tous les endpoints CRUD
- Tests de configuration et de connexion
- Tests de l'endpoint de santé

## API Endpoints

### Health Check
- GET `/health` - Vérifie l'état de l'application

### Utilisateurs
- POST `/users` - Créer un nouvel utilisateur
  - Body: `{ "id": "string", "name": "string", "email": "string" }`
- GET `/users/:id` - Récupérer un utilisateur par ID
- PUT `/users/:id` - Mettre à jour un utilisateur
  - Body: `{ "name": "string", "email": "string" }`
- DELETE `/users/:id` - Supprimer un utilisateur

## Développement
Pour lancer l'application en mode développement :
```bash
npm run dev
```

## Auteur
[Votre nom]

## Licence
ISC
