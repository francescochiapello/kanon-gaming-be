import apiService from '../../infrastructure/external/apiService';
import logger from '../../infrastructure/logger/logger';

export default async function getCountryByName(name: string) {
  logger.debug('Use case invoked `getCountryByName`');
  const url = `/name/${name}?fullText=true`;
  return await apiService.get(url);
}