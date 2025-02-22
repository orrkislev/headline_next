import { choose } from "./utils";

const baseTypographyOptions = [
    {
        fontFamily: 'var(--font-futura), sans-serif',
        fontSize: '2.5rem',
        lineHeight: 1.15,
        fontWeight: 500,
    },
    {
        fontFamily: 'var(--font-futura), sans-serif',
        fontSize: '2.3rem',
        lineHeight: 1.15,
        fontWeight: 700,
        fontStyle: 'italic',
    },
    {
        fontFamily: 'var(--futura-italic), sans-serif',
        fontSize: '2.1rem',
        lineHeight: 1.15,
        fontWeight: 700,
    },
    {
        fontFamily: '"plantin-condensed", sans-serif',
        fontSize: '2.3rem',
        lineHeight: 1.1,
        fontWeight: 700,
    },
    {
        fontFamily: 'var(--font-helvetica), Arial, sans-serif',
        fontSize: '2.1rem',
        lineHeight: 1.2,
        fontWeight: 400,
    },
    {
        fontFamily: 'var(--font-cheltenham), serif',
        fontSize: '2.8rem',
        lineHeight: 1.1,
        fontWeight: 400,
    },
];

const arabicTypographyOptions = [
    {
        fontFamily: 'var(--font-lalezar)',
        fontSize: "2.3rem",
        lineHeight: 1.2,
        fontWeight: 400,
        direction: 'rtl',
    },
    {
        fontFamily: 'var(--font-amiri)',
        fontSize: "2.3rem",
        lineHeight: 1.2,
        fontWeight: 400,
        direction: 'rtl',
    },
    {
        fontFamily: 'var(--font-alexandria)', // assuming corresponding variable is defined
        fontSize: "2.3rem",
        fontWeight: 400,
        direction: 'rtl',
    },
];

const russianTypographyOptions = [
    {
        fontFamily: 'var(--font-oswald)',
        fontSize: "2.3rem",
        fontWeight: 400,
    },
    {
        fontFamily: 'var(--font-roboto)',
        fontSize: "2.4rem",
        lineHeight: 1.2,
        fontWeight: 400,
    },
    {
        fontFamily: 'var(--font-rubik)',
        fontSize: "2.2rem",
        lineHeight: 1.2,
        fontWeight: 600,
        fontStyle: 'italic',
        fontVariationSettings: '"wght" 600, "ital" 1',
    },
    {
        fontFamily: 'var(--font-oswald)',
        fontSize: "2.3rem",
        fontWeight: 700,
        fontVariationSettings: '"wght" 700',
    },
];

export const countryTypographyOptions = {
    israel: [
        {
            fontFamily: 'var(--font-tel-aviv)',
            fontSize: '2.1rem',
            lineHeight: 1.15,
            fontWeight: 400,
            direction: 'rtl',
        },
        {
            fontFamily: 'var(--font-frank-re-tzar)',
            fontSize: '3.6rem',
            lineHeight: 1,
            fontWeight: 400,
            direction: 'rtl',
        },
        // {
        //     fontFamily: 'var(--font-frank-re)',
        //     fontSize: "2.4rem",
        //     lineHeight: 1.1,
        //     fontWeight: 400,
        // },
        {
            fontFamily: 'var(--font-mandatory)',
            fontSize: "2.3rem",
            lineHeight: 1.2,
            fontWeight: 400,
            direction: 'rtl',
        },
        {
            fontFamily: 'var(--font-mandatory29)',
            fontSize: "2.8rem",
            lineHeight: 1.2,
            fontWeight: 400,
            direction: 'rtl',
        },
    ],
    lebanon: arabicTypographyOptions,
    iran: arabicTypographyOptions,
    palestine: arabicTypographyOptions,
    uae: arabicTypographyOptions,
    'united-arab-emirates': arabicTypographyOptions,
    japan: [
        {
            fontFamily: 'var(--font-rocknroll-one)',
            fontSize: "2.2rem",
            lineHeight: 1.15,
            fontWeight: 400,
        },
        {
            fontFamily: 'var(--font-sawarabi-gothic)',
            fontSize: "2.2rem",
            lineHeight: 1,
            fontWeight: 400,
        },
        {
            fontFamily: 'var(--font-potta-one)',
            fontSize: "2.2rem",
            lineHeight: 1.1,
            fontWeight: 400,
        },
        {
            fontFamily: 'var(--font-kiwi-maru)',
            fontSize: "2.2rem",
            lineHeight: 1.2,
            fontWeight: 400,
        },
        {
            fontFamily: 'var(--font-dela-gothic-one)',
            fontSize: "2.2rem",
            lineHeight: 1.2,
            fontWeight: 400,
        },
        {
            fontFamily: 'var(--font-noto-sans-jp)',
            fontSize: "2.2rem",
            lineHeight: 1.2,
            fontWeight: 400,
        },
    ],
    china: [
        {
            fontFamily: 'var(--font-noto-sans-sc)',
            fontSize: "2.2rem",
            lineHeight: 1.15,
            fontWeight: 400,
        },
        {
            fontFamily: 'var(--font-zcool-qingke-huangyou)',
            fontSize: "2.4rem",
            lineHeight: 1,
            fontWeight: 400,
        },
        {
            fontFamily: 'var(--font-zcool-kuai-le)',
            fontSize: "2.2rem",
            lineHeight: 1.1,
            fontWeight: 400,
        },
    ],
    india: [
        {
            fontFamily: 'var(--font-noto-sans-devanagari)',
            fontSize: "2.2rem",
            lineHeight: 1.15,
            fontWeight: 400,
        },
        {
            fontFamily: 'var(--font-palanquin-dark)',
            fontSize: "2.2rem",
            lineHeight: 1,
            fontWeight: 400,
        },
    ],
    russia: russianTypographyOptions,
    ukraine: russianTypographyOptions,
};

export function getRandomTypography(country) {
    const options = countryTypographyOptions[country.toLowerCase()] || baseTypographyOptions;
    return choose(options);
}

export function getTypographyOptions(country) {
    return countryTypographyOptions[country.toLowerCase()] || baseTypographyOptions;
}