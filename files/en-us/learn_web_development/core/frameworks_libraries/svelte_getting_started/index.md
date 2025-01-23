---
title: Getting started with Svelte
slug: Learn_web_development/Core/Frameworks_libraries/Svelte_getting_started
page-type: learn-module-chapter
---

{{LearnSidebar}}

{{NextMenu("Learn_web_development/Core/Frameworks_libraries/Svelte_todo_list_beginning", "Learn_web_development/Core/Frameworks_libraries")}}

Welcome to our Svelte tutorial! In this series, we'll build a complete web application using Svelte 5.19.0, learning about the key features and concepts along the way.

## Prerequisites

Basic familiarity with:
- HTML, CSS, and JavaScript
- Command line/terminal usage
- Modern JavaScript features (ES6+)
- Node.js and npm installed on your system

## What is Svelte?

Svelte is a modern JavaScript framework that takes a unique approach to building web applications. Unlike traditional frameworks that do most of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.

Key features in Svelte 5.19.0:
- Runes-based reactivity system with `$state` and `$derived`
- Improved TypeScript support
- Enhanced performance through compile-time optimizations
- Built-in state management
- Component-based architecture

## Installation and Setup

To create a new Svelte project, you can use:

```bash
npm create vite@latest my-app -- --template svelte
cd my-app
npm install
```

This command uses the latest version of Svelte (5.19.0) and provides more template options than before.

## Basic Component Structure

Here's a basic Svelte component using the new runes syntax:

```svelte
<script>
  import { $state, $derived } from 'svelte';
  
  let count = $state(0);
  $derived doubled = count * 2;
  
  function increment() {
    count++;
  }
</script>

<button onclick={increment}>
  Count: {count}
</button>

<p>Doubled: {doubled}</p>

<style>
  button {
    padding: 8px 12px;
    background: #ff3e00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
```
> [!NOTE]
> In Svelte 5, event handlers are properties like any other. Instead of using the `on:click` directive style from Svelte 4, we can now use standard property syntax like `{onclick}`. This aligns better with standard JavaScript and makes event handling more intuitive.

## Key Concepts

### State Management
Svelte 5.19.0 introduces runes for state management:
- `$state` for reactive variables
- `$derived` for computed values
- `$props` for component properties
- `$effect` for side effects

### Component Communication
Components can communicate through:
- Props using `$props`
- Events using `createEventDispatcher`
- Stores for global state management

### Styling
- Scoped by default to components
- Global styles can be added in public/global.css
- Dynamic styles supported through style directives

## Next Steps

Now that you understand the basics, let's move on to building a practical application: a todo list that will help reinforce these concepts and introduce more advanced features.

In this article we'll provide a quick introduction to the [Svelte framework](https://svelte.dev/). We will see how Svelte works and what sets it apart from the rest of the frameworks and tools we've seen so far. Then we will learn how to set up our development environment, create a sample app, understand the structure of the project, and see how to run it locally and build it for production.

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
          Svelte is a compiler that generates minimal and highly optimized
          JavaScript code from our sources; you'll need a terminal with node +
          npm installed to compile and build your app.
        </p>
      </td>
    </tr>
    <tr>
      <th scope="row">Objective:</th>
      <td>
        To setup a local Svelte development environment, create and build a
        starter app, and understand the basics of how it works.
      </td>
    </tr>
  </tbody>
</table>

## Svelte: A new approach to building rich user interfaces

Svelte provides a different approach to building web apps than some of the other frameworks covered in this module. While frameworks like React and Vue do the bulk of their work in the user's browser while the app is running, Svelte shifts that work into a compile step that happens only when you build your app, producing highly optimized vanilla JavaScript.

The outcome of this approach is not only smaller application bundles and better performance, but also a developer experience that is more approachable for people that have limited experience of the modern tooling ecosystem.

Svelte sticks closely to the classic web development model of HTML, CSS, and JS, just adding a few extensions to HTML and JavaScript. It arguably has fewer concepts and tools to learn than some of the other framework options.

Its main current disadvantages are that it is a young framework — its ecosystem is therefore more limited in terms of tooling, support, plugins, clear usage patterns, etc. than more mature frameworks, and there are also fewer job opportunities. But its advantages should be enough to make you interested to explore it.

