import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">JNV Pathshala</h1>
      <Link to="/test" className="bg-blue-500 text-white px-6 py-3 rounded">
        Start Test
      </Link>
    </div>
  );
};

export default Home;
