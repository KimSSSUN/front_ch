import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: {
      name: '김땡땡',
      location: '수원, 대한민국',
      phone: '010-1234-5678',
    },
    selectedWheelchairType: null,
  },
  mutations: {
    setSelectedWheelchairType(state, type) {
      state.selectedWheelchairType = type;
    },
  },
  actions: {
    selectWheelchair({ commit }, type) {
      commit('setSelectedWheelchairType', type);
    },
  },
});

export default store;
