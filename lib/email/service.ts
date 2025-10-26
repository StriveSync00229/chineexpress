import { createEmailTransporter, getEmailFrom, getAdminEmail } from './client'
import {
  getContactConfirmationTemplate,
  getDevisConfirmationTemplate,
  getAdminContactNotificationTemplate,
  getAdminDevisNotificationTemplate,
  getPaymentConfirmationTemplate
} from './templates'

/**
 * Envoyer un email de confirmation à l'utilisateur (contact)
 */
export async function sendContactConfirmationEmail(to: string, name: string) {
  const transporter = createEmailTransporter()
  if (!transporter) {
    console.log('📧 [MODE TEST] Email de confirmation contact non envoyé (SMTP non configuré)')
    return { success: false, message: 'SMTP non configuré' }
  }

  try {
    const from = getEmailFrom()
    const info = await transporter.sendMail({
      from: `"${from.name}" <${from.email}>`,
      to,
      subject: 'Confirmation de votre demande - Chineexpress',
      html: getContactConfirmationTemplate(name)
    })

    console.log('✅ Email de confirmation contact envoyé:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Erreur envoi email confirmation contact:', error)
    return { success: false, error }
  }
}

/**
 * Envoyer un email de confirmation à l'utilisateur (devis)
 */
export async function sendDevisConfirmationEmail(to: string, name: string, service?: string) {
  const transporter = createEmailTransporter()
  if (!transporter) {
    console.log('📧 [MODE TEST] Email de confirmation devis non envoyé (SMTP non configuré)')
    return { success: false, message: 'SMTP non configuré' }
  }

  try {
    const from = getEmailFrom()
    const info = await transporter.sendMail({
      from: `"${from.name}" <${from.email}>`,
      to,
      subject: 'Demande de devis reçue - Chineexpress',
      html: getDevisConfirmationTemplate(name, service)
    })

    console.log('✅ Email de confirmation devis envoyé:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Erreur envoi email confirmation devis:', error)
    return { success: false, error }
  }
}

/**
 * Envoyer une notification à l'admin (contact)
 */
export async function sendAdminContactNotification(data: {
  name: string
  email: string
  phone?: string
  countryCity?: string
  message: string
  service?: string
}) {
  const transporter = createEmailTransporter()
  if (!transporter) {
    console.log('📧 [MODE TEST] Notification admin contact non envoyée (SMTP non configuré)')
    return { success: false, message: 'SMTP non configuré' }
  }

  try {
    const from = getEmailFrom()
    const adminEmail = getAdminEmail()
    const info = await transporter.sendMail({
      from: `"${from.name}" <${from.email}>`,
      to: adminEmail,
      subject: `Nouvelle demande de contact - ${data.name}`,
      html: getAdminContactNotificationTemplate(data)
    })

    console.log('✅ Notification admin contact envoyée:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Erreur envoi notification admin contact:', error)
    return { success: false, error }
  }
}

/**
 * Envoyer une notification à l'admin (devis)
 */
export async function sendAdminDevisNotification(data: {
  name: string
  email: string
  phone?: string
  countryCity?: string
  message: string
  service?: string
  product?: string
  quantity?: string
  budget?: string
}) {
  const transporter = createEmailTransporter()
  if (!transporter) {
    console.log('📧 [MODE TEST] Notification admin devis non envoyée (SMTP non configuré)')
    return { success: false, message: 'SMTP non configuré' }
  }

  try {
    const from = getEmailFrom()
    const adminEmail = getAdminEmail()
    const info = await transporter.sendMail({
      from: `"${from.name}" <${from.email}>`,
      to: adminEmail,
      subject: `Nouvelle demande de devis - ${data.name}`,
      html: getAdminDevisNotificationTemplate(data)
    })

    console.log('✅ Notification admin devis envoyée:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Erreur envoi notification admin devis:', error)
    return { success: false, error }
  }
}

/**
 * Envoyer un email de confirmation de paiement
 */
export async function sendPaymentConfirmationEmail(data: {
  to: string
  name: string
  formationTitle: string
  amount: number
  currency: string
  date: string
  time: string
  location?: string
  type: 'online' | 'presential'
}) {
  const transporter = createEmailTransporter()
  if (!transporter) {
    console.log('📧 [MODE TEST] Email confirmation paiement non envoyé (SMTP non configuré)')
    return { success: false, message: 'SMTP non configuré' }
  }

  try {
    const from = getEmailFrom()
    const info = await transporter.sendMail({
      from: `"${from.name}" <${from.email}>`,
      to: data.to,
      subject: `Paiement confirmé - Formation ${data.formationTitle}`,
      html: getPaymentConfirmationTemplate(data)
    })

    console.log('✅ Email confirmation paiement envoyé:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Erreur envoi email confirmation paiement:', error)
    return { success: false, error }
  }
}

/**
 * Envoyer un email marketing (bulk)
 */
export async function sendBulkEmail(to: string, subject: string, htmlContent: string) {
  const transporter = createEmailTransporter()
  if (!transporter) {
    console.log('📧 [MODE TEST] Email marketing non envoyé (SMTP non configuré)')
    return { success: false, message: 'SMTP non configuré' }
  }

  try {
    const from = getEmailFrom()
    const info = await transporter.sendMail({
      from: `"${from.name}" <${from.email}>`,
      to,
      subject,
      html: htmlContent
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error(`❌ Erreur envoi email marketing à ${to}:`, error)
    return { success: false, error }
  }
}
