export default function IndiaFonts() {
    return (
        <>
            <style>{`
                :root {
                    --font-noto-devanagari: 'Noto Sans Devanagari', Arial, sans-serif;
                    --font-palanquin-dark: 'Palanquin Dark', Arial, sans-serif;
                }
            `}</style>
        </>
    );
}

export const Typography_India = [
    {
        fontFamily: '"Noto Sans Devanagari", Arial, sans-serif',
        fontSize: '2.2rem',
        lineHeight: 1.15,
        fontWeight: 400,
        direction: 'ltr',
    },
    {
        fontFamily: '"Palanquin Dark", Arial, sans-serif',
        fontSize: '2.2rem',
        lineHeight: 1,
        fontWeight: 400,
        direction: 'ltr',
    }
]; 