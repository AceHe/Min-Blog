module.exports = {
    cache: {
        max: 20,
        maxAge: 600000
    },

    head: {
        title: '小何才露尖尖角',
        titleTemplate: '%s - ' + '小何才露尖尖角',
        htmlAttrs: {
            xmlns: 'http://www.w3.org/1999/xhtml',
            lang: 'zh'
        },
        meta: [
            { charset: 'utf-8' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
            { 'http-equiv': 'Cache-Control', content: 'no-transform' },
            { 'http-equiv': 'Cache-Control', content: 'no-siteapp' },
            { 'http-equiv': 'cleartype', content: 'on' },
            { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
            { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover' },
            { name: 'MobileOptimized', content: '320' },
            { name: 'HandheldFriendly', content: 'True' },
            { name: 'renderer', content: 'webkit' },
            { name: 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
            { name: 'screen-orientation', content: 'portrait' },
            { name: 'x5-orientation', content: 'portrait' },
            { name: 'msapplication-tap-highlight', content: 'no' },
            { name: 'apple-mobile-web-app-title', content: '小何才露尖尖角' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'author', content: 'acehemin@qq.com' },
            { name: 'theme-color', content: '#302e31' },
            { hid: 'keywords', name: 'keywords', content: 'Blog,前端,Vue,Node.js,小何才露尖尖角' },
            { hid: 'description', name: 'description', content: '小何才露尖尖角' }
        ],
        link: [
            { rel: 'shortcut icon', type: 'image/x-icon', href: '//static.jooger.me/img/common/favicon/favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: '//fonts.loli.net/css?family=Damion' },
        ]
    },

    loading: {
        color: '#302e31'
    },

    css: [
        'normalize.css',
        { src: '@/assets/style/index.styl', lang: 'stylus' }
    ],

    router: {
        linkActiveClass: 'active'
    },

    transition: {
        name: 'fade',
        mode: 'out-in'
    },

    build: {
        analyze: false
    },

    plugins: [
        { src: '@/plugins/console-say-hi', ssr: false },
        { src: '@/plugins/copyright', ssr: false },
        { src: '@/plugins/count-to', ssr: false },
        { src: '@/plugins/lazyload', ssr: false },
        { src: '@/plugins/loading', ssr: false },
        { src: '@/plugins/notification', ssr: true },
        { src: '@/plugins/particles', ssr: false },
        { src: '@/plugins/router', ssr: false },
        { src: '@/plugins/scroll-to', ssr: false },
        { src: '@/plugins/storage-to-store', ssr: false }
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/localforage'
    ],

}