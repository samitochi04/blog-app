# Blog App - Gestion des Blogs avec Angular et Node.js
# Blog App - Gestion des Blogs avec Angular et Node.js
Ce projet est une application de gestion de blogs utilisant Angular pour le frontend et Node.js avec PostgreSQL pour le backend. 
Les utilisateurs peuvent consulter les blogs, tandis que les administrateurs peuvent créer, modifier et supprimer des blogs.
## Fonctionnalités
- Authentification des utilisateurs (inscription et connexion)
- Gestion des rôles : administrateur et utilisateur standard
- Création, modification, suppression de blogs (admin uniquement)
- Consultation des blogs (tous les utilisateurs)
## Prérequis
- Node.js (v14 ou supérieur)
-PostgreSQL (base de données)
- Angular CLI (v15 ou supérieur)
### Backend
1. Clone le projet :
   ```bash
   git clone https://github.com/samitochi04/blog-app.git
   cd blog-app/backend
npm install
- backend/
  - controllers/
  - middleware/
  - models/
  - routes/
  - server.js
- frontend/
  - src/app/
    - components/
    - services/
    - auth/
