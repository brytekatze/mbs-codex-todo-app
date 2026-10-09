export function EmptyState() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5h6m-7 4h8m-8 4h5m-8-9h.01M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" /></svg>
      </div>
      <p className="text-sm font-medium text-slate-600">No tienes tareas pendientes</p>
      <p className="mt-1 text-xs text-slate-400">Agrega una tarea para comenzar.</p>
    </div>
  );
}
