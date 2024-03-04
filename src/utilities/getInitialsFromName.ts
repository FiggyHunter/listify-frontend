export default function getInitials(fullName) {
  const words = fullName.split(" ");

  let initials = "";

  words.forEach((word) => {
    initials += word.charAt(0).toUpperCase();
  });

  return initials;
}
