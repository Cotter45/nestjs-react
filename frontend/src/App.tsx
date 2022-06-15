import { useEffect, useState } from 'react';
import { useAppDispatch } from './app/redux/redux_hooks';
import { restore } from './features/auth/sessionSlice';
import NavBar from './components/navbar/Navbar';

function App() {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    dispatch(restore());
    setLoaded(true);
  }, [loaded, dispatch]);

  return (
    <>
      <NavBar />
      <main className="min-h-screen w-full bg-slate-200"></main>
    </>
  );
}

export default App;
