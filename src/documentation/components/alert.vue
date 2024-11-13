<template lang="pug">
w-alert(:class="`w-alert--${type}`" :icon-outside="!!icon")
  w-icon(v-if="icon") {{ icon }}
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
  if (props.noIcon) return null

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
  color: var(--w-base-color);

  --info-color: #65a9d6;
  --success-color: #6c0;
  --error-color: #f00;
  --tip-color: #ffe74d;
  --warning-color: #fa0;

  &--icon-outside {padding-left: 24px;}

  &--default {
    background-color: color-mix(in srgb, var(--w-primary-color) 6%, transparent);
    filter: contrast(1.5);
    color: var(--w-primary-color);
  }

  &--info {
    background-color: color-mix(in srgb, var(--info-color) 8%, transparent);
    border-color: color-mix(in srgb, var(--info-color) 40%, transparent);
  }

  &--success {
    background-color: color-mix(in srgb, var(--success-color) 10%, transparent);
    border-color: color-mix(in srgb, var(--success-color) 40%, transparent);
  }

  &--tip {
    background-color: color-mix(in srgb, var(--tip-color) 15%, transparent);
    border-color: color-mix(in srgb, var(--tip-color) 40%, transparent);
  }

  &--warning {
    background-color: color-mix(in srgb, var(--warning-color) 10%, transparent);
    border-color: color-mix(in srgb, var(--warning-color) 40%, transparent);
  }

  &--error {
    background-color: color-mix(in srgb, var(--error-color) 8%, transparent);
    border-color: color-mix(in srgb, var(--error-color) 40%, transparent);
  }

  &:before, &:after {display: none;}

  > .w-icon {
    position: absolute;
    left: -12px;
    color: var(--w-contrast-color);
    width: 18px;
    height: 18px;
    font-size: 13px;
    top: 0.6em;
  }

  &--info > .w-icon {background: color-mix(in srgb, var(--info-color) 70%, var(--w-base-bg-color));font-size: 22px;}
  &--success > .w-icon {background-color: color-mix(in srgb, var(--success-color) 70%, var(--w-base-bg-color));}
  &--error > .w-icon {background-color: color-mix(in srgb, var(--error-color) 70%, var(--w-base-bg-color));}
  &--tip > .w-icon {background-color: color-mix(in srgb, var(--tip-color) 80%, var(--w-base-bg-color));}
  &--warning > .w-icon {background-color: color-mix(in srgb, var(--warning-color) 70%, var(--w-base-bg-color));}
}
</style>
