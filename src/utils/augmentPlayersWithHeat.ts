import type { Player, HeatmapPoint } from "../types/player";

export function getPlayersWithHeat(rawPlayers: Player[], pointCount = 200): Player[] {
    return rawPlayers.map((player) => {
        const { defensive_third: d, middle_third: m, attacking_third: a } = player.metrics.physical_efficiency.heatmap_third_percentages;

        // Calculate number of points per region based on percentages
        const countDef = Math.round((d / 100) * pointCount);
        const countMid = Math.round((m / 100) * pointCount);
        const countAtt = pointCount - countDef - countMid;

        // Regions in percentage of pitch width
        const third = 100 / 3;
        const defRangePct: [number, number] = [0, third];
        const midRangePct: [number, number] = [third, third * 2];
        const attRangePct: [number, number] = [third * 2, 100];

        const points: HeatmapPoint[] = [];

        function genPoints(num: number, rangePct: [number, number]) {
            const [pctMin, pctMax] = rangePct;
            for (let i = 0; i < num; i++) {
                // random percentage within region
                const pctX = pctMin + Math.random() * (pctMax - pctMin);
                const pctY = Math.random() * 100;
                // map percentage [0-100] to coordinate [5-95]
                const x = 5 + (pctX / 100) * 90;
                const y = 5 + (pctY / 100) * 90;
                const value = 0.2 + Math.random() * 0.8;
                points.push({ x, y, value });
            }
        }

        // generate points
        genPoints(countDef, defRangePct);
        genPoints(countMid, midRangePct);
        genPoints(countAtt, attRangePct);

        return {
            ...player,
            heatmap_points: points,
        };
    });
}
