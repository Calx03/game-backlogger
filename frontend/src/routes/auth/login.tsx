import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../contexts/authContext";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/schemas/authSchemas";

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
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null);
    setLoading(true);

    try {
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

      if (response.ok) {
        const json = (await response.json()) as LoginResponseInterface;
        await login(json.token);
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="bg-neutral-950 p-6 rounded-xl w-full max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl text-white text-center font-bold">Login</h1>
            <p className="text-white text-center">
              Welcome back to your backlog!
            </p>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>

          <div className="flex flex-col">
            <input
              {...register("email")}
              placeholder="Email"
              className="text-white bg-neutral-900 p-3 rounded-xl"
            />
            <p className="text-red-500 text-center">{errors.email?.message}</p>
          </div>

          <div className="flex flex-col">
            <input
              {...register("password")}
              placeholder="Password"
              className="text-white bg-neutral-900 p-3 rounded-xl"
            />
            <p className="text-red-500 text-center">
              {errors.password?.message}
            </p>
          </div>

          <input
            type="submit"
            value={loading ? "Loading..." : "Login"}
            disabled={loading}
            className="text-neutral-800 bg-white font-bold p-3 rounded-xl hover:cursor-pointer hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <hr className="border-neutral-700 mt-2" />

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
