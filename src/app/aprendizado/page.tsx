'use client';

import { useState } from 'react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  nextReview?: Date;
  reviewCount: number;
}

const sampleCards: Flashcard[] = [
  {
    id: '1',
    question: 'O que significa quando a escrita tem inclinação para a direita?',
    answer: 'Indica extroversão, sociabilidade e otimismo. A pessoa tende a ser mais aberta e comunicativa.',
    category: 'Inclinação',
    difficulty: 'medium',
    reviewCount: 0
  },
  {
    id: '2',
    question: 'Como identificar a pressão da escrita?',
    answer: 'Analise a profundidade dos traços no papel. Pressão forte indica determinação, pressão leve sugere sensibilidade.',
    category: 'Pressão',
    difficulty: 'easy',
    reviewCount: 0
  },
  {
    id: '3',
    question: 'O que significa escrita com margens irregulares?',
    answer: 'Indica falta de organização, impulsividade e dificuldade em manter limites. Pode sugerir instabilidade emocional.',
    category: 'Margens',
    difficulty: 'hard',
    reviewCount: 0
  },
  {
    id: '4',
    question: 'Como analisar o tamanho das letras?',
    answer: 'Letras grandes indicam extroversão e confiança. Letras pequenas sugerem introversão e atenção aos detalhes.',
    category: 'Tamanho',
    difficulty: 'easy',
    reviewCount: 0
  },
  {
    id: '5',
    question: 'O que significa quando as letras são muito espaçadas?',
    answer: 'Indica independência, necessidade de espaço pessoal e pensamento analítico. Pode sugerir dificuldade em relacionamentos próximos.',
    category: 'Espaçamento',
    difficulty: 'medium',
    reviewCount: 0
  }
];

export default function AprendizadoPage() {
  const [cards, setCards] = useState<Flashcard[]>(sampleCards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyMode, setStudyMode] = useState<'review' | 'new'>('review');
  const [stats, setStats] = useState({
    totalReviewed: 0,
    correctAnswers: 0,
    streak: 0
  });

  const currentCard = cards[currentCardIndex];

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleRateCard = (rating: 'easy' | 'medium' | 'hard') => {
    const updatedCards = [...cards];
    const card = updatedCards[currentCardIndex];
    
    card.reviewCount += 1;
    card.lastReviewed = new Date();
    
    // Simular algoritmo SRS simples
    const daysToAdd = rating === 'easy' ? 7 : rating === 'medium' ? 3 : 1;
    card.nextReview = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
    
    setCards(updatedCards);
    setStats(prev => ({
      ...prev,
      totalReviewed: prev.totalReviewed + 1,
      correctAnswers: prev.correctAnswers + (rating === 'easy' ? 1 : 0),
      streak: rating === 'easy' ? prev.streak + 1 : 0
    }));
    
    // Próximo card
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
    setShowAnswer(false);
  };

  const filteredCards = cards.filter(card => {
    if (studyMode === 'review') {
      return card.nextReview && card.nextReview <= new Date();
    }
    return card.reviewCount === 0;
  });

  const availableCards = filteredCards.length > 0 ? filteredCards : cards;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-semibold mb-2">📚 Sistema de Aprendizado SRS</h1>
        <p className="text-green-100">Revise conceitos importantes de grafologia</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-green-600">{stats.totalReviewed}</div>
          <div className="text-gray-600 text-sm">Total Revisado</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-blue-600">{stats.correctAnswers}</div>
          <div className="text-gray-600 text-sm">Acertos</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-orange-600">{stats.streak}</div>
          <div className="text-gray-600 text-sm">Sequência</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-purple-600">{availableCards.length}</div>
          <div className="text-gray-600 text-sm">Disponíveis</div>
        </div>
      </div>

      {/* Study Mode Toggle */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
        <div className="flex space-x-4">
          <button
            onClick={() => setStudyMode('review')}
            className={`px-4 py-2 rounded-md ${
              studyMode === 'review'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Revisão ({cards.filter(c => c.nextReview && c.nextReview <= new Date()).length})
          </button>
          <button
            onClick={() => setStudyMode('new')}
            className={`px-4 py-2 rounded-md ${
              studyMode === 'new'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Novos ({cards.filter(c => c.reviewCount === 0).length})
          </button>
        </div>
      </div>

      {/* Flashcard */}
      {availableCards.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-4">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {currentCard.category} • {currentCard.difficulty}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {currentCard.question}
            </h3>
            
            {showAnswer && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-green-800 mb-2">Resposta:</h4>
                <p className="text-green-700">{currentCard.answer}</p>
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            {!showAnswer ? (
              <button
                onClick={handleShowAnswer}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Mostrar Resposta
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleRateCard('hard')}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Difícil
                </button>
                <button
                  onClick={() => handleRateCard('medium')}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Médio
                </button>
                <button
                  onClick={() => handleRateCard('easy')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Fácil
                </button>
              </>
            )}
          </div>

          <div className="text-center mt-4 text-sm text-gray-500">
            Card {currentCardIndex + 1} de {availableCards.length}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-semibold mb-2">Parabéns!</h3>
          <p className="text-gray-600">Você completou todos os cards disponíveis para hoje.</p>
        </div>
      )}

      {/* Progress */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-3">Progresso por Categoria</h3>
        <div className="space-y-2">
          {['Inclinação', 'Pressão', 'Margens', 'Tamanho', 'Espaçamento'].map(category => {
            const categoryCards = cards.filter(c => c.category === category);
            const reviewedCards = categoryCards.filter(c => c.reviewCount > 0);
            const progress = categoryCards.length > 0 ? (reviewedCards.length / categoryCards.length) * 100 : 0;
            
            return (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{category}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{reviewedCards.length}/{categoryCards.length}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 