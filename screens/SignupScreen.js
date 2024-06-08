import { useState } from "react";
import { createUser } from "../api/auth";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { tryCatchWrapperAsync } from "../util/errorHandlerUtils";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../store/redux/authentication";

function SignupScreen() {
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

  if(loading) {
    return <LoadingOverlay message={'Creating Account...'} />
  }

  return <AuthContent onAuthenticate={tryCatchWrapperAsync(signUpHandler, errorHandler)} />;

  async function signUpHandler({ email, password }) {
    setLoading(true);
    const response = await createUser(email, password);
    dispatch(signInUser({email: response.email, token: response.idToken}));
    setLoading(false);
  }

  function errorHandler(error) {
    setLoading(false);
    setErrorMessage(
      "Sorry, we are having issues signing you up. Please try again."
    );
  }
}

export default SignupScreen;
