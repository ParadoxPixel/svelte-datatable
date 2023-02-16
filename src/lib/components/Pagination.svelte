<script lang="ts">
  export let page = 1;
  export let pages: number;
</script>

<ul class="pagination">
    <li class:disabled={page <= 1}>
        <a aria-label="Previous" on:click={() => page = Math.max(page - 1, 1)}><span aria-hidden="true">«</span></a>
    </li>
    {#each Array(pages) as _, i}
        <li class:active={page - 1 === i}>
            <a on:click={() => page = i + 1}><span>{i + 1}</span></a>
        </li>
    {/each}
    <li class:disabled={page >= pages}>
        <a aria-label="Next" on:click={() => page = Math.min(page + 1, pages)}><span aria-hidden="true">»</span></a>
    </li>
</ul>

<style lang="scss">
  .pagination {
    display: inline-block;
    font-family: sans-serif;
    padding: 0;

    li {
      display: inline;

      & > a {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        text-decoration: none;
        cursor: pointer;
        background-color: #fafafa;
        border: 1px solid #ddd;
      }

      &.active > a {
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7;
      }

      &.disabled > a {
        color: #777;
        cursor: not-allowed;
        background-color: #fff;
        border-color: #ddd;
      }

      &:first-child > a {
        margin-left: 0;
        border-radius: 4px 0 0 4px;
      }

      &:last-child > a {
        margin-right: 0;
        border-radius: 0 4px 4px 0;
      }
    }
  }
</style>