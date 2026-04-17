import { createContext, useEffect, useReducer } from "react";
import {
  addItemToServer,
  deleteItemFromServer,
  getItemsFromServer,
  markItemAsCompletedOnServer,
} from "../../services/itemService";

export const TodoItemsContext = createContext({
  items: [],
  addNewItem: () => {},
  deleteItem: () => {},
  completeItem: () => {},
});

const todoItemsReducer = (currentTodoItemsState, action) => {
  let newTodoItems = currentTodoItemsState;
  if (action.type === "LOAD_ITEMS") {
    newTodoItems = action.payload.items;
  } else if (action.type === "NEW_ITEM") {
    newTodoItems = [
      ...currentTodoItemsState,
      {
        id: action.payload.itemId,
        name: action.payload.itemName,
        dueDate: action.payload.itemDueDate,
        completed: false,
      },
    ];
  } else if (action.type === "DELETE_ITEM") {
    newTodoItems = currentTodoItemsState.filter(
      (item) => item.id !== action.payload.itemId,
    );
  } else if (action.type === "COMPLETE_ITEM") {
    newTodoItems = currentTodoItemsState.map((item) =>
      item.id === action.payload.itemId
        ? { ...item, completed: !item.completed }
        : item,
    );
  }
  return newTodoItems;
};

const TodoItemsContextProvider = ({ children }) => {
  const [newTodoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

  // ✅ Inside the component, using dispatchTodoItems correctly
  useEffect(() => {
    getItemsFromServer().then((serverItems) => {
      dispatchTodoItems({
        type: "LOAD_ITEMS",
        payload: {
          items: serverItems,
        },
      });
    });
  }, []);

  const addNewItem = async (itemName, itemDueDate) => {
    const serverItem = await addItemToServer(itemName, itemDueDate);
    dispatchTodoItems({
      type: "NEW_ITEM",
      payload: {
        itemId: serverItem.id,
        itemName: serverItem.name,
        itemDueDate: serverItem.dueDate,
      },
    });
  };

  const deleteItem = async (id) => {
    await deleteItemFromServer(id);
    dispatchTodoItems({
      type: "DELETE_ITEM",
      payload: { itemId: id },
    });
  };

  const completeItem = async (id) => {
    const currentItem = newTodoItems.find((item) => item.id === id);
    const newCompletedStatus = !currentItem?.completed;
    await markItemAsCompletedOnServer(id, newCompletedStatus);
    dispatchTodoItems({
      type: "COMPLETE_ITEM",
      payload: { itemId: id },
    });
  };

  return (
    <TodoItemsContext.Provider
      value={{ items: newTodoItems, addNewItem, deleteItem, completeItem }}
    >
      {children}
    </TodoItemsContext.Provider>
  );
};

export default TodoItemsContextProvider;
