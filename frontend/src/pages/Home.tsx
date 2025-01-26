import { useState } from "react";
import { QuizFlow } from "@/components/QuizFlow";
import ActivityResults from "@/components/ActivityResults";
import { LandingPage } from "@/components/LandingPage";

export interface Answers {
  [key: string]: string | string[];
}

const Home = () => {
  const [step, setStep] = useState<"landing" | "quiz" | "results">("landing");
  const [userAnswers, setUserAnswers] = useState<Answers>({});

  const handleQuizComplete = (answers: Answers) => {
    setUserAnswers(answers);
    setStep("results");
  };

  return (
    <main className="w-full min-h-screen bg-gray-900">
      {step === "landing" && <LandingPage onStart={() => setStep("quiz")} />}
      {step === "quiz" && (
        <QuizFlow
          onComplete={handleQuizComplete}
          initialAnswers={userAnswers}
        />
      )}
      {step === "results" && (
        <ActivityResults
          answers={userAnswers}
          onReset={() => {
            setUserAnswers({});
            setStep("landing");
          }}
        />
      )}
    </main>
  );
};

export default Home;
