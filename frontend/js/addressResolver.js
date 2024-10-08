export const retrieveCoordinatesForAddress = async (locationWithoutCoords) => {
  const { street, zipCode } = locationWithoutCoords;
  const addressString = `${street}, ${zipCode} Berlin`;
  const url = `https://nominatim.openstreetmap.org/search?q=${addressString}&format=json`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(response.status);

  const geoData = await response.json();
  const locEntry = geoData?.[0];
  if (!locEntry?.lat) throw new Error('No coordinates for given address.');

  const { lat, lon } = locEntry;
  return { ...locationWithoutCoords, lat, lon };
};

export const retrieveAddressForCoordinates = async (locationWithoutAddress) => {
  const { lat, lon } = locationWithoutAddress;
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(response.status);

  const geoData = await response.json();
  const address = geoData?.address;
  if (!address?.road) throw new Error('The given coordinates are invalid.');

  const { road, city, postcode } = address;
  if (city !== 'Berlin') {
    throw new Error('The given location is not in Berlin.');
  }
  const newLocation = {
    ...locationWithoutAddress,
    street: road,
    zipCode: postcode,
  };
  return newLocation;
};

export const populateIncompleteLocation = async (inCompleteData) => {
  const hasAdress = inCompleteData.street && inCompleteData.zipCode;
  const hasCoords = inCompleteData.lat && inCompleteData.lon;
  if (hasAdress) {
    return retrieveCoordinatesForAddress(inCompleteData);
  } else if (hasCoords) {
    return retrieveAddressForCoordinates(inCompleteData);
  } else {
    throw new Error(
      'Bitte entweder Straße und PLZ oder Längen-/Breitengrad eintragen.'
    );
  }
};
