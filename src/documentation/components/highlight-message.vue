<template lang="pug">
component(:class="`highlight highlight--${type}`" :is="tag")
  w-icon(v-if="!noIcon") {{ icon }}
  slot
</template>

<script>
export default {
  props: {
    tag: { type: String, default: 'p' },
    type: { type: String, default: 'info' },
    noIcon: { type: Boolean, default: false }
  },
  computed: {
    icon () {
      switch (this.type) {
        case 'success': return 'check'
        case 'error': return 'close'
        case 'warning': return 'priority_high'
        case 'tips': return 'wb_incandescent'
        case 'info':
        default: return 'priority_high'
      }
    }
  }
}
</script>

<style lang="scss">
.highlight {
  position: relative;
  margin-top: 12px;
  margin-bottom: 12px;
  padding: 8px 16px 8px 24px;
  border-left: 3px solid;

  &--info {
    background-color: rgba(#09f, 0.08);
    border-color: #09f;
  }

  &--success {
    background-color: rgba(#6c0, 0.1);
    border-color: #6c0;
  }

  &--tips {
    background-color: rgba(#ff0, 0.15);
    border-color: #fd0;
  }

  &--warning {
    background-color: rgba(#fa0, 0.1);
    border-color: #fa0;
  }

  &--error {
    background-color: rgba(#f33, 0.08);
    border-color: #f33;
  }

  > .w-icon {
    position: absolute;
    left: -11px;
    color: #fff;
    border-radius: 1em;
    width: 20px;
    height: 20px;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    top: 0.5rem;
  }

  &--info > .w-icon {background: #09f;font-size: 25px;}
  &--success > .w-icon {background-color: #6c0;}
  &--error > .w-icon {background-color: #f33;}
  &--tips > .w-icon {background-color: #fd0;}
  &--warning > .w-icon {background-color: #fa0;font-size: 15px;}
}
</style>
