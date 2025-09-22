import LoginForm from "../../../components/LoginForm/LoginForm";
import { Toaster } from "react-hot-toast";

const AuthPage = () => {
  return (
    <>
      <Toaster position="top-right" />
      <LoginForm />
    </>
  );
};

export default AuthPage;
