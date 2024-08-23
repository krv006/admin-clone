const constants = {
  status: [
    {
      label: "Yangi, ko'rib chiqilmagan",
      value: "new",
    },
    {
      label: "Aktiv",
      value: "active",
    },
    {
      label: "Aktiv emas",
      value: "inactive",
    },
  ],
  incomeType: [
    {
      label: "Kirim",
      value: "plus",
    },
    {
      label: "Chiqim",
      value: "minus",
    },
    {
      label: "Foyda",
      value: "profit",
    },
  ],
  gender: [
    {
      label: "Erkak / O'g'il bola",
      value: "male",
    },
    {
      label: "Ayol / Qiz bola",
      value: "female",
    },
  ],
  shippingTypes: [
    {
      value: "free",
      label: "Bepul",
    },
    {
      value: "internal",
      label: "Ichida",
    },
    {
      value: "external",
      label: "Alohida",
    },
  ],
  incomeRadio: [
    {
      value: "plus",
      label: "Kirim (Maxsulot)",
    },
    {
      value: "minus",
      label: "Chiqim (Brak-Mahsulot) ",
    },
    {
      value: "profit",
      label: "Taminotchi foydasi yechildi ",
    },
  ],
  accountingTypes: [
    {
      value: "penalty",
      label: "- Shtraf -",
    },
    {
      value: "salary",
      label: "- Zarplata -",
    },
    {
      value: "deposit",
      label: "+ Deposit +",
    },
    {
      value: "expense",
      label: "- Rasxod -",
    },
  ],
  orderStatus: [
    {
      label: "Yangi",
      value: "new",
    },
    {
      label: "Dostavkaga tayyor",
      value: "accepted",
      description: "Mijoz olishga tayyor yoki qabul qilish sanasini aytdi",
    },
    {
      label: "Qayta qongiroq",
      value: "pending",
      description: "Keyin oladi, 2 marta ko'tarmadi, uchirilgan, xizmat doira",
    },
    {
      label: "Arxiv",
      value: "archived",
      description: "Noto'g'ri nomer, Dubl zayavka, otkaz qildi, olib borgan",
    },
    {
      label: "Spam",
      value: "spam",
      description: "Qora ro'yhatga kiritish, o'yin qilyapti",
    },
    {
      label: "Bekor qilingan",
      value: "canceled",
    },
  ],
  transactionStatuses: {
    new: "Yangi",
    paid: "To'langan",
    cancelled: "Bekor qilingan",
  },
  bonuses: [
    {
      label: "Yoq",
      value: 0,
    },
    {
      label: "1 ta",
      value: 1,
    },
    {
      label: "2 ta",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
    {
      label: "4",
      value: 4,
    },
    {
      label: "5",
      value: 5,
    },
  ],
  orderCount: [
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
    {
      label: "4",
      value: 4,
    },
    {
      label: "5",
      value: 5,
    },
  ],
  hours: [
    {
      value: 1,
      label: "01",
    },
    {
      value: 2,
      label: "02",
    },
    {
      value: 3,
      label: "03",
    },
    {
      value: 4,
      label: "04",
    },
    {
      value: 5,
      label: "05",
    },
    {
      value: 6,
      label: "06",
    },
    {
      value: 7,
      label: "07",
    },
    {
      value: 8,
      label: "08",
    },
    {
      value: 9,
      label: "09",
    },
    {
      value: 10,
      label: 10,
    },
    {
      value: 11,
      label: 11,
    },
    {
      value: 12,
      label: 12,
    },
    {
      value: 13,
      label: 13,
    },
    {
      value: 14,
      label: 14,
    },
    {
      value: 15,
      label: 15,
    },
    {
      value: 16,
      label: 16,
    },
    {
      value: 17,
      label: 17,
    },
    {
      value: 18,
      label: 18,
    },
    {
      value: 19,
      label: 19,
    },
    {
      value: 20,
      label: 20,
    },
    {
      value: 21,
      label: 21,
    },
    {
      value: 22,
      label: 22,
    },
    {
      value: 23,
      label: 23,
    },
    {
      value: 24,
      label: 24,
    },
  ],
  colors: [
    "rgb(149, 183, 83)",
    "rgb(204, 51, 0)",
    "rgb(229, 169, 26)",
    "rgb(51, 102, 255)",
    "rgb(255, 15, 0)",
    "rgb(255, 102, 0)",
    "rgb(255, 158, 1)",
    "rgb(252, 210, 2)",
    "rgb(248, 255, 1)",
  ],
  videoTypes: ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "3gp", "mpg", "mpeg", "m4v"],
  audioTypes: ["mp3", "wav", "ogg", "m4a", "wma", "flac", "aac", "aiff", "alac", "pcm", "dsd"],
  wordTypes: ["doc", "docx"],
  excelTypes: ["xls", "xlsx"],
  imageTypes: ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"],
  archiveTypes: ["zip", "rar", "7z", "tar", "gz", "gzip", "tgz", "bz2", "bzip2", "xz", "z"],
  statusesLabel: {
    new: "Yangi",
    draft: "Yangi",
    sent: "yetqazilmoqda",
    delivered: "yetqazib berildi",
    cancelled: "Qaytib keldi",
  },
}

export default constants
