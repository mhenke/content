---
title: Reactivity, Lifecycle, and Accessibility in Svelte
slug: Learn_web_development/Core/Frameworks_libraries/Svelte_reactivity_lifecycle_accessibility
page-type: learn-module-chapter
---

{{LearnSidebar}}
{{PreviousMenuNext("Learn_web_development/Core/Frameworks_libraries/Svelte_components","Learn_web_development/Core/Frameworks_libraries/Svelte_stores", "Learn_web_development/Core/Frameworks_libraries")}}

## Reactivity in Svelte 5

Svelte 5 introduces runes as the primary way to handle reactivity:

```svelte
<script>
  import { $state, $derived, $effect } from 'svelte';
  
  // Reactive state
  let count = $state(0);
  
  // Computed values
  $derived doubled = count * 2;
  
  // Side effects
  $effect(() => {
    console.log(`Count is now ${count}`);
  });
</script>
```

### Reactive Patterns

1. **State Management**:
```svelte
<script>
  import { $state } from 'svelte';
  
  let todos = $state([]);
  
  function addTodo(text) {
    todos = [...todos, { text, completed: false }];
  }
</script>
```

2. **Computed Values**:
```svelte
<script>
  import { $state, $derived } from 'svelte';
  
  let items = $state([1, 2, 3, 4]);
  $derived sum = items.reduce((a, b) => a + b, 0);
  $derived average = sum / items.length;
</script>
```

## Lifecycle in Svelte 5

Svelte 5 provides several ways to handle component lifecycle:

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import { $effect } from 'svelte';
  
  // Setup on mount
  onMount(() => {
    console.log('Component mounted');
  });
  
  // Cleanup on destroy
  onDestroy(() => {
    console.log('Component will be destroyed');
  });
  
  // Effect with cleanup
  $effect(() => {
    const interval = setInterval(() => {
      console.log('Tick');
    }, 1000);
    
    return () => clearInterval(interval);
  });
</script>
```

## Accessibility Features

### 1. ARIA Attributes

```svelte
<script>
  import { $state } from 'svelte';
  
  let expanded = $state(false);
  let selected = $state(null);
</script>

<button
  aria-expanded={expanded}
  aria-controls="content"
  on:click={() => expanded = !expanded}
>
  Toggle Content
</button>

<div 
  id="content"
  role="region"
  aria-hidden={!expanded}
>
  Content here
</div>
```

### 2. Focus Management

```svelte
<script>
  import { $state } from 'svelte';
  
  let inputRef;
  let showInput = $state(false);
  
  $effect(() => {
    if (showInput) {
      inputRef?.focus();
    }
  });
</script>

<input
  bind:this={inputRef}
  aria-label="Search"
  class:hidden={!showInput}
/>
```

### 3. Keyboard Navigation

```svelte
<script>
  import { $state } from 'svelte';
  
  let items = $state(['Item 1', 'Item 2', 'Item 3']);
  let selectedIndex = $state(0);
  
  function handleKeydown(event) {
    switch (event.key) {
      case 'ArrowDown':
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        break;
      case 'ArrowUp':
        selectedIndex = Math.max(selectedIndex - 1, 0);
        break;
    }
  }
</script>

<div role="listbox" on:keydown={handleKeydown}>
  {#each items as item, i}
    <div
      role="option"
      aria-selected={i === selectedIndex}
      tabindex={i === selectedIndex ? 0 : -1}
    >
      {item}
    </div>
  {/each}
</div>
```

### 4. Screen Reader Announcements

```svelte
<script>
  import { $state } from 'svelte';
  
  let message = $state('');
  
  function announce(text) {
    message = text;
  }
</script>

<div aria-live="polite" class="sr-only">
  {message}
</div>

<button 
  on:click={() => announce('Action completed successfully')}
  aria-label="Save changes"
>
  Save
</button>
```

## Best Practices

1. **Semantic HTML**:
   - Use appropriate HTML elements
   - Maintain logical document structure
   - Provide descriptive headings

2. **ARIA Usage**:
   - Use ARIA labels when needed
   - Maintain ARIA relationships
   - Test with screen readers

3. **Keyboard Navigation**:
   - Ensure all interactive elements are focusable
   - Implement logical tab order
   - Support keyboard shortcuts

4. **Visual Considerations**:
   - Maintain sufficient color contrast
   - Make focus indicators visible
   - Support text resizing

5. **Dynamic Content**:
   - Announce important changes
   - Manage focus when content updates
   - Provide loading states

## Testing Accessibility

```js
// Example using Jest and Testing Library
import { render, screen } from '@testing-library/svelte';
import MyComponent from './MyComponent.svelte';

test('component meets accessibility standards', async () => {
  const { container } = render(MyComponent);
  
  // Check for ARIA attributes
  expect(screen.getByRole('button')).toHaveAttribute('aria-label');
  
  // Check focus management
  await userEvent.tab();
  expect(screen.getByRole('button')).toHaveFocus();
});
```

{{PreviousMenuNext("Learn_web_development/Core/Frameworks_libraries/Svelte_components","Learn_web_development/Core/Frameworks_libraries/Svelte_stores", "Learn_web_development/Core/Frameworks_libraries")}}
