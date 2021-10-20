<template>
  <b-card :title="title">
    {{ body }}
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
  },
}
</script>