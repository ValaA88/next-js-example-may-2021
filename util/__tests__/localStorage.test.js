/**
 * @jest-environment jsdom
 */

import { getLocalStorageValue, setLocalStorageValue } from '../localStorage';

test('getLocalStorageValue returns correct value', () => {
  const testValueString = 'testValue';
  const testValueObj = { testObjectKey: 'testObjectValue' };

  window.localStorage.testKey = JSON.stringify(testValueString);
  expect(getLocalStorageValue('testKey')).toBe(testValueString);

  window.localStorage.testKey = JSON.stringify(testValueObj);
  // Use toEqual to test for object or array equality
  // https://jestjs.io/docs/expect#toequalvalue
  expect(getLocalStorageValue('testKey')).toEqual(testValueObj);
});

test('getLocalStorageValue returns undefined if the local storage key has not been set', () => {
  expect(getLocalStorageValue('testKeyMissing')).toBe(undefined);
});

test('getLocalStorageValue returns undefined if the local storage value cannot be parsed as JSON', () => {
  const unparseableValue = 'Not really JSON';
  window.localStorage.testKeyUnparseable = unparseableValue;
  expect(getLocalStorageValue('testKeyUnparseable')).toBe(undefined);
});

test('setLocalStorageValue sets correct value', () => {
  const testKey = 'setTestKey';
  const testValue = 'setTestValue';
  setLocalStorageValue(testKey, testValue);
  expect(window.localStorage[testKey]).toBe(JSON.stringify(testValue));
});
