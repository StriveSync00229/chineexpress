# Configuration Admin Local - Guide Rapide

## 🚀 Démarrage rapide

### 1. Créer le fichier `.env.local`

Si le fichier n'existe pas encore, créez-le à la racine du projet :

```bash
cp .env.example .env.local
```

### 2. Ajouter les identifiants admin

Ajoutez ces lignes dans votre fichier `.env.local` :

```env
# Authentification Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ChineExpress2025!
JWT_SECRET=e2b188b94c1edb413a029c76c7a2c6a92605562be737a2466c55be58f58adf19
```

**Important** :
- ✅ Le `JWT_SECRET` ci-dessus a été généré aléatoirement et est prêt à l'emploi
- ✅ Vous pouvez changer le mot de passe comme vous voulez
- ⚠️ Ne partagez JAMAIS ce fichier sur Git

### 3. Redémarrer le serveur

```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer :
pnpm dev
```

### 4. Se connecter

1. Ouvrir : [http://localhost:3000/secure/melissa/import007/login](http://localhost:3000/secure/melissa/import007/login)

2. Utiliser les identifiants :
   - **Username** : `admin`
   - **Password** : `ChineExpress2025!` (ou celui que vous avez défini)

3. Cliquer sur **"Se connecter"**

4. Vous serez redirigé vers le dashboard admin : `/secure/melissa/import007/admin`

---

## 🔐 Sécurité Production

### Pour la production, utilisez un mot de passe hashé

1. **Créer un script de hashage** :

```javascript
// hash-password.js
const bcrypt = require('bcryptjs');

const password = 'VotreNouveauMotDePasseSecurise!';
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hash à copier dans .env.local :');
  console.log(hash);
});
```

2. **Exécuter** :
```bash
node hash-password.js
```

3. **Copier le hash dans `.env.local`** :
```env
ADMIN_PASSWORD=$2a$10$abcdefgh...xyz123
```

---

## 🎯 Exemple complet `.env.local`

Voici un exemple complet de fichier `.env.local` avec toutes les configurations :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votreprojet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key

# PayDunya
PAYDUNYA_MASTER_KEY=your_master_key
PAYDUNYA_PRIVATE_KEY=your_private_key
PAYDUNYA_PUBLIC_KEY=your_public_key
PAYDUNYA_TOKEN=your_token
PAYDUNYA_STORE_PHONE=+22500000000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-app
EMAIL_FROM=noreply@chineexpress.com
EMAIL_FROM_NAME=Chineexpress
ADMIN_EMAIL=admin@chineexpress.com

# Authentification Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ChineExpress2025!
JWT_SECRET=e2b188b94c1edb413a029c76c7a2c6a92605562be737a2466c55be58f58adf19
```

---

## 🧪 Tester la connexion

### Via l'interface

1. Aller sur : http://localhost:3000/secure/melissa/import007/login
2. Entrer username et password
3. Cliquer "Se connecter"
4. Vérifier la redirection vers le dashboard

### Via curl (ligne de commande)

```bash
# Test connexion
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"ChineExpress2025!"}' \
  -c cookies.txt

# Test session
curl http://localhost:3000/api/auth/me -b cookies.txt

# Test déconnexion
curl -X POST http://localhost:3000/api/auth/logout -b cookies.txt
```

---

## 🛡️ Routes protégées

Toutes ces routes nécessitent une authentification :

- `/secure/melissa/import007/admin` - Dashboard
- `/secure/melissa/import007/admin/formations` - Gestion formations
- `/secure/melissa/import007/admin/formations/new` - Nouvelle formation
- `/secure/melissa/import007/admin/contacts` - Gestion contacts
- `/secure/melissa/import007/admin/devis` - Gestion devis
- `/secure/melissa/import007/admin/emails` - Email marketing

**Accès public** :
- `/secure/melissa/import007/login` - Page de connexion

---

## 🔧 Dépannage

### "Configuration admin manquante"

**Solution** : Vérifier que `.env.local` contient bien :
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ChineExpress2025!
JWT_SECRET=e2b188b94c1edb413a029c76c7a2c6a92605562be737a2466c55be58f58adf19
```

### "Identifiants incorrects"

**Solution** :
1. Vérifier que vous utilisez le bon username : `admin`
2. Vérifier que vous utilisez le bon password (celui dans `.env.local`)
3. Redémarrer le serveur après avoir modifié `.env.local`

### Redirection en boucle

**Solution** :
1. Supprimer les cookies du navigateur (F12 → Application → Cookies)
2. Vérifier que `JWT_SECRET` existe dans `.env.local`
3. Redémarrer le serveur

### Session expire immédiatement

**Solution** : Vérifier l'heure de votre ordinateur (doit être synchronisée)

---

## 📝 Notes

- La session dure **7 jours**
- Les cookies sont **HTTP-only** (sécurisés)
- En développement, les cookies fonctionnent sur **HTTP**
- En production, les cookies nécessitent **HTTPS**

---

## ✅ Checklist

Avant de commencer :

- [ ] Fichier `.env.local` créé
- [ ] Variables `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET` définies
- [ ] Serveur redémarré après modification `.env.local`
- [ ] Page de login accessible : http://localhost:3000/secure/melissa/import007/login

Tout est prêt ! 🎉
