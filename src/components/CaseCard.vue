<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

defineProps({
  myCase: {
    type: Object,
    required: true,
  }
});

const thumbnail_image = ref(null);

const GET_THUMBNAIL_URL = 'https://google.com/';

// const GET_THUMBNAIL_URL = `
// https://aurora.ismorebetter.com/.netlify/function/get-thumbnail?name=${myCase.thumbnail_location}
// `

onMounted(() => {
  axios.get(GET_THUMBNAIL_URL)
    .then((response) => {
      thumbnail_image.value = response.data;
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
});
</script>

<template>
  <div class="col">
    <div class="card shadow-sm">
      <!-- <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> -->
      <img src="{{ myCase.thumbnail_location }}" />
      <div class="card-body">
        <p class="card-text">This is.</p>
        <div><strong>Primary:&nbsp;</strong>{{ myCase.primary_surgeon }}</div>
        <div><strong>Secondary:&nbsp;</strong>{{  myCase.secondary_surgeon }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>