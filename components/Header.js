import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  display: flex;
  padding: 10px 15px;
  background-color: #ddd;
  margin-bottom: 20px;

  a + a {
    margin-left: 15px;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/users">
        <a>Users</a>
      </Link>
    </header>
  );
}
