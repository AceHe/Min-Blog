// 留言墙
import localForage from "localforage";
import { setGuestbookLike } from '@/api/index'

const SET_GUESBOOK_LIKE = 'SET_GUESBOOK_LIKE';

export const state = () => ({
	guesbookLike: []
})

export const mutations = {
	SET_GUESBOOK_LIKE (state, data) {
		state.guesbooklike = data
	}
}

export const actions = {
	async setLike ({ commit, dispatch, rootState }, data) {
		let res = await setGuestbookLike(data);
		let item = await localForage.getItem('GUESBOOK_LIKE');
		let uuidArr = [];
		if( item ) uuidArr = item;
		uuidArr.push( data.uuid );
		await localForage.setItem('GUESBOOK_LIKE', uuidArr);
		return res.data
	},

	async getLike ({ commit, dispatch, rootState }) {
		let item = await localForage.getItem('GUESBOOK_LIKE');
		commit(SET_GUESBOOK_LIKE, item)
		return item
	}
}
