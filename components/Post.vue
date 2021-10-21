<template>
  <b-card :title="title">
    {{ body }}

    <template #footer>
      <div class="d-flex">
        <small><b-icon-person-circle class="icon" /> {{ author }}</small>
        <b-icon-chat-dots-fill class="ml-auto" />
      </div>
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

  .icon {
    transform: translateY(-1px);
  }
}
</style>