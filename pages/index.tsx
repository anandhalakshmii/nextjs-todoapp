import AddTask from "@/components/AddTask";
import TodoList from "@/components/TodoList";
import getAllTodos from "@/api";
import { useEffect, useState } from "react";
import { ITask } from "@/types/tasks";

export default function Home() {
  const [todos, setTodos] = useState<ITask[]>([]);

  useEffect(() => {
    const tasks = async () => await getAllTodos();
    tasks().then((todos) => setTodos(todos));
  }, []);

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <AddTask />
      </div>
      <TodoList todos={todos} />
    </main>
  );
}
