import localForage from "localforage";
import { getWebsite, getFriendLink } from '@/api/index'

const SET_WEBSITE = 'SET_WEBSITE';
const SET_FRIENDLINK = 'SET_FRIENDLINK';

export const state = () => ({
	website: {},
	friendlink: []
})

export const getters = {
	website: state => state.website,
	friendlink: state => state.friendlink
}

export const mutations = {
	SET_WEBSITE (state, arg) {
		state.website = arg
	},
	SET_FRIENDLINK (state, arg) {
		state.friendlink = arg
	},
}

export const actions = {
	async getWebsite ({ commit, state }) {
		const res = await getWebsite();
		commit(SET_WEBSITE, res.data.data);
		return res;
	},
	async getFriendLink ({ commit, state }) {
		const res = await getFriendLink();
		commit(SET_FRIENDLINK, res.data.data);
		return res;
	}
}