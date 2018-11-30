import localForage from "localforage";
import { getCategorys, getTags, getHots } from '@/api/index'

const SET_TITLE = 'SET_TITLE';
const SET_CATEGORY = 'SET_CATEGORY';
const SET_TAG = 'SET_TAG';
const SET_HOT = 'SET_HOT';

export const state = () => ({
	title: '',
	category: [],
	tag: [],
	hot: [],
})

export const getters = {
	title: state => state.title,
	category: state => state.category,
	tag: state => state.tag,
	hot: state => state.hot,
}

export const mutations = {
	SET_TITLE (state, arg) {
		state.title = arg
	},
	SET_CATEGORY (state, arg) {
		state.category = arg
	},
	SET_TAG (state, arg) {
		state.tag = arg
	},
	SET_HOT (state, arg) {
		state.hot = arg
	},
}

export const actions = {
	// 导航处显示的 title
	async getTitle ({ commit, state }) {
		const title = await localForage.getItem('TITLE_KEY');
		commit(SET_TITLE, title)
	},
	async setTitle ({ commit, state }, title) {
		if (title) {
			commit(SET_TITLE, title)
			await localForage.setItem('TITLE_KEY', title);
		}
	},

	// 全部分类
	async getCategory ({ commit, state }) {
		const res = await getCategorys();
		commit(SET_CATEGORY, res.data.data)
		return res;
	},

	// 全部标签
	async getTag ({ commit, state }) {
		const res = await getTags();
		commit(SET_TAG, res.data.data)
		return res;
	},

	// 热门文章
	async getHot ({ commit, state }) {
		const res = await getHots();
		commit(SET_HOT, res.data.data)
		return res;
	}
}