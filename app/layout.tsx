import { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DonationBanner from '@/components/DonationBanner'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'GigglyGame - 免费在线游戏平台',
  description: '享受最好的免费在线游戏！包括街机游戏、女孩游戏、动作游戏、冒险游戏和赛车游戏。',
  keywords: '免费游戏, 在线游戏, 街机游戏, 女孩游戏, 动作游戏, 冒险游戏, 赛车游戏',
  authors: [{ name: 'GigglyGame' }],
  robots: 'index, follow',
  openGraph: {
    title: 'GigglyGame - 免费在线游戏平台',
    description: '享受最好的免费在线游戏！',
    type: 'website',
    locale: 'zh_CN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      
      <body className={`${inter.className} bg-background text-white min-h-screen flex flex-col`}>
        <LanguageProvider>
          <Navbar />
          <DonationBanner />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}