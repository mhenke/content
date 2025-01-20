---
title: Componentizing our Svelte app
slug: Learn_web_development/Core/Frameworks_libraries/Svelte_components
page-type: learn-module-chapter
---

{{LearnSidebar}}
{{PreviousMenuNext("Learn_web_development/Core/Frameworks_libraries/Svelte_variables_props","Learn_web_development/Core/Frameworks_libraries/Svelte_reactivity_lifecycle_accessibility", "Learn_web_development/Core/Frameworks_libraries")}}

In the last article we started developing our to-do list app. The central objective of this article is to look at how to break our app into manageable components and share information between them using Svelte 5's new features. We'll componentize our app, then add more functionality to allow users to update existing components.

<table>
  <tbody>
    <tr>
      <th scope="row">Prerequisites:</th>
      <td>
        <p>
          At minimum, it is recommended that you are familiar with the core
          <a href="/en-US/docs/Learn_web_development/Core/Structuring_content">HTML</a>,
          <a href="/en-US/docs/Learn_web_development/Core/Styling_basics">CSS</a>, and
          <a href="/en-US/docs/Learn_web_development/Core/Scripting">JavaScript</a> languages, and
          have knowledge of the
          <a
            href="/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line"
            >terminal/command line</a
          >.
        </p>
        <p>
          You'll need a terminal with node and npm installed to compile and build
          your app.
        </p>
      </td>
    </tr>
    <tr>
      <th scope="row">Objective:</th>
      <td>
        To learn how to break our app into components and share information
        among them.
      </td>
    </tr>
  </tbody>
</table>

## Code along with us

### Git

