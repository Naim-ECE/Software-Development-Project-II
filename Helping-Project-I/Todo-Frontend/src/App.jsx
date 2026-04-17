import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import TodoItemsContextProvider from "./store/todo-item-store";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6">
      <TodoItemsContextProvider>
        <div className="max-w-3xl mx-auto">
          <AppName />
          <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8">
            <AddTodo />
            <WelcomeMessage />
            <TodoItems />
          </div>
        </div>
      </TodoItemsContextProvider>
    </div>
  );
}

export default App;
