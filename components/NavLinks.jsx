import Link from 'next/link';

const links = [
  { href: '/newworkoutplan', label: 'New Workout Plan' },
  { href: '/workouts', label: 'Workouts' },
  { href: '/profile', label: 'Profile' },
  { href: '/askme', label: 'Ask Me!' },
];

const NavLinks = () => {
  return (
    <div className='menu text-base-content'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className='capitalize'
          >
            {link.label}
          </Link>
        </li>
      ))}
    </div>
  );
};
export default NavLinks;
