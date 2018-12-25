// 保留历史数据
import localForage from "localforage";
import { setGuestbookLike, setArticleLike, setCommentLike, setCommentReplyLike } from '@/api/index'

const SET_GUESBOOK_LIKE = 'SET_GUESBOOK_LIKE'; // 点赞留言墙
const SET_ARTICLE_LIKE = 'SET_ARTICLE_LIKE';   // 点赞文章
const SET_COMMENT_LIKE = 'SET_COMMENT_LIKE';   // 点赞文章评论
const SET_COMMENT_REPLY_LIKE = 'SET_COMMENT_REPLY_LIKE';   // 点赞文章评论的回复
const SET_USER_INFO = 'SET_USER_INFO'; 			// 留言用户信息保存

export const state = () => ({
	guesbookLike: [],
	articleLike: [],
	commentLike: [],
	commentReplyLike: [],
	userInfo: {}
})

export const getters = {
	guesbookLike: state => state.guesbookLike,
	articleLike: state => state.articleLike,
	commentLike: state => state.commentLike,
	commentReplyLike: state => state.commentReplyLike,
	userInfo: state => state.userInfo
}

export const mutations = {
	SET_GUESBOOK_LIKE (state, data) {
		state.guesbooklike = data
	},
	SET_ARTICLE_LIKE (state, data) {
		state.articleLike = data
	},
	SET_COMMENT_LIKE (state, data) {
		state.commentLike = data
	},
	SET_COMMENT_REPLY_LIKE (state, data) {
		state.commentReplyLike = data
	},
	SET_USER_INFO (state, data) {
		state.userInfo = data
	}
}

export const actions = {
	// 点赞留言墙
	async setGuesbookLike ({ commit, dispatch, rootState }, data){
		let res = await setGuestbookLike(data);
		let localItem = await localForage.getItem('GUESBOOK_LIKE');

		let arr = [];
		if( localItem ) arr = localItem;
		arr.push( data.uuid );
		await localForage.setItem('GUESBOOK_LIKE', arr);
		commit(SET_GUESBOOK_LIKE, arr);

		return res.data;
	},
	async getGuesbookLike ({ commit, dispatch, rootState }){
		let localItem = await localForage.getItem('GUESBOOK_LIKE');
		localItem = localItem == null ? [] : localItem;
		commit(SET_GUESBOOK_LIKE, localItem);
		return localItem;
	},

	// 点赞文章
	async setArticleLike ({ commit, dispatch, state, rootState }, data){
		let res = await setArticleLike(data);

		// 设置历史点赞记录
		let localItem = await localForage.getItem('ARTICLE_LIKE');
		let arr = [];
		if( localItem ) arr = localItem;
		arr.push( data.uuid );
		await localForage.setItem('ARTICLE_LIKE', arr);
		commit(SET_ARTICLE_LIKE, arr);

		//重新获取文章内容
		dispatch('article/getArticle', data, {root: true});

		return res.data;
	},
	async getArticleLike ({ commit, dispatch, rootState }){
		let localItem = await localForage.getItem('ARTICLE_LIKE');
		localItem = localItem == null ? [] : localItem;
		commit(SET_ARTICLE_LIKE, localItem);
		return localItem;
	},

	// 点赞文章评论
	async setCommentLike ({ commit, dispatch, rootState }, data){
		let res = await setCommentLike(data);
		let localItem = await localForage.getItem('COMMENT_LIKE');

		let arr = [];
		if( localItem ) arr = localItem;
		arr.push( data.commentUuid );
		await localForage.setItem('COMMENT_LIKE', arr);
		commit(SET_COMMENT_LIKE, arr);

		return res.data;
	},
	async getCommentLike ({ commit, dispatch, rootState }){
		let localItem = await localForage.getItem('COMMENT_LIKE');
		localItem = localItem == null ? [] : localItem;
		commit(SET_COMMENT_LIKE, localItem);
		return localItem;
	},

	// 点赞文章评论回复
	async setCommentReplyLike ({ commit, dispatch, rootState }, data){
		let res = await setCommentReplyLike(data);
		let localItem = await localForage.getItem('COMMENT_REPLY_LIKE');

		let arr = [];
		if( localItem ) arr = localItem;
		arr.push( data.replyUuid );
		await localForage.setItem('COMMENT_REPLY_LIKE', arr);
		commit(SET_COMMENT_REPLY_LIKE, arr);

		return res.data;
	},
	async getCommentReplyLike ({ commit, dispatch, rootState }){
		let localItem = await localForage.getItem('COMMENT_REPLY_LIKE');
		localItem = localItem == null ? [] : localItem;
		commit(SET_COMMENT_REPLY_LIKE, localItem);
		return localItem;
	},

	// 留言评论用户信息
	async setUserInfo ({ commit, dispatch, rootState }, data){
		await localForage.setItem('USER_INFO', data);
		commit(SET_USER_INFO, data);
		return data;
	},
	async getUserInfo ({ commit, dispatch, rootState }){
		let localItem = await localForage.getItem('USER_INFO');
		commit(SET_USER_INFO, localItem);
		return localItem;
	}
}