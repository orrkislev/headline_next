export function getCountryDatePageSteps(country, locale, date) {
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