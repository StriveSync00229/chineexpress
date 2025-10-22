// Types TypeScript simples pour PayDunya
export interface PayDunyaConfig {
    masterKey?: string
    privateKey?: string
    publicKey?: string
    token?: string
    mode?: string
  }
  
  export interface InvoiceData {
    total_amount: number
    description: string
    customer_name: string
    customer_email: string
    customer_phone?: string
  }
  
  export interface StoreData {
    name: string
    tagline?: string
    phone_number?: string
    postal_address?: string
    website_url?: string
  }
  
  export interface PaymentResponse {
    success: boolean
    response_code: string
    response_text: string
    description?: string
    token?: string
    redirect_url?: string
    status?: string
    invoice?: {
      total_amount?: number
      customer?: any
    }
  }
  
  // Configuration PayDunya
  const PayDunya = require('paydunya')
  
  const paydunya = new PayDunya({
    masterKey: process.env.PAYDUNYA_MASTER_KEY,
    privateKey: process.env.PAYDUNYA_PRIVATE_KEY,
    publicKey: process.env.PAYDUNYA_PUBLIC_KEY,
    token: process.env.PAYDUNYA_TOKEN,
    mode: process.env.NODE_ENV === 'production' ? 'live' : 'test'
  })
  
  export { paydunya }