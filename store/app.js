import localForage from "localforage";

const SET_FULL_COLUMN = 'SET_FULL_COLUMN';
const SET_ARTICLE_TITLE_VISIBLE = 'SET_ARTICLE_TITLE_VISIBLE';
const SET_THEME = 'SET_THEME';

export const state = () => ({
	theme: 'light',
	fullColumn: false,
	showArticleTitle: false,
})

export const getters = {
	theme: state => state.theme,
	fullColumn: state => state.fullColumn,
	showArticleTitle: state => state.showArticleTitle,
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
	},
}

export const actions = {
	async getTheme ({ commit, state }) {
		const setlocal = await localForage.getItem('THEME_KEY');
		const theme = setlocal ? setlocal : 'light';
		commit(SET_THEME, theme)
	},
	async updateTheme ({ commit, state }, theme) {
		if (theme) {
			commit(SET_THEME, theme)
			const setlocal = await localForage.setItem('THEME_KEY', theme);
		}
	}
}