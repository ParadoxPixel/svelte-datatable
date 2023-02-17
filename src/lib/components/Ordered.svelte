<script lang="ts">
  export let value = 0;

  function toggle() {
    if (value == -1) value = 0;
    else if (value == 0) value = 1;
    else value = -1;
  }
</script>

<span class="sortable" on:click={toggle} class:asc={value === 1} class:desc={value === -1}>
    <slot/>
    <span/>
</span>

<style lang="scss">
  .sortable {
    cursor: pointer;

    span {
      padding-right: 10px;
      position: relative;

      &:before, &:after {
        border: 4px solid transparent;
        content: '';
        display: block;
        height: 0;
        right: 0;
        top: 50%;
        position: absolute;
        width: 0;
      }

      &:before {
        border-bottom-color: #fff;
        margin-top: -9px;
      }

      &:after {
        border-top-color: #fff;
        margin-top: 1px;
      }
    }

    &.asc span:before {
      border-bottom-color: #bababa;
    }

    &.desc span:after {
      border-top-color: #bababa;
    }
  }
</style>