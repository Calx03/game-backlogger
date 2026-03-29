import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema } from "../../lib/schemas/authSchemas";
import { useState } from "react";

export const Route = createFileRoute("/auth/register")({
  component: RegisterComponent,
});

type FormData = {
  username: string;
  email: string;
  password: string;
};

// TODO: Zod validation, error handling.
function RegisterComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate({ to: "/auth/login" });
      } else if (response.status === 409) {
        setError("An account with this email already exists");
      } else {
        setError("Something went wrong, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="bg-neutral-950 p-6 rounded-xl w-full max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl text-white text-center font-bold mb-2">
              Sign Up
            </h1>
            <p className="text-white text-center">
              Take control of your backlog today!
            </p>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>

          <div className="flex flex-col">
            <input
              {...register("username")}
              placeholder="Username"
              className="text-white bg-neutral-900 p-3 rounded-xl"
            />
            <p className="text-red-500 text-center">
              {errors.username?.message}
            </p>
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
            value={loading ? "Loading..." : "Sign Up"}
            disabled={loading}
            className="text-neutral-800 bg-white font-bold p-3 rounded-xl hover:cursor-pointer hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <hr className="border-neutral-700" />

          <h2 className="text-neutral-300 text-center">
            Already have an account?{" "}
            <Link className="text-white font-bold" to="/auth/login">
              Login!
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
}
