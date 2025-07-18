'use client';

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Erro interno</h2>
        <p className="text-gray-600 mb-8">Algo deu errado. Tente novamente.</p>
        <div className="space-x-4">
          <a 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
} 