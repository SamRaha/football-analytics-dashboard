// src/api/playerService.ts

import { apiClient } from "./axiosConfig";
import type { Player } from "../types/player";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchPlayers = async (): Promise<Player[]> => {
    await delay(600);

    // 1) Tell axios that the JSON endpoint returns Player[]
    const response = await apiClient.get<Player[]>("/players-data.json");
    // 2) response.data is now Player[], so return that
    return response.data;
};
