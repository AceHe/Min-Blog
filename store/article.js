import { getArticleContent, getCategorys, getTags, getHots } from '@/api/index'

const GET_ARTICLE = 'GET_ARTICLE'; 		// 获取文章内容
const GET_CATEGORY = 'GET_CATEGORY'; 	// 获取分类
const GET_TAG = 'GET_TAG'; 				// 获取标签
const GET_HOT = 'GET_HOT'; 				// 获取热门文章

export const state = () => ({
	article: {},
	category: [],
	tag: [],
	hot: []
})

export const getters = {
	article: state => state.article,
	category: state => state.category,
	tag: state => state.tag,
	hot: state => state.hot
}

export const mutations = {
	GET_ARTICLE (state, arg) {
		state.article = arg
	},
	GET_CATEGORY (state, arg) {
		state.category = arg
	},
	GET_TAG (state, arg) {
		state.tag = arg
	},
	GET_HOT (state, arg) {
		state.hot = arg
	}
}

export const actions = {
	async getArticle ({ commit, state }, param) {
		const { data } = await getArticleContent(param);
		if( data.code == 0 ){
			commit(GET_ARTICLE, data.data)
		}
		return data;
	},

	// 全部分类
	async getCategory ({ commit, state }) {
		const { data } = await getCategorys();
		if( data.code == 0 ){
			commit(GET_CATEGORY, data.data );
		}
		return data;
	},

	// 全部标签
	async getTag ({ commit, state }) {
		const { data } = await getTags();
		if( data.code == 0 ){
			commit(GET_TAG, data.data)
		}
		return data;
	},

	// 热门文章
	async getHot ({ commit, state }) {
		const { data } = await getHots();
		if( data.code == 0 ){
			commit(GET_HOT, data.data)
		}
		return data;
	}
}