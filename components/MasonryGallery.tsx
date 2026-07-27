'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Game } from '@/types/game'

interface MasonryGalleryProps {
  games: Game[]
  columns?: number
}

export default function MasonryGallery({ games, columns = 4 }: MasonryGalleryProps) {
  const { t } = useLanguage()
  const [responsiveColumns, setResponsiveColumns] = useState(columns)
  const [columnHeights, setColumnHeights] = useState<number[]>([])
  const [gameColumns, setGameColumns] = useState<Game[][]>([])

  // 响应式列数计算
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      let newColumns = columns
      
      if (width < 640) {
        newColumns = 1 // 手机：1列
      } else if (width < 768) {
        newColumns = 2 // 小平板：2列
      } else if (width < 1024) {
        newColumns = 3 // 平板：3列
      } else {
        newColumns = columns // 桌面：原始列数
      }
      
      setResponsiveColumns(newColumns)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [columns])

  useEffect(() => {
    // 重置列高度和游戏分布
    const heights = new Array(responsiveColumns).fill(0)
    const cols: Game[][] = new Array(responsiveColumns).fill(null).map(() => [])
    
    games.forEach((game) => {
      // 找到最短的列
      const shortestColumnIndex = heights.indexOf(Math.min(...heights))
      
      // 将游戏添加到最短的列
      cols[shortestColumnIndex].push(game)
      
      // 模拟图片高度（实际项目中可以从图片元数据获取）
      const randomHeight = Math.floor(Math.random() * 200) + 200
      heights[shortestColumnIndex] += randomHeight + 20 // 20px 间距
    })
    
    setColumnHeights(heights)
    setGameColumns(cols)
  }, [games, responsiveColumns])

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

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      arcade: '🕹️',
      girl: '👸',
      action: '⚔️',
      adventure: '🗺️',
      racing: '🏎️',
    }
    return iconMap[category] || '🎮'
  }

  // 获取带有basePath的图片路径
  const getImagePath = (path: string) => {
    const basePath = process.env.NODE_ENV === 'production' ? '/h5game-platform' : ''
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return `${basePath}${normalizedPath}`
  }

  return (
    <div className="w-full px-2 sm:px-4">
      <div 
        className="flex gap-2 sm:gap-4" 
        style={{
          gridTemplateColumns: `repeat(${responsiveColumns}, 1fr)`,
        }}
      >
        {gameColumns.map((columnGames, columnIndex) => (
          <div key={columnIndex} className="flex-1 space-y-2 sm:space-y-4">
            {columnGames.map((game) => (
              <Link 
                key={game.id} 
                href={`/games/${game.slug}`}
                className="block group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 active:scale-[0.98] touch-manipulation">
                  {/* 游戏截图/GIF */}
                  <div className="relative overflow-hidden">
                    <img
                      src={game.gif || getImagePath(game.thumbnail)}
                      alt={game.title}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{
                        aspectRatio: 'auto',
                        height: 'auto'
                      }}
                      loading="lazy"
                    />
                    
                    {/* 悬浮播放按钮 */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* 分类标签 */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <span>{getCategoryIcon(game.category)}</span>
                        <span>{getCategoryName(game.category)}</span>
                      </span>
                    </div>
                    
                    {/* 精选标签 */}
                    {game.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                          <span>🔥</span>
                          <span>{t.gallery?.featured || '热门'}</span>
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* 游戏信息 */}
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-purple-400 font-medium flex items-center gap-1">
                        {getCategoryIcon(game.category)}
                        {getCategoryName(game.category)}
                      </span>
                      {game.featured && (
                        <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full font-bold">
                          ⭐ {(t.gallery && t.gallery.featured) || '精选'}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-white font-semibold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {game.title}
                    </h3>
                    
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {game.description}
                    </p>
                    
                    {/* 播放按钮 */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-lg text-center hover:from-purple-700 hover:to-pink-700 transition-all duration-200 active:scale-95">
                        🎮 {(t.gallery && t.gallery.playNow) || '立即游戏'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}