export default function TranslatedLabel({ locale, active }) {
    if (!active) return null
    return (
        <div className={`absolute top-0 ${locale === 'heb' ? 'left-0' : 'right-0'} bg-white text-xs text-gray-400 px-1 py-0.5 rounded-bl-md`}>
            {locale === 'heb' ? 'מתורגם' : 'translated'}
        </div>
    );
}