import { toast } from "react-toastify";

const settings = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  hideProgressBar: true,
};
const useToast = () => {
  return {
    success: (text = "Success") => toast.success(text, { ...settings }),
    error: (text = "Something went wrong") =>
      toast.error(text, { ...settings, autoClose: false }),
  };
};
export default useToast;
