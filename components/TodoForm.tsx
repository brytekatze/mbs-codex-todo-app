import type { ChangeEvent, FormEvent } from "react";

interface TodoFormProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function TodoForm({ value, onChange, onSubmit }: TodoFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-3 border-b border-slate-100 p-4 sm:p-6">
      <label className="sr-only" htmlFor="new-todo">Nueva tarea</label>
      <input
        id="new-todo"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="¿Qué necesitas hacer?"
        className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      />
      <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:scale-95 sm:px-5">
        Agregar
      </button>
    </form>
  );
}
