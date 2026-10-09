import type { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
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
      <span className={`min-w-0 flex-1 break-words text-sm transition ${todo.completed ? "text-slate-400 line-through" : "text-slate-700"}`}>
        {todo.text}
      </span>
      <button type="button" onClick={() => onDelete(todo.id)} aria-label={`Eliminar ${todo.text}`} className="rounded-lg p-2 text-slate-300 opacity-100 transition hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-4 focus:ring-red-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
        <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12m-1 0v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7m3 0V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2m-4 4v5m4-5v5" /></svg>
      </button>
    </li>
  );
}
