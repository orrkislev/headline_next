export default function Disclaimer({ locale }) {
    const message = locale === 'heb' ? 'סקירות אלו נכתבו על ידי הבינה' : 'These overviews were written by an AI';
    return (
        <div className={`text-gray-400 pt-4 pb-2 text-[0.9rem] ${locale === 'en' ? 'font-roboto' : 'frank-re'}`}>
            {message}
        </div>
    );
}
