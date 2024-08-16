<template lang="pug">
w-tag.ma1.pl1.todo-item(:color="item.color" outline round)
  w-icon(size="16") {{ item.icon }}
  slot
</template>

<script>
const statuses = {
  todo: { color: 'deep-orange', icon: 'mdi mdi-clock-outline' },
  doing: { color: 'amber darken-1', icon: 'mdi mdi-clock-outline' },
  done: { color: 'green', icon: 'wi-check' }
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
