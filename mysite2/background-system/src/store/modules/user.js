import { getlogin, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  SET_USER: (state, user) => {
    state.user = user;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      getlogin(userInfo)
        .then((res) => {
          const { data } = res;

          if (data) {
            commit("SET_USER", userInfo);
            resolve();
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
      // login({ username: username.trim(), password: password }).then(response => {
      //   const { data } = response
      //   commit('SET_TOKEN', data.token)
      //   setToken(data.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then((res) => {
        if (typeof res === "string") {
          res = JSON.parse(res);
          if (res.code === 401) {
            reject(res.msg);
          }
        } else {
          commit("SET_USER", res.data);
          resolve();
        }
      });
      // getInfo(state.token)
      //   .then((response) => {
      //     const { data } = response;

      //     if (!data) {
      //       return reject("Verification failed, please Login again.");
      //     }

      //     const { name, avatar } = data;

      //     commit("SET_NAME", name);
      //     commit("SET_AVATAR", avatar);
      //     resolve(data);
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("adminToken"); // must remove  token  first
      resetRouter();
      commit("RESET_STATE");
      resolve();
      // logout(state.token)
      //   .then(() => {
      //     removeToken(); // must remove  token  first
      //     resetRouter();
      //     commit("RESET_STATE");
      //     resolve();
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
