const state = {
    authType: 1,
    transactId: '',
    id: '',
    interfaceGroupId: '',
    interfaceName: '',
    protocol: '',
    urlPath: '',
    status: 1,
    method: 0,
    params: {},
    header: {},
    bodyFormat: 1,
    bodyContent: {},
    bodyResponseType: {},
    bodyResponse: {},
    headerResponse: {},
    tags: [],
    createTime: 0,
    updateTime: 0,
}

const getters = {

}

const mutations = {
    updateAuthType(state, payload) {
        state.authType = payload.value
    },
    updateTransactId(state, payload) {
        state.transactId = payload.value
    },
    updateId(state, payload) {
        state.id = payload.value
    },
    updateInterfaceGroupId(state, payload) {
        state.interfaceGroupId = payload.value
    },
    updateInterfaceName(state, payload) {
        state.interfaceName = payload.value
    },
    updateProtocol(state, payload) {
        state.protocol = payload.value
    },
    updateUrlPath(state, payload) {
        state.urlPath = payload.value
    },
    updateStatus(state, payload) {
        state.status = payload.value
    },
    updateMethod(state, payload) {
        state.method = payload.value
    },
    updateParams(state, payload) {
        state.params = payload.value
    },
    updateHeader(state, payload) {
        state.header = payload.value
    },
    updateBodyFormat(state, payload) {
        state.bodyFormat = payload.value
    },
    updateBodyContent(state, payload) {
        state.bodyContent = payload.value
    },
    updateBodyResponseType(state, payload) {
        state.bodyResponseType = payload.value
    },
    updateBodyResponse(state, payload) {
        state.bodyResponse = payload.value
    },
    updateHeaderResponse(state, payload) {
        state.headerResponse = payload.value
    },
    updateTags(state, payload) {
        state.tags = payload.value
    },
    updateCreateTime(state, payload) {
        state.createTime = payload.value
    },
    updateUpdateTime(state, payload) {
        state.updateTime = payload.value
    },
}

const actions = {

}

const interfaceStore = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}

export default interfaceStore