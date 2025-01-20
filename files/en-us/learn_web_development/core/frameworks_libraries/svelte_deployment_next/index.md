---
title: Deployment and next steps
slug: Learn_web_development/Core/Frameworks_libraries/Svelte_deployment_next
page-type: learn-module-chapter
---

{{LearnSidebar}}

{{PreviousMenu("Learn_web_development/Core/Frameworks_libraries/Svelte_TypeScript", "Learn_web_development/Core/Frameworks_libraries")}}

In the previous article we learned about Svelte's TypeScript support, and how to use it to make your application more robust. In this final article we will look at how to deploy your application and get it online, and also share some of the resources that you should go on to, to continue your Svelte learning journey.

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
          You'll need a terminal with node + npm installed to compile and build
          your app.
        </p>
      </td>
    </tr>
    <tr>
      <th scope="row">Objective:</th>
      <td>
        Learn how to prepare our Svelte app for production, and what learning
        resources you should visit next.
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
cd mdn-svelte-tutorial/08-next-steps
```

Or directly download the folder's content:

```bash
npx degit opensas/mdn-svelte-tutorial/08-next-steps
```

Remember to run `npm install && npm run dev` to start your app in development mode.

## Compiling our app

So far we've been running our app in development mode with `npm run dev`. As we saw earlier, this instruction tells Svelte to compile our components and JavaScript files into a `public/build/bundle.js` file and all the CSS sections of our components into `public/build/bundle.css`. It also starts a development server and watches for changes, recompiling the app and refreshing the page when a change occurs.

Your generated `bundle.js` and `bundle.css` files will be something like this (file size on the left):

```plain
  504 Jul 13 02:43 bundle.css
95981 Jul 13 02:43 bundle.js
```

To compile our application for production we have to run `npm run build` instead. In this case, Svelte won't launch a web server or keep watching for changes. It will however minify and compress our JavaScript files using [terser](https://terser.org/).

So, after running `npm run build`, our generated `bundle.js` and `bundle.css` files will be more like this:

```plain
  504 Jul 13 02:43 bundle.css
21782 Jul 13 02:43 bundle.js
```

Try running `npm run build` in your app's root directory now. You might get a warning, but you can ignore this for now.

Our whole app is now just 21 KB — 8.3 KB when gzipped. There are no additional runtimes or dependencies to download, parse, execute, and keep running in memory. Svelte analyzed our components and compiled the code to vanilla JavaScript.

## A look behind the Svelte compilation process

By default, when you create a new app with `npx degit sveltejs/template my-svelte-project`, Svelte will use [rollup](https://rollupjs.org/) as the module bundler.

> [!NOTE]
> There is also an official template for using [webpack](https://webpack.js.org/) and also many [community-maintained plugins](https://github.com/sveltejs/integrations#bundler-plugins) for other bundlers.

In the file `package.json` you can see that the `build` and `dev` scripts are just calling rollup:

```json
"scripts": {
  "build": "rollup -c",
  "dev": "rollup -c -w",
  "start": "sirv public"
},
```

In the `dev` script we are passing the `-w` argument, which tells rollup to watch files and rebuild on changes.

If we have a look at the `rollup.config.js` file, we can see that the Svelte compiler is just a rollup plugin:

```js
import svelte from 'rollup-plugin-svelte';
// …
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write('public/build/bundle.css');
      }
    }),
```

Later on in the same file you'll also see how rollup minimizes our scripts in production mode and launches a local server in development mode:

```js
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
```

There are [many plugins for rollup](https://github.com/rollup/awesome) that allow you to customize its behavior. A particularly useful plugin which is also maintained by the Svelte team is [svelte-preprocess](https://github.com/sveltejs/svelte-preprocess), which pre-processes many different languages in Svelte files such as PostCSS, SCSS, Less, CoffeeScript, SASS, and TypeScript.

## Building for Production

With Svelte 5.19.0, building for production is handled by Vite:

```bash
npm run build
```

This will create an optimized production build in the `dist` directory. The build process:
- Compiles Svelte components
- Bundles JavaScript and CSS
- Optimizes assets
- Generates sourcemaps

## Deployment Options

### 1. Static Hosting (Recommended)

Deploy to platforms like:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Example with Vercel:
```bash
npm install -g vercel
vercel
```

### 2. Docker Deployment

```dockerfile
FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

### 3. Self-Hosted

For Node.js environments:
```bash
npm install -g serve
serve -s dist
```

## Performance Optimization

1. **Code Splitting**
```js
// Dynamic imports for route-based code splitting
const TodoList = () => import('./routes/TodoList.svelte');
```

2. **Asset Optimization**
```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte']
        }
      }
    }
  }
});
```

3. **Preloading**
```html
<link rel="modulepreload" href="/assets/TodoList-[hash].js">
```

## Environment Variables

```bash
# .env
VITE_API_URL=https://api.example.com
```

```typescript
// Access in components
const apiUrl = import.meta.env.VITE_API_URL;
```

## Monitoring and Analytics

1. **Error Tracking**
```js
// main.js
import * as Sentry from "@sentry/svelte";

Sentry.init({
  dsn: "your-dsn",
  integrations: [new Sentry.BrowserTracing()],
});
```

2. **Performance Monitoring**
```js
import { onMount } from 'svelte';

onMount(() => {
  if (window.performance) {
    // Report metrics
    const navigation = performance.getEntriesByType("navigation")[0];
    console.log(`Page load time: ${navigation.duration}ms`);
  }
});
```

## Security Considerations

1. **Content Security Policy**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'">
```

2. **Environment Variables**
- Use `.env.local` for sensitive data
- Only expose variables prefixed with `VITE_`
- Use runtime configuration when needed

## Continuous Integration/Deployment

Example GitHub Actions workflow:
```yaml
name: Deploy
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
```

## Next Steps

1. **Learning Resources**:
   - [Svelte Documentation](https://svelte.dev/docs)
   - [SvelteKit](https://kit.svelte.dev/)
   - [Svelte Discord](https://svelte.dev/chat)

2. **Advanced Topics**:
   - Server-Side Rendering (SSR)
   - Progressive Web Apps (PWA)
   - Internationalization (i18n)
   - State Management Patterns

## Finito

Congratulations! You have completed the Svelte tutorial. In the previous articles we went from zero knowledge about Svelte to building and deploying a complete application.

- We learned about Svelte philosophy and what sets it apart from other front-end frameworks.
- We saw how to add dynamic behavior to our website, how to organize our app in components and different ways to share information among them.
- We took advantage of the Svelte reactivity system and learned how to avoid common pitfalls.
- We also saw some advanced concepts and techniques to interact with DOM elements and to programmatically extend HTML element capabilities using the `use` directive.
- Then we saw how to use stores to work with a central data repository, and we created our own custom store to persist our application's data to Web Storage.
- We also took a look at Svelte's TypeScript support.

In this article we've learned about a couple of zero-fuss options to deploy our app in production and seen how to set up a basic pipeline to deploy our app to GitLab on every commit. Then we provided you with a list of Svelte resources to go further with your Svelte learning.

Congratulations! After completing this series of tutorials you should have a strong base from which to start developing professional web applications with Svelte.

{{PreviousMenu("Learn_web_development/Core/Frameworks_libraries/Svelte_TypeScript", "Learn_web_development/Core/Frameworks_libraries")}}
