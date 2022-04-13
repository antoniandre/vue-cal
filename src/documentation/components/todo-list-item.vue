<template lang="pug">
w-tag.ma1.pl1.todo-item(:color="item.color" outline)
  w-icon(size="18") material-icons {{ item.icon }}
  slot
</template>

<script>
const statuses = {
  todo: { color: 'deep-orange', icon: 'access_time' },
  doing: { color: 'amber darken-1', icon: 'timer' },
  done: { color: 'green', icon: 'check' }
}

export default {
  props: {
    status: { type: String, default: 'done' }
  },
  computed: {
    item () {
      return statuses[this.status]
    }
  }
}
</script>

<style lang="scss">
.todo-item {
  font-size: 12px;
  height: 22px;

  .w-icon {margin-right: 2px;}
}
</style>
