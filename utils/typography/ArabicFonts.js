export default function ArabicFonts() {
    return (
        <>
            <style>{`
                :root {
                    --font-lalezar: 'Lalezar', sans-serif;
                    --font-amiri: 'Amiri', serif;
                    --font-alexandria: 'Alexandria', serif;
                }
            `}</style>
        </>
    );
}

export const Typography_Arabic = [
    {
        fontFamily: '"Lalezar", sans-serif',
        fontSize: '2.3rem',
        lineHeight: 1.2,
        fontWeight: 400,
        direction: 'rtl',
    },
    {
        fontFamily: '"Amiri", serif',
        fontSize: '2.3rem',
        lineHeight: 1.2,
        fontWeight: 400,
        direction: 'rtl',
    },
    {
        fontFamily: '"Alexandria", serif',
        fontSize: '2.3rem',
        fontWeight: 400,
        direction: 'rtl',
    }
]; 