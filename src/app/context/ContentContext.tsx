import React, { createContext, useContext, useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

const BASE_ROOM = "https://www.teymurcontinentalhotel.com/panel/uploads/rooms_v/original/";
const BASE_PROD = "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/";
const BASE_HALL = "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/";

export interface Room {
  id: number;
  slug: string;
  title: string;
  guests: string;
  size: string;
  bed: string;
  desc: string;
  imgs: string[];
}

export interface DiningVenue {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  guests: string;
  type: string;
  feature: string;
  desc: string;
  imgs: string[];
}

export interface ConventionHall {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  capacity: string;
  area: string;
  type: string;
  desc: string;
  imgs: string[];
}

export interface SiteContent {
  global: {
    hotelName: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    social: {
      instagram: string;
      facebook: string;
      twitter: string;
      youtube: string;
      linkedin: string;
    };
    logoUrl: string;
    reservationUrl: string;
  };
  home: {
    heroPoster: string;
    heroVideoUrl: string;
    heroVideoUrl2: string;
    heroName: string;
    heroSubName: string;
    heroCity: string;
    heroTitle: string;
    heroSubtitle: string;
    roomsTitle: string;
    roomsDesc: string;
    roomsPreview: { name: string; slug: string; imgs: string[] }[];
    experienceItems: { eyebrow: string; title: string; titleAccent: string; desc: string; cta: string; image: string; link: string }[];
    galleryImages: { src: string; w: string }[];
    aboutTeaserTitle: string;
    aboutTeaserTitleAccent: string;
    aboutTeaserDesc: string;
    aboutTeaserImg: string;
    aboutTeaserStat1n: string;
    aboutTeaserStat1l: string;
    aboutTeaserStat2n: string;
    aboutTeaserStat2l: string;
    finalCtaTitle1: string;
    finalCtaTitle2: string;
    finalCtaImg: string;
    testimonials: { text: string; author: string; city: string }[];
    experience360Title: string;
    experience360Subtitle: string;
    experience360PreviewImg: string;
    experience360IframeUrl: string;
  };
  about: {
    heroImages: string[];
    heroTitle: string;
    heroText1: string;
    heroText2: string;
    heroImg: string;
    storyLabel: string;
    storyTitle: string;
    storyText1: string;
    storyText2: string;
    storyImg: string;
    services: {
      title: string;
      desc: string;
      link: string;
      linkText: string;
      img: string;
    }[];
    visionTitle: string;
    visionTexts: string[];
    missionTitle: string;
    missionTexts: string[];
  };
  rooms: Room[];
  dining: DiningVenue[];
  halls: ConventionHall[];
  wellness: {
    heroTitle: string;
    heroImg: string;
    galleryItems: { img: string; category: string; title: string; desc: string }[];
    otherServices: { slug: string; title: string; img: string }[];
  };
  spa: {
    heroTitle: string;
    heroImgs: string[];
    sections: { label: string; title: string; desc: string; hours: string; imgs: string[] }[];
  };
  fitness: {
    heroTitle: string;
    heroImgs: string[];
    sections: { label: string; title: string; desc: string; hours: string; imgs: string[] }[];
  };
  contact: {
    heroTitle: string;
    heroImg: string;
    infoTitle: string;
    formTitle: string;
    address: string;
    phone1: string;
    phone2: string;
    email: string;
    receptionHours: string;
    mapUrl: string;
    subjectOptions: { value: string; label: string }[];
    submitButtonText: string;
  };
  career: {
    heroTitle: string;
    heroSubtitle: string;
    heroImg: string;
    introTitle: string;
    introDesc: string;
    positions: { id: string; title: string; department: string; type: string; location: string }[];
    submitButtonText: string;
  };
  gaziantep: {
    heroTitle: string;
    heroSubtitle: string;
    heroImgs: string[];
    introTitle: string;
    introDesc: string;
    stats: { num: string; label: string }[];
    gastronomyLabel: string;
    gastronomyTitle: string;
    gastronomyDesc: string;
    gastronomyImgs: string[];
    baklavaLabel: string;
    baklavaTitle: string;
    baklavaDesc: string;
    baklavaImgs: string[];
    attractions: { title: string; period: string; distance: string; desc: string; img: string; category: string }[];
    attractionsTitle: string;
  };
  gallery: {
    heroImg: string;
    heroTitle: string;
    photos: { src: string; cat: string }[];
    videos: { embedId: string; thumb: string; title: string }[];
  };
  footer: {
    description: string;
    copyright: string;
    certTitle: string;
    certSubtitle: string;
    certModalTitle: string;
    certModalBody: string;
  };
  nav: {
    items: {
      id: string;
      labelTr: string; labelEn: string; labelAr: string;
      href: string;
      side: "left" | "right";
      dropdown?: {
        headingTr: string; headingEn: string; headingAr: string;
        descTr: string; descEn: string; descAr: string;
        viewAllTr: string; viewAllEn: string; viewAllAr: string;
        viewAllHref: string;
        photos: { src: string; labelTr: string; labelEn: string; labelAr: string; href: string }[];
      };
    }[];
  };
  translations: {
    en: Record<string, string>;
    ar: Record<string, string>;
  };
}

const DEFAULT_CONTENT: SiteContent = {
  global: {
    hotelName: "Teymur Continental Hotel",
    tagline: "Gaziantep'in kalbinde, zamansız lüks ve köklü kültürün buluştuğu eşsiz bir adres.",
    phone: "+90 342 999 1111",
    email: "info@teymurcontinental.com",
    address: "Mücahitler Mah. Kudüs Cad. No:31\n27090 Şehitkamil / Gaziantep",
    social: {
      instagram: "https://instagram.com/teymurcontinental",
      facebook: "https://facebook.com/teymurcontinental",
      twitter: "https://x.com/teymurcontinental",
      youtube: "https://youtube.com/@teymurcontinental",
      linkedin: "https://linkedin.com/company/teymurcontinental",
    },
    logoUrl: "/otellogo.png",
    reservationUrl: "https://teymur-continental-hotel.hotelrunner.com/bv3/search",
  },
  home: {
    heroPoster: "https://images.unsplash.com/photo-1742844552700-3926862c5311?w=1920&q=85&fit=crop",
    heroVideoUrl: "https://videos.pexels.com/video-files/3843436/3843436-hd_1920_1080_30fps.mp4",
    heroVideoUrl2: "https://videos.pexels.com/video-files/3065209/3065209-hd_1920_1080_25fps.mp4",
    heroName: "TEYMUR CONTINENTAL",
    heroSubName: "HOTEL & CONVENTION CENTER",
    heroCity: "GAZIANTEP",
    heroTitle: "Gaziantep'in Kalbinde Beş Yıldızlı Lüks",
    heroSubtitle: "Tarihi İpekyolu'nun lezzet ve kültür başkentinde, modern konforu geleneksel zarafetle buluşturan beş yıldızlı otelimize hoş geldiniz.",
    roomsTitle: "Odalar & Süitler",
    roomsDesc: "Her odamız, Gaziantep'in kadim zarafetini modern konforla harmanlayarak size eşsiz bir konaklama deneyimi sunar.",
    roomsPreview: [
      { name: "STANDART FRENCH ODA", slug: "standart-french-oda", imgs: [BASE_ROOM+"1.jpg", BASE_ROOM+"2.jpg", BASE_ROOM+"3.jpg", BASE_ROOM+"4.jpg"] },
      { name: "STANDART TWIN BED ODA", slug: "standart-twin-bed-oda", imgs: [BASE_ROOM+"14.jpg", BASE_ROOM+"24.jpg", BASE_ROOM+"34.jpg"] },
      { name: "STANDART TRIPLE ODA", slug: "standart-triple-oda", imgs: [BASE_ROOM+"15.jpg", BASE_ROOM+"25.jpg", BASE_ROOM+"35.jpg"] },
      { name: "AİLE SÜİTİ", slug: "aile-suiti", imgs: [BASE_ROOM+"11.jpg", BASE_ROOM+"21.jpg", BASE_ROOM+"31.jpg"] },
      { name: "KRAL SÜİT", slug: "kral-suit", imgs: [BASE_ROOM+"16.jpg", BASE_ROOM+"26.jpg", BASE_ROOM+"36.jpg", BASE_ROOM+"43.jpg", BASE_ROOM+"51.jpg"] },
      { name: "ENGELSİZ ODA", slug: "engelsiz-oda", imgs: [BASE_ROOM+"12.jpg", BASE_ROOM+"22.jpg", BASE_ROOM+"32.jpg", BASE_ROOM+"41.jpg"] },
    ],
    experienceItems: [
      { eyebrow: "UNESCO LEZZET MİRASI", title: "Gaziantep'in", titleAccent: "Mutfak Sanatı", desc: "UNESCO tarafından Yaratıcı Gastronomi Şehri seçilen Gaziantep'in eşsiz lezzetlerini, Sof Restaurant'ın zarif atmosferinde keşfedin.", cta: "Restoranı Keşfet", image: "https://images.unsplash.com/photo-1776993298456-98c71c0e177e?w=1920&q=90&fit=crop", link: "/restoran" },
      { eyebrow: "SAĞLIK MERKEZİ", title: "Beden & Ruh", titleAccent: "Dinginliği", desc: "Türk hamamı ritüelleri, masaj terapileri ve modern fitness olanakları ile kendinizi yenileyin. Şehrin gürültüsünden uzaklaşın.", cta: "Sağlık Merkezi", image: "https://images.unsplash.com/photo-1624197422600-71cba707fd27?w=1920&q=90&fit=crop", link: "/saglik" },
      { eyebrow: "ETKİNLİKLER", title: "Unutulmaz", titleAccent: "Anlar", desc: "2.000+ misafir kapasiteli Convention Center'ımız ve modern salon altyapımızla her ölçekte etkinliğinizi kusursuz organize ediyoruz.", cta: "Etkinlik Salonları", image: "https://images.unsplash.com/photo-1759519238029-689e99c6d19e?w=1920&q=85&fit=crop", link: "/etkinlikler" },
    ],
    galleryImages: [
      { src: "https://images.unsplash.com/photo-1742844552700-3926862c5311?w=900&q=85&fit=crop", w: "44vw" },
      { src: "https://images.unsplash.com/photo-1776993298422-3e8c397d0235?w=700&q=85&fit=crop", w: "28vw" },
      { src: "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=900&q=85&fit=crop", w: "36vw" },
      { src: "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=700&q=85&fit=crop", w: "26vw" },
      { src: "https://images.unsplash.com/photo-1646991761123-d83ce47c30c9?w=800&q=85&fit=crop", w: "34vw" },
      { src: "https://images.unsplash.com/photo-1624197422600-71cba707fd27?w=700&q=85&fit=crop", w: "28vw" },
    ],
    aboutTeaserTitle: "Bir Mirasın",
    aboutTeaserTitleAccent: "Hikâyesi",
    aboutTeaserDesc: "Teymur Continental Hotel, Gaziantep'in kalbinde zamansız lüks ile köklü kültürü bir araya getiriyor. UNESCO Gastronomik Şehri'nde 250'den fazla oda, ödüllü restoran ve dünya standartlarında Convention Center ile bölgenin en prestijli konaklama noktasıyız.",
    aboutTeaserImg: "https://images.unsplash.com/photo-1742844552700-3926862c5311?w=800&q=85&fit=crop",
    aboutTeaserStat1n: "250+",
    aboutTeaserStat1l: "Oda & Süit",
    aboutTeaserStat2n: "8",
    aboutTeaserStat2l: "Etkinlik Salonu",
    finalCtaTitle1: "Gaziantep'in En",
    finalCtaTitle2: "Prestijli Adresi",
    finalCtaImg: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=90&fit=crop",
    testimonials: [
      { text: "Teymur Continental, Gaziantep'teki konaklamalarımın en unutulmazıydı. Hem hizmet hem de yemekler mükemmeldi.", author: "AHMET YILMAZ", city: "İstanbul" },
      { text: "Exceptional service and stunning rooms. The breakfast spread featuring local Gaziantep cuisine was a highlight.", author: "SARAH MITCHELL", city: "London" },
      { text: "فندق تيمور كونتيننتال تجربة استثنائية. الخدمة الراقية والأجواء الفاخرة لا مثيل لها.", author: "LAYLA AL-RASHID", city: "Dubai" },
    ],
    experience360Title: "360° Sanal Tur",
    experience360Subtitle: "Odalarımızı, lobimizi ve tüm tesislerimizi sanal olarak keşfedin.",
    experience360PreviewImg: "https://images.unsplash.com/photo-1646991761123-d83ce47c30c9?w=1920&q=85&fit=crop",
    experience360IframeUrl: "https://www.teymurcontinentalhotel.com/360/",
  },
  about: {
    heroImages: [
      "https://www.teymurcontinentalhotel.com/panel/uploads/pages_v/original/11.jpg",
      "https://www.teymurcontinentalhotel.com/assets/img/photo-title.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/rooms_v/original/16.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/rooms_v/original/1.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/rooms_v/original/11.jpg",
    ],
    heroTitle: "Gaziantep'in Kalbinde Beş Yıldızlı Lüks",
    heroText1:
      "Tarihi İpekyolu'nun kadim ve lezzet dolu durağı Gaziantep'in merkezinde, geleneksel misafirperverliği modern lüksle buluşturan bir 5 yıldızlı oteliz. Kültür, lezzet ve iş dünyasının kesişim noktasındayız.",
    heroText2:
      "Kurumsal kimliğimiz; şehrin zengin tarihine saygı duyan, üstün hizmet ve koşulsuz misafir memnuniyetini merkezine alan bir yaklaşımla tanımlanır.",
    heroImg: "https://www.teymurcontinentalhotel.com/assets/img/photo-title.jpg",
    storyLabel: "Kurumsal",
    storyTitle: "Sürdürülebilir turizm anlayışımızı her geçen gün daha ileriye taşımaktan gurur duyuyoruz",
    storyText1:
      "Çevreye duyarlı uygulamalarımız, enerji ve su tasarrufu politikamız, atık yönetimi süreçlerimiz ile sürdürülebilirliği kurum kültürümüzün bir parçası haline getirdik.",
    storyText2:
      "Doğaya, topluma ve geleceğe karşı sorumluluklarımızın bilinciyle hareket ediyor; misafirlerimize daha yaşanabilir ve daha sürdürülebilir bir konaklama deneyimi sunmaya devam ediyoruz.",
    storyImg: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=85&fit=crop&crop=center",
    services: [
      {
        title: "Lüks Odalar & Süitler",
        desc: "Teymur Continental Hotel'in lüks odaları ve süitleri, konfor ve zarafeti ön planda tutarak huzurlu bir dinlenme ortamı sunar.",
        link: "/odalar",
        linkText: "Odalar & Süitler",
        img: "https://www.teymurcontinentalhotel.com/panel/uploads/rooms_v/original/16.jpg",
      },
      {
        title: "Sof Restaurant – Fine Dining",
        desc: "Gaziantep mutfağının en seçkin örneklerini uluslararası lezzetlerle harmanlayan ödüllü restoranımızda unutulmaz bir fine dining deneyimi yaşayın.",
        link: "/restoran/sof-restaurant",
        linkText: "Restoranlar",
        img: BASE_PROD + "a-la-carte-ve-cocuk-2.jpg",
      },
      {
        title: "Spa & Sağlık Merkezi",
        desc: "Yoğun bir günün ardından ruhunuzu ve bedeninizi dinlendirebileceğiniz tam donanımlı spa ve sağlık merkezimiz hizmetinizdedir.",
        link: "/saglik",
        linkText: "Spa & Sağlık",
        img: "https://images.unsplash.com/photo-1519449556851-5720b33024e7?w=900&q=85&fit=crop",
      },
      {
        title: "Convention Center",
        desc: "Modern teknoloji ile donatılmış esnek toplantı salonlarımız ve balo salonumuz, büyük konferanslardan özel kurumsal davetlere kadar her türlü organizasyon için idealdir.",
        link: "/etkinlikler",
        linkText: "Toplantı & Etkinlik",
        img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=85&fit=crop",
      },
    ],
    visionTitle: "Herkesin deneyimlemek istediği marka olmak",
    visionTexts: [
      "Misafirlerimizin kalplerinde özel bir yer edinmiş, yerelden ulusala ödül ve başarılarla taçlanmış; herkesin tekrar deneyimlemek istediği markamızı gelecek nesillere aktarmak.",
    ],
    missionTitle: "Kültürü, konforu ve misafirperverliği bir arada yaşatmak",
    missionTexts: [
      "Gaziantep'in tarihî dokusu, kültürel zenginlikleri ve gastronomi mirasını modern konforla buluşturarak; iş ve turizm amaçlı tüm misafirlerimize güler yüzlü, kaliteli, güvenli ve misafirperver bir konaklama deneyimi yaşatmak.",
      "Yerel değerleri yaşatan, çağdaş otelcilik anlayışını benimseyen hizmetimizle hem şehrimize hem de misafirlerimize eşsiz bir deneyim sunmak.",
    ],
  },
  rooms: [
    {
      id: 1,
      slug: "standart-french-oda",
      title: "Standart French Oda",
      guests: "2",
      size: "28 m²",
      bed: "French Yatak",
      desc: "Fransız ilhamıyla tasarlanmış bu oda, antika mobilyaları ve özenle seçilmiş tekstilleriyle her sabah sizi sessiz bir zarafetle karşılar.",
      imgs: [
        BASE_ROOM + "1.jpg",
        BASE_ROOM + "2.jpg",
        BASE_ROOM + "3.jpg",
        BASE_ROOM + "4.jpg",
      ],
    },
    {
      id: 2,
      slug: "standart-twin-bed-oda",
      title: "Standart Twin Bed Oda",
      guests: "2",
      size: "30 m²",
      bed: "2 Tek Yatak",
      desc: "İş seyahati ve arkadaş grupları için özenle düzenlenmiş, iki ayrı yatağıyla konforsuz ödün vermeyen bir oda.",
      imgs: [BASE_ROOM + "14.jpg", BASE_ROOM + "24.jpg", BASE_ROOM + "34.jpg"],
    },
    {
      id: 3,
      slug: "standart-triple-oda",
      title: "Standart Triple Oda",
      guests: "3",
      size: "36 m²",
      bed: "3 Tek Yatak",
      desc: "Üç kişilik geniş alanı ve oturma köşesiyle aile seyahati için modern tasarım ve pratik lüksü bir arada sunar.",
      imgs: [BASE_ROOM + "15.jpg", BASE_ROOM + "25.jpg", BASE_ROOM + "35.jpg"],
    },
    {
      id: 4,
      slug: "engelsiz-oda",
      title: "Engelsiz Oda",
      guests: "2",
      size: "32 m²",
      bed: "French Yatak",
      desc: "Geniş açıklıkları, özel banyo donanımları ve eksiksiz lüksüyle tüm misafirlerimize eşit konfor sunan özel tasarım odamız.",
      imgs: [
        BASE_ROOM + "12.jpg",
        BASE_ROOM + "22.jpg",
        BASE_ROOM + "32.jpg",
        BASE_ROOM + "41.jpg",
      ],
    },
    {
      id: 5,
      slug: "aile-suiti",
      title: "Aile Süiti",
      guests: "4",
      size: "80 m²",
      bed: "2 Yatak Odası",
      desc: "Ayrı yatak odaları, geniş oturma alanı ve mutfak köşesiyle gerçekten ev hissi veren nadir bir süit deneyimi.",
      imgs: [BASE_ROOM + "11.jpg", BASE_ROOM + "21.jpg", BASE_ROOM + "31.jpg"],
    },
    {
      id: 6,
      slug: "kral-suit",
      title: "Kral Süit",
      guests: "2",
      size: "65 m²",
      bed: "King Yatak",
      desc: "Özel jakuzi, ayrı salon, butler hizmeti ve 360° panoramik manzarasıyla otelin en seçkin konaklamasını sunar.",
      imgs: [
        BASE_ROOM + "16.jpg",
        BASE_ROOM + "26.jpg",
        BASE_ROOM + "36.jpg",
        BASE_ROOM + "43.jpg",
        BASE_ROOM + "51.jpg",
      ],
    },
  ],
  dining: [
    {
      id: 1,
      slug: "sof-restaurant",
      title: "Sof Restaurant",
      tagline: "Gaziantep ve dünya mutfağı bir arada.",
      guests: "7/24",
      type: "À La Carte",
      feature: "Çocuk Oyun Alanı",
      desc: "Otelimiz bünyesinde bulunan Sof Restaurant, Gaziantep ve dünya mutfağını profesyonel bar hizmetiyle misafirlerine sunmaktadır.",
      imgs: [BASE_PROD + "a-la-carte-ve-cocuk-2.jpg", BASE_PROD + "7.jpg"],
    },
    {
      id: 2,
      slug: "kahvalti",
      title: "Açık Büfe Kahvaltı",
      tagline: "Şehir manzarası eşliğinde sabah şöleni.",
      guests: "07:00 – 11:00",
      type: "Açık Büfe",
      feature: "Şehir Manzarası",
      desc: "Teymur Continental Hotel misafirleri için açık büfe kahvaltımız; çeşitliliği, lezzeti ve yöreselliğiyle şehir manzarası eşliğinde unutulmaz bir sabah şöleni sunuyor.",
      imgs: [BASE_PROD + "kahvalti--2.jpg", BASE_PROD + "6.jpg"],
    },
    {
      id: 3,
      slug: "bar-lounge",
      title: "Bar & Lounge",
      tagline: "Gece yarısı özel karışımlar ve seçkin içkiler.",
      guests: "18:00 – 01:00",
      type: "Bar",
      feature: "Canlı Müzik",
      desc: "Teymur Continental Hotel'in Bar & Lounge'ı, şık atmosferi ve geniş içecek menüsüyle unutulmaz akşamlar sunar.",
      imgs: [BASE_PROD + "7.jpg", BASE_PROD + "a-la-carte-ve-cocuk-2.jpg"],
    },
  ],
  halls: [
    {
      id: 1,
      slug: "beylerbeyi-balo-ve-kongre-salonu",
      title: "Beylerbeyi Balo Ve Kongre Salonu",
      tagline: "Gaziantep'in en prestijli etkinlik salonu.",
      capacity: "1250 Kişi",
      area: "1305 m²",
      type: "Balo & Kongre",
      desc: "1305 m² kullanım alanına sahip, 1250 kişilik kapasitesiyle bu özel salonumuzda ister görkemli bir ziyafet, isterseniz samimi bir kutlama gerçekleştirebilirsiniz.",
      imgs: [BASE_HALL + "beylerbeyi.jpg", BASE_HALL + "beylerbeyi--21.jpg"],
    },
    {
      id: 2,
      slug: "hayad-salonu",
      title: "Hayad Salonu",
      tagline: "Esnek yapısıyla her organizasyona uyum sağlar.",
      capacity: "350 Kişi",
      area: "512 m²",
      type: "Çok Amaçlı Salon",
      desc: "512 m² kullanım alanına sahip, 350 kişilik kapasitesiyle salonumuzda ister görkemli bir ziyafet, isterseniz samimi bir kutlama gerçekleştirebilirsiniz.",
      imgs: [BASE_HALL + "hayad-3.jpg"],
    },
    {
      id: 3,
      slug: "continental-house-salonu",
      title: "Continental House Salonu",
      tagline: "Şık ve işlevsel toplantı ortamı.",
      capacity: "90 Kişi",
      area: "125 m²",
      type: "Toplantı Salonu",
      desc: "125 m² kullanım alanına sahip, 90 kişilik kapasitesiyle toplantı, düğün, nişan ve doğum günü gibi etkinlikleriniz için ideal bir atmosfer sunan salonumuz.",
      imgs: [BASE_HALL + "5e6d3d45-aac1-4484-8f40-803b86003c3b.jpg"],
    },
    {
      id: 4,
      slug: "ipekyolu-salonu",
      title: "İpekyolu Salonu",
      tagline: "Küçük ölçekli etkinlikler için ideal mekan.",
      capacity: "90 Kişi",
      area: "125 m²",
      type: "Toplantı Salonu",
      desc: "125 m² kullanım alanına sahip, 90 kişilik kapasitesiyle küçük ölçekli toplantılar ve özel etkinlikler için ideal ortam.",
      imgs: [BASE_HALL + "a.jpg"],
    },
  ],
  wellness: {
    heroTitle: "Sağlık & Spa",
    heroImg: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/6.jpg",
    galleryItems: [
      { img: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/6.jpg", category: "Sağlık Kulübü", title: "Spa & Sağlık", desc: "Ruhunuzu ve bedeninizi yenileyecek özenle tasarlanan spa merkezimizde, Uzakdoğulu masörlerimizle kendinizi özel hissedeceğiniz bir deneyim sunuyoruz." },
      { img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=90&fit=crop", category: "Türk Hamamı", title: "Osmanlı Ritüeli", desc: "Geleneksel kese ve köpük masajı ile derin arınma deneyimi. Buhar odaları ve mermer göbek taşı." },
      { img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=90&fit=crop", category: "Masaj", title: "Aromaterapi Masajı", desc: "Doğal uçucu yağlarla beden ve zihnin tam dinginliğe ulaşması için özel hazırlanmış tedavi." },
      { img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=90&fit=crop", category: "Sauna & Buhar", title: "Isı Tedavileri", desc: "Sauna ve buhar odalarında derin arınma. Beden ve ruhun yenilenmesi için ideal ortam." },
      { img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=90&fit=crop", category: "Yüzme", title: "Kapalı Havuz", desc: "Sıcaklık kontrollü kapalı yüzme havuzumuzda kendinizi yenileyin." },
      { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=90&fit=crop", category: "Fitness", title: "Fitness Merkezi", desc: "Son teknoloji ekipmanlar ve uzman eğitmenlerle hedeflerinize ulaşın." },
    ],
    otherServices: [
      { slug: "spa-hamam", title: "Spa & Hamam", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=90&fit=crop" },
      { slug: "fitness", title: "Fitness Merkezi", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=90&fit=crop" },
    ],
  },
  spa: {
    heroTitle: "SPA & HAMAM",
    heroImgs: [
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/5.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/3.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/4.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/6.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/11.jpg",
    ],
    sections: [
      {
        label: "Spa",
        title: "Rahatlama ve Yenilenme",
        desc: "Teymur Continental Hotel Spa & Sağlık, yüzyıllık Osmanlı hamam geleneğini çağdaş tedavilerle bir araya getirerek eşsiz bir iyileşme deneyimi sunar. Uzman terapistlerimiz size özel hazırlanmış programlarla beden ve ruhunuzu yeniler.",
        hours: "07:00 – 22:00",
        imgs: [
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/3.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/6.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/4.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/5.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/11.jpg",
        ],
      },
      {
        label: "Türk Hamamı",
        title: "Gerçek Huzur",
        desc: "Osmanlı döneminden günümüze taşınan geleneksel hamam ritüelleriyle derin bir arınma deneyimi yaşayın. Geleneksel kese, köpük masajı, buhar odaları ve mermer göbek taşı ile bedeninizi ve ruhunuzu yenileyin.",
        hours: "",
        imgs: [
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/5.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/4.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/3.jpg",
        ],
      },
      {
        label: "Vücut Bakımı",
        title: "Kese & Peeling",
        desc: "Uzman ekibimiz tarafından uygulanan geleneksel kese ve peeling ritüelleri, cildinizi derinlemesine temizler ve yeniler. Osmanlı hamam geleneğinin en özel uygulamalarını yaşayın.",
        hours: "",
        imgs: [
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/6.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/11.jpg",
        ],
      },
    ],
  },
  fitness: {
    heroTitle: "FİTNESS",
    heroImgs: [
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/3.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/6.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/4.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/5.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/11.jpg",
    ],
    sections: [
      {
        label: "Fitness",
        title: "Güç & Kondisyon",
        desc: "Teymur Continental Hotel Fitness Merkezi, son teknoloji ekipmanları ve uzman eğitmenleriyle misafirlerimize eksiksiz bir spor deneyimi sunar. Kardiyo alanından ağırlık bölümüne, grup derslerinden kişisel antrenman seanslarına kadar her ihtiyacınıza yanıt veriyoruz.",
        hours: "07:00 – 22:00",
        imgs: [
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/3.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/6.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/4.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/5.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/11.jpg",
        ],
      },
      {
        label: "Kardiyo & Ağırlık",
        title: "Profesyonel Ekipman",
        desc: "Geniş kardiyo ve ağırlık alanımızda en son teknoloji spor aletleri ile antrenmanlarınızı yapabilirsiniz. Kişisel eğitmenlerimiz hedeflerinize uygun program hazırlar.",
        hours: "",
        imgs: [
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/5.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/4.jpg",
          "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/3.jpg",
        ],
      },
    ],
  },
  contact: {
    heroTitle: "Sizin İçin Buradayız",
    heroImg: "https://images.unsplash.com/photo-1742844552700-3926862c5311?w=1920&q=85&fit=crop",
    infoTitle: "İletişim Bilgilerimiz",
    formTitle: "Bize Yazın",
    address: "Mücahitler Mah. Kudüs Cad. No:31\n27090 Şehitkamil / Gaziantep\nTürkiye",
    phone1: "+90 342 999 1111",
    phone2: "+90 342 325 1010",
    email: "info@teymurcontinental.com",
    receptionHours: "7/24 Açık",
    mapUrl: "https://www.google.com/maps?q=Teymur+Continental+Hotel,+Mucahitler+Mahallesi,+Kudüs+Caddesi+No:31,+Şehitkamil,+Gaziantep&output=embed",
    subjectOptions: [
      { value: "general",     label: "Genel Bilgi" },
      { value: "reservation", label: "Rezervasyon" },
      { value: "event",       label: "Etkinlik" },
      { value: "feedback",    label: "Görüş & Öneri" },
    ],
    submitButtonText: "Mesaj Gönder",
  },
  career: {
    heroTitle: "Ekibimize Katılın",
    heroSubtitle: "Türkiye'nin en prestijli otellerinden birinde çalışma fırsatını yakalayın.",
    heroImg: "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=1920&q=85&fit=crop",
    introTitle: "Kariyerinize Teymur Continental Hotel'de Yön Verin",
    introDesc: "Türkiye'nin en prestijli otellerinden birinde çalışma fırsatını yakalayın. Dinamik ekibimize katılın, yeteneklerinizi geliştirin ve konukseverlik sektöründe kariyerinizi ilerletin.",
    positions: [
      { id: "front-desk",  title: "Resepsiyon Görevlisi",    department: "Ön Büro",     type: "Tam Zamanlı",  location: "Gaziantep" },
      { id: "chef",        title: "Aşçı / Sous Chef",        department: "Mutfak",      type: "Tam Zamanlı",  location: "Gaziantep" },
      { id: "housekeeping",title: "Kat Görevlisi",           department: "Housekeeping",type: "Tam Zamanlı",  location: "Gaziantep" },
      { id: "spa",         title: "Spa Terapisti",           department: "Sağlık",      type: "Yarı Zamanlı", location: "Gaziantep" },
      { id: "event",       title: "Etkinlik Koordinatörü",   department: "Konvansiyon", type: "Tam Zamanlı",  location: "Gaziantep" },
    ],
    submitButtonText: "Başvuruyu Gönder",
  },
  gaziantep: {
    heroTitle: "Gaziantep",
    heroSubtitle: "Tarihin, kültürün ve lezzetin buluştuğu efsanevi şehir",
    heroImgs: [
      "https://images.unsplash.com/photo-1624197422600-71cba707fd27?w=1920&q=90&fit=crop",
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1920&q=90&fit=crop",
      "https://images.unsplash.com/photo-1646052453698-95ed9bbc3eab?w=1920&q=90&fit=crop",
      "https://images.unsplash.com/photo-1755525757093-538c1b3d4216?w=1920&q=90&fit=crop",
    ],
    introTitle: "Binlerce Yıllık Miras",
    introDesc: "Yaklaşık 9.000 yıllık kesintisiz yerleşim geçmişiyle Gaziantep, Türkiye'nin en köklü şehirlerinden biridir. 2015 yılında UNESCO tarafından 'Gastronomi Şehri' unvanına layık görülen Gaziantep, coğrafi işaret tescilli baklavası ve meşhur Antep fıstığıyla dünyanın önde gelen yemek destinasyonları arasında yer almaktadır.",
    stats: [
      { num: "2 MİLYON+", label: "Nüfus" },
      { num: "9000+ YIL", label: "Yerleşim Tarihi" },
      { num: "UNESCO", label: "Gastronomik Şehir" },
      { num: "270+", label: "Tarihi Mekan" },
    ],
    gastronomyLabel: "Gastronomi",
    gastronomyTitle: "Gaziantep Mutfağı",
    gastronomyDesc: "Gaziantep, 9.000 yıllık mutfak geleneğiyle dünyanın en köklü gastronomi başkentlerinden biridir. Coğrafi işaret tescilli Antep baklavası, dünyaca ünlü Antep fıstığı, ateşte olgunlaşan kebaplar ve sabah sofralarının vazgeçilmezi katmer; her lokma bu kadim şehrin ruhunu taşır.",
    gastronomyImgs: [
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/8.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/kahvalti--2.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/9.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/a-la-carte-ve-cocuk-2.jpg",
      "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/7.jpg",
    ],
    baklavaLabel: "Lezzet Mirası",
    baklavaTitle: "Baklava Tarihi",
    baklavaDesc: "Gaziantep baklavası, coğrafi işaret tescilli tek baklavadır. Antep fıstığının eşsiz aroması ve ince hamur katmanlarıyla hazırlanan bu tatlı, yüzyıllardır ustadan ustaya aktarılan bir gelenek.",
    baklavaImgs: [
      "https://images.unsplash.com/photo-1646991761123-d83ce47c30c9?w=900&q=85&fit=crop",
      "https://images.unsplash.com/photo-1568158879083-c42860933ed7?w=900&q=85&fit=crop",
      "https://images.unsplash.com/photo-1723701877440-ebe348b830da?w=900&q=85&fit=crop",
    ],
    attractionsTitle: "Keşfetmeyi Bekliyorlar",
    attractions: [
      { title: "Gaziantep Kalesi", period: "M.S. 4-6. yüzyıl", distance: "10 dk", desc: "Şehrin ortasında yükselen tarihi kale. Etrafındaki bazalt surlar ve kule yapısıyla eşsiz bir tarihi mirası temsil eder.", img: "https://images.unsplash.com/photo-1646052453698-95ed9bbc3eab?w=600&q=80&fit=crop", category: "Tarih" },
      { title: "Zeugma Mozaik Müzesi", period: "Dünyanın en büyük mozaik müzesi", distance: "12 dk", desc: "Yaklaşık 3.500 m² yüzey alanıyla dünyanın en büyük mozaik müzesi. Roma dönemine ait nadir mozaikler burada korunmaktadır.", img: "https://images.unsplash.com/photo-1624197422600-71cba707fd27?w=600&q=80&fit=crop", category: "Kültür" },
      { title: "Gaziantep Baklavası", period: "UNESCO Gastronomik Şehri", distance: "5 dk", desc: "Dünyanın en meşhur tatlısının anavatanında, tarihi çarşıların içindeki ustalardan taze baklava tatma deneyimi.", img: "https://images.unsplash.com/photo-1646991761123-d83ce47c30c9?w=600&q=80&fit=crop", category: "Gastronomi" },
      { title: "Bakırcılar Çarşısı", period: "Tarihi Kapalı Çarşı", distance: "8 dk", desc: "Yüzyıllardır bakırcılık sanatının devam ettiği tarihi çarşıda el yapımı bakır ürünler ve geleneksel zanaat ürünleri bulabilirsiniz.", img: "https://images.unsplash.com/photo-1755525757093-538c1b3d4216?w=600&q=80&fit=crop", category: "Kültür" },
    ],
  },
  gallery: {
    heroImg: "https://www.teymurcontinentalhotel.com/panel/uploads/galleries_v/images/galeri/1.jpg",
    heroTitle: "GALERİ",
    photos: [
      { src: BASE_ROOM + "1.jpg",  cat: "Odalar" },
      { src: BASE_ROOM + "2.jpg",  cat: "Odalar" },
      { src: BASE_ROOM + "3.jpg",  cat: "Odalar" },
      { src: BASE_ROOM + "4.jpg",  cat: "Odalar" },
      { src: BASE_ROOM + "11.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "14.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "15.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "16.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "21.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "24.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "25.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "26.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "31.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "32.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "34.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "35.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "36.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "41.jpg", cat: "Odalar" },
      { src: BASE_ROOM + "43.jpg", cat: "Odalar" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/a-la-carte-ve-cocuk-2.jpg", cat: "Restoran" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/kahvalti--2.jpg",           cat: "Restoran" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/7.jpg",  cat: "Restoran" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/8.jpg",  cat: "Restoran" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/9.jpg",  cat: "Restoran" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/12.jpg", cat: "Restoran" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/2.jpg",  cat: "Sağlık" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/3.jpg",  cat: "Sağlık" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/4.jpg",  cat: "Sağlık" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/5.jpg",  cat: "Sağlık" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/6.jpg",  cat: "Sağlık" },
      { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/11.jpg", cat: "Sağlık" },
    ],
    videos: [
      { embedId: "dQw4w9WgXcQ", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", title: "Teymur Continental Hotel — Tanıtım Filmi" },
      { embedId: "dQw4w9WgXcQ", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", title: "Gaziantep'in Kalbinde Konfor" },
      { embedId: "dQw4w9WgXcQ", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", title: "Spa & Sağlık Merkezi" },
    ],
  },
  nav: {
    items: [
      { id: "rooms",    side: "left",  href: "#",           labelTr: "Odalar",     labelEn: "Rooms",    labelAr: "الغرف",
        dropdown: { headingTr: "Odalar & Süitler", headingEn: "Rooms & Suites", headingAr: "الغرف والأجنحة", descTr: "Gaziantep'in kalbinde, her konforu düşünülerek tasarlanmış oda ve süitlerimizi keşfedin.", descEn: "Discover our thoughtfully designed rooms and suites.", descAr: "اكتشف غرفنا وأجنحتنا المصممة بعناية.", viewAllTr: "Tüm Odaları Gör", viewAllEn: "View All Rooms", viewAllAr: "عرض جميع الغرف", viewAllHref: "/odalar",
          photos: [
            { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85&fit=crop", labelTr: "Standart French Oda", labelEn: "Standard French Room", labelAr: "غرفة فرنسية قياسية", href: "/odalar/standart-french-oda" },
            { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=85&fit=crop", labelTr: "Standart Twin Bed",   labelEn: "Standard Twin Bed",   labelAr: "غرفة توأم",              href: "/odalar/standart-twin-bed-oda" },
            { src: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=600&q=85&fit=crop", labelTr: "Standart Triple Oda", labelEn: "Standard Triple Room", labelAr: "غرفة ثلاثية",           href: "/odalar/standart-triple-oda" },
            { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=85&fit=crop", labelTr: "Aile Süiti",        labelEn: "Family Suite",         labelAr: "جناح عائلي",            href: "/odalar/aile-suiti" },
            { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=85&fit=crop", labelTr: "Kral Süit",         labelEn: "King Suite",           labelAr: "جناح كينج",             href: "/odalar/kral-suit" },
            { src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=85&fit=crop", labelTr: "Engelsiz Oda",      labelEn: "Accessible Room",      labelAr: "غرفة ذوي الاحتياجات",   href: "/odalar/engelsiz-oda" },
          ],
        },
      },
      { id: "dining",   side: "left",  href: "#",           labelTr: "Restoran",   labelEn: "Dining",   labelAr: "المطعم",
        dropdown: { headingTr: "Restoran & Bar", headingEn: "Dining & Bar", headingAr: "المطعم والبار", descTr: "Gaziantep'in eşsiz gastronomi mirasından ilham alan menülerimizle unutulmaz bir lezzet yolculuğuna çıkın.", descEn: "Embark on a culinary journey inspired by Gaziantep's rich gastronomic heritage.", descAr: "انطلق في رحلة طهوية مستوحاة من إرث غازيانتيب الغني.", viewAllTr: "", viewAllEn: "", viewAllAr: "", viewAllHref: "/restoran",
          photos: [
            { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/a-la-carte-ve-cocuk-2.jpg", labelTr: "Sof Restaurant",     labelEn: "Sof Restaurant", labelAr: "مطعم سوف",     href: "/restoran/sof-restaurant" },
            { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/7.jpg",                    labelTr: "Bar & Lounge",       labelEn: "Bar & Lounge",   labelAr: "البار والصالة", href: "/restoran/bar-lounge" },
            { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/kahvalti--2.jpg",          labelTr: "Açık Büfe Kahvaltı", labelEn: "Breakfast",      labelAr: "الإفطار",       href: "/restoran/kahvalti" },
          ],
        },
      },
      { id: "events",   side: "left",  href: "#",           labelTr: "Etkinlikler", labelEn: "Events",  labelAr: "الفعاليات",
        dropdown: { headingTr: "Toplantı & Etkinlikler", headingEn: "Meetings & Events", headingAr: "الاجتماعات والفعاليات", descTr: "Her ölçekte etkinliğiniz için profesyonel hizmet sunuyoruz.", descEn: "We offer professional service for events of any scale.", descAr: "نقدم خدمة احترافية لجميع الفعاليات.", viewAllTr: "Tüm Salonları Gör", viewAllEn: "View All Halls", viewAllAr: "عرض جميع القاعات", viewAllHref: "/etkinlikler",
          photos: [
            { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/beylerbeyi.jpg",                            labelTr: "Beylerbeyi Balo Ve Kongre", labelEn: "Beylerbeyi Ballroom",    labelAr: "قاعة بيليربيي",            href: "/etkinlikler/beylerbeyi-balo-ve-kongre-salonu" },
            { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/hayad-3.jpg",                               labelTr: "Hayad Salonu",             labelEn: "Hayad Hall",             labelAr: "قاعة هياد",                href: "/etkinlikler/hayad-salonu" },
            { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/5e6d3d45-aac1-4484-8f40-803b86003c3b.jpg", labelTr: "Continental House Salonu", labelEn: "Continental House Hall", labelAr: "قاعة كونتيننتال هاوس",     href: "/etkinlikler/continental-house-salonu" },
            { src: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/a.jpg",                                     labelTr: "İpekyolu Salonu",          labelEn: "İpekyolu Hall",          labelAr: "قاعة إيبكيولو",            href: "/etkinlikler/ipekyolu-salonu" },
          ],
        },
      },
      { id: "wellness", side: "left",  href: "#",           labelTr: "Sağlık",    labelEn: "Wellness", labelAr: "العافية",
        dropdown: { headingTr: "Sağlık Kulübü", headingEn: "Health Club", headingAr: "نادي الصحة", descTr: "Antik hamam ritüelleri ve modern spa tedavileriyle beden ve ruhunuzu yenileyin.", descEn: "Renew body and soul with ancient hammam rituals and modern spa treatments.", descAr: "جدد جسدك وروحك بطقوس الحمام التركي القديمة.", viewAllTr: "Sağlığı Keşfet", viewAllEn: "Explore Health", viewAllAr: "استكشف الصحة", viewAllHref: "/saglik",
          photos: [
            { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=85&fit=crop",  labelTr: "Spa & Hamam",      labelEn: "Spa & Hammam",       labelAr: "سبا والحمام التركي",    href: "/saglik/spa-hamam" },
            { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=85&fit=crop", labelTr: "Fitness Merkezi", labelEn: "Fitness Center",     labelAr: "مركز اللياقة البدنية", href: "/saglik/fitness" },
          ],
        },
      },
      { id: "gallery",     side: "right", href: "/galeri",      labelTr: "Galeri",    labelEn: "Gallery",    labelAr: "المعرض" },
      { id: "destination", side: "right", href: "/gaziantep",   labelTr: "Gaziantep", labelEn: "Gaziantep",  labelAr: "غازيانتيب" },
      { id: "corporate",   side: "right", href: "#",            labelTr: "Kurumsal",  labelEn: "Corporate",  labelAr: "الشركة",
        dropdown: { headingTr: "Kurumsal", headingEn: "Corporate", headingAr: "الشركة", descTr: "Teymur Continental Hotel hakkında daha fazla bilgi edinin.", descEn: "Learn more about Teymur Continental Hotel.", descAr: "تعرف على فندق تيمور كونتيننتال.", viewAllTr: "", viewAllEn: "", viewAllAr: "", viewAllHref: "/hakkimizda",
          photos: [
            { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=85&fit=crop", labelTr: "Hakkımızda", labelEn: "About Us", labelAr: "عنّا",    href: "/hakkimizda" },
            { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=85&fit=crop", labelTr: "Kariyer",    labelEn: "Careers",  labelAr: "الوظائف", href: "/kariyer" },
          ],
        },
      },
      { id: "contact", side: "right", href: "/iletisim", labelTr: "İletişim", labelEn: "Contact", labelAr: "اتصل بنا" },
    ],
  },
  translations: {
    en: {
      // Home
      "home.heroName": "TEYMUR CONTINENTAL",
      "home.heroSubName": "HOTEL & CONVENTION CENTER",
      "home.heroCity": "GAZIANTEP",
      "home.heroTitle": "Five-Star Luxury in the Heart of Gaziantep",
      "home.heroSubtitle": "Welcome to our five-star hotel where modern comfort meets traditional elegance in the flavor and culture capital of the historic Silk Road.",
      "home.roomsTitle": "Rooms & Suites",
      "home.roomsDesc": "Each of our rooms combines the ancient elegance of Gaziantep with modern comfort to offer you an unparalleled stay experience.",
      "home.aboutTeaserTitle": "A Story of",
      "home.aboutTeaserTitleAccent": "Heritage",
      "home.aboutTeaserDesc": "Teymur Continental Hotel unites timeless luxury with deep-rooted culture in the heart of Gaziantep. With 250+ rooms, an award-winning restaurant, and a world-class Convention Center, we are the region's most prestigious address.",
      "home.aboutTeaserStat1l": "Rooms & Suites",
      "home.aboutTeaserStat2l": "Event Halls",
      "home.finalCtaTitle1": "Gaziantep's Most",
      "home.finalCtaTitle2": "Prestigious Address",
      "home.experience360Title": "360° Virtual Tour",
      "home.experience360Subtitle": "Discover our rooms, lobby and all facilities virtually.",
      // About
      "about.heroTitle": "Five-Star Luxury in the Heart of Gaziantep",
      "about.heroText1": "Located in the heart of Gaziantep, the ancient and flavorful stop on the historic Silk Road, we are a five-star hotel that brings together traditional hospitality with modern luxury. We stand at the intersection of culture, gastronomy and the business world.",
      "about.heroText2": "Our corporate identity is defined by an approach that respects the city's rich history and places superior service and unconditional guest satisfaction at its center.",
      "about.storyLabel": "Corporate",
      "about.storyTitle": "We are proud to take our sustainable tourism approach further every day",
      "about.storyText1": "We have made sustainability an integral part of our corporate culture through our environmentally sensitive practices, energy and water conservation policies, and waste management processes.",
      "about.storyText2": "Acting with awareness of our responsibilities toward nature, society and the future, we continue to provide our guests with a more livable and sustainable accommodation experience.",
      "about.visionTitle": "To become the brand that everyone wants to experience",
      "about.missionTitle": "To keep culture, comfort and hospitality together",
      // Home - extra fields
      "home.roomsTitle": "Rooms & Suites",
      "home.roomsDesc": "Each of our rooms blends the ancient elegance of Gaziantep with modern comfort to offer an unparalleled stay.",
      "home.experience360Title": "360° Virtual Tour",
      "home.experience360Subtitle": "Explore our rooms, lobby and all facilities virtually.",
      // Experience panels
      "home.exp0.eyebrow": "UNESCO CULINARY HERITAGE",
      "home.exp0.title": "Culinary Art",
      "home.exp0.titleAccent": "of Gaziantep",
      "home.exp0.desc": "Discover the unique flavors of Gaziantep, selected as a UNESCO Creative City of Gastronomy, in the elegant atmosphere of Sof Restaurant.",
      "home.exp0.cta": "Explore Restaurant",
      "home.exp1.eyebrow": "HEALTH CENTER",
      "home.exp1.title": "Body & Soul",
      "home.exp1.titleAccent": "Tranquility",
      "home.exp1.desc": "Rejuvenate yourself with Turkish hammam rituals, massage therapies and modern fitness facilities. Escape from the hustle of the city.",
      "home.exp1.cta": "Health Center",
      "home.exp2.eyebrow": "EVENTS",
      "home.exp2.title": "Unforgettable",
      "home.exp2.titleAccent": "Moments",
      "home.exp2.desc": "With our Convention Center that can host 2,000+ guests and modern hall infrastructure, we organize events of all sizes flawlessly.",
      "home.exp2.cta": "Event Halls",
      // Room preview names
      "home.room0.name": "STANDARD FRENCH ROOM",
      "home.room1.name": "STANDARD TWIN BED ROOM",
      "home.room2.name": "STANDARD TRIPLE ROOM",
      "home.room3.name": "FAMILY SUITE",
      "home.room4.name": "KING SUITE",
      "home.room5.name": "ACCESSIBLE ROOM",
      // Testimonials
      "home.test0.text": "Teymur Continental was the most unforgettable stay of my trips to Gaziantep. Both the service and the food were excellent.",
      "home.test0.author": "AHMET YILMAZ",
      "home.test0.city": "Istanbul",
      "home.test1.text": "Exceptional service and stunning rooms. The breakfast spread featuring local Gaziantep cuisine was a highlight.",
      "home.test1.author": "SARAH MITCHELL",
      "home.test1.city": "London",
      "home.test2.text": "Teymur Continental is an exceptional experience. The refined service and luxurious atmosphere are unmatched.",
      "home.test2.author": "LAYLA AL-RASHID",
      "home.test2.city": "Dubai",
      // About teaser extras
      "home.aboutTeaserTitle": "A Story of",
      "home.aboutTeaserTitleAccent": "Heritage",
      "home.aboutTeaserStat1l": "Rooms & Suites",
      "home.aboutTeaserStat2l": "Event Halls",
      "home.finalCtaTitle1": "Gaziantep's Most",
      "home.finalCtaTitle2": "Prestigious Address",
      // Gaziantep
      "gz.heroTitle": "Gaziantep",
      "gz.heroSubtitle": "The legendary city where history, culture and flavor meet",
      "gz.introTitle": "A Heritage of Thousands of Years",
      "gz.introDesc": "With approximately 9,000 years of continuous settlement history, Gaziantep is one of Turkey's most deeply rooted cities. Designated as a 'Creative City of Gastronomy' by UNESCO in 2015, Gaziantep ranks among the world's leading culinary destinations with its geographically certified baklava, world-famous pistachios, various kebabs and katmer.",
      "gz.gastronomyLabel": "Gastronomy",
      "gz.gastronomyTitle": "Gaziantep Cuisine",
      "gz.gastronomyDesc": "Gaziantep, with its 9,000-year culinary tradition, is one of the world's most deeply-rooted culinary capitals. With its geographically certified Antep baklava, world-famous pistachios, fire-ripened kebabs and the breakfast staple katmer, every bite carries the spirit of this ancient city.",
      "gz.baklavaLabel": "Heritage of Flavor",
      "gz.baklavaTitle": "History of Baklava",
      "gz.baklavaDesc": "Gaziantep baklava is the only geographically certified baklava in the world. Made with the unique aroma of pistachios and thin layers of dough, this dessert is a tradition passed down from master to master for centuries.",
      "gz.attractionsTitle": "Waiting to Be Discovered",
      "gz.att0.title": "Gaziantep Castle", "gz.att0.category": "History", "gz.att0.distance": "10 min", "gz.att0.period": "4th–6th Century AD", "gz.att0.desc": "A historic castle rising in the middle of the city. With its basalt walls and tower structure dating back millennia, it represents an unparalleled historical heritage.",
      "gz.att1.title": "Zeugma Mosaic Museum", "gz.att1.category": "Culture", "gz.att1.distance": "12 min", "gz.att1.period": "World's Largest Mosaic Museum", "gz.att1.desc": "With a surface area of approximately 3,500 m², this is the world's largest mosaic museum, preserving rare mosaics from the Roman period.",
      "gz.att2.title": "Gaziantep Baklava", "gz.att2.category": "Gastronomy", "gz.att2.distance": "5 min", "gz.att2.period": "UNESCO Creative City of Gastronomy", "gz.att2.desc": "Experience fresh baklava from masters in the historic bazaars of Gaziantep, the homeland of the world's most famous dessert.",
      "gz.att3.title": "Coppersmith Bazaar", "gz.att3.category": "Culture", "gz.att3.distance": "8 min", "gz.att3.period": "Historic Covered Bazaar", "gz.att3.desc": "In this historic bazaar where the art of coppersmithing has continued for centuries, you can find handcrafted copper products and traditional Antep craft items.",
      // Contact
      "contact.heroTitle": "We Are Here For You",
      "contact.infoTitle": "Contact Information",
      "contact.formTitle": "Write to Us",
      "contact.submitButtonText": "Send Message",
      "contact.subj0": "General Information",
      "contact.subj1": "Reservation",
      "contact.subj2": "Event",
      "contact.subj3": "Feedback & Suggestions",
      // Career
      "career.heroTitle": "Join Our Team",
      "career.introTitle": "Shape Your Career at Teymur Continental Hotel",
      "career.introDesc": "Seize the opportunity to work at one of Turkey's most prestigious hotels. Join our dynamic team, develop your talents, and advance your career in the hospitality industry.",
      "career.submitButtonText": "Submit Application",
      "career.pos0.title": "Front Desk Agent", "career.pos0.department": "Front Office", "career.pos0.type": "Full-Time",
      "career.pos1.title": "Chef / Sous Chef", "career.pos1.department": "Kitchen", "career.pos1.type": "Full-Time",
      "career.pos2.title": "Housekeeping Staff", "career.pos2.department": "Housekeeping", "career.pos2.type": "Full-Time",
      "career.pos3.title": "Spa Therapist", "career.pos3.department": "Health & Wellness", "career.pos3.type": "Part-Time",
      "career.pos4.title": "Event Coordinator", "career.pos4.department": "Convention", "career.pos4.type": "Full-Time",
      // Gallery
      "gallery.heroTitle": "GALLERY",
      // Wellness / Spa / Fitness
      "wellness.heroTitle": "Health & Spa",
      "spa.heroTitle": "SPA & HAMMAM",
      "spa.s0.label": "Spa", "spa.s0.title": "Relaxation & Renewal", "spa.s0.desc": "Teymur Continental Hotel Spa & Health combines centuries of Ottoman hammam tradition with contemporary treatments to offer an unparalleled healing experience. Our expert therapists refresh your body and soul with specially tailored programs.",
      "spa.s1.label": "Turkish Hammam", "spa.s1.title": "True Serenity", "spa.s1.desc": "Experience deep purification through traditional hammam rituals passed down from the Ottoman era to the present day. Rejuvenate body and soul with traditional kese, foam massage, steam rooms and marble belly stone.",
      "spa.s2.label": "Body Care", "spa.s2.title": "Kese & Peeling", "spa.s2.desc": "Traditional kese and peeling rituals applied by our expert team deeply cleanse and renew your skin. Experience the most special practices of the Ottoman hammam tradition.",
      "fit.heroTitle": "FITNESS",
      "fit.s0.label": "Fitness", "fit.s0.title": "Strength & Conditioning", "fit.s0.desc": "Teymur Continental Hotel Fitness Center offers guests a complete sports experience with state-of-the-art equipment and expert trainers. From cardio to weights, group classes to personal training, we respond to your every need.",
      "fit.s1.label": "Cardio & Weights", "fit.s1.title": "Professional Equipment", "fit.s1.desc": "In our spacious cardio and weight area, you can work out with the latest sports equipment. Our personal trainers prepare programs tailored to your goals.",
      // Footer
      "g.hotelName": "Teymur Continental Hotel",
      "g.tagline": "A unique address in the heart of Gaziantep where timeless luxury and deep-rooted culture meet.",
      "f.description": "A unique address in the heart of Gaziantep where timeless luxury and deep-rooted culture meet.",
      "f.copyright": "© 2024 Teymur Continental Hotel. All rights reserved.",
      "f.certTitle": "Sustainable Tourism",
      "f.certSubtitle": "Certified Green Hotel",
      "f.certModalTitle": "Sustainable Tourism Certificate",
      "f.certModalBody": "As Teymur Continental Hotel, we have made sustainable tourism an integral part of our corporate culture through our environmentally sensitive practices, energy and water conservation policies, and waste management processes.",
      // Genel
      "global.hotelName": "Teymur Continental Hotel",
      "global.tagline": "A unique address in the heart of Gaziantep where timeless luxury and deep-rooted culture meet.",
    },
    ar: {
      // Home
      "home.heroName": "تيمور كونتيننتال",
      "home.heroSubName": "فندق ومركز مؤتمرات",
      "home.heroCity": "غازيانتيب",
      "home.heroTitle": "فخامة خمس نجوم في قلب غازيانتيب",
      "home.heroSubtitle": "مرحباً بكم في فندقنا ذي الخمس نجوم حيث تلتقي الراحة الحديثة بالأناقة التقليدية في عاصمة النكهات والثقافة على طريق الحرير التاريخي.",
      "home.roomsTitle": "الغرف والأجنحة",
      "home.roomsDesc": "تجمع كل غرفة من غرفنا بين أناقة غازيانتيب العريقة والراحة العصرية لتقديم تجربة إقامة لا مثيل لها.",
      "home.aboutTeaserTitle": "قصة",
      "home.aboutTeaserTitleAccent": "إرث",
      "home.aboutTeaserDesc": "يجمع فندق تيمور كونتيننتال بين الفخامة الخالدة والثقافة العريقة في قلب غازيانتيب. مع أكثر من 250 غرفة ومطعم حائز على جوائز ومركز مؤتمرات عالمي المستوى، نحن أرقى عنوان في المنطقة.",
      "home.aboutTeaserStat1l": "غرفة وجناح",
      "home.aboutTeaserStat2l": "قاعات فعاليات",
      "home.finalCtaTitle1": "أرقى عنوان في",
      "home.finalCtaTitle2": "غازيانتيب",
      "home.experience360Title": "جولة افتراضية 360°",
      "home.experience360Subtitle": "اكتشف غرفنا وبهونا وجميع مرافقنا افتراضياً.",
      // About
      "about.heroTitle": "فخامة خمس نجوم في قلب غازيانتيب",
      "about.heroText1": "نحن فندق من خمس نجوم يجمع بين الضيافة التقليدية والفخامة الحديثة في قلب غازيانتيب، المحطة العريقة والغنية بالنكهات على طريق الحرير التاريخي. نقف عند ملتقى الثقافة والغاسترونومي وعالم الأعمال.",
      "about.heroText2": "تتحدد هويتنا المؤسسية من خلال نهج يحترم التاريخ الغني للمدينة ويضع الخدمة المتميزة ورضا الضيوف غير المشروط في مركزه.",
      "about.storyLabel": "المؤسسة",
      "about.storyTitle": "نفخر بأخذ نهجنا في السياحة المستدامة إلى مستويات أعلى كل يوم",
      "about.storyText1": "جعلنا الاستدامة جزءاً لا يتجزأ من ثقافتنا المؤسسية من خلال ممارساتنا الحساسة بيئياً وسياسات توفير الطاقة والمياه وعمليات إدارة النفايات.",
      "about.storyText2": "بوعي بمسؤولياتنا تجاه الطبيعة والمجتمع والمستقبل، نواصل تقديم تجربة إقامة أكثر قابلية للحياة واستدامة لضيوفنا.",
      "about.visionTitle": "أن نصبح العلامة التجارية التي يريد الجميع تجربتها",
      "about.missionTitle": "الحفاظ على الثقافة والراحة والضيافة معاً",
      // Home - extra fields
      "home.roomsTitle": "الغرف والأجنحة",
      "home.roomsDesc": "تجمع كل غرفة بين أناقة غازيانتيب العريقة والراحة العصرية لتقديم تجربة إقامة لا مثيل لها.",
      "home.experience360Title": "جولة افتراضية 360°",
      "home.experience360Subtitle": "اكتشف غرفنا وبهونا وجميع مرافقنا افتراضياً.",
      // Experience panels
      "home.exp0.eyebrow": "إرث غازيانتيب التذوقي",
      "home.exp0.title": "فن الطهي",
      "home.exp0.titleAccent": "في غازيانتيب",
      "home.exp0.desc": "اكتشف النكهات الفريدة لغازيانتيب، المصنّفة مدينة غاسترونومي إبداعية من قبل اليونسكو، في الجو الأنيق لمطعم سوف.",
      "home.exp0.cta": "استكشاف المطعم",
      "home.exp1.eyebrow": "مركز الصحة",
      "home.exp1.title": "الجسد والروح",
      "home.exp1.titleAccent": "سكينة",
      "home.exp1.desc": "جدد نفسك بطقوس الحمام التركي وعلاجات التدليك ومرافق اللياقة البدنية الحديثة. ابتعد عن صخب المدينة.",
      "home.exp1.cta": "مركز الصحة",
      "home.exp2.eyebrow": "الفعاليات",
      "home.exp2.title": "لحظات",
      "home.exp2.titleAccent": "لا تُنسى",
      "home.exp2.desc": "مع مركز المؤتمرات الذي يستوعب أكثر من 2000 ضيف وبنية القاعات الحديثة، ننظم فعاليات بجميع الأحجام باحترافية.",
      "home.exp2.cta": "قاعات الفعاليات",
      // Room preview names
      "home.room0.name": "غرفة فرنسية قياسية",
      "home.room1.name": "غرفة توأم قياسية",
      "home.room2.name": "غرفة ثلاثية قياسية",
      "home.room3.name": "جناح عائلي",
      "home.room4.name": "جناح كينج",
      "home.room5.name": "غرفة ذوي الاحتياجات الخاصة",
      // Testimonials
      "home.test0.text": "كان فندق تيمور كونتيننتال أكثر إقاماتي لا تُنسى في غازيانتيب. الخدمة والطعام كانا رائعين.",
      "home.test0.author": "أحمد يلماظ",
      "home.test0.city": "إسطنبول",
      "home.test1.text": "خدمة استثنائية وغرف رائعة. إفطار البوفيه المفتوح بنكهات غازيانتيب المحلية كان تجربة لا تُنسى.",
      "home.test1.author": "سارة ميتشيل",
      "home.test1.city": "لندن",
      "home.test2.text": "فندق تيمور كونتيننتال تجربة استثنائية. الخدمة الراقية والأجواء الفاخرة لا مثيل لها.",
      "home.test2.author": "ليلى الراشد",
      "home.test2.city": "دبي",
      // About teaser extras
      "home.aboutTeaserTitle": "قصة",
      "home.aboutTeaserTitleAccent": "إرث",
      "home.aboutTeaserStat1l": "غرفة وجناح",
      "home.aboutTeaserStat2l": "قاعات فعاليات",
      "home.finalCtaTitle1": "أرقى عنوان في",
      "home.finalCtaTitle2": "غازيانتيب",
      // Gaziantep
      "gz.heroTitle": "غازيانتيب",
      "gz.heroSubtitle": "المدينة الأسطورية حيث يلتقي التاريخ والثقافة والنكهة",
      "gz.introTitle": "إرث آلاف السنين",
      "gz.introDesc": "بتاريخ استيطاني متواصل لحوالي 9000 عام، تُعدّ غازيانتيب من أعرق مدن تركيا. صنّفتها اليونسكو عام 2015 'مدينة غاسترونومي إبداعية'، وتحتل المدينة مكانة بارزة بين وجهات الطهي الرائدة في العالم ببقلاوتها المسجلة جغرافياً وفستقها الحلبي الشهير وكبابها المتنوع وكاتمرها.",
      "gz.gastronomyLabel": "الغاسترونومي",
      "gz.gastronomyTitle": "مطبخ غازيانتيب",
      "gz.gastronomyDesc": "غازيانتيب، بتقاليدها الطهوية التي تمتد 9000 عام، هي من أعرق عواصم الطهي في العالم. كل لقمة تحمل روح هذه المدينة العريقة.",
      "gz.baklavaLabel": "إرث النكهة",
      "gz.baklavaTitle": "تاريخ البقلاوة",
      "gz.baklavaDesc": "بقلاوة غازيانتيب هي البقلاوة الوحيدة المسجلة جغرافياً في العالم. هذه الحلوى المصنوعة بعبير الفستق الحلبي الفريد وطبقات العجين الرفيعة، تقليد متوارث من جيل إلى جيل على مدى قرون.",
      "gz.attractionsTitle": "في انتظار الاكتشاف",
      "gz.att0.title": "قلعة غازيانتيب", "gz.att0.category": "تاريخ", "gz.att0.distance": "10 دقائق", "gz.att0.period": "القرن 4-6 م", "gz.att0.desc": "قلعة تاريخية تعلو وسط المدينة. بجدرانها البازلتية وأبراجها التي تعود لآلاف السنين، تمثل إرثاً تاريخياً لا مثيل له.",
      "gz.att1.title": "متحف زيوغما للفسيفساء", "gz.att1.category": "ثقافة", "gz.att1.distance": "12 دقيقة", "gz.att1.period": "أكبر متحف فسيفساء في العالم", "gz.att1.desc": "بمساحة سطحية تبلغ حوالي 3500 م²، هذا أكبر متحف للفسيفساء في العالم، يحافظ على الفسيفساء النادرة من العصر الروماني.",
      "gz.att2.title": "بقلاوة غازيانتيب", "gz.att2.category": "غاسترونومي", "gz.att2.distance": "5 دقائق", "gz.att2.period": "مدينة غاسترونومي يونسكو", "gz.att2.desc": "تجربة البقلاوة الطازجة من الأساتذة في الأسواق التاريخية لغازيانتيب، مهد أشهر حلوى في العالم.",
      "gz.att3.title": "سوق النحاسين", "gz.att3.category": "ثقافة", "gz.att3.distance": "8 دقائق", "gz.att3.period": "السوق المغطى التاريخي", "gz.att3.desc": "في هذا السوق التاريخي حيث استمر فن النحاسة لقرون، يمكنك إيجاد منتجات النحاس المصنوعة يدوياً والحرف التقليدية لأنطاكيا.",
      // Contact
      "contact.heroTitle": "نحن هنا من أجلك",
      "contact.infoTitle": "معلومات الاتصال",
      "contact.formTitle": "راسلنا",
      "contact.submitButtonText": "إرسال الرسالة",
      "contact.subj0": "معلومات عامة",
      "contact.subj1": "الحجز",
      "contact.subj2": "الفعاليات",
      "contact.subj3": "الآراء والاقتراحات",
      // Career
      "career.heroTitle": "انضم إلى فريقنا",
      "career.introTitle": "شكّل مسيرتك المهنية في فندق تيمور كونتيننتال",
      "career.introDesc": "اغتنم الفرصة للعمل في أحد أرقى الفنادق في تركيا. انضم إلى فريقنا الديناميكي، طوّر مهاراتك، وتقدم في مسيرتك المهنية في صناعة الضيافة.",
      "career.submitButtonText": "إرسال الطلب",
      "career.pos0.title": "موظف استقبال", "career.pos0.department": "المكتب الأمامي", "career.pos0.type": "دوام كامل",
      "career.pos1.title": "طاه / طاه مساعد", "career.pos1.department": "المطبخ", "career.pos1.type": "دوام كامل",
      "career.pos2.title": "موظف تدبير منزلي", "career.pos2.department": "التدبير المنزلي", "career.pos2.type": "دوام كامل",
      "career.pos3.title": "معالج سبا", "career.pos3.department": "الصحة والعافية", "career.pos3.type": "دوام جزئي",
      "career.pos4.title": "منسق فعاليات", "career.pos4.department": "المؤتمرات", "career.pos4.type": "دوام كامل",
      // Gallery
      "gallery.heroTitle": "معرض الصور",
      // Wellness / Spa / Fitness
      "wellness.heroTitle": "الصحة والسبا",
      "spa.heroTitle": "سبا والحمام التركي",
      "spa.s0.label": "سبا", "spa.s0.title": "الاسترخاء والتجديد", "spa.s0.desc": "يجمع فندق تيمور كونتيننتال سبا والصحة بين تقاليد الحمام العثماني التي امتدت لقرون والعلاجات المعاصرة لتقديم تجربة شفاء لا مثيل لها.",
      "spa.s1.label": "الحمام التركي", "spa.s1.title": "سكينة حقيقية", "spa.s1.desc": "عيش تجربة التطهير العميق من خلال طقوس الحمام التقليدية الموروثة من العصر العثماني. جدد جسدك وروحك بالكيس التقليدي ومساج الرغوة وغرف البخار وحجر البطن الرخامي.",
      "spa.s2.label": "العناية بالجسم", "spa.s2.title": "الكيس والتقشير", "spa.s2.desc": "طقوس الكيس والتقشير التقليدية التي يطبقها فريقنا المتخصص تنظف بشرتك بعمق وتجددها. عيش أرقى ممارسات تقليد الحمام العثماني.",
      "fit.heroTitle": "اللياقة البدنية",
      "fit.s0.label": "اللياقة البدنية", "fit.s0.title": "القوة والتكييف", "fit.s0.desc": "يقدم مركز اللياقة البدنية في فندق تيمور كونتيننتال تجربة رياضية متكاملة للضيوف بأحدث المعدات والمدربين المتخصصين.",
      "fit.s1.label": "كارديو والأوزان", "fit.s1.title": "معدات احترافية", "fit.s1.desc": "في منطقة الكارديو والأوزان الواسعة لدينا، يمكنك التمرين بأحدث الأجهزة الرياضية. يُعدّ مدربونا الشخصيون برامج مناسبة لأهدافك.",
      // Footer
      "g.hotelName": "فندق تيمور كونتيننتال",
      "g.tagline": "عنوان فريد في قلب غازيانتيب حيث تلتقي الفخامة الخالدة بالثقافة العريقة.",
      "f.description": "عنوان فريد في قلب غازيانتيب حيث تلتقي الفخامة الخالدة بالثقافة العريقة.",
      "f.copyright": "© 2024 فندق تيمور كونتيننتال. جميع الحقوق محفوظة.",
      "f.certTitle": "السياحة المستدامة",
      "f.certSubtitle": "فندق أخضر معتمد",
      "f.certModalTitle": "شهادة السياحة المستدامة",
      "f.certModalBody": "بوصفنا فندق تيمور كونتيننتال، جعلنا السياحة المستدامة جزءاً لا يتجزأ من ثقافتنا المؤسسية من خلال ممارساتنا الحساسة بيئياً وسياسات توفير الطاقة والمياه وعمليات إدارة النفايات.",
      // Genel
      "global.hotelName": "فندق تيمور كونتيننتال",
      "global.tagline": "عنوان فريد في قلب غازيانتيب حيث تلتقي الفخامة الخالدة بالثقافة العريقة.",
    },
  },
  footer: {
    description: "Gaziantep'in kalbinde, zamansız lüks ve köklü kültürün buluştuğu eşsiz bir adres.",
    copyright: "© 2024 Teymur Continental Hotel. Tüm hakları saklıdır.",
    certTitle: "Sürdürülebilir Turizm",
    certSubtitle: "Sertifikalı Yeşil Otel",
    certModalTitle: "Sürdürülebilir Turizm Sertifikası",
    certModalBody: "Teymur Continental Hotel olarak çevreye duyarlı uygulamalarımız, enerji ve su tasarrufu politikamız ve atık yönetimi süreçlerimiz ile sürdürülebilir turizm anlayışını kurum kültürümüzün ayrılmaz bir parçası haline getirdik.",
  },
};

const STORAGE_KEY = "teymur_cms_content";

function loadContent(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Deep merge to ensure new default fields appear
      return deepMerge(DEFAULT_CONTENT, parsed);
    }
  } catch {
    // ignore
  }
  return DEFAULT_CONTENT;
}

function deepMerge(defaults: Record<string, unknown>, overrides: Record<string, unknown>): Record<string, unknown> {
  const result = { ...defaults };
  for (const key in overrides) {
    if (
      overrides[key] !== null &&
      typeof overrides[key] === "object" &&
      !Array.isArray(overrides[key]) &&
      typeof defaults[key] === "object" &&
      !Array.isArray(defaults[key]) &&
      defaults[key] !== null
    ) {
      result[key] = deepMerge(
        defaults[key] as Record<string, unknown>,
        overrides[key] as Record<string, unknown>
      );
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
}

interface ContentContextType {
  content: SiteContent;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => loadContent());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => {
      const next = updater(prev);
      return next;
    });
  };

  const resetContent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(DEFAULT_CONTENT);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): SiteContent {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx.content;
}

export function useUpdateContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useUpdateContent must be used within ContentProvider");
  return ctx.updateContent;
}

export function useResetContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useResetContent must be used within ContentProvider");
  return ctx.resetContent;
}

export function useTranslations() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useTranslations must be used within ContentProvider");
  const { content, updateContent } = ctx;
  const setTr = (lang: "en" | "ar", key: string, value: string) => {
    updateContent(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: { ...prev.translations[lang], [key]: value },
      },
    }));
  };
  return { translations: content.translations, setTranslation: setTr };
}

/** Site sayfaları için: mevcut dile göre çeviri döner, yoksa TR fallback */
export function useT(): (key: string, fallback: string) => string {
  const { lang } = useLang();
  const content = useContent();
  return (key: string, fallback: string): string => {
    if (lang === "tr") return fallback;
    const val = content.translations[lang as "en" | "ar"]?.[key];
    return val && val.trim() !== "" ? val : fallback;
  };
}
