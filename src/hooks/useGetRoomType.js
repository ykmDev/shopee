export default function useGetRoomType(type) {
  if (type == "Yaw-Gi female" || type == 1) return "ယောဂီ အမျိုးသမီး";
  if (type == "Yaw-Gi male" || type == 2) return "ယောဂီ အမျိုးသား";
  if (type == "Ya-Han" || type == 3) return "သာသနာ့နွယ်ဝင်သီလရှင်";
  if (type == "Thi-Hla-Shin" || type == 4) return "ရဟန်းတော်";
  return "";
}
