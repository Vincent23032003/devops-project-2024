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
✅ Création du Dockerfile
✅ Push sur Docker Hub

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

### 4. Construction et publication de l'image Docker de l'application

## Objectif
Cette étape consiste à :
1. Construire une image Docker fonctionnelle pour l'application.
2. S'assurer que seuls les fichiers nécessaires sont inclus dans l'image.
3. Publier l'image sur Docker Hub pour la rendre accessible.

---

## Préparation

### Structure du projet
Le projet contient les éléments suivants :
- **Dockerfile** : Définit comment l'image Docker est construite.
- **.dockerignore** : Spécifie les fichiers et dossiers à exclure de l'image Docker.
- **Code source** : L'application est un API utilisateur avec des fonctionnalités CRUD connectée à une base de données Redis.

---

## Étapes réalisées

### 1. Création d'un fichier `.dockerignore`
Le fichier `.dockerignore` est utilisé pour exclure les fichiers inutiles du contexte Docker, réduisant ainsi la taille de l'image. Voici son contenu :

```bash
plaintext
node_modules
.git
.dockerignore
Dockerfile
README.md
.log
```

### 2. Écriture du Dockerfile

```bash
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
```
### 3. Construction de l'image Docker

Pour construire l'image Docker, la commande suivante a été utilisée :

```bash
docker build -t vincennnt/userapi:latest .
```

Cette commande a :

Créé une image Docker nommée userapi sous mon compte Docker Hub vincennnt.
Utilisé le contexte actuel (.) pour inclure uniquement les fichiers nécessaires.

### 4. Test local de l'image Docker

Avant de publier l'image, elle a été testée en local :

```bash
docker run --name userapi --network vincent23032003Network -p 3000:3000 vincennnt/userapi:latest
```
Le conteneur a été connecté au réseau Docker pour interagir avec Redis.
Les logs ont confirmé que l'application s'est connectée correctement à Redis et a démarré.

### 5. Publication de l'image sur Docker Hub

L'image Docker a été publiée sur Docker Hub pour permettre un déploiement ultérieur :

```bash
docker push vincennnt/userapi:latest
```
Avant cela, un dépôt nommé userapi a été créé sur Docker Hub pour correspondre au nom de l'image.

### Résultat
L'image Docker est maintenant disponible sur Docker Hub : Lien vers Docker Hub (remplacer par le lien réel).
L'application peut être déployée depuis Docker Hub en utilisant :
```bash
docker pull vincennnt/userapi:latest
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

*✅ Exécution réussie de tous les tests unitaires et d'intégration*

#### API Endpoints - Opérations CRUD

| Opération | Endpoint | Description | Capture d'écran |
|-----------|----------|-------------|-----------------|
| **CREATE** | `POST /users` | Création d'un utilisateur | ![Création](image/1-app-web/api_create.png) |
| **READ** | `GET /users/:id` | Lecture des détails | ![Lecture](image/1-app-web/api_get.png) |
| **UPDATE** | `PUT /users/:id` | Mise à jour des informations | ![Mise à jour](image/1-app-web/api_update.png) |
| **DELETE** | `DELETE /users/:id` | Suppression d'un utilisateur | ![Suppression](image/1-app-web/api_delete.png) |

```bash
# Création d'un utilisateur
curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"id":"1","name":"test","email":"test@test.com"}'

# Lecture d'un utilisateur
curl http://localhost:3000/users/1

# Mise à jour d'un utilisateur
curl -X PUT http://localhost:3000/users/1 \
     -H "Content-Type: application/json" \
     -d '{"name":"updated test"}'

# Suppression d'un utilisateur
curl -X DELETE http://localhost:3000/users/1
```

#### Health Check
![Health Check](image/1-app-web/health_check.png)

*✅ L'endpoint `/health` confirme que l'application est opérationnelle*

### 2. Pipeline CI/CD (CICD +3)

| Étape | Description | Capture d'écran |
|-------|-------------|-----------------|
| **GitHub Actions** | Pipeline d'intégration continue | ![GitHub Actions](image/2-ci-cd/github_actions.png) |
| **Heroku** | Déploiement continu | ![Heroku Deployment](image/2-ci-cd/heroku_deployment.png) |

### 3. Infrastructure as Code (IAC +3)

| Composant | Description | Capture d'écran |
|-----------|-------------|-----------------|
| **Vagrant** | Machine virtuelle opérationnelle | ![Vagrant Status](image/3-iac/vagrant_status.png) |
| **Ansible** | Configuration automatisée | ![Ansible Provisioning](image/3-iac/ansible_provisioning.png) |
| **Application** | Accès via port forwarding | ![Application Access](image/3-iac/app_acces.png) |

### 4. Conteneurisation Docker (D +2)

#### Build image
![Build image](image/4-docker-image/build.png)

#### Push image
![Push image](image/4-docker-image/push.png)

### 5. Orchestration Docker Compose (DC +2)
*🚧 En cours de développement*

### 6. Orchestration Kubernetes (KUB +3)
*🚧 En cours de développement*

### 7. Service Mesh avec Istio (IST +2)
*🚧 En cours de développement*

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
