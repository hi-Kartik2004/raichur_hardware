import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

const {
  Clock10Icon,
  Settings2,
  Lock,
  Plug,
  HammerIcon,
  PersonStandingIcon,
  PhoneCallIcon,
  LocateIcon,
  Star,
  FileQuestion,
} = require("lucide-react");
const { FaIndianRupeeSign } = require("react-icons/fa6");

const icons = {
  money: (
    <FaIndianRupeeSign className="h-5 w-5 text-gray-500 dark:text-gray-400" />
  ),
  time: <Clock10Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  settings: <Settings2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  lock: <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  plug: <Plug className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  hammer: <HammerIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  person: (
    <PersonStandingIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
  ),
  phone: <PhoneCallIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  location: <LocateIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  star: <Star className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  fileQuestion: (
    <FileQuestion className="h-5 w-5 text-gray-500 dark:text-gray-400" />
  ),
  questionmark: (
    <QuestionMarkCircledIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
  ),
};

export default icons;
