import nodemailer from 'nodemailer'

// Configuration du transporteur SMTP
export const createEmailTransporter = () => {
  // Vérifier que toutes les variables d'environnement sont définies
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('⚠️  Variables SMTP manquantes. Les emails ne seront pas envoyés.')
    return null
  }

  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true pour port 465, false pour autres ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  return transporter
}

// Informations de l'expéditeur
export const getEmailFrom = () => {
  return {
    name: process.env.EMAIL_FROM_NAME || 'Chineexpress',
    email: process.env.EMAIL_FROM || process.env.SMTP_USER || 'noreply@chineexpress.com'
  }
}

// Email administrateur pour les notifications
export const getAdminEmail = () => {
  return process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'admin@chineexpress.com'
}
