import React, { useState } from 'react';
import { router, usePage, Link } from '@inertiajs/react';

export default function Collaborators() {
  const { project, collaborators, allUsers } = usePage().props;
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleAddCollaborator = (e) => {
    e.preventDefault();
    if (!selectedUserId) return;
    router.post(route('projects.collaborators.add', project.id), {
      user_id: selectedUserId,
    });
  };

  const handleRemoveCollaborator = (userId) => {
    if (!confirm('¿Estás seguro de eliminar este colaborador?')) return;
    router.delete(
      route('projects.collaborators.remove', { project: project.id, user: userId })
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">
          Colaboradores de: <span className="text-blue-600">{project.name}</span>
        </h1>
        <Link
          href={route('projects.index')}
          className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow"
        >
          Volver a Proyectos
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agregar Colaborador</h2>
        <form onSubmit={handleAddCollaborator} className="flex flex-col sm:flex-row sm:items-center gap-4">
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full sm:flex-1 border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">-- Seleccionar Usuario --</option>
            {allUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow font-medium"
          >
            Agregar
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Colaboradores</h2>
        {collaborators.length === 0 ? (
          <p className="text-gray-500">No hay colaboradores todavía.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {collaborators.map((collab) => (
              <li key={collab.user_id} className="flex justify-between items-center py-3">
                <div className="text-gray-800">
                  {collab.user.name}{' '}
                  <span className="text-sm text-gray-500">({collab.user.email})</span>
                </div>
                <button
                  onClick={() => handleRemoveCollaborator(collab.user_id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
