# Authentification Admin Hybride

Ce projet supporte deux modes d'authentification pour l'accès admin :

## Mode 1 : Authentification Locale (Prioritaire)

Si les variables d'environnement `ADMIN_USERNAME` et `ADMIN_PASSWORD` sont configurées dans `.env.local`, le système utilisera l'authentification locale avec JWT.

### Configuration

```env
# Dans .env.local
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ChineExpress2025!
JWT_SECRET=votre-secret-jwt-securise
```

### Avantages
- ✅ Simple et rapide à configurer
- ✅ Pas besoin de Supabase Auth
- ✅ Idéal pour développement local
- ✅ Un seul utilisateur admin

### Utilisation
1. Accédez à `/secure/melissa/import007/login`
2. Entrez le username et password configurés dans `.env.local`
3. Vous êtes connecté avec un token JWT local

---

## Mode 2 : Authentification Supabase (Fallback)

Si les variables `ADMIN_USERNAME` et `ADMIN_PASSWORD` **ne sont pas configurées**, le système bascule automatiquement vers Supabase Auth.

### Configuration dans Supabase

#### Étape 1 : Créer un utilisateur admin dans Supabase

Vous avez deux options :

**Option A - Via l'interface Supabase Dashboard :**
1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **Authentication** > **Users**
4. Cliquez sur **Add user** > **Create new user**
5. Entrez l'email et le mot de passe de l'admin
6. Cliquez sur **Create user**

**Option B - Via SQL (recommandé pour automatisation) :**
```sql
-- Créer un utilisateur admin via Supabase Auth
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@chineexpress.com',  -- Email de l'admin
  crypt('VotreMotDePasseSecurise', gen_salt('bf')),  -- Mot de passe hashé
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"admin"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

#### Étape 2 : Configurer les variables d'environnement

Assurez-vous que ces variables sont présentes dans `.env.local` :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key

# NE PAS définir ADMIN_USERNAME et ADMIN_PASSWORD
# pour activer le mode Supabase
```

### Avantages
- ✅ Gestion multi-utilisateurs
- ✅ Fonctionnalités avancées (reset password, MFA, etc.)
- ✅ Sécurité renforcée par Supabase
- ✅ Logs d'authentification automatiques
- ✅ Idéal pour production

### Utilisation
1. Accédez à `/secure/melissa/import007/login`
2. Entrez l'**email** (pas username) et le password de l'utilisateur Supabase
3. Vous êtes connecté avec une session Supabase Auth

---

## Comment le système choisit le mode ?

Le système vérifie dans cet ordre :

1. **Vérification des variables locales**
   ```javascript
   if (ADMIN_USERNAME && ADMIN_PASSWORD) {
     // → Mode Authentification Locale
   } else {
     // → Mode Supabase Auth
   }
   ```

2. **Protection des routes (proxy.ts)**
   - Essaie d'abord le token JWT local
   - Si invalide ou absent, essaie le token Supabase
   - Si les deux échouent, redirige vers `/login`

---

## Déconnexion

La route `/api/auth/logout` supprime automatiquement les deux types de tokens :
- Cookie `admin-session` (JWT local)
- Cookie `supabase-session` (Supabase Auth)

---

## Recommandations

### Pour le développement local
```env
# Utilisez l'authentification locale
ADMIN_USERNAME=admin
ADMIN_PASSWORD=dev123
JWT_SECRET=dev-secret-key
```

### Pour la production
```env
# Utilisez Supabase Auth (ne définissez PAS ADMIN_USERNAME/PASSWORD)
NEXT_PUBLIC_SUPABASE_URL=https://prod.supabase.co
SUPABASE_SERVICE_ROLE_KEY=prod-service-key
JWT_SECRET=production-secret-key-tres-securise
```

---

## Sécurité

### Authentification Locale
- Le mot de passe peut être en clair (dev uniquement) ou hashé avec bcrypt
- Pour hasher un mot de passe :
  ```javascript
  const bcrypt = require('bcryptjs')
  const hash = await bcrypt.hash('VotreMotDePasse', 10)
  console.log(hash) // Mettez ce hash dans ADMIN_PASSWORD
  ```

### Authentification Supabase
- Les mots de passe sont automatiquement hashés par Supabase
- MFA peut être activé dans les paramètres Supabase
- Row Level Security (RLS) peut être configuré pour plus de sécurité

---

## Dépannage

### "Configuration admin manquante" en mode local
→ Vérifiez que `ADMIN_USERNAME` et `ADMIN_PASSWORD` sont bien définis dans `.env.local`

### "Identifiants incorrects" en mode Supabase
→ Vérifiez que l'utilisateur existe dans Supabase Auth Dashboard

### Redirection infinie vers /login
→ Supprimez les cookies dans votre navigateur et réessayez

### Les deux modes ne fonctionnent pas
→ Vérifiez les logs du serveur (`console.log` dans `/api/auth/login` et `proxy.ts`)

---

## Fichiers modifiés

- `app/api/auth/login/route.ts` - Gestion des deux modes d'authentification
- `app/api/auth/logout/route.ts` - Suppression des deux types de cookies
- `proxy.ts` - Vérification hybride des sessions
- `lib/auth.ts` - Utilitaires JWT locaux

---

**Date de création** : 2025-10-26
**Dernière mise à jour** : 2025-10-26
