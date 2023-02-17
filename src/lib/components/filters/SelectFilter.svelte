<script lang="ts">
  import Select from 'svelte-select';

  export let settings: any;
  export let value: any;

  $: options = (settings.filter.options ?? []).map(item => {
    if (item.value && item.label)
      return item;

    return {value: item, label: item.toString()};
  });

  $: selectSettings = {
    items: options,
    searchable: true,
    showShevron: true,
    clearable: true,
    multiple: settings.filter.multiple === true,
  };
</script>

<Select bind:justValue={value} {...selectSettings} class="selectFilter"/>

<style lang="scss">
  :global(.selectFilter) {
    --height: 37px;
    --font-size: 12px;
    --multi-select-input-margin: 0;
    --internal-padding: 0 5px 0;
  }
</style>