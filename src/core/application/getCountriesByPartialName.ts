import apiService from '../../infrastructure/external/apiService';
import logger from '../../infrastructure/logger/logger';

export default async function getCountriesByPartialName(names: string[]) {
  logger.debug('Use case invoked `getCountriesByPartialName`');

  const results = [];
  for (const name of names) {
    const url = `/name/${name}`;
    const partialResults = await apiService.get(url);
    results.push(partialResults);
  }

  return results;
}