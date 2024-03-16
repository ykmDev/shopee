export default function useGetBloodTypes(type) {
  switch (type) {
    case "A":
      return "အေ";
    case "B":
      return "ဘီ";
    case "AB":
      return "အေဘီ";
    case "O":
      return "အို";
    case "Unknown":
      return "အခြား";

    default:
      return "";
  }
}
