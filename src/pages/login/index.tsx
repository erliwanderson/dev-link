import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { useState } from "react";

import { auth } from "../../services/firebaseConnerction";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("Preencha todos os campos!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    setEmail("");
    setPassword("");
    console.log(email, password);
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2">
        <Input
          placeholder="Digite seu email!"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="*********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white h-9 rounded border-0 text-lg font-medium">
          Acessar
        </button>
      </form>
    </div>
  );
}

export default Login;
