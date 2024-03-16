import { FaUserSlash, FaTrash } from "react-icons/fa";
import { LuUsers2, LuUserPlus, LuExternalLink } from "react-icons/lu";
import { MdDashboard, MdDoorSliding } from "react-icons/md";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { paths } from "./routes/path";

export const PRIMARY_COLOR = "#694e21";
export const SOFT_PRIMARY_COLOR = "#806331";
export const SIDERBAR_ITEM = [
  { link: paths.home, label: "မူလ", icon: MdDashboard },
  { link: paths.room, label: "အခန်းများ", icon: MdDoorSliding },
  { link: paths.yawgi, label: "ယောဂီများ", icon: LuUsers2 },
  {
    link: paths.yawgi_create,
    label: "ယောဂီစာရင်းသွင်း",
    icon: LuUserPlus,
  },
  {
    link: paths.yawgi_create_public,
    label: "ယောဂီစာရင်းသွင်း",
    icon: LuExternalLink,
    external: true,
  },
  { link: paths.events, label: "တရားစခန်းပွဲ", icon: MdDashboard },
  {
    link: paths.terms_and_conditions,
    label: "စည်းကမ်းချက်များ",
    icon: BiSolidSpreadsheet,
  },
  {
    link: paths.black_list,
    label: "ကန့်သတ်ခံထားရသူများ",
    icon: FaUserSlash,
  },
  {
    link: paths.deleted_yawgi_list,
    label: "ဖျက်ထားသောယောဂီများ",
    icon: FaTrash,
  },
];
