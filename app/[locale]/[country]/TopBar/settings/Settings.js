import LabeledIcon from "@/components/LabeledIcon";
import FontToggle from "./FontToggle";
import ViewToggle from "./ViewToggle";
import LanguageToggle from "./LanguageToggle";
import TranslateToggle from "./TranslateToggle";
import OrderToggle from "./OrderToggle";
import SourcesToggle from "./SourcesToggle";
import { DateSelector } from "./DateSelector";
import PopUpCleaner from "@/components/PopUp";
import { PublicOutlined, InfoOutlined } from "@mui/icons-material";
import Link from "next/link";
import { TopBarButton } from "@/components/IconButtons";
import CustomTooltip from "@/components/CustomTooltip";

export default function Settings({ locale, country, sources }) {

    return (
        <div className={`flex items-center divide-x divide-gray-200 ${locale == 'heb' ? 'divide-x-reverse' : ''}`}>
            <div className="">
                <DateSelector {...{ locale }} />
            </div>
            <div className="flex items-center">
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
            <div className="flex items-center">
                <LabeledIcon label="Language" icon={<LanguageToggle locale={locale} />} />
                {/* <LabeledIcon label="View" icon={<ViewToggle />} /> */}
            </div>
            <div className="flex items-center">
                <LabeledIcon label="Font" icon={<FontToggle country={country}/>} />
                <LabeledIcon label="Translate" icon={<TranslateToggle {...{ locale, country }}  />} />
            </div>
            <div className="flex items-center">
                <LabeledIcon label="Order" icon={<OrderToggle locale={locale} />} />
                <LabeledIcon label="Sources" icon={<SourcesToggle {...{ country, locale, sources }} />} />
            </div>
        </div>
    );
}