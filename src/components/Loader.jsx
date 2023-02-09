import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader">
      <Image
        src="/assets/loader.svg"
        width={150}
        height={150}
        alt="Loading....."
        priority={true}
      />
    </div>
  );
};

export default Loader;
