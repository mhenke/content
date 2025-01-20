<script>
  // Use $ rune for reactive state
  import { $state, $derived } from 'svelte';
  
  // State variables use $ rune
  let todos = $state([
    { id: 1, name: "Create a Svelte starter app", completed: true },
    { id: 2, name: "Create your first component", completed: true }, 
    { id: 3, name: "Complete the rest of the tutorial", completed: false }
  ]);

  let filter = $state('all');
  let newTodoName = $state('');

  // Derived state uses $ rune
  $derived totalTodos = todos.length;
  $derived completedTodos = todos.filter(t => t.completed).length;
  $derived newTodoId = totalTodos ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  
  // Filter function
  const filterTodos = (filter, todos) =>
    filter === "active"
      ? todos.filter(t => !t.completed)
      : filter === "completed"
        ? todos.filter(t => t.completed)
        : todos;

  // Functions stay mostly the same
  function addTodo() {
    todos = [...todos, { id: newTodoId, name: newTodoName, completed: false }];
    newTodoName = "";
  }

  function removeTodo(todo) {
    todos = todos.filter(t => t.id !== todo.id);
  }

  function updateTodo(todo) {
    todos = todos.map(t => t.id === todo.id ? {...todo} : t);
  }
</script> 