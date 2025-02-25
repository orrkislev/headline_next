import { countries } from "@/utils/sources/countries";
import GlobalCard from "./Card/GlobalCard";

export default function GlobalGrid() {
    return (
        <div className={`overflow-y-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 2xl:grid-cols-4 gap-4 p-4`}>
            {Object.keys(countries).map((country, index) => (
                <GlobalCard key={country} country={country} index={index} />
            ))}
        </div>
    );
}