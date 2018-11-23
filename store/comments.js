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
		const res = await setGuestbookLike(data);
		const getlocal = await localForage.getItem('GUESBOOK_LIKE');
		let uuidArr = [];
		if( getlocal ) uuidArr = getlocal;
		uuidArr.push( data.uuid );
		const setlocal = await localForage.setItem('GUESBOOK_LIKE', uuidArr);
		return res.data
	},

	async getLike ({ commit, dispatch, rootState }) {
		const getlocal = await localForage.getItem('GUESBOOK_LIKE');
		commit(SET_GUESBOOK_LIKE, getlocal)
		return getlocal
	}
}
