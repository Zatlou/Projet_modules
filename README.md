# API Modules - Gestion des Modules avec JWT

Ce projet est une API permettant de gérer des modules éducatifs et d'authentifier les utilisateurs via JWT.

---

## 🛠 Fonctionnalités principales

1. **Authentification sécurisée** via un endpoint `/login` avec génération de tokens JWT.
2. **Accès sécurisé aux modules** via `/api/modules`.
3. Gestion centralisée des utilisateurs et des modules.
4. Structure organisée suivant les bonnes pratiques (Atomic Design côté front-end).

---

## 🔧 Prérequis

- PHP 8.2 ou plus
- Composer
- PostgreSQL
- Symfony CLI
- Node.js et npm (si vous utilisez le front-end)

---

## 📂 Structure du Projet

```plaintext
├── src/
│   ├── Controller/          # Contrôleurs pour les endpoints
│   ├── Entity/              # Entités Doctrine
│   ├── DataFixtures/        # Fixtures pour remplir la base de données
│   ├── Repository/          # Requêtes personnalisées Doctrine
│
├── config/                  # Fichiers de configuration Symfony
├── public/                  # Point d'entrée pour le serveur
├── var/                     # Fichiers temporaires (logs, cache)
├── README.md                # Documentation du projet


```

🚀 Installation

1. Clonez le projet
   git clone https://github.com/zatlou
   cd api-modules

2. Installez les dépendances
   composer install

3. Configurez l’environnement
   Copiez le fichier .env en .env.local :
   cp .env .env.local
   Modifiez les variables suivantes dans .env.local pour votre environnement :

env

DATABASE_URL="postgresql://admin:password@localhost:5432/education-api"
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=my_secure_passphrase

4. Générez les clés JWT

mkdir -p config/jwt
openssl genrsa -aes256 -passout pass:my_secure_passphrase -out config/jwt/private.pem 4096
openssl rsa -pubout -in config/jwt/private.pem -passin pass:my_secure_passphrase -out config/jwt/public.pem

5. Configurez la base de données
   Créez la base de données :

php bin/console doctrine:database:create
Appliquez les migrations :

php bin/console doctrine:migrations:migrate
Chargez les données de test :

php bin/console doctrine:fixtures:load

📡 Endpoints

1. /login (POST)
   Description : Authentifie l'utilisateur et génère un token JWT.

Requête :

{
"email": "alan@alan.fr",
"password": "pass_1234"
}
Réponse :

{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

2. /api/modules (GET)
   Description : Retourne la liste des modules.

Headers requis :
Authorization: Bearer <token>
Réponse :

[
{
"id": 1,
"title": "Programmation Orientée Objet (POO)",
"description": "Introduction aux concepts fondamentaux de la POO...",
"created_at": "2023-02-01"
},
{
"id": 2,
"title": "Développement Web Frontend",
"description": "Ce module couvre les bases du HTML, CSS et JavaScript...",
"created_at": "2023-05-15"
}
]

⚙️ Schéma de l'architecture
Base de données

Table user
id, first_name, last_name, email, password, roles
Table module
id, title, description, created_at
Relation : user <--> module (many-to-many)

+----------------+ POST /login +------------------+
| Front-end | -------------------------> | Symfony API |
+----------------+ +------------------+
| Vérification |
| des données |
+------------------+
Réponse JSON

🧪 Tests
Tester avec Insomnia ou Postman
Endpoint /login :
Requête : Email et mot de passe
Réponse : Token JWT
Endpoint /api/modules :
Ajoutez le token dans les headers :
Authorization: Bearer <token>
Lancer les tests unitaires
php bin/phpunit
‣牐橯瑥浟摯汵獥