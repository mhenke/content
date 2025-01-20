---
title: Using TypeScript with Svelte
slug: Learn_web_development/Core/Frameworks_libraries/Svelte_TypeScript
page-type: learn-module-chapter
---

{{LearnSidebar}}
{{PreviousMenuNext("Learn_web_development/Core/Frameworks_libraries/Svelte_stores","Learn_web_development/Core/Frameworks_libraries/Svelte_deployment_next", "Learn_web_development/Core/Frameworks_libraries")}}

In this article, we'll explore how to use TypeScript with Svelte 5.19.0, taking advantage of its improved type system and runes support.

## Setting Up TypeScript

1. Create a new Svelte project with TypeScript:

```bash
npm create vite@latest my-app -- --template svelte-ts
cd my-app
npm install
```

2. Or add TypeScript to an existing project:

```bash
npm install --save-dev typescript @tsconfig/svelte
npx svelte-add@latest typescript
```

## Using TypeScript with Runes

Svelte 5's runes have built-in TypeScript support:

```typescript
<script lang="ts">
  import { $state, $derived, $props } from 'svelte';
  
  // State with type inference
  let count = $state(0);  // inferred as number
  let name = $state<string>('');  // explicit type
  
  // Props with types
  interface Props {
    title: string;
    count?: number;
  }
  
  let { title, count = 0 } = $props<Props>();
  
  // Derived values
  $derived doubled = count * 2;
  
  // Type-safe event handling
  function handleClick(event: MouseEvent) {
    count++;
  }
</script>
```

## Type-Safe Stores

```typescript
import { writable, type Writable } from 'svelte/store';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todos: Writable<Todo[]> = writable([]);

// Custom store with types
function createTodoStore() {
  const { subscribe, set, update } = writable<Todo[]>([]);
  
  return {
    subscribe,
    addTodo: (text: string) => update(todos => [
      ...todos,
      { id: Date.now(), text, completed: false }
    ]),
    toggleTodo: (id: number) => update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  };
}
```

## Component Props with TypeScript

```typescript
<script lang="ts">
  import { $props } from 'svelte';
  
  interface TodoProps {
    id: number;
    text: string;
    completed: boolean;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }
  
  let { id, text, completed, onToggle, onDelete } = $props<TodoProps>();
</script>

<div>
  <input
    type="checkbox"
    checked={completed}
    on:change={() => onToggle(id)}
  />
  <span>{text}</span>
  <button on:click={() => onDelete(id)}>Delete</button>
</div>
```

## Event Handling with TypeScript

```typescript
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  interface TodoEvent {
    id: number;
    completed: boolean;
  }
  
  const dispatch = createEventDispatcher<{
    toggle: TodoEvent;
    delete: { id: number };
  }>();
  
  function handleToggle(id: number, completed: boolean) {
    dispatch('toggle', { id, completed });
  }
</script>
```

## Best Practices

1. **Type Safety**:
   - Always use `lang="ts"` in script tags
   - Define interfaces for props and events
   - Use type inference where possible
   - Add explicit types for clarity when needed

2. **Runes and TypeScript**:
   - Use type parameters with runes when needed
   - Let TypeScript infer types when obvious
   - Define prop interfaces explicitly

3. **Component Organization**:
   - Keep types close to where they're used
   - Export reusable types from separate files
   - Use TypeScript's utility types when appropriate

4. **Error Handling**:
   - Use TypeScript to catch type errors early
   - Add runtime validation for external data
   - Handle edge cases explicitly

## Summary

Svelte 5.19.0 brings significant improvements to TypeScript support, especially with the new runes system. The combination provides excellent type safety while maintaining Svelte's clean and intuitive syntax.

{{PreviousMenuNext("Learn_web_development/Core/Frameworks_libraries/Svelte_stores","Learn_web_development/Core/Frameworks_libraries/Svelte_deployment_next", "Learn_web_development/Core/Frameworks_libraries")}}
