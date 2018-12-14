// 网站的一些设置，需要存储到本地
import localForage from "localforage";

const SET_FULL_COLUMN = 'SET_FULL_COLUMN'; 						// 是否显示侧边栏
const SET_ARTICLE_TITLE_VISIBLE = 'SET_ARTICLE_TITLE_VISIBLE'; 	// 是否显示头部标题
const SET_TITLE = 'SET_TITLE'; 									// 头部标题
const SET_THEME = 'SET_THEME'; 									// 页面主题
const SET_MOBILE_LAYOUT = 'SET_MOBILE_LAYOUT'; 					// 默认布局

export const state = () => ({
	fullColumn: false,
	showArticleTitle: false,
	title: '',
	theme: 'light',
	mobileLayout: false
})

export const getters = {
	fullColumn: state => state.fullColumn,
	showArticleTitle: state => state.showArticleTitle,
	title: state => state.title,
	theme: state => state.theme,
	mobileLayout: state => state.mobileLayout
}

export const mutations = {
	SET_FULL_COLUMN (state, arg) {
		state.fullColumn = arg
	},
	SET_ARTICLE_TITLE_VISIBLE (state, arg) {
		state.showArticleTitle = arg
	},
	SET_TITLE (state, arg) {
		state.title = arg
	},
	SET_THEME (state, arg) {
		state.theme = arg
	},
	SET_MOBILE_LAYOUT (state, arg) {
		 state.mobileLayout = arg
	}
}

export const actions = {
	// 博客主题设置
	async getTheme ({ commit, state }) {
		let item = await localForage.getItem('THEME_KEY');
		const theme = item ? item : 'light';
		commit(SET_THEME, theme)
	},
	async updateTheme ({ commit, state }, theme) {
		if (theme) {
			await localForage.setItem('THEME_KEY', theme);
			commit(SET_THEME, theme)
		}
	},

	// 导航处显示的 title
	async setTitle ({ commit, state }, title) {
		if( title ){
			commit(SET_TITLE, title)
		}
	},
}