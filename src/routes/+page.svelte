<script lang="ts">
  import DataTable from '$lib/DataTable.svelte';
  import {writableMap} from '../lib/utils/writable';
  import SelectFilter from '../lib/components/filters/SelectFilter.svelte';
  import {SelectPredicate} from '../lib/utils/filter';

  const users = writableMap(new Map<string, any>());

  let count = 0;
  let i = setInterval(() => {
    if (count > 50) {
      clearInterval(i);
      return;
    }

    users.put('' + count++, {
      id: count,
      role: ['Ancient', 'Builder', 'Test'][Math.floor(Math.random() * 3)],
      author: {
        name: 'John Doe ' + (Math.floor(Math.random() * 10)),
      },
    });
  }, 1000);

  const columns: any[] = [
    {
      label: '#',
      attribute: 'id',
      sortable: false,
    },
    {
      attribute: 'author.name',
      filter: true,
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
</script>

<DataTable dataProvider={users} columns={columns}/>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>