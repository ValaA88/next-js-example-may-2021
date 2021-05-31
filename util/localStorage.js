// Helper functions to get a value from local
// storage, based on a key
export function getLocalStorageValue(key) {
  try {
    // Decode the value from the string that
    // it is in, using a process called "parsing"
    return JSON.parse(window.localStorage[key]);
  } catch (err) {
    // If the value does not exist or if
    // we are on the server, return undefined
    return undefined;
  }
}

// Helper function to set a value in local storage,
// based on a key and value
export function setLocalStorageValue(key, value) {
  // Check whether we are in the browser
  if (typeof window !== 'undefined') {
    // If we're in the browser, then stringify the value and set it in localStorage
    window.localStorage[key] = JSON.stringify(value);
  }
}
