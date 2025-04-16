export default function Disclaimer({ locale }) {
    const message = locale === 'heb' ? 'סקירות אלה נכתבו על ידי הבינה' : 'These overviews were written by an AI';
    return (
        <div className={`text-gray-400 pt-4 pb-2 text-sm ${locale === 'en' ? 'font-["Geist"]' : 'frank-re'}`}>
            {message}
        </div>
    );
}
