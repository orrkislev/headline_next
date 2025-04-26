import { countries } from "@/utils/sources/countries"
import { createDateString } from "./[locale]/[country]/TopBar/settings/DateSelector"

export default function sitemap() {
    const res = []

    const locales = ['en', 'heb']

    Object.keys(countries).forEach(country => {
        locales.forEach(locale => {

            const days = 14;
            for (let i = 0; i < days; i++) {
                const date = new Da 
                date.setDate(date.getDate() - i);
                const dateString = createDateString(date);

                // priority should be 1 for today, linear decrease for the next 13 days
                const priority = 1 - (i / days);

                res.push({
                    url: `/${locale}/${country}/${dateString}`,
                    lastModified: new Date(),
                    changeFrequency: 'never',
                    priority
                });
            }
        })
    })

    return res;
}