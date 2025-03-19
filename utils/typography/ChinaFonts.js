export default function ChinaFonts() {
    return (
        <>
            <style>{`
                :root {
                    --font-noto-sc: 'Noto Sans SC', Arial, sans-serif;
                    --font-zcool-qingke: 'ZCOOL QingKe HuangYou', Arial, sans-serif;
                    --font-zcool-kuaile: 'ZCOOL KuaiLe', serif;
                }
            `}</style>
        </>
    );
}

export const Typography_China = [
    {
        fontFamily: '"Noto Sans SC", Arial, sans-serif',
        fontSize: '2.2rem',
        lineHeight: 1.15,
        fontWeight: 400,
    },
    {
        fontFamily: '"ZCOOL QingKe HuangYou", Arial, sans-serif',
        fontSize: '2.4rem',
        lineHeight: 1,
        fontWeight: 400,
    },
    {
        fontFamily: '"ZCOOL KuaiLe", serif',
        fontSize: '2.2rem',
        lineHeight: 1.1,
        fontWeight: 400,
    }
]; 