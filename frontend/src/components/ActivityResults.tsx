import { Answers } from "@/pages/Home";
import { useEffect, useState } from "react";
import LLMResponseDisplay from "../components/LLMResponseDisplay";
import { Button } from "./ui/button";

interface ActivityResultsProps {
  answers: Answers;
  onReset: () => void;
}

const LLMResponsePage = ({ answers, onReset }: ActivityResultsProps) => {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [activityType, airport, atmosphere, duration, energy, freeResponse] =
    Object.values(answers);

  const getLLMResponse = async (
    activityType: string | string[],
    airport: string | string[],
    atmosphere: string | string[],
    duration: string | string[],
    energy: string | string[],
    freeResponse: string | string[]
  ) => {
    if (typeof activityType === "object") {
      activityType = activityType.join(", ");
    }

    const body = {
      activityType,
      airport,
      atmosphere,
      duration,
      energy,
      freeResponse,
    };

    console.log(body);

    await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getLLMResponse(
      activityType,
      airport,
      atmosphere,
      duration,
      energy,
      freeResponse
    );
  }, [activityType, airport, atmosphere, duration, energy, freeResponse]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {isLoading ? (
        <div className="text-center">
          <p className="text-lg font-semibold">Loading LLM response...</p>
        </div>
      ) : (
        <LLMResponseDisplay response={response} />
      )}
      <Button onClick={onReset} className="mt-8 mx-auto block">
        Start Over
      </Button>
    </div>
  );
};

export default LLMResponsePage;
