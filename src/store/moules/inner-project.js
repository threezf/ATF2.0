const state = {
	rarName: "",
	uploaded: false
};

const getters = {};

const mutations = {
	setRarName(state, payload) {
		state.rarName = payload;
	},
	setUploaded(state) {
		state.uploaded = true;
	}
};

const actions = {};

const interfaceStore = {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};

export default interfaceStore;
