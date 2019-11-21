import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
const store = new Vuex.Store({
    // 全局变量
    state: {
        user: undefined
    },
    // 通过mutation修改state
    // 只能使用同步方法
    mutations: {
        login(state,payload){
            state.user = payload;
        },
        logout(state){
            state.user = undefined;
        }
    },
    // 异步方法使用actions
    actions: {
        login (context, payload) {
            context.commit('login', payload)
        },
        logout (context) {
            context.commit('logout')
        }
    }
});

export default store;