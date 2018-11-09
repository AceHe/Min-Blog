import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '..\\node_modules\\normalize.css\\normalize.css'

import '..\\assets\\style\\index.styl'


import _6f6c098b from '..\\layouts\\default.vue'

const layouts = { "_default": _6f6c098b }



export default {
  head: {"title":"小何才露尖尖角","titleTemplate":"%s - 小何才露尖尖角","htmlAttrs":{"xmlns":"http:\u002F\u002Fwww.w3.org\u002F1999\u002Fxhtml","lang":"zh"},"meta":[{"charset":"utf-8"},{"http-equiv":"X-UA-Compatible","content":"IE=edge"},{"http-equiv":"Cache-Control","content":"no-transform"},{"http-equiv":"Cache-Control","content":"no-siteapp"},{"http-equiv":"cleartype","content":"on"},{"http-equiv":"x-dns-prefetch-control","content":"on"},{"name":"viewport","content":"width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"},{"name":"MobileOptimized","content":"320"},{"name":"HandheldFriendly","content":"True"},{"name":"renderer","content":"webkit"},{"name":"X-UA-Compatible","content":"IE=edge, chrome=1"},{"name":"screen-orientation","content":"portrait"},{"name":"x5-orientation","content":"portrait"},{"name":"msapplication-tap-highlight","content":"no"},{"name":"apple-mobile-web-app-title","content":"小何才露尖尖角"},{"name":"apple-mobile-web-app-capable","content":"yes"},{"name":"author","content":"acehemin@qq.com"},{"name":"theme-color","content":"#302e31"},{"hid":"keywords","name":"keywords","content":"Blog,前端,Vue,Node.js,小荷才露尖尖角"},{"hid":"description","name":"description","content":"小荷才露尖尖角"}],"link":[{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Damion"}],"style":[],"script":[]},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
      
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    
    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
    
  },
  components: {
    NuxtLoading
  }
}
