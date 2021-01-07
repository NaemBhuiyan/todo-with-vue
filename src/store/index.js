import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isEdit: true,
    isLoading: false,
    todos: [],
  },
  actions: {
    async fetchTodos({ commit }) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      commit("setTodos", response.data);
    },
    async addTodo({ commit }, title) {
      commit("setIsLoading", true);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        { title, completed: false }
      );
      console.log(response);
      commit("setAddTodo", response.data);
      commit("setIsLoading", false);
      return response;
    },
    async deleteTodo({ commit }, id) {
      const res = await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      commit("deleteTodo", id);
      return res;
    },
    async updateTodo({ commit }, { title, id }) {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          title,
        }
      );

      commit("updateTodo", response.data);
      return response;
    },
    setIsEdit({ commit }) {
      commit("setIsEdit");
    },
  },
  mutations: {
    setTodos: (state, todos) => {
      return (state.todos = todos);
    },
    setAddTodo: (state, todo) => state.todos.unshift(todo),
    deleteTodo: (state, id) =>
      (state.todos = state.todos.filter((todo) => todo.id !== id)),
    updateTodo: (state, data) => {
      // console.log({ title, id });
      state.todos = state.todos.map((todo) => {
        if (todo.id === data.id) {
          todo.title = data.title;
          return todo;
        } else {
          return todo;
        }
      });
    },
    setIsLoading: (state, status) => (state.isLoading = status),
    // setIsEdit: (state) => (state.isEdit = !state.isEdit),
  },
  getters: {
    allTodos: (state) => state.todos,
    isLoading: (state) => state.isLoading,
    // isEdit: (state) => state.isEdit,
  },
});
