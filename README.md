

# Blog API

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/ton-username/blog-api.git
cd blog-api
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer MongoDB

```bash
mongod
```

### 4. Lancer le serveur

```bash
node app.js
```

Serveur disponible sur :

```
http://localhost:3000
```

---

## Endpoints

### Créer un article

POST /api/articles

### Lire tous les articles

GET /api/articles

Filtres possibles :

```
/api/articles?category=Tech&author=Wilfried
```

### Lire un article

GET /api/articles/:id

### Modifier un article

PUT /api/articles/:id

### Supprimer un article

DELETE /api/articles/:id

### Rechercher un article

GET /api/articles/search?query=texte

---

## Exemples d’utilisation

### Créer un article

```bash
curl -X POST http://localhost:3000/api/articles \
-H "Content-Type: application/json" \
-d '{
  "title": "Mon article",
  "content": "Contenu...",
  "author": "Wilfried",
  "category": "Tech",
  "tags": ["Node", "API"]
}'
```

---

### Lire tous les articles

```bash
curl http://localhost:3000/api/articles
```

---

### Lire un article

```bash
curl http://localhost:3000/api/articles/ID_ICI
```

---

### Modifier un article

```bash
curl -X PUT http://localhost:3000/api/articles/ID_ICI \
-H "Content-Type: application/json" \
-d '{
  "title": "Nouveau titre",
  "content": "Nouveau contenu"
}'
```

---

### Supprimer un article

```bash
curl -X DELETE http://localhost:3000/api/articles/ID_ICI
```

---

### Rechercher un article

```bash
curl "http://localhost:3000/api/articles/search?query=mot"
```
