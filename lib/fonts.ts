import { Poppins, Inter } from "next/font/google"

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], // Regular, Medium, SemiBold, Bold
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
  weight: ["400", "500"], // Regular, Medium
})