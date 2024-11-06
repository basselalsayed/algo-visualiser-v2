import './App.css';

import { Navbar } from './components/navbar/navbar.component';

import { Grid } from './components/grid/grid.component';
import { useDarkMode } from 'usehooks-ts';
import { useEffect } from 'react';

function App() {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const rootClasses = window.document.documentElement.classList;

    rootClasses.remove('dark', 'light');

    rootClasses.add(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <main className='grid grid-flow-row w-full grid-cols-[100%] grid-rows-[91svh_1fr] sm:grid-rows-[1fr_92svh] '>
      <Grid />
      <Navbar />
    </main>
  );
}

export default App;
