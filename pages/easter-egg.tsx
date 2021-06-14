import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from '../util/localStorage';

export default function EasterEgg() {
  const [easterEggLocalstorage, setEasterEggLocalstorage] = useState<string>();

  useEffect(() => {
    setEasterEggLocalstorage(getLocalStorageValue('easterEgg'));
  }, []);

  useEffect(() => {
    setLocalStorageValue('easterEgg', easterEggLocalstorage);
  }, [easterEggLocalstorage]);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon2.ico" />
      </Head>
      YoU fOuNd An EASTER Eggg!!
      <br />
      <br />
      <br />
      Easter egg local storage value: "
      {easterEggLocalstorage === undefined
        ? 'undefined'
        : JSON.stringify(easterEggLocalstorage, null, 2)}
      "
      <br />
      <br />
      <button
        onClick={() =>
          setEasterEggLocalstorage(
            `local storage value ${new Date().getTime()}`,
          )
        }
      >
        set a value
      </button>
    </div>
  );
}
