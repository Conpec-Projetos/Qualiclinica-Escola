// Note that the metadata is shallowly merged, thus objects such as `openGraph` should be added
// separately at each page.

// em páginas individuais, importante configurar:
// ```
// export const metadata: Metadata = {
//   title: "TITLE",
//   description: "DESCRIPTION",
//   openGraph: {
//     title: "TITLE",
//     description: "DESCRIPTION",
//     url: "/page",
//     ...openGraph
//   }
// }
// ```

import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import type { Metadata } from 'next'
import opengraph_image from '@/app/opengraph-image.png';

const title = 'Quali Clínica Escola'
const description = 'Somos um centro de formação e treinamento para profissionais de saúde que desejam aprimorar seus conhecimentos na assistência aos pacientes crônicos, em especial aqueles que convivem com diabetes.'
const domain = 'www.qualiclinicaescola.com.br'

export const openGraph: OpenGraph = {
  title,
  description,
  type: 'website',
  locale: 'pt_BR',
  siteName: 'Quali Clínica Escola',
  images: [{ url: opengraph_image.src, width: 1200, height: 630 }],
}

export const defaultMetadata: Metadata = {
  title: {
    default: title,
    template: '%s | Quali Clínica Escola',
  },
  description,
  referrer: 'no-referrer-when-downgrade',
  metadataBase: new URL('https://' + domain),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph,
  twitter: { card: 'summary' },
}

export function getWebMetadata({ title, description, url }: { title?: string, description?: string, url?: string }): Metadata {
  return {
    // if undefined, don't set
    ...title && { title },
    ...description && { description },
    openGraph: {
      ...openGraph,
      ...title && { title },
      ...description && { description },
      ...url && { url },
    },
  }
}
