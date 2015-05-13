'use strict';
/* jshint devel:true */
//console.log('\'Allo \'Allo!');

var filter = {
    'Human Development Index':['Very high human development','High human development', 'Medium human development', 'Low human development'],
    'Population':['high population','very high population','upper medium population','lower medium population','low population','very low population'],
    'FOAI Exists':['All', 'YES' , 'NO'],
    'System of internal governance':['Unitary state','Unitary monarchy','Federal state','Regionalised unitary state','Regionalised unitary monarchy'],
    'System of governance':['Full presidential system','Parliamentary republic','Semi-presidential system','Constitutional monarchy with ceremonial monarch','Full presidential system with a prime minister','Constitutional monarchy with active monarch','Mixed republican system','Absolute monarchy','Single Party States','Transitional states','Theocracy','Directorial system','Military junta'],
    'Fragile State':['All', 'YES' , 'NO'],
    'OGP Senior leadership':['All', 'YES' , 'NO'],
    'g20 member':['All', 'YES' , 'NO'],
    'g7 member':['All', 'YES' , 'NO'],
    'World bank lending group':['High-income economies ($12,616 or more)','Upper-middle-income economies ($4,086 to $12,615)','Lower-middle-income economies ($1,036 to $4,085)','Low-income-economies ($ 1.035 or less)'],
    'Region':['Europe','North America','Middle America & Caribbean','South America','Middle East and North Africa','Sub-Saharan Africa','Central Asia','East Asia and Pacific','South Asia'],
    'Languages':['Afrikaans','Albanian','Amharic','Arabic','Armenian','Aymara','Azerbaijani','Belarusian','Bengali','Bislama','Bosnian','Bulgarian','Burmese','Cantonese','Carolinian','Catalan','Chamorro','Chewa','Chichewa','Chinese','Comorian','Coptic','Croatian','Czech','Danish','Dari','Dhiwehi','Dutch','Dzongkha','English','Estonian','Faroese','Fijian','Filipino','Finnish','French','Fula','Georgian','German','Greek','Guaraní','Guernésiais','Gujarati','HaitianCreole','Hausa','Hebrew','Hindi','HiriMoto','Hungarian','Icelandic','Igbo','Indonesian','Irish','Italian','Japanese','Jèrriais','Kalasllisut','Kannada','Kazakh','Khmer','Kinyarwanda','Kirghiz','Kiribati','Kirundi','Korean','Kosraean','Kurdish','Lao','Latin','Latvian','Lithuanian','Luxembourgish','Macedonian','Malagasy','Malay','Malayalam','Malaysian','Maltese','Mandarin','Manx','Maori','Marathi','Marshallese','Mongolian','Montenegrin','Nauruan','Nepali','Niuean','Norwegian','Orija','Oromo','Palauan','Papiamento','Pashto','Persian','Polish','Portuguese','Punjabi','Quechua','Romanian','Romansh','Russian','Samoan','Scots','Scottish Gaelic','Serbian','Shona','Sinhala','Slovak','Slovene','Somali','Sotho','Spanish','Swahili','Swazi','Swedish','Taiwanese','Tajik','Tamazight','Tamil','Tetum','Thai','Tigrinya','TokPisin','Tokelauan','Tongan','Turkish','Turkmen','Tuvaluan','Ukrainian','Urdu','Uzbek','Vietnamese','WestFrisian','Xhosa','Yoruba','Zulu']
}


// // TODO: Check validity of region and language data
// High-income economies ($12,616 or more) - 44
// Upper-middle-income economies ($4,086 to $12,615) - 32
// Lower-middle-income economies ($1,036 to $4,085) - 28
// Low-income-economies ($ 1.035 or less) - 22
