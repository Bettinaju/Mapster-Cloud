import { populateIncompleteLocation } from './addressResolver.js';
import { resetAddForm } from './domHelper.js';
import { addLocation, updateLocation } from './locations.js';
import { addLocationMarker, updateLocationMarker } from './mapService.js';
import { postLocation, putLocation } from './requestHelper.js';
import { navigateToScreenById } from './routingService.js';

export const resolveAndAddLocation = async (locationInput) => {
  try {
    const populatedLocation = await populateIncompleteLocation(locationInput);
    const apiResponse = await postLocation(populatedLocation);
    if (!apiResponse.ok) throw new Error(apiResponse.status);
    const newLocation = await apiResponse.json();
    addLocation(newLocation);
    addLocationMarker(newLocation);
    navigateToScreenById('main-screen');
    resetAddForm();
  } catch (error) {
    alert(error);
  }
};

export const resolveAndUpdateLocation = async (locationInput) => {
  try {
    const populatedLocation = await populateIncompleteLocation(locationInput);
    const { id } = populatedLocation;
    const apiResponse = await putLocation(id, populatedLocation);
    if (!apiResponse.ok) throw new Error(apiResponse.status);
    const newLocation = await apiResponse.json();
    updateLocation(newLocation);
    updateLocationMarker(newLocation);
    navigateToScreenById('main-screen');
  } catch (error) {
    alert(error);
  }
};
