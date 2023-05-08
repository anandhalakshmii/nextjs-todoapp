import { ITask } from "./types/tasks";

const baseUrl = "http://localhost:3001";

const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/todos`, { cache: "no-store" });
  const data = res.json();
  return data;
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const newTodo = await res.json();
  return newTodo;
};

export const editOldTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const updatedTodo = await res.json();
  return updatedTodo;
};

export const deleteOldTodo = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
  });
};

export default getAllTodos;
