<script lang="ts">
  export let value: any;
</script>

<span class="tag" style="background-color: {value.bg_color}; color: {value.txt_color}">{value.name}</span>

<style lang="scss">
    .tag {
      padding: 5px 10px;
      border-radius: 4px;
      text-transform: uppercase;
    }
</style>