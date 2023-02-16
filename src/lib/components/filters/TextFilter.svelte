<script lang="ts">
  import type {ColumnSettings} from '../../utils/settings';

  export let settings: ColumnSettings;
  export let value: any;
</script>

<input bind:value={value} type="text" placeholder="{settings.filter.placeholder}">

<style lang="scss">
  input {
    display: block;
    padding: 10px 5px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 0.8em;
  }
</style>