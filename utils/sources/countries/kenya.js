const kenyaData = {
    "sources": {
      "capitalfm": {
        "name": "Capital FM",
        "description": "A major privately owned radio station with a strong online presence. Known for centrist, business-friendly coverage and widely followed breaking news updates.",
        "translations": { "en": "Capital FM", "he": "קָפִּיטַל אֶף־אֶם" }
      },
      "citizen": {
        "name": "Citizen TV",
        "description": "Kenya's most-watched TV station and one of the country's largest newsrooms. Broad centrist tone with high national reach across all demographics.",
        "translations": { "en": "Citizen", "he": "סִיטִיזֶן" }
      },
      "dailynation": {
        "name": "Daily Nation",
        "description": "Kenya's largest and most influential newspaper. Considered reputable and generally centrist with slightly reformist leanings; strong investigative tradition.",
        "translations": { "en": "Daily Nation", "he": "דֵּיילִי נֵיישֶׁן" }
      },
      "eastleighvoice": {
        "name": "Eastleigh Voice",
        "description": "A community-focused digital outlet serving Nairobi's Eastleigh district. Known for localized reporting, civic issues, and youth-oriented content.",
        "translations": { "en": "Eastleigh Voice", "he": "אִיסְטְלֵי וווֹיס" }
      },
      "kenyanpost": {
        "name": "Kenyan Post",
        "description": "A popular online tabloid known for sensational political headlines and fast updates. Large readership but low editorial reliability.",
        "translations": { "en": "Kenyan Post", "he": "קֶניָין פּוֹסְט" }
      },
      "kenyans": {
        "name": "Kenyans.co.ke",
        "description": "One of the biggest digital-native outlets in Kenya. Wide reach, fast-breaking news, and explanatory pieces; generally centrist and accessible.",
        "translations": { "en": "Kenyans", "he": "קֶניָאנְס" }
      },
      "nairobileo": {
        "name": "Nairobi Leo",
        "description": "A fast-growing online news site with strong social-media traction. Youth-oriented; slightly progressive in tone.",
        "translations": { "en": "Nairobi Leo", "he": "נַיְרוֹבִּי לֵאוֹ" }
      },
      "peopledaily": {
        "name": "People Daily",
        "description": "A free national daily newspaper with broad reach. Mainstream reporting with slight pro-government leanings.",
        "translations": { "en": "People Daily", "he": "פִּיפּוֹל דֵּיילִי" }
      },
      "standardmedia": {
        "name": "The Standard",
        "description": "Kenya's oldest newspaper and a major national daily. Centrist to slightly conservative; high reputation and strong investigative work.",
        "translations": { "en": "The Standard", "he": "סְטַנְדַרְד" }
      },
      "tnxafrica": {
        "name": "TNX Africa",
        "description": "A digital news platform focusing on national headlines, politics, and youth-focused social issues. Progressive-leaning.",
        "translations": { "en": "TNX Africa", "he": "טִי־אֶן־אֶקְס אַפְרִיקָה" }
      },
      "tv47digital": {
        "name": "TV47 Digital",
        "description": "A rising national broadcaster targeting younger audiences. Mix of neutral reporting and opinionated talk shows.",
        "translations": { "en": "TV47 Digital", "he": "טִי־וִי 47" }
      },
      "taifaleo": {
        "name": "Taifa Leo",
        "description": "Kenya's major Swahili-language daily. Traditional, socially conservative tone; strong print heritage.",
        "translations": { "en": "Taifa Leo", "he": "טַאיְפָה לֵאוֹ" }
      },
      "thekenyatimes": {
        "name": "The Kenya Times",
        "description": "A legacy name revived as a digital outlet. Coverage is conventional and slightly conservative, with a focus on political news.",
        "translations": { "en": "The Kenya Times", "he": "קֶניָה טַיימְס" }
      },
      "thestar": {
        "name": "The Star",
        "description": "A widely read daily with strong political reporting. Known for independent, outspoken coverage; reformist and popular among urban readers.",
        "translations": { "en": "The Star", "he": "דְה סְטַאר" }
      },
      "tuko": {
        "name": "Tuko",
        "description": "Kenya's largest digital news platform with massive social reach. Entertainment, human-interest, and social-issue coverage; progressive and youth-driven editorial tone.",
        "translations": { "en": "Tuko", "he": "טוּקוֹ" }
      },
      "ynewsdigital": {
        "name": "Y News Digital",
        "description": "A youth-targeted digital outlet with strong social media presence. Progressive and activism-adjacent tone.",
        "translations": { "en": "Y News Digital", "he": "וַואי נְיוּז דִּיגִ'יטַל" }
      }
    },
  
    "orders": {
      "largest": [
        "citizen",
        "dailynation",
        "tuko",
        "standardmedia",
        "kenyans",
        "tv47digital",
        "peopledaily",
        "thestar",
        "capitalfm",
        "nairobileo",
        "tnxafrica",
        "taifaleo",
        "kenyanpost",
        "ynewsdigital",
        "eastleighvoice",
        "thekenyatimes"
      ],
  
      "mostReputable": [
        "dailynation",
        "standardmedia",
        "citizen",
        "thestar",
        "peopledaily",
        "taifaleo",
        "capitalfm",
        "kenyans",
        "tv47digital",
        "nairobileo",
        "tnxafrica",
        "tuko",
        "ynewsdigital",
        "eastleighvoice",
        "thekenyatimes",
        "kenyanpost"
      ],
  
      "progressiveToConservative": [
        "tuko",
        "ynewsdigital",
        "tnxafrica",
        "nairobileo",
        "eastleighvoice",
        "thestar",
        "kenyans",
        "citizen",
        "dailynation",
        "tv47digital",
        "capitalfm",
        "peopledaily",
        "standardmedia",
        "thekenyatimes",
        "taifaleo",
        "kenyanpost"
      ],
  
      "conservativeToProgressive": [
        "kenyanpost",
        "taifaleo",
        "thekenyatimes",
        "standardmedia",
        "peopledaily",
        "capitalfm",
        "tv47digital",
        "dailynation",
        "citizen",
        "kenyans",
        "thestar",
        "eastleighvoice",
        "nairobileo",
        "tnxafrica",
        "ynewsdigital",
        "tuko"
      ],
  
      "default": [
        "dailynation",
        "citizen",
        "standardmedia",
        "tuko",
        "kenyans",
        "thestar",
        "tv47digital",
        "taifaleo",
        "peopledaily",
        "ynewsdigital",
        "nairobileo",
        "tnxafrica",
        "capitalfm",
        "eastleighvoice",
        "thekenyatimes",
        "kenyanpost"
      ]
    }
};

export default kenyaData;