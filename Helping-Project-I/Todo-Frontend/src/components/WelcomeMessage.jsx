import { useContext } from "react";
import { TodoItemsContext } from "../store/todo-item-store";

const WelcomeMessage = () => {
  const contextObject = useContext(TodoItemsContext);
  const todoItems = contextObject.items;
  
  return (
    <>
      {todoItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400 font-semibold">✨ Welcome! Let's add some tasks to get started ✨</p>
        </div>
      )}
    </>
  );
};

export default WelcomeMessage;
