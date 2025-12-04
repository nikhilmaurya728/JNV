import { useLocation, Link } from "react-router-dom";
import { questions } from "../data/questions";

// Define type for location state
interface LocationState {
  answers: string[];
}

const Result = () => {
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const answers: string[] = state?.answers || [];

  // Calculate score
  let score = 0;
  answers.forEach((ans: string, idx: number) => {
    if (ans === questions[idx].answer) score++;
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-green-600">
        Your Score: {score} / {questions.length}
      </h1>

      <div className="flex flex-col gap-4 items-center">
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
        >
          Go Home
        </Link>

        <h2 className="text-xl font-semibold text-gray-700">Correct Answers:</h2>
        <ul className="list-disc">
          {questions.map((q, idx) => (
            <li key={idx} className="text-gray-800">
              {q.question} → <span className="font-bold">{q.answer}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Result;
