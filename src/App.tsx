
import Products from "./components/Products"

function App() {
  return (
    <div className="min-w-screen min-h-screen bg-cyan-200">
      <div className="flex flex-col items-center gap-10 max-sm:px-4">
        <h1 className="text-red-400 text-[52px] pb-10">
          Home Page
        </h1>
        <Products />
      </div>
    </div>
  );
}

export default App;
