## [1.0.0] - 2024-12-23
### Ajouté
- API REST complète pour la gestion des utilisateurs (CRUD)
- Stockage des données dans Redis
- Tests unitaires pour les opérations Redis
- Tests d'API pour tous les endpoints
- Tests de configuration et connexion
- Endpoint de santé (/health)
- Documentation complète des endpoints dans le README.md

### Modifié
- Structure du projet selon les standards
- Configuration des tests avec Mocha et Chai

### Technique
- Utilisation de Node.js avec Express.js
- Redis comme base de données
- Tests avec Mocha, Chai et Chai-HTTP
- Gestion asynchrone des opérations Redis