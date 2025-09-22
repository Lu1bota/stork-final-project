import RegistrationForm from "../../../components/RegistrationForm/RegistrationForm";
import { Toaster } from "react-hot-toast";

const AuthPage = () => {
  return (
    <>
      <Toaster position="top-right" />
      <RegistrationForm />
    </>
  );
};
export default AuthPage;
