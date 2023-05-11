import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-gradient-to-r from-cyan-300 to-indigo-500">
      <h1 className="text-3xl font-bold mb-5 text-white">Handwrite Detector</h1>
      <Board />
    </div>
  );
}

export default App;
