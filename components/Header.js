import { css } from '@emotion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from '../util/localStorage';

const headerStyles = css`
  display: flex;
  padding: 10px 15px;
  background-color: #ddd;
  margin-bottom: 20px;

  a + a {
    margin-left: 15px;
  }

  > div + div {
    margin-left: auto;
  }
`;

export default function Header() {
  const [darkMode, setDarkMode] = useState();

  // Set initial value (for client-side way of
  // dealing with "Text content did not match"
  // error)
  useEffect(() => {
    setDarkMode(getLocalStorageValue('darkMode'));
  }, []);

  useEffect(() => {
    setLocalStorageValue('darkMode', darkMode);
  }, [darkMode]);

  return (
    <header css={headerStyles}>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a data-cy="header-about-link">About</a>
        </Link>
        <Link href="/users">
          <a data-cy="header-users-link">Users</a>
        </Link>
      </div>
      <div>
        <button onClick={() => setDarkMode(!darkMode)}>
          turn dark mode {darkMode ? 'off' : 'on'}
        </button>
      </div>
    </header>
  );
}
