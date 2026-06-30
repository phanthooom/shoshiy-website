import { useEffect, useRef, useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import "./styles.css";

import {
  Moon, Sun, Menu, ArrowRight, ArrowUpRight, ArrowLeft, Check, Send,
  GitBranch, ShieldCheck, MapPin, Code2, Map as MapIcon, LayoutGrid,
  Smartphone, Landmark, Building2, BrainCircuit, BarChart3, Cloud,
  Mail, Phone, Download, Linkedin, Github, Globe2, ChevronDown, X,
} from "lucide-react";

/* ─────────────────────────────────────────
   i18n — 3 languages
───────────────────────────────────────── */
const T = {
  en: {
    lang: "EN",
    nav: ["Home", "Services", "Solutions", "Work", "Technology", "Contact"],
    hero_eyebrow: "Digital engineering, from Tashkent to the world",
    hero_h1_1: "We engineer the",
    hero_h1_2: "digital state",
    hero_h1_3: "and the systems that run it.",
    hero_sub: "Shoshiy Group builds enterprise software, GIS platforms, and AI systems that power governments, ministries, and ambitious companies across Central Asia.",
    hero_cta1: "Start a project",
    hero_cta2: "View our work",
    stat1_l: "Projects delivered",
    stat2_l: "Gov. systems built",
    stat3_l: "Client retention",
    badge1: "850K+ daily requests",
    badge2: "ISO 27001 secured",
    badge3: "National GIS coverage",
    trust_label: "Trusted by institutions that can't afford to get it wrong",
    svc_eyebrow: "What we do",
    svc_h: "Capabilities engineered for scale.",
    svc_p: "Eight disciplines, one integrated team. We take systems from blank repository to national infrastructure.",
    sol_eyebrow: "Solutions",
    sol_h: "Built for the work that actually matters.",
    work_eyebrow: "Selected work",
    work_h: "Infrastructure with real users behind it.",
    work_p: "Platforms we've shipped. More are under NDA.",
    work_live: "Live →",
    stack_eyebrow: "Technology",
    stack_h: "A stack chosen for the next decade, not the last one.",
    stack_p: "Proven foundations with cutting-edge where it earns its keep.",
    stack_cta: "Talk architecture",
    reach_eyebrow: "National reach",
    reach_h: "Systems live in every region we serve.",
    reach_p: "From the capital to the most remote districts, our platforms keep running.",
    reach_cta: "Partner with us",
    ach1: "Projects shipped",
    ach2: "Daily requests served",
    ach3: "Government systems",
    ach4: "Client satisfaction",
    clients_eyebrow: "Clients",
    clients_h: "The reviews that get repeat contracts.",
    contact_eyebrow: "Contact",
    contact_h: "Tell us what you're building.",
    contact_p: "Whether it's a national platform or a focused MVP, we'll tell you straight whether we're the right team for it.",
    f_name: "Full name", f_email: "Work email", f_org: "Organization", f_svc: "Service", f_msg: "Project details",
    f_ph_name: "Jane Doe", f_ph_email: "jane@company.com", f_ph_org: "Acme Corp",
    f_ph_msg: "A few sentences about scope, timeline, and what success looks like.",
    f_send: "Send inquiry", f_sent: "Sent. We'll be in touch",
    f_err: "Error sending. Please email us directly.",
    pres_title: "Corporate presentation",
    pres_sub: "Capabilities, case studies & methodology · PDF",
    pres_btn: "Download",
    cta_h: "Ready to build something national-scale?",
    cta_p: "Let's turn the system you're imagining into infrastructure people depend on every day.",
    footer_tagline: "Engineering the digital state and the enterprise systems that run alongside it. Based in Tashkent, building for the world.",
    footer_services: "Services",
    footer_company: "Company",
    footer_connect: "Connect",
    copyright: "© 2026 Shoshiy Group. All rights reserved.",
    svc_explore: "Explore",
    sol_tabs: ["Enterprise software", "GIS technologies", "Mobile apps", "AI solutions", "Government systems"],
    uptime: "Uptime",
    nodes: "Active nodes",
    scroll: "Scroll",
    svc_other: "Something else",
    f_sending: "Sending...",
    contact_phone: "Phone",
    contact_office: "Office",
    contact_email: "Email",
  },
  ru: {
    lang: "RU",
    nav: ["Главная", "Услуги", "Решения", "Портфолио", "Технологии", "Контакт"],
    hero_eyebrow: "Цифровой инжиниринг — из Ташкента в мир",
    hero_h1_1: "Мы проектируем",
    hero_h1_2: "цифровое государство",
    hero_h1_3: "и системы, которые им управляют.",
    hero_sub: "Shoshiy Group разрабатывает корпоративное ПО, ГИС-платформы и AI-системы для правительств, министерств и амбициозных компаний Центральной Азии.",
    hero_cta1: "Начать проект",
    hero_cta2: "Посмотреть работы",
    stat1_l: "Проектов сдано",
    stat2_l: "Гос. систем построено",
    stat3_l: "Клиентов возвращается",
    badge1: "850K+ запросов в день",
    badge2: "Защита ISO 27001",
    badge3: "Национальное ГИС-покрытие",
    trust_label: "Нам доверяют организации, которые не могут позволить себе ошибку",
    svc_eyebrow: "Что мы делаем",
    svc_h: "Компетенции для масштаба.",
    svc_p: "Восемь дисциплин, одна слаженная команда. От пустого репозитория до национальной инфраструктуры.",
    sol_eyebrow: "Решения",
    sol_h: "Создано для работы, которая действительно важна.",
    work_eyebrow: "Избранные работы",
    work_h: "Инфраструктура с реальными пользователями.",
    work_p: "Платформы, которые мы запустили. Остальные под NDA.",
    work_live: "Открыть →",
    stack_eyebrow: "Технологии",
    stack_h: "Стек, выбранный на следующее десятилетие.",
    stack_p: "Проверенные основы и передовые технологии там, где они оправданы.",
    stack_cta: "Обсудить архитектуру",
    reach_eyebrow: "Национальный охват",
    reach_h: "Системы работают в каждом регионе.",
    reach_p: "От столицы до самых отдалённых районов — наши платформы не останавливаются.",
    reach_cta: "Стать партнёром",
    ach1: "Проектов сдано",
    ach2: "Запросов в день",
    ach3: "Государственных систем",
    ach4: "Удовлетворённость клиентов",
    clients_eyebrow: "Клиенты",
    clients_h: "Отзывы, которые приводят к повторным контрактам.",
    contact_eyebrow: "Контакт",
    contact_h: "Расскажите, что вы строите.",
    contact_p: "Будь то национальная платформа или MVP — мы честно скажем, подходим ли мы для этой задачи.",
    f_name: "Полное имя", f_email: "Рабочий email", f_org: "Организация", f_svc: "Услуга", f_msg: "Детали проекта",
    f_ph_name: "Иван Иванов", f_ph_email: "ivan@company.com", f_ph_org: "Ваша компания",
    f_ph_msg: "Несколько предложений о масштабе, сроках и критериях успеха.",
    f_send: "Отправить запрос", f_sent: "Отправлено. Свяжемся с вами",
    f_err: "Ошибка отправки. Напишите нам напрямую.",
    pres_title: "Корпоративная презентация",
    pres_sub: "Компетенции, кейсы и методология · PDF",
    pres_btn: "Скачать",
    cta_h: "Готовы создать что-то масштабное?",
    cta_p: "Превратим систему, которую вы представляете, в инфраструктуру, от которой зависят миллионы.",
    footer_tagline: "Проектируем цифровое государство и корпоративные системы рядом с ним. Базируемся в Ташкенте, строим для всего мира.",
    footer_services: "Услуги",
    footer_company: "Компания",
    footer_connect: "Контакты",
    copyright: "© 2026 Shoshiy Group. Все права защищены.",
    svc_explore: "Подробнее",
    sol_tabs: ["Корп. программное обеспечение", "ГИС-технологии", "Мобильные приложения", "AI-решения", "Государственные системы"],
    uptime: "Доступность",
    nodes: "Активных узлов",
    scroll: "Прокрутите",
    svc_other: "Другое",
    f_sending: "Отправка...",
    contact_phone: "Телефон",
    contact_office: "Офис",
    contact_email: "Email",
  },
  uz: {
    lang: "UZ",
    nav: ["Bosh sahifa", "Xizmatlar", "Yechimlar", "Portfel", "Texnologiya", "Aloqa"],
    hero_eyebrow: "Raqamli muhandislik — Toshkentdan dunyoga",
    hero_h1_1: "Biz yaratamiz",
    hero_h1_2: "raqamli davlat",
    hero_h1_3: "va uni boshqaradigan tizimlarni.",
    hero_sub: "Shoshiy Group — O'rta Osiyodagi hukumatlar, vazirliklar va yirik kompaniyalar uchun korporativ dasturiy ta'minot, GIS platformalar va AI tizimlar yaratadi.",
    hero_cta1: "Loyiha boshlash",
    hero_cta2: "Ishlarimizni ko'rish",
    stat1_l: "Yakunlangan loyihalar",
    stat2_l: "Qurilgan davlat tizimlari",
    stat3_l: "Mijozlar qaytadi",
    badge1: "Kuniga 850K+ so'rov",
    badge2: "ISO 27001 xavfsizligi",
    badge3: "Milliy GIS qamrovi",
    trust_label: "Xato qilolmaydigan tashkilotlar bizga ishonadi",
    svc_eyebrow: "Nima qilamiz",
    svc_h: "Katta miqyos uchun qurilgan imkoniyatlar.",
    svc_p: "Sakkiz yo'nalish, bitta jamoaviy komanda. Bo'sh repozitoriydan milliy infratuzilmaga qadar.",
    sol_eyebrow: "Yechimlar",
    sol_h: "Haqiqatan muhim ish uchun qurilgan.",
    work_eyebrow: "Tanlangan ishlar",
    work_h: "Real foydalanuvchilar bilan infratuzilma.",
    work_p: "Biz ishga tushirgan platformalar. Qolganlari NDA ostida.",
    work_live: "Ochish →",
    stack_eyebrow: "Texnologiya",
    stack_h: "Keyingi o'n yillik uchun tanlangan stack.",
    stack_p: "Ishonchli asoslar va o'z joyida ilg'or texnologiyalar.",
    stack_cta: "Arxitektura haqida gaplashish",
    reach_eyebrow: "Milliy qamrov",
    reach_h: "Tizimlar har bir hududda ishlaydi.",
    reach_p: "Poytaxtdan eng uzoq tumanlargacha — platformalarimiz to'xtamaydi.",
    reach_cta: "Hamkor bo'lish",
    ach1: "Yakunlangan loyihalar",
    ach2: "Kunlik so'rovlar",
    ach3: "Davlat tizimlari",
    ach4: "Mijoz mamnuniyati",
    clients_eyebrow: "Mijozlar",
    clients_h: "Takroriy shartnomalar keltiradigan sharhlar.",
    contact_eyebrow: "Aloqa",
    contact_h: "Nima qurayotganingizni ayting.",
    contact_p: "Milliy platforma yoki MVP bo'lsin — biz to'g'ridan-to'g'ri aytamiz, biz to'g'ri jamoa ekanligimizni.",
    f_name: "To'liq ism", f_email: "Ish emaili", f_org: "Tashkilot", f_svc: "Xizmat", f_msg: "Loyiha tafsilotlari",
    f_ph_name: "Abdulloh Karimov", f_ph_email: "abdulloh@company.com", f_ph_org: "Kompaniyangiz",
    f_ph_msg: "Qamrov, muddat va muvaffaqiyat mezonlari haqida bir necha gap.",
    f_send: "So'rov yuborish", f_sent: "Yuborildi. Tez orada bog'lanamiz",
    f_err: "Yuborishda xato. Bevosita yozing.",
    pres_title: "Korporativ taqdimot",
    pres_sub: "Imkoniyatlar, keis-tadqiqotlar va metodologiya · PDF",
    pres_btn: "Yuklab olish",
    cta_h: "Milliy miqyosda biror narsa qurishga tayyormisiz?",
    cta_p: "Tasavvur qilgan tizimingizni millionlar tayanadigan infratuzilmaga aylantiramiz.",
    footer_tagline: "Raqamli davlat va yonidagi korporativ tizimlarni loyihalash. Toshkentdan, butun dunyo uchun.",
    footer_services: "Xizmatlar",
    footer_company: "Kompaniya",
    footer_connect: "Bog'lanish",
    copyright: "© 2026 Shoshiy Group. Barcha huquqlar himoyalangan.",
    svc_explore: "Ko'proq",
    sol_tabs: ["Korporativ dasturlar", "GIS texnologiyalar", "Mobil ilovalar", "AI yechimlar", "Davlat tizimlari"],
    uptime: "Ishlash vaqti",
    nodes: "Faol tugunlar",
    scroll: "Aylantiring",
    svc_other: "Boshqa",
    f_sending: "Yuborilmoqda...",
    contact_phone: "Telefon",
    contact_office: "Ofis",
    contact_email: "Email",
  },
};

/* ─────────────────────────────────────────
   Static data (language-independent)
───────────────────────────────────────── */
const SERVICES_DATA = [
  { Icon: Code2, key: "Software Development" },
  { Icon: MapIcon, key: "GIS Solutions" },
  { Icon: LayoutGrid, key: "Web Platforms" },
  { Icon: Smartphone, key: "Mobile Applications" },
  { Icon: Landmark, key: "Government Digitalization" },
  { Icon: Building2, key: "Enterprise Systems" },
  { Icon: BrainCircuit, key: "Artificial Intelligence" },
  { Icon: BarChart3, key: "Data Analytics" },
  { Icon: Cloud, key: "Cloud Technologies" },
];

const SERVICES_I18N = {
  en: [
    { t: "Software Development", d: "Custom platforms built on clean architecture, designed to outlive their first release." },
    { t: "GIS Solutions", d: "Spatial intelligence, cadastre, and mapping systems built on ArcGIS and open geo stacks." },
    { t: "Web Platforms", d: "High-traffic portals and dashboards that stay fast under millions of sessions." },
    { t: "Mobile Applications", d: "Native-grade iOS and Android experiences with offline-first reliability." },
    { t: "Government Digitalization", d: "e-Gov services, registries, and inter-agency systems built for the public good." },
    { t: "Enterprise Systems", d: "ERP, CRM, and workflow engines that replace spreadsheets with real infrastructure." },
    { t: "Artificial Intelligence", d: "LLMs, computer vision, and decision systems wired directly into your operations." },
    { t: "Data Analytics", d: "Pipelines and warehouses that turn raw events into decisions leadership can act on." },
    { t: "Cloud Technologies", d: "Resilient, observable infrastructure on Kubernetes, designed to scale on demand." },
  ],
  ru: [
    { t: "Разработка ПО", d: "Нестандартные платформы на чистой архитектуре, способные пережить своё первое издание." },
    { t: "ГИС-решения", d: "Пространственный интеллект, кадастр и картографические системы на ArcGIS и открытых геостеках." },
    { t: "Веб-платформы", d: "Высоконагруженные порталы и дашборды, работающие быстро при миллионах сессий." },
    { t: "Мобильные приложения", d: "iOS и Android приложения нативного уровня с поддержкой работы офлайн." },
    { t: "Цифровизация гос. органов", d: "Электронные услуги, реестры и межведомственные системы на благо общества." },
    { t: "Корпоративные системы", d: "ERP, CRM и движки рабочих процессов, заменяющие таблицы реальной инфраструктурой." },
    { t: "Искусственный интеллект", d: "LLM, компьютерное зрение и системы принятия решений внутри ваших процессов." },
    { t: "Аналитика данных", d: "Конвейеры и хранилища, превращающие сырые данные в управленческие решения." },
    { t: "Облачные технологии", d: "Надёжная и наблюдаемая инфраструктура на Kubernetes, масштабируемая по требованию." },
  ],
  uz: [
    { t: "Dasturiy ta'minot ishlab chiqish", d: "Sof arxitekturada qurilgan maxsus platformalar, birinchi versiyasidan uzoqqa mo'ljallangan." },
    { t: "GIS yechimlari", d: "ArcGIS va ochiq geo-stacklarda qurilgan fazoviy intellekt, kadastr va xaritalash tizimlari." },
    { t: "Veb platformalar", d: "Millionlab sessiyalarda tez ishlaydigan yuqori yuklamalı portallar va boshqaruv panellari." },
    { t: "Mobil ilovalar", d: "Offline-first ishonchliligi bilan iOS va Android uchun nativ darajadagi tajriba." },
    { t: "Davlatni raqamlashtirish", d: "Jamiyat manfaati uchun qurilgan e-Gov xizmatlar, reyestrlar va idoralararo tizimlar." },
    { t: "Korporativ tizimlar", d: "Jadvallarni haqiqiy infratuzilma bilan almashtiruvchi ERP, CRM va workflow tizimlari." },
    { t: "Sun'iy intellekt", d: "Operatsiyalaringiz ichiga kiritilgan LLM, kompyuter ko'rish va qaror qabul qilish tizimlari." },
    { t: "Ma'lumotlar tahlili", d: "Xom hodisalarni rahbariyat uchun qarorlarga aylantiruvchi quvurlar va omborlar." },
    { t: "Cloud texnologiyalar", d: "Kubernetes'dagi bardoshli, kuzatiladigan infratuzilma, talab bo'yicha kengayadi." },
  ],
};

const SOLUTIONS_I18N = {
  en: [
    { tag: "Enterprise", h: "Systems of record your whole org runs on.", p: "We replace the patchwork of spreadsheets and legacy tools with one coherent platform: finance, logistics, HR, and operations.", f: ["ERP & CRM tailored to your processes", "Role-based access & full audit trails", "On-prem or private cloud deployment", "Migration from legacy systems"] },
    { tag: "Geospatial", h: "Maps that make decisions, not just pictures.", p: "National cadastre, utility networks, and field operations powered by ArcGIS and open geospatial stacks, with real-time spatial analytics layered on top.", f: ["Cadastre & land registry platforms", "Real-time asset & fleet tracking", "Custom spatial analytics engines", "Offline field-data collection"] },
    { tag: "Mobile", h: "Apps people open every single day.", p: "Native-grade iOS and Android products with offline-first sync, biometric security, and the kind of polish that earns a permanent spot on the home screen.", f: ["Offline-first architecture", "Biometric & secure auth", "Push, geofencing & deep links", "Shared codebase, native feel"] },
    { tag: "AI", h: "Intelligence wired into your operations.", p: "From document understanding to predictive forecasting, we ship AI that lives inside your workflows, with guardrails and human oversight built in.", f: ["LLM-powered assistants & search", "Computer vision & OCR pipelines", "Forecasting & anomaly detection", "Private, on-prem model hosting"] },
    { tag: "e-Government", h: "Public services that respect citizens' time.", p: "Registries, e-services, and inter-agency platforms built to national-scale reliability and security standards, serving millions without breaking a sweat.", f: ["Citizen-facing e-service portals", "Inter-agency data exchange", "Digital identity integration", "Compliance & national security standards"] },
  ],
  ru: [
    { tag: "Enterprise", h: "Системы учёта, на которых работает вся организация.", p: "Заменяем лоскутное одеяло из таблиц и устаревших инструментов единой платформой: финансы, логистика, HR и операции.", f: ["ERP и CRM под ваши процессы", "Ролевой доступ и полные журналы аудита", "On-prem или частное облако", "Миграция с устаревших систем"] },
    { tag: "Геопространство", h: "Карты, принимающие решения, а не просто картинки.", p: "Национальный кадастр, коммунальные сети и полевые операции на ArcGIS и открытых геостеках с пространственной аналитикой в реальном времени.", f: ["Кадастровые и земельные реестры", "Отслеживание активов и флота в реальном времени", "Движки пространственной аналитики", "Сбор данных в поле офлайн"] },
    { tag: "Мобайл", h: "Приложения, которые открывают каждый день.", p: "iOS и Android продукты нативного уровня с офлайн-синхронизацией, биометрической защитой и полировкой, которая заслуживает постоянного места на главном экране.", f: ["Offline-first архитектура", "Биометрическая и безопасная авторизация", "Push, геофенсинг и deep links", "Общая кодовая база, нативное ощущение"] },
    { tag: "AI", h: "Интеллект, встроенный в ваши операции.", p: "От понимания документов до прогнозирования — мы внедряем AI в ваши рабочие процессы с встроенными ограничителями и человеческим контролем.", f: ["LLM-ассистенты и поиск", "Компьютерное зрение и OCR-конвейеры", "Прогнозирование и обнаружение аномалий", "Частный хостинг моделей on-prem"] },
    { tag: "е-Правительство", h: "Государственные услуги, уважающие время граждан.", p: "Реестры, электронные услуги и межведомственные платформы, построенные для надёжности и безопасности национального масштаба.", f: ["Порталы электронных услуг для граждан", "Межведомственный обмен данными", "Интеграция цифровой идентификации", "Соответствие национальным стандартам безопасности"] },
  ],
  uz: [
    { tag: "Enterprise", h: "Butun tashkilot ishonadigan yozuv tizimlari.", p: "Jadvallar va eski vositalarning yig'indisini yagona platforma bilan almashtiramiz: moliya, logistika, HR va operatsiyalar.", f: ["Jarayonlaringizga moslashtirilgan ERP va CRM", "Rol asosidagi kirish va audit izlari", "On-prem yoki xususiy cloud", "Eski tizimlardan migratsiya"] },
    { tag: "Geofazoviy", h: "Rasm emas, qaror qabul qiladigan xaritalar.", p: "ArcGIS va ochiq geofazoviy stacklarda qurilgan milliy kadastr, kommunal tarmoqlar va dala operatsiyalari.", f: ["Kadastr va yer reestri platformalari", "Real vaqtda aktiv va flot kuzatuvi", "Maxsus fazoviy tahlil tizimlari", "Dala ma'lumotlarini offline yig'ish"] },
    { tag: "Mobil", h: "Har kuni ochib ko'riladigan ilovalar.", p: "Offline-first sinxronizatsiya, biometrik xavfsizlik va doimiy uy ekrani joyini topish uchun mo'ljallangan iOS va Android mahsulotlar.", f: ["Offline-first arxitektura", "Biometrik va xavfsiz autentifikatsiya", "Push, geofencing va deep links", "Umumiy kod bazasi, nativ his"] },
    { tag: "AI", h: "Operatsiyalaringizga ulangan intellekt.", p: "Hujjatlarni tushunishdan bashorat qilishgacha — cheklovlar va insoniy nazorat bilan ilovalar ichida yashovchi AI yuboramiz.", f: ["LLM-yordamchilar va qidiruv", "Kompyuter ko'rish va OCR quvurlari", "Bashorat qilish va anomaliyani aniqlash", "Xususiy, on-prem model hosting"] },
    { tag: "e-Hukumat", h: "Fuqarolarning vaqtini hurmat qiladigan davlat xizmatlari.", p: "Milliy miqyosli ishonchlilik va xavfsizlik standartlariga qurilgan reyestrlar, elektron xizmatlar va idoralararo platformalar.", f: ["Fuqarolarga mo'ljallangan elektron xizmat portallari", "Idoralararo ma'lumot almashinuvi", "Raqamli identifikatsiya integratsiyasi", "Muvofiqlik va milliy xavfsizlik standartlari"] },
  ],
};

/* Portfolio — real sites */
const PORTFOLIO = [
  { cls: "lg", g: "g-gis", live: "map",    cat: "Logistics · Platform", h: "Shoshiy Logistics", p: "Real-time cargo and fleet management platform serving Uzbekistan's logistics sector.", url: "https://logistics.shoshiy.uz/" },
  { cls: "",   g: "g-ai",  live: "grid",   cat: "SaaS · Survey",        h: "ProSurvey",          p: "Offline-first survey platform used by field teams across Uzbekistan.", url: "https://www.prosurvey.uz/" },
  { cls: "",   g: "g-fin", live: "chart",  cat: "Real Estate",           h: "Mulk.top",           p: "Property marketplace connecting buyers and sellers across Central Asia.", url: "https://mulk.top/" },
  { cls: "wide", g: "g-gov", live: "bars", cat: "Media · News",          h: "Darakchi Hi-Tech",   p: "High-traffic technology news section powering Uzbekistan's leading media platform.", url: "https://darakchi.uz/uz/categories/hi-tech" },
  { cls: "tall", g: "g-mob", live: "pulse",cat: "Mobile · Fitness",      h: "Matrix Fitness UZ",  p: "Digital presence and booking platform for Uzbekistan's premium fitness network.", url: "https://www.matrixfitness.uz/" },
  { cls: "",   g: "g-gis", live: "orbit",  cat: "E-commerce",            h: "Bozorli",            p: "Modern marketplace platform serving thousands of active buyers and sellers.", url: "https://bozorli.uz/en" },
  { cls: "",   g: "g-ai",  live: "orbit",  cat: "EdTech · LMS",          h: "SkillUp.uz",         p: "Online learning platform powering professional development across the region.", url: "https://skillup.uz/" },
  { cls: "",   g: "g-mob", live: "pulse",  cat: "NeuroTech · Health",    h: "Neuroxise",          p: "Digital platform for cognitive and neurological health, built for modern clinical workflows.", url: "https://neuroxise-website.vercel.app/" },
  { cls: "",   g: "g-mob", live: "signal", cat: "Telecom",               h: "HappyTel",           p: "Telecom service platform with mobile-first UX for digital subscriptions.", url: "https://happytel.uz/" },
  { cls: "",   g: "g-fin", live: "dots",   cat: "Cleaning · Service",    h: "Cleaning X",         p: "On-demand cleaning service booking platform with real-time scheduling.", url: "https://cleaning-x-lac.vercel.app/" },
  { cls: "",   g: "g-gov", live: "radar",  cat: "Food · Delivery",       h: "Kuda Pizza",         p: "Food delivery and ordering platform with dynamic menu management.", url: "https://kuda-pizza-nine.vercel.app/" },
  { cls: "",   g: "g-gis", live: "grid",   cat: "Legal · Inspection",    h: "Lyuki Revizor",      p: "Inspection management system for municipal infrastructure oversight.", url: "https://www.lyukirevizor.uz/" },
  { cls: "",   g: "g-ai",  live: "chart",  cat: "Travel",                h: "Botermi",            p: "Travel and tourism booking platform for the Uzbek market.", url: "https://botermi.uz/" },
  { cls: "",   g: "g-gov", live: "orbit",  cat: "Gov · Registry",        h: "Nikoh",              p: "Digital marriage registration and ceremony management platform for Uzbekistan.", url: "https://nikoh.shoshiy.uz/" },
];

const TECH = ["React", "ArcGIS", "Node.js", "PostgreSQL", "TypeScript", "Kubernetes", "PostGIS", "Python", "Go", "PyTorch", "Kafka", "Redis", "Next.js", "Swift", "Kotlin", "Terraform", "gRPC", "Flutter"];
const BIG_TECH = new Set(["React", "ArcGIS", "Node.js", "PostgreSQL"]);

/* Realistic numbers */
const ACH_NUMS = [
  { n: 28, s: "+", lKey: "ach1" },
  { n: 850, s: "K+", lKey: "ach2" },
  { n: 11, s: "+", lKey: "ach3" },
  { n: 94, s: "%", lKey: "ach4" },
];

const HERO_STATS = [
  { n: 28, s: "+", lKey: "stat1_l" },
  { n: 11, s: "+", lKey: "stat2_l" },
  { n: 94, s: "%", lKey: "stat3_l" },
];

const TESTI_DATA = [
  { av: "AK", nm: "Akmal Karimov", rl_en: "CIO, Ministry of Digital Development", rl_ru: "ИТ-директор, Министерство цифрового развития", rl_uz: "CIO, Raqamli rivojlanish vazirligi", q_en: "Shoshiy delivered a registry platform that other vendors said was impossible on our timeline. Eighteen months in, it hasn't gone down once.", q_ru: "Shoshiy сдал платформу реестра, которую другие поставщики считали нереальной в наши сроки. Полтора года — ни одного сбоя.", q_uz: "Shoshiy boshqa etkazib beruvchilar muddatimizda imkonsiz deb atagan reyestr platformasini taqdim etdi. O'n sakkiz oy — bitta ham to'xtash bo'lmadi." },
  { av: "DS", nm: "Dilnoza Saidova", rl_en: "Head of Geodata, UzGeo", rl_ru: "Руководитель геоданных, UzGeo", rl_uz: "Geodata bo'lim boshlig'i, UzGeo", q_en: "They don't just write code — they understand public infrastructure. The GIS platform handles peak load like it's nothing.", q_ru: "Они не просто пишут код — они понимают общественную инфраструктуру. ГИС-платформа справляется с пиковой нагрузкой без проблем.", q_uz: "Ular shunchaki kod yozishmaydi — ular ommaviy infratuzilmani tushunadilar. GIS platforma pik yuklamani muammosiz ko'taradi." },
  { av: "RT", nm: "Rustam Tashkentov", rl_en: "CTO, NaviBank", rl_ru: "Технический директор, NaviBank", rl_uz: "CTO, NaviBank", q_en: "Our core banking migration was the cleanest enterprise rollout I've seen in 12 years. Zero downtime, zero data loss.", q_ru: "Миграция нашего ядра банковской системы — самый чистый корпоративный запуск за 12 лет. Никаких простоев, никаких потерь данных.", q_uz: "Asosiy bank tizimimizning migratsiyasi — 12 yilda ko'rgan eng toza korporativ bosqich. Nol to'xtash vaqti, nol ma'lumot yo'qolishi." },
  { av: "MN", nm: "Madina Nazarova", rl_en: "Director of Operations, StatCom", rl_ru: "Директор по операциям, StatCom", rl_uz: "Operatsiyalar direktori, StatCom", q_en: "The document pipeline cut our processing time by 73%. The team treated accuracy and governance as non-negotiable.", q_ru: "Конвейер документов сократил время обработки на 73%. Команда относилась к точности и управлению как к неоспоримым требованиям.", q_uz: "Hujjat quvuri qayta ishlash vaqtimizni 73% ga qisqartirdi. Jamoa aniqlik va boshqaruvni muhokama qilib bo'lmaydigan talablar sifatida qaradi." },
];

const SOL_ANIM = ["bars", "map", "orbit", "radar", "grid"];

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion:reduce)").matches;

