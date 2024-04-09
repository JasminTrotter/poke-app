export const formatSearchResponse = (data: any) => ({
  image: data.sprites?.front_default || '',
  stats: findStats(data),
  name: data.species?.name || '',
  types: findTypes(data),
  id: data.id || '',
});

export const findStats = (data: any) => {
  if (!Array.isArray(data.stats)) {
    console.error(`missing stats array from search response: ${JSON.stringify(data)}`);
    return 0;
  }

  const stats: any = {
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0
  }

  const statLabels = ['hp', 'attack', 'defense', 'speed'];

  statLabels.forEach((statLabel: string) => {
    const statData = data.stats.find((s: any) => s.stat?.name === statLabel);

    if (!statData) return console.error(`missing ${statLabel} stat object in stats array from search response: ${JSON.stringify(data.stats)}`)
    if (statData.base_stat === undefined) console.error(`missing base_stat from ${statLabel} object in stats array from search response: ${JSON.stringify(statData)}`)

    stats[statLabel] = statData.base_stat;
  });

  return stats;
}

export const findTypes = (data: any) => {
  if (!Array.isArray(data.types)) {
    console.error(`missing types array from search response: ${JSON.stringify(data)}`);
    return [];
  }

  return data.types.map((t: any) => {
    if (!t.type) console.error(`missing type object in 'types' array from search response: ${JSON.stringify(data.types)}`)
    return t.type?.name || ''
  });
}