export const addItemToServer = async (task, date) => {
  const response = await fetch("http://localhost:3000/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date }),
  });
  const data = await response.json();
  return mapServerLocalItem(data);
};

export const getItemsFromServer = async () => {
  const response = await fetch("http://localhost:3000/api/todo");
  const data = await response.json();
  return data.map(mapServerLocalItem);
};

export const markItemAsCompletedOnServer = async (id, completed) => {
  const response = await fetch(
    `http://localhost:3000/api/todo/${id}/completed`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    },
  );
  const data = await response.json();
  return mapServerLocalItem(data);
};

export const deleteItemFromServer = async (id) => {
  await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "DELETE",
  });
  return id;
};

export const mapServerLocalItem = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
    completed: serverItem.completed,
  };
};
