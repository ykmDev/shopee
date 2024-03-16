export default function useGetUserTitle(type) {
  if (type == "Yaw-Gi female" || type == 2) return "အမျိုးသမီးယောဂီ";
  if (type == "Yaw-Gi male" || type == 1) return "အမျိုးသားယောဂီ";
  if (type == "Ya-Han" || type == 3) return "ရဟန်းတော်";
  if (type == "Thi-Hla-Shin" || type == 4) return "သာသနာ့နွယ်ဝင်သီလရှင်";
  return "";
}
