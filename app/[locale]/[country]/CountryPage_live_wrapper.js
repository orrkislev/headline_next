'use client'

import dynamic from "next/dynamic";

// Dynamically import the live component with client-side only rendering
const CountryPageLive = dynamic(() => import('./CountryPage_live'), { 
    ssr: false,
    loading: () => null // Don't show a loading state since we already have static content
});

export default function CountryPageLiveWrapper(props){
    return <CountryPageLive {...props} />
}