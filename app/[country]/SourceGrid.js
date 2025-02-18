import SourceCard from "./Source/SourceCard";

export default function SourceGrid({ sources }) {

    return (
        <div className="grid grid-cols-3 gap-4 overflow-auto p-4">
            {Object.values(sources).map((source, i) => (
                <SourceCard 
                    key={i} 
                    index={i}
                    headlines={source}
                />
            ))}
        </div>
    );
}