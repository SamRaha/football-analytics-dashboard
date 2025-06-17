// src/hooks/usePlayerSearch.ts
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import type { Player } from "../types/player";
import { fetchPlayers } from "../api/playerService";

export const usePlayerSearch = () => {
    const [term, setTerm] = useState<string>("");

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
        enabled: term.trim() !== "",
    });

    const results = useMemo<Player[]>(() => {
        const q = term.trim();
        if (!q) return players;

        const fuse = new Fuse(players, {
            keys: ["name"],
            threshold: 0.3,
            distance: 100,
        });

        return fuse.search(q).map((r) => r.item);
    }, [players, term]);

    const hasNoMatches = !isLoading && !isError && term.trim() !== "" && results.length === 0;

    return {
        term,
        setTerm,
        results,
        isLoading,
        isError,
        error: queryError?.message ?? null,
        hasNoMatches,
        refetch,
    };
};
