import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-black text-slate-800 select-none">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 -mt-12 relative z-10">
                Coordenadas inválidas
            </h2>
            <p className="text-slate-400 mb-8 max-w-md">
                El recurso que buscas no existe o ha sido movido a otro sector del sistema.
            </p>

            <Link
                href="/"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all"
            >
                Regresar a Base
            </Link>
        </div>
    );
}
