<template>
  <div class="home">
    <h1 class="mb-3">Search Your Country From {{ dataLength }} Countries</h1>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <form @submit.prevent="submit(name)">
          <v-text-field label="Type country name" v-model="name" />
        </form>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="submit(name)">
          search
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="countries.length">
      <v-card
        class="mx-auto mb-5"
        max-width="400"
        v-for="country in countries"
        v-bind:key="country.name"
      >
        <v-img class="white--text align-end" height="200px" :src="country.flag">
        </v-img>
        <v-card-title class="light-blue">
          Name: {{ country.name }}</v-card-title
        >
        <v-card-text class="text--primary text-left light-blue">
          <p class="font-weight-black">Capital: {{ country.capital }}</p>
          <p class="font-weight-black">
            Population: {{ new Intl.NumberFormat().format(country.population) }}
          </p>
          <p class="font-weight-black">Region: {{ country.region }}</p>
          <p class="font-weight-black">
            Present Time:
            {{ calcTime(country.timezones[0].slice(3).replace(":", ".")) }}
          </p>
        </v-card-text>
      </v-card>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Country",
  data() {
    return {
      data: [],
      name: "",
      countries: [],
    };
  },
  created() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        this.data = res.data;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    submit(name) {
      this.countries = this.data.filter((country) =>
        country.name.toLowerCase().includes(name)
      );
      this.name = "";
    },
    calcTime(offset) {
      console.log(offset);
      // create Date object for current location
      var d = new Date();

      // convert to msec
      // subtract local time zone offset
      // get UTC time in msec
      var utc = d.getTime() + d.getTimezoneOffset() * 60000;

      // create new Date object for different city
      // using supplied offset
      var nd = new Date(utc + 3600000 * offset);

      // return time as a string
      return nd.toLocaleString();
    },
  },
  computed: {
    dataLength() {
      return this.data.length;
    },
  },
};
</script>
