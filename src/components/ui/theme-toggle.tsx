// 'use client';

// import * as React from 'react';
// import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
// import { useTheme } from './theme-provider';

// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Card } from './card';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="container h-9">
      <label htmlFor="switch">
        <input
          id="switch"
          className="input"
          type="checkbox"
          checked={theme === 'light' ? true : false}
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
        <Card
          className={` flex justify-center items-center rounded-full p-[0.4rem] ${
            theme === 'dark' ? 'bg-white' : 'bg-black'
          }`}
        >
          {theme === 'dark' && <FaSun className="text-xl text-yellow-300" />}
          {theme === 'light' && <FaMoon className="text-xl text-white" />}
        </Card>
      </label>
    </div>
  );
}
