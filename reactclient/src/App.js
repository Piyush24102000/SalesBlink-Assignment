import { Link } from 'react-router-dom';
import './App.css';
import { store } from './store';

function App() {
  const sequenceFromHistory = store((state) => state.sequenceFromHistory);

  return (
    <div>
      <div className="flex-grow container mx-auto flex flex-col md:flex-row items-center justify-center text-center px-4 py-16 bg-gray-50">
        <div className="w-full md:w-2/3 xl:w-1/2 bg-white bg-opacity-90 backdrop-blur-sm shadow-xl rounded-3xl p-8 md:p-12 lg:p-16">
          <h1 className="text-gray-900 text-4xl md:text-5xl xl:text-6xl font-extrabold mb-4">Elevate Your Email Marketing</h1>
          <p className="text-gray-700 text-lg md:text-xl xl:text-2xl mb-8">Craft compelling campaigns that captivate and convert.</p>
          <Link to="/create-sequence" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Create Sequence
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
