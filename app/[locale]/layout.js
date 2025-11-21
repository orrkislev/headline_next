export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const lang = locale === 'heb' ? 'he' : 'en';

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
