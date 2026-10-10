import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useEffect, useRef } from "react";
import type { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  editValue: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (todo: Todo) => void;
  onEditChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitEdit: (event: FormEvent<HTMLFormElement>) => void;
  onCancelEdit: () => void;
}

export function TodoItem({ todo, isEditing, editValue, onToggle, onDelete, onStartEdit, onEditChange, onSubmitEdit, onCancelEdit }: TodoItemProps) {
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const wasEditing = useRef(false);

  useEffect(() => {
    if (wasEditing.current && !isEditing) {
      editButtonRef.current?.focus();
    }
    wasEditing.current = isEditing;
  }, [isEditing]);

  function handleEditKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") onCancelEdit();
  }

  return (
    <li className="group flex items-center gap-3 py-4">
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? `Marcar ${todo.text} como pendiente` : `Completar ${todo.text}`}
        aria-pressed={todo.completed}
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition focus:outline-none focus:ring-4 focus:ring-indigo-100 ${todo.completed ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 text-transparent hover:border-indigo-400"}`}
      >
        <svg aria-hidden="true" className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /></svg>
      </button>

      {isEditing ? (
        <form onSubmit={onSubmitEdit} className="flex min-w-0 flex-1 items-center gap-2">
          <label className="sr-only" htmlFor={`edit-todo-${todo.id}`}>Editar {todo.text}</label>
          <input
            id={`edit-todo-${todo.id}`}
            type="text"
            value={editValue}
            onChange={onEditChange}
            onKeyDown={handleEditKeyDown}
            autoFocus
            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
          <button type="submit" className="shrink-0 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:scale-95">
            Guardar
          </button>
          <button type="button" onClick={onCancelEdit} className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-100">
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <span className={`min-w-0 flex-1 break-words text-sm transition ${todo.completed ? "text-slate-400 line-through" : "text-slate-700"}`}>
            {todo.text}
          </span>
          <button
            type="button"
            ref={editButtonRef}
            onClick={() => onStartEdit(todo)}
            aria-label={`Editar ${todo.text}`}
            className="rounded-lg p-2 text-slate-300 opacity-100 transition hover:bg-indigo-50 hover:text-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
          >
            <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" /></svg>
          </button>
          <button type="button" onClick={() => onDelete(todo.id)} aria-label={`Eliminar ${todo.text}`} className="rounded-lg p-2 text-slate-300 opacity-100 transition hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-4 focus:ring-red-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12m-1 0v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7m3 0V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2m-4 4v5m4-5v5" /></svg>
          </button>
        </>
      )}
    </li>
  );
}
