<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn elevation="2" v-on:click="a++">click me</v-btn>
    <h1>{{ a }}</h1>
    <h1>{{ add }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 0,
      age: 10
    };
  },

  computed: {
    add() {
      return this.a + this.age;
    }
  }
};
</script>
