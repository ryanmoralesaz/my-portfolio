export const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center text-bluemunsell font-encode min-h-[40px] py-4 bg-[rgba(var(--vanilla)/1)]">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4">
        <section className="px-2 md:px-6 text-xs md:text-sm text-center mb-2 md:mb-0">
          Contact Me: ryan.morales@west-mec.org
        </section>
        <section className="px-2 md:px-6 text-xs md:text-sm text-center mb-2 md:mb-0">
          &copy; Ryan Morales 2025
        </section>
        <section className="px-2 md:px-6 text-xs md:text-sm text-center">
          Licensed Under CC BY-NC-ND 4.0
        </section>
      </div>
    </div>
  );
};