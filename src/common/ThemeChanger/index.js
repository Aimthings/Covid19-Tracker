import React, { useState } from 'react';
import { Sun, Moon } from 'react-feather';

import { toggleTheme } from '../../utils/config/DataFetch';

import './themeChanger.css';

const updateTheme = (theme) => {
  return !theme;
}
export const ThemeChanger = () => {

  const intialMode = localStorage.getItem('theme') === 'light' ? true : false;
  const [ theme, setTheme ] = useState(intialMode);

  return (
    <div className="i01themeIcon">
      {theme ?
        <Moon className="i31moon"
          onClick={() => {
            setTheme(updateTheme(theme));
            toggleTheme(theme ? 'dark' : 'light');
          }
          }
        />
        :
        <Sun className="i31sun"
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

