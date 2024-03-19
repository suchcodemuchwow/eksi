export const LandingHero = () => {
  return (
    <div className={"min-h-screen w-full"}>
      <div className={"mx-auto flex min-h-[calc(100vh-80px)] max-w-md flex-col justify-between px-2.5 text-center "}>
        <div></div>
        <div className={" flex h-full flex-col items-center justify-center"}>
          <h1 className={"font-display text-6xl font-extrabold tracking-tight"}>Hack your next</h1>
          <p className={"mt-5 text-gray-600 sm:text-xl"}>
            JITL analyzes your knowledge and suggest only relevant materials to study.
            <br />
            Tailored for your <strong>NEED</strong> and <strong>TIME</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
