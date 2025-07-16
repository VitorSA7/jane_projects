'use client';

import { useState } from 'react';

interface ExamQuestion {
  id: string;
  imageUrl: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const sampleQuestions: ExamQuestion[] = [
  {
    id: '1',
    imageUrl: '/api/placeholder/300/200',
    question: 'Analisando esta amostra de escrita, qual característica é mais evidente?',
    options: [
      'Inclinação para a direita',
      'Pressão forte',
      'Margens irregulares',
      'Letras muito pequenas'
    ],
    correctAnswer: 0,
    explanation: 'A escrita apresenta uma inclinação consistente para a direita, indicando extroversão e sociabilidade.',
    category: 'Inclinação'
  },
  {
    id: '2',
    imageUrl: '/api/placeholder/300/200',
    question: 'O que você observa sobre o espaçamento entre as palavras nesta amostra?',
    options: [
      'Espaçamento muito apertado',
      'Espaçamento normal',
      'Espaçamento muito amplo',
      'Espaçamento irregular'
    ],
    correctAnswer: 2,
    explanation: 'As palavras apresentam espaçamento amplo, indicando independência e necessidade de espaço pessoal.',
    category: 'Espaçamento'
  },
  {
    id: '3',
    imageUrl: '/api/placeholder/300/200',
    question: 'Como você classificaria a pressão da escrita nesta amostra?',
    options: [
      'Pressão muito leve',
      'Pressão leve',
      'Pressão média',
      'Pressão forte'
    ],
    correctAnswer: 3,
    explanation: 'Os traços são profundos e marcados, indicando determinação e força de vontade.',
    category: 'Pressão'
  },
  {
    id: '4',
    imageUrl: '/api/placeholder/300/200',
    question: 'Qual aspecto da margem é mais notável nesta escrita?',
    options: [
      'Margem esquerda muito larga',
      'Margem direita muito estreita',
      'Margens irregulares',
      'Margens bem definidas'
    ],
    correctAnswer: 2,
    explanation: 'As margens são irregulares, indicando falta de organização e impulsividade.',
    category: 'Margens'
  },
  {
    id: '5',
    imageUrl: '/api/placeholder/300/200',
    question: 'O tamanho das letras nesta amostra sugere:',
    options: [
      'Extroversão e confiança',
      'Introversão e timidez',
      'Equilíbrio emocional',
      'Ansiedade e tensão'
    ],
    correctAnswer: 0,
    explanation: 'As letras são grandes, indicando extroversão, confiança e necessidade de ser notado.',
    category: 'Tamanho'
  }
];

export default function ExamePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  const handleStartExam = () => {
    setExamStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setExamCompleted(true);
    }
  };

  const handleRestartExam = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setExamStarted(false);
    setExamCompleted(false);
    setScore(0);
    setAnswers({});
  };

  const getGrade = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { grade: 'A', color: 'text-green-600', message: 'Excelente!' };
    if (percentage >= 80) return { grade: 'B', color: 'text-blue-600', message: 'Muito bom!' };
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-600', message: 'Bom!' };
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-600', message: 'Regular.' };
    return { grade: 'F', color: 'text-red-600', message: 'Precisa estudar mais.' };
  };

  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-4xl mb-4">📝</div>
          <h1 className="text-2xl font-semibold mb-4">Exame de Grafologia</h1>
          <p className="text-gray-600 mb-6">
            Teste seus conhecimentos analisando amostras de escrita reais. 
            Este exame contém {sampleQuestions.length} questões sobre diferentes aspectos da grafologia.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Instruções:</h3>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>• Analise cuidadosamente cada amostra de escrita</li>
              <li>• Escolha a resposta que melhor descreve a característica observada</li>
              <li>• Você receberá feedback após cada questão</li>
              <li>• O exame não tem limite de tempo</li>
            </ul>
          </div>

          <button
            onClick={handleStartExam}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 text-lg font-semibold"
          >
            Começar Exame
          </button>
        </div>
      </div>
    );
  }

  if (examCompleted) {
    const gradeInfo = getGrade(score, sampleQuestions.length);
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className="text-2xl font-semibold mb-4">Exame Concluído!</h1>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className={`text-6xl font-bold ${gradeInfo.color} mb-2`}>
              {gradeInfo.grade}
            </div>
            <div className="text-2xl font-semibold text-gray-800 mb-2">
              {score} de {sampleQuestions.length} acertos
            </div>
            <div className="text-lg text-gray-600 mb-4">
              {Math.round((score / sampleQuestions.length) * 100)}% de acerto
            </div>
            <div className={`text-lg font-semibold ${gradeInfo.color}`}>
              {gradeInfo.message}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Resumo por Categoria</h3>
              {['Inclinação', 'Espaçamento', 'Pressão', 'Margens', 'Tamanho'].map(category => {
                const categoryQuestions = sampleQuestions.filter(q => q.category === category);
                const categoryCorrect = categoryQuestions.filter(q => 
                  answers[q.id] === q.correctAnswer
                ).length;
                return (
                  <div key={category} className="flex justify-between text-sm mb-1">
                    <span>{category}:</span>
                    <span>{categoryCorrect}/{categoryQuestions.length}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Recomendações</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {score < sampleQuestions.length * 0.7 && (
                  <li>• Revise os conceitos básicos de grafologia</li>
                )}
                <li>• Continue praticando com o sistema SRS</li>
                <li>• Use o chatbot para tirar dúvidas específicas</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleRestartExam}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Fazer Exame Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Questão {currentQuestionIndex + 1} de {sampleQuestions.length}
          </span>
          <span className="text-sm font-semibold text-purple-600">
            {score} acertos
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / sampleQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-4">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
            {currentQuestion.category}
          </span>
        </div>

        {/* Image Placeholder */}
        <div className="bg-gray-100 rounded-lg p-8 mb-6 text-center">
          <div className="text-4xl mb-2">📄</div>
          <p className="text-gray-600">Amostra de Escrita</p>
          <p className="text-sm text-gray-500">(Imagem será carregada aqui)</p>
        </div>

        <h3 className="text-lg font-semibold mb-6 text-gray-800">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === index
                  ? showResult
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              } ${showResult ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'}`}
            >
              <span className="font-medium text-gray-700">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>

        {/* Result */}
        {showResult && (
          <div className={`rounded-lg p-4 mb-6 ${
            selectedAnswer === currentQuestion.correctAnswer 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              selectedAnswer === currentQuestion.correctAnswer ? 'text-green-800' : 'text-red-800'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer ? '✅ Correto!' : '❌ Incorreto'}
            </h4>
            <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center">
          {!showResult ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Responder
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              {currentQuestionIndex < sampleQuestions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 