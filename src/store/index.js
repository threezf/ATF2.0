import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import actions from "./actions";
import interfaceStore from "./moules/interface/index";
import showStore from "./moules/show";
import innerProject from "./moules/inner-project";

import mutations from "./mutations";
Vue.use(Vuex);

const store = new Vuex.Store({
	state,
	mutations,
	getters,
	actions,
	modules: {
		interface: interfaceStore,
		showStore: showStore,
		innerProject: innerProject
	}
});

export default store;
