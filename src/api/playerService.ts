import { apiClient } from "./axiosConfig";
import type { Player } from "../types/player";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchProducts = async (): Promise<Player[]> => {
    await delay(600);

    const response = await apiClient.get<{ data: Player[] }>("/players-data.json");
    return response.data.data;
};
