// ============================================================
// CALENDRIX EVENTS DATABASE — events-data.js
// Single source of truth for ALL events across the website.
// Used by: calendar.html, events.html, countdown.html
// ============================================================

export type Religion = 'islamic' | 'christian' | 'hindu' | 'global';

export interface CalendrixEvent {
  id: string;
  name: string;
  arabicName?: string;
  date: string;
  hijriDate?: string;
  religion: Religion;
  emoji: string;
  color: string;
  badge: string;
  description: string;
  significance: string;
  isPublicHoliday: boolean;
  tags: string[];
}

export const CALENDRIX_EVENTS: CalendrixEvent[] = [

  // ══════════════════════════════════════════════
  // 🟢 ISLAMIC EVENTS — 2025 & 2026
  // ══════════════════════════════════════════════

  {
    id: "isl-001",
    name: "Islamic New Year",
    arabicName: "رأس السنة الهجرية",
    date: "2025-06-27",
    hijriDate: "1 Muharram 1447 AH",
    religion: "islamic",
    emoji: "🌙",
    color: "#2D6A4F",
    badge: "Islamic",
    description: "The first day of Muharram marks the beginning of the Islamic Hijri lunar calendar year. It commemorates the Prophet Muhammad's (PBUH) migration (Hijra) from Mecca to Medina in 622 CE.",
    significance: "High",
    isPublicHoliday: true,
    tags: ["new year", "muharram", "hijri", "1447"]
  },
  {
    id: "isl-002",
    name: "Day of Ashura",
    arabicName: "يوم عاشوراء",
    date: "2025-07-06",
    hijriDate: "10 Muharram 1447 AH",
    religion: "islamic",
    emoji: "🤲",
    color: "#2D6A4F",
    badge: "Islamic",
    description: "The 10th of Muharram is a day of great significance. For Sunni Muslims, it is a day of voluntary fasting — the Prophet (PBUH) fasted on this day. For Shia Muslims, it is the day of mourning for the martyrdom of Imam Husayn ibn Ali at the Battle of Karbala.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["ashura", "muharram", "fasting", "karbala"]
  },
  {
    id: "isl-003",
    name: "Mawlid al-Nabi ﷺ",
    arabicName: "المولد النبوي الشريف",
    date: "2025-09-05",
    hijriDate: "12 Rabi' al-Awwal 1447 AH",
    religion: "islamic",
    emoji: "⭐",
    color: "#2D6A4F",
    badge: "Islamic",
    description: "The birthday of Prophet Muhammad ﷺ, born on the 12th of Rabi' al-Awwal. Muslims around the world celebrate with prayers, recitation of poetry in praise of the Prophet, processions, and gatherings filled with salawat (blessings upon the Prophet).",
    significance: "High",
    isPublicHoliday: true,
    tags: ["mawlid", "prophet birthday", "rabi ul awal", "nabi"]
  },
  {
    id: "isl-004",
    name: "Laylat al-Miraj",
    arabicName: "ليلة المعراج",
    date: "2026-01-27",
    hijriDate: "27 Rajab 1447 AH",
    religion: "islamic",
    emoji: "🌠",
    color: "#2D6A4F",
    badge: "Islamic",
    description: "The Night of Ascension. On this blessed night, the Prophet Muhammad ﷺ was transported from Mecca to Jerusalem (Isra), then ascended through the seven heavens to the presence of Allah (Mi'raj). The five daily prayers were ordained on this night.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["miraj", "isra", "rajab", "ascension", "shab e miraj"]
  },
  {
    id: "isl-005",
    name: "Laylat al-Bara'at",
    arabicName: "ليلة البراءة",
    date: "2026-02-11",
    hijriDate: "15 Sha'ban 1447 AH",
    religion: "islamic",
    emoji: "🕯️",
    color: "#2D6A4F",
    badge: "Islamic",
    description: "The Night of Forgiveness (also called Shab-e-Barat in South Asia). Many Muslims believe Allah forgives sins and determines the fate of individuals for the coming year on this night. Observed with night prayers, recitation of the Quran, and visiting graves.",
    significance: "Medium",
    isPublicHoliday: false,
    tags: ["shab e barat", "shaban", "forgiveness", "barat"]
  },
  {
    id: "isl-006",
    name: "Start of Ramadan",
    arabicName: "بداية رمضان",
    date: "2026-02-18",
    hijriDate: "1 Ramadan 1447 AH",
    religion: "islamic",
    emoji: "🌙",
    color: "#2D6A4F",
    badge: "Islamic",
    description: "The holy month of Ramadan begins — the 9th month of the Islamic calendar and the most sacred month for Muslims worldwide. Fasting (Sawm) from dawn to sunset is obligatory for every adult Muslim. The month is dedicated to prayer, Quran recitation, charity (Zakat), and spiritual reflection.",
    significance: "Highest",
    isPublicHoliday: true,
    tags: ["ramadan", "fasting", "sawm", "holy month", "roza"]
  },
  {
    id: "isl-007",
    name: "Laylat al-Qadr",
    arabicName: "ليلة القدر",
    date: "2026-03-15",
    hijriDate: "27 Ramadan 1447 AH",
    religion: "islamic",
    emoji: "✨",
    color: "#2D6A4F",
    badge: "Islamic",
    description: "The Night of Power — described in the Quran as 'better than a thousand months' (Surah Al-Qadr). It falls in the last 10 nights of Ramadan, most likely on the 27th night. Muslims spend this night in intense worship, prayer (Tahajjud), and Quran recitation seeking Allah's mercy and blessings.",
    significance: "Highest",
    isPublicHoliday: false,
    tags: ["laylat al qadr", "night of power", "shab e qadr", "ramadan", "27 ramadan"]
  },
  {
    id: "isl-008",
    name: "Eid al-Fitr",
    arabicName: "عيد الفطر",
    date: "2026-03-20",
    hijriDate: "1 Shawwal 1447 AH",
    religion: "islamic",
    emoji: "🎉",
    color: "#2D6A4F",
    badge: "Islamic",
    description: "The Festival of Breaking the Fast — one of the two major Islamic holidays. Marks the end of Ramadan. Muslims wake before dawn for Fajr, wear new clothes, pay Zakat al-Fitr (charity), perform the special Eid prayer in congregation, exchange greetings ('Eid Mubarak'), and celebrate with family, feasts, and sweets.",
    significance: "Highest",
    isPublicHoliday: true,
    tags: ["eid", "eid ul fitr", "eid mubarak", "shawwal", "festival"]
  },
  {
    id: "isl-009",
    name: "Day of Arafah",
    arabicName: "يوم عرفة",
    date: "2026-05-26",
    hijriDate: "9 Dhu al-Hijjah 1447 AH",
    religion: "islamic",
    emoji: "🕌",
    color: "#2D6A4F",
    badge: "Islamic",
    description: "The holiest day of the Islamic year. Pilgrims performing Hajj stand on the plain of Arafat in supplication and remembrance of Allah. For non-pilgrims, fasting on this day expiates sins of the previous and coming year according to the Prophet ﷺ. It is the climax of Hajj.",
    significance: "Highest",
    isPublicHoliday: false,
    tags: ["arafah", "hajj", "dhu al hijjah", "fasting", "pilgrimage"]
  },
  {
    id: "isl-010",
    name: "Eid al-Adha",
    arabicName: "عيد الأضحى",
    date: "2026-05-27",
    hijriDate: "10 Dhu al-Hijjah 1447 AH",
    religion: "islamic",
    emoji: "🐑",
    color: "#2D6A4F",
    badge: "Islamic",
    description: "The Festival of Sacrifice — the greater of the two Eid celebrations. Commemorates Prophet Ibrahim's (AS) willingness to sacrifice his son Ismail as commanded by Allah. Muslims perform the Eid prayer, slaughter a livestock animal (Qurbani), and distribute the meat to family, neighbors, and the poor. Hajj pilgrims also complete their pilgrimage on this day.",
    significance: "Highest",
    isPublicHoliday: true,
    tags: ["eid ul adha", "qurbani", "sacrifice", "bakra eid", "hajj", "ibrahim"]
  },
  {
    id: "isl-011",
    name: "Islamic New Year 1448 AH",
    arabicName: "رأس السنة الهجرية 1448",
    date: "2026-06-17",
    hijriDate: "1 Muharram 1448 AH",
    religion: "islamic",
    emoji: "🌙",
    color: "#2D6A4F",
    badge: "Islamic",
    description: "The beginning of the Islamic year 1448 AH. A time for Muslims to reflect on the past year and renew their commitment to faith, good deeds, and righteousness.",
    significance: "High",
    isPublicHoliday: true,
    tags: ["new year", "muharram", "hijri", "1448"]
  },

  // ══════════════════════════════════════════════
  // 🟣 CHRISTIAN EVENTS — 2025 & 2026
  // ══════════════════════════════════════════════

  {
    id: "chr-001",
    name: "New Year's Day",
    date: "2025-01-01",
    religion: "christian",
    emoji: "🎆",
    color: "#4A2C6B",
    badge: "Christian",
    description: "The first day of the Gregorian calendar year. Christians observe this as the Solemnity of Mary, Mother of God (in the Catholic tradition) and a day of prayer and resolution-making for the new year.",
    significance: "Medium",
    isPublicHoliday: true,
    tags: ["new year", "january 1", "solemnity of mary"]
  },
  {
    id: "chr-002",
    name: "Epiphany",
    date: "2025-01-06",
    religion: "christian",
    emoji: "⭐",
    color: "#4A2C6B",
    badge: "Christian",
    description: "Also called 'Three Kings Day' or 'Twelfth Night'. Commemorates the visit of the Magi (Wise Men) to the baby Jesus, and in Eastern churches, the baptism of Jesus. Marks the official end of the Christmas season. Celebrated with parades and gifts in many Latin American and European countries.",
    significance: "Medium",
    isPublicHoliday: false,
    tags: ["epiphany", "three kings", "magi", "twelfth night", "wisemen"]
  },
  {
    id: "chr-003",
    name: "Ash Wednesday",
    date: "2025-03-05",
    religion: "christian",
    emoji: "✝️",
    color: "#4A2C6B",
    badge: "Christian",
    description: "The first day of Lent — a 40-day period of fasting, prayer, and penitence leading up to Easter. Christians receive a cross of ash on their foreheads as a mark of mortality and repentance, recalling the words: 'Remember that you are dust, and to dust you shall return.'",
    significance: "High",
    isPublicHoliday: false,
    tags: ["ash wednesday", "lent", "fasting", "penitence", "40 days"]
  },
  {
    id: "chr-004",
    name: "Palm Sunday",
    date: "2025-04-13",
    religion: "christian",
    emoji: "🌿",
    color: "#4A2C6B",
    badge: "Christian",
    description: "The Sunday before Easter, commemorating Jesus's triumphal entry into Jerusalem where crowds laid palm branches before him. It marks the beginning of Holy Week — the most sacred week in the Christian calendar.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["palm sunday", "holy week", "jerusalem", "triumphal entry"]
  },
  {
    id: "chr-005",
    name: "Maundy Thursday",
    date: "2025-04-17",
    religion: "christian",
    emoji: "🍞",
    color: "#4A2C6B",
    badge: "Christian",
    description: "Also called Holy Thursday. Commemorates the Last Supper of Jesus Christ with his Apostles, during which he instituted the Eucharist (Holy Communion). Jesus also washed the feet of his disciples, giving a 'new commandment' (mandatum in Latin — origin of 'Maundy') to love one another.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["maundy thursday", "last supper", "holy thursday", "eucharist", "holy week"]
  },
  {
    id: "chr-006",
    name: "Good Friday",
    date: "2025-04-18",
    religion: "christian",
    emoji: "✝️",
    color: "#4A2C6B",
    badge: "Christian",
    description: "Commemorates the crucifixion and death of Jesus Christ at Calvary. Christians observe this day with solemnity, fasting, and special church services. In Catholic tradition, the Stations of the Cross are recited. Despite its name, 'Good' refers to the holy, pious nature of the day — the sacrifice that brought salvation.",
    significance: "Highest",
    isPublicHoliday: true,
    tags: ["good friday", "crucifixion", "calvary", "holy week", "fasting"]
  },
  {
    id: "chr-007",
    name: "Holy Saturday",
    date: "2025-04-19",
    religion: "christian",
    emoji: "🕯️",
    color: "#4A2C6B",
    badge: "Christian",
    description: "The day between Good Friday and Easter Sunday. A day of vigil, silence, and anticipation. Many churches hold the Easter Vigil service on Saturday night — the most important liturgy of the Christian year, welcoming new members into the church.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["holy saturday", "easter vigil", "holy week"]
  },
  {
    id: "chr-008",
    name: "Easter Sunday",
    date: "2025-04-20",
    religion: "christian",
    emoji: "🐣",
    color: "#4A2C6B",
    badge: "Christian",
    description: "The most important and joyful day in the Christian calendar — celebrating the resurrection of Jesus Christ from the dead on the third day after his crucifixion. Christians celebrate with sunrise services, church bells, feasts, and traditional symbols like Easter eggs (representing new life). The date changes each year based on the lunar calendar.",
    significance: "Highest",
    isPublicHoliday: true,
    tags: ["easter", "resurrection", "easter sunday", "holy week", "christian holiday"]
  },
  {
    id: "chr-009",
    name: "Ascension Thursday",
    date: "2025-05-29",
    religion: "christian",
    emoji: "☁️",
    color: "#4A2C6B",
    badge: "Christian",
    description: "Celebrated 40 days after Easter Sunday. Commemorates the bodily ascension of Jesus Christ into heaven in the presence of his Apostles. It marks the end of Jesus's post-resurrection appearances on earth.",
    significance: "Medium",
    isPublicHoliday: false,
    tags: ["ascension", "ascension thursday", "jesus ascension", "40 days after easter"]
  },
  {
    id: "chr-010",
    name: "Pentecost",
    date: "2025-06-08",
    religion: "christian",
    emoji: "🔥",
    color: "#4A2C6B",
    badge: "Christian",
    description: "Celebrated 50 days after Easter. Commemorates the descent of the Holy Spirit upon the Apostles and the disciples of Jesus, as described in the Acts of the Apostles. Considered the 'birthday of the Church'. Marked by red vestments symbolizing the tongues of fire of the Holy Spirit.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["pentecost", "holy spirit", "whit sunday", "birthday of church"]
  },
  {
    id: "chr-011",
    name: "All Saints' Day",
    date: "2025-11-01",
    religion: "christian",
    emoji: "👼",
    color: "#4A2C6B",
    badge: "Christian",
    description: "A solemnity honoring all saints, known and unknown. In Western Christianity, it is followed by All Souls' Day on November 2nd when the faithful pray for the souls in purgatory. The evening before (October 31) is All Hallows' Eve, better known as Halloween.",
    significance: "Medium",
    isPublicHoliday: false,
    tags: ["all saints day", "saints", "november 1", "solemnity"]
  },
  {
    id: "chr-012",
    name: "All Souls' Day",
    date: "2025-11-02",
    religion: "christian",
    emoji: "🕯️",
    color: "#4A2C6B",
    badge: "Christian",
    description: "A day of prayer and remembrance for all faithful departed souls. Catholics and many other Christians visit cemeteries, light candles, and pray for the souls of the deceased. In Mexico, this coincides with 'Día de los Muertos' (Day of the Dead).",
    significance: "Medium",
    isPublicHoliday: false,
    tags: ["all souls day", "dead", "departed", "november 2"]
  },
  {
    id: "chr-013",
    name: "Christmas Eve",
    date: "2025-12-24",
    religion: "christian",
    emoji: "🌟",
    color: "#4A2C6B",
    badge: "Christian",
    description: "The evening before Christmas Day. Celebrated with Midnight Mass in Catholic and many Protestant traditions. Families gather, exchange gifts, and participate in nativity plays and carol singing. One of the most attended church services of the year.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["christmas eve", "midnight mass", "december 24", "nativity"]
  },
  {
    id: "chr-014",
    name: "Christmas Day",
    date: "2025-12-25",
    religion: "christian",
    emoji: "🎄",
    color: "#4A2C6B",
    badge: "Christian",
    description: "The celebration of the birth of Jesus Christ, the Son of God, in Bethlehem approximately 2,000 years ago. The most widely celebrated holiday worldwide. Christians attend church services, exchange gifts, share meals with family, and sing carols. Symbols include the Christmas tree, star of Bethlehem, nativity scene, and Santa Claus.",
    significance: "Highest",
    isPublicHoliday: true,
    tags: ["christmas", "nativity", "birth of jesus", "december 25", "xmas"]
  },
  {
    id: "chr-015",
    name: "Ash Wednesday 2026",
    date: "2026-02-18",
    religion: "christian",
    emoji: "✝️",
    color: "#4A2C6B",
    badge: "Christian",
    description: "The start of Lent 2026 — 40 days of fasting and prayer leading to Easter 2026. Christians receive ash crosses on their foreheads as a reminder of human mortality and the need for repentance.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["ash wednesday", "lent 2026", "fasting"]
  },
  {
    id: "chr-016",
    name: "Easter Sunday 2026",
    date: "2026-04-05",
    religion: "christian",
    emoji: "🐣",
    color: "#4A2C6B",
    badge: "Christian",
    description: "Easter Sunday 2026 — celebrating the resurrection of Jesus Christ. The holiest day of the Christian year, filled with joy, church services, family gatherings, and the symbols of new life.",
    significance: "Highest",
    isPublicHoliday: true,
    tags: ["easter 2026", "resurrection", "easter sunday"]
  },

  // ══════════════════════════════════════════════
  // 🟠 HINDU EVENTS — 2025 & 2026
  // ══════════════════════════════════════════════

  {
    id: "hin-001",
    name: "Makar Sankranti",
    date: "2025-01-14",
    religion: "hindu",
    emoji: "🪁",
    color: "#FF9933",
    badge: "Hindu",
    description: "One of the few Hindu festivals celebrated on a fixed solar calendar date (January 14). It marks the sun's transition (Sankranti) into Capricorn (Makar). Celebrated as a harvest festival across India — known as Pongal in Tamil Nadu, Uttarayan in Gujarat (famous kite-flying festival), and Lohri in Punjab (celebrated a day earlier on Jan 13).",
    significance: "High",
    isPublicHoliday: false,
    tags: ["makar sankranti", "pongal", "uttarayan", "lohri", "harvest", "kite festival"]
  },
  {
    id: "hin-002",
    name: "Vasant Panchami",
    date: "2025-02-02",
    religion: "hindu",
    emoji: "🎨",
    color: "#FF9933",
    badge: "Hindu",
    description: "The festival honoring Saraswati, the goddess of knowledge, wisdom, arts, and learning. Students and artists place their books and instruments before her idol for blessings. Yellow is the traditional color of this festival, worn as clothing and offered as flowers. Also marks the beginning of spring.",
    significance: "Medium",
    isPublicHoliday: false,
    tags: ["vasant panchami", "saraswati puja", "spring", "knowledge", "goddess"]
  },
  {
    id: "hin-003",
    name: "Maha Shivaratri",
    date: "2025-02-26",
    religion: "hindu",
    emoji: "🔱",
    color: "#FF9933",
    badge: "Hindu",
    description: "The Great Night of Lord Shiva — one of the most sacred Hindu festivals. Devotees fast throughout the day, perform night-long prayers (jagaran), visit Shiva temples, and offer milk, honey, and bael leaves on Shiva Lingam. It is believed that Shiva performed the cosmic dance (Tandava) on this night. Most significant of the 12 Shivaratris in a year.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["maha shivaratri", "shiva", "fasting", "lingam", "tandava"]
  },
  {
    id: "hin-004",
    name: "Holi",
    date: "2025-03-14",
    religion: "hindu",
    emoji: "🌈",
    color: "#FF9933",
    badge: "Hindu",
    description: "The Festival of Colors — celebrating the arrival of spring and the triumph of good over evil. Originated from the story of Prahlada's devotion to Lord Vishnu and his aunt Holika's destruction. People play with colored powder (gulal) and water, visit friends and family, and enjoy traditional sweets like gujiya and thandai. The evening before (Holika Dahan) involves a bonfire ritual.",
    significance: "Highest",
    isPublicHoliday: true,
    tags: ["holi", "festival of colors", "spring", "gulal", "holika dahan"]
  },
  {
    id: "hin-005",
    name: "Gudi Padwa / Ugadi",
    date: "2025-03-30",
    religion: "hindu",
    emoji: "🌸",
    color: "#FF9933",
    badge: "Hindu",
    description: "The Hindu New Year celebrated in Maharashtra (Gudi Padwa) and Karnataka/Andhra Pradesh/Telangana (Ugadi). Marks the first day of the Chaitra month per the Hindu calendar. People clean their homes, wear new clothes, prepare traditional dishes like Puran Poli, and raise the Gudi (a decorated pole) as a symbol of victory and prosperity.",
    significance: "High",
    isPublicHoliday: true,
    tags: ["gudi padwa", "ugadi", "hindu new year", "chaitra", "maharashtra"]
  },
  {
    id: "hin-006",
    name: "Ram Navami",
    date: "2025-04-06",
    religion: "hindu",
    emoji: "🏹",
    color: "#FF9933",
    badge: "Hindu",
    description: "Celebrates the birth of Lord Rama, the 7th avatar (incarnation) of Lord Vishnu and the hero of the epic Ramayana. Observed on the 9th day of Chaitra month. Devotees fast, read the Ramayana, sing bhajans, and visit Ram temples. Special celebrations in Ayodhya (birthplace of Ram), Varanasi, and Mathura.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["ram navami", "lord rama", "ramayana", "chaitra", "vishnu"]
  },
  {
    id: "hin-007",
    name: "Hanuman Jayanti",
    date: "2025-04-12",
    religion: "hindu",
    emoji: "💪",
    color: "#FF9933",
    badge: "Hindu",
    description: "Birthday of Lord Hanuman — the devoted monkey-god warrior and the greatest devotee of Lord Rama. Hanuman is worshipped for strength, courage, devotion, and protection. Devotees visit Hanuman temples, recite the Hanuman Chalisa (40 verses in praise of Hanuman), fast, and offer sindoor (vermilion) and jasmine flowers.",
    significance: "Medium",
    isPublicHoliday: false,
    tags: ["hanuman jayanti", "hanuman", "hanuman chalisa", "devotion"]
  },
  {
    id: "hin-008",
    name: "Rath Yatra",
    date: "2025-06-27",
    religion: "hindu",
    emoji: "🛕",
    color: "#FF9933",
    badge: "Hindu",
    description: "The grand Chariot Festival of Lord Jagannath (a form of Lord Vishnu), celebrated in Puri, Odisha with the world's largest chariot procession. The idols of Lord Jagannath, his sister Subhadra, and brother Balabhadra are placed on massive wooden chariots and pulled by thousands of devotees through the streets. The procession at Puri is a UNESCO-recognized cultural heritage.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["rath yatra", "jagannath", "chariot", "puri", "odisha"]
  },
  {
    id: "hin-009",
    name: "Raksha Bandhan",
    date: "2025-08-09",
    religion: "hindu",
    emoji: "🧵",
    color: "#FF9933",
    badge: "Hindu",
    description: "The festival celebrating the bond between brothers and sisters. Sisters tie a sacred thread (rakhi) around their brothers' wrists, symbolizing love and a prayer for the brother's protection and well-being. Brothers in return give gifts and vow to protect their sisters. Also celebrates the bond between a Brahmin priest and his patrons.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["raksha bandhan", "rakhi", "siblings", "brother sister"]
  },
  {
    id: "hin-010",
    name: "Janmashtami",
    date: "2025-08-16",
    religion: "hindu",
    emoji: "🦚",
    color: "#FF9933",
    badge: "Hindu",
    description: "The birthday of Lord Krishna — the 8th avatar of Lord Vishnu and one of the most beloved Hindu deities. Born at midnight in Mathura, Krishna's birth is celebrated with fasting, prayers, bhajans, and the famous Dahi Handi (breaking a pot of curd by forming a human pyramid). At midnight, Krishna's idol is bathed, dressed, and worshipped with great devotion.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["janmashtami", "krishna", "dahi handi", "mathura", "vishnu"]
  },
  {
    id: "hin-011",
    name: "Ganesh Chaturthi",
    date: "2025-08-27",
    religion: "hindu",
    emoji: "🐘",
    color: "#FF9933",
    badge: "Hindu",
    description: "The birthday of Lord Ganesha — the elephant-headed god of wisdom, prosperity, and new beginnings. The most celebrated festival in Maharashtra, with massive clay Ganesha idols installed in homes and public pandals for 10 days. Concludes with Anant Chaturdashi (Ganesh Visarjan) when idols are immersed in water bodies amid grand processions.",
    significance: "Highest",
    isPublicHoliday: true,
    tags: ["ganesh chaturthi", "ganesha", "ganpati", "vinayaka chaturthi", "maharashtra"]
  },
  {
    id: "hin-012",
    name: "Navratri Begins",
    date: "2025-10-02",
    religion: "hindu",
    emoji: "💃",
    color: "#FF9933",
    badge: "Hindu",
    description: "Nine Nights honoring the nine forms of Goddess Durga (Navadurga). One of the most widely celebrated Hindu festivals. In Gujarat, the Garba and Dandiya Raas dances are performed throughout all 9 nights. Devotees fast, pray, and celebrate each of the nine forms: Shailaputri, Brahmacharini, Chandraghanta, Kushmanda, Skandamata, Katyayani, Kalaratri, Mahagauri, Siddhidatri.",
    significance: "Highest",
    isPublicHoliday: false,
    tags: ["navratri", "durga", "garba", "dandiya", "nine nights", "goddess"]
  },
  {
    id: "hin-013",
    name: "Dussehra / Vijayadasami",
    date: "2025-10-02",
    religion: "hindu",
    emoji: "🏹",
    color: "#FF9933",
    badge: "Hindu",
    description: "Marks the victory of Lord Rama over the demon king Ravana — the triumph of good over evil. Celebrated on the 10th day of Navratri (Dashami). Massive effigies of Ravana, Kumbhkarna, and Meghanada are burned in public celebrations (Ravan Dahan). In parts of Bengal and Odisha, it marks the departure of Goddess Durga after Navratri.",
    significance: "High",
    isPublicHoliday: true,
    tags: ["dussehra", "vijayadasami", "rama", "ravana", "ravan dahan", "dashami"]
  },
  {
    id: "hin-014",
    name: "Karva Chauth",
    date: "2025-10-10",
    religion: "hindu",
    emoji: "🌕",
    color: "#FF9933",
    badge: "Hindu",
    description: "A fasting festival primarily observed by married Hindu women for the long life and well-being of their husbands. Women fast from sunrise to moonrise without eating or drinking water. In the evening, they dress in bridal attire, perform puja, and break their fast only after sighting the moon through a sieve and looking at their husband's face. Celebrated mainly in North India and Punjab.",
    significance: "Medium",
    isPublicHoliday: false,
    tags: ["karva chauth", "fasting", "moon", "married women", "husband"]
  },
  {
    id: "hin-015",
    name: "Dhanteras",
    date: "2025-10-20",
    religion: "hindu",
    emoji: "💰",
    color: "#FF9933",
    badge: "Hindu",
    description: "The first day of the Diwali five-day festival. Dedicated to Goddess Lakshmi (wealth) and Lord Dhanvantari (god of medicine). Considered the most auspicious day to purchase gold, silver, utensils, or new items. People clean their homes and light earthen lamps (diyas) to welcome Lakshmi. Jewellery and new vehicles are popular purchases.",
    significance: "High",
    isPublicHoliday: false,
    tags: ["dhanteras", "diwali", "lakshmi", "gold", "wealth"]
  },
  {
    id: "hin-016",
    name: "Diwali",
    date: "2025-10-20",
    religion: "hindu",
    emoji: "🪔",
    color: "#FF9933",
    badge: "Hindu",
    description: "The Festival of Lights — the most celebrated Hindu festival and one of the biggest celebrations in the world. Celebrated on Amavasya (new moon night) of Kartik month. Marks Lord Rama's return to Ayodhya after 14 years of exile and defeating Ravana. Homes are decorated with diyas (earthen lamps), rangoli, and fairy lights. Lakshmi Puja is performed at night. Fireworks, sweets, and family gatherings are central to the celebrations. Also celebrated by Sikhs (Bandi Chhor Divas) and Jains (Mahavira Nirvana).",
    significance: "Highest",
    isPublicHoliday: true,
    tags: ["diwali", "deepawali", "festival of lights", "lakshmi puja", "diya", "fireworks"]
  },
  {
    id: "hin-017",
    name: "Bhai Dooj",
    date: "2025-10-23",
    religion: "hindu",
    emoji: "🤝",
    color: "#FF9933",
    badge: "Hindu",
    description: "The fifth and final day of the Diwali festival. Similar to Raksha Bandhan, it celebrates the love between brothers and sisters. Sisters apply a tilak on their brothers' foreheads, pray for their long life, and brothers offer gifts in return. Also known as Bhai Tika in Nepal and Bhai Phota in Bengal.",
    significance: "Medium",
    isPublicHoliday: false,
    tags: ["bhai dooj", "siblings", "diwali", "bhai tika", "brother sister"]
  },
  {
    id: "hin-018",
    name: "Holi 2026",
    date: "2026-03-03",
    religion: "hindu",
    emoji: "🌈",
    color: "#FF9933",
    badge: "Hindu",
    description: "Holi 2026 — the Festival of Colors welcoming spring. An explosion of color, joy, and togetherness. People of all ages play with colored powders and water, forgive and forget past conflicts, and celebrate the victory of good over evil.",
    significance: "Highest",
    isPublicHoliday: true,
    tags: ["holi 2026", "colors", "spring festival"]
  },

  // ══════════════════════════════════════════════
  // 🔵 GLOBAL / UNIVERSAL EVENTS
  // ══════════════════════════════════════════════

  {
    id: "gbl-001",
    name: "International New Year",
    date: "2025-01-01",
    religion: "global",
    emoji: "🎆",
    color: "#1A5276",
    badge: "Global",
    description: "The celebration of the new Gregorian calendar year, observed globally with fireworks, countdowns, family gatherings, and resolutions for self-improvement.",
    significance: "High",
    isPublicHoliday: true,
    tags: ["new year", "january 1", "global"]
  },
  {
    id: "gbl-002",
    name: "Valentine's Day",
    date: "2025-02-14",
    religion: "global",
    emoji: "❤️",
    color: "#1A5276",
    badge: "Global",
    description: "A widely observed day of expressing love and affection. Named after Saint Valentine, a Christian martyr. Celebrated globally with cards, flowers, chocolates, and romantic gestures.",
    significance: "Low",
    isPublicHoliday: false,
    tags: ["valentine's day", "love", "february 14"]
  },
  {
    id: "gbl-003",
    name: "Earth Day",
    date: "2025-04-22",
    religion: "global",
    emoji: "🌍",
    color: "#1A5276",
    badge: "Global",
    description: "An annual event on April 22 to demonstrate support for environmental protection. First celebrated in 1970, Earth Day now includes a wide range of events coordinated globally by EARTHDAY.ORG.",
    significance: "Medium",
    isPublicHoliday: false,
    tags: ["earth day", "environment", "april 22"]
  },
  {
    id: "gbl-004",
    name: "International New Year 2026",
    date: "2026-01-01",
    religion: "global",
    emoji: "🎆",
    color: "#1A5276",
    badge: "Global",
    description: "Global celebration of the new year 2026. Ring in the year with fireworks, resolutions, and joy shared across the world.",
    significance: "High",
    isPublicHoliday: true,
    tags: ["new year 2026", "january 1"]
  }

];

// ── Helper: get events for a specific date (YYYY-MM-DD)
export function getEventsForDate(dateStr: string) {
  return CALENDRIX_EVENTS.filter(e => e.date === dateStr);
}

// ── Helper: get events for a month (YYYY-MM)
export function getEventsForMonth(yearMonth: string) {
  return CALENDRIX_EVENTS.filter(e => e.date.startsWith(yearMonth));
}

// ── Helper: get events by religion
export function getEventsByReligion(religion: Religion) {
  return CALENDRIX_EVENTS.filter(e => e.religion === religion);
}

// ── Helper: get upcoming events (from today onwards, sorted by date)
export function getUpcomingEvents(limit = 10) {
  const today = new Date().toISOString().split('T')[0];
  return CALENDRIX_EVENTS
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

// ── Helper: get days until an event
export function getDaysUntil(dateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateStr);
  const diff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}
