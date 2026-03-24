import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dissidiaduellumfinalfantasy.wiki'
  const path = '/about'

  return {
    title: 'About Dissidia Duellum Final Fantasy Wiki',
    description: 'About the mission and scope of Dissidia Duellum Final Fantasy Wiki.',
    keywords: ['about', 'Dissidia Duellum Final Fantasy Wiki', 'fan wiki', 'guides'],
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Dissidia Duellum Final Fantasy Wiki',
      title: 'About Dissidia Duellum Final Fantasy Wiki',
      description: 'Our mission, scope, and disclaimer.',
      images: [{ url: `${siteUrl}/images/hero.webp`, width: 1200, height: 630, alt: 'Dissidia Duellum Final Fantasy Wiki' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Dissidia Duellum Final Fantasy Wiki',
      description: 'Our mission, scope, and disclaimer.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About</h1>
          <p className="text-slate-300 text-lg">Dissidia Duellum Final Fantasy Wiki</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl prose prose-invert prose-slate">
          <h2>Who We Are</h2>
          <p>
            We are a fan community building practical guides and references for Dissidia Duellum Final Fantasy.
            Our goal is to help players learn faster and find reliable information in one place.
          </p>

          <h2>What We Cover</h2>
          <ul>
            <li>Characters, roles, abilities, and team-building basics</li>
            <li>Boss mechanics, progression tips, and beginner workflows</li>
            <li>Links to official channels, trailers, and update sources</li>
          </ul>

          <h2>Editorial Approach</h2>
          <p>
            We prioritize official references and clearly separate verified facts from community interpretation.
            Content is updated as the live game evolves.
          </p>

          <h2>Disclaimer</h2>
          <p>
            This is an unofficial fan-made website. It is not affiliated with or endorsed by Square Enix.
            All game names, trademarks, and media belong to their respective owners.
          </p>

          <h2>Contact</h2>
          <p>
            General inquiries:
            {' '}
            <a href="mailto:contact@dissidiaduellumfinalfantasy.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
              contact@dissidiaduellumfinalfantasy.wiki
            </a>
          </p>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">← Back to Home</Link>
        </div>
      </section>
    </div>
  )
}
