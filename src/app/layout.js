import Footer from './Components/Footer/Footer'
import NavBar from './Components/NavBar/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import {ThemeContextProvider} from "@/context/ThemeContext"
import ThemeProvider from '@/Providers/ThemeProvider'
import AuthProvider from '@/Providers/AuthProvider'
export const metadata = {
  title: 'Blog App',
  description: 'The best blog app!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> 
          <ThemeContextProvider>
            <ThemeProvider>
              <div className='container'>
                <div className='wrapper'>
                  <NavBar/>
                    {children}
                    <Footer/>
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>


      </body>
    </html>
  )
}
