import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/auth/login")({
  component: LoginComponent,
});

type FormData = {
  email: string;
  password: string;
};

function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // TODO: Login logic
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
