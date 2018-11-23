export default ({ app, store }) => {
    app.router.beforeEach((to, from, next) => {
        if (['article-id', 'guestbook', 'archive', 'about'].find(item => from.name === item)) {
        	store.commit('app/SET_ARTICLE_TITLE_VISIBLE', false)
            store.commit('app/SET_FULL_COLUMN', false)
        }
        next()
    })

    app.router.afterEach((to, from) => {})
}