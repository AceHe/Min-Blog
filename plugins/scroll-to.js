import Vue from 'vue'
import { scrollTo, easing } from '@/utils/dom'

Vue.prototype.$scrollTo = function ( element = null, duration = 500, options = {} ) {
  if ( typeof(options.easing) == 'string' ) {
    options.easing = easing[options.easing]
  }
  scrollTo(element, duration, options)
}

Vue.prototype.$scrollToComments = function ( element = null ) {
  this.$scrollTo(element || '.article-comments', 500, {
    offset: -76,
    easing: 'ease'
  })
}
