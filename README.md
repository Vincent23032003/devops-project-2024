# DevOps Project 2024

## 📑 Table des matières
1. [Introduction](#introduction)
2. [Prérequis](#prérequis)
3. [Installation](#installation)
4. [Les 7 Composants](#les-7-composants)
   - [Application Web](#1-application-web)
   - [CI/CD Pipeline](#2-cicd-pipeline)
   - [Infrastructure as Code](#3-infrastructure-as-code)
   - [Docker](#4-docker)
   - [Docker Compose](#5-docker-compose)
   - [Kubernetes](#6-kubernetes)
   - [Service Mesh avec Istio](#-7-service-mesh-avec-istio)
5. [Structure du Projet](#-structure-du-projet)
6. [Liens](#-liens)
7. [Auteurs](#-auteurs)

## 🚀 Introduction

Dans le cadre de notre formation à l'ECE Paris, nous avons développé un projet DevOps complet qui met en œuvre les meilleures pratiques de l'industrie. Ce projet consiste en une API REST de gestion d'utilisateurs, construite avec Node.js et Redis, et déployée à travers une chaîne DevOps complète.

Notre objectif était de créer une application moderne qui démontre l'utilisation des technologies DevOps essentielles : du développement au déploiement, en passant par la conteneurisation et l'orchestration. Nous avons mis l'accent sur l'automatisation, la scalabilité et la maintenabilité du code.

## ⚡ Prérequis

Pour exécuter ce projet dans son intégralité, vous aurez besoin des éléments suivants installés sur votre machine :

- **Node.js (v14 ou supérieur)**
  - Environnement d'exécution JavaScript
  - npm pour la gestion des dépendances

- **Redis**
  - Base de données en mémoire
  - Utilisée pour le stockage des données utilisateurs

- **Docker & Docker Compose**
  - Docker pour la conteneurisation
  - Docker Compose pour l'orchestration locale

- **Kubernetes (Minikube)**
  - Orchestrateur de conteneurs
  - Minikube pour le développement local

- **Istio**
  - Service Mesh pour Kubernetes
  - Gestion avancée du trafic

- **Vagrant & VirtualBox**
  - Vagrant pour la gestion des VM
  - VirtualBox comme hyperviseur

## 🔧 Installation

Nous avons conçu le processus d'installation pour être aussi simple et automatisé que possible. Voici les étapes détaillées :

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Vincent23032003/devops-project-2024.git
   cd devops-project-2024
   ```
   Cette commande récupère la dernière version du code depuis GitHub.

2. **Installer les dépendances**
   ```bash
   cd userapi
   npm install
   ```
   Cette étape installe toutes les dépendances Node.js nécessaires au projet.

3. **Lancer les tests**
   ```bash
   npm test
   ```
   Exécute la suite complète de tests pour vérifier que tout fonctionne correctement.

4. **API Endpoints**
   Notre API expose les endpoints suivants pour la gestion des utilisateurs :

   | Méthode | Endpoint | Description | Exemple de payload |
   |---------|----------|-------------|-------------------|
   | GET | `/health` | Vérifie l'état de l'application | - |
   | GET | `/` | Page d'accueil avec documentation | - |
   | POST | `/users` | Créer un utilisateur | `{"username": "john", "email": "john@example.com"}` |
   | GET | `/users/:id` | Obtenir les détails d'un utilisateur | - |
   | PUT | `/users/:id` | Mettre à jour un utilisateur | `{"email": "new.email@example.com"}` |
   | DELETE | `/users/:id` | Supprimer un utilisateur | - |

## 🛠️ Les 7 Composants

### 1. Application Web

Notre application web représente le cœur du projet. Nous avons choisi des technologies modernes et robustes pour construire une API REST performante et facilement maintenable.

#### Technologies Utilisées

Nous avons sélectionné avec soin notre stack technologique :

- **Node.js et Express**
  - Framework web rapide et minimaliste
  - Support natif de l'asynchrone
  - Grande communauté et écosystème riche

- **Redis**
  - Base de données en mémoire ultra-rapide
  - Parfait pour le stockage de sessions
  - Support des structures de données complexes

- **Jest**
  - Framework de test complet
  - Support du code coverage
  - Mocking intégré

#### Fonctionnalités Implémentées

Notre API offre un ensemble complet de fonctionnalités :

1. **API REST CRUD**
   - Endpoints bien documentés
   - Validation des données avec Joi
   - Gestion des erreurs standardisée

2. **Validation des Données**
   - Schémas de validation stricts
   - Messages d'erreur clairs
   - Sanitization des inputs

3. **Gestion des Erreurs**
   - Middleware d'erreur centralisé
   - Codes HTTP appropriés
   - Messages d'erreur détaillés

4. **Monitoring**
   - Endpoint de health check
   - Métriques de performance
   - Logs structurés

#### Tests Approfondis

Nous avons mis l'accent sur la qualité du code avec une suite de tests complète :

1. **Tests Unitaires**
   - Tests des opérations Redis
   - Validation des modèles
   - Helpers et utilitaires

2. **Tests d'Intégration**
   - Tests end-to-end des endpoints
   - Scénarios complexes
   - Tests de charge

3. **Tests de Configuration**
   - Validation des variables d'environnement
   - Tests de connexion Redis
   - Tests de middleware

4. **Couverture de Code**
   - Objectif > 80% atteint
   - Rapports détaillés
   - Intégration CI/CD

#### 📸 Captures d'écran

| Fonctionnalité | Description | Capture |
|----------------|-------------|----------|
| Tests | Exécution des tests unitaires et d'intégration | [📷](./image/1-app-web/npm_test.png) |
| Création | Ajout d'un nouvel utilisateur | [📷](./image/1-app-web/api_create.png) |
| Lecture | Récupération des détails d'un utilisateur | [📷](./image/1-app-web/api_get.png) |
| Mise à jour | Modification des informations utilisateur | [📷](./image/1-app-web/api_update.png) |
| Suppression | Suppression d'un utilisateur | [📷](./image/1-app-web/api_delete.png) |
| Health Check | Vérification de l'état de l'application | [📷](./image/1-app-web/health_check.png) |

### 2. CI/CD Pipeline

Notre pipeline CI/CD, construit avec GitHub Actions, automatise l'intégration et le déploiement de notre application.

#### Configuration GitHub Actions

```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install Dependencies
        run: npm ci
      - name: Run Tests
        run: npm test
```

#### Étapes du Pipeline

Notre pipeline suit un processus en plusieurs étapes :

1. **Installation et Configuration**
   - Setup de l'environnement Node.js
   - Installation des dépendances
   - Configuration de Redis pour les tests

2. **Phase de Test**
   - Linting avec ESLint
   - Tests unitaires
   - Tests d'intégration
   - Génération des rapports

3. **Build Docker**
   - Construction de l'image
   - Tests de l'image
   - Push vers Docker Hub

4. **Déploiement**
   - Déploiement sur Heroku
   - Tests de smoke
   - Vérification du déploiement

#### 📸 Captures d'écran

| Étape | Description | Capture |
|-------|-------------|----------|
| GitHub Actions | Pipeline d'intégration continue | [📷](./image/2-ci-cd/github_actions.png) |
| Déploiement | Déploiement réussi sur Heroku | [📷](./image/2-ci-cd/heroku_deployment.png) |

### 3. Infrastructure as Code

Notre infrastructure est entièrement gérée par code, utilisant Vagrant pour la virtualisation et Ansible pour le provisioning.

#### Configuration Vagrant

Notre Vagrantfile configure une VM Ubuntu optimisée :

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  
  # Configuration système
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end

  # Networking
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  
  # Shared folders
  config.vm.synced_folder ".", "/vagrant_data"
  
  # Provisioning
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
  end
end
```

Cette configuration :
- Utilise Ubuntu 20.04 LTS
- Alloue 2GB de RAM et 2 CPU
- Configure le port forwarding
- Monte les dossiers partagés
- Intègre Ansible pour le provisioning

#### Ansible Playbooks

Notre configuration Ansible est organisée en plusieurs playbooks :

1. **Installation Système**
   ```yaml
   - name: System Setup
     hosts: all
     tasks:
       - name: Update apt cache
         apt: update_cache=yes
       - name: Install system dependencies
         apt:
           name: "{{ item }}"
           state: present
         with_items:
           - curl
           - git
           - build-essential
   ```

2. **Configuration Node.js**
   ```yaml
   - name: Node.js Setup
     hosts: all
     tasks:
       - name: Add NodeSource repository
         shell: |
           curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
       - name: Install Node.js
         apt:
           name: nodejs
           state: present
   ```

3. **Configuration Redis**
   ```yaml
   - name: Redis Setup
     hosts: all
     tasks:
       - name: Install Redis
         apt:
           name: redis-server
           state: present
       - name: Start Redis
         service:
           name: redis-server
           state: started
           enabled: yes
   ```

#### 📸 Captures d'écran

| Composant | Description | Capture |
|-----------|-------------|----------|
| Vagrant | État de la machine virtuelle | [📷](./image/3-iac/vagrant_status.png) |
| Ansible | Résultat du provisioning | [📷](./image/3-iac/ansible_provisioning.png) |
| Application | Accès à l'application via port forwarding | [📷](./image/3-iac/app_acces.png) |

### 4. Docker

Notre configuration Docker est optimisée pour la production avec un build multi-stage.

#### Dockerfile Optimisé

```dockerfile
# Build stage
FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Production stage
FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
```

#### Optimisations Implémentées

1. **Multi-stage Build**
   - Séparation des étapes de build
   - Réduction de la taille finale
   - Optimisation des layers

2. **Base Alpine**
   - Image légère
   - Sécurité renforcée
   - Performance optimale

3. **Configuration**
   - .dockerignore optimisé
   - Variables d'environnement
   - Gestion des secrets

#### 📸 Captures d'écran

| Étape | Description | Capture |
|-------|-------------|----------|
| Build | Construction de l'image Docker | [📷](./image/4-docker-image/build.png) |
| Registry | Image publiée sur Docker Hub | [📷](./image/4-docker-image/dockerHub.png) |
| Push | Publication de l'image | [📷](./image/4-docker-image/push.png) |
| Test | Test local de l'image | [📷](./image/4-docker-image/runLocal.png) |
| Validation | Vérification du fonctionnement | [📷](./image/4-docker-image/runValide.png) |

### 5. Docker Compose

Notre configuration Docker Compose orchestre plusieurs services en local.

#### Configuration Détaillée

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
  
  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  redis_data:
```

#### Services Configurés

1. **API Node.js**
   - Build depuis Dockerfile local
   - Variables d'environnement configurées
   - Healthcheck intégré
   - Redémarrage automatique

2. **Redis**
   - Image officielle Alpine
   - Persistance des données
   - Configuration optimisée
   - Réseau dédié

#### 📸 Captures d'écran

| Étape | Description | Capture |
|-------|-------------|----------|
| Build | Construction des services | [📷](./image/5-docker-compose/build.png) |
| Push | Publication sur Docker Hub | [📷](./image/5-docker-compose/push.png) |
| Registry | Image sur Docker Hub | [📷](./image/5-docker-compose/dockerHub.png) |
| Démarrage | Lancement des services | [📷](./image/5-docker-compose/docker-compose-up.png) |
| Services | Services en cours d'exécution | [📷](./image/5-docker-compose/serveur-running.png) |
| Test API | Test avec curl | [📷](./image/5-docker-compose/curlSnippet.png) |
| Création | Ajout d'un utilisateur | [📷](./image/5-docker-compose/creationUserCurl.png) |
| Vérification | Confirmation de la création | [📷](./image/5-docker-compose/verificationUserCreation.png) |

### 6. Kubernetes

Notre déploiement Kubernetes est configuré pour la haute disponibilité et la scalabilité.

#### 1. 🌟 Installer Minikube et démarrer le cluster
> Action : Initialisation de l'environnement Kubernetes local

#### 🚦 Démarrer le cluster Minikube

```bash
# Démarre un cluster Kubernetes local avec les paramètres par défaut
# Cette commande initialise un environnement Kubernetes mononode sur votre machine
minikube start
```

[Voir le résultat](./image/6-K8/minikube-start.png)

#### ✅ Vérifier le cluster

```bash
# Affiche les informations sur le cluster Kubernetes en cours d'exécution
kubectl cluster-info
```

[Voir la sortie du cluster-info](./image/6-K8/cluster-info.png)

---

#### 2. 🐳 Dockeriser l'application
> Action : Préparation des conteneurs pour le déploiement

#### 🏗️ Construire les images Docker

```bash
# Construit l'image Docker pour l'API utilisateur
docker build -t quentinc123/userapi:latest .

# Construit l'image Docker pour Redis
docker build -t redis:latest .
```

[Voir le processus de build Docker](./image/6-K8/docker-build.png)
[Voir le processus de build Docker pour Redis](./image/6-K8/docker-build-redis.png)

---

#### 3. 📝 Créer les manifestes Kubernetes
> Action : Configuration des ressources Kubernetes nécessaires

Création des fichiers YAML Kubernetes pour définir les déploiements et services.

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

Création les fichiers suivants pour le volume persistant et la réclamation.

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

---

#### 4. ⚙️ Appliquer les manifestes Kubernetes
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

[Voir le déploiement des manifestes](./image/6-K8/manifests-deployment.png)

---

#### 5. 🔍 Vérifier les déploiements
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

[Voir l'état des déploiements](./image/6-K8/deployment-status.png)

---

#### 6. 🧪 Tester les services
> Action : Test de l'accessibilité des services déployés

```bash
# Transfère le port 3000 du service vers localhost
# Permet d'accéder à l'API depuis votre machine locale
kubectl port-forward service/userapi-service 3000:3000
```

[Voir l'interface utilisateur en action](./image/6-K8/userapi-interface.png)

---

#### 7. 🔄 Redémarrer les déploiements
> Action : Mise à jour des services en cours d'exécution

```bash
# Redémarre le déploiement de l'API utilisateur
kubectl rollout restart deployment/userapi-deployment

# Redémarre le déploiement Redis
kubectl rollout restart deployment/redis-deployment
```

[Voir le redémarrage des déploiements](./image/6-K8/deployment-restart.png)

---

#### 8. 🧹 Nettoyer les ressources
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

[Voir le nettoyage des ressources](./image/6-K8/cleanup.png)

---

### 🌐 7. Service Mesh avec Istio

#### 🚀 Installation

#### 1️⃣ Installation d'Istio
```bash
# Télécharger et installer Istio
istioctl install --set profile=demo -y

# Activer l'injection automatique de sidecar Istio
kubectl label namespace default istio-injection=enabled
```

[📸 Voir la capture d'écran](./image/7-istio/istio-injection.png)

### 2️⃣ Vérification
```bash
istioctl verify-install
```

[📸 Voir la capture d'écran de la vérification de l'installation](./image/7-istio/istio-install.png)

#### ⚙️ Configuration du Routage

#### 🔄 VirtualService
Fichier: `userapi-virtualservice.yaml`
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: userapi-virtualservice
spec:
  hosts:
  - "*"
  gateways:
  - userapi-gateway
  http:
  - route:
    - destination:
        host: userapi-service
        subset: v1
      weight: 50
    - destination:
        host: userapi-service
        subset: v2
      weight: 50
```

#### 🎯 DestinationRule
Fichier: `userapi-destinationrule.yaml`
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: userapi-destinationrule
spec:
  host: userapi-service
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
```

#### 🚪 Gateway
Fichier: `userapi-gateway.yaml`
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: userapi-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 3000
      name: http
      protocol: HTTP
    hosts:
    - "*"
```

#### 🔍 Vérification

#### 1️⃣ Vérifier les Services Istio
```bash
kubectl get svc -n istio-system
```
[📸 Voir la capture d'écran des services Istio](./image/7-istio/istio-running.png)

#### 2️⃣ Vérifier la Configuration
```bash
kubectl get gateway
kubectl get destinationrules
kubectl get virtualservices 
```

[📸 Voir la capture d'écran des VirtualServices et DestinationRules](./image/7-istio/istio-check.png)

#### 🧪 Test de l'Application

#### 1️⃣ Obtenir l'IP du Gateway
```bash
kubectl get svc -n istio-system
```
[📸 Voir la capture d'écran de la vérification de l'installation](./image/7-istio/istio-getsvc.png)

#### 2️⃣ Tester les Routes
```bash
curl http://<external-ip>/v1
curl http://<external-ip>/v2
```

[🖼️ Voir la capture d'écran du test de l'application](./image/7-istio/)

## 📁 Structure du Projet

Notre projet suit une structure modulaire et organisée :

```
.
├── .github/
│   └── workflows/          # Configuration CI/CD
├── userapi/
│   ├── src/               # Code source de l'application
│   │   ├── controllers/   # Logique métier
│   │   ├── models/       # Modèles de données
│   │   ├── routes/       # Définition des routes
│   │   └── utils/        # Utilitaires
│   ├── test/             # Tests
│   ├── package.json      # Dépendances
│   └── CHANGELOG.md      # Journal des modifications
├── iac/
│   ├── Vagrantfile       # Configuration VM
│   └── playbooks/        # Playbooks Ansible
├── k8s/                  # Manifestes Kubernetes
├── istio/                # Configuration Istio
├── image/                # Screenshots
└── docker-compose.yaml   # Orchestration Docker
```

## 🔗 Liens

- [Repository GitHub](https://github.com/Vincent23032003/devops-project-2024)
- [Image Docker Hub](https://hub.docker.com/r/vincennnt/userapi)
- [Application Heroku](https://devops-userapi-2024-671a8bceceee.herokuapp.com/)
- [Documentation officielle Kubernetes](https://kubernetes.io/docs/)
- [Documentation Minikube](https://minikube.sigs.k8s.io/docs/)
- [Guide des meilleures pratiques Kubernetes](https://kubernetes.io/docs/concepts/configuration/overview/)

## 👥 Auteurs

- **Vincent BARÉ** - Cyber Gr 01
  - CI/CD Pipeline
  - Docker

- **Louis DECOURTIS** - Cyber Gr 01
  - Développement API
  - Tests automatisés
  - Documentation

- **Quentin CARMINOT** - Cyber Gr 01
  - Configuration Kubernetes
  - Intégration Istio

_Projet réalisé dans le cadre du cours DevOps à l'ECE Paris_
