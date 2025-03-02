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
import { PublicOutlined, InfoOutlined } from "@mui/icons-material";
import Link from "next/link";
import { TopBarButton } from "@/components/IconButtons";
import CustomTooltip from "@/components/CustomTooltip";

export default function Settings({ locale, date, setDate, country, font, setFont, view, setView, order, setOrder, sources, activeWebsites, setActiveWebsites }) {

    return (
        <div className="flex items-center divide-x divide-gray-200">
            <div className="pr-4">
                <DateSelector {...{ locale, date, setDate }} />
            </div>
            <div className="flex items-center px-4">
                <LabeledIcon
                    label="Home"
                    icon={
                        <Link href="/global">
                            <CustomTooltip title="to the global view" placement="bottom" arrow>
                                <TopBarButton>
                                    <PublicOutlined />
                                </TopBarButton>
                            </CustomTooltip>
                        </Link>
                    }
                />
                <LabeledIcon
                    label="About"
                    icon={
                        <Link href="/about">
                            <CustomTooltip title="About the Hear" placement="bottom" arrow>
                                <TopBarButton>
                                    <InfoOutlined />
                                </TopBarButton>
                            </CustomTooltip>
                        </Link>
                    }
                />
            </div>
            <div className="flex items-center px-4">
                <LabeledIcon label="Font" icon={<FontToggle {...{ country, font, setFont }} />} />
                <LabeledIcon label="View" icon={<ViewToggle {...{ view, setView }} />} />
            </div>
            <div className="flex items-center px-4">
                <LabeledIcon label="Language" icon={<LanguageToggle locale={locale} />} />
                <LabeledIcon label="Translate" icon={<TranslateToggle />} />
            </div>
            <div className="px-4">
                <LabeledIcon label="Order" icon={<OrderToggle {...{ locale, order, setOrder }} />} />
            </div>
            <div className="px-4">
                <LabeledIcon label="Sources" icon={<SourcesToggle {...{ country, locale, sources, order, activeWebsites, setActiveWebsites }} />} />
            </div>
        </div>
    );
}