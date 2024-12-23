# Projet DevOps 2024

## Description du Projet
Ce projet s'inscrit dans le cadre du cours DevOps à l'école ECE Paris. L'objectif est de mettre en place une application web moderne en suivant les meilleures pratiques DevOps, notamment :

- **Développement** : Application Node.js/Express avec API REST et base de données Redis
- **Qualité** : Tests automatisés, intégration continue
- **Déploiement** : Conteneurisation avec Docker, orchestration avec Kubernetes
- **Infrastructure** : Infrastructure as Code avec Vagrant et Ansible
- **Monitoring** : Service Mesh avec Istio pour la gestion du trafic et la résilience

L'application elle-même est une API de gestion d'utilisateurs permettant les opérations CRUD (Create, Read, Update, Delete), servant de support pour démontrer l'ensemble de la chaîne DevOps, du développement à la production.

## État d'Avancement du Projet

### 1. Application Web
✅ API CRUD pour les utilisateurs
✅ Stockage dans Redis
✅ Tests (unit, API, configuration, connection)
✅ Endpoint health check

### 2. Pipeline CI/CD
✅ Configuration avec GitHub Actions
✅ Tests automatisés
✅ Déploiement configuré

### 3. Infrastructure as Code
✅ Configuration Vagrant (1 VM Linux)
✅ Provisioning avec Ansible (installation de runtime, DB, application)

### 4. Docker
⏳ Création du Dockerfile
⏳ Push sur Docker Hub

### 5. Docker Compose
⏳ Création du docker-compose.yml

### 6. Kubernetes
⏳ Installation de Minikube
⏳ Création des manifests YAML (deployments, services, volumes)

### 7. Service Mesh avec Istio
⏳ Déploiement avec Istio
⏳ Configuration du routing et traffic shifting

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

### 3. Infrastructure as Code
- Configuration d'une VM Ubuntu 20.04 LTS avec Vagrant
- Provisioning automatisé avec Ansible incluant :
  - Installation de Node.js 18.x
  - Installation et configuration de Redis
  - Déploiement automatique de l'application
  - Configuration des ports (3000 pour l'API, 6379 pour Redis)
  - Vérification de la santé de l'application

Pour démarrer l'environnement de développement avec Vagrant :

1. Assurez-vous d'avoir installé :
   - VirtualBox
   - Vagrant

2. Lancez l'environnement :
```bash
cd iac
vagrant up
```

3. Vérifiez que l'application fonctionne :
```bash
# Depuis la VM
vagrant ssh -c "curl http://localhost:3000/health"

# Depuis votre machine hôte
curl http://localhost:3000/health
```

4. Pour arrêter l'environnement :
```bash
vagrant halt    # Arrêter la VM
vagrant destroy # Supprimer la VM
```

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
├── iac/                   # Pour Ansible
├── k8s/                   # Pour Kubernetes (à venir)
├── istio/                 # Pour Istio (à venir)
├── image/                 # Screenshots
└── docker-compose.yaml    # Configuration Docker Compose
```

## Screenshots

### 1. Application Web et Tests (APP +2)

#### Tests Unitaires et d'Intégration
![Tests Réussis](image/1-app-web/npm_test.png)

*Exécution réussie de tous les tests unitaires et d'intégration, incluant les tests Redis et API*

#### API Endpoints
![Health Check](image/1-app-web/health_check.png)

*L'endpoint de santé /health confirme que l'application est opérationnelle*

#### Opérations CRUD sur les Utilisateurs
1. Création d'un utilisateur :
![Création Utilisateur](image/1-app-web/api_create.png)

*POST /users - Création réussie d'un nouvel utilisateur avec ID, nom et email*

2. Lecture d'un utilisateur :
![Lecture Utilisateur](image/1-app-web/api_get.png)

*GET /users/:id - Récupération des détails d'un utilisateur existant*

3. Mise à jour d'un utilisateur :
![Mise à jour Utilisateur](image/1-app-web/api_update.png)

*PUT /users/:id - Mise à jour des informations d'un utilisateur*

4. Suppression d'un utilisateur :
![Suppression Utilisateur](image/1-app-web/api_delete.png)

*DELETE /users/:id - Suppression réussie d'un utilisateur*

### 2. Pipeline CI/CD (CICD +3)

#### GitHub Actions
![GitHub Actions](image/2-ci-cd/github_actions.png)

*Pipeline d'intégration continue exécutant les tests et le build automatiquement*

#### Déploiement Heroku
![Heroku Deployment](image/2-ci-cd/heroku_deployment.png)

*Déploiement continu réussi sur la plateforme Heroku*

### 3. Infrastructure as Code (IAC +3)

#### État de la VM
![Vagrant Status](image/3-iac/vagrant_status.png)

*La machine virtuelle est correctement créée et en cours d'exécution via Vagrant*

#### Provisioning Ansible
![Ansible Provisioning](image/3-iac/ansible_provisioning.png)

*Configuration automatisée réussie avec Ansible (Node.js, Redis, et déploiement de l'application)*

#### Accès Application
![Application Access](image/3-iac/app_acces.png)

*L'application est accessible depuis l'hôte via le port forwarding configuré*

### 4. Conteneurisation Docker (D +2)
*À venir*

### 5. Orchestration Docker Compose (DC +2)
*À venir*

### 6. Orchestration Kubernetes (KUB +3)
*À venir*

### 7. Service Mesh avec Istio (IST +2)
*À venir*

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

## Déploiement

L'application est déployée sur Heroku et accessible à l'adresse suivante :
- [https://devops-userapi-2024-671a8bceceee.herokuapp.com/](https://devops-userapi-2024-671a8bceceee.herokuapp.com/)

### Endpoints disponibles

- `/` - Page d'accueil
- `/health` - Endpoint de santé
- `/users` - API utilisateurs (désactivée en production)

### État du déploiement

- Application web Node.js/Express
- Tests unitaires et d'intégration
- Déploiement continu sur Heroku
- Health check endpoint

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
- Vincent BARÉ Cyber Gr 01
- Louis DECOURTIS Cyber Gr 01
- Quentin CARMINOT Cyber Gr 01
