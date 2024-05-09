import { toast } from "react-toastify";

const toastAlert = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
    case "error":
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
    case "info":
      toast.info(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
    case "warning":
      toast.warning(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
    case "pending":
      toast.warning(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
    case "Declined":
      toast.warning(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    case "Applied":
      toast.warning(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
    default:
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
  }
};

export default toastAlert;
