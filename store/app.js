// 网站的一些设置，需要存储到本地
import localForage from "localforage";

const SET_FULL_COLUMN = 'SET_FULL_COLUMN'; //是否显示侧边栏
const SET_ARTICLE_TITLE_VISIBLE = 'SET_ARTICLE_TITLE_VISIBLE'; // 头部是否显示标题
const SET_THEME = 'SET_THEME'; // 页面主题

export const state = () => ({
	theme: 'light',
	fullColumn: false,
	showArticleTitle: false
})

export const getters = {
	theme: state => state.theme,
	fullColumn: state => state.fullColumn,
	showArticleTitle: state => state.showArticleTitle
}

export const mutations = {
	SET_THEME (state, arg) {
		state.theme = arg
	},
	SET_FULL_COLUMN (state, arg) {
		state.fullColumn = arg
	},
	SET_ARTICLE_TITLE_VISIBLE (state, arg) {
		state.showArticleTitle = arg
	}
}

export const actions = {
	async getTheme ({ commit, state }) {
		let item = await localForage.getItem('THEME_KEY');
		console.log( 'get', item )
		const theme = item ? item : 'light';
		commit(SET_THEME, theme)
	},
	async updateTheme ({ commit, state }, theme) {
		if (theme) {
			await localForage.setItem('THEME_KEY', theme);
			commit(SET_THEME, theme)
		}
	}
}