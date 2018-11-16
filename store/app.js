
const SET_FULL_COLUMN = 'SET_FULL_COLUMN';

export const state = () => ({
	fullColumn: false
})

export const getters = {
  fullColumn: state => state.fullColumn,
}

export const mutations = {
	SET_FULL_COLUMN (state, fullColumn) {
		state.fullColumn = fullColumn
	}
}