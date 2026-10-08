import Button from "./Button";
const Finance = () => {
  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center bg-black ">
        <div className="absolute inset-0 bg-cover bg-black opacity-30">
          <video
            src="./src/assets/images/landing.mp4"
            className="w-full h-screen object-cover"
            loop
            autoPlay
            muted
          />
        </div>
        <div className="relative text-center px-6 md:px-12">
          <div className="text-6xl font-Heading text-white">
            Take Control of Your <span className="text-primary">Finances </span>
            Today!
          </div>
          <p className="text-lg md:text-xl mb-6 text-wrap mt-3 text-white ">
            Effortlessly track spending, achieve goals, and reduce financial
            stress with our intuitive budgeting app.
          </p>
          <div className="flex w-full justify-around items-center">
            <a href="#nxt">
              <Button title="Know More" />
            </a>
            <Button title="Get Started" className="font-Heading" link="/auth" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Finance;
