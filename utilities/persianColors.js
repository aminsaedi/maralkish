const persianColors = [
  { name: "آبی", color: "Blue", key: "‎#0000ff", dark: true },
  { name: "آبی آسمانی", key: "‎#e0ffff", color: "LightCyan", dark: false },
  { name: "آبی آسمانی سیر", key: "‎#87ceeb", color: "SkyBlue", dark: false },
  { name: "آبی بنفش", key: "‎#9370db", color: "MediumPurple", dark: false },
  { name: "آبی دودی", key: "‎#483d8b", color: "DarkSlateBlue", dark: true },
  { name: "آبی روشن", key: "‎#87cefa", color: "LightSkyBlue", dark: false },
  { name: "آبی سیر", key: "‎#0000cd", color: "MediumBlue", dark: true },
  { name: "آبی فولادی", key: "‎#6a5acd", color: "SlateBlue", dark: true },
  { name: "آبی لجنی", key: "‎#5f9ea0", color: "CadetBlue", dark: false },
  {
    name: "آبی متالیک روشن",
    key: "‎#7b68ee",
    color: "MediumSlateBlue",
    dark: true,
  },
  { name: "آبی محو", key: "‎#f0ffff", color: "Azure", dark: false },
  { name: "آبی نفتی", key: "‎#191970", color: "MidnightBlue", dark: true },
  { name: "آبی کبریتی", key: "‎#add8e6", color: "LightBlue", dark: false },
  {
    name: "آبی کبریتی روشن",
    key: "‎#b0e0e6",
    color: "PowderBlue",
    dark: false,
  },
  { name: "آبی کدر", key: "‎#6495ed", color: "CornflowerBlue", dark: true },
  { name: "آبی کمرنگ", key: "‎#00bfff", color: "DeepSkyBlue", dark: true },
  { name: "آبی-بنفش سیر", key: "‎#8a2be2", color: "BlueViolet", dark: true },
  { name: "آلبالویی", key: "‎#800000", color: "Maroon", dark: true },
  { name: "ارغوانی", key: "‎#c71585", color: "MediumVioletRed", dark: true },
  { name: "ارکیده", key: "‎#da70d6", color: "Orchid", dark: false },
  { name: "ارکیده بنفش", key: "‎#9932cc", color: "DarkOrchid", dark: true },
  { name: "ارکیده سیر", key: "‎#ba55d3", color: "MediumOrchid", dark: false },
  { name: "استخوانی", key: "‎#fffff0", color: "Ivory", dark: false },
  { name: "بادمجانی", key: "‎#bc8f8f", color: "RosyBrown", dark: false },
  { name: "بادمجانی روشن", key: "‎#d8bfd8", color: "Thistle", dark: false },
  { name: "برنزه کدر", key: "‎#d2b48c", color: "Tan", dark: false },
  { name: "بنفش", key: "‎#800080", color: "Purple", dark: true },
  { name: "بنفش باز", key: "‎#9400d3", color: "DarkViolet", dark: true },
  { name: "بنفش روشن", key: "‎#ee82ee", color: "Violet", dark: false },
  {
    name: "بنفش مایل به آبی",
    key: "‎#b0c4de",
    color: "LightSteelBlue",
    dark: false,
  },
  { name: "بنفش کدر", key: "‎#dda0dd", color: "Plum", dark: false },
  { name: "بژ", key: "‎#ffe4e1", color: "MistyRose", dark: false },
  { name: "بژ باز", key: "‎#fff5ee", color: "SeaShell", dark: false },
  { name: "بژ تیره", key: "‎#faebd7", color: "AntiqueWhite", dark: false },
  { name: "بژ تیره", key: "‎#f08080", color: "LightCoral", dark: false },
  { name: "بژ روشن", key: "‎#fdf5e6", color: "OldLace", dark: false },
  { name: "توسی", key: "‎#c0c0c0", color: "Silver", dark: false },
  { name: "جگری", key: "‎#cd5c5c", color: "IndianRed", dark: true },
  { name: "حناییِ روشن", key: "‎#fa8072", color: "Salmon", dark: false },
  { name: "خاکستری محو", key: "‎#f5f5f5", color: "WhiteSmoke", dark: false },
  { name: "خاکی", key: "‎#deb887", color: "BurlyWood", dark: true },
  { name: "خاکی", key: "‎#f0e68c", color: "Khaki", dark: false },
  { name: "خردلی", key: "‎#daa520", color: "GoldenRod", dark: false },
  { name: "خزه‌ای", key: "‎#3cb371", color: "MediumSeaGreen", dark: true },
  { name: "خزه‌ای پررنگ", key: "‎#2e8b57", color: "SeaGreen", dark: true },
  {
    name: "دودی",
    key: "‎#696969",
    color: "DimGray",
    aliasColor: ["DimGrey"],
    dark: true,
  },
  {
    name: "زرد",
    key: "‎#ffff00",
    color: "Yellow",
    alias: ["طلایی"],
    dark: false,
  },
  { name: "زرشکی", key: "‎#dc143c", color: "Crimson", dark: true },
  {
    name: "زیتونی",
    key: "‎#808000",
    color: "Olive",
    alias: ["ماشی"],
    dark: false,
  },
  { name: "زیتونی سیر", key: "‎#556b2f", color: "DarkOliveGreen", dark: true },
  { name: "سبز", key: "‎#008000", color: "Green", dark: true },
  { name: "سبز آووکادو", key: "‎#006400", color: "DarkGreen", dark: true },
  { name: "سبز ارتشی", key: "‎#6b8e23", color: "OliveDrab", dark: true },
  {
    name: "سبز دریایی",
    key: "‎#66cdaa",
    color: "MediumAquaMarine",
    dark: true,
  },
  {
    name: "سبز دریایی تیره",
    key: "‎#8fbc8f",
    color: "DarkSeaGreen",
    dark: false,
  },
  { name: "سبز دریایی روشن", key: "‎#40e0d0", color: "Turquoise", dark: false },
  { name: "سبز دودی", key: "‎#008080", color: "Teal", dark: true },
  { name: "سبز روشن", key: "‎#7fff00", color: "Chartreuse", dark: false },
  { name: "سبز لجنی", key: "‎#9acd32", color: "YellowGreen", dark: true },
  { name: "سبز چمنی", key: "‎#32cd32", color: "LimeGreen", dark: false },
  { name: "سبز کبریتی تیره", key: "‎#008b8b", color: "DarkCyan", dark: true },
  {
    name: "سبز کبریتی روشن",
    key: "‎#20b2aa",
    color: "LightSeaGreen",
    dark: true,
  },
  { name: "سبز کدر", key: "‎#90ee90", color: "LightGreen", dark: false },
  { name: "سبز کمرنگ", key: "‎#98fb98", color: "PaleGreen", dark: false },
  {
    name: "سربی",
    key: "‎#778899",
    color: "LightSlateGray",
    aliasColor: ["LightSlateGrey"],
    dark: true,
  },
  {
    name: "سربی تیره",
    key: "‎#708090",
    color: "SlateGray",
    aliasColor: ["SlateGrey"],
    dark: true,
  },
  { name: "سرخابی", key: "‎#ff00ff", color: "Magenta", dark: true },
  { name: "سرخابی", key: "‎#ff69b4", color: "HotPink", dark: true },
  { name: "سرمه‌ای", key: "‎#00008b", color: "DarkBlue", dark: true },
  { name: "سفید", key: "‎#ffffff", color: "White", dark: false },
  { name: "سفید بنفشه", key: "‎#f8f8ff", color: "GhostWhite", dark: false },
  { name: "سفید نعنائی", key: "‎#f5fffa", color: "MintCream", dark: false },
  { name: "شرابی", key: "‎#b22222", color: "FireBrick", dark: true },
  { name: "شرابی روشن", key: "‎#db7093", color: "PaleVioletRed", dark: false },
  {
    name: "شفاف",
    key: "‎#00000000",
    color: "Transparent",
    alias: ["بی رنگ"],
    dark: false,
  },
  { name: "شفقی", key: "‎#ff1493", color: "DeepPink", dark: true },
  { name: "شویدی", key: "‎#228b22", color: "ForestGreen", dark: true },
  { name: "شیرشکری", key: "‎#fffacd", color: "LemonChiffon", dark: false },
  { name: "صورتی", key: "‎#ffc0cb", color: "Pink", dark: false },
  { name: "صورتی مات", key: "‎#fff0f5", color: "LavenderBlush", dark: false },
  { name: "صورتی محو", key: "‎#fffafa", color: "Snow", dark: false },
  { name: "صورتی پررنگ", key: "‎#ffb6c1", color: "LightPink", dark: false },
  {
    name: "طوسی",
    key: "‎#a9a9a9",
    alias: ["خاکستری سیر"],
    color: "DarkGray",
    aliasColor: ["DarkGrey"],
    dark: false,
  },
  {
    name: "طوسی تیره",
    key: "‎#808080",
    color: "Gray",
    aliasColor: ["Grey"],
    alias: ["خاکستری"],
    dark: true,
  },
  {
    name: "طوسی روشن",
    key: "‎#dcdcdc",
    color: "Gainsboro",
    alias: ["خاکستری مات"],
    dark: false,
  },
  { name: "عنابی تند", key: "‎#8b0000", color: "DarkRed", dark: true },
  { name: "فیروزه‌ای", key: "‎#00ffff", color: "Aqua", dark: false },
  {
    name: "فیروزه‌ای تیره",
    key: "‎#48d1cc",
    color: "MediumTurquoise",
    dark: false,
  },
  {
    name: "فیروزه‌ای سیر",
    key: "‎#00ced1",
    color: "DarkTurquoise",
    dark: false,
  },
  { name: "فیروزه‌ای فسفری", key: "‎#4169e1", color: "RoyalBlue", dark: true },
  {
    name: "فیروزه‌ای کدر",
    key: "‎#afeeee",
    color: "PaleTurquoise",
    dark: false,
  },
  { name: "قرمز", key: "‎#ff0000", color: "Red", dark: true },
  { name: "قرمز گوجه‌ای", key: "‎#ff6347", color: "Tomato", dark: false },
  { name: "قرمز-نارنجی", key: "‎#ff4500", color: "OrangeRed", dark: false },
  { name: "قهوه‌ای", key: "‎#a52a2a", color: "Brown", dark: true },
  {
    name: "قهوه‌ای تیره",
    key: "‎#8b4513",
    alias: ["کاکائویی"],
    color: "SaddleBrown",
    dark: true,
  },
  {
    name: "قهوه‌ای روشن",
    color: "Peru",
    key: "‎#cd853f",
    alias: ["قهوه‌ای روشن"],
    dark: true,
  },
  {
    name: "قهوه‌ای متوسط",
    key: "‎#a0522d",
    color: "Sienna",
    alias: ["مسی"],
    dark: true,
  },
  { name: "قهوه‌ایِ حنایی", key: "‎#e9967a", color: "DarkSalmon", dark: true },
  { name: "لاجوردی", key: "‎#000080", color: "Navy", dark: true },
  {
    name: "لجنی تیره",
    key: "‎#2f4f4f",
    color: "DarkSlateGray",
    aliasColor: ["DarkSlateGrey"],
    dark: true,
  },
  {
    name: "لیمویی روشن",
    key: "‎#fafad2",
    color: "LightGoldenRodYellow",
    dark: false,
  },
  { name: "ماشی", key: "‎#bdb76b", color: "DarkKhaki", dark: false },
  { name: "ماشی سیر", key: "‎#b8860b", color: "DarkGoldenRod", dark: false },
  { name: "مخملی", key: "‎#8b008b", color: "DarkMagenta", dark: true },
  { name: "مشکی", color: "Black", key: "#000000", alias: ["سیاه"], dark: true },
  { name: "مغزپسته‌ای", key: "‎#adff2f", color: "GreenYellow", dark: true },
  { name: "مغزپسته‌ای", key: "‎#00ff00", color: "Lime", dark: false },
  {
    name: "مغزپسته‌ای پررنگ",
    key: "‎#7cfc00",
    color: "LawnGreen",
    dark: false,
  },
  { name: "نارنجی", key: "‎#ffa500", color: "Orange", dark: false },
  { name: "نارنجی سیر", key: "‎#ff8c00", color: "DarkOrange", dark: true },
  { name: "نارنجی پررنگ", key: "‎#ff7f50", color: "Coral", dark: true },
  { name: "نخودی", key: "‎#eee8aa", color: "PaleGoldenRod", dark: false },
  {
    name: "نقره‌ای",
    key: "‎#d3d3d3",
    color: "LightGray",
    aliasColor: ["LightGrey"],
    dark: false,
  },
  { name: "نیلی", key: "‎#1e90ff", color: "DodgerBlue", dark: true },
  { name: "نیلی سیر", key: "‎#4b0082", color: "Indigo", dark: true },
  { name: "نیلی متالیک", key: "‎#4682b4", color: "SteelBlue", dark: true },
  { name: "نیلی محو", key: "‎#f0f8ff", color: "AliceBlue", dark: false },
  { name: "نیلی کمرنگ", key: "‎#e6e6fa", color: "Lavender", dark: false },
  { name: "هلویی", key: "‎#ffe4b5", color: "Moccasin", dark: false },
  { name: "هلویی روشن", key: "‎#ffefd5", color: "PapayaWhip", dark: false },
  { name: "هلویی سیر", key: "‎#f4a460", color: "SandyBrown", dark: false },
  { name: "هلویی پررنگ", key: "‎#ffdab9", color: "PeachPuff", dark: false },
  { name: "هِلی", key: "‎#f5f5dc", color: "Beige", dark: false },
  { name: "پوست پیازی", key: "‎#fffaf0", color: "FloralWhite", dark: false },
  { name: "کاهگلی", key: "‎#ffebcd", color: "BlanchedAlmond", dark: false },
  { name: "کاهی", key: "‎#fff8dc", color: "Cornsilk", dark: false },
  {
    name: "کاکائویی",
    key: "‎#d2691e",
    color: "Chocolate",
    alias: ["عسلی پررنگ"],
    dark: true,
  },
  { name: "کتانی", key: "‎#faf0e6", color: "Linen", dark: true },
  { name: "کرم", key: "‎#ffe4c4", color: "Bisque", dark: false },
  { name: "کرم سیر", key: "‎#ffdead", color: "NavajoWhite", dark: false },
  { name: "کرم نارنجی", key: "‎#ffa07a", color: "LightSalmon", dark: false },
  {
    name: "کرمی",
    key: "‎#ffffe0",
    color: "LightYellow",
    alias: ["شیری"],
    dark: false,
  },
  { name: "کهربایی باز", key: "‎#ffd700", color: "Gold", dark: true },
  { name: "گندمی", key: "‎#f5deb3", color: "Wheat", dark: false },
  { name: "یشمی", key: "‎#7fffd4", color: "Aquamarine", dark: false },
  { name: "یشمی سیر", key: "‎#00fa9a", color: "MediumSpringGreen", dark: true },
  { name: "یشمی محو", key: "‎#f0fff0", color: "HoneyDew", dark: true },
  { name: "یشمی کمرنگ", key: "‎#00ff7f", color: "SpringGreen", dark: false },
];

export default persianColors;