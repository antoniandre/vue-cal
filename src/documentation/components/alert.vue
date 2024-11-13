<template lang="pug">
w-alert(:class="`w-alert--${type}`" icon-outside)
  w-icon(v-if="icon && !noIcon") {{ icon }}
  slot
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  noIcon: { type: Boolean, default: false },
  success: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  warning: { type: Boolean, default: false },
  tip: { type: Boolean, default: false },
  info: { type: Boolean, default: false }
})

const type = computed(() => {
  if (props.success) return 'success'
  else if (props.error) return 'error'
  else if (props.warning) return 'warning'
  else if (props.tip) return 'tip'
  else if (props.info) return 'info'
  return 'default'
})

const icon = computed(() => {
  switch (type.value) {
    case 'success': return 'wi-check'
    case 'error': return 'wi-cross'
    case 'warning': return 'mdi mdi-exclamation-thick'
    case 'tip': return 'mdi mdi-lightbulb-on'
    case 'info': return 'mdi mdi-information-symbol'
    default: return null
  }
})
</script>

<style lang="scss" scoped>
.w-alert {
  position: relative;
  margin: 8px 0;
  border-left: 4px solid color-mix(in srgb, currentColor 40%, transparent);
  padding-left: 16px;

  --info-color: #65a9d6;
  --success-color: #6c0;
  --error-color: #f00;
  --tip-color: #ffe74d;
  --warning-color: #fa0;

  &--icon-outside {padding-left: 24px;}

  &--default {
    background-color: color-mix(in srgb, var(--w-primary-color) 6%, transparent);
    filter: contrast(1.5);
  }

  &--info {
    background-color: color-mix(in srgb, var(--info-color) 08%, transparent);
    border-color: var(--info-color);
  }

  &--success {
    background-color: color-mix(in srgb, var(--success-color) 1%, transparent);
    border-color: var(--success-color);
  }

  &--tip {
    background-color: color-mix(in srgb, var(--tip-color) 15%, transparent);
    border-color: var(--tip-color);
  }

  &--warning {
    background-color: color-mix(in srgb, var(--warning-color) 10%, transparent);
    border-color: var(--warning-color);
  }

  &--error {
    background-color: color-mix(in srgb, var(--error-color) 8%, transparent);
    border-color: var(--error-color);
  }

  &:before, &:after {display: none;}

  > .w-icon {
    position: absolute;
    left: -12px;
    color: var(--w-contrast-color);
    width: 20px;
    height: 20px;
    top: 0.5em;
  }

  &--info > .w-icon {background: var(--info-color);font-size: 25px;}
  &--success > .w-icon {background-color: var(--success-color);}
  &--error > .w-icon {background-color: var(--error-color);}
  &--tip > .w-icon {background-color: var(--tip-color);}
  &--warning > .w-icon {background-color: var(--warning-color);font-size: 15px;}
}
</style>
