import type { ChangeEvent, FormEvent } from "react";
import type { Todo } from "./types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  editingId: string | null;
  editValue: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (todo: Todo) => void;
  onEditChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitEdit: (event: FormEvent<HTMLFormElement>) => void;
  onCancelEdit: () => void;
}

export function TodoList({ todos, editingId, editValue, onToggle, onDelete, onStartEdit, onEditChange, onSubmitEdit, onCancelEdit }: TodoListProps) {
  return (
    <ul className="divide-y divide-slate-100 px-4 pb-3 sm:px-6" aria-label="Lista de tareas">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          editValue={editValue}
          onToggle={onToggle}
          onDelete={onDelete}
          onStartEdit={onStartEdit}
          onEditChange={onEditChange}
          onSubmitEdit={onSubmitEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </ul>
  );
}
