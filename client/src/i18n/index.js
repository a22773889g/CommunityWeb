import i18n from 'i18next';
import zhTW from './zh-TW.json';
import enUS from './en-US.json';
import zhCN from './zh-CN.json';

export default i18n.init({
  debug: false,
  lng: 'zhCN',
  fallbackLng: 'zhCN',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    zhCN,
    enUS,
    zhTW,
  },
});
