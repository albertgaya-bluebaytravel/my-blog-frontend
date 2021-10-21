<template>
  <b-card :title="title">
    {{ body }}

    <template #footer>
      <small>Posted by: {{ author }}</small>
    </template>
  </b-card>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
    body: {
      required: true,
      type: String,
    },
    author: {
      required: true,
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
small {
  font-size: 0.8rem;
}
</style>