<template>
  <v-card
    color="#385F73"
    dark
    class="d-flex align-center justify-space-between"
  >
    <template v-if="isEdit">
      <div class="d-flex">
        <v-checkbox v-model="todo.completed" class="mx-3"> </v-checkbox>
        <v-card-title :class="{ headline: todo.completed }">
          {{ todo.title }}
        </v-card-title>
      </div>

      <v-btn
        v-if="!todo.completed"
        class="mr-3"
        color="success"
        @click="changeEditState"
      >
        Edit
      </v-btn>
      <v-btn
        v-if="todo.completed"
        class="mr-3"
        color="red"
        @click="onDelete"
        :loading="isLoading"
      >
        Delete
      </v-btn>
    </template>
    <template v-else>
      <v-row align="center">
        <v-col cols="8">
          <v-text-field class="mx-3" v-model="todoText"></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn
            class="mr-3"
            color="primary"
            @click="onUpdate"
            :loading="isLoading"
          >
            save
          </v-btn>
          <v-btn class="mr-3" color="info" @click="changeEditState()">
            cancel
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TodoCard",
  props: {
    todo: Object,
  },
  data() {
    return {
      isLoading: false,
      isEdit: true,
      todoText: this.todo.title,
      res: null,
    };
  },
  computed: {
    changeSnackbarStatus() {
      return this.snackbar;
    },
  },
  methods: {
    ...mapActions(["deleteTodo", "updateTodo", "setIsEdit"]),
    changeEditState() {
      this.isEdit = !this.isEdit;
    },
    async onUpdate() {
      this.isLoading = true;
      this.res = await this.updateTodo({
        title: this.todoText,
        id: this.todo.id,
      });

      if (this.res.status === 200) {
        this.isEdit = true;
        this.isLoading = false;
        this.$emit("abcd", {
          message: "Updated",
          status: true,
        });
      }
    },
    async onDelete() {
      this.isLoading = true;

      this.res = await this.deleteTodo(this.todo.id);
      this.$emit("abcd", {
        message: "deleted",
        status: true,
      });
      if (this.res.status === 200) {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.headline {
  text-decoration: line-through;
}
</style>
