<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProjectController extends Controller
{
    use AuthorizesRequests;

//     public function index()
//     {
//     $userId = Auth::id();

//     $projects = Project::with('collaborators')->get()->map(function ($project) use ($userId) {
//         $role = $project->owner_id === $userId ? 'Dueño' : (
//             $project->collaborators->contains('id', $userId) ? 'Colaborador' : null
//         );

//         return [
//             'id' => $project->id,
//             'name' => $project->name,
//             'role' => $role,
//         ];
//     });

//     return Inertia::render('Projects/Index', [
//         'projects' => $projects,
//     ]);
// }
public function index()
{
    $userId = Auth::id();

    $projects = Project::with('collaborators')
        ->where('owner_id', $userId)
        ->orWhereHas('collaborators', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->get()
        ->map(function ($project) use ($userId) {
            $role = $project->owner_id === $userId ? 'Dueño' : 'Colaborador';

            return [
                'id' => $project->id,
                'name' => $project->name,
                'role' => $role,
            ];
        });

    return Inertia::render('Projects/Index', [
        'projects' => $projects,
    ]);
}


    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Project::create([
            'name' => $request->name,
            'owner_id' => Auth::id(),
        ]);

        return redirect()->route('projects.index')->with('success', 'Proyecto creado exitosamente.');
    }

    public function edit(Project $project)
    {
        $this->authorize('update', $project);

        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $project->update([
            'name' => $request->name,
        ]);

        return redirect()->route('projects.index')->with('success', 'Proyecto actualizado.');
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);

        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Proyecto eliminado.');
    }
}
