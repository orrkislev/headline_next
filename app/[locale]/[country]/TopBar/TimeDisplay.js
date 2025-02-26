export default function TimeDisplay({ date, locale }) {
    const isPresent = Math.abs(new Date() - date) < 300000; // 5 minutes = 60 * 5 * 1000 = 300000

    const hours = date.getHours()
    const minutes = date.getMinutes()

    const paddingClass = locale === 'heb' ? 'pr-3' : 'pl-3';
    const blinkClass = isPresent ? 'timer-blink' : '';

    return (
        <div className={`h-full flex items-center justify-center font-mono text-base direction-ltr ${paddingClass}`}>
            <span>{hours.toString().padStart(2, '0')}</span>
            <span className={blinkClass}>:</span>
            <span>{minutes.toString().padStart(2, '0')}</span>
        </div>
    )
}