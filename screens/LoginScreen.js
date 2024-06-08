import { useState } from "react";
import { loginUser } from "../api/auth";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { tryCatchWrapperAsync } from "../util/errorHandlerUtils";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../store/redux/authentication";

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.auth.authToken
  });

  if (errorMessage) {
    Alert.alert("Authentication Failed", errorMessage, [{
      text: 'OK',
      onPress: ()=>{setErrorMessage(null)}
    }]);
  }

  if (loading) {
    return <LoadingOverlay message={"Sigining In..."} />;
  }

  return (
    <AuthContent
      isLogin
      onAuthenticate={tryCatchWrapperAsync(loginHandler, errorHandler)}
    />
  );

  async function loginHandler({ email, password }) {
    setLoading(true);
    const response = await loginUser(email, password);
    dispatch(signInUser({email: response.email, token: response.idToken}));
    setLoading(false);
  }

  function errorHandler(error) {
    setLoading(false);
    setErrorMessage(
      "Unable to log you in. Please try again with correct credentials"
    );
  }
}

export default LoginScreen;
