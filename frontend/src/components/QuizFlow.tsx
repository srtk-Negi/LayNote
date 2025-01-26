import React, { useState } from "react";
import { Question } from "../types";
import { Button } from "./ui/button";
import { Answers } from "@/pages/Home";
import { Calendar } from "./ui/calendar";

const layoverQuestions: Question[] = [
  {
    id: "flightNumber",
    question: "What is your flight number?",
    type: "text",
    placeholder: "Enter your flight number here",
  },
  {
    id: "flightNumber2",
    question: "What is your second flight number?",
    type: "text",
    placeholder: "Enter your second flight number here",
  },
  {
    id: "departureDate",
    question: "What is your departure date?",
    type: "date",
    placeholder: "Enter your departure date here",
  },
  {
    id: "activityType",
    question: "What type of activities are you interested in?",
    type: "multiple",
    options: [
      "Entertainment",
      "Dining",
      "Light eats",
      "Relaxation",
      "Wellness",
      "Live music",
      "Shopping",
      "Enrichment",
    ],
  },
  {
    id: "atmosphere",
    question: "What atmosphere would you prefer?",
    type: "single",
    options: [
      "Quiet and relaxing",
      "Social and lively",
      "Casual and laid-back",
    ],
  },
  {
    id: "energy",
    question: "How much energy do you currently have for activities?",
    type: "single",
    options: [
      "I'd prefer something low-key and relaxing",
      "I'm up for a moderate amount of activity",
      "I'm ready for something active and exciting",
    ],
  },
  {
    id: "freeResponse",
    question: "What are you looking to get out of your layover?",
    type: "text",
    placeholder: "Enter your response here",
  },
];

interface QuizFlowProps {
  onComplete: (answers: Answers) => void;
  initialAnswers: Answers;
}

export const QuizFlow = ({ onComplete, initialAnswers }: QuizFlowProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [manualAnswer, setManualAnswer] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [date, setDate] = React.useState<Date>(new Date());

  const handleSingleAnswer = (answer: string) => {
    const newAnswers = {
      ...answers,
      [layoverQuestions[currentQuestion].id]: answer,
    };
    setAnswers(newAnswers);
    goToNextQuestion(newAnswers);
  };

  const handleMultipleAnswer = (answer: string) => {
    const currentAnswers = answers[layoverQuestions[currentQuestion].id] || [];
    const newAnswers = {
      ...answers,
      [layoverQuestions[currentQuestion].id]: [...currentAnswers, answer],
    };
    setAnswers(newAnswers);
    goToNextQuestion(newAnswers);
  };

  const handleManualAnswer = (answer: string) => {
    const newAnswers = {
      ...answers,
      [layoverQuestions[currentQuestion].id]: answer,
    };
    setAnswers(newAnswers);
    goToNextQuestion(newAnswers);
  };

  const handleDateAnswer = () => {
    const newAnswers = {
      ...answers,
      [layoverQuestions[currentQuestion].id]: date.toISOString().split("T")[0],
    };
    setAnswers(newAnswers);
    goToNextQuestion(newAnswers);
  };

  const goToNextQuestion = (updatedAnswers = answers) => {
    if (currentQuestion === layoverQuestions.length - 1) {
      onComplete(updatedAnswers);
    } else {
      setCurrentQuestion((curr) => curr + 1);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-8 bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {layoverQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-full h-1 mx-1 rounded ${
                  index <= currentQuestion ? "bg-violet-100" : "bg-violet-500"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-right text-gray-400">
            {currentQuestion + 1} of {layoverQuestions.length}
          </p>
        </div>

        <div className="rounded-xl p-6 md:p-8 shadow-sm border bg-gray-800 border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">
            {layoverQuestions[currentQuestion].question}
          </h2>

          <div>
            {layoverQuestions[currentQuestion].type === "multiple" && (
              <div>
                {layoverQuestions[currentQuestion].options!.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelectedOptions([...selectedOptions, option])
                      }
                      className={`w-full text-left p-4 rounded-lg border-2 border-gray-700 hover:border-violet-400 hover:bg-gray-700 transition-all duration-200 ${
                        selectedOptions.includes(option) ? "bg-violet-500" : ""
                      }`}
                    >
                      {option}
                    </button>
                  )
                )}
                <Button
                  onClick={() =>
                    handleMultipleAnswer(selectedOptions.join(", "))
                  }
                  className="mt-8 w-full p-4 rounded-lg bg-violet-500 hover:bg-violet-400 transition-all duration-200"
                  disabled={selectedOptions.length === 0}
                >
                  Next
                </Button>
              </div>
            )}

            {layoverQuestions[currentQuestion].type === "single" &&
              layoverQuestions[currentQuestion].options!.map(
                (option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSingleAnswer(option)}
                    className="w-full text-left p-4 rounded-lg border-2 border-gray-700 hover:border-violet-400 hover:bg-gray-700 transition-all duration-200"
                  >
                    {option}
                  </button>
                )
              )}

            {layoverQuestions[currentQuestion].type === "text" && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder={layoverQuestions[currentQuestion].placeholder}
                  className="w-full p-4 rounded-lg border-2 border-gray-700 bg-gray-800 text-white"
                  onChange={(e) => setManualAnswer(e.target.value)}
                />
                <Button
                  onClick={() => handleManualAnswer(manualAnswer)}
                  className="mt-8 w-full p-4 rounded-lg bg-violet-500 hover:bg-violet-400 transition-all duration-200"
                  disabled={manualAnswer.length === 0}
                >
                  Next
                </Button>
              </div>
            )}

            {layoverQuestions[currentQuestion].type === "date" && (
              <div className="mt-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                <Button
                  onClick={() => handleDateAnswer()}
                  className="mt-8 w-full p-4 rounded-lg bg-violet-500 hover:bg-violet-400 transition-all duration-200"
                  disabled={manualAnswer.length === 0}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
