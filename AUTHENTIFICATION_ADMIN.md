# Authentification Admin - Chineexpress

## 🔐 Vue d'ensemble

Système d'authentification simple et sécurisé pour l'accès à l'administration de Chineexpress.

---

## 📋 Fonctionnalités

✅ **Connexion sécurisée** avec JWT (JSON Web Tokens)
✅ **Sessions de 7 jours** avec cookies HTTP-only
✅ **Middleware automatique** pour protéger les routes admin
✅ **Support bcrypt** pour hasher les mots de passe
✅ **Interface de login responsive**
✅ **Redirection automatique** après connexion

---

## 🚀 Configuration

### 1. Variables d'environnement

Ajoutez ces variables dans votre fichier `.env.local` :

```env
# Authentification Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=VotreMotDePasseSecurise123!
JWT_SECRET=votre-secret-jwt-tres-long-aleatoire-minimum-32-caracteres-AbCdEf123456
```

⚠️ **Important** :
- `JWT_SECRET` doit être une chaîne aléatoire de minimum 32 caractères
- Pour générer un secret sécurisé : `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Ne JAMAIS commiter le fichier `.env.local` dans Git

### 2. Mot de passe en clair (développement)

Pour le développement local, vous pouvez utiliser un mot de passe en clair :

```env
ADMIN_PASSWORD=monmotdepasse
```

### 3. Mot de passe hashé (production recommandé)

Pour hasher votre mot de passe, utilisez ce script Node.js :

```javascript
// hash-password.js
const bcrypt = require('bcryptjs');

