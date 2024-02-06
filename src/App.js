// Components
import ConverterInputs from "./components/ConverterInputs";
import RatesList from "./components/RatesList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Routes, Route, Link } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="converter container">
        <h1 className="converter__text">Always get the real exchange rate</h1>

        <div className="route-links">
          <Link to={"/"}>Converter</Link>
          <Link to={"/rates"}>Rates</Link>
        </div>

        <Routes>
          <Route exact path="/" element={<ConverterInputs />} />
          <Route path="/rates" element={<RatesList />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