> [!NOTE]
> Svelte has [official TypeScript support](https://svelte.dev/docs/typescript). We'll look at it later on in this tutorial series.

We encourage you to go through the [Svelte tutorial](https://learn.svelte.dev/) for a really quick introduction to the basic concepts, before returning to this tutorial series to learn how to build something slightly more in-depth.

## Use cases

Svelte can be used to develop small pieces of an interface or whole applications. You can either start from scratch letting Svelte drive your UI or you can incrementally integrate it into an existing application.

Nevertheless, Svelte is particularly appropriate to tackle the following situations:

- Web applications intended for low-power devices: Applications built with Svelte have smaller bundle sizes, which is ideal for devices with slow network connections and limited processing power. Less code means fewer KB to download, parse, execute, and keep hanging around in memory.
- Highly interactive pages or complex visualizations: If you are building data-visualizations that need to display a large number of DOM elements, the performance gains that come from a framework with no runtime overhead will ensure that user interactions are snappy and responsive.
- Onboarding people with basic web development knowledge: Svelte has a shallow learning curve. Web developers with basic HTML, CSS, and JavaScript knowledge can easily grasp Svelte specifics in a short time and start building web applications.

The Svelte team launched [SvelteKit](https://kit.svelte.dev/), a framework for building web applications using Svelte. It contains features found in modern web frameworks, such as filesystem-based routing, server-side rendering (SSR), page-specific rendering modes, offline support, and more. For more information about SvelteKit, see the [official tutorial](https://learn.svelte.dev/) and [documentation](https://kit.svelte.dev/docs/introduction).

Svelte is also available for mobile development via [Svelte Native](https://svelte-native.technology/).

## How does Svelte work?

Being a compiler, Svelte can extend HTML, CSS, and JavaScript, generating optimal JavaScript code without any runtime overhead. To achieve this, Svelte extends vanilla web technologies in the following ways:

- It extends HTML by allowing JavaScript expressions in markup and providing directives to use conditions and loops, in a fashion similar to handlebars.
- It extends CSS by adding a scoping mechanism, allowing each component to define its own styles without the risk of clashing with other components' styles.
- It extends JavaScript by reinterpreting specific directives of the language to achieve true reactivity and ease component state management.

The compiler only intervenes in very specific situations and only in the context of Svelte components. Extensions to the JavaScript language are minimal and carefully picked in order not to break JavaScript syntax or alienate developers. In fact, you will be mostly working with vanilla JavaScript.

## First steps with Svelte

Since Svelte is a compiler, you can't just add a `<script src="svelte.js">` tag to your page and import it into your app. You'll have to set up your development environment in order to let the compiler do its job.

### Requirements

In order to work with Svelte, you need to have [Node.js](https://nodejs.org/) installed. It's recommended that you use the long-term support (LTS) version. Node includes npm (the node package manager), and npx (the node package runner). Note that you can also use the Yarn package manager in place of npm, but we'll assume you are using npm in this set of tutorials. See [Package management basics](/en-US/docs/Learn_web_development/Extensions/Client-side_tools/Package_management) for more information on npm and yarn.

If you're using Windows, you will need to install some software to give you parity with Unix/macOS terminal in order to use the terminal commands mentioned in this tutorial. Gitbash (which comes as part of the [git for Windows toolset](https://gitforwindows.org/)) or [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/about) are both suitable. See [Command line crash course](/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line) for more information on these, and on terminal commands in general.

Also see the following for more information:

- ["About npm"](https://docs.npmjs.com/about-npm/) on the npm documentation
- ["Introducing npx"](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner) on the npm blog

### Creating your first Svelte app

For this tutorial, we'll use SvelteKit with Svelte 5 beta, which introduces new features like runes for reactivity. Create a new project by running:

```bash
npx sv@latest create moz-todo-svelte
cd moz-todo-svelte
npm install

```

When prompted, select the following options:
1. Which Svelte app template? → `SvelteKit minimal`
2. Add type checking with TypeScript? → `Yes, using TypeScript syntax`
3. Select additional options:
   - ✓ Add Prettier for code formatting
   - ✓ Add ESLint for code linting
   - ✓ Add Playwright for browser testing
   - ✓ Add Vitest for unit testing
4. Select package manager:
   - ✓ Add npm

Then upgrade to Svelte 5 beta:
```bash
npm i -D svelte@next
```

> [!NOTE]
> Svelte 5 and its runes feature are currently in beta. While we'll use them in this tutorial to learn about the latest features, you might want to stick with Svelte 4 for production applications until version 5 is officially released.

After installation, you can optionally initialize a git repository:
```bash
git init
git add -A
git commit -m "Initial commit"
```

Then start the development server (choice one option):
```bash
# Start dev server without opening browser
npm run dev

# Start dev server and automatically open in default browser
npm run dev -- --open
```
> [!NOTE]
> When you first run the development server, you might see this warning:
> ```
> ▲ [WARNING] Cannot find base config file "./.svelte-kit/tsconfig.json"
> ```
> This is normal on first run - SvelteKit will generate this file when it builds. The development server will run fine despite this warning.

### Application structure

A new SvelteKit project comes with the following structure:

```plain
moz-todo-svelte/
├── README.md
├── package.json
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
├── playwright.config.ts
├── static/
├── tests/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   └── assets/
│   ├── routes/
│   │   ├── +page.svelte
│   │   └── +layout.svelte
│   └── app.html
└── .svelte-kit/
```

The contents are as follows:

- `package.json`: Project dependencies and scripts
- `svelte.config.js`: SvelteKit configuration
- `vite.config.ts`: Vite build tool configuration
- `tsconfig.json`: TypeScript configuration
- `.eslintrc.cjs`: ESLint configuration
- `.prettierrc`: Prettier configuration
- `playwright.config.ts`: Playwright test configuration
- `static/`: Static assets that will be served as-is
- `tests/`: Test files
- `src/`: Your application source code
  - `lib/`: Reusable components and utilities
    - `components/`: Svelte components
    - `assets/`: Images and other assets
  - `routes/`: Pages and API routes (SvelteKit's file-based routing)
    - `+page.svelte`: The main page component
    - `+layout.svelte`: The layout component
  - `app.html`: The HTML template for your app

> [!NOTE]
> In SvelteKit, files that begin with `+` (like `+page.svelte` and `+layout.svelte`) are special routing files. The `+` prefix tells SvelteKit that these files have special meaning:
> - `+page.svelte` defines a page component that will be rendered at that route
> - `+layout.svelte` defines a layout that will wrap pages in that directory and its subdirectories
> These files are part of SvelteKit's file-based routing system, where the directory structure determines your app's routes.

## Having a look at our first Svelte component

Components are the building blocks of Svelte applications. They are written into `.svelte` files using a superset of HTML.

All three sections — `<script>`, `<style>`, and markup — are optional, and can appear in any order you like.

```html
<script>
  // logic goes here
</script>

<style>
  /* styles go here */
</style>

<!-- markup (zero or more HTML elements) goes here -->
```

> [!NOTE]
> For more information on the component format, have a look at the [Svelte Components documentation](https://svelte.dev/docs/svelte-components).

With this in mind, let's have a look at the `src/routes/+page.svelte` file that came with the starter template. You should see something like the following:

```html
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
```

This is a basic SvelteKit page component. Let's modify it to add some styling and interactivity:

```html
<script lang="ts"> 
let name = $state('world');
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>
```

### The `<script>` section

The `<script>` block contains JavaScript or TypeScript that runs when a component instance is created. In Svelte 5, we use runes for reactivity. Variables declared with `$state` are reactive by default. We'll explain in detail what this means later on.

```html
<script lang="ts">
let name = $state('world');
</script>
```
> [!NOTE]
> When using TypeScript with Svelte 5, add `lang="ts"` to your `<script>` tag. This enables TypeScript support in your components

> For more details on TypeScript support, see our [Using TypeScript with Svelte](/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Svelte_TypeScript) article.

### The markup section

In the markup section you can insert any HTML you like, and in addition you can insert valid JavaScript expressions inside single curly braces (`{}`). In this case we are embedding the value of the `name` prop right after the `Hello` text.

```html
<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://learn.svelte.dev/">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>
```

Svelte also supports tags like `{#if}`, `{#each}`, and `{#await}` — these examples allow you to conditionally render a portion of the markup, iterate through a list of elements, and work with async values, respectively.

### The `<style>` section

If you have experience working with CSS, the following snippet should make sense:

```html
<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
```

We are applying a style to our [`<h1>`](/en-US/docs/Web/HTML/Element/Heading_Elements) element. What will happen to other components with `<h1>` elements in them?

In Svelte, CSS inside a component's `<style>` block will be scoped only to that component. This works by adding a class to selected elements, which is based on a hash of the component styles.

You can see this in action by opening `localhost:5173` in a new browser tab, right/<kbd>Ctrl</kbd>-clicking on the _HELLO WORLD!_ label, and choosing _Inspect_:

![Svelte starter app with devtools open, showing classes for scoped styles](02-svelte-component-scoped-styles.png)

When compiling the app, Svelte changes our `h1` styles definition to `h1.svelte-1tky8bj`, and then modifies every `<h1>` element in our component to `<h1 class="svelte-1tky8bj">`, so that it picks up the styles as required.

> [!NOTE]
> You can override this behavior and apply styles to a selector globally using the `:global()` modifier (see the [Svelte `<style>` docs](https://svelte.dev/docs/svelte-components#style) for more information).

## Making a couple of changes

Now that we have a general idea of how it all fits together, we can start making a few changes.
At this point you can try updating your `App.svelte` component — for example change the `<h1>` element in `App.svelte` so that it reads like this:

```html
<h1>Hello {name} from MDN!</h1>
```

Just save your changes and the app running at `localhost:5173` will be automatically updated.

### A first look at Svelte reactivity

In the context of a UI framework, reactivity means that the framework can automatically update the DOM when the state of any component is changed.

In Svelte, reactivity is triggered by updating state variables declared with runes. For example, we could include a `onclick()` function in our component, and a button to run it.

Try updating your `<script>` and markup sections like so:

```html
<script lang="ts">
  let name = $state<string>('world');

  function onclick() {
    if (name === "world") {
      name = "Svelte";
    } else {
      name = "world";
    }
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <button {onclick}>Toggle name</button>
  <p>
    Visit the <a href="https://learn.svelte.dev/">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>
```

Whenever the button is clicked, Svelte executes the `onclick()` function, which in turn updates the value of the `name` state variable. Since `name` was declared with `$state`, Svelte automatically updates the DOM whenever its value changes.

> [!NOTE]
> In Svelte 5, event handlers are treated as standard properties. While you can use shorthand property syntax like `{onclick}`, consider using more descriptive function names for better code readability. For example, `handleClick` or `toggleName` would be more descriptive than just`onclick`.

### Inspecting `+layout.svelte`: The Entry Point of Our App

In SvelteKit, the concept of an entry point shifts from a single main.js file to a file-based routing system that utilizes layout and page components. The +layout.svelte file is a key component in this system, defining the layout for a specific route or group of routes. A minimal +layout.svelte file might look like this:

```svelte
<script>
  let { data, children } = $props();
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

{@render children()}

```

This layout component is essential for structuring your application:

- The  **`<script>` block** is used for importing or defining logic and receiving data.
- The  **`{@render children()}` directive** acts as a placeholder for nested content, making it possible to define reusable layouts.
- The  `let { data, children } = $props();` statement allows this component to receive data and child components.

SvelteKit's layout system allows for nested layouts to arbitrary depth, providing flexibility in structuring your application

### Key Concepts:

1. **Global Styles**: While styles can be scoped to specific components, you can also include global styles by importing them in the root `app.html` or by using the `@layout.svelte` file.
2. **Root Component**: The layout serves as a foundation, organizing the structure of your app and providing shared functionality like navigation or global state.
3. **Routing**: SvelteKit automatically handles routing based on the file structure in the `src/routes` directory.

## A Look Under the Hood: How SvelteKit Manages Your App

When you run `npm run dev` or build your app for production, SvelteKit and Vite collaborate to handle everything seamlessly. Here's what happens:

During Development:
- **Hot Module Replacement (HMR)** ensures instant feedback for your changes.
- **Dynamic Routing** based on the file system allows quick navigation setup.
- **Server-Side Rendering (SSR)** and **Client-Side Hydration** work together to deliver a fast and interactive experience.

#### During Build:
- **Processing Your Svelte Components**:
  - Svelte compiles `.svelte` files into optimized JavaScript.
  - Scoped CSS is extracted for each component.
  - TypeScript definitions are generated if TypeScript is used.

- **Bundling Your Application**:
  - Vite combines JavaScript into optimized bundles.
  - Production-ready assets are placed in the `build` directory.
  - Source maps are created for debugging.

The resulting build directory contains:

- Optimized JavaScript bundles and CSS files.
- Static assets, such as images and fonts.
- An `index.html` file that initializes the app and links all the assets.

## Why This Matters

SvelteKit abstracts away much of the complexity of building modern web applications, giving you:

- A simplified development experience with a file-based routing system.
- Optimized builds out of the box, leveraging Vite's fast bundling and Svelte's efficient compilation.
- Flexibility to adapt to different rendering modes, including SSR, static generation, and client-side-only rendering.

By focusing on these modern patterns, SvelteKit ensures your app is performant and scalable without requiring in-depth knowledge of the underlying build tools.