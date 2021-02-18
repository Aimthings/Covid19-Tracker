import React, { useState } from 'react';
import { Sun, Moon } from 'react-feather';
import { toggleTheme } from '../../utils/config/DataFetch';

import './themeChanger.css';


const updateTheme = (theme) => {
  return !theme;
}

export const ThemeChanger = () => {
  const intialValue = localStorage.getItem('theme');
  const [ theme, setTheme ] = useState(intialValue === 'light');

  return (
    <div className="i01themeIcon">
      {theme ?
        <Moon
          onClick={() => {
            setTheme(updateTheme(theme));
            toggleTheme(theme ? 'dark' : 'light');
          }
          }
        />
        :
        <Sun
          onClick={() => {
            setTheme(updateTheme(theme));
            toggleTheme(theme ? 'dark' : 'light');
          }
          }
          color={'#ffc107'}
        />
      }
    </div>
  );
}

