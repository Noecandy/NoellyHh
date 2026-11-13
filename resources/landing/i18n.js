/**
 * Translations and language detection.
 *
 * Priority used to pick the language:
 *   1. `?lang=xx` in the URL (shareable links)
 *   2. A language the visitor chose manually with the ES / EN switch
 *   3. The browser's preferred language (Spanish or English; anything else falls back to English)
 */

export const translations = {
    es: {
        'meta.title': 'NoellyHh | Universo creativo',
        'meta.description': 'Conoce el universo creativo de NoellyHh: doblaje, canto, modelaje y cosplay.',
        'meta.ogDescription': 'Doblaje, canto, modelaje y cosplay.',
        'nav.home': 'NoellyHh, ir al inicio',
        'nav.label': 'Secciones',
        'nav.explore': 'Universo',
        'nav.manifesto': 'Manifiesto',
        'nav.contact': 'Contacto',
        'nav.talk': 'Hablemos',
        'hero.eyebrow': 'HOLA, SOY NOELLY',
        'hero.title1': 'Un mundo de',
        'hero.title2': 'mil versiones',
        'hero.text': 'Voces, música y personajes. Un espacio donde la creatividad no tiene límites.',
        'hero.tagsLabel': 'Áreas creativas',
        'hero.cta': 'Explora mi mundo',
        'hero.listen': 'Escúchame',
        'hero.artLabel': 'Imagen de perfil de NoellyHh',
        'hero.ring': 'DOBLAJE ✦ CANTO ✦ MODELAJE ✦ COSPLAY ✦ UN POQUITO DE MAGIA ✦',
        'hero.note': 'creando con el corazón',
        'hero.scroll': 'Bajar',
        'tags.voice': 'DOBLAJE',
        'tags.music': 'CANTO',
        'tags.model': 'MODELAJE',
        'ticker.one': 'CREATIVIDAD SIN LÍMITES ✳ VOCES QUE COBRAN VIDA ✳ MÚSICA CON ACTITUD ✳ PERSONAJES CON ALMA ✳',
        'ticker.two': 'DOBLAJE ♡ CANTO ♡ METAL ♡ MODELAJE ♡ COSPLAY ♡',
        'explore.kicker': 'UN POQUITO DE TODO',
        'explore.title1': 'Explora mi',
        'explore.title2': 'universo',
        'explore.lead': 'Cuatro formas de contar historias. ¿Por dónde empezamos?',
        'cards.voice.number': '01 / LA VOZ',
        'cards.voice.title': 'Doblaje',
        'cards.voice.text': 'Historias que toman vida a través de la voz.',
        'cards.voice.action': 'Conoce más',
        'cards.music.number': '02 / LA MÚSICA',
        'cards.music.title': 'Canto',
        'cards.music.text': 'Pasión, fuerza y música para sentir.',
        'cards.music.action': 'Visita mi YouTube',
        'cards.model.number': '03 / FRENTE A CÁMARA',
        'cards.model.title': 'Modelaje',
        'cards.model.text': 'Una mirada, muchas formas de expresarse.',
        'cards.model.action': 'Ver en Instagram',
        'cards.cosplay.number': '04 / OTROS MUNDOS',
        'cards.cosplay.text': 'Personajes y creatividad en cada detalle.',
        'cards.cosplay.action': 'Ver mis cosplays',
        'manifesto.kicker': 'LO QUE ME MUEVE',
        'manifesto.text': 'Creo historias con la voz, las canto con el alma y las visto con cada detalle. Cada personaje es una versión distinta de mí, y todas caben en este pequeño universo.',
        'contact.kicker': '¿CREAMOS ALGO JUNTOS?',
        'contact.title1': 'Las mejores historias',
        'contact.title2': 'empiezan aquí.',
        'contact.text': 'Conectemos y compartamos ideas bonitas.',
        'contact.cta': 'Escríbeme en Instagram',
        'footer.made': 'HECHO CON UN POQUITO DE MAGIA',
    },
    en: {
        'meta.title': 'NoellyHh | Creative universe',
        'meta.description': "Discover NoellyHh's creative universe: voice acting, singing, modeling, and cosplay.",
        'meta.ogDescription': 'Voice acting, singing, modeling, and cosplay.',
        'nav.home': 'NoellyHh, back to home',
        'nav.label': 'Sections',
        'nav.explore': 'Universe',
        'nav.manifesto': 'Manifesto',
        'nav.contact': 'Contact',
        'nav.talk': "Let's talk",
        'hero.eyebrow': "HI, I'M NOELLY",
        'hero.title1': 'A world of',
        'hero.title2': 'many selves',
        'hero.text': 'Voices, music, and characters. A space where creativity knows no limits.',
        'hero.tagsLabel': 'Creative fields',
        'hero.cta': 'Explore my world',
        'hero.listen': 'Listen to me',
        'hero.artLabel': "NoellyHh's profile image",
        'hero.ring': 'VOICE ACTING ✦ SINGING ✦ MODELING ✦ COSPLAY ✦ A LITTLE BIT OF MAGIC ✦',
        'hero.note': 'creating from the heart',
        'hero.scroll': 'Scroll down',
        'tags.voice': 'VOICE ACTING',
        'tags.music': 'SINGING',
        'tags.model': 'MODELING',
        'ticker.one': 'CREATIVITY WITHOUT LIMITS ✳ VOICES COME TO LIFE ✳ MUSIC WITH ATTITUDE ✳ CHARACTERS WITH SOUL ✳',
        'ticker.two': 'VOICE ACTING ♡ SINGING ♡ METAL ♡ MODELING ♡ COSPLAY ♡',
        'explore.kicker': 'A LITTLE BIT OF EVERYTHING',
        'explore.title1': 'Explore my',
        'explore.title2': 'universe',
        'explore.lead': 'Four ways to tell stories. Where shall we begin?',
        'cards.voice.number': '01 / THE VOICE',
        'cards.voice.title': 'Voice acting',
        'cards.voice.text': 'Stories brought to life through voice.',
        'cards.voice.action': 'Learn more',
        'cards.music.number': '02 / THE MUSIC',
        'cards.music.title': 'Singing',
        'cards.music.text': 'Passion, strength, and music you can feel.',
        'cards.music.action': 'Visit my YouTube',
        'cards.model.number': '03 / IN FRONT OF THE CAMERA',
        'cards.model.title': 'Modeling',
        'cards.model.text': 'One look, many ways to express yourself.',
        'cards.model.action': 'See on Instagram',
        'cards.cosplay.number': '04 / OTHER WORLDS',
        'cards.cosplay.text': 'Characters and creativity in every detail.',
        'cards.cosplay.action': 'See my cosplays',
        'manifesto.kicker': 'WHAT MOVES ME',
        'manifesto.text': 'I create stories with my voice, sing them with my soul, and wear them down to every detail. Each character is a different version of me, and they all fit in this little universe.',
        'contact.kicker': 'SHALL WE CREATE SOMETHING TOGETHER?',
        'contact.title1': 'The best stories',
        'contact.title2': 'start here.',
        'contact.text': "Let's connect and share lovely ideas.",
        'contact.cta': 'Message me on Instagram',
        'footer.made': 'MADE WITH A LITTLE BIT OF MAGIC',
    },
};

