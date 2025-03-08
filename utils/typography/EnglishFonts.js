export default function EnglishFonts() {
    return (
        <>
            <link rel="preload" href="/fonts/futura-heavy.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
            <link rel="preload" href="/fonts/futura-bold-italic.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
            <link rel="preload" href="/fonts/helvetica-bold.otf" as="font" type="font/otf" crossOrigin="anonymous" />
            <link rel="preload" href="/fonts/plantin-condensed.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
            <link rel="preload" href="/fonts/CheltenhamStdBook.otf" as="font" type="font/otf" crossOrigin="anonymous" />
            <style>{`
				:root {
					--font-futura: 'FuturaHeavy';
					--font-futura-italic: 'FuturaBoldItalic';
					--font-helvetica: 'HelveticaBold';
                    --font-cheltenham: 'CheltenhamStdBook';
					--font-plantin-condensed: 'PlantinCondensed';
				}
				@font-face {
					font-family: 'FuturaHeavy';
					src: url('/fonts/futura-heavy.ttf') format('truetype');
					font-display: block;
				}
				@font-face {
					font-family: 'FuturaBoldItalic';
					src: url('/fonts/futura-bold-italic.ttf') format('truetype');
					font-display: block;
				}
				@font-face {
					font-family: 'HelveticaBold';
					src: url('/fonts/helvetica-bold.otf') format('opentype');
					font-display: block;
				}
				@font-face {
                    font-family: 'CheltenhamStdBook';
                    src: url('/fonts/CheltenhamStdBook.otf') format('opentype');
                    font-display: block;
                }
				@font-face {
					font-family: 'PlantinCondensed';
					src: url('/fonts/plantin-condensed.ttf') format('truetype');
					font-display: block;
				}
			`}</style>
        </>
    );
}

export const Typography_English = [
    {
        fontFamily: 'var(--font-futura)',
        fontSize: '2.5rem',
        lineHeight: 1.15,
        fontWeight: 500,
    },
    {
        fontFamily: 'var(--font-futura-italic)',
        fontSize: '2.1rem',
        lineHeight: 1.15,
        fontWeight: 700,
    },
    {
        fontFamily: 'var(--font-plantin-condensed)',
        fontSize: '2.3rem',
        lineHeight: 1.1,
        fontWeight: 700,
    },
    {
        fontFamily: 'var(--font-helvetica)',
        fontSize: '2.1rem',
        lineHeight: 1.2,
        fontWeight: 400,
    },
    {
        fontFamily: 'var(--font-cheltenham)',
        fontSize: '2.8rem',
        lineHeight: 1.1,
        fontWeight: 400,
    },
];
