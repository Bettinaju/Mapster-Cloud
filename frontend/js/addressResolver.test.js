// locationUtils.test.js

import {
  retrieveCoordinatesForAddress,
  retrieveAddressForCoordinates,
  populateIncompleteLocation,
} from './addressResolver';

global.fetch = jest.fn();

describe('retrieveCoordinatesForAddress', () => {
  it('should return coordinates for a given address', async () => {
    const mockResponse = [
      {
        lat: '52.5200',
        lon: '13.4050',
      },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const location = { street: 'Unter den Linden', zipCode: '10117' };
    const result = await retrieveCoordinatesForAddress(location);

    expect(result).toEqual({ ...location, lat: '52.5200', lon: '13.4050' });
  });

  it('should throw an error if the response status is not OK', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 404 });

    const location = { street: 'Unter den Linden', zipCode: '10117' };
    await expect(retrieveCoordinatesForAddress(location)).rejects.toThrow(
      '404'
    );
  });

  it('should throw an error if no coordinates are found', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{}],
    });

    const location = { street: 'Unter den Linden', zipCode: '10117' };
    await expect(retrieveCoordinatesForAddress(location)).rejects.toThrow(
      'No coordinates for given address.'
    );
  });
});

describe('retrieveAddressForCoordinates', () => {
  it('should return address for given coordinates', async () => {
    const mockResponse = {
      address: {
        road: 'Unter den Linden',
        city: 'Berlin',
        postcode: '10117',
      },
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const location = { lat: '52.5200', lon: '13.4050' };
    const result = await retrieveAddressForCoordinates(location);

    expect(result).toEqual({
      ...location,
      street: 'Unter den Linden',
      zipCode: '10117',
    });
  });

  it('should throw an error if the response status is not OK', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 404 });

    const location = { lat: '52.5200', lon: '13.4050' };
    await expect(retrieveAddressForCoordinates(location)).rejects.toThrow(
      '404'
    );
  });

  it('should throw an error if the address does not contain a road', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        return { address: {} };
      },
    });

    const location = { lat: '52.5200', lon: '13.4050' };
    await expect(retrieveAddressForCoordinates(location)).rejects.toThrow(
      'The given coordinates are invalid.'
    );
  });

  it('should throw an error if the city is not Berlin', async () => {
    const mockResponse = {
      address: {
        road: 'Unter den Linden',
        city: 'Munich',
        postcode: '10117',
      },
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const location = { lat: '52.5200', lon: '13.4050' };
    await expect(retrieveAddressForCoordinates(location)).rejects.toThrow(
      'The given location is not in Berlin.'
    );
  });
});

describe('populateIncompleteLocation', () => {
  it('should throw an error if neither address nor coordinates are provided', async () => {
    const location = {};
    await expect(populateIncompleteLocation(location)).rejects.toThrow(
      'Bitte entweder Straße und PLZ oder Längen-/Breitengrad eintragen.'
    );
  });
});
