<script lang="ts">
  import DataTable from '$lib/DataTable.svelte';
  import {writableMap} from '../lib/utils/writable';
  import SelectFilter from '../lib/components/filters/SelectFilter.svelte';
  import {SelectPredicate} from '../lib/utils/filter';
  import StatusColumn from './StatusColumn.svelte';

  const users = writableMap(new Map<string, any>());

  let count = 0;
  let i = setInterval(() => {
    if (count >= 50) {
      clearInterval(i);
      return;
    }

    users.put((count++).toString(10), {
      id: count,
      role: ['Ancient', 'Builder', 'Test'][Math.floor(Math.random() * 3)],
      author: {
        name: 'John Doe ' + (Math.floor(Math.random() * 10)),
      },
      tag: [
        {
          name: 'Closed',
          bg_color: '#e53d3d',
          txt_color: 'white',
        },
        {
          name: 'Open',
          bg_color: '#78e839',
          txt_color: 'white',
        },
      ][Math.floor(Math.random() * 2)],
    });
  }, 1);

  let columns: any[] = [
    {
      label: '#',
      attribute: 'id',
    },
    {
      attribute: 'author.name',
      filter: true,
      sortable: true,
    },
    {
      attribute: 'role',
      filter: {
        component: SelectFilter,
        predicate: SelectPredicate,
        options: ['Ancient', 'Builder', 'Test'],
        multiple: true,
      },
    },
  ];

  setTimeout(() => {
    columns = [
      ...columns, {
        component: StatusColumn,
        label: 'Status',
        attribute: 'tag',
        sortable: 'name',
      }];
  }, 5 * 1000);
</script>

<DataTable dataProvider={users} columns={columns}/>