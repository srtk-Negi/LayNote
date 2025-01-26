import type React from "react";
import ReactMarkdown from "react-markdown";

interface LLMResponseDisplayProps {
  response: string;
}

const LLMResponseDisplay: React.FC<LLMResponseDisplayProps> = ({
  response,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">LLM Response</h1>
      <div className="bg-gray-50 p-4 rounded-md">
        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
          <ReactMarkdown>{response}</ReactMarkdown>
        </pre>
      </div>
    </div>
  );
};

export default LLMResponseDisplay;
