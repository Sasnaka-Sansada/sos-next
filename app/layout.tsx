import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'
import NavBar from './components/NavBar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body>
          <NavBar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}