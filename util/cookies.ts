import { serialize } from 'cookie';
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

export function toggleFollowingUserByUserId(userId: number) {
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

export function addClapByUserId(userId: number) {
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

export function parseCookieValue(value: string, defaultValue: any) {
  try {
    return JSON.parse(value);
  } catch (err) {
    return defaultValue;
  }
}

export function createSerializedSessionTokenCookie(token: string) {
  // Detect whether we're in a production environment
  // eg. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  // Save the token in a cookie on the user's machine
  // (cookies get sent automatically to the server every time
  // a user makes a request)
  const maxAge = 60 * 60 * 24; // 24 hours
  return serialize('sessionToken', token, {
    maxAge: maxAge,

    expires: new Date(Date.now() + maxAge * 1000),

    // Important for security
    // Deny cookie access from frontend JavaScript
    httpOnly: true,

    // Important for security
    // Set secure cookies on production (eg. Heroku)
    secure: isProduction,

    path: '/',

    // Be explicit about new default behavior
    // in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // Detect whether we're in a production environment
  // eg. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  // Save the token in a cookie on the user's machine
  // (cookies get sent automatically to the server every time
  // a user makes a request)
  const maxAge = 60 * 5; // 5 minutes
  return serialize('sessionTokenRegister', token, {
    maxAge: maxAge,

    expires: new Date(Date.now() + maxAge * 1000),

    // Important for security
    // Deny cookie access from frontend JavaScript
    httpOnly: true,

    // Important for security
    // Set secure cookies on production (eg. Heroku)
    secure: isProduction,

    path: '/',

    // Be explicit about new default behavior
    // in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}
