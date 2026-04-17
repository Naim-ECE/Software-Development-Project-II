import { useContext } from "react";
import { MdDeleteForever, MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import { TodoItemsContext } from "../store/todo-item-store";

function TodoItem({ id, todoName, todoDate, completed = false }) {
  const { deleteItem, completeItem } = useContext(TodoItemsContext);

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border-l-4 transition-all ${
      completed
        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-l-green-500 opacity-75"
        : "bg-gradient-to-r from-gray-50 to-gray-100 border-l-indigo-500"
    } hover:shadow-md`}>
      <div className="flex-1 flex items-center gap-3">
        <button
          type="button"
          onClick={() => completeItem(id)}
          className="flex-shrink-0 text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          {completed ? (
            <MdCheckCircle size={24} className="text-green-500" />
          ) : (
            <MdRadioButtonUnchecked size={24} />
          )}
        </button>
        <p className={`text-lg font-semibold ${
          completed
            ? "text-gray-500 line-through"
            : "text-gray-800"
        }`}>
          {todoName}
        </p>
      </div>
      <div className="flex items-center gap-4 mt-3 sm:mt-0 ml-9 sm:ml-0">
        <p className={`text-sm font-semibold px-3 py-1 rounded-full ${
          completed
            ? "text-green-600 bg-green-100"
            : "text-indigo-600 bg-indigo-100"
        }`}>
          {formatDate(todoDate)}
        </p>
        <button
          type="button"
          onClick={() => deleteItem(id)}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95"
        >
          <MdDeleteForever size={20} />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
