<template>
  <v-row justify="center" align="center">
    <v-col cols="6">
      <v-text-field label="Add todos" v-model="title"></v-text-field>
    </v-col>
    <v-col cols="auto">
      <v-btn @click="onClick()" :loading="isLoading">
        Add
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
    };
  },
  computed: mapGetters(["isLoading"]),
  methods: {
    ...mapActions(["addTodo"]),
    async onClick() {
      const addResponse = await this.addTodo(this.title);
      this.title = "";
      if (addResponse.status === 201) {
        console.log(addResponse);
        this.$emit("added", {
          message: "Added",
          status: true,
        });
      }
    },
  },
};
</script>

<style lang="sass" scoped></style>
