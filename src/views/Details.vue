<template>
  <div class="about">
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-chip class="ma-2 font-weight-black" color="primary" large>
            Completed:
            {{ countCompleteTodo }}
          </v-chip>
        </v-col>
        <v-col cols="4">
          <h1 class="font-weight-black">This is an Todos page</h1>
        </v-col>
        <v-col cols="4">
          <v-btn @click="snackbar = true">
            open snackbar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="grey lighten-5">
      <AddTodo
        @added="
          snackbar = $event.status;
          text = $event.message;
        "
      />
      <v-row align="center" justify="center">
        <template v-if="allTodos.length">
          <v-col cols="7" v-for="todo in allTodos" :key="todo.id">
            <TodoCard
              :todo="todo"
              @abcd="
                snackbar = $event.status;
                text = $event.message;
              "
            />
          </v-col>
        </template>
        <h1 v-else>
          Loading....
        </h1>
        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TodoCard from "@/components/TodoCard.vue";
import AddTodo from "@/components/AddTodo.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      data: [],
      snackbar: false,
      text: "My timeout is set to 2000.",
      timeout: 2000,
    };
  },
  components: {
    TodoCard,
    AddTodo,
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    ...mapActions(["fetchTodos"]),
  },
  computed: {
    countCompleteTodo() {
      return this.allTodos.filter((todo) => todo.completed).length;
    },
    ...mapGetters(["allTodos"]),
  },
};
</script>
