import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Services informatiques professionnels : création de sites web, réparation PC et téléphone, aide informatique, cours de langues et rachat d'appareils." />
  <title>TechServices Pro</title>

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" />
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

  <style>
    * { font-family: 'Inter', sans-serif; }
    html { scroll-behavior: smooth; }

    /* Gradient animé hero */
    .hero-gradient {
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%);
    }

    /* Accent color */
    .accent { color: #6366f1; }
    .accent-bg { background: #6366f1; }
    .accent-bg-hover:hover { background: #4f46e5; }

    /* Card hover lift */
    .card-hover {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px rgba(99,102,241,0.15);
    }

    /* Pulse CTA */
    .cta-pulse {
      animation: pulse-ring 2s infinite;
    }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(99,102,241,0.5); }
      70%  { box-shadow: 0 0 0 14px rgba(99,102,241,0); }
      100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
    }

    /* Fade-in on scroll */
    .fade-in {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Nav blur */
    .nav-blur {
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    /* Section divider */
    .section-divider {
      background: linear-gradient(90deg, transparent, #6366f1, transparent);
      height: 1px;
      margin: 0 auto;
      width: 80%;
    }

    /* Image placeholder */
    .img-placeholder {
      background: linear-gradient(135deg, #1e1b4b, #312e81);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6366f1;
      font-size: 1rem;
      font-weight: 600;
      border: 2px dashed #6366f1;
      border-radius: 12px;
    }

    /* Badge */
    .badge {
      background: rgba(99,102,241,0.15);
      border: 1px solid rgba(99,102,241,0.3);
      color: #a5b4fc;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 3px; }

    /* Lang selector */
    .lang-btn.active {
      background: #6366f1;
      color: white;
    }

    /* Mobile menu */
    #mobile-menu { display: none; }
    #mobile-menu.open { display: block; }
  </style>

  <script>
    // ─── TRANSLATIONS ────────────────────────────────────────────────
    const translations = {
      fr: {
        nav_services: "Services",
        nav_repair: "Réparations",
        nav_sell: "Devenir Vendeur",
        nav_languages: "Cours de Langues",
        nav_contact: "Contact",
        nav_cta: "Nous Contacter",

        hero_badge: "Votre partenaire tech de confiance",
        hero_title: "Des solutions numériques",
        hero_title2: "à portée de main",
        hero_sub: "Création de sites web, réparation d'appareils, aide informatique et cours de langues — tout ce qu'il vous faut, en un seul endroit.",
        hero_cta1: "Découvrir nos services",
        hero_cta2: "Nous contacter maintenant",
        hero_stat1: "Clients satisfaits",
        hero_stat2: "Services proposés",
        hero_stat3: "Disponibilité",

        services_badge: "Nos Services",
        services_title: "Ce que nous faisons pour vous",
        services_sub: "Des solutions professionnelles adaptées à chaque besoin, avec un accompagnement personnalisé.",

        web_title: "Création de Sites Web & Applications",
        web_sub: "Attirez de nouveaux clients en ligne",
        web_desc: "Un site web professionnel peut transformer votre activité. Nous créons des sites modernes, rapides et optimisés pour convertir vos visiteurs en clients fidèles.",
        web_stat1: "+40%",
        web_stat1_label: "de nouveaux clients",
        web_stat2: "×3",
        web_stat2_label: "de visibilité en ligne",
        web_stat3: "+60%",
        web_stat3_label: "de chiffre d'affaires",
        web_feat1: "Site vitrine ou e-commerce",
        web_feat2: "Application mobile & web sur mesure",
        web_feat3: "Optimisation SEO & performance",
        web_feat4: "Design moderne & responsive",
        web_feat5: "Maintenance & support inclus",
        web_cta: "Obtenir un devis gratuit",

        help_title: "Aide Informatique à Distance",
        help_sub: "On s'occupe de tout, vous restez serein",
        help_desc: "Vous avez du mal avec votre ordinateur ? Pas de panique ! Nous vous accompagnons par téléphone, étape par étape, pour résoudre tous vos problèmes informatiques.",
        help_feat1: "Assistance téléphonique personnalisée",
        help_feat2: "Accompagnement pas à pas",
        help_feat3: "Pour seniors et débutants",
        help_feat4: "Configuration de logiciels",
        help_feat5: "Sécurité et protection des données",
        help_feat6: "Sauvegarde et récupération de fichiers",
        help_cta: "Demander de l'aide maintenant",

        pc_title: "Réparation d'Ordinateurs",
        pc_sub: "Votre PC entre de bonnes mains",
        pc_desc: "Panne, lenteur, virus ou composant défaillant ? Nos techniciens diagnostiquent et réparent votre ordinateur rapidement. Aucun tarif affiché — contactez-nous pour un diagnostic gratuit.",
        pc_feat1: "Remplacement disque dur / SSD",
        pc_feat2: "Upgrade mémoire RAM",
        pc_feat3: "Suppression virus & malwares",
        pc_feat4: "Réinstallation Windows / OS",
        pc_feat5: "Remplacement écran & clavier",
        pc_feat6: "Nettoyage & optimisation",
        pc_note: "💡 Devis gratuit — Appelez-nous pour connaître le tarif adapté à votre problème",
        pc_cta: "Diagnostic gratuit",

        phone_title: "Réparation de Téléphones",
        phone_sub: "iPhone, Android — Toutes marques",
        phone_desc: "Écran fissuré, batterie HS, port de charge cassé ? Nous réparons tous les modèles Apple et Android avec des pièces de qualité. Rendez-vous ou envoi par courrier.",
        phone_apple: "Apple iPhone",
        phone_android: "Android (Samsung, Oppo, Xiaomi...)",
        phone_feat1: "Remplacement d'écran (LCD/OLED)",
        phone_feat2: "Remplacement batterie",
        phone_feat3: "Réparation port de charge",
        phone_feat4: "Remplacement caméra avant/arrière",
        phone_feat5: "Réparation boutons & haut-parleurs",
        phone_feat6: "Récupération de données",
        phone_note: "💡 Tarifs sur devis — Contactez-nous pour une estimation personnalisée",
        phone_cta: "Obtenir un devis réparation",

        sell_badge: "Nouveau",
        sell_title: "Devenez Vendeur",
        sell_sub: "Vendez ou rachetez vos appareils facilement",
        sell_desc: "Vous avez un ancien téléphone ou ordinateur qui prend la poussière ? Nous le rachetons directement ! Ou devenez vendeur partenaire et bénéficiez de notre réseau.",
        sell_how_title: "Comment ça marche ?",
        sell_step1_title: "Décrivez votre appareil",
        sell_step1_desc: "Modèle, état, accessoires inclus",
        sell_step2_title: "Recevez une offre",
        sell_step2_desc: "Estimation rapide et honnête",
        sell_step3_title: "Finalisez la vente",
        sell_step3_desc: "Paiement sécurisé et rapide",
        sell_accept: "Appareils acceptés :",
        sell_accept1: "Smartphones (toutes marques)",
        sell_accept2: "Ordinateurs portables & fixes",
        sell_accept3: "Tablettes & accessoires",
        sell_cta: "Vendre mon appareil",

        lang_badge: "Cours Particuliers",
        lang_title: "Cours de Langues",
        lang_sub: "Apprenez à votre rythme",
        lang_desc: "Des cours particuliers de qualité pour progresser rapidement. Nous proposons des sessions adaptées à votre niveau et vos objectifs, en visio ou en présentiel.",
        lang_fr: "Français",
        lang_en: "Anglais",
        lang_es: "Espagnol",
        lang_combos: "Toutes combinaisons possibles",
        lang_combo1: "Français ↔ Anglais",
        lang_combo2: "Français ↔ Espagnol",
        lang_combo3: "Anglais ↔ Espagnol",
        lang_feat1: "Cours adaptés à votre niveau",
        lang_feat2: "Sessions en visio ou présentiel",
        lang_feat3: "Progression rapide garantie",
        lang_feat4: "Exercices personnalisés",
        lang_feat5: "Conversation & grammaire",
        lang_cta: "Réserver un cours d'essai",

        contact_badge: "Contactez-nous",
        contact_title: "Prêt à commencer ?",
        contact_sub: "N'attendez plus — un simple appel suffit pour transformer votre projet en réalité.",
        contact_phone: "Appelez-nous",
        contact_email: "Envoyez un email",
        contact_cta1: "Appeler maintenant",
        contact_cta2: "Envoyer un message",
        contact_hours: "Disponible du lundi au samedi, 9h–19h",

        footer_rights: "Tous droits réservés",
        footer_services: "Services",
        footer_web: "Création Web & App",
        footer_help: "Aide Informatique",
        footer_repair_pc: "Réparation PC",
        footer_repair_phone: "Réparation Téléphone",
        footer_sell: "Devenir Vendeur",
        footer_lang: "Cours de Langues",
      },
      en: {
        nav_services: "Services",
        nav_repair: "Repairs",
        nav_sell: "Become a Seller",
        nav_languages: "Language Courses",
        nav_contact: "Contact",
        nav_cta: "Contact Us",

        hero_badge: "Your trusted tech partner",
        hero_title: "Digital solutions",
        hero_title2: "at your fingertips",
        hero_sub: "Website creation, device repair, IT support and language courses — everything you need, in one place.",
        hero_cta1: "Explore our services",
        hero_cta2: "Contact us now",
        hero_stat1: "Happy clients",
        hero_stat2: "Services offered",
        hero_stat3: "Availability",

        services_badge: "Our Services",
        services_title: "What we do for you",
        services_sub: "Professional solutions tailored to every need, with personalized support.",

        web_title: "Website & App Development",
        web_sub: "Attract new customers online",
        web_desc: "A professional website can transform your business. We create modern, fast, and conversion-optimized sites that turn visitors into loyal customers.",
        web_stat1: "+40%",
        web_stat1_label: "new customers",
        web_stat2: "×3",
        web_stat2_label: "online visibility",
        web_stat3: "+60%",
        web_stat3_label: "revenue growth",
        web_feat1: "Showcase or e-commerce website",
        web_feat2: "Custom mobile & web applications",
        web_feat3: "SEO & performance optimization",
        web_feat4: "Modern & responsive design",
        web_feat5: "Maintenance & support included",
        web_cta: "Get a free quote",

        help_title: "Remote IT Assistance",
        help_sub: "We handle everything, you stay stress-free",
        help_desc: "Struggling with your computer? No worries! We guide you over the phone, step by step, to solve all your tech problems.",
        help_feat1: "Personalized phone assistance",
        help_feat2: "Step-by-step guidance",
        help_feat3: "For seniors and beginners",
        help_feat4: "Software configuration",
        help_feat5: "Security & data protection",
        help_feat6: "File backup & recovery",
        help_cta: "Get help now",

        pc_title: "Computer Repair",
        pc_sub: "Your PC in good hands",
        pc_desc: "Breakdown, slowness, virus or faulty component? Our technicians diagnose and fix your computer quickly. No prices listed — contact us for a free diagnosis.",
        pc_feat1: "Hard drive / SSD replacement",
        pc_feat2: "RAM memory upgrade",
        pc_feat3: "Virus & malware removal",
        pc_feat4: "Windows / OS reinstallation",
        pc_feat5: "Screen & keyboard replacement",
        pc_feat6: "Cleaning & optimization",
        pc_note: "💡 Free quote — Call us to get a price tailored to your issue",
        pc_cta: "Free diagnosis",

        phone_title: "Phone Repair",
        phone_sub: "iPhone, Android — All brands",
        phone_desc: "Cracked screen, dead battery, broken charging port? We repair all Apple and Android models with quality parts. Walk-in or mail-in service.",
        phone_apple: "Apple iPhone",
        phone_android: "Android (Samsung, Oppo, Xiaomi...)",
        phone_feat1: "Screen replacement (LCD/OLED)",
        phone_feat2: "Battery replacement",
        phone_feat3: "Charging port repair",
        phone_feat4: "Front/rear camera replacement",
        phone_feat5: "Button & speaker repair",
        phone_feat6: "Data recovery",
        phone_note: "💡 Prices on request — Contact us for a personalized estimate",
        phone_cta: "Get a repair quote",

        sell_badge: "New",
        sell_title: "Become a Seller",
        sell_sub: "Buy and sell devices easily",
        sell_desc: "Got an old phone or computer collecting dust? We buy it directly! Or become a partner seller and benefit from our network.",
        sell_how_title: "How does it work?",
        sell_step1_title: "Describe your device",
        sell_step1_desc: "Model, condition, included accessories",
        sell_step2_title: "Receive an offer",
        sell_step2_desc: "Quick and fair estimate",
        sell_step3_title: "Close the deal",
        sell_step3_desc: "Secure and fast payment",
        sell_accept: "Accepted devices:",
        sell_accept1: "Smartphones (all brands)",
        sell_accept2: "Laptops & desktops",
        sell_accept3: "Tablets & accessories",
        sell_cta: "Sell my device",

        lang_badge: "Private Lessons",
        lang_title: "Language Courses",
        lang_sub: "Learn at your own pace",
        lang_desc: "Quality private lessons to help you progress quickly. We offer sessions tailored to your level and goals, via video or in person.",
        lang_fr: "French",
        lang_en: "English",
        lang_es: "Spanish",
        lang_combos: "All combinations available",
        lang_combo1: "French ↔ English",
        lang_combo2: "French ↔ Spanish",
        lang_combo3: "English ↔ Spanish",
        lang_feat1: "Lessons adapted to your level",
        lang_feat2: "Video or in-person sessions",
        lang_feat3: "Guaranteed fast progress",
        lang_feat4: "Personalized exercises",
        lang_feat5: "Conversation & grammar",
        lang_cta: "Book a trial lesson",

        contact_badge: "Contact Us",
        contact_title: "Ready to get started?",
        contact_sub: "Don't wait any longer — one simple call is enough to turn your project into reality.",
        contact_phone: "Call us",
        contact_email: "Send an email",
        contact_cta1: "Call now",
        contact_cta2: "Send a message",
        contact_hours: "Available Monday to Saturday, 9am–7pm",

        footer_rights: "All rights reserved",
        footer_services: "Services",
        footer_web: "Web & App Development",
        footer_help: "IT Assistance",
        footer_repair_pc: "Computer Repair",
        footer_repair_phone: "Phone Repair",
        footer_sell: "Become a Seller",
        footer_lang: "Language Courses",
      },
      es: {
        nav_services: "Servicios",
        nav_repair: "Reparaciones",
        nav_sell: "Hazte Vendedor",
        nav_languages: "Clases de Idiomas",
        nav_contact: "Contacto",
        nav_cta: "Contáctenos",

        hero_badge: "Tu socio tecnológico de confianza",
        hero_title: "Soluciones digitales",
        hero_title2: "al alcance de tu mano",
        hero_sub: "Creación de sitios web, reparación de dispositivos, asistencia informática y clases de idiomas — todo lo que necesitas, en un solo lugar.",
        hero_cta1: "Descubrir nuestros servicios",
        hero_cta2: "Contáctenos ahora",
        hero_stat1: "Clientes satisfechos",
        hero_stat2: "Servicios ofrecidos",
        hero_stat3: "Disponibilidad",

        services_badge: "Nuestros Servicios",
        services_title: "Lo que hacemos por ti",
        services_sub: "Soluciones profesionales adaptadas a cada necesidad, con acompañamiento personalizado.",

        web_title: "Creación de Sitios Web y Aplicaciones",
        web_sub: "Atrae nuevos clientes en línea",
        web_desc: "Un sitio web profesional puede transformar tu negocio. Creamos sitios modernos, rápidos y optimizados para convertir visitantes en clientes fieles.",
        web_stat1: "+40%",
        web_stat1_label: "nuevos clientes",
        web_stat2: "×3",
        web_stat2_label: "visibilidad en línea",
        web_stat3: "+60%",
        web_stat3_label: "crecimiento de ingresos",
        web_feat1: "Sitio vitrina o e-commerce",
        web_feat2: "Aplicaciones móviles y web a medida",
        web_feat3: "Optimización SEO y rendimiento",
        web_feat4: "Diseño moderno y responsive",
        web_feat5: "Mantenimiento y soporte incluidos",
        web_cta: "Obtener un presupuesto gratuito",

        help_title: "Asistencia Informática a Distancia",
        help_sub: "Nos encargamos de todo, tú te quedas tranquilo",
        help_desc: "¿Tienes dificultades con tu ordenador? ¡No te preocupes! Te guiamos por teléfono, paso a paso, para resolver todos tus problemas informáticos.",
        help_feat1: "Asistencia telefónica personalizada",
        help_feat2: "Guía paso a paso",
        help_feat3: "Para mayores y principiantes",
        help_feat4: "Configuración de software",
        help_feat5: "Seguridad y protección de datos",
        help_feat6: "Copia de seguridad y recuperación de archivos",
        help_cta: "Pedir ayuda ahora",

        pc_title: "Reparación de Ordenadores",
        pc_sub: "Tu PC en buenas manos",
        pc_desc: "¿Avería, lentitud, virus o componente defectuoso? Nuestros técnicos diagnostican y reparan tu ordenador rápidamente. Sin precios mostrados — contáctanos para un diagnóstico gratuito.",
        pc_feat1: "Sustitución de disco duro / SSD",
        pc_feat2: "Ampliación de memoria RAM",
        pc_feat3: "Eliminación de virus y malware",
        pc_feat4: "Reinstalación de Windows / OS",
        pc_feat5: "Sustitución de pantalla y teclado",
        pc_feat6: "Limpieza y optimización",
        pc_note: "💡 Presupuesto gratuito — Llámenos para obtener un precio adaptado a su problema",
        pc_cta: "Diagnóstico gratuito",

        phone_title: "Reparación de Teléfonos",
        phone_sub: "iPhone, Android — Todas las marcas",
        phone_desc: "¿Pantalla rota, batería muerta, puerto de carga roto? Reparamos todos los modelos Apple y Android con piezas de calidad. Visita o envío por correo.",
        phone_apple: "Apple iPhone",
        phone_android: "Android (Samsung, Oppo, Xiaomi...)",
        phone_feat1: "Sustitución de pantalla (LCD/OLED)",
        phone_feat2: "Sustitución de batería",
        phone_feat3: "Reparación del puerto de carga",
        phone_feat4: "Sustitución de cámara delantera/trasera",
        phone_feat5: "Reparación de botones y altavoces",
        phone_feat6: "Recuperación de datos",
        phone_note: "💡 Precios bajo presupuesto — Contáctenos para una estimación personalizada",
        phone_cta: "Obtener presupuesto de reparación",

        sell_badge: "Nuevo",
        sell_title: "Hazte Vendedor",
        sell_sub: "Compra y vende dispositivos fácilmente",
        sell_desc: "¿Tienes un teléfono o ordenador antiguo acumulando polvo? ¡Te lo compramos directamente! O conviértete en vendedor asociado y benefíciate de nuestra red.",
        sell_how_title: "¿Cómo funciona?",
        sell_step1_title: "Describe tu dispositivo",
        sell_step1_desc: "Modelo, estado, accesorios incluidos",
        sell_step2_title: "Recibe una oferta",
        sell_step2_desc: "Estimación rápida y honesta",
        sell_step3_title: "Cierra la venta",
        sell_step3_desc: "Pago seguro y rápido",
        sell_accept: "Dispositivos aceptados:",
        sell_accept1: "Smartphones (todas las marcas)",
        sell_accept2: "Portátiles y ordenadores de escritorio",
        sell_accept3: "Tabletas y accesorios",
        sell_cta: "Vender mi dispositivo",

        lang_badge: "Clases Particulares",
        lang_title: "Clases de Idiomas",
        lang_sub: "Aprende a tu ritmo",
        lang_desc: "Clases particulares de calidad para progresar rápidamente. Ofrecemos sesiones adaptadas a tu nivel y objetivos, por videollamada o presencialmente.",
        lang_fr: "Francés",
        lang_en: "Inglés",
        lang_es: "Español",
        lang_combos: "Todas las combinaciones disponibles",
        lang_combo1: "Francés ↔ Inglés",
        lang_combo2: "Francés ↔ Español",
        lang_combo3: "Inglés ↔ Español",
        lang_feat1: "Clases adaptadas a tu nivel",
        lang_feat2: "Sesiones por vídeo o presenciales",
        lang_feat3: "Progreso rápido garantizado",
        lang_feat4: "Ejercicios personalizados",
        lang_feat5: "Conversación y gramática",
        lang_cta: "Reservar una clase de prueba",

        contact_badge: "Contáctenos",
        contact_title: "¿Listo para empezar?",
        contact_sub: "No esperes más — una simple llamada es suficiente para convertir tu proyecto en realidad.",
        contact_phone: "Llámenos",
        contact_email: "Envíe un email",
        contact_cta1: "Llamar ahora",
        contact_cta2: "Enviar un mensaje",
        contact_hours: "Disponible de lunes a sábado, 9h–19h",

        footer_rights: "Todos los derechos reservados",
        footer_services: "Servicios",
        footer_web: "Desarrollo Web y App",
        footer_help: "Asistencia Informática",
        footer_repair_pc: "Reparación de PC",
        footer_repair_phone: "Reparación de Teléfono",
        footer_sell: "Hazte Vendedor",
        footer_lang: "Clases de Idiomas",
      }
    };

    let currentLang = 'fr';

    function detectLang() {
      const nav = navigator.language || navigator.userLanguage || 'fr';
      const code = nav.slice(0, 2).toLowerCase();
      if (code === 'en') return 'en';
      if (code === 'es') return 'es';
      return 'fr';
    }

    function t(key) {
      return translations[currentLang][key] || translations['fr'][key] || key;
    }

    function applyTranslations() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.getAttribute('data-i18n'));
      });
      document.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.innerHTML = t(el.getAttribute('data-i18n-html'));
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
      });
      // Update html lang attribute
      document.documentElement.lang = currentLang;
      // Update active lang button
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
      });
    }

    function setLang(lang) {
      currentLang = lang;
      applyTranslations();
    }

    document.addEventListener('DOMContentLoaded', function() {
      currentLang = detectLang();
      applyTranslations();

      // Scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

      // Mobile menu toggle
      document.getElementById('menu-toggle').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('open');
      });

      // Close mobile menu on link click
      document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
          document.getElementById('mobile-menu').classList.remove('open');
        });
      });

      // Navbar scroll effect
      window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
          nav.classList.add('bg-gray-950', 'shadow-lg');
          nav.classList.remove('bg-transparent');
        } else {
          nav.classList.remove('bg-gray-950', 'shadow-lg');
          nav.classList.add('bg-transparent');
        }
      });
    });
  </script>
