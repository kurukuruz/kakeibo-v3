<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';

const auth = getAuth();

const isSigned = ref(false);
auth.onAuthStateChanged((user) => {
  if (user) {
    isSigned.value = true;
  }
});

const authElm = ref<HTMLElement>();
onMounted(() => {
  if (authElm.value) {
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start(authElm.value, {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
      ],
    });
  }
});

</script>

<template>
  <h1 v-if="isSigned">
    You are already signed in.
  </h1>
  <div
    v-else
    ref="authElm"
  />
</template>

<style scoped>
@import url('https://www.gstatic.com/firebasejs/ui/4.3.0/firebase-ui-auth.css');
</style>
