"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import type { Todo } from "../components/types";

const STORAGE_KEY = "mbs-todo-list";

function isTodo(value: unknown): value is Todo {
  if (!value || typeof value !== "object") return false;
  const todo = value as Record<string, unknown>;
  return typeof todo.id === "string" && typeof todo.text === "string" && typeof todo.completed === "boolean";
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const hasLoadedTodos = useRef(false);

  useEffect(() => {
    let cancelled = false;

    try {
      const storedTodos = window.localStorage.getItem(STORAGE_KEY);
      if (storedTodos) {
        const parsedTodos: unknown = JSON.parse(storedTodos);
        if (Array.isArray(parsedTodos)) {
          const loadedTodos = parsedTodos.filter(isTodo);
          queueMicrotask(() => {
            if (!cancelled) setTodos(loadedTodos);
          });
        }
      }
    } catch {
      // Si el almacenamiento está corrupto o no está disponible, comenzamos vacío.
    } finally {
      queueMicrotask(() => {
        if (!cancelled) hasLoadedTodos.current = true;
      });
    }

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!hasLoadedTodos.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // La aplicación sigue siendo utilizable aunque localStorage esté bloqueado.
    }
  }, [todos]);

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = inputValue.trim();
    if (!text) return;
    setTodos((currentTodos) => [{ id: crypto.randomUUID(), text, completed: false }, ...currentTodos]);
    setInputValue("");
  }

  function toggleTodo(id: string) {
    setTodos((currentTodos) => currentTodos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  function deleteTodo(id: string) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-6 sm:py-16">
      <section className="mx-auto w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /></svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Mis tareas</h1>
          <p className="mt-2 text-slate-500">Organiza tu día, una tarea a la vez.</p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
          <TodoForm value={inputValue} onChange={handleInputChange} onSubmit={addTodo} />

          <div className="flex items-center justify-between px-4 pb-2 pt-5 sm:px-6">
            <h2 className="text-sm font-semibold text-slate-700">Tu lista</h2>
            <span className="text-xs font-medium text-slate-400">{completedCount} de {todos.length} completadas</span>
          </div>

          {todos.length > 0 ? <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} /> : <EmptyState />}
        </div>
        <p className="mt-5 text-center text-xs text-slate-400">Tus tareas se guardan automáticamente en este dispositivo.</p>
      </section>
    </main>
  );
}
