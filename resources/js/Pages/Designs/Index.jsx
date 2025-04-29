import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
  const { project, designs } = usePage().props;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">
          Diseños de: <span className="text-blue-600">{project.name}</span>
        </h1>
        <Link
          href={route('projects.designs.create', project.id)}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow"
        >
          + Crear Diseño
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <div
            key={design.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
              {design.name}
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={route('designs.edit', design.id)}
                className="flex-1 text-center text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md border border-blue-600 hover:border-blue-800 text-sm font-medium"
              >
                Editar
              </Link>

              <Link
                as="button"
                method="delete"
                href={route('designs.destroy', design.id)}
                className="flex-1 text-center text-red-600 hover:text-red-800 px-3 py-2 rounded-md border border-red-600 hover:border-red-800 text-sm font-medium"
              >
                Eliminar
              </Link>

              <Link
                href={route('designs.editor', design.id)}
                className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Abrir Editor
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
