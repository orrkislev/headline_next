export default function RussianFonts() {
    return (
        <>
            <style>{`
                :root {
                    --font-oswald: 'Oswald', serif;
                    --font-roboto: 'Roboto', sans-serif;
                    --font-rubik: 'Rubik', sans-serif;
                }
            `}</style>
        </>
    );
}

export const Typography_Russian = [
    {
        fontFamily: '"Oswald", serif',
        fontSize: '2.3rem',
        lineHeight: 1.2,
        fontWeight: 400,
        direction: 'ltr',
    },
    {
        fontFamily: '"Roboto", sans-serif',
        fontSize: '2.4rem',
        lineHeight: 1.2,
        fontWeight: 400,
        direction: 'ltr',
    },
    {
        fontFamily: '"Rubik", sans-serif',
        fontSize: '2.2rem',
        lineHeight: 1.2,
        fontWeight: 600,
        fontStyle: 'italic',
        fontVariationSettings: '"wght" 600, "ital" 1',
        direction: 'ltr',
    },
    {
        fontFamily: '"Oswald", serif',
        fontSize: '2.3rem',
        lineHeight: 1.2,
        fontWeight: 700,
        fontVariationSettings: '"wght" 700',
        direction: 'ltr',
    }
]; 