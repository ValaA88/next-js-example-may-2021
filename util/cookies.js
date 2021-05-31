import cookies from 'js-cookie';

export function getFollowingCookieValue() {
  const cookieValue = cookies.getJSON('following');
  return (
    // Test if the cookie value is an array
    Array.isArray(cookieValue)
      ? // If it is, return the array value
        cookieValue
      : // If it's not, return an empty array
        []
  );
}

export function toggleFollowingUserByUserId(userId) {
  const previousCookieValue = getFollowingCookieValue();

  let newCookieValue;

  if (previousCookieValue.includes(userId)) {
    newCookieValue = previousCookieValue.filter((uid) => uid !== userId);
  } else {
    newCookieValue = [...previousCookieValue, userId];
  }

  cookies.set('following', newCookieValue);
  return newCookieValue;
}

export function getClapsCookieValue() {
  const cookieValue = cookies.getJSON('claps');
  return (
    // Test if the cookie value is an array
    Array.isArray(cookieValue)
      ? // If it is, return the array value
        cookieValue
      : // If it's not, return an empty array
        []
  );
}

export function addClapByUserId(userId) {
  const newCookieValue = [...getClapsCookieValue()];

  const clapUserInCookie = newCookieValue.find((user) => user.id === userId);

  if (clapUserInCookie) {
    clapUserInCookie.claps = clapUserInCookie.claps + 1;
  } else {
    newCookieValue.push({
      id: userId,
      claps: 0,
    });
  }

  cookies.set('claps', newCookieValue);
}

export function parseCookieValue(value, defaultValue) {
  try {
    return JSON.parse(value);
  } catch (err) {
    return defaultValue;
  }
}
