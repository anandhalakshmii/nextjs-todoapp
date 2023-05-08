"use client";

import { editOldTodo } from "@/api";
import { deleteOldTodo } from "@/api";
import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

interface TodoProps {
  todo: ITask;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);

  const router = useRouter();

  const [editTodo, setEditTodo] = useState<string>(todo.text);
  const handleEditTodoSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editOldTodo({
      id: todo.id,
      text: editTodo,
    });
    setModalOpenEdit(false);
    router.refresh();
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteOldTodo(id);
    setModalOpenEdit(false);
    router.refresh();
  };

  return (
    <tr key={todo.id}>
      <td className="w-full">{todo.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => {
            setModalOpenEdit(true);
          }}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
          <form onSubmit={handleEditTodoSubmit}>
            <h3 className="font-bold text-lg"> Edit Todo</h3>
            <div className="modal-action">
              <input
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setModalOpenDelete(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
          <h3 className="font-bold text-lg"> Delete Todo</h3>
          <p>Are you sure you want to delete this todo?</p>
          <div className="modal-action">
            <button
              type="submit"
              className="btn"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Todo;
