'use client';
import { useState } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const themes = {
  emerald: 'emerald',
  dim: 'dim',
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.dim);

  const themeToggleHandler = () => {
    const newTheme = theme === themes.dim ? themes.emerald : themes.dim;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      className='btn btn-outline btn-sm'
      onClick={themeToggleHandler}
    >
      {theme === 'emerald' ? (
        <MdLightMode className='h-4 w-4' />
      ) : (
        <MdDarkMode className='h-4 w-4' />
      )}
    </button>
  );
};
export default ThemeToggle;
