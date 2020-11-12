import Vue from 'vue'
import { register, format } from 'timeago.js'

// add translations directly to the application
Vue.i18n.add('br', require('./pt_br.json'))
Vue.i18n.add('en', require('./en.json'))
Vue.i18n.add('es', require('./es.json'))
Vue.i18n.add('cn', require('./cn.json'))
Vue.i18n.add('ir', require('./ir.json'))

// set the start locale to use
Vue.i18n.set('es')

// set fallback for non-translated strings
Vue.i18n.fallback('es')

const localeFunc = (number, index) => {
  const locale = Vue.i18n.locale() === 'gb' ? 'en' : Vue.i18n.locale()
  const translations = require(`./${locale}.json`).timeago
  // number: the timeago / timein number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  const result = []
  for (const prop in translations.past) {
    result.push([translations.past[prop], ''])
  }
  let i = 0
  for (const prop in translations.future) {
    result[i] = [result[i][0], translations.future[prop]]
    i++
  }

  return result[index]
}
// register your locale with timeago
register(Vue.i18n.locale(), localeFunc)
Object.defineProperty(Vue.prototype, '$timeago', { value: (word, locale = Vue.i18n.locale()) => { return format(word, locale) } })
Object.defineProperty(Vue.prototype, '$timeagoRefreshLocale', { value: () => { register(Vue.i18n.locale(), localeFunc) } })
