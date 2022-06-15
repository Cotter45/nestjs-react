import { useAppDispatch } from "../../app/hooks"
import { login } from "../../app/session";


export default function NavBar() {
  const dispatch = useAppDispatch();

  return (
    <nav className="w-full h-20 flex justify-between p-4">
      <section className="text-2xl text-gray-700">
        <h1>Nest Test</h1>
      </section>
      <section className="flex gap-4">
        <button 
          className="py-2 px-6 w-50 rounded border-gray-200 text-white h-10 flex items-center justify-center bg-green-400 hover:bg-green-500">
            Sign Up
        </button>
        <button
          onClick={() => dispatch(login({ email: "sd.cotter45@gmail.com", password: "password" }))}
          className="py-2 px-6 w-50 rounded border-gray-200 text-white h-10 flex items-center justify-center bg-blue-400 hover:bg-blue-500">
            Sign In
        </button>
      </section>
    </nav>
  )
}