/* ─── hooks ─── */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.unobserve(el); } },
      { threshold: 0.14 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay * 0.08}s` }} {...rest}>
      {children}
    </Tag>
  );
}

function useAccent() {
  return useCallback(() => {
    if (typeof window === "undefined") return "#3B82F6";
    return getComputedStyle(document.documentElement).getPropertyValue("--accent-soft").trim() || "#3B82F6";
  }, []);
}

/* ─── count up (supports decimals) ─── */
function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const isDecimal = to % 1 !== 0;
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.unobserve(el);
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1500, 1);
        const v = to * (1 - Math.pow(1 - p, 4));
        setVal(isDecimal ? Math.round(v * 10) / 10 : Math.round(v));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, isDecimal]);
  return <span ref={ref}>{val}<span className="suffix">{suffix}</span></span>;
}

/* ─── Preloader ─── */
function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let p = 0, id;
    const tick = () => {
      p += Math.random() * 16 + 6;
      if (p >= 100) { setPct(100); id = setTimeout(() => { setDone(true); onDone(); }, 420); return; }
      setPct(Math.floor(p));
      id = setTimeout(tick, 90 + Math.random() * 120);
    };
    id = setTimeout(tick, 260);
    return () => clearTimeout(id);
  }, [onDone]);
  return (
    <div className={`loader ${done ? "done" : ""}`}>
      <div className="loader-inner">
        <div className="loader-logo-wrap">
          <ShoshiyLogoSVG size={52} />
        </div>
        <div className="loader-bar"><i style={{ width: `${pct}%` }} /></div>
        <div className="pct">{pct}</div>
      </div>
    </div>
  );
}

/* ─── Real Shoshiy Logo SVG (inline, theme-aware) ─── */
function ShoshiyLogoSVG({ size = 28, theme = "auto" }) {
  // "S" in accent blue, rest in currentColor
  // Matches the brand: bold wordmark, "S" highlighted
  return (
    <svg
      viewBox="0 0 220 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: size, width: "auto", display: "block", margin: "0 auto" }}
      aria-label="Shoshiy Group"
    >
      <text
        x="50%" y="42"
        textAnchor="middle"
        fontFamily="Inter Tight, Arial, sans-serif"
        fontWeight="800"
        fontSize="48"
        letterSpacing="-2"
      >
        <tspan fill="var(--accent-soft)">S</tspan><tspan fill="currentColor">hoshiy</tspan>
      </text>
    </svg>
  );
}

const Logo = ({ lang }) => (
  <a href="#top" className="logo magnetic">
    <ShoshiyLogoSVG size={30} />
  </a>
);

/* ─── Hero Canvas ─── */
function HeroCanvas({ start }) {
  const ref = useRef(null);
  const accent = useAccent();
  useEffect(() => {
    if (!start) return;
    const cv = ref.current, ctx = cv.getContext("2d");
    const reduce = prefersReduced();
    let W, H, DPR, cx, cy, raf;
    const size = () => {
      DPR = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W * 0.72; cy = H * 0.5;
    };
    size(); addEventListener("resize", size);
    const t = (1 + Math.sqrt(5)) / 2;
    let V = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
    const nm = Math.hypot(1, t); V = V.map((p) => p.map((c) => c / nm));
    const E = [];
    for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++)
      if (Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]) < 1.2) E.push([i, j]);
    const N = reduce ? 28 : 70, P = [];
    for (let i = 0; i < N; i++) P.push({ x: Math.random() * W, y: Math.random() * H, z: Math.random(), r: Math.random() * 1.6 + 0.4, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18 });
    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMove = (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; };
    addEventListener("mousemove", onMove);
    const txt = () => getComputedStyle(document.documentElement).getPropertyValue("--text-3").trim() || "#888";
    let a = 0;
    const frame = () => {
      a += reduce ? 0 : 0.0035; mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      ctx.clearRect(0, 0, W, H);
      const col = accent(), tc = txt();
      ctx.fillStyle = tc;
      for (const p of P) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.globalAlpha = 0.1 + p.z * 0.18; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
      const ax = a * 0.8 + my * 0.9, ay = a + mx * 0.9, R = Math.min(W, H) * 0.26;
      const pts = V.map(([x, y, z]) => {
        const y1 = y * Math.cos(ax) - z * Math.sin(ax), z1 = y * Math.sin(ax) + z * Math.cos(ax);
        const x2 = x * Math.cos(ay) + z1 * Math.sin(ay), z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
        const per = 2.6 / (2.6 + z2);
        return { x: cx + x2 * R * per, y: cy + y1 * R * per, z: z2, s: per };
      });
      for (const [i, j] of E) {
        const A = pts[i], B = pts[j], d = (A.z + B.z) / 2;
        ctx.globalAlpha = 0.18 + ((d + 1) / 2) * 0.55; ctx.strokeStyle = col;
        ctx.lineWidth = 0.6 + ((d + 1) / 2) * 1.1;
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
      }
      for (const p of pts) {
        ctx.globalAlpha = 0.4 + ((p.z + 1) / 2) * 0.6; ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.4 + p.s * 1.6, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("mousemove", onMove); };
  }, [start, accent]);
  return <canvas id="hero-canvas" ref={ref} />;
}

/* ─── Globe ─── */
function Globe({ start }) {
  const ref = useRef(null);
  const accent = useAccent();
  useEffect(() => {
    if (!start) return;
    const cv = ref.current, ctx = cv.getContext("2d");
    const reduce = prefersReduced();
    let W, H, DPR, cx, cy, R, raf;
    const size = () => {
      DPR = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W / 2; cy = H / 2; R = Math.min(W, H) * 0.38;
    };
    size(); addEventListener("resize", size);
    const pts = [], NP = reduce ? 260 : 620;
    for (let i = 0; i < NP; i++) {
      const y = 1 - (i / (NP - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
    const hot = Array.from({ length: 7 }, () => {
      const y = Math.random() * 2 - 1, r = Math.sqrt(1 - y * y), th = Math.random() * 7;
      return [Math.cos(th) * r, y, Math.sin(th) * r];
    });
    let a = 0;
    const project = ([x, y, z]) => {
      const x2 = x * Math.cos(a) + z * Math.sin(a), z2 = -x * Math.sin(a) + z * Math.cos(a);
      const per = 1.8 / (1.8 + z2);
      return { x: cx + x2 * R * per, y: cy + y * R * per, z: z2, s: per };
    };
    const frame = () => {
      a += reduce ? 0 : 0.0045; ctx.clearRect(0, 0, W, H);
      const col = accent();
      pts.forEach((p) => {
        const q = project(p), front = (q.z + 1) / 2;
        ctx.globalAlpha = 0.12 + front * 0.5; ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(q.x, q.y, 0.6 + q.s * 1.1, 0, 7); ctx.fill();
      });
      for (let i = 0; i < hot.length; i++) {
        const A = project(hot[i]), B = project(hot[(i + 1) % hot.length]);
        const mx2 = (A.x + B.x) / 2, my2 = (A.y + B.y) / 2 - 40;
        ctx.globalAlpha = 0.5; ctx.strokeStyle = col; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.quadraticCurveTo(mx2, my2, B.x, B.y); ctx.stroke();
        const pulse = (Math.sin(a * 5 + i) + 1) / 2;
        ctx.globalAlpha = 0.9; ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(A.x, A.y, 2 + pulse * 2, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); };
  }, [start, accent]);
  return <canvas id="globe-canvas" ref={ref} />;
}

/* ─── LiveCanvas ─── */
function LiveCanvas({ kind }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let raf, visible = false, a = 0;

    const sz = () => {
      cv.width = cv.clientWidth * 2; cv.height = cv.clientHeight * 2;
      ctx.setTransform(2, 0, 0, 2, 0, 0);
    };
    sz(); addEventListener("resize", sz);

    // Per-kind state (init once)
    const s = {};
    if (kind === "map") {
      s.nodes = Array.from({ length: 24 }, () => ({ x: Math.random(), y: Math.random() }));
    } else if (kind === "chart") {
      s.pts = Array.from({ length: 40 }, (_, i) => 0.5 + Math.sin(i * 0.5) * 0.2);
    } else if (kind === "bars") {
      s.N = 14;
      s.h = Array.from({ length: 14 }, () => Math.random());
      s.t = Array.from({ length: 14 }, () => 0.3 + Math.random() * 0.7);
    } else if (kind === "pulse") {
      s.pts = Array.from({ length: 90 }, () => 0.5);
    } else if (kind === "orbit") {
      s.rings = [
        { offset: 0, speed: 1.0 },
        { offset: Math.PI * 0.7, speed: 0.62 },
        { offset: Math.PI * 1.4, speed: 0.38 },
      ];
    } else if (kind === "dots") {
      s.b = Array.from({ length: 16 }, () => ({
        x: Math.random(), y: 1.05 + Math.random() * 0.4,
        r: 4 + Math.random() * 9, vy: -(0.0008 + Math.random() * 0.0012),
        ph: Math.random() * Math.PI * 2,
      }));
    } else if (kind === "radar") {
      s.blips = Array.from({ length: 5 }, () => ({
        ang: Math.random() * Math.PI * 2, d: 0.25 + Math.random() * 0.6, al: 0,
      }));
    } else if (kind === "signal") {
      // stateless
    } else if (kind === "grid") {
      // stateless
    }

    const draw = () => {
      if (visible) {
        const w = cv.clientWidth, h = cv.clientHeight;
        if (w && h) {
          ctx.clearRect(0, 0, w, h);

          if (kind === "map") {
            a += 0.004;
            const { nodes } = s;
            ctx.strokeStyle = "rgba(255,255,255,.18)"; ctx.lineWidth = 0.6;
            for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
              const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
              if (Math.hypot(dx, dy) < 0.26) {
                ctx.globalAlpha = 1;
                ctx.beginPath(); ctx.moveTo(nodes[i].x * w, nodes[i].y * h); ctx.lineTo(nodes[j].x * w, nodes[j].y * h); ctx.stroke();
              }
            }
            ctx.fillStyle = "rgba(255,255,255,.85)";
            nodes.forEach((n, k) => {
              const pulse = 1 + Math.sin(a * 4 + k) * 0.4;
              ctx.globalAlpha = 1;
              ctx.beginPath(); ctx.arc(n.x * w, n.y * h, 1.6 * pulse, 0, 7); ctx.fill();
            });

          } else if (kind === "chart") {
            a += 0.02;
            s.pts = s.pts.map((p, i) => 0.5 + Math.sin(i * 0.45 + a) * 0.22 + Math.sin(i * 0.13 + a * 0.6) * 0.12);
            ctx.globalAlpha = 1;
            ctx.beginPath();
            s.pts.forEach((p, i) => { const x = (i / (s.pts.length - 1)) * w, y = (1 - p) * h; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
            ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fillStyle = "rgba(255,255,255,.12)"; ctx.fill();
            ctx.beginPath();
            s.pts.forEach((p, i) => { const x = (i / (s.pts.length - 1)) * w, y = (1 - p) * h; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
            ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 1.6; ctx.stroke();

          } else if (kind === "bars") {
            a += 0.018;
            const bw = w / s.N;
            for (let i = 0; i < s.N; i++) {
              if (Math.random() < 0.035) s.t[i] = 0.12 + Math.random() * 0.88;
              s.h[i] += (s.t[i] - s.h[i]) * 0.07;
              const bh = s.h[i] * h * 0.84;
              ctx.globalAlpha = 0.22 + s.h[i] * 0.68;
              ctx.fillStyle = "rgba(255,255,255,1)";
              ctx.fillRect(i * bw + 2, h - bh, bw - 4, bh);
            }
            ctx.globalAlpha = 1;

          } else if (kind === "pulse") {
            a += 0.022;
            s.pts.shift();
            const cycle = (a * 0.9) % (Math.PI * 2), cp = cycle / (Math.PI * 2);
            let val = 0.5;
            if (cp < 0.05) val = 0.5 - 0.38 * Math.sin(cp / 0.05 * Math.PI);
            else if (cp < 0.14) val = 0.5 + 0.44 * Math.sin((cp - 0.05) / 0.09 * Math.PI);
            else if (cp < 0.20) val = 0.5 - 0.15 * Math.sin((cp - 0.14) / 0.06 * Math.PI);
            else val = 0.5 + Math.sin(a * 0.8) * 0.03;
            s.pts.push(val);
            ctx.globalAlpha = 1;
            ctx.beginPath();
            s.pts.forEach((p, i) => { const x = (i / (s.pts.length - 1)) * w, y = p * h; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
            ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 1.8; ctx.stroke();
            ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fillStyle = "rgba(255,255,255,.07)"; ctx.fill();

          } else if (kind === "orbit") {
            a += 0.012;
            const cx = w / 2, cy = h / 2, maxR = Math.min(w, h) * 0.42;
            const radii = [maxR * 0.28, maxR * 0.56, maxR * 0.84];
            ctx.globalAlpha = 0.85; ctx.fillStyle = "rgba(255,255,255,.9)";
            ctx.beginPath(); ctx.arc(cx, cy, 2.5, 0, 7); ctx.fill();
            s.rings.forEach((ring, ri) => {
              const r = radii[ri];
              ctx.globalAlpha = 0.1; ctx.strokeStyle = "rgba(255,255,255,1)"; ctx.lineWidth = 0.5;
              ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
              const TRAIL = 10;
              for (let t = TRAIL; t >= 0; t--) {
                const ang = a * ring.speed + ring.offset - t * 0.14;
                ctx.globalAlpha = ((TRAIL - t) / TRAIL) * 0.9;
                ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r, Math.max(0.4, 2.2 - t * 0.18), 0, 7); ctx.fill();
              }
            });
            ctx.globalAlpha = 1;

          } else if (kind === "dots") {
            a += 0.015;
            s.b.forEach(b => {
              b.y += b.vy;
              if (b.y < -0.12) { b.y = 1.08; b.x = Math.random(); b.r = 4 + Math.random() * 9; }
              const sway = Math.sin(a * 1.2 + b.ph) * 0.022;
              const al = 0.06 + Math.abs(Math.sin(a * 1.5 + b.ph)) * 0.18;
              ctx.globalAlpha = al; ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 1;
              ctx.beginPath(); ctx.arc((b.x + sway) * w, b.y * h, b.r, 0, Math.PI * 2); ctx.stroke();
            });
            ctx.globalAlpha = 1;

          } else if (kind === "radar") {
            a += 0.012;
            const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.42;
            [0.33, 0.66, 1].forEach(f => {
              ctx.globalAlpha = 0.1; ctx.strokeStyle = "rgba(255,255,255,1)"; ctx.lineWidth = 0.5;
              ctx.beginPath(); ctx.arc(cx, cy, R * f, 0, 7); ctx.stroke();
            });
            ctx.globalAlpha = 0.08;
            ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
            const sweep = a * 1.05;
            ctx.save();
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, sweep - Math.PI * 0.3, sweep); ctx.closePath();
            ctx.fillStyle = "rgba(255,255,255,.1)"; ctx.globalAlpha = 1; ctx.fill(); ctx.restore();
            ctx.globalAlpha = 0.75; ctx.strokeStyle = "rgba(255,255,255,.8)"; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R); ctx.stroke();
            s.blips.forEach(b => {
              const diff = ((sweep - b.ang) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
              if (diff < 0.1) b.al = 1;
              b.al *= 0.972;
              if (b.al > 0.04) {
                ctx.globalAlpha = b.al; ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.beginPath(); ctx.arc(cx + Math.cos(b.ang) * R * b.d, cy + Math.sin(b.ang) * R * b.d, 2.5, 0, 7); ctx.fill();
              }
            });
            ctx.globalAlpha = 1;

          } else if (kind === "signal") {
            a += 0.015;
            const cx = w / 2, cy = h * 0.68, maxR = Math.min(w, h) * 0.4;
            [0.28, 0.54, 0.80, 1.0].forEach((f, i) => {
              const pulse = (Math.sin(a * 2.2 - i * 1.0) + 1) / 2;
              ctx.globalAlpha = 0.12 + pulse * 0.72;
              ctx.strokeStyle = "rgba(255,255,255,1)"; ctx.lineWidth = 1.6;
              ctx.beginPath(); ctx.arc(cx, cy, maxR * f, -Math.PI * 0.82, -Math.PI * 0.18); ctx.stroke();
            });
            ctx.globalAlpha = 0.9; ctx.fillStyle = "rgba(255,255,255,.9)";
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, 7); ctx.fill();
            ctx.globalAlpha = 1;

          } else if (kind === "grid") {
            a += 0.008;
            const COLS = 8, ROWS = 6, cw = w / COLS, ch = h / ROWS;
            ctx.globalAlpha = 0.1; ctx.strokeStyle = "rgba(255,255,255,1)"; ctx.lineWidth = 0.5;
            for (let i = 0; i <= COLS; i++) { ctx.beginPath(); ctx.moveTo(i * cw, 0); ctx.lineTo(i * cw, h); ctx.stroke(); }
            for (let j = 0; j <= ROWS; j++) { ctx.beginPath(); ctx.moveTo(0, j * ch); ctx.lineTo(w, j * ch); ctx.stroke(); }
            const scanY = ((Math.sin(a * 0.5) + 1) / 2) * h;
            const sg = ctx.createLinearGradient(0, scanY - 28, 0, scanY + 28);
            sg.addColorStop(0, "rgba(255,255,255,0)"); sg.addColorStop(0.5, "rgba(255,255,255,.32)"); sg.addColorStop(1, "rgba(255,255,255,0)");
            ctx.fillStyle = sg; ctx.globalAlpha = 1; ctx.fillRect(0, scanY - 28, w, 56);
            for (let ci = 0; ci < COLS; ci++) for (let ri = 0; ri < ROWS; ri++) {
              const dist = Math.abs((ri + 0.5) * ch - scanY);
              if (dist < ch) { ctx.globalAlpha = (1 - dist / ch) * 0.28; ctx.fillStyle = "rgba(255,255,255,1)"; ctx.fillRect(ci * cw + 1, ri * ch + 1, cw - 2, ch - 2); }
            }
            const mk = 7;
            ctx.globalAlpha = 0.6; ctx.strokeStyle = "rgba(255,255,255,.8)"; ctx.lineWidth = 1.5;
            [[0, 0, 1, 1], [COLS, 0, -1, 1], [0, ROWS, 1, -1], [COLS, ROWS, -1, -1]].forEach(([ci, ri, dx, dy]) => {
              const x = ci * cw, y = ri * ch;
              ctx.beginPath(); ctx.moveTo(x, y + dy * mk); ctx.lineTo(x, y); ctx.lineTo(x + dx * mk, y); ctx.stroke();
            });
            ctx.globalAlpha = 1;
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.01 });
    io.observe(cv);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", sz); io.disconnect(); };
  }, [kind]);
  return <canvas className="live" ref={ref} />;
}

/* ─── SolCanvas — solutions section themed animations ─── */
function SolCanvas({ kind }) {
  const ref = useRef(null);
  const accent = useAccent();
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let raf, a = 0;

    const sz = () => {
      const w = cv.clientWidth, h = cv.clientHeight;
      if (!w || !h) return;
      cv.width = w * 2; cv.height = h * 2;
      ctx.setTransform(2, 0, 0, 2, 0, 0);
    };
    sz();
    addEventListener("resize", sz);

    const s = {};
    if (kind === "bars") {
      s.N = 18; s.h = Array.from({ length: 18 }, () => Math.random()); s.t = Array.from({ length: 18 }, () => 0.15 + Math.random() * 0.85);
    } else if (kind === "map") {
      s.nodes = Array.from({ length: 22 }, () => ({ x: Math.random(), y: Math.random() }));
    } else if (kind === "orbit") {
      s.rings = [{ offset: 0, speed: 1.0 }, { offset: Math.PI * 0.7, speed: 0.6 }, { offset: Math.PI * 1.4, speed: 0.35 }];
    } else if (kind === "radar") {
      s.blips = Array.from({ length: 5 }, () => ({ ang: Math.random() * Math.PI * 2, d: 0.28 + Math.random() * 0.58, al: 0 }));
    }

    const draw = () => {
      const w = cv.clientWidth, h = cv.clientHeight;
      if (w && h) {
        if (cv.width !== w * 2) sz();
        ctx.clearRect(0, 0, w, h);
        const col = accent();

        if (kind === "bars") {
          a += 0.016;
          const bw = w / s.N;
          for (let i = 0; i < s.N; i++) {
            if (Math.random() < 0.03) s.t[i] = 0.1 + Math.random() * 0.9;
            s.h[i] += (s.t[i] - s.h[i]) * 0.07;
            const bh = s.h[i] * h * 0.8;
            ctx.globalAlpha = 0.18 + s.h[i] * 0.52;
            ctx.fillStyle = col;
            ctx.fillRect(i * bw + 2, h - bh, bw - 4, bh);
          }
          ctx.globalAlpha = 1;

        } else if (kind === "map") {
          a += 0.004;
          ctx.strokeStyle = col; ctx.lineWidth = 0.7;
          for (let i = 0; i < s.nodes.length; i++) for (let j = i + 1; j < s.nodes.length; j++) {
            const dx = s.nodes[i].x - s.nodes[j].x, dy = s.nodes[i].y - s.nodes[j].y;
            if (Math.hypot(dx, dy) < 0.28) {
              ctx.globalAlpha = 0.2;
              ctx.beginPath(); ctx.moveTo(s.nodes[i].x * w, s.nodes[i].y * h); ctx.lineTo(s.nodes[j].x * w, s.nodes[j].y * h); ctx.stroke();
            }
          }
          s.nodes.forEach((n, k) => {
            const pulse = 1 + Math.sin(a * 3.5 + k) * 0.4;
            ctx.globalAlpha = 0.65; ctx.fillStyle = col;
            ctx.beginPath(); ctx.arc(n.x * w, n.y * h, 2.2 * pulse, 0, 7); ctx.fill();
          });
          ctx.globalAlpha = 1;

        } else if (kind === "orbit") {
          a += 0.01;
          const cx = w / 2, cy = h / 2, maxR = Math.min(w, h) * 0.36;
          const radii = [maxR * 0.28, maxR * 0.56, maxR * 0.84];
          ctx.globalAlpha = 0.9; ctx.fillStyle = col;
          ctx.beginPath(); ctx.arc(cx, cy, 3, 0, 7); ctx.fill();
          s.rings.forEach((ring, ri) => {
            const r = radii[ri];
            ctx.globalAlpha = 0.1; ctx.strokeStyle = col; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
            const TRAIL = 9;
            for (let t = TRAIL; t >= 0; t--) {
              const ang = a * ring.speed + ring.offset - t * 0.14;
              ctx.globalAlpha = ((TRAIL - t) / TRAIL) * 0.85;
              ctx.fillStyle = col;
              ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r, Math.max(0.4, 2.4 - t * 0.2), 0, 7); ctx.fill();
            }
          });
          ctx.globalAlpha = 1;

        } else if (kind === "radar") {
          a += 0.01;
          const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.36;
          [0.33, 0.66, 1].forEach(f => {
            ctx.globalAlpha = 0.12; ctx.strokeStyle = col; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.arc(cx, cy, R * f, 0, 7); ctx.stroke();
          });
          ctx.globalAlpha = 0.08;
          ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
          const sweep = a;
          ctx.save();
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, sweep - Math.PI * 0.28, sweep); ctx.closePath();
          ctx.fillStyle = col; ctx.globalAlpha = 0.14; ctx.fill(); ctx.restore();
          ctx.globalAlpha = 0.7; ctx.strokeStyle = col; ctx.lineWidth = 1.3;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R); ctx.stroke();
          s.blips.forEach(b => {
            const diff = ((sweep - b.ang) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
            if (diff < 0.09) b.al = 1;
            b.al *= 0.972;
            if (b.al > 0.04) {
              ctx.globalAlpha = b.al; ctx.fillStyle = col;
              ctx.beginPath(); ctx.arc(cx + Math.cos(b.ang) * R * b.d, cy + Math.sin(b.ang) * R * b.d, 3, 0, 7); ctx.fill();
            }
          });
          ctx.globalAlpha = 1;

        } else if (kind === "grid") {
          a += 0.006;
          const COLS = 8, ROWS = 5, cw = w / COLS, ch = h / ROWS;
          ctx.globalAlpha = 0.1; ctx.strokeStyle = col; ctx.lineWidth = 0.5;
          for (let i = 0; i <= COLS; i++) { ctx.beginPath(); ctx.moveTo(i * cw, 0); ctx.lineTo(i * cw, h); ctx.stroke(); }
          for (let j = 0; j <= ROWS; j++) { ctx.beginPath(); ctx.moveTo(0, j * ch); ctx.lineTo(w, j * ch); ctx.stroke(); }
          const scanY = ((Math.sin(a * 0.4) + 1) / 2) * h;
          ctx.globalAlpha = 0.35; ctx.fillStyle = col; ctx.fillRect(0, scanY - 1.5, w, 3);
          for (let ci = 0; ci < COLS; ci++) for (let ri = 0; ri < ROWS; ri++) {
            const dist = Math.abs((ri + 0.5) * ch - scanY);
            if (dist < ch * 1.4) {
              ctx.globalAlpha = (1 - dist / (ch * 1.4)) * 0.2;
              ctx.fillStyle = col; ctx.fillRect(ci * cw + 1, ri * ch + 1, cw - 2, ch - 2);
            }
          }
          const mk = 8;
          ctx.globalAlpha = 0.55; ctx.strokeStyle = col; ctx.lineWidth = 1.5;
          [[0, 0, 1, 1], [COLS, 0, -1, 1], [0, ROWS, 1, -1], [COLS, ROWS, -1, -1]].forEach(([ci, ri, dx, dy]) => {
            const x = ci * cw, y = ri * ch;
            ctx.beginPath(); ctx.moveTo(x, y + dy * mk); ctx.lineTo(x, y); ctx.lineTo(x + dx * mk, y); ctx.stroke();
          });
          ctx.globalAlpha = 1;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", sz); };
  }, [kind, accent]);
  return <canvas className="sol-live" ref={ref} />;
}

/* ─── Scramble ─── */
function Scramble({ text, run }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!run || prefersReduced()) { setOut(text); return; }
    const ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&_/<>";
    let f = 0, id;
    id = setInterval(() => {
      setOut(text.split("").map((c, i) => (i < f ? text[i] : c === " " ? " " : ch[Math.floor(Math.random() * ch.length)])).join(""));
      f += 0.5;
      if (f >= text.length) { clearInterval(id); setOut(text); }
    }, 38);
    return () => clearInterval(id);
  }, [run, text]);
  return <em className="accent" style={{ fontStyle: "normal" }}>{out}</em>;
}

/* ─── Interactions ─── */
function useInteractions(ready) {
  const accent = useAccent();
  useEffect(() => {
    if (!ready) return;
    const fine = matchMedia("(pointer:fine)").matches;
    const cleanups = [];
    if (fine) {
      const dot = document.getElementById("curDot"), ring = document.getElementById("curRing");
      let rx = 0, ry = 0, dx = 0, dy = 0, raf;
      const move = (e) => { dx = e.clientX; dy = e.clientY; dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`; };
      addEventListener("mousemove", move);
      const loop = () => { rx += (dx - rx) * 0.18; ry += (dy - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
      loop();
      const grow = () => ring.classList.add("grow"), shrink = () => ring.classList.remove("grow");
      const hot = document.querySelectorAll("a,button,.svc,.case,.chip,input,textarea,select");
      hot.forEach((el) => { el.addEventListener("mouseenter", grow); el.addEventListener("mouseleave", shrink); });
      cleanups.push(() => { removeEventListener("mousemove", move); cancelAnimationFrame(raf); hot.forEach((el) => { el.removeEventListener("mouseenter", grow); el.removeEventListener("mouseleave", shrink); }); });
      document.querySelectorAll(".magnetic").forEach((btn) => {
        const m = (e) => { const r = btn.getBoundingClientRect(); btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`; };
        const out = () => (btn.style.transform = "");
        btn.addEventListener("mousemove", m); btn.addEventListener("mouseleave", out);
        cleanups.push(() => { btn.removeEventListener("mousemove", m); btn.removeEventListener("mouseleave", out); });
      });
    }
    document.querySelectorAll(".svc").forEach((card) => {
      const m = (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        const rxx = ((e.clientY - r.top) / r.height - 0.5) * -5, ryy = ((e.clientX - r.left) / r.width - 0.5) * 5;
        card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rxx}deg) rotateY(${ryy}deg)`;
      };
      const out = () => (card.style.transform = "");
      card.addEventListener("mousemove", m); card.addEventListener("mouseleave", out);
      cleanups.push(() => { card.removeEventListener("mousemove", m); card.removeEventListener("mouseleave", out); });
    });
    return () => cleanups.forEach((c) => c());
  }, [ready, accent]);
}

