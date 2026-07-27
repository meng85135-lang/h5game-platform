'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Game } from '@/types/game'

interface GameCardProps {
  game: Game
  priority?: boolean
}

export default function GameCard({ game, priority = false }: GameCardProps) {
  const { t } = useLanguage()
  
  const getCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      arcade: (t.nav && t.nav.arcade) || '街机游戏',
      girl: (t.nav && t.nav.girl) || '女生游戏',
      action: (t.nav && t.nav.action) || '动作游戏',
      adventure: (t.nav && t.nav.adventure) || '冒险游戏',
      racing: (t.nav && t.nav.racing) || '赛车游戏',
    }
    return categoryMap[category] || category
  }

  // 获取带有basePath的图片路径
  const getImagePath = (path: string) => {
    const basePath = process.env.NODE_ENV === 'production' ? '/h5game-platform' : ''
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return `${basePath}${normalizedPath}`
  }

  return (
    <Link href={`/games/${game.slug}`} className="group block">
      <div className="bg-card rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-[0.98] border border-gray-800 hover:border-primary touch-manipulation">
        {/* Game Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={getImagePath(game.thumbnail)}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading={priority ? 'eager' : 'lazy'}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300">
            <div className="bg-primary text-white rounded-full p-3 sm:p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          
          {/* Category Badge */}
          {game.category && (
            <div className="absolute top-2 left-2">
              <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                {getCategoryName(game.category)}
              </span>
            </div>
          )}
          
          {/* Featured Badge */}
          {game.featured && (
            <div className="absolute top-2 right-2">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                ⭐ {(t.gallery && t.gallery.featured) || '精选'}
              </span>
            </div>
          )}
        </div>
        
        {/* Game Info */}
        <div className="p-3 sm:p-4">
          <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {game.title}
          </h3>
          
          <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed mb-3">
            {game.description}
          </p>
          
          {/* Game Stats */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="flex items-center space-x-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="hidden sm:inline">{(t.gallery && t.gallery.freeToPlay) || '免费游玩'}</span>
                <span className="sm:hidden">免费</span>
              </span>
            </div>
            
            <div className="text-primary font-medium group-hover:text-accent transition-colors">
              <span className="hidden sm:inline">{(t.gallery && t.gallery.playNow) || '立即游玩'} →</span>
              <span className="sm:hidden">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}