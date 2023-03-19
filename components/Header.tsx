import Link from 'next/link';
const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link href="/">
            <div>home</div>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
