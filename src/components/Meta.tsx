import { Helmet } from "react-helmet";

const Meta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Helmet>
    {/* Basic Meta Tags */}
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content="Ryan James" />
    <meta name="robots" content="index, follow" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="https://ryanjam.es/meta.jpg" />
    <meta property="og:url" content="https://ryanjam.es" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta
      name="twitter:image"
      content="https://ryanjam.es/meta.jpg"
    />
    <meta name="twitter:site" content="@ryanrjames" />

    {/* Favicon */}
    <link rel="icon" type="image/svg+xml" href="/favicon-light.svg" media="(prefers-color-scheme: light)" />
    <link rel="icon" type="image/svg+xml" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />

    {/* Canonical URL */}
    <link rel="canonical" content="https://ryanjam.es" />
  </Helmet>
);

export default Meta;
