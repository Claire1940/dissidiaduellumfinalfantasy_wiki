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
  const path = '/privacy-policy'

  return {
    title: 'Privacy Policy - Dissidia Duellum Final Fantasy Wiki',
    description: 'Privacy Policy for Dissidia Duellum Final Fantasy Wiki. Learn what data we collect and how we use it.',
    keywords: [
      'privacy policy',
      'Dissidia Duellum Final Fantasy Wiki privacy',
      'data protection',
      'analytics',
      'cookies',
    ],
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Dissidia Duellum Final Fantasy Wiki',
      title: 'Privacy Policy - Dissidia Duellum Final Fantasy Wiki',
      description: 'How we handle data and privacy on this fan-made wiki.',
      images: [{ url: `${siteUrl}/images/hero.webp`, width: 1200, height: 630, alt: 'Dissidia Duellum Final Fantasy Wiki' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Privacy Policy - Dissidia Duellum Final Fantasy Wiki',
      description: 'How we handle data and privacy on this fan-made wiki.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-300 text-lg mb-2">How we collect, use, and protect information</p>
          <p className="text-slate-400 text-sm">Last Updated: March 24, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl prose prose-invert prose-slate">
          <h2>1. Scope</h2>
          <p>
            Dissidia Duellum Final Fantasy Wiki is an unofficial fan-made informational website.
            This policy explains how we process data when you browse this site.
          </p>

          <h2>2. Data We Collect</h2>
          <ul>
            <li>Basic analytics data such as pages visited, browser, and approximate location.</li>
            <li>Technical logs used for performance, uptime, and security diagnostics.</li>
            <li>Language or theme preferences saved locally in your browser.</li>
          </ul>

          <h2>3. How We Use Data</h2>
          <ul>
            <li>Operate and improve site performance and content quality.</li>
            <li>Measure popular pages and improve navigation.</li>
            <li>Detect abuse, bots, and technical incidents.</li>
          </ul>

          <h2>4. Cookies and Analytics</h2>
          <p>
            We may use cookies and analytics tools to understand aggregate traffic patterns.
            You can disable cookies in your browser settings.
          </p>

          <h2>5. Third-Party Links</h2>
          <p>
            Pages may link to external sites such as Square Enix, App Store, Google Play, X, Reddit,
            or YouTube. Their privacy policies apply on their own domains.
          </p>

          <h2>6. Children&apos;s Privacy</h2>
          <p>
            This site is intended for a general audience and does not knowingly collect personal data
            from children under 13.
          </p>

          <h2>7. Contact</h2>
          <p>
            For privacy questions, contact:
            {' '}
            <a href="mailto:privacy@dissidiaduellumfinalfantasy.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
              privacy@dissidiaduellumfinalfantasy.wiki
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
