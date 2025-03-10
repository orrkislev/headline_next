const sourceOrders = {
  "germany": {
    "largest": ["bild", "spiegel", "sueddeutsche_zeitung", "faz", "welt", "merkur_de", "zeit", "tagesspiegel", "berliner_zeitung", "rheinische_post", "westdeutsche_allgemeine_zeitung", "frankfurter_rundschau", "stuttgarter_zeitung", "taz", "junge_freiheit", "neues_deutschland"],
    "mostReputable": ["sueddeutsche_zeitung", "faz", "zeit", "spiegel", "welt", "tagesspiegel", "rheinische_post", "frankfurter_rundschau", "berliner_zeitung", "stuttgarter_zeitung", "westdeutsche_allgemeine_zeitung", "taz", "merkur_de", "bild", "neues_deutschland", "junge_freiheit"],
    "progressiveToConservative": ["taz", "neues_deutschland", "frankfurter_rundschau", "berliner_zeitung", "spiegel", "sueddeutsche_zeitung", "zeit", "tagesspiegel", "westdeutsche_allgemeine_zeitung", "rheinische_post", "stuttgarter_zeitung", "merkur_de", "welt", "faz", "bild", "junge_freiheit"],
    "conservativeToProgressive": ["junge_freiheit", "bild", "faz", "welt", "merkur_de", "stuttgarter_zeitung", "rheinische_post", "westdeutsche_allgemeine_zeitung", "tagesspiegel", "zeit", "sueddeutsche_zeitung", "spiegel", "berliner_zeitung", "frankfurter_rundschau", "neues_deutschland", "taz"],
    "default": ["spiegel", "sueddeutsche_zeitung", "faz", "bild", "zeit", "welt", "tagesspiegel", "frankfurter_rundschau", "berliner_zeitung", "rheinische_post", "westdeutsche_allgemeine_zeitung", "merkur_de", "stuttgarter_zeitung", "taz", "neues_deutschland", "junge_freiheit"]
  },

  "france": {
    "largest": ["bfmtv", "lemonde", "francetvinfo", "lefigaro", "leparisien", "20minutes", "lepoint", "lexpress", "liberation", "lesechos", "nouvelobs", "mediapart", "valeursactuelles", "humanite", "bvoltaire"],
    "mostReputable": ["lemonde", "lefigaro", "liberation", "lesechos", "lepoint", "lexpress", "mediapart", "francetvinfo", "leparisien", "20minutes", "nouvelobs", "bfmtv", "humanite", "bvoltaire", "valeursactuelles"],
    "progressiveToConservative": ["humanite", "mediapart", "liberation", "nouvelobs", "lemonde", "francetvinfo", "20minutes", "leparisien", "bfmtv", "lexpress", "lepoint", "lesechos", "lefigaro", "bvoltaire", "valeursactuelles"],
    "conservativeToProgressive": ["valeursactuelles", "bvoltaire", "lefigaro", "lesechos", "lepoint", "lexpress", "bfmtv", "leparisien", "20minutes", "francetvinfo", "lemonde", "nouvelobs", "liberation", "mediapart", "humanite"],
    "default": ["lemonde", "lefigaro", "bfmtv", "francetvinfo", "liberation", "lesechos", "lepoint", "leparisien", "lexpress", "mediapart", "20minutes", "nouvelobs", "valeursactuelles", "humanite", "bvoltaire"]
  },

  "poland": {
    "largest": ["wp", "onet", "interia", "tvn24", "wyborcza", "fakt", "radiozet", "se", "polsatnews", "wprost", "rp", "wpolityce", "niezalezna", "dorzeczy", "polityka", "gazetaprawna", "okopress", "polityka300"],
    "mostReputable": ["wyborcza", "rp", "polityka", "tvn24", "onet", "gazetaprawna", "polityka300", "okopress", "wp", "interia", "polsatnews", "radiozet", "wprost", "dorzeczy", "niezalezna", "wpolityce", "fakt", "se"],
    "progressiveToConservative": ["okopress", "wyborcza", "polityka", "tvn24", "onet", "wp", "interia", "radiozet", "fakt", "se", "gazetaprawna", "polityka300", "rp", "polsatnews", "wprost", "dorzeczy", "niezalezna", "wpolityce"],
    "conservativeToProgressive": ["wpolityce", "niezalezna", "dorzeczy", "wprost", "polsatnews", "rp", "polityka300", "gazetaprawna", "se", "fakt", "radiozet", "interia", "wp", "onet", "tvn24", "polityka", "wyborcza", "okopress"],
    "default": ["wyborcza", "onet", "tvn24", "wp", "rp", "polityka", "interia", "gazetaprawna", "polsatnews", "radiozet", "wprost", "fakt", "se", "dorzeczy", "wpolityce", "niezalezna", "okopress", "polityka300"]
  },

  "italy": {
    "largest": ["il_sole", "adnkronos", "la_repubblica", "libero_quotidiano", "il_giornale", "ansa", "la_stampa", "sky_tg24", "il_fatto_quotidiano", "huffpost_italia", "secolo_ditalia", "avvenire", "il_primato_nazionale", "il_manifesto"],
    "mostReputable": ["la_repubblica", "ansa", "sky_tg24", "il_sole", "huffpost_italia", "avvenire", "adnkronos", "il_fatto_quotidiano", "la_stampa", "il_giornale", "secolo_ditalia", "libero_quotidiano", "il_manifesto", "il_primato_nazionale"],
    "progressiveToConservative": ["il_manifesto", "huffpost_italia", "il_fatto_quotidiano", "la_repubblica", "ansa", "sky_tg24", "la_stampa", "il_sole", "adnkronos", "avvenire", "il_giornale", "secolo_ditalia", "libero_quotidiano", "il_primato_nazionale"],
    "conservativeToProgressive": ["il_primato_nazionale", "libero_quotidiano", "secolo_ditalia", "il_giornale", "avvenire", "il_sole", "sky_tg24", "ansa", "adnkronos", "la_stampa", "la_repubblica", "il_fatto_quotidiano", "huffpost_italia", "il_manifesto"],
    "default": ["la_repubblica", "il_sole", "adnkronos", "ansa", "sky_tg24", "il_giornale", "la_stampa", "huffpost_italia", "il_fatto_quotidiano", "libero_quotidiano", "avvenire", "secolo_ditalia", "il_manifesto", "il_primato_nazionale"]
  },

  "lebanon": {
    "largest": ["lbci", "mtv", "annahar", "almanar", "alakhbar", "lebanon24", "naharnet", "aljoumhouria", "lorientlejour", "elnashra", "lebanonfiles", "janoubia", "kataeb", "tayyar", "addiyar"],
    "mostReputable": ["annahar", "lorientlejour", "lbci", "naharnet", "aljoumhouria", "mtv", "alakhbar", "lebanon24", "elnashra", "lebanonfiles", "janoubia", "kataeb", "almanar", "tayyar", "addiyar"],
    "progressiveToConservative": ["lorientlejour", "kataeb", "mtv", "lbci", "annahar", "naharnet", "lebanon24", "elnashra", "aljoumhouria", "janoubia", "lebanonfiles", "tayyar", "addiyar", "alakhbar", "almanar"],
    "conservativeToProgressive": ["almanar", "alakhbar", "addiyar", "tayyar", "lebanonfiles", "janoubia", "aljoumhouria", "elnashra", "lebanon24", "naharnet", "annahar", "lbci", "mtv", "kataeb", "lorientlejour"],
    "default": ["annahar", "alakhbar", "lbci", "mtv", "almanar", "lorientlejour", "naharnet", "aljoumhouria", "lebanon24", "elnashra", "lebanonfiles", "janoubia", "kataeb", "tayyar", "addiyar"]
  },

  "russia": {
    "largest": ["tass_russia", "lenta_russia", "iz_russia", "ria_russia", "rbc_russia", "gazeta_russia", "kommersant_russia", "meduza_russia", "rg_russia", "rt_russia", "ntv_russia", "moscowtimes_russia", "svoboda_russia", "kp_russia", "interfax_russia", "moscowtimes_english_russia", "vesti_russia"],
    "mostReputable": ["kommersant_russia", "rbc_russia", "interfax_russia", "meduza_russia", "moscowtimes_russia", "gazeta_russia", "tass_russia", "ria_russia", "lenta_russia", "iz_russia", "rg_russia", "ntv_russia", "svoboda_russia", "kp_russia", "rt_russia", "moscowtimes_english_russia", "vesti_russia"],
    "progressiveToConservative": ["meduza_russia", "svoboda_russia", "moscowtimes_russia", "gazeta_russia", "rbc_russia", "kommersant_russia", "interfax_russia", "lenta_russia", "ntv_russia", "kp_russia", "tass_russia", "ria_russia", "rg_russia", "iz_russia", "rt_russia", "moscowtimes_english_russia", "vesti_russia"],
    "conservativeToProgressive": ["vesti_russia", "rt_russia", "iz_russia", "rg_russia", "ria_russia", "tass_russia", "kp_russia", "ntv_russia", "lenta_russia", "interfax_russia", "kommersant_russia", "rbc_russia", "gazeta_russia", "moscowtimes_russia", "svoboda_russia", "meduza_russia", "moscowtimes_english_russia"],
    "default": ["tass_russia", "rbc_russia", "kommersant_russia", "meduza_russia", "iz_russia", "ria_russia", "lenta_russia", "gazeta_russia", "moscowtimes_russia", "interfax_russia", "rg_russia", "rt_russia", "ntv_russia", "svoboda_russia", "kp_russia", "moscowtimes_english_russia", "vesti_russia"]
  },

  "us": {
    "largest": ["yahoo", "nytimes", "cnn", "foxnews", "washingtonpost", "nbcnews", "usatoday", "nypost", "WallStreetJournal", "latimes", "abcnews", "npr", "theatlantic", "bostonglobe", "politico", "newsweek", "thehill", "msnbc", "huffpost", "slate", "vox", "breitbart", "dailybeast", "motherjones", "reason", "commondreams", "dailywire", "jacobin", "epochtimes", "oann", "theblaze"],
    "mostReputable": ["nytimes", "washingtonpost", "apnews", "npr", "abcnews", "cnn", "cbs", "nbcnews", "WallStreetJournal", "latimes", "theatlantic", "bostonglobe", "usatoday", "politico", "thehill", "vox", "slate", "motherjones", "reason", "jacobin", "msnbc", "foxnews", "yahoo", "huffpost", "dailybeast", "nypost", "newsweek", "breitbart", "dailywire", "commondreams", "epochtimes", "oann", "theblaze"],
    "progressiveToConservative": ["jacobin", "motherjones", "commondreams", "huffpost", "vox", "slate", "msnbc", "theatlantic", "cnn", "nytimes", "washingtonpost", "npr", "abcnews", "nbcnews", "cbs", "latimes", "bostonglobe", "usatoday", "apnews", "politico", "thehill", "yahoo", "WallStreetJournal", "newsweek", "nypost", "reason", "dailybeast", "foxnews", "dailywire", "breitbart", "epochtimes", "oann", "theblaze"],
    "conservativeToProgressive": ["oann", "theblaze", "breitbart", "epochtimes", "dailywire", "foxnews", "nypost", "WallStreetJournal", "reason", "newsweek", "yahoo", "thehill", "politico", "apnews", "usatoday", "bostonglobe", "latimes", "cbs", "nbcnews", "abcnews", "npr", "washingtonpost", "nytimes", "cnn", "theatlantic", "msnbc", "slate", "vox", "huffpost", "dailybeast", "commondreams", "motherjones", "jacobin"],
    "default": ["nytimes", "foxnews", "washingtonpost", "cnn", "WallStreetJournal", "apnews", "nbcnews", "cbs", "npr", "usatoday", "politico", "thehill", "msnbc", "nypost", "latimes", "theatlantic", "vox", "reason", "breitbart", "motherjones", "jacobin", "dailywire", "yahoo", "huffpost", "dailybeast", "newsweek", "bostonglobe", "commondreams", "epochtimes", "oann", "theblaze"]
  },

  "iran": {
    "largest": ["mehrnews", "isna", "borna_news", "irna", "tasnimnews", "radiofarda", "iranintl", "khabaronline", "alalam", "kayhan_london", "sharghdaily", "hamshahrionline", "bbc_persian", "tasnimnews_english", "voanews", "tehrantimes", "kayhan", "etemadnewspaper"],
    "mostReputable": ["bbc_persian", "radiofarda", "iranintl", "voanews", "sharghdaily", "etemadnewspaper", "hamshahrionline", "isna", "khabaronline", "mehrnews", "irna", "tasnimnews", "borna_news", "tehrantimes", "alalam", "kayhan", "kayhan_london", "tasnimnews_english"],
    "progressiveToConservative": ["bbc_persian", "radiofarda", "voanews", "iranintl", "kayhan_london", "sharghdaily", "etemadnewspaper", "hamshahrionline", "isna", "khabaronline", "irna", "mehrnews", "borna_news", "tehrantimes", "tasnimnews", "alalam", "kayhan", "tasnimnews_english"],
    "conservativeToProgressive": ["kayhan", "alalam", "tasnimnews", "tasnimnews_english", "tehrantimes", "borna_news", "mehrnews", "irna", "khabaronline", "isna", "hamshahrionline", "etemadnewspaper", "sharghdaily", "kayhan_london", "iranintl", "voanews", "radiofarda", "bbc_persian"],
    "default": ["bbc_persian", "irna", "mehrnews", "radiofarda", "iranintl", "tasnimnews", "isna", "sharghdaily", "khabaronline", "hamshahrionline", "voanews", "borna_news", "alalam", "etemadnewspaper", "kayhan_london", "tehrantimes", "kayhan", "tasnimnews_english"]
  },

  "uk": {
    "largest": ["bbc", "sky_news", "guardian", "times", "daily_mail", "sun", "telegraph", "mirror", "independent", "metro", "standard", "channel4", "huffpostuk", "spectator", "newstatesman", "breitbartLondon", "spiked", "novaramedia", "morningstaronline", "thejc"],
    "mostReputable": ["bbc", "guardian", "times", "telegraph", "independent", "sky_news", "channel4", "spectator", "newstatesman", "standard", "metro", "daily_mail", "mirror", "sun", "huffpostuk", "thejc", "breitbartLondon", "spiked", "novaramedia", "morningstaronline"],
    "progressiveToConservative": ["morningstaronline", "novaramedia", "guardian", "huffpostuk", "independent", "mirror", "channel4", "bbc", "metro", "standard", "times", "sky_news", "telegraph", "spectator", "daily_mail", "sun", "thejc", "breitbartLondon", "spiked"],
    "conservativeToProgressive": ["spiked", "breitbartLondon", "thejc", "sun", "daily_mail", "spectator", "telegraph", "times", "sky_news", "standard", "metro", "bbc", "channel4", "mirror", "independent", "huffpostuk", "guardian", "novaramedia", "morningstaronline"],
    "default": ["bbc", "guardian", "times", "telegraph", "daily_mail", "independent", "sky_news", "sun", "mirror", "channel4", "spectator", "standard", "metro", "newstatesman", "huffpostuk", "breitbartLondon", "spiked", "thejc", "novaramedia", "morningstaronline"]
  },

  "spain": {
    "largest": ["elpais", "elmundo", "lavanguardia", "elconfidencial", "eldiario", "rtve", "20minutos", "elespanol", "larazon", "abc", "publico", "elperiodico", "libertaddigital", "infolibre", "lamarea", "elplural", "elsalto"],
    "mostReputable": ["elpais", "elmundo", "lavanguardia", "elconfidencial", "eldiario", "rtve", "abc", "elperiodico", "infolibre", "publico", "larazon", "elespanol", "20minutos", "libertaddigital", "lamarea", "elplural", "elsalto"],
    "progressiveToConservative": ["publico", "eldiario", "infolibre", "lamarea", "elsalto", "elplural", "elpais", "elperiodico", "rtve", "20minutos", "lavanguardia", "elconfidencial", "elmundo", "elespanol", "abc", "larazon", "libertaddigital"],
    "conservativeToProgressive": ["libertaddigital", "larazon", "abc", "elespanol", "elmundo", "elconfidencial", "lavanguardia", "20minutos", "rtve", "elperiodico", "elpais", "elplural", "elsalto", "lamarea", "infolibre", "eldiario", "publico"],
    "default": ["elpais", "elmundo", "eldiario", "lavanguardia", "abc", "elconfidencial", "rtve", "larazon", "elespanol", "20minutos", "elperiodico", "publico", "infolibre", "libertaddigital", "lamarea", "elplural", "elsalto"]
  },

  "ukraine": {
    "largest": ["tsn", "pravda", "unian", "liga", "ukrinform", "ukrinform_ua", "nv", "kyivpost", "hromadske", "lb", "glavcom", "svoboda"],
    "mostReputable": ["hromadske", "nv", "kyivpost", "ukrinform", "ukrinform_ua", "liga", "lb", "pravda", "unian", "tsn", "glavcom", "svoboda"],
    "progressiveToConservative": ["hromadske", "nv", "lb", "pravda", "kyivpost", "ukrinform", "ukrinform_ua", "liga", "unian", "tsn", "glavcom", "svoboda"],
    "conservativeToProgressive": ["svoboda", "glavcom", "tsn", "unian", "liga", "ukrinform_ua", "ukrinform", "kyivpost", "pravda", "lb", "nv", "hromadske"],
    "default": ["nv", "ukrinform", "tsn", "pravda", "hromadske", "liga", "kyivpost", "unian", "ukrinform_ua", "lb", "glavcom", "svoboda"]
  },

  "india": {
    "largest": ["toi", "bhaskar", "jagran", "aajtak", "ndtv", "indiatoday", "news18", "zeenews", "abplive", "thehindu", "mathrubhumi", "dinamalar", "firstpost", "theprint", "thequint", "scrollin", "frontline", "jansatta", "thewirehindi", "jantakareporter"],
    "mostReputable": ["thehindu", "ndtv", "indiatoday", "toi", "frontline", "theprint", "scrollin", "thequint", "news18", "firstpost", "mathrubhumi", "bhaskar", "jagran", "aajtak", "abplive", "zeenews", "dinamalar", "jansatta", "thewirehindi", "jantakareporter"],
    "progressiveToConservative": ["thewirehindi", "jantakareporter", "thequint", "scrollin", "ndtv", "theprint", "frontline", "thehindu", "firstpost", "mathrubhumi", "indiatoday", "news18", "toi", "abplive", "aajtak", "dinamalar", "bhaskar", "jagran", "jansatta", "zeenews"],
    "conservativeToProgressive": ["zeenews", "jansatta", "jagran", "bhaskar", "dinamalar", "aajtak", "abplive", "toi", "news18", "indiatoday", "mathrubhumi", "firstpost", "thehindu", "frontline", "theprint", "ndtv", "scrollin", "thequint", "jantakareporter", "thewirehindi"],
    "default": ["bhaskar", "ndtv", "jagran", "thehindu", "aajtak", "theprint", "news18", "thewirehindi", "toi", "mathrubhumi", "zeenews", "dinamalar", "indiatoday", "scrollin", "thequint", "jansatta", "frontline", "abplive", "firstpost", "jantakareporter"]
  },

  "netherlands": {
    "largest": ["telegraaf", "nos", "rtl", "volkskrant", "nrc", "ad", "nu", "fd", "trouw", "parool", "metronieuws", "rd"],
    "mostReputable": ["nrc", "volkskrant", "nos", "trouw", "fd", "parool", "rtl", "ad", "telegraaf", "nu", "metronieuws", "rd"],
    "progressiveToConservative": ["volkskrant", "trouw", "parool", "nrc", "nos", "rtl", "fd", "metronieuws", "ad", "telegraaf", "rd"],
    "conservativeToProgressive": ["rd", "telegraaf", "ad", "metronieuws", "fd", "rtl", "nos", "nrc", "parool", "trouw", "volkskrant"],
    "default": ["nrc", "volkskrant", "nos", "telegraaf", "rtl", "ad", "fd", "trouw", "parool", "nu", "metronieuws", "rd"]
  },

  "china": {
    "largest": ["xinhua", "xinhua_cn", "peoples_daily", "peoples_daily_cn", "cctv", "cctv_english", "chinadaily", "chinadaily_cn", "globaltimes", "huanqiu", "gmw", "bjd", "ce", "thepaper", "caixin_chinese", "caixin_global", "scmp", "eeo", "chinamil_english", "bbc_chinese", "voa_chinese", "dw_chinese", "epochtimes", "hongkongfp", "chinadigitaltimes", "secretchina"],
    "mostReputable": ["bbc_chinese", "scmp", "caixin_global", "hongkongfp", "dw_chinese", "voa_chinese", "chinadigitaltimes", "caixin_chinese", "eeo", "thepaper", "xinhua", "xinhua_cn", "peoples_daily", "peoples_daily_cn", "chinadaily", "chinadaily_cn", "cctv", "cctv_english", "bjd", "gmw", "globaltimes", "huanqiu", "ce", "chinamil_english", "epochtimes", "secretchina"],
    "controlledToIndependent": ["xinhua", "xinhua_cn", "peoples_daily", "peoples_daily_cn", "cctv", "cctv_english", "chinadaily", "chinadaily_cn", "globaltimes", "huanqiu", "gmw", "bjd", "ce", "chinamil_english", "thepaper", "caixin_chinese", "caixin_global", "eeo", "scmp", "hongkongfp", "bbc_chinese", "voa_chinese", "dw_chinese", "chinadigitaltimes", "epochtimes", "secretchina"],
    "independentToControlled": ["bbc_chinese", "voa_chinese", "dw_chinese", "chinadigitaltimes", "hongkongfp", "epochtimes", "secretchina", "scmp", "caixin_global", "caixin_chinese", "eeo", "thepaper", "ce", "chinamil_english", "globaltimes", "huanqiu", "chinadaily", "chinadaily_cn", "gmw", "bjd", "cctv", "cctv_english", "peoples_daily", "peoples_daily_cn", "xinhua", "xinhua_cn"],
    "default": ["cctv", "peoples_daily", "xinhua", "caixin_global", "thepaper", "globaltimes", "huanqiu", "bjd", "eeo", "chinamil_english", "bbc_chinese", "voa_chinese", "scmp", "dw_chinese", "hongkongfp", "ce", "chinadaily", "chinadigitaltimes", "epochtimes", "secretchina"]
  },

  "japan": {
    "largest": ["yomiuri", "asahi", "nikkei", "mainichi", "sankei", "nhk", "yahoo", "chunichi", "hokkaido", "japantimes", "tbs", "kyodo_english", "nikkei_asia", "huffpost", "jbpress"],
    "mostReputable": ["asahi", "yomiuri", "nikkei", "mainichi", "nhk", "kyodo_english", "japantimes", "sankei", "chunichi", "hokkaido", "nikkei_asia", "tbs", "yahoo", "huffpost", "jbpress"],
    "progressiveToConservative": ["asahi", "mainichi", "tokyo", "huffpost", "tbs", "nhk", "kyodo_english", "nikkei", "nikkei_asia", "japantimes", "chunichi", "hokkaido", "jbpress", "yahoo", "yomiuri", "sankei"],
    "conservativeToProgressive": ["sankei", "yomiuri", "yahoo", "jbpress", "hokkaido", "chunichi", "japantimes", "nikkei_asia", "nikkei", "kyodo_english", "nhk", "tbs", "huffpost", "tokyo", "mainichi", "asahi"],
    "default": ["asahi", "yomiuri", "nikkei", "mainichi", "sankei", "nhk", "japantimes", "chunichi", "kyodo_english", "hokkaido", "nikkei_asia", "yahoo", "tbs", "huffpost", "jbpress"]
  },

  "turkey": {
    "largest": ["hurriyet", "sabah", "sozcu", "milliyet", "cumhuriyet", "bianet", "birgun", "daily_sabah", "gazeteduvar", "gercekgundem", "medyascope", "odatv", "yeniakit", "aydinlik", "t24"],
    "mostReputable": ["cumhuriyet", "hurriyet", "milliyet", "sozcu", "bianet", "birgun", "t24", "gazeteduvar", "medyascope", "sabah", "daily_sabah", "odatv", "gercekgundem", "yeniakit", "aydinlik"],
    "progressiveToConservative": ["bianet", "birgun", "gazeteduvar", "t24", "cumhuriyet", "sozcu", "medyascope", "odatv", "hurriyet", "milliyet", "gercekgundem", "sabah", "daily_sabah", "aydinlik", "yeniakit"],
    "conservativeToProgressive": ["yeniakit", "aydinlik", "daily_sabah", "sabah", "gercekgundem", "milliyet", "hurriyet", "odatv", "medyascope", "sozcu", "cumhuriyet", "t24", "gazeteduvar", "birgun", "bianet"],
    "default": ["hurriyet", "cumhuriyet", "sabah", "sozcu", "milliyet", "bianet", "birgun", "daily_sabah", "gazeteduvar", "medyascope", "t24", "gercekgundem", "odatv", "yeniakit", "aydinlik"]
  },

  "uae": {
    "largest": ["gulfnews", "aletihad", "albayan", "emaratalyoum", "en_aletihad", "emirates247", "gulftoday", "alroeya", "alain", "alwahdanews"],
    "mostReputable": ["aletihad", "gulfnews", "albayan", "en_aletihad", "emaratalyoum", "emirates247", "gulftoday", "alroeya", "alain", "alwahdanews"],
    "progressiveToConservative": ["gulfnews", "en_aletihad", "emirates247", "gulftoday", "emaratalyoum", "albayan", "aletihad", "alroeya", "alain", "alwahdanews"],
    "conservativeToProgressive": ["alwahdanews", "alain", "alroeya", "aletihad", "albayan", "emaratalyoum", "gulftoday", "emirates247", "en_aletihad", "gulfnews"],
    "default": ["gulfnews", "aletihad", "albayan", "emaratalyoum", "en_aletihad", "emirates247", "gulftoday", "alroeya", "alain", "alwahdanews"]
  },

  "israel": {
    "largest": ["Ynet", "Mako", "Israel Hayom", "walla", "N12", "Now14", "Kan", "Jerusalem Post", "Maariv", "Haaretz", "13tv", "kikar", "Srugim", "Inn", "Times of Israel", "Makor Rishon", "i24news", "kipa", "Davar"],
    "mostReputable": ["Haaretz", "Ynet", "13tv", "N12", "Kan", "Israel Hayom", "walla", "Jerusalem Post", "Mako", "i24news", "Maariv", "Times of Israel", "Makor Rishon", "Davar", "kikar", "Now14", "Srugim", "Inn", "kipa"],
    "progressiveToConservative": ["Haaretz", "Davar", "Kan", "walla", "13tv", "N12", "Mako", "Ynet", "i24news", "Jerusalem Post", "Times of Israel", "Israel Hayom", "Maariv", "Makor Rishon", "Srugim", "kikar", "Inn", "kipa", "Now14"],
    "conservativeToProgressive": ["Now14", "Srugim", "kipa", "Inn", "kikar", "Makor Rishon", "Maariv", "Israel Hayom", "Times of Israel", "Jerusalem Post", "i24news", "13tv", "Mako", "Ynet", "N12", "walla", "Kan", "Davar", "Haaretz"],
    "default": ["Ynet", "Haaretz", "Now14", "N12", "walla", "13tv", "Kan", "Israel Hayom", "Jerusalem Post", "Mako", "Times of Israel", "i24news", "Maariv", "Makor Rishon", "Davar", "Srugim", "kikar", "Inn", "kipa"]
  },

  "palestine": {
    "largest": ["qudsn", "maannews", "alquds", "palsawa", "alwatanvoice", "palinfo", "samanews", "felesteen", "ultrapal", "arabi21", "alayyam", "raya", "alresalah", "pnn", "palestinechronicle", "english_palinfo", "english_pnn"],
    "mostReputable": ["maannews", "alquds", "alayyam", "palsawa", "alwatanvoice", "palestinechronicle", "pnn", "english_pnn", "arabi21", "qudsn", "ultrapal", "samanews", "raya", "palinfo", "english_palinfo", "felesteen", "alresalah"],
    "progressiveToConservative": ["arabi21", "maannews", "alwatanvoice", "palsawa", "alayyam", "alquds", "palestinechronicle", "pnn", "english_pnn", "ultrapal", "samanews", "raya", "qudsn", "palinfo", "english_palinfo", "felesteen", "alresalah"],
    "conservativeToProgressive": ["alresalah", "felesteen", "palinfo", "english_palinfo", "qudsn", "raya", "samanews", "ultrapal", "pnn", "english_pnn", "palestinechronicle", "alquds", "alayyam", "palsawa", "alwatanvoice", "maannews", "arabi21"],
    "default": ["alquds", "maannews", "palinfo", "alwatanvoice", "palsawa", "qudsn", "alayyam", "felesteen", "samanews", "arabi21", "palestinechronicle", "pnn", "english_pnn", "alresalah", "english_palinfo", "raya"]
  },
  "finland": {
    "largest": ["hs", "yle", "iltalehti", "is", "mtv", "aamulehti", "hbl", "kaleva", "ksml", "ts", "suomenkuvalehti", "maaseuduntulevaisuus", "verkkouutiset", "suomenuutiset", "ku", "voima", "mvlehti"],
    "mostReputable": ["hs", "yle", "suomenkuvalehti", "hbl", "aamulehti", "kaleva", "ts", "ksml", "mtv", "maaseuduntulevaisuus", "ku", "verkkouutiset", "is", "iltalehti", "voima", "suomenuutiset", "mvlehti"],
    "progressiveToConservative": ["voima", "ku", "hs", "yle", "suomenkuvalehti", "hbl", "aamulehti", "kaleva", "ts", "ksml", "iltalehti", "is", "mtv", "maaseuduntulevaisuus", "verkkouutiset", "suomenuutiset", "mvlehti"],
    "conservativeToProgressive": ["mvlehti", "suomenuutiset", "verkkouutiset", "maaseuduntulevaisuus", "mtv", "is", "iltalehti", "ksml", "ts", "kaleva", "aamulehti", "hbl", "suomenkuvalehti", "yle", "hs", "ku", "voima"],
    "default": ["hs", "yle", "mtv", "iltalehti", "is", "suomenkuvalehti", "aamulehti", "hbl", "kaleva", "ksml", "verkkouutiset", "ku", "voima", "ts", "maaseuduntulevaisuus", "suomenuutiset", "mvlehti"]
  },
}

export default function getSourceOrder(country, order) {
  return sourceOrders[country][order]
}
export const orderOptionLabels = {
  'largest': 'Largest',
  'mostReputable': 'Most Reputable',
  'progressiveToConservative': 'Progressive to Conservative',
  'conservativeToProgressive': 'Conservative to Progressive',
  'default': 'Default'
}