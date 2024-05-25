import hero from "../assets/hero.png";
const Hero = () => {
  return (
    <div>
      {/* Object cover gonna keep it's aspect ratio */}
      <img src={hero} className="w-full max-h-[600px] object-cover" /> 
    </div>
  );
};

export default Hero;
