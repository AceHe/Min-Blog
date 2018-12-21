import localForage from "localforage";

export default ({ store }) => {
    if (process.client) {
        localForage.getItem('THEME_KEY',function(err, value) {
            if (value) {
                setTimeout(() => {
                    store.commit('app/SET_THEME', value)
                }, 0)
            }
        });
    }
}