Clone the GitHub repo (if you haven't already done it) with:

```bash
git clone https://github.com/opensas/mdn-svelte-tutorial.git
```

Then to get to the current app state, run

```bash
cd mdn-svelte-tutorial/04-componentizing-our-app
```

Or directly download the folder's content:

```bash
npx degit opensas/mdn-svelte-tutorial/04-componentizing-our-app
```

Remember to run `npm install && npm run dev` to start your app in development mode.

### REPL

To code along with us using the REPL, start at

<https://svelte.dev/repl/99b9eb228b404a2f8c8959b22c0a40d3?version=3.23.2>

## Breaking the app into components

In Svelte, an application is composed from one or more components. A component is a reusable, self-contained block of code that encapsulates HTML, CSS, and JavaScript that belong together, written into a `.svelte` file. Components can be big or small, but they are usually clearly defined: the most effective components serve a single, obvious purpose.

The benefits of defining components are comparable to the more general best practice of organizing your code into manageable pieces. It will help you understand how they relate to each other, it will promote reuse, and it will make your code easier to reason about, maintain, and extend.

But how do you know what should be split into its own component?

There are no hard rules for this. Some people prefer an intuitive approach and start looking at the markup and drawing boxes around every component and subcomponent that seems to have its own logic.

Other people apply the same techniques used for deciding if you should create a new function or object. One such technique is the single responsibility principle — that is, a component should ideally only do one thing. If it ends up growing, it should be split into smaller subcomponents.

Both approaches should complement each other, and help you decide how to better organize your components.

Eventually, we will split up our app into the following components:

- `Alert.svelte`: A general notification box for communicating actions that have occurred.
- `NewTodo.svelte`: The text input and button that allow you to enter a new to-do item.
- `FilterButton.svelte`: The _All_, _Active_, and _Completed_ buttons that allow you to apply filters to the displayed to-do items.
- `TodosStatus.svelte`: The "x out of y items completed" heading.
- `Todo.svelte`: An individual to-do item. Each visible to-do item will be displayed in a separate copy of this component.
- `MoreActions.svelte`: The _Check All_ and _Remove Completed_ buttons at the bottom of the UI that allow you to perform mass actions on the to-do items.

![graphical representation of the list of components in our app](01-todo-components.png)

In this article we will concentrate on creating the `FilterButton` and `Todo` components; we'll get to the others in future articles.

Let's get started.

> [!NOTE]
> In the process of creating our first couple of components, we will also learn different techniques to communicate between components, and the pros and cons of each.

## Extracting our filter component

Let's create our `FilterButton.svelte` component using Svelte 5's new runes system.

1. Create a new file, `components/FilterButton.svelte`.
2. Inside this file we'll use the new `$state` rune for reactivity and the event dispatcher for component communication:

   ```svelte
   <script>
     import { $state } from 'svelte';
     import { createEventDispatcher } from 'svelte';
     
     // State management using runes
     let filter = $state('all');
     
     // Event handling
     const dispatch = createEventDispatcher();
     
     function handleFilterChange(newFilter) {
       filter = newFilter;
       dispatch('filterChange', newFilter);
     }
   </script>

   <div class="filters btn-group stack-exception">
     <button class="btn toggle-btn" 
             class:btn__primary={filter === 'all'} 
             aria-pressed={filter === 'all'} 
             on:click={() => handleFilterChange('all')}>
       <span class="visually-hidden">Show</span>
       <span>All</span>
       <span class="visually-hidden">tasks</span>
     </button>
     <button class="btn toggle-btn" class:btn__primary={filter === 'active'} aria-pressed={filter === 'active'} on:click={() => handleFilterChange('active')} >
       <span class="visually-hidden">Show</span>
       <span>Active</span>
       <span class="visually-hidden">tasks</span>
     </button>
     <button class="btn toggle-btn" class:btn__primary={filter === 'completed'} aria-pressed={filter === 'completed'} on:click={() => handleFilterChange('completed')} >
       <span class="visually-hidden">Show</span>
       <span>Completed</span>
       <span class="visually-hidden">tasks</span>
     </button>
   </div>
   ```

3. In `Todos.svelte`, import and use the FilterButton component:

   ```svelte
   <script>
     import { $state } from 'svelte';
     import FilterButton from './FilterButton.svelte';
     
     let filter = $state('all');
   </script>

   <FilterButton 
     {filter}
     on:filterChange={(e) => filter = e.detail} 
   />
   ```

## Component Communication in Svelte 5

Svelte 5 introduces several improvements to component communication:

1. **State Management with Runes**: Instead of using `export let`, we now use the `$state` and `$props` runes:

```js
import { $state, $props } from 'svelte';

// Component state
let count = $state(0);

// Props
let { name, type = 'default' } = $props();
```

2. **Derived State**: Use `$derived` for computed values:

```js
import { $derived } from 'svelte';
let count = $state(0);
$derived doubled = count * 2;
```

3. **Event Handling**: Events use the dispatcher pattern with improved TypeScript support:

```js
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function handleAction() {
  dispatch('myEvent', { detail: 'some data' });
}
```

## Creating the Todo Component

Our Todo component using Svelte 5 features:

```svelte
<script>
  import { $state, $props } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  
  // Props
  let { todo } = $props();
  
  // State management
  let editing = $state(false);
  
  // Event handling
  const dispatch = createEventDispatcher();
  
  function handleToggle() {
    dispatch('update', {
      ...todo,
      completed: !todo.completed
    });
  }
  
  function handleEdit() {
    editing = true;
    dispatch('edit', todo);
  }
  
  function handleDelete() {
    dispatch('remove', todo);
  }
</script>

<div class="stack-small">
  {#if editing}
    <!-- Edit mode markup -->
    <form on:submit|preventDefault={handleSave}>
      <!-- Form contents -->
    </form>
  {:else}
    <div class="c-cb">
      <input type="checkbox" 
             id="todo-{todo.id}"
             checked={todo.completed}
             on:change={handleToggle}
      />
      <label for="todo-{todo.id}">{todo.name}</label>
    </div>
    <div class="btn-group">
      <button type="button" class="btn" on:click={handleEdit}>
        Edit<span class="visually-hidden"> {todo.name}</span>
      </button>
      <button type="button" class="btn btn__danger" on:click={handleDelete}>
        Delete<span class="visually-hidden"> {todo.name}</span>
      </button>
    </div>
  {/if}
</div>
```

## Summary

In this article we've learned how to:

- Use Svelte 5's new runes system for state management
- Create and communicate between components using modern Svelte patterns
- Implement two-way data binding using both events and bindings
- Structure our application using components

The next article will cover more advanced concepts including lifecycle methods and accessibility features.

{{PreviousMenuNext("Learn_web_development/Core/Frameworks_libraries/Svelte_variables_props","Learn_web_development/Core/Frameworks_libraries/Svelte_reactivity_lifecycle_accessibility", "Learn_web_development/Core/Frameworks_libraries")}}
