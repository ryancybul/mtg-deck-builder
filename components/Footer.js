function Footer() {
  let thisYear = new Date().getFullYear();
  return (
    <footer className="center">
      <p>Ryan Cybul @ {thisYear}</p>
    </footer>
  );
}

export default Footer;
