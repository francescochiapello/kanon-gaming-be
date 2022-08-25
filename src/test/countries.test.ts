import getCountryByName from '../core/application/getCountryByName';
import getCountriesByPartialName from '../core/application/getCountriesByPartialName';

describe('Country', () => {
  it('should get the Italy record', async () => {
    const response = await getCountryByName('italy');
    expect(response.length).toEqual(1);
  });
  it('should get some countries', async () => {
    const names = ['ita', 'fra', 'en'];
    const response = await getCountriesByPartialName(names);
    expect(response.length).toBeGreaterThan(1);
  });
});