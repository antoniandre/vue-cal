<template lang="pug">
v-chip.ma-1.pl-1.todo-item(:color="item.color" outlined small)
  v-icon(size="18") {{ item.icon }}
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

  .v-icon {margin-right: 2px;}
}
</style>
