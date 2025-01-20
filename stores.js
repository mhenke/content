import { writable } from 'svelte/store';

// Create store with initial value
export const alert = writable('Welcome to the to-do list app!');

// Create custom store with local storage persistence
export function createLocalStore(key, initial) {
  // Create writable store
  const store = writable(initial);
  
  // Load initial value from localStorage
  if (localStorage.getItem(key)) {
    store.set(JSON.parse(localStorage.getItem(key)));
  }

  // Subscribe to changes and update localStorage
  store.subscribe(value => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  // Return store with additional methods if needed
  return {
    ...store,
    // Add custom methods here if needed
    reset: () => {
      store.set(initial);
    }
  };
} 