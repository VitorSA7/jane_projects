export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Aprenda Grafologia de Forma Interativa
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Explore a ciência da análise da escrita através do nosso sistema completo de aprendizado. 
          Tire dúvidas com IA, revise conceitos importantes e teste seus conhecimentos.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Chatbot Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold mb-3">Chatbot IA</h3>
          <p className="text-gray-600 mb-4">
            Tire suas dúvidas sobre grafologia com nossa IA especializada. 
            Pergunte sobre técnicas, interpretações e conceitos.
          </p>
          <a 
            href="/chatbot/" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Começar Conversa
          </a>
        </div>

        {/* Aprendizado Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-3">Sistema SRS</h3>
          <p className="text-gray-600 mb-4">
            Revise conceitos importantes com nosso sistema de repetição espaçada. 
            Memorize detalhes essenciais da grafologia.
          </p>
          <a 
            href="/aprendizado/" 
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Estudar Agora
          </a>
        </div>

        {/* Exame Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-3">Exame Prático</h3>
          <p className="text-gray-600 mb-4">
            Teste seus conhecimentos analisando amostras de escrita reais. 
            Avalie se seu aprendizado está adequado.
          </p>
          <a 
            href="/exame/" 
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Fazer Exame
          </a>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Seu Progresso</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-gray-600">Perguntas Respondidas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">0</div>
            <div className="text-gray-600">Conceitos Revisados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">0</div>
            <div className="text-gray-600">Exames Realizados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">0%</div>
            <div className="text-gray-600">Taxa de Acerto</div>
          </div>
        </div>
      </div>
    </div>
  );
}
