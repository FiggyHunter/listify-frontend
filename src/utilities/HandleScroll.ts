export function handleScroll(setShow, lastScrollY, setLastScrollY) {
  if (window.scrollY > lastScrollY) {
    setShow(false);
  } else {
    setShow(true);
  }
  setLastScrollY(window.scrollY);
}
