import Vue from 'vue'
import Router from 'vue-router'

const _bee8c2e4 = () => import('..\\pages\\archive.vue' /* webpackChunkName: "pages_archive" */).then(m => m.default || m)
const _2e25fe4e = () => import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */).then(m => m.default || m)
const _7883b3e6 = () => import('..\\pages\\guestbook.vue' /* webpackChunkName: "pages_guestbook" */).then(m => m.default || m)
const _4f0c48f4 = () => import('..\\pages\\tag\\_name.vue' /* webpackChunkName: "pages_tag__name" */).then(m => m.default || m)
const _1ac8a5f8 = () => import('..\\pages\\category\\_name.vue' /* webpackChunkName: "pages_category__name" */).then(m => m.default || m)
const _158b67e8 = () => import('..\\pages\\article\\_id.vue' /* webpackChunkName: "pages_article__id" */).then(m => m.default || m)
const _61037bb6 = () => import('..\\pages\\search\\_keyword.vue' /* webpackChunkName: "pages_search__keyword" */).then(m => m.default || m)
const _08a4db9e = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)

Vue.use(Router)


if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/archive",
			component: _bee8c2e4,
			name: "archive"
		},
		{
			path: "/about",
			component: _2e25fe4e,
			name: "about"
		},
		{
			path: "/guestbook",
			component: _7883b3e6,
			name: "guestbook"
		},
		{
			path: "/tag/:name?",
			component: _4f0c48f4,
			name: "tag-name"
		},
		{
			path: "/category/:name?",
			component: _1ac8a5f8,
			name: "category-name"
		},
		{
			path: "/article/:id?",
			component: _158b67e8,
			name: "article-id"
		},
		{
			path: "/search/:keyword?",
			component: _61037bb6,
			name: "search-keyword"
		},
		{
			path: "/",
			component: _08a4db9e,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
