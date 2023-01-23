<script setup>
import { defineProps, onMounted, ref, toRefs } from 'vue';
import axios from 'axios';

const props = defineProps({
  myCase: {
    type: Object,
    required: true,
  }
});

const { myCase } = toRefs(props);
console.log(myCase.value.thumbnail_location)
const name = myCase.value.thumbnail_location;
const GET_THUMBNAIL_URL = `https://csats.ismorebetter.com/.netlify/functions/get-thumbnail-url?name=${name}`;
const thumbnailUrl = ref(null);
const loading = ref(true);
onMounted(() => {
  axios.get(GET_THUMBNAIL_URL)
    .then((response) => {
      console.log(response);
      thumbnailUrl.value = response.data;
      loading.value = false;
    })
    .catch((error) => {
      console.log(error);
      loading.value = false;
    });
});
</script>

<template>
  <div class="col">
    <div class="card shadow-sm">
      <!-- <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> -->
      <div class="card-body">
        <img :src="thumbnailUrl" />
        <div><strong>Primary:&nbsp;</strong>{{ myCase.primary_surgeon }}</div>
        <div><strong>Secondary:&nbsp;</strong>{{  myCase.secondary_surgeon }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 300px;
  height: 200px;
}
</style>