export default function EnglishFonts() {
    return (
        <>
            {/* Preload local fonts */}
            <link rel="preload" href="/fonts/cheltenham-cond-normal-700.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
            <link rel="preload" href="/fonts/helvetica-bold.otf" as="font" type="font/otf" crossOrigin="anonymous" />
            
            <style>{`
				:root {
					--font-futura: 'futura-pt', sans-serif;
					--font-futura-italic: 'futura-pt', sans-serif;
					--font-futura-bold: 'futura-pt-bold', sans-serif;
					--font-helvetica: 'Helvetica-Bold', Arial, sans-serif;
                    --font-cheltenham: 'Cheltenham', serif;
					--font-plantin-condensed: 'plantin-condensed', sans-serif;
				}
                
                @font-face {
                    font-family: 'Cheltenham';
                    src: url('/fonts/cheltenham-cond-normal-700.ttf') format('truetype');
                    font-weight: 700;
                    font-style: normal;
                    font-display: block;
                }
                
                @font-face {
                    font-family: 'Helvetica-Bold';
                    src: url('/fonts/helvetica-bold.otf') format('opentype');
                    font-weight: 700;
                    font-style: normal;
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
        direction: 'ltr',
    },
    {
        fontFamily: 'var(--font-futura-italic)',
        fontSize: '2.1rem',
        lineHeight: 1.15,
        fontWeight: 400,
        fontStyle: 'italic',
        direction: 'ltr',
    },
    {
        fontFamily: 'var(--font-futura-bold)',
        fontSize: '2.3rem',
        lineHeight: 1.15,
        fontWeight: 700,
        direction: 'ltr',
    },
    {
        fontFamily: 'var(--font-plantin-condensed)',
        fontSize: '2.3rem',
        lineHeight: 1.1,
        fontWeight: 400,
        direction: 'ltr',
    },
    {
        fontFamily: 'var(--font-helvetica)',
        fontSize: '2.1rem',
        lineHeight: 1.2,
        fontWeight: 700,
        direction: 'ltr',
    },
    {
        fontFamily: 'var(--font-cheltenham)',
        fontSize: '2.8rem',
        lineHeight: 1.1,
        fontWeight: 700,
        direction: 'ltr',
    },
];
