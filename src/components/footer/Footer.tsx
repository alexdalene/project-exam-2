const Footer = () => {
  return (
    <footer className="relative mx-auto grid w-full max-w-[1400px] place-content-center overflow-hidden rounded-t-[6rem] border-t border-border pb-32 pt-16">
      <p className="text-sm">&copy; Holidaze 2024</p>
      <div className="absolute left-0 top-0 grid h-full w-full place-content-center">
        <span className="-z-10 text-8xl font-bold text-muted">
          HOLIDAZE HOLIDAZE
        </span>
      </div>
    </footer>
  );
};

export default Footer;
