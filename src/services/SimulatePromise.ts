import json from './server.json';

function simulatePromise<T>({ data, ms }: { data: T, ms: number }) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, data);
    }) as Promise<T>;
}

export async function getPlants() {
    return await simulatePromise({ data: json.plants, ms: 700 });
}

export async function getPlantsEnvironments() {
    return await simulatePromise({ data: json.plants_environments, ms: 700 });
}

export async function getPlantsWaterFrequencies() {
    return await simulatePromise({ data: json.plants_water_frequencies, ms: 700 });
}