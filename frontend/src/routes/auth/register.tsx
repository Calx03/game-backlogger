import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/auth/register")({
  component: RegisterComponent,
});

type FormData = {
  username: string;
  email: string;
  password: string;
};

interface RegisterResponse {
  username: string;
  email: string;
}

function RegisterComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
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

    const json = (await response.json()) as RegisterResponse;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="bg-neutral-950 p-6 rounded-xl w-full max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl text-white text-center font-bold mb-2">
              Sign Up
            </h1>
            <p className="text-white text-center">
              Take control of your backlog today!
            </p>
          </div>

          <input
            {...register("username")}
            placeholder="Username"
            className="text-white bg-neutral-900 p-3 rounded-xl"
          />

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
            value="Sign Up"
            className="text-neutral-800 bg-white font-bold p-3 rounded-xl hover:cursor-pointer hover:bg-neutral-300"
          />

          <hr className="border-neutral-700" />

          <h2 className="text-neutral-300 text-center">
            Already have an account?{" "}
            <Link className="text-white font-bold" to="/auth/register">
              Login!
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
}
