import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/redux/redux_hooks';
import { login, logout } from '../../features/auth/sessionSlice';
import { authFetch } from '../../app/util/authFetch';

export default function NavMenu() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const user = useAppSelector((state) => state.session.user);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.querySelector('main');
    const handleClick = (e: MouseEvent) => {
      setIsOpen(!isOpen);
    };

    body && body.addEventListener('click', handleClick, { once: true });

    return () => {
      body && body.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  const doFetches = async () => {
    const fetchArticles = async () => {
      const response = await authFetch('/api/articles');
      const body = await response.json();
      console.log(body);
    };
    await Promise.all([
      fetchArticles(),
      fetchArticles(),
      fetchArticles(),
      fetchArticles(),
      fetchArticles(),
    ]);
  };

  return (
    <>
      <input
        checked={isOpen}
        onChange={() => {}}
        type="checkbox"
        id="menu-toggle"
      />
      <label
        data-testid="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        htmlFor="menu-toggle"
        className="hamburger"
      >
        <span className="bun bun-top">
          <span className="bun-crust bun-crust-top"></span>
        </span>
        <span className="bun bun-bottom">
          <span className="bun-crust bun-crust-bottom"></span>
        </span>
      </label>
      <section
        style={{
          maxWidth: isOpen ? '400px' : 0,
          transform: isOpen ? '' : 'translateX(100px)',
        }}
        className="menu w-100 flex flex-col gap-4 p-4 border-l border-gray-500"
      >
        <section className="w-100 flex justify-evenly">
          {!user ? (
            <>
              <button data-testid="signup-button" className="w-50 flex h-10 items-center justify-evenly rounded border-gray-200 bg-green-400 py-2 px-6 text-white hover:bg-green-500">
                Sign Up
              </button>
              <button
                data-testid="login-button"
                onClick={() =>
                  dispatch(
                    login({
                      email: 'sd.cotter45@gmail.com',
                      password: 'password',
                    }),
                  )
                }
                className="w-50 flex h-10 items-center justify-center rounded border-gray-200 bg-blue-400 py-2 px-6 text-white hover:bg-blue-500"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <button
                data-testid="logout-button"
                onClick={() => dispatch(logout())}
                className="w-50 flex h-10 items-center justify-center rounded border-gray-200 bg-slate-400 py-2 px-6 text-white hover:bg-slate-500"
              >
                Sign Out
              </button>
            </>
          )}
        </section>
        <button
          data-testid="fetch-articles-button"
          onClick={() => doFetches()}
          className="w-50 flex h-10 items-center justify-center rounded border-gray-200 bg-blue-400 py-2 px-6 text-white hover:bg-blue-500"
        >
          Fetch Data
        </button>
      </section>
    </>
  );
}
