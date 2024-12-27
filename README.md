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


### 5.  Orchestration avec Docker Compose

Dans cette partie, nous utilisons Docker Compose pour orchestrer notre application Node.js et sa dépendance Redis. Docker Compose simplifie le déploiement en coordonnant les conteneurs nécessaires à l'exécution de l'application.

## Prérequis
Avant de commencer, assurez-vous d'avoir :
- [Docker](https://www.docker.com/products/docker-desktop) installé sur votre machine.
- [Docker Compose](https://docs.docker.com/compose/) inclus dans votre installation Docker.

---

## Création du fichier docker-compose.yaml 

Voici sa structure :
```bash
services:
  app:
    build:
      context: ./userapi
      dockerfile: Dockerfile
    image: <dockerhub-username>/node-api
    ports:
      - "3000:3000"
    environment:
      REDIS_HOST: redis
      REDIS_PORT: 6379
    depends_on:
      - redis

  redis:
    image: redis:latest
    ports:
      - "6379:6379"
```
---

## Quelques commandes importante de Docker compose

Pour lancer les services :

```bash
docker-compose up --build
```

Pour vérifier les logs :
```bash
docker-compose logs -f
```

Pour tester l'application :
```bash
# Ajouter un utilisateur
curl -X POST -H "Content-Type: application/json" -d '{"id":"69","name":"John","email":"john@cena.com"}' http://localhost:3000/users

# Récupérer un utilisateur
curl http://localhost:3000/users/69

```

Pour arrêter les services :
```bash
docker-compose down
```

## Résultat attendu

À la fin de cette partie :

Les conteneurs app et redis fonctionnent correctement ensemble.
L'application est accessible sur http://localhost:3000.
Redis stocke et gère les données utilisateur via l'application.

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

### Run local image
![Run local image](image/4-docker-image/runLocal.png)

### Validité image
![Validiré image](image/4-docker-image/runValide.png)

#### Push image
![Push image](image/4-docker-image/push.png)

#### Vérificaiton dans DockerHub
![Docker Hub](image/4-docker-image/dockerHub.png)

### 5. Orchestration Docker Compose (DC +2)

Création d'une nouvelle image appelé node-api en utilisant les fonctionnalités de Docker Compose

#### Build image
![Build image](image/5-docker-compose/build.png)

#### Build image
![Push image](image/5-docker-compose/push.png)

#### Vérification image
![Verification dans docker Hub](image/5-docker-compose/dockerHub.png)

#### Lancement des services
![docker-compose-up](image/5-docker-compose/docker-compose-up.png)

#### Services fonctionnels
![Services fonctionnels](image/5-docker-compose/serveur-running.png)

### Création user avec curl snippet
![Curls snippet](image/5-docker-compose/curlSnippet.png)

### Création user avec curl snippet
![Creation user curl](image/5-docker-compose/creationUserCurl.png)

### Création user avec curl snippet
![Vérification création user curl](image/5-docker-compose/verificationUserCreation.png)


### 6. Orchestration Kubernetes (KUB +3)

# 🚀 Orchestration Kubernetes avec Minikube

Ce guide vous guide à travers la configuration de l'orchestration Docker utilisant Kubernetes sur Minikube. La configuration comprend le déploiement de deux services (`userapi` et `redis`) avec un stockage persistant.

## 📋 Prérequis

- **Minikube** et **kubectl** installés sur votre machine
- Les images Docker pour `userapi` et `redis` doivent être disponibles dans votre registre Docker local ou un registre public
- Connaissances de base des ressources Kubernetes (pods, déploiements, services)

## 🛠️ Instructions de configuration

### 1. 🌟 Installer Minikube et démarrer le cluster
> Action : Initialisation de l'environnement Kubernetes local

#### 📥 Installer Minikube

Suivez le guide officiel d'installation de [Minikube](https://minikube.sigs.k8s.io/docs/) en fonction de votre système d'exploitation.

#### 🚦 Démarrer le cluster Minikube

```bash
# Démarre un cluster Kubernetes local avec les paramètres par défaut
# Cette commande initialise un environnement Kubernetes mononode sur votre machine
minikube start
```

[Voir le résultat](./image/minikube-start.png)

#### ✅ Vérifier le cluster

```bash
# Affiche les informations sur le cluster Kubernetes en cours d'exécution
# Vous verrez l'URL du plan de contrôle et du service DNS CoreDNS
kubectl cluster-info
```

[Voir la sortie du cluster-info](./images/cluster-info.png)

### 2. 🐳 Dockeriser l'application
> Action : Préparation des conteneurs pour le déploiement

#### 🏗️ Construire les images Docker

```bash
# Construit l'image Docker pour l'API utilisateur
# Le tag 'latest' indique la version la plus récente
docker build -t quentinc123/userapi:latest .

# Construit l'image Docker pour Redis
# Utilise l'image officielle Redis comme base
docker build -t redis:latest .
```

[Voir le processus de build Docker](./images/docker-build.png)

### 3. 📝 Créer les manifestes Kubernetes
> Action : Configuration des ressources Kubernetes nécessaires

Créez les fichiers YAML Kubernetes suivants pour définir vos déploiements et services.

#### `redis-deployment.yaml`

Ce fichier définit le déploiement et le service pour le service `redis`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:latest
        ports:
        - containerPort: 6379
```

#### `redis-service.yaml`

Ce fichier définit le service pour le service `redis`.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: redis-service
spec:
  selector:
    app: redis
  ports:
    - protocol: TCP
      port: 6379
  clusterIP: None
```

#### `userapi-deployment.yaml`

Ce fichier définit le déploiement pour le service `userapi`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: userapi-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: userapi
  template:
    metadata:
      labels:
        app: userapi
    spec:
      containers:
      - name: userapi-container
        image: quentinc123/userapi:latest
        ports:
        - containerPort: 3000
        env:
        - name: REDIS_HOST
          value: redis-service
```

#### `userapi-service.yaml`

Ce fichier définit le service pour le service `userapi`.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: userapi-service
spec:
  selector:
    app: userapi
  ports:
    - protocol: TCP
      port: 3000
  clusterIP: None
```

#### Volume persistant et réclamation pour Redis

Créez les fichiers suivants pour le volume persistant et la réclamation.

**`redis-pv.yaml`** :

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: redis-pv
spec:
  capacity:
    storage: 1Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /mnt/data/redis
```

**`redis-pvc.yaml`** :

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: redis-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

[Configuration des manifestes en action](./images/manifests-creation.png)

### 4. ⚙️ Appliquer les manifestes Kubernetes
> Action : Déploiement des services dans le cluster

```bash
# Crée le volume persistant pour Redis
# Permet de conserver les données même après un redémarrage
kubectl apply -f redis-pv.yaml

# Crée la réclamation de volume persistant
# Lie le volume persistant à Redis
kubectl apply -f redis-pvc.yaml

# Déploie Redis avec la configuration spécifiée
# Crée un pod Redis avec stockage persistant
kubectl apply -f redis-deployment.yaml

# Expose Redis comme un service dans le cluster
# Permet aux autres pods de communiquer avec Redis
kubectl apply -f redis-service.yaml

# Déploie l'API utilisateur
# Crée les pods pour l'application userapi
kubectl apply -f userapi-deployment.yaml

# Expose l'API utilisateur comme un service
# Permet d'accéder à l'API depuis l'extérieur du cluster
kubectl apply -f userapi-service.yaml
```

[Voir le déploiement des manifestes](./images/manifests-deployment.png)

### 5. 🔍 Vérifier les déploiements
> Action : Validation de l'état des services déployés

```bash
# Liste tous les pods en cours d'exécution
# Vérifie que les pods sont en état 'Running'
kubectl get pods

# Liste tous les services actifs
# Montre les points d'accès des applications
kubectl get services

# Liste tous les déploiements
# Affiche le nombre de répliques et leur état
kubectl get deployments
```

[Voir l'état des déploiements](./images/deployment-status.png)

### 6. 🧪 Tester les services
> Action : Test de l'accessibilité des services déployés

```bash
# Transfère le port 3000 du service vers localhost
# Permet d'accéder à l'API depuis votre machine locale
kubectl port-forward service/userapi-service 3000:3000
```

[Voir l'interface utilisateur en action](./images/userapi-interface.png)

### 7. 🔄 Redémarrer les déploiements
> Action : Mise à jour des services en cours d'exécution

```bash
# Redémarre le déploiement de l'API utilisateur
# Utile pour appliquer les changements de configuration
kubectl rollout restart deployment/userapi-deployment

# Redémarre le déploiement Redis
# Assure que Redis redémarre proprement avec la nouvelle configuration
kubectl rollout restart deployment/redis-deployment
```

[Voir le redémarrage des déploiements](./images/deployment-restart.png)

### 8. 🧹 Nettoyer les ressources
> Action : Suppression propre des ressources créées

```bash
# Supprime le volume persistant Redis
# Libère l'espace de stockage alloué
kubectl delete -f redis-pv.yaml

# Supprime la réclamation de volume persistant
# Nettoie la demande de stockage
kubectl delete -f redis-pvc.yaml

# Supprime le déploiement Redis
# Arrête tous les pods Redis
kubectl delete -f redis-deployment.yaml

# Supprime le déploiement de l'API utilisateur
# Arrête tous les pods de l'API
kubectl delete -f userapi-deployment.yaml
```

[Voir le nettoyage des ressources](./images/cleanup.png)

## 🎉 Conclusion

Vous avez maintenant configuré avec succès l'orchestration Docker utilisant Kubernetes sur Minikube. Les services `userapi` et `redis` sont en cours d'exécution avec un stockage persistant, et vous pouvez tester les services localement en utilisant le transfert de port.

## 📚 Ressources utiles

- [Documentation officielle Kubernetes](https://kubernetes.io/docs/)
- [Documentation Minikube](https://minikube.sigs.k8s.io/docs/)
- [Guide des meilleures pratiques Kubernetes](https://kubernetes.io/docs/concepts/configuration/overview/)


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
