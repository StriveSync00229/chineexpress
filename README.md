# ChineExpresse - Plateforme d'Import depuis la Chine

Application Next.js 16 professionnelle pour l'importation de produits depuis la Chine avec système de paiement intégré PayDunya.

---

## 📋 Table des matières

- [À propos](#à-propos)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Système de paiement](#système-de-paiement)
- [Structure du projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [Développement](#développement)
- [Déploiement](#déploiement)
- [TODO](#todo)

---

## 🎯 À propos

ChineExpresse est une plateforme complète qui propose :

- **Formation pratique Alibaba** - Apprenez à importer depuis la Chine
- **Services d'importation** - Accompagnement personnalisé
- **Système de paiement sécurisé** - Intégration PayDunya avec redirection
- **Gestion des inscriptions** - Dashboard admin complet
- **Multi-devises** - Support FCFA et autres devises

---

## 🛠️ Technologies utilisées

### Frontend
- **Next.js 16** (App Router)
- **React 19.2.0**
- **TypeScript 5**
- **Tailwind CSS** + **Radix UI**
- **Shadcn/ui** (composants UI)
- **Lucide React** (icônes)

### Backend & Database
- **Next.js API Routes**
- **Supabase** (PostgreSQL + Auth)
- **PayDunya** (paiement mobile)

### Outils de développement
- **pnpm** (gestionnaire de paquets)
- **ESLint** (linting)
- **TypeScript** (typage statique)

---

## 🏗️ Architecture

### Système de paiement modulaire

Le projet utilise une architecture modulaire pour les paiements, permettant de réutiliser facilement le système pour différents types de produits :

```
lib/payment/
├── types.ts          # Types TypeScript génériques
└── checkout.ts       # Fonctions réutilisables

components/payment/
└── CheckoutButton.tsx  # Bouton de paiement réutilisable

app/
├── api/
│   ├── payments/
│   │   └── create-checkout/  # Endpoint générique
│   └── webhooks/
│       └── paydunya-ipn/     # Webhook notifications
│
└── payment/
    ├── success/      # Page de succès
    ├── cancel/       # Page d'annulation
    └── pending/      # Page en attente
```

### Flux de paiement

```
Utilisateur clique "S'inscrire"
  ↓
Remplit le formulaire (nom, email, téléphone, pays, ville)
  ↓
Clique "Payer XX FCFA"
  ↓
API crée une facture PayDunya
  ↓
Redirection vers https://app.paydunya.com/checkout/XXXXX
  ↓
Utilisateur paie (carte bancaire ou mobile money)
  ↓
PayDunya redirige vers /payment/success
  ↓
Webhook IPN met à jour la BDD (statut 'paid')
  ↓
Utilisateur voit la confirmation
```

---

## 🚀 Installation

### Prérequis

- Node.js 18+
- pnpm 8+
- Compte Supabase
- Compte PayDunya (LIVE ou TEST)

### Étapes

```bash
# Cloner le projet
git clone <repository-url>
cd chineexpress

# Installer les dépendances
pnpm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer les variables d'environnement (voir section Configuration)

# Lancer le serveur de développement
pnpm dev
```

L'application sera disponible sur http://localhost:3000

---

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine avec :

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# PayDunya (Production)
PAYDUNYA_MASTER_KEY=your_master_key
PAYDUNYA_PRIVATE_KEY=live_private_xxx
PAYDUNYA_PUBLIC_KEY=live_public_xxx
PAYDUNYA_TOKEN=your_token
PAYDUNYA_STORE_PHONE=+221XXXXXXXXX

# Site URL (important pour les callbacks PayDunya)
NEXT_PUBLIC_SITE_URL=https://chineexpresse.com
# En développement local : http://localhost:3000
```

### Configuration PayDunya

1. Créez un compte sur [PayDunya](https://app.paydunya.com)
2. Créez une nouvelle application
3. Activez le mode **LIVE** pour la production
4. Copiez vos clés API
5. Configurez l'URL de callback : `https://votresite.com/api/webhooks/paydunya-ipn`

### Base de données Supabase

#### Table `formation_inscriptions`

```sql
CREATE TABLE formation_inscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  formation_id UUID REFERENCES formations(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT, -- Temporaire : utilisé pour stocker le pays
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'cancelled', 'failed'
  amount NUMERIC,
  payment_date TIMESTAMPTZ,
  promo_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_formation_inscriptions_email ON formation_inscriptions(email);
CREATE INDEX idx_formation_inscriptions_status ON formation_inscriptions(status);
```

#### Table `formations`

```sql
CREATE TABLE formations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'FCFA',
  type TEXT NOT NULL, -- 'online', 'in-person', 'hybrid'
  date DATE,
  time TIME,
  max_participants INTEGER,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'inactive', 'full'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 💳 Système de paiement

### CheckoutButton (composant réutilisable)

Le `CheckoutButton` est le composant principal pour tous les paiements.

#### Utilisation

```tsx
import { CheckoutButton } from '@/components/payment/CheckoutButton'

<CheckoutButton
  checkoutData={{
    itemType: 'formation',  // ou 'product', 'service', 'subscription'
    itemId: 'uuid-formation',
    items: [{
      name: 'Formation Alibaba',
      quantity: 1,
      unitPrice: 50000,
      totalPrice: 50000,
      description: 'Formation pratique'
    }],
    totalAmount: 50000,
    description: 'Formation: Alibaba',
    customer: {
      name: 'Jean Dupont',
      email: 'jean@example.com',
      phone: '+225XXXXXXXXX',
      country: 'Côte d\'Ivoire',
      city: 'Abidjan'
    }
  }}
  buttonText="Payer 50 000 FCFA"
  className="bg-green-600 hover:bg-green-700"
/>
```

### Endpoints API

#### POST `/api/payments/create-checkout`

Crée un checkout PayDunya et redirige l'utilisateur.

**Request:**
```json
{
  "itemType": "formation",
  "itemId": "uuid",
  "items": [...],
  "totalAmount": 50000,
  "description": "Formation Alibaba",
  "customer": {...},
  "customData": {}
}
```

**Response:**
```json
{
  "success": true,
  "token": "abc123",
  "checkoutURL": "https://app.paydunya.com/checkout/abc123",
  "recordId": "uuid-inscription"
}
```

#### POST `/api/webhooks/paydunya-ipn`

Reçoit les notifications de paiement de PayDunya.

**Fonctionnalités :**
- Vérification signature SHA-512
- Support multi-produits (formations, produits, services)
- Mise à jour automatique du statut en BDD
- Logs détaillés

### Pages de retour

- `/payment/success?token=xxx` - Paiement réussi
- `/payment/cancel?token=xxx` - Paiement annulé
- `/payment/pending?token=xxx` - Paiement en attente (polling auto)

---

## 📁 Structure du projet

```
chineexpress/
├── app/
│   ├── api/
│   │   ├── admin/              # Routes admin
│   │   ├── payments/           # Paiements
│   │   └── webhooks/           # Webhooks PayDunya
│   │
│   ├── formation-alibaba/      # Page formation
│   ├── formations/[id]/checkout/  # Checkout générique
│   ├── payment/                # Pages retour paiement
│   └── ...                     # Autres pages
│
├── components/
│   ├── formation-alibaba/      # Composants formation
│   ├── payment/                # Composants paiement
│   └── ui/                     # Composants UI (shadcn)
│
├── lib/
│   ├── payment/                # Logique paiement
│   ├── paydunya.ts             # SDK PayDunya
│   └── supabase.ts             # Client Supabase
│
├── hooks/                      # Hooks React
├── types/                      # Types TypeScript
└── public/                     # Assets statiques
```

---

## 🔌 API Endpoints

### Paiements

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/payments/create-checkout` | POST | Créer un checkout PayDunya |
| `/api/webhooks/paydunya-ipn` | POST | Webhook notifications PayDunya |
| `/api/webhooks/paydunya-ipn` | GET | Vérifier statut webhook |

### Admin

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/admin/formations` | GET | Liste des formations |
| `/api/admin/formations` | POST | Créer une formation |
| `/api/admin/formations/[id]` | GET | Détails formation |
| `/api/admin/formations/[id]` | PUT | Mettre à jour |
| `/api/admin/formations/[id]` | DELETE | Supprimer |
| `/api/admin/formations/stats` | GET | Statistiques |

---

## 💻 Développement

### Commandes utiles

```bash
# Démarrer le serveur de développement
pnpm dev

# Build de production
pnpm build

# Démarrer en production
pnpm start

# Linter
pnpm lint
```

### Ajouter un nouveau type de paiement

Pour ajouter un paiement pour un nouveau type de produit :

1. Définir le type dans `lib/payment/types.ts` :
```typescript
export type PaymentItemType = 'formation' | 'product' | 'votre-type'
```

2. Utiliser le `CheckoutButton` :
```tsx
<CheckoutButton
  checkoutData={{
    itemType: 'votre-type',
    // ... autres données
  }}
/>
```

3. Gérer le webhook dans `app/api/webhooks/paydunya-ipn/route.ts` :
```typescript
case 'votre-type':
  // Logique spécifique à votre type
  break
```

---

## 🚢 Déploiement

### Vercel (recommandé)

1. Push le code sur GitHub
2. Connecter le repo à Vercel
3. Configurer les variables d'environnement
4. Déployer

### Configuration production

- ✅ HTTPS obligatoire
- ✅ Variables d'environnement LIVE PayDunya
- ✅ URL de callback accessible publiquement
- ✅ Activer le mode LIVE dans PayDunya
- ✅ Tester avec un petit montant d'abord

---

## 📝 TODO - Améliorations futures

### Court terme
- [ ] Connecter la page `/formations/[id]/checkout` à Supabase
- [ ] Ajouter l'envoi d'emails de confirmation (Resend ou SendGrid)
- [ ] Créer un ID de formation Alibaba dans Supabase

### Moyen terme
- [ ] Dashboard admin pour voir les paiements
- [ ] Rapports de transaction
- [ ] Support multi-devises avancé
- [ ] Système de notifications push

### Long terme
- [ ] Gestion des abonnements récurrents
- [ ] Programme d'affiliation
- [ ] Multi-langue (i18n)
- [ ] Application mobile

---

## 🐛 Dépannage

### Le build échoue

**Solution :** Vérifiez les types TypeScript :
```bash
pnpm build
```

### Le webhook IPN ne reçoit pas les notifications

**Solutions :**
1. En local, utilisez [ngrok](https://ngrok.com) :
   ```bash
   ngrok http 3000
   ```
2. Vérifiez que l'URL est accessible publiquement
3. Vérifiez les logs du serveur

### Erreur de signature invalide

**Solution :** Vérifiez que `PAYDUNYA_MASTER_KEY` est correcte et correspond au mode (test/live).

---

## 📞 Support

- **Email :** support@chineexpresse.com
- **PayDunya :** support@paydunya.com
- **Documentation PayDunya :** https://developers.paydunya.com

---

## 📄 Licence

Tous droits réservés © 2025 ChineExpresse

---

**Version :** 2.0.0
**Dernière mise à jour :** 25 octobre 2025
