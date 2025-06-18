// src/pages/Search.tsx
import React, { useMemo } from "react";
import { Form } from "react-bootstrap";
import { usePlayerSearch } from "../hooks/usePlayers";
import Results from "../components/Results";
import "./Search.scss";

const Search: React.FC = () => {
    const { term, setTerm, ageFilter, setAgeFilter, clubFilter, setClubFilter, results, isLoading, hasNoMatches } = usePlayerSearch();

    const ages = useMemo<number[]>(() => {
        return Array.from(new Set(results.map((p) => p.age))).sort((a, b) => a - b);
    }, [results]);

    const clubs = useMemo<string[]>(() => {
        return Array.from(new Set(results.map((p) => p.club))).sort();
    }, [results]);

    return (
        <div id="search">
            <div className="search-container">
                <div className="content">
                    <h2 className="mb-4">Player Search</h2>
                    <Form className="d-flex gap-2 search-filters">
                        <Form.Control placeholder="Search by name…" value={term} onChange={(e) => setTerm(e.target.value)} />
                        <Form.Select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value === "All" ? "All" : +e.target.value)}>
                            <option value="All">All Ages</option>
                            {ages.map((age) => (
                                <option key={age} value={age}>
                                    {age}
                                </option>
                            ))}
                        </Form.Select>

                        <Form.Select value={clubFilter} onChange={(e) => setClubFilter(e.target.value)}>
                            <option value="All">All Clubs</option>
                            {clubs.map((club) => (
                                <option key={club} value={club}>
                                    {club}
                                </option>
                            ))}
                        </Form.Select>
                    </Form>
                </div>
            </div>
            <Results players={results} isLoading={isLoading} hasNoMatches={hasNoMatches} />
        </div>
    );
};

export default Search;
