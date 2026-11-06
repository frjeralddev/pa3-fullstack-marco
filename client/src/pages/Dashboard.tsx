
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface Task {
    _id: string;
    titulo: string;
    descripcion: string;
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchTasks();
    }, [navigate, token]);

    const fetchTasks = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/tasks', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) setTasks(data.data);
        } catch (error: unknown) {
            console.error("Error al cargar tareas", error);
            handleLogout();
        }
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ titulo, descripcion })
            });
            if (res.ok) {
                setTitulo('');
                setDescripcion('');
                fetchTasks();
            }
        } catch (error: unknown) {
            console.error("Error al crear tarea", error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchTasks();
        } catch (error: unknown) {
            console.error("Error al eliminar tarea", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-secondary font-agency-body">

            <header className="border-b border-border/60">
                <div className="max-w-6xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">

                    <span className="text-xl font-bold tracking-tight text-brand-white">
                        TASKMark<span className="text-primary">FLOW.</span>
                    </span>

                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-muted hover:text-primary transition-colors duration-200 cursor-pointer"
                    >
                        <span>Cerrar sesión</span>
                    </button>

                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16">

                <section className="mb-12">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Panel principal
                    </span>

                    <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-brand-white leading-tight">
                        Organiza tus ideas.
                        <span className="block text-primary">
                            Haz que sucedan.
                        </span>
                    </h1>

                    <p className="mt-4 text-sm sm:text-base text-muted max-w-lg leading-relaxed">
                        Administra tus actividades y mantén tus tareas organizadas desde un solo lugar.
                    </p>
                </section>

                <section className="mb-10">
                    <div className="bg-third border border-border/70 rounded-2xl p-6 sm:p-8 flex items-center justify-between gap-4">

                        <div>
                            <p className="text-sm text-muted font-medium">
                                Tareas registradas
                            </p>

                            <p className="mt-2 text-4xl font-bold text-brand-white tabular-nums">
                                {tasks.length.toString().padStart(2, '0')}
                            </p>
                        </div>

                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="text-2xl text-primary">≡</span>
                        </div>

                    </div>
                </section>

                <section className="mb-12">
                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-brand-white">
                            Nueva tarea<span className="text-primary">.</span>
                        </h2>

                        <p className="mt-1 text-sm text-muted">
                            Añade una nueva actividad a tu lista.
                        </p>
                    </div>

                    <form
                        onSubmit={handleCreateTask}
                        className="bg-third border border-border/70 rounded-2xl p-6 sm:p-8 shadow-lg shadow-black/10"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div>
                                <label className="block text-sm font-medium text-brand-white mb-2">
                                    Título
                                </label>

                                <input
                                    type="text"
                                    placeholder="Ej. Diseñar interfaz"
                                    required
                                    className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-sm text-brand-white outline-none transition duration-200 focus:ring-2 focus:ring-primary/15"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-brand-white mb-2">
                                    Descripción
                                </label>

                                <input
                                    type="text"
                                    placeholder="Describe brevemente la tarea"
                                    required
                                    className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted/70 outline-none transition duration-200 focus:ring-2 focus:ring-primary/15"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-primary text-brand-white px-8 py-3.5 rounded-xl font-semibold text-sm transition duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/15 active:scale-[0.99] cursor-pointer"
                            >
                                + Agregar tarea
                            </button>
                        </div>
                    </form>
                </section>

                <section>

                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-xl font-bold text-brand-white">
                                Mis tareas<span className="text-primary">.</span>
                            </h2>

                            <p className="mt-1 text-sm text-muted">
                                Todas tus actividades en un mismo lugar.
                            </p>
                        </div>

                        <span className="text-xs font-semibold text-muted bg-third border border-border px-3 py-2 rounded-lg">
                            {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
                        </span>
                    </div>

                    <div className="grid gap-4">

                        {tasks.length === 0 ? (

                            <div className="bg-third border border-border/70 rounded-2xl px-6 py-12 text-center">
                                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-2xl text-primary">+</span>
                                </div>

                                <h3 className="text-base font-semibold text-brand-white">
                                    Todavía no tienes tareas
                                </h3>

                                <p className="mt-2 text-sm text-muted max-w-sm mx-auto leading-relaxed">
                                    Comienza agregando una nueva actividad.
                                    Tus tareas aparecerán aquí.
                                </p>
                            </div>

                        ) : (

                            tasks.map((task) => (
                                <article
                                    key={task._id}
                                    className="group bg-third border border-border/70 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-5 transition duration-200 hover:border-primary/50"
                                >

                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-base text-brand-white wrap-break-word">
                                            {task.titulo}
                                        </h3>

                                        <p className="text-sm text-muted mt-2 leading-relaxed wrap-break-word">
                                            {task.descripcion}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="shrink-0 text-primary text-sm font-semibold px-4 py-2.5 border border-primary/30 rounded-xl hover:bg-primary/10 hover:border-primary/60 transition duration-200 cursor-pointer w-full sm:w-auto"
                                    >
                                        Eliminar
                                    </button>

                                </article>
                            ))

                        )}

                    </div>
                </section>

                <footer className="mt-16 pt-6 border-t border-border/60">
                    <p className="text-xs text-muted text-center">
                        TASKMarkFLOW. · Organiza tus ideas, haz que sucedan.
                    </p>
                </footer>

            </main>
        </div>
    );
}
