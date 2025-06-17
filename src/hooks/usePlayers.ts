import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import type { Player } from "../types/player";
import { fetchPlayers } from "../api/playerService";

export const usePlayerSearch = () => {
    const [term, setTerm] = useState<string>("");
    const [ageFilter, setAgeFilter] = useState<number | "All">("All");
    const [clubFilter, setClubFilter] = useState<string>("All");

    const {
        data: players = [],
        isLoading,
        isError,
        error: queryError,
        refetch,
    } = useQuery<Player[], Error>({
        queryKey: ["players"],
        queryFn: fetchPlayers,
        staleTime: 1000 * 60 * 5,
        retry: 2,
        // always load once, filters run in-memory
        enabled: true,
    });

    // 1) fuzzy‐search by name
    const searched = useMemo<Player[]>(() => {
        const q = term.trim();
        if (!q) return players;
        const fuse = new Fuse(players, {
            keys: ["name"],
            threshold: 0.3,
            distance: 100,
        });
        return fuse.search(q).map((r) => r.item);
    }, [players, term]);

    // 2) apply age & club filters
    const results = useMemo<Player[]>(() => {
        return searched.filter((p) => {
            const ageOK = ageFilter === "All" || p.age === ageFilter;
            const clubOK = clubFilter === "All" || p.club === clubFilter;
            return ageOK && clubOK;
        });
    }, [searched, ageFilter, clubFilter]);

    const hasNoMatches = !isLoading && !isError && results.length === 0 && term.trim() !== "";

    return {
        // inputs
        term,
        setTerm,
        ageFilter,
        setAgeFilter,
        clubFilter,
        setClubFilter,

        // data + state
        players, // raw list (for dropdown options)
        results, // filtered
        isLoading,
        isError,
        error: queryError?.message ?? null,
        hasNoMatches,
        refetch,
    };
};
