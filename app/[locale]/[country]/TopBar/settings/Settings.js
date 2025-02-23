import LabeledIcon from "@/components/LabeledIcon";
import FontToggle from "./FontToggle";
import ViewToggle from "./ViewToggle";
import LanguageToggle from "./LanguageToggle";
import TranslateToggle from "./TranslateToggle";
import OrderToggle from "./OrderToggle";
import SourcesToggle from "./SourcesToggle";
import { DateSelector } from "./DateSelector";
import { useParams } from "next/navigation";
import PopUpCleaner from "@/components/PopUp";

export default function Settings({ open, close }) {
    const { locale } = useParams()
    return (
        <>
            <PopUpCleaner open={open} close={close} />
            <div className={`absolute ${open ? 'block' : 'hidden'} p-4 flex items-center divide-x divide-gray-200 bg-white rounded shadow z-[1000] top-[2em] ${locale === 'heb' ? 'left-0' : 'right-0'}`}>
                <DateSelector />
                <div className="flex flex-row">
                    <LabeledIcon label="Font" icon={<FontToggle />} />
                    <LabeledIcon label="View" icon={<ViewToggle />} />
                </div>
                <div className="flex flex-row">
                    <LabeledIcon label="Language" icon={<LanguageToggle />} />
                    <LabeledIcon label="Translate" icon={<TranslateToggle />} />
                </div>
                <LabeledIcon label="Order" icon={<OrderToggle />} />
                <LabeledIcon label="Sources" icon={<SourcesToggle />} />
            </div>
        </>
    )
}