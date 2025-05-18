import type { MetadataRoute } from "next";

const domain = "www.qualiclinicaescola.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    // páginas estáticas
    {
      url: `https://${domain}`,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://${domain}/a-qualiclinica/`,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `https://${domain}/cursos/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `https://${domain}/contate-nos/`,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `https://${domain}/profissionais/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return pages;
}
