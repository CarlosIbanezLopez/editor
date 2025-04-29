import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import CanvasBoard from '@/Pages/Designs/CanvasBoard';

export default function Editor() {
  const { project, design } = usePage().props;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-8">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-700">Editor de Diseño</h1>
          <div className="mt-2 space-x-4 text-indigo-600">
            <span>
              Proyecto: <span className="font-medium text-indigo-800">{project.name}</span>
            </span>
            <span>
              Diseño: <span className="font-medium text-indigo-800">{design.name}</span>
            </span>
          </div>
        </div>
        <Link
          href={route('projects.designs.index', project.id)}
          className="mt-4 sm:mt-0 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md shadow"
        >
          Volver a Diseños
        </Link>
      </header>

      <main className="bg-white shadow-sm rounded-lg p-4 h-[calc(100vh-200px)] overflow-hidden">
        <CanvasBoard
          initialElements={design.canvas_data ? JSON.parse(design.canvas_data) : []}
          designId={design.id}
          design={design}
        />
      </main>
    </div>
  );
}
