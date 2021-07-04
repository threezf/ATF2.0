const state = {
	baseFileName: "",
	expFileName: "",
	originName: "",
	goalName: "",
	basePath: "",
	expPath: "",
	uploaded: false
};
const map = new Map();
map.set("GetOpt.java", "isbug");
map.set("AttList.java", "isbug");
map.set("Compile.java", "isbug");
map.set("ElemPI.java", "isbug");
map.set("Process.java", "isbug");
map.set("FuncNot.java", "nobug");
map.set("Import.java", "nobug");
map.set("Number.java", "nobug");
map.set("Plus.java", "nobug");
map.set("XPathFactory.java", "nobug");

const getters = {
	getList(state) {
		let result = [];
		if (state.baseFileName != "") {
			result.push(state.baseFileName);
		}
		if (state.expFileName != "") {
			result.push(state.expFileName);
		}
		return result;
	},
	getMap(state) {
		return map;
	},
	getMapList(state) {
		return {
			isbug: [
				"GetOpt.java",
				"AttList.java",
				"Compile.java",
				"ElemPI.java",
				"Process.java"
			],
			nobug: [
				"FuncNot.java",
				"Import.java",
				"Number.java",
				"Plus.java",
				"XPathFactory.java"
			]
		};
	}
};

const mutations = {
	setBaseFileName(state, payload) {
		console.log(payload, map.get(payload), "setBaseFileName");
		state.originName = payload;
		state.baseFileName = map.get(payload) || "isbug";
	},
	setExpFileName(state, payload) {
		console.log(payload, map.get(payload, "setExpFileName"));
		state.goalName = payload;
		state.expFileName = map.get(payload) || "nobug";
	},
	setBasePath(state, payload) {
		if (map.get(payload)) {
			state.basePath = map.get(payload);
		} else {
			state.basePath = "nobug";
		}
		console.log(state.basePath, payload, "payload");
	},
	setExpPath(state, payload) {
		console.log("setExp", payload);
		if (map.get(payload)) {
			state.expPath = map.get(payload);
		} else {
			state.expPath = "isbug";
		}
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
