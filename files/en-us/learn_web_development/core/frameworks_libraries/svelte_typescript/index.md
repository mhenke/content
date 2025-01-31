---
title: Using TypeScript with Svelte
slug: Learn_web_development/Core/Frameworks_libraries/Svelte_TypeScript
page-type: learn-module-chapter
---

{{LearnSidebar}}
{{PreviousMenuNext("Learn_web_development/Core/Frameworks_libraries/Svelte_stores","Learn_web_development/Core/Frameworks_libraries/Svelte_deployment_next", "Learn_web_development/Core/Frameworks_libraries")}}

In this article, we'll explore how to use TypeScript with SvelteKit and Svelte 5.0, taking advantage of their improved type system and runes support.

## Setting Up TypeScript

1. Create a new SvelteKit project with TypeScript:

```bash
npx sv create my-app
cd my-app
npm install
npm run dev
```

During project creation:
- Choose "Yes" for TypeScript support
- Select "Yes" for type checking in your editor
- Choose "Yes" for ESLint and Prettier

The created project includes:
- `tsconfig.json` with SvelteKit-optimized settings
- `.svelte-kit/tsconfig.json` for additional app-specific types
- Type definitions for your routes and server code

2. Or add TypeScript to an existing SvelteKit project:

```bash
npm install --save-dev typescript @tsconfig/svelte svelte-check @sveltejs/kit
```

And create a `tsconfig.json`:

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true
  }
}
```

## Using TypeScript with SvelteKit and Runes

SvelteKit with Svelte 5's runes provide enhanced TypeScript integration for both client and server code:

```typescript
<script lang="ts">
  import { type Signal } from 'svelte';
  
  // State with type inference
  let count = $state(0);  // inferred as number
  let name = $state<string>('');  // explicit type
  
  // Props with types
  interface Props {
    title: string; 
    count?: Signal<number>;
  }
  
  const { title, count = $state(0) } = $props<Props>();
  
  // Derived state
  const doubled = $derived(count * 2);
  
  // Type-safe event handling
  function handleClick(event: MouseEvent) {
    count++;
  }
</script>
```

## Type-Safe Server and Client State Management

```typescript
// src/lib/types.ts
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// src/lib/server/db.ts
import type { Todo } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function getTodos(): Promise<Todo[]> {
  // Type-safe database access
  try {
    return await db.todos.findMany();
  } catch (e) {
    throw error(500, 'Failed to fetch todos');
  }
}

// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import { getTodos } from '$lib/server/db';

export const load: PageServerLoad = async () => {
  return {
    todos: await getTodos()
  };
};

// src/routes/+page.svelte
<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  const todos = $state(data.todos);
  
  function toggleTodo(id: number) {
    todos = todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    );
  }
</script>
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

2. **SvelteKit Types**:
   - Use generated `$types` for routes and forms
   - Type server load functions with `PageServerLoad`
   - Type client load with `PageLoad`
   - Leverage `RequestEvent` types for API routes

3. **Runes and TypeScript**:
   - Use Signal types for reactive state
   - Let TypeScript infer types when obvious
   - Define prop interfaces explicitly
   - Use $derived for computed values

4. **Component Organization**:
   - Keep types in `$lib/types`
   - Use barrel exports for shared types
   - Leverage SvelteKit's auto-imports
   - Follow the `$lib` directory structure

5. **Error Handling**:
   - Use typed error responses
   - Add runtime validation with Zod/Valibot
   - Handle edge cases explicitly
   - Type guard server/client boundaries

## Summary

SvelteKit with Svelte 5.0 provides comprehensive TypeScript support across your entire application. The combination of SvelteKit's built-in types and Svelte's runes system enables excellent type safety for both server and client code while maintaining a clean and intuitive development experience.

{{PreviousMenuNext("Learn_web_development/Core/Frameworks_libraries/Svelte_stores","Learn_web_development/Core/Frameworks_libraries/Svelte_deployment_next", "Learn_web_development/Core/Frameworks_libraries")}}
