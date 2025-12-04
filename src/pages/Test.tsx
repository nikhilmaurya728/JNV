import { useState } from "react";
import { questions } from "../data/questions"; // we'll create this next
import { useNavigate } from "react-router-dom";

const Test = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleNext = () => {
    setAnswers([...answers, selected]);
    setSelected("");
    if (current + 1 < questions.length) setCurrent(current + 1);
    else navigate("/result", { state: { answers: [...answers, selected] } });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{questions[current].question}</h2>
      <div className="flex flex-col gap-2">
        {questions[current].options.map((opt, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 border rounded ${
              selected === opt ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setSelected(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Test;
