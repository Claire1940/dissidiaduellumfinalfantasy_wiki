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
  const path = '/copyright'

  return {
    title: 'Copyright Notice - Dissidia Duellum Final Fantasy Wiki',
    description: 'Copyright and attribution notice for Dissidia Duellum Final Fantasy Wiki.',
    keywords: ['copyright', 'attribution', 'DMCA', 'Dissidia Duellum Final Fantasy Wiki'],
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Dissidia Duellum Final Fantasy Wiki',
      title: 'Copyright Notice - Dissidia Duellum Final Fantasy Wiki',
      description: 'Copyright and attribution policy for this fan wiki.',
      images: [{ url: `${siteUrl}/images/hero.webp`, width: 1200, height: 630, alt: 'Dissidia Duellum Final Fantasy Wiki' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Copyright Notice - Dissidia Duellum Final Fantasy Wiki',
      description: 'Copyright and attribution policy for this fan wiki.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function CopyrightNotice() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Copyright Notice</h1>
          <p className="text-slate-300 text-lg mb-2">Ownership, fair use, and takedown process</p>
          <p className="text-slate-400 text-sm">Last Updated: March 24, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl prose prose-invert prose-slate">
          <h2>1. Ownership</h2>
          <p>
            Dissidia Duellum Final Fantasy Wiki content is either original community content or referenced
            material used for commentary and guide purposes.
          </p>

          <h2>2. Third-Party Rights</h2>
          <p>
            Dissidia, Final Fantasy, and related assets are trademarks and intellectual property of
            Square Enix and their respective rights holders.
          </p>

          <h2>3. Fair Use</h2>
          <p>
            We use limited game-related references for informational and educational purposes in a
            non-official fan context.
          </p>

          <h2>4. Takedown Requests</h2>
          <p>
            If you are a rights holder and believe content should be removed, please send a detailed request to:
            {' '}
            <a href="mailto:dmca@dissidiaduellumfinalfantasy.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
              dmca@dissidiaduellumfinalfantasy.wiki
            </a>
          </p>

          <h2>5. Attribution</h2>
          <p>
            When reusing our original text, provide attribution to Dissidia Duellum Final Fantasy Wiki and include
            a link to the source page.
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