/* ─── Language Switcher ─── */
function LangSwitcher({ lang, setLang, open, setOpen }) {
  return (
    <div className="lang-switcher">
      <button
        className="lang-btn"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label="Select language"
      >
        <Globe2 size={14} />
        {T[lang].lang}
        <ChevronDown size={12} />
      </button>
      {open && (
        <div className="lang-dropdown">
          {["en", "ru", "uz"].map(code => (
            <button
              key={code}
              className={`lang-opt ${lang === code ? "active" : ""}`}
              onClick={() => { setLang(code); setOpen(false); }}
            >
              {T[code].lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   APP
═══════════════════════════════════════ */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("ru");
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSol, setActiveSol] = useState(0);
  const [activeNav, setActiveNav] = useState(0);
  const [ti, setTi] = useState(0);
  const [formState, setFormState] = useState("idle"); // idle | sending | sent | error
  const [formData, setFormData] = useState({ name: "", email: "", org: "", service: "", message: "" });
  const lastY = useRef(0);
  const t = T[lang];

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  useEffect(() => { document.body.classList.toggle("lock", !loaded); }, [loaded]);

  /* SEO: update lang attribute */
  useEffect(() => { document.documentElement.setAttribute("lang", lang === "uz" ? "uz" : lang === "ru" ? "ru" : "en"); }, [lang]);

  useInteractions(loaded);

  useEffect(() => {
    const onScroll = () => {
      const y = scrollY;
      setScrolled(y > 20);
      lastY.current = y;
      setProgress((y / (document.body.scrollHeight - innerHeight)) * 100);
    };
    addEventListener("scroll", onScroll);
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const secs = document.querySelectorAll("[data-nav]");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActiveNav(+e.target.dataset.nav); }), { threshold: 0.4 });
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [loaded]);

  useEffect(() => {
    const el = document.getElementById("heroVisual");
    const onScroll = () => { if (el) el.style.transform = `translateY(${scrollY * 0.12}px)`; };
    addEventListener("scroll", onScroll);
    return () => removeEventListener("scroll", onScroll);
  }, []);

  /* Close lang dropdown on outside click */
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e) => {
      if (!e.target.closest(".lang-switcher")) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  const perView = () => (typeof window !== "undefined" && innerWidth <= 760 ? 1 : 2);
  const maxTi = Math.max(0, TESTI_DATA.length - perView());
  const clampedTi = Math.max(0, Math.min(ti, maxTi));

  /* ── EmailJS form submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState("sending");
    try {
      await emailjs.send(
        "service_gg5bmpi",
        "template_6ql39kw",
        {
          from_name: formData.name,
          from_email: formData.email,
          organization: formData.org,
          service: formData.service,
          message: formData.message,
        },
        "Nkt_ZhN-3q5xr1Y5t"
      );
      setFormState("sent");
      setFormData({ name: "", email: "", org: "", service: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  const navIds = ["top", "services", "solutions", "work", "stack", "contact"];
  const services = SERVICES_I18N[lang];
  const solutions = SOLUTIONS_I18N[lang];

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <div className="grain" />
      <div className="progress" style={{ width: `${progress}%` }} />
      <div className="cur-dot" id="curDot" />
      <div className="cur-ring" id="curRing" />

      {/* Dot nav */}
      <nav className="dotnav" aria-label="Page sections">
        {t.nav.map((s, i) => (
          <a key={s} href={`#${navIds[i]}`} className={activeNav === i ? "on" : ""} aria-label={s}><span>{s}</span></a>
        ))}
      </nav>

      {/* Header */}
      <header className={`${scrolled ? "scrolled" : ""}`}>
        <div className="wrap">
          <nav className="nav" role="navigation" aria-label="Main navigation">
            <Logo lang={lang} />
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
              <a href="#services" onClick={() => setMenuOpen(false)}>{t.nav[1]}</a>
              <a href="#solutions" onClick={() => setMenuOpen(false)}>{t.nav[2]}</a>
              <a href="#work" onClick={() => setMenuOpen(false)}>{t.nav[3]}</a>
              <a href="#stack" onClick={() => setMenuOpen(false)}>{t.nav[4]}</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav[5]}</a>
            </div>
            <div className="nav-actions">
              <LangSwitcher lang={lang} setLang={setLang} open={langOpen} setOpen={setLangOpen} />
              <button
                className="theme-toggle"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <span className="theme-toggle-thumb">
                  {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
                </span>
              </button>
              <a href="#contact" className="btn btn-primary magnetic" style={{ padding: "11px 20px" }}>{t.hero_cta1}</a>
              <button className="burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu"><Menu size={20} /></button>
            </div>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" data-nav="0" aria-label="Hero">
          <HeroCanvas start={loaded} />
          <div className="hero-aurora"><b className="a1" /><b className="a2" /></div>
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy">
                <span className="eyebrow reveal in">{t.hero_eyebrow}</span>
                <h1 className={`reveal-h ${loaded ? "in" : ""}`}>
                  <span className="line-mask"><span>{t.hero_h1_1}</span></span>
                  <span className="line-mask"><span><Scramble text={t.hero_h1_2} run={loaded} /></span></span>
                  <span className="line-mask"><span>{t.hero_h1_3}</span></span>
                </h1>
                <Reveal as="p" className="hero-sub" delay={2}>{t.hero_sub}</Reveal>
                <Reveal className="hero-cta" delay={3}>
                  <a href="#contact" className="btn btn-primary magnetic">{t.hero_cta1} <ArrowRight size={17} /></a>
                  <a href="#work" className="btn btn-ghost magnetic">{t.hero_cta2}</a>
                </Reveal>
                <Reveal className="hero-stats" delay={4}>
                  {HERO_STATS.map((s, i) => (
                    <div className="stat" key={s.lKey}>
                      <div className="num tnum"><CountUp to={s.n} suffix={s.s} /></div>
                      <div className="label">{t[s.lKey]}</div>
                    </div>
                  ))}
                </Reveal>
              </div>
              <div className="hero-visual" id="heroVisual">
                <div className="hero-badge b1"><GitBranch size={16} /> {t.badge1}</div>
                <div className="hero-badge b2"><ShieldCheck size={16} /> {t.badge2}</div>
                <div className="hero-badge b3"><MapPin size={16} /> {t.badge3}</div>
              </div>
            </div>
          </div>
          <div className="scroll-hint"><span>{t.scroll}</span><span className="line" /></div>
        </section>

        {/* TRUST MARQUEE */}
        <div className="trust" aria-label="Trusted clients">
          <p>{t.trust_label}</p>
          <div className="marquee" aria-hidden="true">
            {["Ministry of Digital", "UzGeo", "NaviBank", "StatCom", "AgroData", "CityOne", "e-Gov", "CadastreUZ", "ProSurvey", "Mulk.top", "SkillUp.uz", "Darakchi"].concat(
              ["Ministry of Digital", "UzGeo", "NaviBank", "StatCom", "AgroData", "CityOne", "e-Gov", "CadastreUZ", "ProSurvey", "Mulk.top", "SkillUp.uz", "Darakchi"]
            ).map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>

        {/* SERVICES */}
        <section className="sec" id="services" data-nav="1" aria-label={t.nav[1]}>
          <div className="wrap">
            <Reveal className="sec-head">
              <span className="eyebrow">{t.svc_eyebrow}</span>
              <h2>{t.svc_h}</h2>
              <p>{t.svc_p}</p>
            </Reveal>
            <div className="svc-grid">
              {SERVICES_DATA.map(({ Icon }, i) => (
                <Reveal as="article" className="svc" delay={i % 3} key={services[i].t}>
                  <div className="ic"><Icon size={24} /></div>
                  <h3>{services[i].t}</h3>
                  <p>{services[i].d}</p>
                  <span className="more">{t.svc_explore} <ArrowUpRight size={15} /></span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="sec" id="solutions" data-nav="2" style={{ background: "var(--surface-1)", borderBlock: "1px solid var(--line-soft)" }} aria-label={t.nav[2]}>
          <div className="wrap">
            <Reveal className="sec-head">
              <span className="eyebrow">{t.sol_eyebrow}</span>
              <h2>{t.sol_h}</h2>
            </Reveal>
            <div className="sol">
              <div className="sol-nav">
                {t.sol_tabs.map((tab, i) => (
                  <button 
                    key={tab} 
                    className={`sol-tab ${activeSol === i ? "active" : ""}`} 
                    onClick={(e) => {
                      setActiveSol(i);
                      e.target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="sol-panels">
                {solutions.map((s, i) => (
                  <div key={i} className={`sol-panel ${activeSol === i ? "active" : ""}`}>
                    <div className="visual"><div className="mesh" /><SolCanvas kind={SOL_ANIM[i]} /><span className="tag">{s.tag}</span></div>
                    <h3>{s.h}</h3><p>{s.p}</p>
                    <ul className="sol-feats">{s.f.map((x) => <li key={x}><Check size={18} />{x}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="sec" id="work" data-nav="3" aria-label={t.nav[3]}>
          <div className="wrap">
            <Reveal className="sec-head">
              <span className="eyebrow">{t.work_eyebrow}</span>
              <h2>{t.work_h}</h2>
              <p>{t.work_p}</p>
            </Reveal>
            <div className="bento">
              {PORTFOLIO.map((c, i) => (
                <Reveal
                  as="a"
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`case ${c.cls}`}
                  delay={i % 3}
                  key={c.h}
                  aria-label={c.h}
                >
                  <div className={`bg ${c.g}`} />
                  {c.live && <LiveCanvas kind={c.live} />}
                  <div className="veil" />
                  <div className="arrow"><ArrowUpRight size={18} /></div>
                  <div className="cat">{c.cat}</div>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                  <span className="case-live">{t.work_live}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* REACH / GLOBE */}
        <section className="sec globe-sec" id="reach" aria-label={t.reach_eyebrow}>
          <div className="wrap">
            <div className="globe-grid">
              <Reveal>
                <span className="eyebrow">{t.reach_eyebrow}</span>
                <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", marginTop: 18 }}>{t.reach_h}</h2>
                <p className="muted" style={{ fontSize: "1.08rem", marginTop: 20, maxWidth: "46ch" }}>{t.reach_p}</p>
                <div className="hero-cta" style={{ marginTop: 30 }}>
                  <a href="#contact" className="btn btn-ghost magnetic">{t.reach_cta} <ArrowRight size={17} /></a>
                </div>
              </Reveal>
              <Reveal className="globe-wrap" delay={1}>
                <Globe start={loaded} />
                <div className="globe-stat g1">{t.uptime}<b className="tnum">99.98%</b></div>
                <div className="globe-stat g2">{t.nodes}<b className="tnum">47</b></div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section className="sec" id="stack" data-nav="4" style={{ background: "var(--surface-1)", borderBlock: "1px solid var(--line-soft)" }} aria-label={t.nav[4]}>
          <div className="wrap">
            <div className="tech">
              <Reveal>
                <span className="eyebrow">{t.stack_eyebrow}</span>
                <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", marginTop: 18 }}>{t.stack_h}</h2>
                <p className="muted" style={{ fontSize: "1.08rem", marginTop: 20, maxWidth: "46ch" }}>{t.stack_p}</p>
                <div className="hero-cta" style={{ marginTop: 30 }}>
                  <a href="#contact" className="btn btn-ghost magnetic">{t.stack_cta} <ArrowRight size={17} /></a>
                </div>
              </Reveal>
              <Reveal className="tech-cloud" delay={1}>
                {TECH.map((tech) => (
                  <span key={tech} className={`chip ${BIG_TECH.has(tech) ? "big" : ""}`}>
                    <span className="dot" />{tech}
                  </span>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="ach" aria-label="Achievements">
          <div className="ach-grid">
            {ACH_NUMS.map((a, i) => (
              <Reveal className="ach-cell" delay={i} key={a.lKey}>
                <div className="num tnum"><CountUp to={a.n} suffix={a.s} /></div>
                <div className="label">{t[a.lKey]}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="sec" id="testimonials" aria-label={t.clients_eyebrow}>
          <div className="wrap">
            <Reveal className="sec-head" style={{ maxWidth: 560 }}>
              <span className="eyebrow">{t.clients_eyebrow}</span>
              <h2 style={{ marginTop: 18 }}>{t.clients_h}</h2>
            </Reveal>
            <div className="testi-wrap">
              <div className="testi-track" style={{ transform: `translateX(calc(-${clampedTi} * (100% / ${perView()} + ${20 / perView()}px)))` }}>
                {TESTI_DATA.map((td) => (
                  <article className="testi" key={td.nm}>
                    <p className="quote">"{td[`q_${lang}`] || td.q_en}"</p>
                    <div className="by">
                      <div className="av">{td.av}</div>
                      <div>
                        <div className="nm">{td.nm}</div>
                        <div className="rl">{td[`rl_${lang}`] || td.rl_en}</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="testi-ctrl">
              <button onClick={() => setTi((v) => Math.max(0, v - 1))} aria-label="Previous"><ArrowLeft size={19} /></button>
              <button onClick={() => setTi((v) => Math.min(maxTi, v + 1))} aria-label="Next"><ArrowRight size={19} /></button>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="sec" id="contact" data-nav="5" aria-label={t.nav[5]}>
          <div className="wrap">
            <Reveal className="sec-head">
              <span className="eyebrow">{t.contact_eyebrow}</span>
              <h2>{t.contact_h}</h2>
              <p>{t.contact_p}</p>
            </Reveal>
            <div className="contact-grid">
              <Reveal as="form" className="contact-card" onSubmit={handleSubmit} noValidate>
                <div className="two">
                  <div className="field">
                    <label htmlFor="f-name">{t.f_name}</label>
                    <input id="f-name" type="text" placeholder={t.f_ph_name} required
                      value={formData.name} onChange={e => setFormData(d => ({ ...d, name: e.target.value }))} />
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">{t.f_email}</label>
                    <input id="f-email" type="email" placeholder={t.f_ph_email} required
                      value={formData.email} onChange={e => setFormData(d => ({ ...d, email: e.target.value }))} />
                  </div>
                </div>
                <div className="two">
                  <div className="field">
                    <label htmlFor="f-org">{t.f_org}</label>
                    <input id="f-org" type="text" placeholder={t.f_ph_org}
                      value={formData.org} onChange={e => setFormData(d => ({ ...d, org: e.target.value }))} />
                  </div>
                  <div className="field">
                    <label htmlFor="f-svc">{t.f_svc}</label>
                    <select id="f-svc" value={formData.service} onChange={e => setFormData(d => ({ ...d, service: e.target.value }))}>
                      {services.map(s => <option key={s.t} value={s.t}>{s.t}</option>)}
                      <option value="Other">{t.svc_other}</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="f-msg">{t.f_msg}</label>
                  <textarea id="f-msg" placeholder={t.f_ph_msg}
                    value={formData.message} onChange={e => setFormData(d => ({ ...d, message: e.target.value }))} />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary magnetic"
                  style={{ width: "100%", justifyContent: "center", background: formState === "sent" ? "var(--accent-soft)" : undefined }}
                  disabled={formState === "sending" || formState === "sent"}
                >
                  {formState === "sent" && <>{t.f_sent} <Check size={17} /></>}
                  {formState === "sending" && <>{t.f_sending}</>}
                  {formState === "error" && <span style={{ color: "#fff" }}>{t.f_err}</span>}
                  {formState === "idle" && <>{t.f_send} <Send size={17} /></>}
                </button>
                {formState === "error" && (
                  <p style={{ textAlign: "center", fontSize: ".88rem", color: "var(--text-3)", marginTop: 10 }}>
                    <a href="https://mail.google.com/mail/?view=cm&to=info.shoshiy@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-soft)" }}>info.shoshiy@gmail.com</a>
                  </p>
                )}

                {/* Corporate presentation download */}
                <div className="dl">
                  <div>
                    <div className="t">{t.pres_title}</div>
                    <div className="s">{t.pres_sub}</div>
                  </div>
                  <a href="/assets/shoshiy-presentation.pdf" target="_blank" rel="noopener noreferrer"
                    className="btn btn-ghost magnetic" style={{ padding: "11px 18px" }}>
                    <Download size={17} /> {t.pres_btn}
                  </a>
                </div>
              </Reveal>

              <div className="contact-side">
                <Reveal className="contact-info" delay={1}>
                  <div className="info-row">
                    <div className="ic"><Mail size={19} /></div>
                    <div>
                      <div className="k">{t.contact_email}</div>
                      <div className="v"><a href="https://mail.google.com/mail/?view=cm&to=info.shoshiy@gmail.com" target="_blank" rel="noopener noreferrer">info.shoshiy@gmail.com</a></div>
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="ic"><Phone size={19} /></div>
                    <div>
                      <div className="k">{t.contact_phone}</div>
                      <div className="v"><a href="tel:+998330493349">+998 33 049 33 49</a></div>
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="ic"><MapPin size={19} /></div>
                    <div>
                      <div className="k">{t.contact_office}</div>
                      <div className="v">улица Укчи, 6, Ташкент</div>
                    </div>
                  </div>
                </Reveal>
                <Reveal className="map" delay={2}>
                  <iframe
                    title="Shoshiy Group"
                    src="https://maps.google.com/maps?q=41.317233,69.245286&z=17&hl=ru&output=embed"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                  />
                  <div className="place">Shoshiy Group · улица Укчи, 6</div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="cta-band">
              <div className="glow" />
              <h2>{t.cta_h}</h2>
              <p>{t.cta_p}</p>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary magnetic">{t.hero_cta1} <ArrowRight size={17} /></a>
                <a href="#work" className="btn btn-ghost magnetic">{t.hero_cta2}</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <Logo lang={lang} />
              <p>{t.footer_tagline}</p>
            </div>
            <div className="foot-col">
              <h4>{t.footer_services}</h4>
              <a href="#services">{services[0].t}</a>
              <a href="#services">{services[1].t}</a>
              <a href="#services">{services[4].t}</a>
              <a href="#services">{services[6].t}</a>
              <a href="#services">{services[8].t}</a>
            </div>
            <div className="foot-col">
              <h4>{t.footer_company}</h4>
              <a href="#work">{t.nav[3]}</a>
              <a href="#solutions">{t.nav[2]}</a>
              <a href="#stack">{t.nav[4]}</a>
              <a href="#testimonials">{t.clients_eyebrow}</a>
              <a href="#contact">{t.nav[5]}</a>
            </div>
            <div className="foot-col">
              <h4>{t.footer_connect}</h4>
              <a href="https://www.linkedin.com/in/shoshiy-group-4976a03a0/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/phanthooom" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://t.me/mechtatel_s49" target="_blank" rel="noopener noreferrer">Telegram</a>
              <a href="https://logistics.shoshiy.uz/" target="_blank" rel="noopener noreferrer">Shoshiy Logistics</a>
              <a href="https://mail.google.com/mail/?view=cm&to=info.shoshiy@gmail.com" target="_blank" rel="noopener noreferrer">info.shoshiy@gmail.com</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>{t.copyright}</span>
            <div className="socials">
              <a href="https://www.linkedin.com/in/shoshiy-group-4976a03a0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
              <a href="https://github.com/phanthooom" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} /></a>
              <a href="https://t.me/mechtatel_s49" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><Send size={17} /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}