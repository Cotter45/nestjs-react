import NavMenu from './navmenu';

export default function NavBar() {
  return (
    <nav className="flex h-20 w-full justify-between p-4 border-b border-gray-500">
      <section className="text-2xl text-gray-700">
        <h1>Nest Test</h1>
      </section>
      <section className="flex gap-4">
        <NavMenu />
      </section>
    </nav>
  );
}
