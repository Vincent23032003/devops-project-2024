# Projet DevOps 2024

## Description du Projet
Ce projet est réalisé dans le cadre du cours DevOps. Il s'agit d'une application web implémentant une API de gestion d'utilisateurs avec les fonctionnalités CRUD (Create, Read, Update, Delete), développée en Node.js et utilisant Redis comme base de données.

## Travail Réalisé

### 1. Application Web
- Développement d'une API REST complète en Node.js avec Express
- Implémentation des opérations CRUD pour les utilisateurs
- Stockage des données dans Redis
- Tests complets :
  - Tests unitaires des opérations Redis
  - Tests d'API pour tous les endpoints
  - Tests de configuration et connexion
  - Tests de l'endpoint de santé

### 2. Pipeline CI/CD
- Mise en place d'un pipeline avec GitHub Actions comprenant :
  - Build et tests automatisés
  - Déploiement automatique avec Docker Compose
  - Intégration de Redis pour les tests

## Structure du Projet
```
.
├── .github/
│   └── workflows/          # Configuration CI/CD
├── userapi/
│   ├── src/               # Code source de l'application
│   ├── test/              # Tests
│   ├── package.json       # Dépendances
│   └── CHANGELOG.md       # Journal des modifications
├── iac/                   # Pour Ansible (à venir)
├── k8s/                   # Pour Kubernetes (à venir)
├── istio/                 # Pour Istio (à venir)
├── image/                 # Screenshots (à venir)
└── docker-compose.yaml    # Configuration Docker Compose
```

## Installation et Utilisation

### Prérequis
- Node.js (v14 ou supérieur)
- Redis Server

### Installation

1. Cloner le repository :
```bash
git clone https://github.com/Vincent23032003/devops-project-2024.git
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

### Tests
Pour exécuter les tests :
```bash
npm test
```

### Développement
Pour lancer l'application en mode développement :
```bash
npm run dev
```

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

## Liens
- [Repository GitHub](https://github.com/Vincent23032003/devops-project-2024.git)

## Auteurs
- Vincent BARÉ
- Louis DECOURTIS
- Quentin CARMINOT

## Prochaines Étapes
- [ ] Configuration Docker et Docker Compose
- [ ] Infrastructure as Code avec Ansible
- [ ] Orchestration avec Kubernetes
- [ ] Service Mesh avec Istio
