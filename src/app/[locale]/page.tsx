'use client'

import { setRequestLocale } from 'next-intl/server'
import { useEffect, Suspense, lazy } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Download,
  ExternalLink,
  Gamepad2,
  Gift,
  Hammer,
  Home,
  Keyboard,
  MessageCircle,
  Package,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X
} from 'lucide-react'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { NativeBannerAd, AdBanner, SidebarAd } from '@/components/ads'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse flex items-center justify-center`}>
    <div className="text-muted-foreground">{(useMessages() as any).common.loading}</div>
  </div>
)

export default function HomePage() {
  const t = useMessages() as any
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dissidiaduellumfinalfantasy.wiki'

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: "Dissidia Duellum Final Fantasy Wiki",
        description: "Guides and references for Dissidia Duellum Final Fantasy characters, roles, abilities, bosses, and updates.",
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          caption: "Dissidia Duellum Final Fantasy Hero Artwork",
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: "Dissidia Duellum Final Fantasy Wiki",
        alternateName: "DDFF Wiki",
        url: siteUrl,
        description: "Unofficial resource hub for Dissidia Duellum Final Fantasy players.",
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          caption: "Dissidia Duellum Final Fantasy Wiki",
        },
        sameAs: [
          'https://www.square-enix.com/ddff/en/',
          'https://www.facebook.com/profile.php?id=61580044209959',
          'https://x.com/DDFF_EN',
          'https://www.youtube.com/watch?v=dgTNtB9myss',
        ],
      },
      {
        '@type': 'VideoGame',
        name: "DISSIDIA DUELLUM FINAL FANTASY",
        gamePlatform: ['iOS', 'Android'],
        applicationCategory: 'Game',
        genre: ['Action', 'Team Battle', 'Boss Battle Arena'],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 6,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://apps.apple.com/us/app/dissidia-duellum-final-fantasy/id6480398822',
        },
      },
    ],
  }

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const teamCompIcons = [Users, Shield, TrendingUp, ClipboardCheck]
  const roleGuideIcons = [Gamepad2, Download, ArrowRight, MessageCircle]
  const featuredAbilityIcons = [Sparkles, Shield, Clock, Hammer]
  const helperIcons = [Star, Keyboard, Home, Users]
  const challengeSectionIcons = ['Shield', 'Gift', 'Calendar']
  const controlsSectionIcons = ['Monitor', 'Gamepad2', 'Sparkles']
  const customizationSectionIcons = ['Palette', 'Layers', 'Film', 'MessageCircle']
  const customizationShowcaseIcons = ['Building', 'Map', 'Globe', 'Users']
  const roadmapQuickIcons = ['TrendingUp', 'Download', 'Users', 'Calendar']
  const roadmapWaveIcons = ['Sparkles', 'Flame', 'Shield']
  const roadmapRewardIcons = ['Gift', 'Package', 'Star', 'Trophy']

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部横幅（Sticky）- 全平台显示 */}
      <div className="sticky top-20 z-20 border-b border-border py-2 bg-background/95 backdrop-blur-sm">
        <AdBanner
          type="banner-320x50"
          adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50}
        />
      </div>

      {/* 左侧边栏 Sticky 广告 - 桌面端 */}
      <div className="hidden lg:block fixed left-4 top-24 z-10">
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </div>

      {/* 右侧边栏 Sticky 广告 - 桌面端 */}
      <div className="hidden lg:block fixed right-4 top-24 z-10">
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border-2 border-[hsl(var(--gold)/0.5)] mb-6 glow-gold">
              <Sparkles className="w-4 h-4 text-[hsl(var(--gold))]" />
              <span className="text-sm font-semibold">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bebas mb-6 leading-tight
                           bg-gradient-to-r from-foreground via-[hsl(var(--nav-theme))] to-foreground
                           bg-clip-text text-transparent
                           drop-shadow-[0_2px_8px_hsl(var(--nav-theme)/0.3)]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection('release-editions')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg
                           transition-all duration-300
                           hover:shadow-[0_8px_24px_hsl(var(--nav-theme)/0.4)]
                           hover:-translate-y-1"
              >
                <Gift className="w-5 h-5 transition-transform group-hover:scale-110" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://apps.apple.com/us/app/dissidia-duellum-final-fantasy/id6480398822"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           border-2 border-[hsl(var(--gold)/0.5)] hover:bg-[hsl(var(--gold)/0.1)]
                           rounded-lg font-semibold text-lg
                           transition-all duration-300
                           hover:shadow-[0_8px_24px_rgba(251,191,36,0.3)]
                           hover:-translate-y-1"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 - Hero 区域下方 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId="dgTNtB9myss"
              title="DISSIDIA DUELLUM FINAL FANTASY - Official Launch Trailer"
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* 广告位 3: 标准横幅 728×90 - 视频区域下方 */}
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
      />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4">
              {t.tools.title}{' '}
              <span className="text-gold-gradient">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 映射卡片索引到 section ID
              const sectionIds = [
                'release-editions', 'roster', 'ratings', 'controls',
                'match-types', 'showcase', 'mygm', 'myrise',
                'universe-mode', 'community-creations', 'the-island', 'myfaction',
                'challenges-guide', 'controls-guide', 'customization-guide', 'roadmap'
              ]
              const sectionId = sectionIds[index]

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group p-6 rounded-xl border-2 border-border
                             bg-card hover:border-[hsl(var(--gold)/0.6)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-[0_12px_32px_rgba(251,191,36,0.2)]
                             hover:-translate-y-2 relative overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Diagonal Decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[hsl(var(--gold)/0.1)] to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-12 h-12 rounded-lg mb-4
                                  bg-gradient-to-br from-[hsl(var(--nav-theme)/0.1)] to-[hsl(var(--gold)/0.1)]
                                  border-2 border-[hsl(var(--gold)/0.3)]
                                  flex items-center justify-center
                                  group-hover:border-[hsl(var(--gold))]
                                  transition-all duration-300 relative z-10">
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))] group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="font-bebas text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 - 导航卡片下方 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
      />

      {/* Module 1: Release & Editions */}
      <section id="release-editions" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.releaseEditions.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.releaseEditions.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {t.modules.releaseEditions.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border-2 border-[hsl(var(--gold)/0.3)] text-center hover:border-[hsl(var(--gold))] transition-all duration-300">
                <div className="text-2xl font-bebas text-gold-gradient">{fact.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{fact.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.modules.releaseEditions.editions.map((edition: any, i: number) => (
              <div key={i} className="p-6 rounded-xl border-2 border-border bg-card hover:border-[hsl(var(--nav-theme))] transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--nav-theme)/0.2)] hover:-translate-y-1">
                <h3 className="text-xl font-bebas mb-2">{edition.name}</h3>
                <div className="text-3xl font-bebas text-gold-gradient mb-4">{edition.price}</div>
                <div className="text-sm text-muted-foreground mb-4">{edition.releaseDate}</div>
                <ul className="space-y-2">
                  {edition.includes.map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 - 第1个模块下方 */}
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
      />

      {/* Module 2: Roster */}
      <section id="roster" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.roster.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.roster.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {t.modules.roster.stats.map((stat: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border text-center">
                <div className="text-4xl font-bold text-[hsl(var(--nav-theme))] mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.modules.roster.categories.map((category: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 text-[hsl(var(--nav-theme))]">{category.name}</h3>
                <ul className="space-y-2">
                  {category.superstars.map((name: string, j: number) => (
                    <li key={j} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--nav-theme))]" />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 - 第2个模块下方 */}
      <AdBanner
        type="banner-320x50"
        adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50}
      />

      {/* Module 3: Ratings */}
      <section id="ratings" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.ratings.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.ratings.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-card border-2 border-border hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300">
              <h3 className="text-2xl font-bebas mb-6 text-[hsl(var(--nav-theme))]">Role Impact Top 10</h3>
              <div className="space-y-3">
                {t.modules.ratings.menTopRated.map((superstar: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] flex items-center justify-center font-bebas text-white">{i + 1}</div>
                      <span className="font-medium">{superstar.name}</span>
                    </div>
                    <div className="text-2xl font-bebas text-gold-gradient">{superstar.rating}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-xl bg-card border-2 border-border hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300">
              <h3 className="text-2xl font-bebas mb-6 text-[hsl(var(--nav-theme))]">Strategy Priority Top 10</h3>
              <div className="space-y-3">
                {t.modules.ratings.womenTopRated.map((superstar: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] flex items-center justify-center font-bebas text-white">{i + 1}</div>
                      <span className="font-medium">{superstar.name}</span>
                    </div>
                    <div className="text-2xl font-bebas text-gold-gradient">{superstar.rating}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 4: Controls */}
      <section id="controls" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.controls.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.controls.subtitle}</p>
          </div>
          <div className="space-y-6">
            {t.modules.controls.platforms.map((platform: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme))]">{platform.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {platform.controls.map((control: any, j: number) => (
                    <div key={j} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm font-medium">{control.action}</span>
                      <span className="px-3 py-1 rounded bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme))] font-mono text-xs">{control.input}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 方形广告 300×250 - Module 4-5 之间 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="my-8"
      />

      {/* Module 5: Match Types */}
      <section id="match-types" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.matchTypes.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.matchTypes.title}
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.matchTypes.subtitle}</p>
            <p className="text-sm text-muted-foreground max-w-4xl mx-auto mt-4">{t.modules.matchTypes.intro}</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {t.modules.matchTypes.filters.map((filter: string, i: number) => (
              <span key={i} className="px-4 py-1.5 rounded-full border border-[hsl(var(--gold)/0.4)] bg-[hsl(var(--nav-theme)/0.08)] text-sm">
                {filter}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {t.modules.matchTypes.cards.map((card: any, i: number) => {
              const IconComponent = teamCompIcons[i] || Users
              return (
                <div key={i} className="p-6 rounded-xl bg-card border-2 border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bebas text-[hsl(var(--nav-theme))]">{card.title}</h3>
                    <IconComponent className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <p className="text-xs uppercase tracking-wide text-[hsl(var(--gold))] mb-4">{card.purpose}</p>
                  <p className="text-sm mb-3"><span className="text-muted-foreground">Lineup:</span> {card.lineup.join(' / ')}</p>
                  <p className="text-sm mb-3"><span className="text-muted-foreground">Role Spread:</span> {card.roleSpread.join(' / ')}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.synergyTags.map((tag: string, tagIndex: number) => (
                      <span key={tagIndex} className="px-2 py-1 rounded bg-muted text-xs">{tag}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3"><span className="text-foreground">Why it works:</span> {card.whyItWorks}</p>
                  <p className="text-sm text-muted-foreground mb-3"><span className="text-foreground">Opening plan:</span> {card.openingPlan}</p>
                  <p className="text-sm text-muted-foreground"><span className="text-foreground">Best for:</span> {card.bestFor}</p>
                </div>
              )
            })}
          </div>
          <div className="p-6 rounded-xl border border-[hsl(var(--gold)/0.4)] bg-[hsl(var(--nav-theme)/0.08)]">
            <h4 className="font-bebas text-xl mb-4 text-[hsl(var(--nav-theme-light))]">Launch Roster</h4>
            <div className="flex flex-wrap gap-2">
              {t.modules.matchTypes.launchRoster.map((fighter: string, i: number) => (
                <span key={i} className="px-3 py-1 rounded-full bg-card border border-border text-sm">
                  {fighter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 6: Showcase */}
      <section id="showcase" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.showcase.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.showcase.title}
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.showcase.subtitle}</p>
            <p className="text-sm text-muted-foreground max-w-4xl mx-auto mt-4">{t.modules.showcase.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(t.modules.showcase.roleCounts).map(([role, count], i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <div className="text-2xl font-bebas text-[hsl(var(--nav-theme))]">{String(count)}</div>
                <div className="text-xs text-muted-foreground">{role}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.modules.showcase.roleCards.map((roleCard: any, i: number) => {
              const IconComponent = roleGuideIcons[i] || Gamepad2
              return (
                <div key={i} className="p-6 rounded-xl bg-card border-2 border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bebas text-[hsl(var(--nav-theme))]">{roleCard.role}</h3>
                    <IconComponent className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{roleCard.officialSummary}</p>
                  <p className="text-sm mb-2"><span className="text-muted-foreground">Job:</span> {roleCard.jobInMatch}</p>
                  <p className="text-sm mb-3"><span className="text-muted-foreground">Positioning:</span> {roleCard.positioning}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {roleCard.launchExamples.map((example: string, j: number) => (
                      <span key={j} className="px-2 py-1 rounded bg-muted text-xs">{example}</span>
                    ))}
                  </div>
                  <p className="text-sm text-[hsl(var(--nav-theme-light))]">{roleCard.quickTip}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 7: MyGM */}
      <section id="mygm" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.mygm.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.mygm.title}
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.mygm.subtitle}</p>
            <p className="text-sm text-muted-foreground max-w-4xl mx-auto mt-4">{t.modules.mygm.intro}</p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border mb-8">
            <h4 className="font-bebas text-xl mb-4 text-[hsl(var(--nav-theme))]">Loadout Basics</h4>
            <ul className="space-y-2">
              {t.modules.mygm.loadoutBasics.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {t.modules.mygm.featuredGeneralAbilities.map((ability: any, i: number) => {
              const IconComponent = featuredAbilityIcons[i] || Sparkles
              return (
                <div key={i} className="p-4 rounded-xl bg-card border border-border hover:border-[hsl(var(--gold)/0.5)] transition-all duration-300">
                  <IconComponent className="w-5 h-5 text-[hsl(var(--gold))] mb-3" />
                  <h4 className="font-semibold mb-1">{ability.name}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{ability.type}</p>
                  <p className="text-xs text-[hsl(var(--nav-theme-light))]">{ability.artist}</p>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.modules.mygm.signatureAbilities.map((entry: any, i: number) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bebas text-lg text-[hsl(var(--nav-theme))]">{entry.character}</h4>
                  <span className="px-2 py-1 rounded bg-muted text-xs">{entry.role}</span>
                </div>
                <p className="text-sm mb-1"><span className="text-muted-foreground">Passive:</span> {entry.passive}</p>
                <p className="text-sm text-muted-foreground mb-3">{entry.passiveEffect}</p>
                <p className="text-sm mb-1"><span className="text-muted-foreground">Unique Ability:</span> {entry.uniqueAbility}</p>
                <p className="text-sm text-muted-foreground">{entry.uniqueEffect}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 标准横幅 728×90 - Module 7-8 之间 */}
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="my-8"
      />

      {/* Module 8: MyRISE */}
      <section id="myrise" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.myrise.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.myrise.title}
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.myrise.subtitle}</p>
            <p className="text-sm text-muted-foreground max-w-4xl mx-auto mt-4">{t.modules.myrise.intro}</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {t.modules.myrise.coreRules.map((rule: string, i: number) => (
              <span key={i} className="px-3 py-1.5 rounded-full border border-[hsl(var(--gold)/0.4)] bg-card text-sm">
                {rule}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {t.modules.myrise.battleFlow.map((flow: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border">
                <div className="w-7 h-7 rounded-full bg-[hsl(var(--nav-theme))] text-white flex items-center justify-center text-sm font-bebas mb-3">
                  {flow.step}
                </div>
                <h4 className="font-semibold mb-2 text-[hsl(var(--nav-theme))]">{flow.title}</h4>
                <p className="text-xs text-muted-foreground">{flow.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {t.modules.myrise.bestLaunchHelpers.map((helper: any, i: number) => {
              const IconComponent = helperIcons[i] || Star
              return (
                <div key={i} className="p-4 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                  <IconComponent className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mb-2" />
                  <h4 className="font-semibold mb-2">{helper.character}</h4>
                  <p className="text-sm text-muted-foreground">{helper.reason}</p>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-card border border-[hsl(var(--nav-theme)/0.4)]">
              <h4 className="font-bebas text-xl mb-4 text-[hsl(var(--nav-theme))]">Do</h4>
              <ul className="space-y-2">
                {t.modules.myrise.doList.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-card border border-[hsl(var(--gold)/0.5)]">
              <h4 className="font-bebas text-xl mb-4 text-[hsl(var(--gold))]">Do Not</h4>
              <ul className="space-y-2">
                {t.modules.myrise.dontList.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-[hsl(var(--gold))] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Module 9: Universe Mode */}
      <section id="universe-mode" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.universeMode.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.universeMode.title}
            </h3>
            <p className="text-sm uppercase tracking-wide text-[hsl(var(--gold))] mb-3">{t.modules.universeMode.eyebrow}</p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.universeMode.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {t.modules.universeMode.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <div className="text-xs text-muted-foreground">{fact.label}</div>
                <div className="text-sm md:text-base font-semibold text-[hsl(var(--nav-theme-light))] mt-1">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {t.modules.universeMode.flowSteps.map((step: any, i: number) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-full bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.4)] flex items-center justify-center text-sm font-bebas text-[hsl(var(--nav-theme-light))]">
                    {step.step}
                  </span>
                  <DynamicIcon name={step.icon} className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <h3 className="text-lg font-bebas text-[hsl(var(--nav-theme))] mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {t.modules.universeMode.tipCards.map((tip: any, i: number) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border hover:border-[hsl(var(--gold)/0.5)] transition-all duration-300">
                <DynamicIcon name={tip.icon} className="w-5 h-5 text-[hsl(var(--gold))] mb-3" />
                <h4 className="font-bebas text-lg mb-2">{tip.title}</h4>
                <p className="text-sm text-muted-foreground">{tip.body}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.modules.universeMode.callouts.map((item: any, i: number) => (
              <div key={i} className="p-4 rounded-lg border border-[hsl(var(--gold)/0.4)] bg-[hsl(var(--nav-theme)/0.08)]">
                <p className="text-xs uppercase tracking-wide text-[hsl(var(--gold))] mb-2">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 10: Community Creations */}
      <section id="community-creations" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.communityCreations.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.communityCreations.title}
            </h3>
            <p className="text-sm uppercase tracking-wide text-[hsl(var(--gold))] mb-3">{t.modules.communityCreations.eyebrow}</p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.communityCreations.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.communityCreations.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <div className="text-xs text-muted-foreground">{fact.label}</div>
                <div className="text-sm md:text-base font-semibold text-[hsl(var(--nav-theme-light))] mt-1">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.modules.communityCreations.modeCards.map((card: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bebas text-[hsl(var(--nav-theme))]">{card.name}</h3>
                  <DynamicIcon name={card.icon} className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <p className="text-xs uppercase tracking-wide text-[hsl(var(--gold))] mb-2">{card.tag}</p>
                <p className="text-sm text-muted-foreground mb-3">{card.summary}</p>
                <ul className="space-y-2">
                  {card.highlights.map((item: string, j: number) => (
                    <li key={j} className="text-sm flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {t.modules.communityCreations.bestFor.map((item: any, i: number) => (
              <div key={i} className="p-4 rounded-lg border border-[hsl(var(--gold)/0.4)] bg-[hsl(var(--nav-theme)/0.08)]">
                <div className="flex items-center gap-2 mb-2">
                  <DynamicIcon name={item.icon} className="w-4 h-4 text-[hsl(var(--gold))]" />
                  <p className="font-semibold text-sm">{item.playerType}</p>
                </div>
                <p className="text-xs mb-1">
                  <span className="text-muted-foreground">Recommended:</span> {item.recommendedMode}
                </p>
                <p className="text-xs text-muted-foreground">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 7: 中型横幅 468×60 - Module 10-11 之间 */}
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="my-8"
      />

      {/* Module 11: The Island */}
      <section id="the-island" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.theIsland.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.theIsland.title}
            </h3>
            <p className="text-sm uppercase tracking-wide text-[hsl(var(--gold))] mb-3">{t.modules.theIsland.eyebrow}</p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.theIsland.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.theIsland.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <div className="text-xs text-muted-foreground">{fact.label}</div>
                <div className="text-sm md:text-base font-semibold text-[hsl(var(--nav-theme-light))] mt-1">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {t.modules.theIsland.howItWorks.map((step: any, i: number) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-full bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.4)] flex items-center justify-center text-sm font-bebas text-[hsl(var(--nav-theme-light))]">
                    {step.step}
                  </span>
                  <DynamicIcon name={step.icon} className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <h4 className="font-bebas text-lg text-[hsl(var(--nav-theme))] mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {t.modules.theIsland.rewardCards.map((item: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border hover:border-[hsl(var(--gold)/0.5)] transition-all duration-300">
                <DynamicIcon name={item.icon} className="w-5 h-5 text-[hsl(var(--gold))] mb-2" />
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.modules.theIsland.importantNotes.map((item: any, i: number) => (
              <div key={i} className="p-4 rounded-lg border border-[hsl(var(--gold)/0.4)] bg-[hsl(var(--nav-theme)/0.08)]">
                <div className="flex items-center gap-2 mb-2">
                  <DynamicIcon name={item.icon} className="w-4 h-4 text-[hsl(var(--gold))]" />
                  <p className="font-semibold text-sm">{item.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 12: MyFACTION */}
      <section id="myfaction" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.myfaction.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.myfaction.title}
            </h3>
            <p className="text-sm uppercase tracking-wide text-[hsl(var(--gold))] mb-3">{t.modules.myfaction.eyebrow}</p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.myfaction.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.myfaction.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <div className="text-xs text-muted-foreground">{fact.label}</div>
                <div className="text-sm md:text-base font-semibold text-[hsl(var(--nav-theme-light))] mt-1">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.modules.myfaction.storyBeats.map((feature: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bebas text-[hsl(var(--nav-theme))]">{feature.title}</h3>
                  <DynamicIcon name={feature.icon} className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <p className="text-sm text-muted-foreground">{feature.body}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8">
            {t.modules.myfaction.storyFeatures.map((item: any, i: number) => (
              <div key={i} className="p-4 rounded-lg border border-[hsl(var(--gold)/0.4)] bg-[hsl(var(--nav-theme)/0.08)]">
                <div className="flex items-center gap-2 mb-2">
                  <DynamicIcon name={item.icon} className="w-4 h-4 text-[hsl(var(--gold))]" />
                  <p className="font-semibold text-sm">{item.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <h4 className="font-bebas text-xl mb-4 text-[hsl(var(--nav-theme-light))]">Launch Ghosts</h4>
            <div className="flex flex-wrap gap-2">
              {t.modules.myfaction.launchGhosts.map((name: string, i: number) => (
                <span key={i} className="px-3 py-1 rounded-full bg-muted text-sm">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 13: Challenges Guide */}
      <section id="challenges-guide" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.lockerCodes.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.lockerCodes.title}
            </h3>
            <p className="text-sm uppercase tracking-wide text-[hsl(var(--gold))] mb-3">{t.modules.lockerCodes.eyebrow}</p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.lockerCodes.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.lockerCodes.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <div className="text-xs text-muted-foreground">{fact.label}</div>
                <div className="text-sm md:text-base font-semibold text-[hsl(var(--nav-theme-light))] mt-1">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {t.modules.lockerCodes.sections.map((section: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bebas text-[hsl(var(--nav-theme))]">{section.title}</h3>
                  <DynamicIcon name={challengeSectionIcons[i] || 'HelpCircle'} className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <ul className="space-y-2">
                  {section.items.map((item: string, j: number) => (
                    <li key={j} className="text-sm flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl border border-[hsl(var(--gold)/0.4)] bg-[hsl(var(--nav-theme)/0.08)]">
            <h4 className="font-bebas text-xl mb-3 text-[hsl(var(--nav-theme-light))]">{t.modules.lockerCodes.cta.label}</h4>
            <p className="text-sm text-muted-foreground">{t.modules.lockerCodes.cta.hint}</p>
          </div>
        </div>
      </section>

      {/* 广告位 8: 方形广告 300×250 - Locker Codes 下方 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="my-8"
      />

      {/* Module 14: Controls Guide */}
      <section id="controls-guide" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.pcRequirements.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.pcRequirements.title}
            </h3>
            <p className="text-sm uppercase tracking-wide text-[hsl(var(--gold))] mb-3">{t.modules.pcRequirements.eyebrow}</p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.pcRequirements.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.pcRequirements.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <div className="text-xs text-muted-foreground">{fact.label}</div>
                <div className="text-sm md:text-base font-semibold text-[hsl(var(--nav-theme-light))] mt-1">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {t.modules.pcRequirements.sections.map((panel: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bebas text-[hsl(var(--nav-theme))]">{panel.title}</h3>
                  <DynamicIcon name={controlsSectionIcons[i] || 'Gamepad2'} className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <ul className="space-y-2">
                  {panel.items.map((item: string, j: number) => (
                    <li key={j} className="text-sm flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl bg-card border border-[hsl(var(--gold)/0.4)]">
            <h4 className="font-bebas text-xl mb-4 text-[hsl(var(--nav-theme-light))]">{t.modules.pcRequirements.tipsTitle}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {t.modules.pcRequirements.tips.map((tip: string, i: number) => (
                <div key={i} className="p-3 rounded-lg bg-muted/40 border border-border text-sm text-muted-foreground">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 15: Customization Guide */}
      <section id="customization-guide" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.arenas.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.arenas.title}
            </h3>
            <p className="text-sm uppercase tracking-wide text-[hsl(var(--gold))] mb-3">{t.modules.arenas.eyebrow}</p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.arenas.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.arenas.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <div className="text-xs text-muted-foreground">{fact.label}</div>
                <div className="text-sm md:text-base font-semibold text-[hsl(var(--nav-theme-light))] mt-1">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {t.modules.arenas.sections.map((section: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bebas text-[hsl(var(--nav-theme))]">{section.title}</h3>
                  <DynamicIcon name={customizationSectionIcons[i] || 'Palette'} className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <ul className="space-y-2">
                  {section.items.map((item: string, j: number) => (
                    <li key={j} className="text-sm flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.modules.arenas.showcaseCards.map((card: any, i: number) => (
              <div key={i} className="p-4 rounded-xl border border-[hsl(var(--gold)/0.4)] bg-[hsl(var(--nav-theme)/0.08)]">
                <DynamicIcon name={customizationShowcaseIcons[i] || 'Palette'} className="w-5 h-5 text-[hsl(var(--gold))] mb-2" />
                <h4 className="font-semibold mb-1">{card.title}</h4>
                <p className="text-sm text-muted-foreground">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 16: Roadmap */}
      <section id="roadmap" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.dlcUnlockables.moduleName}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <h3 className="text-2xl md:text-3xl font-bebas text-[hsl(var(--nav-theme-light))] mt-6 mb-4">
              {t.modules.dlcUnlockables.title}
            </h3>
            <p className="text-sm uppercase tracking-wide text-[hsl(var(--gold))] mb-3">{t.modules.dlcUnlockables.eyebrow}</p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.dlcUnlockables.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.dlcUnlockables.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <DynamicIcon name={roadmapQuickIcons[i] || 'HelpCircle'} className="w-4 h-4 text-[hsl(var(--gold))] mx-auto mb-2" />
                <div className="text-xs text-muted-foreground">{fact.label}</div>
                <div className="text-sm md:text-base font-semibold text-[hsl(var(--nav-theme-light))] mt-1">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl bg-card border border-border mb-8">
            <h4 className="font-bebas text-xl mb-3 text-[hsl(var(--nav-theme))]">{t.modules.dlcUnlockables.seasonInfo.title}</h4>
            <ul className="space-y-2">
              {t.modules.dlcUnlockables.seasonInfo.items.map((item: string, i: number) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border mb-8">
            <h4 className="font-bebas text-xl mb-4 text-[hsl(var(--nav-theme-light))]">{t.modules.dlcUnlockables.launchRosterTitle}</h4>
            <div className="flex flex-wrap gap-2">
              {t.modules.dlcUnlockables.launchRoster.map((fighter: string, i: number) => (
                <span key={i} className="px-3 py-1 rounded-full bg-muted border border-border text-sm">
                  {fighter}
                </span>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-xl border border-[hsl(var(--gold)/0.4)] bg-[hsl(var(--nav-theme)/0.08)] mb-8">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h4 className="font-bebas text-xl text-[hsl(var(--nav-theme-light))]">{t.modules.dlcUnlockables.upcomingCampaign.title}</h4>
              <span className="px-3 py-1 rounded-full text-xs border border-[hsl(var(--gold)/0.4)]">{t.modules.dlcUnlockables.upcomingCampaign.window}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {t.modules.dlcUnlockables.upcomingCampaign.waves.map((wave: any, i: number) => (
                <div key={i} className="p-4 rounded-lg bg-card border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-bebas text-lg text-[hsl(var(--nav-theme))]">{wave.label}</h5>
                    <DynamicIcon name={roadmapWaveIcons[i] || 'Sparkles'} className="w-5 h-5 text-[hsl(var(--gold))]" />
                  </div>
                  <div className="space-y-3">
                    {wave.characters.map((entry: any, j: number) => (
                      <div key={j} className="p-3 rounded bg-muted/40 border border-border">
                        <p className="text-sm font-semibold">{entry.name}</p>
                        <p className="text-xs text-muted-foreground mb-1">{entry.series} · {entry.role}</p>
                        <p className="text-xs text-muted-foreground">{entry.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h4 className="font-bebas text-xl text-[hsl(var(--nav-theme))]">{t.modules.dlcUnlockables.liveNow.title}</h4>
              <span className="text-xs text-muted-foreground">{t.modules.dlcUnlockables.liveNow.period}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {t.modules.dlcUnlockables.liveNow.items.map((item: string, i: number) => (
                <div key={i} className="p-3 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-start gap-2">
                    <DynamicIcon name={roadmapRewardIcons[i % roadmapRewardIcons.length]} className="w-4 h-4 text-[hsl(var(--gold))] mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.square-enix.com/ddff/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/DDFF_EN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <Link
                    href="https://www.reddit.com/r/DissidiaDuellumFF/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[hsl(var(--nav-theme-light))] transition-colors"
                  >
                    {t.footer.reddit}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/watch?v=dgTNtB9myss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[hsl(var(--nav-theme-light))] transition-colors"
                  >
                    {t.footer.youtube}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61580044209959"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[hsl(var(--nav-theme-light))] transition-colors"
                  >
                    {t.footer.instagram}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
