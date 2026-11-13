import './style.css';
import { applyLanguage, initialLanguage, rememberLanguageChoice } from './i18n.js';
import { prefersReducedMotion, prepareText, startMotion } from './motion.js';

const root = document.documentElement;
let currentLanguage = initialLanguage();
let pendingSwitch = 0;

applyLanguage(currentLanguage, prepareText);
startMotion();

function switchLanguage(language) {
    if (language === currentLanguage) {
        return;
    }

    currentLanguage = language;

    if (prefersReducedMotion) {
        applyLanguage(language, prepareText);

        return;
    }

    root.classList.add('is-switching');
    window.clearTimeout(pendingSwitch);

    pendingSwitch = window.setTimeout(() => {
        applyLanguage(language, prepareText);
        root.classList.remove('is-switching');
    }, 260);
}

document.querySelectorAll('button[data-language]').forEach((button) => {
    button.addEventListener('click', () => {
        const language = button.dataset.language;
        const url = new URL(window.location.href);

        rememberLanguageChoice(language);
        url.searchParams.delete('lang');
        window.history.replaceState({}, '', url);
        switchLanguage(language);
    });
});
