import {isMobile} from '@/utils/validator'

export const actions = {
    async nuxtServerInit({ commit, state, dispatch }, { params, route, req }) {
		const ua = req.headers['user-agent'];
		const mobileClient = isMobile(ua);
		if (mobileClient) {
			commit('app/SET_MOBILE_LAYOUT', true)
		}
    }
}
