import Button from "./Button";

export default function Landing() {
  return (
    <>
      <img
        src="./Landing-page.jpg"
        className=" h-[50vh] w-full opacity-10 object-cover absolute -z-10"
      />
      <div className="h-[50vh] w-full flex flex-col  justify-center lg:items-center mx-auto ">
        <h1 className="font-Heading text-4xl p-5">
          Take Control of Your Finances Today !
        </h1>
        <p className="p-5 text-sm">
          Effortlessly track spending, achieve goals, and reduce financial
          stress with our intuitive budgeting app.
        </p>
        <Button
          title="Get Started ->"
          className="w-fit mt-4 ml-5"
          action={() => alert("hi")}
        />
      </div>
    </>
  );
}
