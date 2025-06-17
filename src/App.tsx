import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";

const Watchlist = () => <h2>Watchlist Page</h2>;
const LeedsSquad = () => <h2>Leeds Squad Page</h2>;

const App: React.FC = () => (
    <div className="m-auto" id="app">
        <Navbar />
        <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/leeds-squad" element={<LeedsSquad />} />
        </Routes>
    </div>
);

export default App;
