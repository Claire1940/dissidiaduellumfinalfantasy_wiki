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
  const path = '/terms-of-service'

  return {
    title: 'Terms of Service - Dissidia Duellum Final Fantasy Wiki',
    description: 'Terms of Service for using Dissidia Duellum Final Fantasy Wiki.',
    keywords: ['terms of service', 'user agreement', 'Dissidia Duellum Final Fantasy Wiki terms'],
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Dissidia Duellum Final Fantasy Wiki',
      title: 'Terms of Service - Dissidia Duellum Final Fantasy Wiki',
      description: 'Rules and conditions for using this fan-made wiki.',
      images: [{ url: `${siteUrl}/images/hero.webp`, width: 1200, height: 630, alt: 'Dissidia Duellum Final Fantasy Wiki' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Terms of Service - Dissidia Duellum Final Fantasy Wiki',
      description: 'Rules and conditions for using this fan-made wiki.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300 text-lg mb-2">Terms and conditions for website usage</p>
          <p className="text-slate-400 text-sm">Last Updated: March 24, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl prose prose-invert prose-slate">
          <h2>1. Acceptance</h2>
          <p>By using this site, you agree to these terms and all applicable laws.</p>

          <h2>2. Service Description</h2>
          <p>
            Dissidia Duellum Final Fantasy Wiki is a fan-made informational resource with guides,
            references, and external links related to the game.
          </p>

          <h2>3. Acceptable Use</h2>
          <ul>
            <li>Do not abuse, attack, or attempt unauthorized access to the site.</li>
            <li>Do not automate scraping at disruptive volume.</li>
            <li>Do not repost our original content without attribution.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            Game trademarks, logos, and assets belong to their respective owners, including Square Enix.
            This site is not affiliated with or endorsed by Square Enix.
          </p>

          <h2>5. No Warranty</h2>
          <p>
            Content is provided "as is" for informational purposes. We do not guarantee completeness,
            accuracy, or uninterrupted availability.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for damages arising from use of the site.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions about these terms:
            {' '}
            <a href="mailto:legal@dissidiaduellumfinalfantasy.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
              legal@dissidiaduellumfinalfantasy.wiki
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
