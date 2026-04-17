import TodoItem from "./TodoItem";
import { TodoItemsContext } from "../store/todo-item-store";
import { useContext } from "react";

const TodoItems = () => {
  const contextObject = useContext(TodoItemsContext);
  const todoItem = contextObject.items;
  
  const activeItems = todoItem.filter((item) => !item.completed);
  const completedItems = todoItem.filter((item) => item.completed);
  
  return (
    <div>
      <div className="space-y-3 mb-8">
        {activeItems.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            todoName={item.name}
            todoDate={item.dueDate}
            completed={item.completed}
          />
        ))}
      </div>
      
      {completedItems.length > 0 && (
        <div className="border-t-2 border-gray-200 pt-6 mt-6">
          <h3 className="text-lg font-bold text-gray-600 mb-4">✓ Completed Tasks ({completedItems.length})</h3>
          <div className="space-y-3">
            {completedItems.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                todoName={item.name}
                todoDate={item.dueDate}
                completed={item.completed}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItems;
