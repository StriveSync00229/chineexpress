/**
 * Templates HTML pour les emails
 */

// Template de base avec style
const getBaseTemplate = (content: string) => {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chineexpress</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Chineexpress</h1>
              <p style="margin: 5px 0 0 0; color: #dbeafe; font-size: 14px;">Votre partenaire import-export Chine</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} Chineexpress. Tous droits réservés.
              </p>
              <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 12px; text-align: center;">
                Cet email a été envoyé automatiquement, merci de ne pas répondre.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

// Template de confirmation pour l'utilisateur (Contact)
export const getContactConfirmationTemplate = (name: string) => {
  const content = `
    <h2 style="color: #1e3a8a; margin: 0 0 20px 0;">Merci pour votre message !</h2>
    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Bonjour <strong>${name}</strong>,
    </p>
    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Nous avons bien reçu votre demande de contact. Notre équipe l'examinera dans les plus brefs délais et vous recontactera sous 24-48 heures.
    </p>
    <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
      <p style="color: #1e40af; margin: 0; font-size: 14px;">
        💡 <strong>Besoin d'une réponse plus rapide ?</strong><br>
        Contactez-nous directement par WhatsApp ou téléphone.
      </p>
    </div>
    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
      Cordialement,<br>
      <strong>L'équipe Chineexpress</strong>
    </p>
  `
  return getBaseTemplate(content)
}

// Template de confirmation pour l'utilisateur (Devis)
export const getDevisConfirmationTemplate = (name: string, service?: string) => {
  const content = `
    <h2 style="color: #1e3a8a; margin: 0 0 20px 0;">Demande de devis reçue !</h2>
    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Bonjour <strong>${name}</strong>,
    </p>
    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Nous avons bien reçu votre demande de devis${service ? ` pour le service <strong>${service}</strong>` : ''}.
      Notre équipe commerciale analyse votre demande et vous enverra une proposition détaillée dans les 24-48 heures.
    </p>
    <div style="background-color: #dcfce7; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0;">
      <p style="color: #15803d; margin: 0; font-size: 14px;">
        ✅ <strong>Prochaines étapes :</strong><br>
        1. Analyse de votre demande<br>
        2. Préparation du devis personnalisé<br>
        3. Envoi du devis par email
      </p>
    </div>
    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
      Cordialement,<br>
      <strong>L'équipe Chineexpress</strong>
    </p>
  `
  return getBaseTemplate(content)
}

// Template de notification pour l'admin (Contact)
export const getAdminContactNotificationTemplate = (data: {
  name: string
  email: string
  phone?: string
  countryCity?: string
  message: string
  service?: string
}) => {
  const content = `
    <h2 style="color: #1e3a8a; margin: 0 0 20px 0;">Nouvelle demande de contact</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Nom :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Email :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.email}</td>
      </tr>
      ${data.phone ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Téléphone :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.phone}</td>
      </tr>
      ` : ''}
      ${data.countryCity ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Pays/Ville :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.countryCity}</td>
      </tr>
      ` : ''}
      ${data.service ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Service :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.service}</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 10px; font-weight: bold; color: #1f2937; vertical-align: top;">Message :</td>
        <td style="padding: 10px; color: #374151;">${data.message}</td>
      </tr>
    </table>
    <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">
        ⚡ <strong>Action requise :</strong> Répondre au client dans les 24 heures.
      </p>
    </div>
  `
  return getBaseTemplate(content)
}

// Template de notification pour l'admin (Devis)
export const getAdminDevisNotificationTemplate = (data: {
  name: string
  email: string
  phone?: string
  countryCity?: string
  message: string
  service?: string
  product?: string
  quantity?: string
  budget?: string
}) => {
  const content = `
    <h2 style="color: #1e3a8a; margin: 0 0 20px 0;">Nouvelle demande de devis</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Nom :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Email :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.email}</td>
      </tr>
      ${data.phone ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Téléphone :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.phone}</td>
      </tr>
      ` : ''}
      ${data.countryCity ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Pays/Ville :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.countryCity}</td>
      </tr>
      ` : ''}
      ${data.service ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Service :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.service}</td>
      </tr>
      ` : ''}
      ${data.product ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Produit :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.product}</td>
      </tr>
      ` : ''}
      ${data.quantity ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Quantité :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.quantity}</td>
      </tr>
      ` : ''}
      ${data.budget ? `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Budget :</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.budget}</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 10px; font-weight: bold; color: #1f2937; vertical-align: top;">Message :</td>
        <td style="padding: 10px; color: #374151;">${data.message}</td>
      </tr>
    </table>
    <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">
        ⚡ <strong>Action requise :</strong> Préparer et envoyer le devis dans les 24-48 heures.
      </p>
    </div>
  `
  return getBaseTemplate(content)
}

// Template de confirmation de paiement
export const getPaymentConfirmationTemplate = (data: {
  name: string
  formationTitle: string
  amount: number
  currency: string
  date: string
  time: string
  location?: string
  type: 'online' | 'presential'
}) => {
  const content = `
    <h2 style="color: #16a34a; margin: 0 0 20px 0;">Paiement confirmé ! ✅</h2>
    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Bonjour <strong>${data.name}</strong>,
    </p>
    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      Nous avons bien reçu votre paiement pour la formation <strong>${data.formationTitle}</strong>. Votre inscription est confirmée !
    </p>

    <div style="background-color: #dcfce7; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #15803d; margin: 0 0 15px 0; font-size: 18px;">Détails de votre formation</h3>
      <table style="width: 100%;">
        <tr>
          <td style="padding: 8px 0; color: #374151;"><strong>Formation :</strong></td>
          <td style="padding: 8px 0; color: #374151;">${data.formationTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #374151;"><strong>Type :</strong></td>
          <td style="padding: 8px 0; color: #374151;">${data.type === 'online' ? 'En ligne' : 'Présentiel'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #374151;"><strong>Date :</strong></td>
          <td style="padding: 8px 0; color: #374151;">${new Date(data.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #374151;"><strong>Heure :</strong></td>
          <td style="padding: 8px 0; color: #374151;">${data.time}</td>
        </tr>
        ${data.location ? `
        <tr>
          <td style="padding: 8px 0; color: #374151;"><strong>Lieu :</strong></td>
          <td style="padding: 8px 0; color: #374151;">${data.location}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px 0; color: #374151;"><strong>Montant payé :</strong></td>
          <td style="padding: 8px 0; color: #16a34a; font-size: 18px;"><strong>${data.amount.toLocaleString()} ${data.currency}</strong></td>
        </tr>
      </table>
    </div>

    <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
      <p style="color: #1e40af; margin: 0; font-size: 14px;">
        📧 <strong>Prochaines étapes :</strong><br>
        Vous recevrez un email avec les détails de connexion ${data.type === 'online' ? '(lien Zoom/Teams)' : 'et les instructions d\'accès'} 48 heures avant le début de la formation.
      </p>
    </div>

    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
      Nous sommes impatients de vous retrouver !<br>
      <strong>L'équipe Chineexpress</strong>
    </p>
  `
  return getBaseTemplate(content)
}
