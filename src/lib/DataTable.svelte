<script lang="ts">
  import {filter, getPage, initColumnSettings, sort} from './utils/datatable';
  import type {ArrayableWritable} from './utils/writable';
  import type {ColumnSettings} from './utils/settings';
  import {onDestroy} from 'svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import Order from '$lib/components/Ordered.svelte';

  export let dataProvider: ArrayableWritable<any, any>;
  export let columns: (string | ColumnSettings)[];
  export let classList: string[] = [];
  export let pageSize = 10;
  export let pagination: any = Pagination;

  // Columns
  $: initColumns = columns.map(c => initColumnSettings(c));

  // Data
  let data: any[];
  let f = dataProvider.subscribe(() => data = dataProvider.asArray());
  onDestroy(() => f());

  // Filters
  let filters: any[] = [];
  $: filteredData = filter(data, initColumns, filters);

  // Sorting
  let sorts: string[] = [];
  $: finalData = sort(filteredData, initColumns, sorts);

  let page = 1, pages;
  $: {
    pages = Math.max(1, Math.ceil(finalData.length / pageSize));
    page = Math.min(page, pages);
  }

  $: rows = getPage(finalData, page, pageSize);
</script>

<table class={[...classList, 'datatable'].join(' ')}>
    <tr>
        {#each initColumns as column,index}
            <th>
                {#if column.sortable}
                    <Order bind:value={sorts[index]}>
                        {column.label}
                    </Order>
                {:else}
                    {column.label}
                {/if}
            </th>
        {/each}
    </tr>
    <tr>
        {#each initColumns as column,index}
            <th>
                {#if column.filter}
                    <svelte:component this={column.filter.component} settings={column} bind:value={filters[index]}/>
                {/if}
            </th>
        {/each}
    </tr>
    {#if rows.length > 0}
        {#each rows as row}
            <tr>
                {#each initColumns as column,index}
                    <td>
                        <svelte:component this={column.component} value={row[index]} settings={column}/>
                    </td>
                {/each}
            </tr>
        {/each}
    {:else}
        <tr>
            <td colspan="{initColumns.length}">No rows</td>
        </tr>
    {/if}
</table>

<svelte:component this={pagination} bind:page={page} pages={pages} pageSize={pageSize}/>

<style lang="scss">
  :global(.datatable) * {
    box-sizing: border-box;
  }

  .datatable {
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    border-spacing: 0;

    td, th {
      padding: 8px;
      text-align: left;
    }

    tr {
      &:nth-child(odd) {
        background-color: #ebebeb;
      }

      &:nth-child(even) {
        background-color: #f7f7f7;
      }

      &:first-child th {
        padding: 12px 8px 12px 8px;
        text-align: left;
        background-color: #337ab7;
        color: white;

        &:first-child {
          border-top-left-radius: 5px;
        }

        &:last-child {
          border-top-right-radius: 5px;
        }
      }

      &:nth-child(2) th {
        background-color: #fff;
        font-weight: normal;
      }
    }
  }
</style>