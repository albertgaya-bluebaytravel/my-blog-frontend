<template>
  <b-card no-body>
    <b-card-body>
      <b-card-title class="title" @click="onClickTitle">
        {{ c_title }}
      </b-card-title>
      <b-card-text>
        {{ c_body }}
      </b-card-text>
      <small class="text-secondary font-italic">
        {{ c_createdAt }}
      </small>
    </b-card-body>

    <template #footer>
      <div class="d-flex">
        <small>
          <b-icon-person-circle class="author-icon" /> {{ post.user.name }}
        </small>

        <div class="ml-auto">
          <b-icon-pencil-square
            v-show="showEdit"
            @click="onClickEdit"
            class="action-icon"
          />

          <b-icon-chat-dots-fill v-if="c_showCommentIcon" />
        </div>
      </div>
    </template>
  </b-card>
</template>

<script>
export default {
  emits: ['onClickTitle', 'onClickEdit'],

  props: {
    post: {
      required: true,
      type: Object,
    },

    showEdit: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    c_title() {
      return this.shortText(this.post.title, 30);
      ``;
    },

    c_body() {
      return this.shortText(this.post.body, 90);
    },

    c_createdAt() {
      return this.gmDatetimeHumanreadable(this.post.created_at);
    },

    c_showCommentIcon() {
      return this.post.comments.length > 0;
    },
  },

  methods: {
    shortText(text, maxLength) {
      if (text.length < maxLength) {
        return text;
      }

      let trimText = text.substr(0, maxLength);
      return trimText.substr(0, trimText.lastIndexOf(' ')) + '...';
    },

    onClickTitle() {
      this.$emit('onClickTitle', this.post.id);
    },

    onClickEdit() {
      this.$emit('onClickEdit', this.post.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  cursor: pointer;
}

small {
  font-size: 0.8rem;

  .author-icon {
    transform: translateY(-1px);
  }
}

.action-icon {
  cursor: pointer;

  &:not(:first-child) {
    margin-left: 5px;
  }
}
</style>