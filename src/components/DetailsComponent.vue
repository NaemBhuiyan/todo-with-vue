<template>
  <div class="about mb-6">
    <v-toolbar :color="color" :dark="true">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-bottom-navigation
        v-model="value"
        :background-color="color"
        dark
        shift
        grow
        max-width="87%"
        class="elevation-0"
      >
        <v-btn to="/">
          <span>Home</span>

          <v-icon>mdi-television-play</v-icon>
        </v-btn>

        <v-btn to="/about">
          <span>About</span>

          <v-icon>mdi-music-note</v-icon>
        </v-btn>

        <v-btn to="/details">
          <span>Details</span>

          <v-icon>mdi-book</v-icon>
        </v-btn>

        <v-btn to="/country">
          <span>Image</span>

          <v-icon>mdi-image</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "DetailsComponent",
  data: () => ({ value: 0 }),

  computed: {
    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    },
  },
};
</script>
