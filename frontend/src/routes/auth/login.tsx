import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../contexts/authContext";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/login")({
  component: LoginComponent,
});

interface LoginResponseInterface {
  token: string;
  id: number;
  email: string;
  username: string;
}

type FormData = {
  email: string;
  password: string;
};

// TODO: Zod validation, error handling.
function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = (await response.json()) as LoginResponseInterface;

    await login(json.token);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="bg-neutral-950 p-6 rounded-xl w-full max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl text-white text-center font-bold mb-2">
              Login
            </h1>
            <p className="text-white text-center">
              Welcome back to your backlog!
            </p>
          </div>

          <input
            {...register("email")}
            placeholder="Email"
            className="text-white bg-neutral-900 p-3 rounded-xl"
          />

          <input
            {...register("password")}
            placeholder="Password"
            className="text-white bg-neutral-900 p-3 rounded-xl"
          />

          <input
            type="submit"
            value="Login"
            className="text-neutral-800 bg-white font-bold p-3 rounded-xl hover:cursor-pointer hover:bg-neutral-300"
          />

          <hr className="border-neutral-700" />

          <h2 className="text-neutral-300 text-center">
            Not yet registered?{" "}
            <Link className="text-white font-bold" to="/auth/register">
              Create an account!
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
}
