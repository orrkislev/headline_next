import { countries } from "@/utils/sources/countries";
import GlobalCard from "./Card/GlobalCard";

export default function GlobalGrid({ locale }) {
    return (
        <div className="custom-scrollbar overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 p-4">
            {Object.keys(countries).map((country, index) => (
                <GlobalCard key={country} {...{country, index, locale}} />
            ))}
        </div>
    );
}