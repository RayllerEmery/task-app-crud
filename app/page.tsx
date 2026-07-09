import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center h-full gap-y-4">
      <h1 className="text-4xl">Bem vindo</h1>
      <p className="font-bold">Telas disponíveis</p>
      <div>
        <ul className="list-disc ml-6 underline">
          <li>
            <Link href="/register">Cadastro</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/tasks">Tasks</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