const password = 'VotreMotDePasseSecurise123!';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Mot de passe hashé :');
  console.log(hash);
  console.log('\nCopiez ce hash dans votre .env.local comme ADMIN_PASSWORD');
});
```

Exécutez :
```bash
node hash-password.js
```

Puis copiez le hash généré dans `.env.local` :
```env
ADMIN_PASSWORD=$2a$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGH
```

---

## 🔑 Utilisation

### Accéder à l'admin

1. **Page de connexion** : [http://localhost:3000/secure/melissa/import007/login](http://localhost:3000/secure/melissa/import007/login)

2. **Identifiants par défaut** (à changer) :
   - Username: `admin`
   - Password: celui défini dans `.env.local`

3. **Après connexion**, vous serez redirigé vers : `/secure/melissa/import007/admin`

### Routes protégées

Toutes les routes sous `/secure/melissa/import007/admin/*` sont automatiquement protégées par le middleware.

**Exemples** :
- ✅ `/secure/melissa/import007/admin` - Dashboard
- ✅ `/secure/melissa/import007/admin/formations` - Gestion formations
- ✅ `/secure/melissa/import007/admin/contacts` - Gestion contacts
- ✅ `/secure/melissa/import007/admin/devis` - Gestion devis
- ✅ `/secure/melissa/import007/admin/emails` - Email marketing

### Se déconnecter

Utilisez le bouton **"Déconnexion"** dans l'interface admin ou appelez :

```typescript
await fetch("/api/auth/logout", { method: "POST" })
```

---

## 🛠️ Architecture technique

### Structure des fichiers

```
├── lib/
│   └── auth.ts                    # Utilitaires auth (JWT, cookies, sessions)
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts     # API connexion
│   │       ├── logout/route.ts    # API déconnexion
│   │       └── me/route.ts        # API session actuelle
│   └── secure/melissa/import007/
│       └── login/
│           └── page.tsx           # Page de login
├── components/
│   └── admin/
│       └── logout-button.tsx      # Composant bouton déconnexion
└── proxy.ts                       # Protection automatique des routes (Next.js 16)
```

**Note Next.js 16** : Le fichier `proxy.ts` remplace `middleware.ts` dans Next.js 16. Il fonctionne de la même manière mais avec un nom plus explicite.

### Flow d'authentification

```
1. Utilisateur visite /admin
   ↓
2. Middleware vérifie le cookie 'admin-session'
   ↓
3a. Si valide → Accès autorisé
3b. Si invalide/absent → Redirection vers /login
   ↓
4. Login avec username + password
   ↓
5. Vérification credentials (bcrypt si hashé)
   ↓
6. Génération token JWT (validité 7 jours)
   ↓
7. Cookie HTTP-only créé
   ↓
8. Redirection vers /admin
```

### Sécurité

✅ **Cookies HTTP-only** : Protège contre XSS
✅ **SameSite=lax** : Protège contre CSRF
✅ **JWT signé** : Impossible de falsifier
✅ **Bcrypt** : Hachage sécurisé des mots de passe
✅ **Secure en production** : Cookies HTTPS uniquement
✅ **Expiration automatique** : Session de 7 jours

---

## 🔧 API Endpoints

### POST `/api/auth/login`

Authentifier un utilisateur admin.

**Request** :
```json
{
  "username": "admin",
  "password": "VotreMotDePasseSecurise123!"
}
```

**Response (Success)** :
```json
{
  "success": true,
  "message": "Connexion réussie"
}
```

**Response (Error)** :
```json
{
  "error": "Identifiants incorrects"
}
```

**Status codes** :
- `200` - Connexion réussie
- `400` - Données manquantes
- `401` - Identifiants incorrects
- `500` - Erreur serveur

---

### POST `/api/auth/logout`

Déconnecter l'utilisateur actuel.

**Request** : Aucun body nécessaire

**Response** :
```json
{
  "success": true,
  "message": "Déconnexion réussie"
}
```

---

### GET `/api/auth/me`

Obtenir les informations de session actuelle.

**Response (Authenticated)** :
```json
{
  "username": "admin",
  "isAdmin": true
}
```

**Response (Not Authenticated)** :
```json
{
  "error": "Non authentifié"
}
```

**Status codes** :
- `200` - Session valide
- `401` - Non authentifié

---

## 🧪 Tests

### Tester la connexion

```bash
# Connexion
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"votre_password"}' \
  -c cookies.txt

# Vérifier la session
curl http://localhost:3000/api/auth/me \
  -b cookies.txt

# Déconnexion
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

### Tester le middleware

1. Sans authentification :
```bash
curl http://localhost:3000/secure/melissa/import007/admin
# → Redirection vers /login
```

2. Avec authentification :
```bash
curl http://localhost:3000/secure/melissa/import007/admin \
  -b cookies.txt
# → Accès autorisé
```

---

## 🎨 Personnalisation

### Changer la durée de session

Modifier dans `lib/auth.ts` :

```typescript
// Changer de 7 jours à 30 jours
const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
```

### Ajouter plusieurs utilisateurs

Actuellement, le système supporte un seul admin. Pour ajouter plusieurs utilisateurs :

1. Créer une table `admins` dans Supabase :
```sql
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

2. Modifier `app/api/auth/login/route.ts` pour interroger la base :
```typescript
const { data: admin } = await supabase
  .from('admins')
  .select('*')
  .eq('username', username)
  .single()

if (!admin) {
  return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
}

const passwordMatch = await bcrypt.compare(password, admin.password_hash)
```

### Protéger d'autres routes

Modifier `proxy.ts` :

```typescript
const PROTECTED_ROUTES = [
  '/secure/melissa/import007/admin',
  '/dashboard',  // Ajouter d'autres routes
  '/settings'
]
```

---

## 🐛 Dépannage

### Erreur "Configuration admin manquante"

**Cause** : Variables `ADMIN_USERNAME` ou `ADMIN_PASSWORD` absentes de `.env.local`

**Solution** :
```bash
# Vérifier que .env.local existe
cat .env.local

# Ajouter les variables manquantes
ADMIN_USERNAME=admin
ADMIN_PASSWORD=votre_password
JWT_SECRET=votre_secret_jwt_32_caracteres_minimum
```

### Redirection en boucle vers /login

**Cause** : JWT_SECRET manquant ou cookie invalide

**Solution** :
1. Vérifier que `JWT_SECRET` est défini dans `.env.local`
2. Supprimer les cookies du navigateur
3. Redémarrer le serveur : `pnpm dev`

### "Identifiants incorrects" avec le bon mot de passe

**Cause** : Mot de passe hashé vs en clair

**Solution** :
- Si vous utilisez un hash bcrypt, vérifiez qu'il commence par `$2a$` ou `$2b$`
- Sinon, utilisez un mot de passe en clair en développement

### Session expire immédiatement

**Cause** : Horloge système décalée

**Solution** :
Synchroniser l'horloge de votre ordinateur

---

## 📚 Ressources

- [JWT.io](https://jwt.io/) - Déboguer les JWT
- [bcrypt calculator](https://bcrypt-generator.com/) - Générer des hashes bcrypt
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) - Documentation officielle

---

## ✅ Checklist de sécurité

Avant de passer en production :

- [ ] Changer `ADMIN_USERNAME` et `ADMIN_PASSWORD`
- [ ] Générer un `JWT_SECRET` sécurisé (32+ caractères aléatoires)
- [ ] Utiliser un mot de passe hashé (bcrypt)
- [ ] Vérifier que `.env.local` n'est pas dans Git
- [ ] Activer HTTPS en production
- [ ] Configurer les CORS si nécessaire
- [ ] Limiter les tentatives de connexion (rate limiting)
- [ ] Activer les logs de sécurité

---

## 🎉 Conclusion

Le système d'authentification admin est maintenant opérationnel !

**Accès admin** : [http://localhost:3000/secure/melissa/import007/login](http://localhost:3000/secure/melissa/import007/login)

N'oubliez pas de configurer vos identifiants dans `.env.local` avant la première utilisation.
