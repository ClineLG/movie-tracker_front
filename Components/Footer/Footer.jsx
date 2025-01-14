import "./footer.css";
const Footer = ({ modalConnectionVisible, modalAddVisible }) => {
  return (
    <footer
      className={modalAddVisible || modalConnectionVisible ? "diplayNone" : ""}
    >
      <span>Made by</span>
      <a href="https://github.com/ClineLG" target="_blank">
        Celine
      </a>
    </footer>
  );
};

export default Footer;
