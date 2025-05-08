export function getCountryPageSteps(country, locale) {
    return [
        {
            tour: 'welcome',
            steps: [
                {
                    icon: <>👋</>,
                    title: 'Welcome',
                    content: <>This is the first step</>,
                    selector: '#main',
                    side: 'top',
                },
            ],
        },
    ]
}