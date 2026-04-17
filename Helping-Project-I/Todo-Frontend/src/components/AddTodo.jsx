import { useContext, useRef } from "react";
import { MdAddToPhotos } from "react-icons/md";
import { TodoItemsContext } from "../store/todo-item-store";

function AddTodo() {
  const {addNewItem} = useContext(TodoItemsContext);
  const todoNameElement = useRef("");
  const todoDateElement = useRef("");

  const handleOnClick = () => {
    const todoName = todoNameElement.current.value;
    const todoDate = todoDateElement.current.value;
    addNewItem(todoName, todoDate);
    todoNameElement.current.value = "";
    todoDateElement.current.value = "";
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <input
          type="text"
          placeholder="Enter a new task..."
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
          ref={todoNameElement}
        />
        <input
          type="date"
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
          ref={todoDateElement}
        />
        <button
          type="button"
          onClick={handleOnClick}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-all transform hover:scale-105 active:scale-95"
        >
          <MdAddToPhotos size={20} />
          Add
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