export const supportedLanguages = Object.keys(translations);
const fallbackLanguage = 'en';
const languageChoiceKey = 'noellyhh:language';

function readStorage(key) {
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}

function writeStorage(key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch {
        // Storage can be blocked (private mode); the page still works without it.
    }
}

function isSupported(language) {
    return supportedLanguages.includes(language);
}

function languageFromUrl() {
    const language = new URL(window.location.href).searchParams.get('lang');

    return isSupported(language) ? language : null;
}

/**
 * Picks the first supported language from the browser's preferred languages
 * (e.g. ["es-MX", "en"] → "es"), falling back to English.
 */
function languageFromBrowser() {
    const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
    const match = preferred
        .map((language) => String(language ?? '').slice(0, 2).toLowerCase())
        .find(isSupported);

    return match ?? fallbackLanguage;
}

/** Returns the language to show when the page opens. */
export function initialLanguage() {
    const fromUrl = languageFromUrl();

    if (fromUrl) {
        return fromUrl;
    }

    const chosen = readStorage(languageChoiceKey);

    if (isSupported(chosen)) {
        return chosen;
    }

    return languageFromBrowser();
}

export function rememberLanguageChoice(language) {
    writeStorage(languageChoiceKey, language);
}

/**
 * Applies a language to every element tagged with data-i18n attributes.
 *
 * @param {string} language
 * @param {(element: Element) => void} [onTextChange] called for elements whose text changed
 */
export function applyLanguage(language, onTextChange = () => {}) {
    const dictionary = translations[language] ?? translations[fallbackLanguage];

    document.documentElement.lang = language;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const text = dictionary[element.dataset.i18n];

        if (text !== undefined && element.dataset.i18nCurrent !== text) {
            element.textContent = text;
            element.dataset.i18nCurrent = text;
            onTextChange(element);
        }
    });

    document.querySelectorAll('[data-i18n-repeat]').forEach((element) => {
        const text = dictionary[element.dataset.i18nRepeat];

        if (text !== undefined) {
            element.replaceChildren(...Array.from({ length: 4 }, () => {
                const span = document.createElement('span');
                span.textContent = text;

                return span;
            }));
        }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
        const text = dictionary[element.dataset.i18nAria];

        if (text !== undefined) {
            element.setAttribute('aria-label', text);
        }
    });

    document.querySelectorAll('[data-i18n-content]').forEach((element) => {
        const text = dictionary[element.dataset.i18nContent];

        if (text !== undefined) {
            element.setAttribute('content', text);
        }
    });

    document.querySelectorAll('button[data-language]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });

    document.documentElement.dataset.activeLanguage = language;
}
