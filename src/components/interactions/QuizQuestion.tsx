'use client';

import { useState, useCallback } from 'react';
import { quizBank } from '@/data/quiz-bank';
import { FeedbackMessage, FeedbackOverlay } from '@/components/ui/FeedbackOverlay';
import { Button } from '@/components/ui/Button';

interface QuizQuestionProps {
  questionIds: string[];
  showScore?: boolean;
  onComplete: () => void;
}

export function QuizQuestion({ questionIds, showScore = false, onComplete }: QuizQuestionProps) {
  const questions = questionIds.map(id => quizBank.find(q => q.id === id)).filter(Boolean) as typeof quizBank;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; message?: string } | null>(null);
  const [overlayType, setOverlayType] = useState<'correct' | 'incorrect' | null>(null);

  const question = questions[currentIndex];
  const allDone = currentIndex >= questions.length;

  const handleAnswer = useCallback((optionIndex: number) => {
    if (answered || !question) return;

    setSelectedOption(optionIndex);
    setAnswered(true);

    const isCorrect = question.options[optionIndex].correct;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setFeedback({ type: 'correct', message: question.explanation });
      setOverlayType('correct');
    } else {
      setFeedback({ type: 'incorrect', message: question.explanation });
      setOverlayType('incorrect');
    }
  }, [answered, question]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => prev + 1);
    setSelectedOption(null);
    setAnswered(false);
    setFeedback(null);
  }, []);

  if (allDone) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-6">
        <div className="text-center animate-bounce-in">
          <div className="text-5xl mb-4">
            {correctCount === questions.length ? '🌟' : correctCount >= questions.length * 0.7 ? '⭐' : '💪'}
          </div>
          {showScore && (
            <div className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-fredoka)' }}>
              {correctCount} / {questions.length}
            </div>
          )}
          <div className="text-lg font-semibold mb-1" style={{ fontFamily: 'var(--font-fredoka)' }}>
            {correctCount === questions.length
              ? 'Perfect!'
              : correctCount >= questions.length * 0.7
              ? 'Great job!'
              : 'Keep learning!'}
          </div>
          <p className="text-sm text-dim">
            {correctCount === questions.length
              ? 'You got every question right.'
              : `You got ${correctCount} out of ${questions.length} correct.`}
          </p>
        </div>
        <Button onClick={onComplete} size="lg" className="mt-6">
          Continue →
        </Button>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="text-sm text-dim">
          Question {currentIndex + 1} of {questions.length}
        </span>
        {showScore && (
          <span className="text-sm font-semibold text-correct">
            {correctCount} correct
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-lg mx-auto">
          <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-fredoka)' }}>
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              let stateClass = '';
              if (answered) {
                if (option.correct) {
                  stateClass = 'eco-card-correct animate-correct';
                } else if (i === selectedOption && !option.correct) {
                  stateClass = 'eco-card-incorrect animate-shake';
                } else {
                  stateClass = 'opacity-50';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={`
                    touch-target eco-card w-full p-4 text-left text-base font-semibold
                    transition-all duration-200
                    ${stateClass}
                    ${!answered ? 'active:scale-98' : ''}
                  `}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                      ${answered && option.correct ? 'bg-correct text-white' : ''}
                      ${answered && i === selectedOption && !option.correct ? 'bg-incorrect text-white' : ''}
                      ${!answered ? 'bg-surface text-dim' : ''}
                      ${answered && i !== selectedOption && !option.correct ? 'bg-surface text-dim' : ''}
                    `}>
                      {answered && option.correct ? '✓' :
                       answered && i === selectedOption && !option.correct ? '✗' :
                       String.fromCharCode(65 + i)}
                    </span>
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {answered && feedback && (
            <div className="mt-4 animate-slide-in">
              <FeedbackMessage
                type={feedback.type}
                title={feedback.type === 'correct' ? 'You got it' : 'Let’s fix it'}
                message={feedback.message}
              />
            </div>
          )}
        </div>
      </div>

      {answered && (
        <div className="px-6 py-4 border-t border-surface">
          <Button onClick={handleNext} size="lg" className="w-full">
            {currentIndex < questions.length - 1 ? 'Next Question →' : 'Finish →'}
          </Button>
        </div>
      )}

      <FeedbackOverlay
        type={overlayType}
        onDone={() => setOverlayType(null)}
      />
    </div>
  );
}
