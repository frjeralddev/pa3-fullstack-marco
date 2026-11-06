import { useState } from 'react';
import { useNavigate, Link } from 'react-router';

export default function Register() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password })
            });
            
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Error al registrar');
            
            navigate('/login');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error inesperado al registrar');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary px-5 py-12 font-agency-body">

            <form
                onSubmit={handleRegister}
                className="w-full max-w-md bg-third border border-border/70 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/20"
            >
                <div className="mb-9">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Bienvenido
                    </span>

                    <h2 className="mt-3 text-4xl font-bold tracking-tight text-brand-white">
                        Crear cuenta<span className="text-primary">.</span>
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-muted">
                        Completa tus datos y comienza a formar parte de nuestra comunidad.
                    </p>
                </div>

                {error && (
                    <p className="bg-primary/10 border border-primary/40 text-primary px-4 py-3 rounded-lg mb-6 text-sm">
                        {error}
                    </p>
                )}

                <div className="space-y-5 mb-8">

                    <div>
                        <label className="block text-sm font-medium text-brand-white mb-2">
                            Nombre completo
                        </label>

                        <input
                            type="text"
                            placeholder="Ingresa tu nombre"
                            required
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-brand-white text-sm outline-none transition duration-200 focus:ring-2 focus:ring-primary/15"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-brand-white mb-2">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-brand-white text-sm outline-none transition duration-200 focus:ring-2 focus:ring-primary/15"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-brand-white mb-2">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-brand-white text-sm outline-none transition duration-200 focus:ring-2 focus:ring-primary/15"
                        />
                    </div>

                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-brand-white py-3.5 rounded-xl font-semibold text-sm transition duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/15 active:scale-[0.99] cursor-pointer"
                >
                    Crear mi cuenta
                </button>

                <div className="mt-8 pt-6 border-t border-border/60">
                    <p className="text-center text-sm text-muted">
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                            to="/login"
                            className="text-primary font-semibold hover:text-red-400 transition-colors"
                        >
                            Inicia sesión
                        </Link>
                    </p>
                </div>

            </form>
        </div>
    );
}
