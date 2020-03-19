<template lang="pug">
v-chip.ma-1.pl-0.pr-1(:color="item.color" outlined small)
  v-icon.mr-1(size="20") {{ item.icon }}
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
