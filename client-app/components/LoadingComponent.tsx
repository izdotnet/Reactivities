const LoadingComponent = () => {
  return (
    <span className="flex justify-center items-center h-screen w-screen">
      <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-primary opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
    </span>
  );
};

export default LoadingComponent;
