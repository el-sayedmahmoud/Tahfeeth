import { QueryClient, useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { loginUserApi } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";

function useLogin() {
  const { setIsLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const queryClient = new QueryClient();

  const { isPending, mutate: loginUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      Cookies.set("accessToken", data.accessToken, {
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refreshToken", data.refreshToken, {
        secure: true,
        sameSite: "Strict",
      });
      setIsLogin(true);
      navigate("/details");
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  return { isPending, loginUser };
}

export default useLogin;
