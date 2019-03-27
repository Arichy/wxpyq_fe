<template>
  <button
    class="x-button"
    :class="{'is-disabled':disabled}"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "xbutton",
  props: {
    type: String,
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.x-button {
    width: 100%;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #fff;
    background-color: #20af0e;
    border-color: #20af0e;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    border:none;
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 4px;
}

.is-disabled,
.is-disabled:focus,
.is-disabled:hover{
    color: #fff;
    background-color: #75b56c;
    border-collapse: #75b56c;
    cursor: not-allowed;
    pointer-events: none;
}
</style>
