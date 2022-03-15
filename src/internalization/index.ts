import {i18nProvider} from './config';

export const internalization = {
    get currentLocale(): string {
        return i18nProvider.getLocale();
    },

    get locales(): string[] {
        return i18nProvider.getLocales();
    },
    set locale(locale: string) {
        if (this.getLocales().indexOf(locale) !== -1) {
            i18nProvider.setLocale(locale);
        }
    },

    translate(phraseOrOptions: string): string {
        return i18nProvider.__(phraseOrOptions);
    },

    translatePlurals(phrase: string, count: number) {
        return i18nProvider.__n(phrase, count);
    }
};
