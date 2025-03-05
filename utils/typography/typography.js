import { choose } from "../utils";
import HebrewFonts, { Typography_Hebrew } from "./HebrewFonts";
import EnglishFonts, { Typography_English } from "./EnglishFonts";

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
    israel: { options: Typography_Hebrew, component: HebrewFonts },
    default: { options: Typography_English, component: EnglishFonts },
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

export function getRandomTypography(language) {
    // Map language to country/region typography options
    const typographyMap = {
        'default': 'default',
        'english': 'default',
        'hebrew': 'israel',
        'arabic': 'arabic',
        // Add more mappings as needed
    };
    
    const country = typographyMap[language] || 'default';
    const options = countryTypographyOptions[country.toLowerCase()] || countryTypographyOptions['default'];
    
    // If options is an object with options property
    if (options.options) {
        return choose(options.options);
    }
    
    // Otherwise it's an array of options
    return choose(options);
}

export function getTypographyOptions(country) {
    // return countryTypographyOptions[country.toLowerCase()] || baseTypographyOptions;
    if (country === 'Israel') return countryTypographyOptions['israel'];
    else return countryTypographyOptions['default'];
}