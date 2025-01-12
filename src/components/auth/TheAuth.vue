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
      signInFlow: 'popup',
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
      ],
    });
  }
});

</script>

<template>
  <p v-if="isSigned" class="text-2xl">
    You are already signed in.
  </p>
  <div
    v-else
    ref="authElm"
  />
</template>

<style scoped>
@import url('https://www.gstatic.com/firebasejs/ui/4.3.0/firebase-ui-auth.css');
</style>
