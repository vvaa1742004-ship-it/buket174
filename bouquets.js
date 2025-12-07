// просто вынести то, что у тебя сейчас в server.js
const bouquets = [
  {
    "id": 1,
    "name": "Букет 1",
    "price": 4599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_5_2025_02_05_14_28_19.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_922.html"
  },
  {
    "id": 2,
    "name": "Букет 2",
    "price": 2799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_3_2025_02_05_13_30_29.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_920.html"
  },
  {
    "id": 3,
    "name": "Букет 3",
    "price": 5299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_20250131_145950_edit_770348124192957.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_917.html"
  },
  {
    "id": 4,
    "name": "Букет 4",
    "price": 8499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg369494029_84683.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_910.html"
  },
  {
    "id": 5,
    "name": "Букет 5",
    "price": 4799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg369494029_84678.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_909.html"
  },
  {
    "id": 6,
    "name": "Букет 6",
    "price": 3299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg369494029_84675.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_908.html"
  },
  {
    "id": 7,
    "name": "Букет 7",
    "price": 5199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP152_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_906.html"
  },
  {
    "id": 8,
    "name": "Букет 8",
    "price": 55796199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP147_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_905.html"
  },
  {
    "id": 9,
    "name": "Букет 9",
    "price": 9899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP146_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_904.html"
  },
  {
    "id": 10,
    "name": "Букет 10",
    "price": 1070911899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP140_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_903.html"
  },
  {
    "id": 11,
    "name": "Букет 11",
    "price": 42294699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP122_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_902.html"
  },
  {
    "id": 12,
    "name": "Букет 12",
    "price": 8499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP115_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_899.html"
  },
  {
    "id": 13,
    "name": "Букет 13",
    "price": 6499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP079_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_898.html"
  },
  {
    "id": 14,
    "name": "Букет 14",
    "price": 5499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP070_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_897.html"
  },
  {
    "id": 15,
    "name": "Букет 15",
    "price": 4999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP066_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_896.html"
  },
  {
    "id": 16,
    "name": "Букет 16",
    "price": 1088912099,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP058_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_895.html"
  },
  {
    "id": 17,
    "name": "Букет 17",
    "price": 1151912799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP059_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_894.html"
  },
  {
    "id": 18,
    "name": "Букет 18",
    "price": 8099,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP055_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_893.html"
  },
  {
    "id": 19,
    "name": "Букет 19",
    "price": 1025911399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP044_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_892.html"
  },
  {
    "id": 20,
    "name": "Букет 20",
    "price": 10699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP042_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_891.html"
  },
  {
    "id": 21,
    "name": "Букет 21",
    "price": 1070911899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP039_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_890.html"
  },
  {
    "id": 22,
    "name": "Букет 22",
    "price": 1709918999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP030_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_889.html"
  },
  {
    "id": 23,
    "name": "Букет 23",
    "price": 1808920099,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP024_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_888.html"
  },
  {
    "id": 24,
    "name": "Букет 24",
    "price": 1817920199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP011_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_887.html"
  },
  {
    "id": 25,
    "name": "Букет 25",
    "price": 13099,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHOP005_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_886.html"
  },
  {
    "id": 26,
    "name": "Букет 26",
    "price": 44094899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_005_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_877.html"
  },
  {
    "id": 27,
    "name": "Букет 27",
    "price": 5899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_10_2025_02_04_15_14_41.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_874.html"
  },
  {
    "id": 28,
    "name": "Букет 28",
    "price": 35993999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_028_resized_0.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_870.html"
  },
  {
    "id": 29,
    "name": "Букет 29",
    "price": 7299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_034_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_867.html"
  },
  {
    "id": 30,
    "name": "Букет 30",
    "price": 22492499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_83971.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_865.html"
  },
  {
    "id": 31,
    "name": "Букет 31",
    "price": 3199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_039_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_864.html"
  },
  {
    "id": 32,
    "name": "Букет 32",
    "price": 44994999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_baltika_15_55h40_3.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_732.html"
  },
  {
    "id": 33,
    "name": "Букет 33",
    "price": 35993999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_629711111.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_729.html"
  },
  {
    "id": 34,
    "name": "Букет 34",
    "price": 50395599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6298.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_728.html"
  },
  {
    "id": 35,
    "name": "Букет 35",
    "price": 34193799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_727_1_.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_727.html"
  },
  {
    "id": 36,
    "name": "Букет 36",
    "price": 57596399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6301.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_722.html"
  },
  {
    "id": 37,
    "name": "Букет 37",
    "price": 2499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6272_0.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_721.html"
  },
  {
    "id": 38,
    "name": "Букет 38",
    "price": 2599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6381.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_720.html"
  },
  {
    "id": 39,
    "name": "Букет 39",
    "price": 53995999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_68106.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_719.html"
  },
  {
    "id": 40,
    "name": "Букет 40",
    "price": 3399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_049_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_717.html"
  },
  {
    "id": 41,
    "name": "Букет 41",
    "price": 4299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_51081.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_715.html"
  },
  {
    "id": 42,
    "name": "Букет 42",
    "price": 3499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_68323.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_714.html"
  },
  {
    "id": 43,
    "name": "Букет 43",
    "price": 1599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_68480.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_713.html"
  },
  {
    "id": 44,
    "name": "Букет 44",
    "price": 53995999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_68115.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_710.html"
  },
  {
    "id": 45,
    "name": "Букет 45",
    "price": 28793199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_5_2025_01_31_11_04_16.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_708.html"
  },
  {
    "id": 46,
    "name": "Букет 46",
    "price": 4999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_5_2025_01_31_11_10_03.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_707.html"
  },
  {
    "id": 47,
    "name": "Букет 47",
    "price": 3499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6911.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_706.html"
  },
  {
    "id": 48,
    "name": "Букет 48",
    "price": 2599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6359.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_705.html"
  },
  {
    "id": 49,
    "name": "Букет 49",
    "price": 5299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_053_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_704.html"
  },
  {
    "id": 50,
    "name": "Букет 50",
    "price": 3699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6931.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_703.html"
  },
  {
    "id": 51,
    "name": "Букет 51",
    "price": 5899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_099_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_699.html"
  },
  {
    "id": 52,
    "name": "Букет 52",
    "price": 3799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6380.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_696.html"
  },
  {
    "id": 53,
    "name": "Букет 53",
    "price": 4299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_62880.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_695.html"
  },
  {
    "id": 54,
    "name": "Букет 54",
    "price": 2999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_62885.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_694.html"
  },
  {
    "id": 55,
    "name": "Букет 55",
    "price": 7899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_64353.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_688.html"
  },
  {
    "id": 56,
    "name": "Букет 56",
    "price": 5999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_2K_1_.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_687.html"
  },
  {
    "id": 57,
    "name": "Букет 57",
    "price": 53995999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_1K_2_.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_686.html"
  },
  {
    "id": 58,
    "name": "Букет 58",
    "price": 2899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_68366.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_684.html"
  },
  {
    "id": 59,
    "name": "Букет 59",
    "price": 5199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_71949.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_683.html"
  },
  {
    "id": 60,
    "name": "Букет 60",
    "price": 4699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6248.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_681.html"
  },
  {
    "id": 61,
    "name": "Букет 61",
    "price": 40494499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6245.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_679.html"
  },
  {
    "id": 62,
    "name": "Букет 62",
    "price": 3699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_wedF_037.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_678.html"
  },
  {
    "id": 63,
    "name": "Букет 63",
    "price": 5299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_wedF_103.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_677.html"
  },
  {
    "id": 64,
    "name": "Букет 64",
    "price": 3999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_wedF_092.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_676.html"
  },
  {
    "id": 65,
    "name": "Букет 65",
    "price": 4599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_7_2.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_652.html"
  },
  {
    "id": 66,
    "name": "Букет 66",
    "price": 4899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_64358.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_651.html"
  },
  {
    "id": 67,
    "name": "Букет 67",
    "price": 4899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_64363.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_650.html"
  },
  {
    "id": 68,
    "name": "Букет 68",
    "price": 4499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_64365_0.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_649.html"
  },
  {
    "id": 69,
    "name": "Букет 69",
    "price": 2599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_066_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_639.html"
  },
  {
    "id": 70,
    "name": "Букет 70",
    "price": 3699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_62782.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_638.html"
  },
  {
    "id": 71,
    "name": "Букет 71",
    "price": 4999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_71956.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_635.html"
  },
  {
    "id": 72,
    "name": "Букет 72",
    "price": 44994999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_68782.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_631.html"
  },
  {
    "id": 73,
    "name": "Букет 73",
    "price": 48595399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_70534.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_628.html"
  },
  {
    "id": 74,
    "name": "Букет 74",
    "price": 3199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_70883.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_626.html"
  },
  {
    "id": 75,
    "name": "Букет 75",
    "price": 19799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_111_1.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_619.html"
  },
  {
    "id": 76,
    "name": "Букет 76",
    "price": 35093899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_72704.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_614.html"
  },
  {
    "id": 77,
    "name": "Букет 77",
    "price": 5399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_71462.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_613.html"
  },
  {
    "id": 78,
    "name": "Букет 78",
    "price": 32393599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_71960.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_612.html"
  },
  {
    "id": 79,
    "name": "Букет 79",
    "price": 6599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_71927.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_610.html"
  },
  {
    "id": 80,
    "name": "Букет 80",
    "price": 23392599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_72707.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_609.html"
  },
  {
    "id": 81,
    "name": "Букет 81",
    "price": 35093899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_72720.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_601.html"
  },
  {
    "id": 82,
    "name": "Букет 82",
    "price": 23392599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_72717.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_599.html"
  },
  {
    "id": 83,
    "name": "Букет 83",
    "price": 2999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_1A_2_.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_598.html"
  },
  {
    "id": 84,
    "name": "Букет 84",
    "price": 40494499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6222.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_597.html"
  },
  {
    "id": 85,
    "name": "Букет 85",
    "price": 38694299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6219.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_596.html"
  },
  {
    "id": 86,
    "name": "Букет 86",
    "price": 32393599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_1G_1_.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_595.html"
  },
  {
    "id": 87,
    "name": "Букет 87",
    "price": 5199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_7_2023_06_08_09_32_15.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_567.html"
  },
  {
    "id": 88,
    "name": "Букет 88",
    "price": 4499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_1_2025_08_05_06_38_14.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_564.html"
  },
  {
    "id": 89,
    "name": "Букет 89",
    "price": 2999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_078_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_561.html"
  },
  {
    "id": 90,
    "name": "Букет 90",
    "price": 3799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_3_2023_06_14_08_53_43.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_558.html"
  },
  {
    "id": 91,
    "name": "Букет 91",
    "price": 2599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_10_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_551.html"
  },
  {
    "id": 92,
    "name": "Букет 92",
    "price": 39999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_1_2025_07_23_12_14_35.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_550.html"
  },
  {
    "id": 93,
    "name": "Букет 93",
    "price": 2799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_14_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_549.html"
  },
  {
    "id": 94,
    "name": "Букет 94",
    "price": 2899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_77324.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_548.html"
  },
  {
    "id": 95,
    "name": "Букет 95",
    "price": 2999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_2025_05_21_12_06_10.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_525.html"
  },
  {
    "id": 96,
    "name": "Букет 96",
    "price": 9999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_1_2025_07_23_12_04_03.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_524.html"
  },
  {
    "id": 97,
    "name": "Букет 97",
    "price": 2699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_083_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_523.html"
  },
  {
    "id": 98,
    "name": "Букет 98",
    "price": 4299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_77437.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_522.html"
  },
  {
    "id": 99,
    "name": "Букет 99",
    "price": 3899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_4_2025_01_31_11_15_31.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_513.html"
  },
  {
    "id": 100,
    "name": "Букет 100",
    "price": 3499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_1650077.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_511.html"
  },
  {
    "id": 101,
    "name": "Букет 101",
    "price": 5199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHV012.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_510.html"
  },
  {
    "id": 102,
    "name": "Букет 102",
    "price": 4299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_1_2025_01_31_11_22_17.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_502.html"
  },
  {
    "id": 103,
    "name": "Букет 103",
    "price": 3299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_5_2025_01_31_11_31_38.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_498.html"
  },
  {
    "id": 104,
    "name": "Букет 104",
    "price": 7599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHV024.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_497.html"
  },
  {
    "id": 105,
    "name": "Букет 105",
    "price": 5199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_1650144.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_496.html"
  },
  {
    "id": 106,
    "name": "Букет 106",
    "price": 57596399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_5_2025_06_05_11_08_03.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_495.html"
  },
  {
    "id": 107,
    "name": "Букет 107",
    "price": 4399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_4f1804cd84e5462a7f188ca60b2f794b.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_490.html"
  },
  {
    "id": 108,
    "name": "Букет 108",
    "price": 8399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_7.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_489.html"
  },
  {
    "id": 109,
    "name": "Букет 109",
    "price": 4899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_76ce8d9f1a0fae6a8717ba98f065933c.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_488.html"
  },
  {
    "id": 110,
    "name": "Букет 110",
    "price": 6599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_2020_08_20_18_07_27_1602140723773s.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_486.html"
  },
  {
    "id": 111,
    "name": "Букет 111",
    "price": 6199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_3820_Buket_nevesty_iz_roz_i_frezij.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_485.html"
  },
  {
    "id": 112,
    "name": "Букет 112",
    "price": 4799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_buket_nevesty7_600x600.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_484.html"
  },
  {
    "id": 113,
    "name": "Букет 113",
    "price": 7800,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_buket_nevesty23_min_600x600.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_483.html"
  },
  {
    "id": 114,
    "name": "Букет 114",
    "price": 6350,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_wedF_088.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_482.html"
  },
  {
    "id": 115,
    "name": "Букет 115",
    "price": 6910,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_wedF_079.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_481.html"
  },
  {
    "id": 116,
    "name": "Букет 116",
    "price": 8150,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_c3341c7a0edd7fbc3abf114a35026794.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_480.html"
  },
  {
    "id": 117,
    "name": "Букет 117",
    "price": 8570,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_wedF_071.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_479.html"
  },
  {
    "id": 118,
    "name": "Букет 118",
    "price": 6199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_wedF_062.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_478.html"
  },
  {
    "id": 119,
    "name": "Букет 119",
    "price": 4099,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_wedF_051.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_477.html"
  },
  {
    "id": 120,
    "name": "Букет 120",
    "price": 5700,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_wedF_056.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_474.html"
  },
  {
    "id": 121,
    "name": "Букет 121",
    "price": 4399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_wedF_095.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_473.html"
  },
  {
    "id": 122,
    "name": "Букет 122",
    "price": 17559,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHV003.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_471.html"
  },
  {
    "id": 123,
    "name": "Букет 123",
    "price": 5399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHV138.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_469.html"
  },
  {
    "id": 124,
    "name": "Букет 124",
    "price": 22492499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_2_2025_06_05_11_32_27.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_466.html"
  },
  {
    "id": 125,
    "name": "Букет 125",
    "price": 40494499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_CHV136.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_465.html"
  },
  {
    "id": 126,
    "name": "Букет 126",
    "price": 2699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_160994.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_463.html"
  },
  {
    "id": 127,
    "name": "Букет 127",
    "price": 3799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_24_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_461.html"
  },
  {
    "id": 128,
    "name": "Букет 128",
    "price": 5199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_30_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_460.html"
  },
  {
    "id": 129,
    "name": "Букет 129",
    "price": 3199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_37_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_459.html"
  },
  {
    "id": 130,
    "name": "Букет 130",
    "price": 3199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_43_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_454.html"
  },
  {
    "id": 131,
    "name": "Букет 131",
    "price": 2599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_160997.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_451.html"
  },
  {
    "id": 132,
    "name": "Букет 132",
    "price": 3599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_49_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_450.html"
  },
  {
    "id": 133,
    "name": "Букет 133",
    "price": 8999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_3_2025_05_14_13_29_48.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_445.html"
  },
  {
    "id": 134,
    "name": "Букет 134",
    "price": 5899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_4_2025_05_14_13_36_49.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_444.html"
  },
  {
    "id": 135,
    "name": "Букет 135",
    "price": 3499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_59_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_443.html"
  },
  {
    "id": 136,
    "name": "Букет 136",
    "price": 4199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_65_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_442.html"
  },
  {
    "id": 137,
    "name": "Букет 137",
    "price": 2699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_69_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_441.html"
  },
  {
    "id": 138,
    "name": "Букет 138",
    "price": 2799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_85_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_438.html"
  },
  {
    "id": 139,
    "name": "Букет 139",
    "price": 2699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_92_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_437.html"
  },
  {
    "id": 140,
    "name": "Букет 140",
    "price": 20692299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_99_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_436.html"
  },
  {
    "id": 141,
    "name": "Букет 141",
    "price": 1599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_115_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_434.html"
  },
  {
    "id": 142,
    "name": "Букет 142",
    "price": 25192799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_126_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_433.html"
  },
  {
    "id": 143,
    "name": "Букет 143",
    "price": 34193799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_132_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_432.html"
  },
  {
    "id": 144,
    "name": "Букет 144",
    "price": 3599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_141_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_431.html"
  },
  {
    "id": 145,
    "name": "Букет 145",
    "price": 32393599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_149_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_430.html"
  },
  {
    "id": 146,
    "name": "Букет 146",
    "price": 29693299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_167_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_428.html"
  },
  {
    "id": 147,
    "name": "Букет 147",
    "price": 3499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_165004.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_330.html"
  },
  {
    "id": 148,
    "name": "Букет 148",
    "price": 24292699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_176_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_327.html"
  },
  {
    "id": 149,
    "name": "Букет 149",
    "price": 2699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_185_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_326.html"
  },
  {
    "id": 150,
    "name": "Букет 150",
    "price": 4599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_95730.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_303.html"
  },
  {
    "id": 151,
    "name": "Букет 151",
    "price": 188289209209,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_95710.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_299.html"
  },
  {
    "id": 152,
    "name": "Букет 152",
    "price": 19799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_760536b3_8fed_47f3_9d96_2a0c51944035.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_297.html"
  },
  {
    "id": 153,
    "name": "Букет 153",
    "price": 1979921999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_2025_10_12_20_38_57.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_283.html"
  },
  {
    "id": 154,
    "name": "Букет 154",
    "price": 10999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_d9e358cf_8bce_4d11_8cea_80cc62513490.jpeg",
    "url": "https://kupibuket74.ru/bukety/bukety_280.html"
  },
  {
    "id": 155,
    "name": "Букет 155",
    "price": 3799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_161003.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_277.html"
  },
  {
    "id": 156,
    "name": "Букет 156",
    "price": 5599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_161007.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_272.html"
  },
  {
    "id": 157,
    "name": "Букет 157",
    "price": 3199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_1_2025_06_04_11_01_03.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_269.html"
  },
  {
    "id": 158,
    "name": "Букет 158",
    "price": 4599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_6_2025_10_14_23_16_49.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_265.html"
  },
  {
    "id": 159,
    "name": "Букет 159",
    "price": 4699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_DSC_0087_min.JPG",
    "url": "https://kupibuket74.ru/bukety/bukety_234.html"
  },
  {
    "id": 160,
    "name": "Букет 160",
    "price": 4699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_1650000.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_227.html"
  },
  {
    "id": 161,
    "name": "Букет 161",
    "price": 4699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_6_2025_02_12_10_51_05.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_925.html"
  },
  {
    "id": 162,
    "name": "Букет 162",
    "price": 2999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_006_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_876.html"
  },
  {
    "id": 163,
    "name": "Букет 163",
    "price": 2399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_023_resized_0.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_872.html"
  },
  {
    "id": 164,
    "name": "Букет 164",
    "price": 3699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_bakardi_9_50h40_2.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_730.html"
  },
  {
    "id": 165,
    "name": "Букет 165",
    "price": 4999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_bakardi_15_55h65_4.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_726.html"
  },
  {
    "id": 166,
    "name": "Букет 166",
    "price": 7399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_68329.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_725.html"
  },
  {
    "id": 167,
    "name": "Букет 167",
    "price": 2799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_042_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_724.html"
  },
  {
    "id": 168,
    "name": "Букет 168",
    "price": 7199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_68336.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_718.html"
  },
  {
    "id": 169,
    "name": "Букет 169",
    "price": 3299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_057_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_702.html"
  },
  {
    "id": 170,
    "name": "Букет 170",
    "price": 1499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_62851.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_700.html"
  },
  {
    "id": 171,
    "name": "Букет 171",
    "price": 5499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6941.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_693.html"
  },
  {
    "id": 172,
    "name": "Букет 172",
    "price": 5499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_6949.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_692.html"
  },
  {
    "id": 173,
    "name": "Букет 173",
    "price": 3299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_63907.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_691.html"
  },
  {
    "id": 174,
    "name": "Букет 174",
    "price": 32393599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_63886.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_690.html"
  },
  {
    "id": 175,
    "name": "Букет 175",
    "price": 2299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_061_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_689.html"
  },
  {
    "id": 176,
    "name": "Букет 176",
    "price": 51295699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_78317.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_685.html"
  },
  {
    "id": 177,
    "name": "Букет 177",
    "price": 3999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_9_1.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_659.html"
  },
  {
    "id": 178,
    "name": "Букет 178",
    "price": 44994999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_68762.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_632.html"
  },
  {
    "id": 179,
    "name": "Букет 179",
    "price": 2399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_68788.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_630.html"
  },
  {
    "id": 180,
    "name": "Букет 180",
    "price": 3599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_074_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_629.html"
  },
  {
    "id": 181,
    "name": "Букет 181",
    "price": 4399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_71476.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_622.html"
  },
  {
    "id": 182,
    "name": "Букет 182",
    "price": 2399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_Flw_070_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_592.html"
  },
  {
    "id": 183,
    "name": "Букет 183",
    "price": 73798199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_6_1__0.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_571.html"
  },
  {
    "id": 184,
    "name": "Букет 184",
    "price": 1151912799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_6_2023_06_08_09_24_40.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_570.html"
  },
  {
    "id": 185,
    "name": "Букет 185",
    "price": 4999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_5_2023_06_14_08_53_43.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_553.html"
  },
  {
    "id": 186,
    "name": "Букет 186",
    "price": 3699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_1_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_552.html"
  },
  {
    "id": 187,
    "name": "Букет 187",
    "price": 38694299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_3_2025_06_05_11_13_16.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_470.html"
  },
  {
    "id": 188,
    "name": "Букет 188",
    "price": 3799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_4_2025_06_05_11_19_15.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_468.html"
  },
  {
    "id": 189,
    "name": "Букет 189",
    "price": 2499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_4_2025_06_05_11_23_49.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_467.html"
  },
  {
    "id": 190,
    "name": "Букет 190",
    "price": 3599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_76_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_439.html"
  },
  {
    "id": 191,
    "name": "Букет 191",
    "price": 2299,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_107_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_435.html"
  },
  {
    "id": 192,
    "name": "Букет 192",
    "price": 23392599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_158_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_429.html"
  },
  {
    "id": 193,
    "name": "Букет 193",
    "price": 3799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_194_resized.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_325.html"
  },
  {
    "id": 194,
    "name": "Букет 194",
    "price": 4699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_95711.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_315.html"
  },
  {
    "id": 195,
    "name": "Букет 195",
    "price": 3199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_95723.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_314.html"
  },
  {
    "id": 196,
    "name": "Букет 196",
    "price": 4099,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_95728.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_310.html"
  },
  {
    "id": 197,
    "name": "Букет 197",
    "price": 5699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_7fb85b57_7cb3_4d3c_9fb5_c27911a787f8.jpeg",
    "url": "https://kupibuket74.ru/bukety/bukety_278.html"
  },
  {
    "id": 198,
    "name": "Букет 198",
    "price": 2399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_164991.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_271.html"
  },
  {
    "id": 199,
    "name": "Букет 199",
    "price": 3999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_1649978.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_270.html"
  },
  {
    "id": 200,
    "name": "Букет 200",
    "price": 2499,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_4_2025_06_04_11_01_03.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_267.html"
  },
  {
    "id": 201,
    "name": "Букет 201",
    "price": 3999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_86992.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_133.html"
  },
  {
    "id": 202,
    "name": "Букет 202",
    "price": 2799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_msg5246846366_86987.jpg",
    "url": "https://kupibuket74.ru/bukety/garmoniya.html"
  },
  {
    "id": 203,
    "name": "Букет 203",
    "price": 4999,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_3_2025_10_31_09_08_09.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_948.html"
  },
  {
    "id": 204,
    "name": "Букет 204",
    "price": 5199,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_2_2025_10_31_08_58_30.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_946.html"
  },
  {
    "id": 205,
    "name": "Букет 205",
    "price": 3399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_3_2025_10_30_23_39_18.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_943.html"
  },
  {
    "id": 206,
    "name": "Букет 206",
    "price": 15599,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_2_2025_02_12_11_05_06.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_926.html"
  },
  {
    "id": 207,
    "name": "Букет 207",
    "price": 10699,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_3_2025_02_11_14_18_34.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_924.html"
  },
  {
    "id": 208,
    "name": "Букет 208",
    "price": 6799,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_3_2025_02_05_13_54_12.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_921.html"
  },
  {
    "id": 209,
    "name": "Букет 209",
    "price": 3899,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_photo_1_2025_02_04_14_56_35.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_919.html"
  },
  {
    "id": 210,
    "name": "Букет 210",
    "price": 6099,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_IMG_9805am.jpeg",
    "url": "https://kupibuket74.ru/bukety/bukety_918.html"
  },
  {
    "id": 211,
    "name": "Букет 211",
    "price": 3399,
    "currency": "₽",
    "imageUrl": "https://kupibuket74.ru/netcat_files/5/22/preview_0000.jpg",
    "url": "https://kupibuket74.ru/bukety/bukety_916.html"
  }

];

module.exports = { bouquets };