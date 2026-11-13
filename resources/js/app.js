const translations = [...document.querySelectorAll('[data-en], [data-en-aria-label], [data-en-alt], [data-en-content]')].map((element) => ({
    element,
    text: element.hasAttribute('data-en') ? element.textContent : null,
    ariaLabel: element.getAttribute('aria-label'),
    alt: element.getAttribute('alt'),
    content: element.getAttribute('content'),
}));

const languageSwitch = document.querySelector('.language-switch');
const languageButtons = document.querySelectorAll('[data-language]');

function setLanguage(language) {
    const isEnglish = language === 'en';

    document.documentElement.lang = isEnglish ? 'en' : 'es';

    translations.forEach(({ element, text, ariaLabel, alt, content }) => {
        if (text !== null) element.textContent = isEnglish ? element.dataset.en : text;
        if (ariaLabel !== null) element.setAttribute('aria-label', isEnglish ? element.dataset.enAriaLabel : ariaLabel);
        if (alt !== null) element.setAttribute('alt', isEnglish ? element.dataset.enAlt : alt);
        if (content !== null) element.setAttribute('content', isEnglish ? element.dataset.enContent : content);
    });

    languageButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.language === document.documentElement.lang));
    });
}

function languageFromUrl() {
    return new URL(window.location.href).searchParams.get('lang') === 'en' ? 'en' : 'es';
}

languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', button.dataset.language);
        window.history.pushState({}, '', url);
        setLanguage(button.dataset.language);
    });
});

window.addEventListener('popstate', () => setLanguage(languageFromUrl()));
setLanguage(languageFromUrl());
languageSwitch.hidden = false;
