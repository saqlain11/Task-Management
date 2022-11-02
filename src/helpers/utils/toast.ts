import { notification } from "components";

type type = "success" | "error";
interface Notification {
  key?: string;
  message: string;
  description: string;
  type: type;
  onClose?: () => void;
}
const toast = ({ message, description, type, onClose }: Notification) => {
  return notification[type]({
    key: Date.now().toString(),
    message,
    description,
    onClose,
  });
};
export default toast;
