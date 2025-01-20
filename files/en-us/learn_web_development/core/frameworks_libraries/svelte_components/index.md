---
title: Componentizing our Svelte app
slug: Learn_web_development/Core/Frameworks_libraries/Svelte_components
page-type: learn-module-chapter
---

{{LearnSidebar}}
{{PreviousMenuNext("Learn_web_development/Core/Frameworks_libraries/Svelte_variables_props","Learn_web_development/Core/Frameworks_libraries/Svelte_reactivity_lifecycle_accessibility", "Learn_web_development/Core/Frameworks_libraries")}}

In this article, we'll look at how to break our todo app into manageable components and share information between them using Svelte 5's runes system. We'll componentize our app, then add more functionality to allow users to update existing components.

## Component Structure

In SvelteKit, components are typically organized in the `src/lib/components` directory. For our todo app, we'll create the following components:

```plain
src/lib/components/
├── Alert.svelte
├── NewTodo.svelte
├── FilterButton.svelte
├── TodosStatus.svelte
├── Todo.svelte
└── MoreActions.svelte
```

Each component will handle a specific part of our application:
- `Alert.svelte`: Notification messages
- `NewTodo.svelte`: Input for new todos
- `FilterButton.svelte`: Filter controls
- `TodosStatus.svelte`: Todo count display
- `Todo.svelte`: Individual todo item
- `MoreActions.svelte`: Bulk actions

## Creating Components with TypeScript and Runes

Let's create our first component, `FilterButton.svelte`:

```svelte
<script lang="ts">
  import { $state, $props } from 'svelte';
  import type { Filter } from '$lib/types';
  
  interface FilterButtonProps {
    current: Filter;
    filter: Filter;
    label: string;
  }
  
  let { current, filter, label } = $props<FilterButtonProps>();
</script>

<button 
  class="btn toggle-btn" 
  class:btn__primary={current === filter}
  aria-pressed={current === filter}
  on:click
>
  <span class="visually-hidden">Show</span>
  <span>{label}</span>
  <span class="visually-hidden">tasks</span>
</button>

<style>
  .toggle-btn {
    border: 1px solid #d3d3d3;
    padding: 0.5rem 1rem;
  }
  .btn__primary {
    border-color: #4d4d4d;
    text-decoration: underline;
  }
</style>
```

## Component Communication

Svelte 5 provides several ways for components to communicate:

### 1. Props using `$props`

```svelte
<script lang="ts">
  import { $props } from 'svelte';
  
  interface TodoProps {
    text: string;
    completed: boolean;
  }
  
  let { text, completed } = $props<TodoProps>();
</script>
```

### 2. Events using Event Dispatcher

```svelte
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{
    toggle: { id: number };
    remove: { id: number };
  }>();
  
  function handleToggle(id: number) {
    dispatch('toggle', { id });
  }
</script>
```

### 3. Stores for Global State

```svelte
<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Todo } from '$lib/types';
  
  const todos = writable<Todo[]>([]);
</script>
```

## Using Our Components

Here's how we use these components in our main page component (`src/routes/+page.svelte`):

```svelte
<script lang="ts">
  import { $state } from 'svelte';
  import type { Filter } from '$lib/types';
  import FilterButton from '$lib/components/FilterButton.svelte';
  import Todo from '$lib/components/Todo.svelte';
  import NewTodo from '$lib/components/NewTodo.svelte';
  
  let currentFilter = $state<Filter>('all');
</script>

<div class="todoapp">
  <NewTodo />
  
  <div class="filters btn-group">
    <FilterButton 
      current={currentFilter} 
      filter="all" 
      label="All" 
      on:click={() => currentFilter = 'all'}
    />
    <FilterButton 
      current={currentFilter} 
      filter="active" 
      label="Active"
      on:click={() => currentFilter = 'active'}
    />
    <FilterButton 
      current={currentFilter} 
      filter="completed" 
      label="Completed"
      on:click={() => currentFilter = 'completed'}
    />
  </div>
  
  {#each filteredTodos as todo (todo.id)}
    <Todo 
      {todo}
      on:toggle={handleToggle}
      on:remove={handleRemove}
    />
  {/each}
</div>
```

## Type Definitions

Create a `src/lib/types.ts` file for shared types:

```typescript
export type Filter = 'all' | 'active' | 'completed';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
```

## Best Practices

1. **Component Organization**:
   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Place shared types in a separate file
   - Use SvelteKit's `$lib` alias for imports

2. **State Management**:
   - Use `$state` for component-local state
   - Use stores for shared state
   - Define clear prop interfaces
   - Use event dispatching for child-to-parent communication

3. **Accessibility**:
   - Include ARIA attributes
   - Use semantic HTML
   - Maintain keyboard navigation
   - Test with screen readers

4. **Performance**:
   - Use keyed each blocks
   - Avoid unnecessary state updates
   - Leverage SvelteKit's code splitting
   - Keep component dependencies minimal

## Summary

In this article we've learned how to:
- Structure components in a SvelteKit project
- Use TypeScript with Svelte components
- Implement component communication using props and events
- Apply best practices for component organization
- Maintain accessibility in our components

{{PreviousMenuNext("Learn_web_development/Core/Frameworks_libraries/Svelte_variables_props","Learn_web_development/Core/Frameworks_libraries/Svelte_reactivity_lifecycle_accessibility", "Learn_web_development/Core/Frameworks_libraries")}}
