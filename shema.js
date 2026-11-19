const schemaScript = document.createElement('script');
schemaScript.type = 'application/ld+json';
schemaScript.text = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Студия машинной вышивки «Узорные Сказки»",
  "alternateName": "Узорные Сказки Светланы Яковлевой",
  "description": "Авторская машинная вышивка на заказ на столовом текстиле: скатерти, плейсматы (ланчматы), дорожки, салфетки и куверты из льна, хлопка и экокожи. Дигитализация рисунков, корпоративный текстиль для HoReCa.",
  "url": "https://embroideryhouse.ru",
  "logo": "https://embroideryhouse.rulogo%20(1).svg",
  "image": "https://embroideryhouse.ruimg/1.jpg",
  "telephone": "+7-981-149-13-30",
  "priceRange": "1450₽ - 8500₽",
  "founder": {
    "@type": "Person",
    "name": "Светлана Яковлева"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Россия"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Столовый текстиль с авторской вышивкой",
    "itemListElement": [
      { "@type": "OfferCatalog", "name": "Сервировочные салфетки с вышивкой" },
      { "@type": "OfferCatalog", "name": "Ланчматы (плейсматы) из льна, хлопка и экокожи" },
      { "@type": "OfferCatalog", "name": "Столовые дорожки (раннеры)" },
      { "@type": "OfferCatalog", "name": "Куверты для столовых приборов" },
      { "@type": "OfferCatalog", "name": "Брендированный текстиль с логотипом для HoReCa и яхт" }
    ]
  }
});
document.head.appendChild(schemaScript);