</head>
<body class="bg-gray-950 text-white">

  <!-- ═══════════════ NAVBAR ═══════════════ -->
  <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 nav-blur bg-transparent transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <a href="#" class="flex items-center gap-3">
          <img src="/static/logo.png" alt="Logo" class="h-10 w-auto"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div style="display:none" class="h-10 w-10 accent-bg rounded-xl items-center justify-center text-white font-bold text-lg">T</div>
          <span class="text-white font-bold text-xl tracking-tight">Tech<span class="accent">Services</span></span>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-6">
          <a href="#services" class="text-gray-300 hover:text-white transition text-sm font-medium" data-i18n="nav_services"></a>
          <a href="#repairs" class="text-gray-300 hover:text-white transition text-sm font-medium" data-i18n="nav_repair"></a>
          <a href="#sell" class="text-gray-300 hover:text-white transition text-sm font-medium" data-i18n="nav_sell"></a>
          <a href="#languages" class="text-gray-300 hover:text-white transition text-sm font-medium" data-i18n="nav_languages"></a>

          <!-- Lang selector -->
          <div class="flex gap-1 bg-gray-800 rounded-full p-1 text-xs">
            <button onclick="setLang('fr')" data-lang="fr" class="lang-btn px-3 py-1 rounded-full font-semibold transition">FR</button>
            <button onclick="setLang('en')" data-lang="en" class="lang-btn px-3 py-1 rounded-full font-semibold transition">EN</button>
            <button onclick="setLang('es')" data-lang="es" class="lang-btn px-3 py-1 rounded-full font-semibold transition">ES</button>
          </div>

          <a href="#contact" class="accent-bg accent-bg-hover text-white px-5 py-2 rounded-full text-sm font-semibold transition cta-pulse" data-i18n="nav_cta"></a>
        </div>

        <!-- Mobile hamburger -->
        <button id="menu-toggle" class="md:hidden text-white p-2">
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="md:hidden bg-gray-950 border-t border-gray-800 px-4 py-4 space-y-3">
      <a href="#services" class="block text-gray-300 py-2" data-i18n="nav_services"></a>
      <a href="#repairs" class="block text-gray-300 py-2" data-i18n="nav_repair"></a>
      <a href="#sell" class="block text-gray-300 py-2" data-i18n="nav_sell"></a>
      <a href="#languages" class="block text-gray-300 py-2" data-i18n="nav_languages"></a>
      <div class="flex gap-2 pt-2">
        <button onclick="setLang('fr')" data-lang="fr" class="lang-btn px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 transition">FR</button>
        <button onclick="setLang('en')" data-lang="en" class="lang-btn px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 transition">EN</button>
        <button onclick="setLang('es')" data-lang="es" class="lang-btn px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 transition">ES</button>
      </div>
      <a href="#contact" class="block accent-bg text-white text-center py-3 rounded-xl font-semibold" data-i18n="nav_cta"></a>
    </div>
  </nav>

  <!-- ═══════════════ HERO ═══════════════ -->
  <section class="hero-gradient min-h-screen flex items-center pt-16 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
      <div class="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- Left: Text -->
        <div>
          <div class="badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span data-i18n="hero_badge"></span>
          </div>

          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4">
            <span data-i18n="hero_title"></span><br/>
            <span class="accent" data-i18n="hero_title2"></span>
          </h1>

          <p class="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl" data-i18n="hero_sub"></p>

          <div class="flex flex-col sm:flex-row gap-4 mb-14">
            <a href="#services" class="accent-bg accent-bg-hover text-white px-8 py-4 rounded-2xl font-bold text-lg transition cta-pulse flex items-center justify-center gap-3">
              <i class="fas fa-rocket"></i>
              <span data-i18n="hero_cta1"></span>
            </a>
            <a href="#contact" class="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3">
              <i class="fas fa-phone"></i>
              <span data-i18n="hero_cta2"></span>
            </a>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-3xl font-black accent">500+</div>
              <div class="text-gray-400 text-sm mt-1" data-i18n="hero_stat1"></div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-black accent">6</div>
              <div class="text-gray-400 text-sm mt-1" data-i18n="hero_stat2"></div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-black accent">7/7</div>
              <div class="text-gray-400 text-sm mt-1" data-i18n="hero_stat3"></div>
            </div>
          </div>
        </div>

        <!-- Right: Visual grid -->
        <div class="hidden lg:grid grid-cols-2 gap-4">
          <div class="img-placeholder h-48 rounded-2xl card-hover cursor-pointer">
            <div class="text-center p-4">
              <i class="fas fa-image text-3xl mb-2 block"></i>
              IMG1
            </div>
          </div>
          <div class="img-placeholder h-48 rounded-2xl card-hover cursor-pointer mt-8">
            <div class="text-center p-4">
              <i class="fas fa-image text-3xl mb-2 block"></i>
              IMG2
            </div>
          </div>
          <div class="img-placeholder h-48 rounded-2xl card-hover cursor-pointer">
            <div class="text-center p-4">
              <i class="fas fa-image text-3xl mb-2 block"></i>
              IMG3
            </div>
          </div>
          <div class="img-placeholder h-48 rounded-2xl card-hover cursor-pointer mt-8">
            <div class="text-center p-4">
              <i class="fas fa-image text-3xl mb-2 block"></i>
              IMG4
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave bottom -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#030712"/>
      </svg>
    </div>
  </section>

  <!-- ═══════════════ SECTION INTRO SERVICES ═══════════════ -->
  <section id="services" class="bg-gray-950 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
      <span class="badge inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" data-i18n="services_badge"></span>
      <h2 class="text-4xl sm:text-5xl font-black mb-4" data-i18n="services_title"></h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto" data-i18n="services_sub"></p>
    </div>
  </section>

  <!-- ═══════════════ WEB & APP ═══════════════ -->
  <section class="bg-gray-900 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- Visual -->
        <div class="grid grid-cols-2 gap-4 fade-in">
          <div class="img-placeholder h-52 col-span-2 card-hover cursor-pointer">
            <div class="text-center p-4">
              <i class="fas fa-globe text-4xl mb-2 block"></i>
              IMG5
            </div>
          </div>
          <div class="img-placeholder h-36 card-hover cursor-pointer">
            <div class="text-center p-4">
              <i class="fas fa-mobile-alt text-2xl mb-1 block"></i>
              IMG6
            </div>
          </div>
          <div class="img-placeholder h-36 card-hover cursor-pointer">
            <div class="text-center p-4">
              <i class="fas fa-laptop-code text-2xl mb-1 block"></i>
              IMG7
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="fade-in">
          <div class="badge inline-block px-3 py-1 rounded-full text-xs font-medium mb-3">
            <i class="fas fa-code mr-1"></i>
            <span data-i18n="web_sub"></span>
          </div>
          <h2 class="text-4xl font-black mb-4" data-i18n="web_title"></h2>
          <p class="text-gray-400 text-lg mb-6" data-i18n="web_desc"></p>

          <!-- Stats impact -->
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="bg-gray-800 rounded-2xl p-4 text-center card-hover">
              <div class="text-2xl font-black accent" data-i18n="web_stat1"></div>
              <div class="text-gray-400 text-xs mt-1" data-i18n="web_stat1_label"></div>
            </div>
            <div class="bg-gray-800 rounded-2xl p-4 text-center card-hover">
              <div class="text-2xl font-black accent" data-i18n="web_stat2"></div>
              <div class="text-gray-400 text-xs mt-1" data-i18n="web_stat2_label"></div>
            </div>
            <div class="bg-gray-800 rounded-2xl p-4 text-center card-hover">
              <div class="text-2xl font-black accent" data-i18n="web_stat3"></div>
              <div class="text-gray-400 text-xs mt-1" data-i18n="web_stat3_label"></div>
            </div>
          </div>

          <!-- Features -->
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="web_feat1"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="web_feat2"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="web_feat3"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="web_feat4"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="web_feat5"></span></li>
          </ul>

          <a href="#contact" class="inline-flex items-center gap-3 accent-bg accent-bg-hover text-white px-8 py-4 rounded-2xl font-bold text-lg transition cta-pulse">
            <i class="fas fa-arrow-right"></i>
            <span data-i18n="web_cta"></span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- ═══════════════ AIDE INFORMATIQUE ═══════════════ -->
  <section class="bg-gray-950 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- Content -->
        <div class="fade-in">
          <div class="badge inline-block px-3 py-1 rounded-full text-xs font-medium mb-3">
            <i class="fas fa-headset mr-1"></i>
            <span data-i18n="help_sub"></span>
          </div>
          <h2 class="text-4xl font-black mb-4" data-i18n="help_title"></h2>
          <p class="text-gray-400 text-lg mb-6" data-i18n="help_desc"></p>

          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="help_feat1"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="help_feat2"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="help_feat3"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="help_feat4"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="help_feat5"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="help_feat6"></span></li>
          </ul>

          <a href="#contact" class="inline-flex items-center gap-3 accent-bg accent-bg-hover text-white px-8 py-4 rounded-2xl font-bold text-lg transition cta-pulse">
            <i class="fas fa-phone"></i>
            <span data-i18n="help_cta"></span>
          </a>
        </div>

        <!-- Visual -->
        <div class="fade-in">
          <div class="img-placeholder h-72 card-hover cursor-pointer mb-4">
            <div class="text-center p-4">
              <i class="fas fa-headset text-5xl mb-3 block"></i>
              IMG8
            </div>
          </div>
          <!-- Feature icons -->
          <div class="grid grid-cols-3 gap-3">
            <div class="bg-gray-800 rounded-xl p-4 text-center card-hover">
              <i class="fas fa-phone text-2xl accent mb-2 block"></i>
              <span class="text-xs text-gray-400">Téléphone</span>
            </div>
            <div class="bg-gray-800 rounded-xl p-4 text-center card-hover">
              <i class="fas fa-shield-alt text-2xl accent mb-2 block"></i>
              <span class="text-xs text-gray-400">Sécurité</span>
            </div>
            <div class="bg-gray-800 rounded-xl p-4 text-center card-hover">
              <i class="fas fa-user-friends text-2xl accent mb-2 block"></i>
              <span class="text-xs text-gray-400">Seniors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- ═══════════════ RÉPARATIONS ═══════════════ -->
  <section id="repairs" class="bg-gray-900 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-8">

        <!-- PC Repair -->
        <div class="bg-gray-800 rounded-3xl p-8 card-hover fade-in">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 accent-bg rounded-2xl flex items-center justify-center">
              <i class="fas fa-laptop text-white text-2xl"></i>
            </div>
            <div>
              <div class="badge inline-block px-2 py-1 rounded-full text-xs font-medium mb-1" data-i18n="pc_sub"></div>
              <h3 class="text-2xl font-black" data-i18n="pc_title"></h3>
            </div>
          </div>

          <p class="text-gray-400 mb-6" data-i18n="pc_desc"></p>

          <div class="grid grid-cols-2 gap-2 mb-6">
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fas fa-hdd accent text-sm"></i>
              <span data-i18n="pc_feat1"></span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fas fa-memory accent text-sm"></i>
              <span data-i18n="pc_feat2"></span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fas fa-bug accent text-sm"></i>
              <span data-i18n="pc_feat3"></span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fab fa-windows accent text-sm"></i>
              <span data-i18n="pc_feat4"></span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fas fa-tv accent text-sm"></i>
              <span data-i18n="pc_feat5"></span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fas fa-broom accent text-sm"></i>
              <span data-i18n="pc_feat6"></span>
            </div>
          </div>

          <div class="bg-indigo-950/50 border border-indigo-700/30 rounded-2xl p-4 mb-6 text-sm text-indigo-300" data-i18n="pc_note"></div>

          <div class="img-placeholder h-40 rounded-2xl mb-6 card-hover cursor-pointer">
            <div class="text-center p-4">
              <i class="fas fa-image text-2xl mb-1 block"></i>
              IMG9
            </div>
          </div>

          <a href="#contact" class="flex items-center justify-center gap-3 accent-bg accent-bg-hover text-white py-4 rounded-2xl font-bold transition w-full">
            <i class="fas fa-tools"></i>
            <span data-i18n="pc_cta"></span>
          </a>
        </div>

        <!-- Phone Repair -->
        <div class="bg-gray-800 rounded-3xl p-8 card-hover fade-in">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
              <i class="fas fa-mobile-alt text-white text-2xl"></i>
            </div>
            <div>
              <div class="badge inline-block px-2 py-1 rounded-full text-xs font-medium mb-1" data-i18n="phone_sub"></div>
              <h3 class="text-2xl font-black" data-i18n="phone_title"></h3>
            </div>
          </div>

          <!-- Brand badges -->
          <div class="flex gap-3 mb-4">
            <div class="flex items-center gap-2 bg-gray-700 rounded-xl px-4 py-2">
              <i class="fab fa-apple text-white text-lg"></i>
              <span class="text-sm font-semibold" data-i18n="phone_apple"></span>
            </div>
            <div class="flex items-center gap-2 bg-gray-700 rounded-xl px-4 py-2">
              <i class="fab fa-android text-green-400 text-lg"></i>
              <span class="text-sm font-semibold" data-i18n="phone_android"></span>
            </div>
          </div>

          <p class="text-gray-400 mb-6" data-i18n="phone_desc"></p>

          <div class="grid grid-cols-2 gap-2 mb-6">
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fas fa-mobile accent text-sm"></i>
              <span data-i18n="phone_feat1"></span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fas fa-battery-full accent text-sm"></i>
              <span data-i18n="phone_feat2"></span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fas fa-plug accent text-sm"></i>
              <span data-i18n="phone_feat3"></span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fas fa-camera accent text-sm"></i>
              <span data-i18n="phone_feat4"></span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fas fa-volume-up accent text-sm"></i>
              <span data-i18n="phone_feat5"></span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/50 rounded-xl p-3">
              <i class="fas fa-database accent text-sm"></i>
              <span data-i18n="phone_feat6"></span>
            </div>
          </div>

          <div class="bg-purple-950/50 border border-purple-700/30 rounded-2xl p-4 mb-6 text-sm text-purple-300" data-i18n="phone_note"></div>

          <div class="img-placeholder h-40 rounded-2xl mb-6 card-hover cursor-pointer" style="border-color:#9333ea; background: linear-gradient(135deg,#1a1033,#2e1065);">
            <div class="text-center p-4">
              <i class="fas fa-image text-2xl mb-1 block" style="color:#a855f7"></i>
              IMG10
            </div>
          </div>

          <a href="#contact" class="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold transition w-full">
            <i class="fas fa-wrench"></i>
            <span data-i18n="phone_cta"></span>
          </a>
        </div>

      </div>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- ═══════════════ DEVENIR VENDEUR ═══════════════ -->
  <section id="sell" class="bg-gray-950 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-12 fade-in">
        <div class="badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span data-i18n="sell_badge"></span>
        </div>
        <h2 class="text-4xl sm:text-5xl font-black mb-4" data-i18n="sell_title"></h2>
        <p class="text-xl text-indigo-400 font-semibold mb-4" data-i18n="sell_sub"></p>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto" data-i18n="sell_desc"></p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-start">

        <!-- Steps -->
        <div class="fade-in">
          <h3 class="text-xl font-bold mb-6 text-gray-200" data-i18n="sell_how_title"></h3>
          <div class="space-y-4">
            <div class="flex gap-4 bg-gray-800 rounded-2xl p-5 card-hover">
              <div class="w-12 h-12 accent-bg rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0">1</div>
              <div>
                <div class="font-bold mb-1" data-i18n="sell_step1_title"></div>
                <div class="text-gray-400 text-sm" data-i18n="sell_step1_desc"></div>
              </div>
            </div>
            <div class="flex gap-4 bg-gray-800 rounded-2xl p-5 card-hover">
              <div class="w-12 h-12 accent-bg rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0">2</div>
              <div>
                <div class="font-bold mb-1" data-i18n="sell_step2_title"></div>
                <div class="text-gray-400 text-sm" data-i18n="sell_step2_desc"></div>
              </div>
            </div>
            <div class="flex gap-4 bg-gray-800 rounded-2xl p-5 card-hover">
              <div class="w-12 h-12 accent-bg rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0">3</div>
              <div>
                <div class="font-bold mb-1" data-i18n="sell_step3_title"></div>
                <div class="text-gray-400 text-sm" data-i18n="sell_step3_desc"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Accepted devices + image -->
        <div class="fade-in">
          <div class="img-placeholder h-52 rounded-2xl mb-6 card-hover cursor-pointer">
            <div class="text-center p-4">
              <i class="fas fa-exchange-alt text-4xl mb-2 block"></i>
              IMG11
            </div>
          </div>

          <div class="bg-gray-800 rounded-2xl p-6">
            <h4 class="font-bold mb-4 text-gray-200" data-i18n="sell_accept"></h4>
            <ul class="space-y-3">
              <li class="flex items-center gap-3 text-gray-300">
                <i class="fas fa-mobile-alt accent text-lg"></i>
                <span data-i18n="sell_accept1"></span>
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <i class="fas fa-laptop accent text-lg"></i>
                <span data-i18n="sell_accept2"></span>
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <i class="fas fa-tablet-alt accent text-lg"></i>
                <span data-i18n="sell_accept3"></span>
              </li>
            </ul>
          </div>

          <a href="#contact" class="mt-6 flex items-center justify-center gap-3 accent-bg accent-bg-hover text-white py-4 rounded-2xl font-bold text-lg transition cta-pulse w-full">
            <i class="fas fa-tag"></i>
            <span data-i18n="sell_cta"></span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- ═══════════════ COURS DE LANGUES ═══════════════ -->
  <section id="languages" class="bg-gray-900 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- Content -->
        <div class="fade-in">
          <div class="badge inline-block px-3 py-1 rounded-full text-xs font-medium mb-3">
            <i class="fas fa-graduation-cap mr-1"></i>
            <span data-i18n="lang_badge"></span>
          </div>
          <h2 class="text-4xl font-black mb-2" data-i18n="lang_title"></h2>
          <p class="text-indigo-400 font-semibold text-xl mb-4" data-i18n="lang_sub"></p>
          <p class="text-gray-400 text-lg mb-6" data-i18n="lang_desc"></p>

          <!-- Language flags/badges -->
          <div class="flex gap-3 mb-6">
            <div class="bg-blue-900/50 border border-blue-700/50 rounded-xl px-4 py-3 text-center">
              <div class="text-2xl mb-1">🇫🇷</div>
              <div class="text-sm font-semibold" data-i18n="lang_fr"></div>
            </div>
            <div class="bg-red-900/50 border border-red-700/50 rounded-xl px-4 py-3 text-center">
              <div class="text-2xl mb-1">🇬🇧</div>
              <div class="text-sm font-semibold" data-i18n="lang_en"></div>
            </div>
            <div class="bg-yellow-900/50 border border-yellow-700/50 rounded-xl px-4 py-3 text-center">
              <div class="text-2xl mb-1">🇪🇸</div>
              <div class="text-sm font-semibold" data-i18n="lang_es"></div>
            </div>
          </div>

          <!-- Combos -->
          <div class="bg-gray-800 rounded-2xl p-5 mb-6">
            <div class="text-sm font-bold text-gray-300 mb-3" data-i18n="lang_combos"></div>
            <div class="flex flex-wrap gap-2">
              <span class="badge px-3 py-1 rounded-full text-sm" data-i18n="lang_combo1"></span>
              <span class="badge px-3 py-1 rounded-full text-sm" data-i18n="lang_combo2"></span>
              <span class="badge px-3 py-1 rounded-full text-sm" data-i18n="lang_combo3"></span>
            </div>
          </div>

          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="lang_feat1"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="lang_feat2"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="lang_feat3"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="lang_feat4"></span></li>
            <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-check-circle accent text-lg"></i><span data-i18n="lang_feat5"></span></li>
          </ul>

          <a href="#contact" class="inline-flex items-center gap-3 accent-bg accent-bg-hover text-white px-8 py-4 rounded-2xl font-bold text-lg transition cta-pulse">
            <i class="fas fa-book-open"></i>
            <span data-i18n="lang_cta"></span>
          </a>
        </div>

        <!-- Visual -->
        <div class="fade-in space-y-4">
          <div class="img-placeholder h-64 card-hover cursor-pointer">
            <div class="text-center p-4">
              <i class="fas fa-language text-5xl mb-2 block"></i>
              IMG12
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="img-placeholder h-36 card-hover cursor-pointer">
              <div class="text-center p-4">
                <i class="fas fa-image text-2xl mb-1 block"></i>
                IMG13
              </div>
            </div>
            <div class="img-placeholder h-36 card-hover cursor-pointer">
              <div class="text-center p-4">
                <i class="fas fa-image text-2xl mb-1 block"></i>
                IMG14
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- ═══════════════ CONTACT CTA ═══════════════ -->
  <section id="contact" class="hero-gradient py-24 relative overflow-hidden">
    <!-- Background blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-80 h-80 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 fade-in">
      <div class="badge inline-block px-4 py-2 rounded-full text-sm font-medium mb-6" data-i18n="contact_badge"></div>

      <h2 class="text-5xl sm:text-6xl font-black mb-4" data-i18n="contact_title"></h2>
      <p class="text-gray-300 text-xl mb-12 max-w-2xl mx-auto" data-i18n="contact_sub"></p>

      <!-- Contact cards -->
      <div class="grid sm:grid-cols-2 gap-6 mb-10">
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 card-hover">
          <div class="w-16 h-16 accent-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-phone text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2" data-i18n="contact_phone"></h3>
          <p class="text-gray-400 text-sm mb-6" data-i18n="contact_hours"></p>
          <a href="tel:+33000000000" class="flex items-center justify-center gap-3 accent-bg accent-bg-hover text-white py-4 rounded-2xl font-bold text-lg transition cta-pulse w-full">
            <i class="fas fa-phone-alt"></i>
            <span data-i18n="contact_cta1"></span>
          </a>
        </div>

        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 card-hover">
          <div class="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-envelope text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2" data-i18n="contact_email"></h3>
          <p class="text-gray-400 text-sm mb-6" data-i18n="contact_hours"></p>
          <a href="mailto:contact@techservicespro.fr" class="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold text-lg transition w-full">
            <i class="fas fa-paper-plane"></i>
            <span data-i18n="contact_cta2"></span>
          </a>
        </div>
      </div>

      <!-- Social / extra CTAs -->
      <div class="flex flex-wrap justify-center gap-4">
        <a href="https://wa.me/33000000000" target="_blank" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
          <i class="fab fa-whatsapp text-xl"></i>
          WhatsApp
        </a>
        <a href="sms:+33000000000" class="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition">
          <i class="fas fa-sms text-xl"></i>
          SMS
        </a>
      </div>
    </div>
  </section>

  <!-- ═══════════════ FOOTER ═══════════════ -->
  <footer class="bg-gray-950 border-t border-gray-800 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <img src="/static/logo.png" alt="Logo" class="h-10 w-auto"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div style="display:none" class="h-10 w-10 accent-bg rounded-xl items-center justify-center text-white font-bold text-lg">T</div>
            <span class="text-white font-bold text-xl">Tech<span class="accent">Services</span></span>
          </div>
          <p class="text-gray-500 text-sm max-w-xs" data-i18n="hero_sub"></p>
        </div>

        <!-- Services links -->
        <div>
          <h4 class="font-bold text-white mb-4" data-i18n="footer_services"></h4>
          <ul class="space-y-2 text-gray-500 text-sm">
            <li><a href="#services" class="hover:text-white transition" data-i18n="footer_web"></a></li>
            <li><a href="#services" class="hover:text-white transition" data-i18n="footer_help"></a></li>
            <li><a href="#repairs" class="hover:text-white transition" data-i18n="footer_repair_pc"></a></li>
            <li><a href="#repairs" class="hover:text-white transition" data-i18n="footer_repair_phone"></a></li>
            <li><a href="#sell" class="hover:text-white transition" data-i18n="footer_sell"></a></li>
            <li><a href="#languages" class="hover:text-white transition" data-i18n="footer_lang"></a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-bold text-white mb-4" data-i18n="nav_contact"></h4>
          <ul class="space-y-2 text-gray-500 text-sm">
            <li class="flex items-center gap-2">
              <i class="fas fa-phone accent text-xs"></i>
              <a href="tel:+33000000000" class="hover:text-white transition">+33 0 00 00 00 00</a>
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-envelope accent text-xs"></i>
              <a href="mailto:contact@techservicespro.fr" class="hover:text-white transition">contact@techservicespro.fr</a>
            </li>
            <li class="flex items-center gap-2">
              <i class="fab fa-whatsapp accent text-xs"></i>
              <a href="https://wa.me/33000000000" target="_blank" class="hover:text-white transition">WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-gray-600 text-sm">
          &copy; 2025 TechServices Pro — <span data-i18n="footer_rights"></span>
        </p>
        <div class="flex gap-1 bg-gray-800 rounded-full p-1 text-xs">
          <button onclick="setLang('fr')" data-lang="fr" class="lang-btn px-3 py-1 rounded-full font-semibold transition">FR</button>
          <button onclick="setLang('en')" data-lang="en" class="lang-btn px-3 py-1 rounded-full font-semibold transition">EN</button>
          <button onclick="setLang('es')" data-lang="es" class="lang-btn px-3 py-1 rounded-full font-semibold transition">ES</button>
        </div>
      </div>
    </div>
  </footer>

</body>
</html>`

  return c.html(html)
})

export default app
