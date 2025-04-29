import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
  const { projects } = usePage().props;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">Mis Proyectos</h1>
        <Link
          href={route('projects.create')}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md shadow"
        >
          + Crear Proyecto
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects
  .filter(project => project.role !== null) // <- Asegura que tenga rol
  .map((project) => (
    <div
      key={project.id}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{project.name}</h2>
        <span
          className={`inline-block px-2 py-1 text-sm font-medium rounded-full 
            ${project.role === 'Dueño' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
        >
          {project.role}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={route('projects.designs.index', project.id)}
          className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Ver Diseños
        </Link>

        <Link
          href={route('projects.collaborators.manage', project.id)}
          className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Colaboradores
        </Link>

        {project.role === 'Dueño' && (
          <>
            <Link
              href={route('projects.edit', project.id)}
              className="flex-1 text-center text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md border border-blue-600 hover:border-blue-800 text-sm font-medium"
            >
              Editar
            </Link>

            <Link
              as="button"
              method="delete"
              href={route('projects.destroy', project.id)}
              className="flex-1 text-center text-red-600 hover:text-red-800 px-3 py-2 rounded-md border border-red-600 hover:border-red-800 text-sm font-medium"
            >
              Eliminar
            </Link>
          </>
        )}
      </div>
    </div>
))}

      </div>
    </div>
  );
}
