<template>
  <div>
    <app-nav />
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppNav from '@/components/Nav';

export default {
  components: {
    AppNav,
  },
};
</script>