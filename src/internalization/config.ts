import {I18n} from 'i18n';
import path from 'path';

const i18nProvider = new I18n();

i18nProvider.configure({
    locales: ['ru'],
    defaultLocale: 'ru',
    directory: path.join(__dirname, 'locales')
});

export {i18nProvider};
