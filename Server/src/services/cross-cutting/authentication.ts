import axios from "axios";
import { getUserByAccessCode, setUserAccessData } from "./cache-service";

// TODO: Change region
const COGNITO_URL = `https://cognito-idp.us-east-1.amazonaws.com/`;

const authentication = async (req: any, res: any, next: any) => {
  let accessToken;
  try {
    const accessToken = req.header("Authorization").split(" ")[1];
    console.log("accessToken", accessToken);
    // Get from Cache
    let user = getUserByAccessCode(accessToken);
    // Cache miss
    if (!user) {
      const { data } = await axios.post(
        COGNITO_URL,
        {
          AccessToken: accessToken,
        },
        {
          headers: {
            "Content-Type": "application/x-amz-json-1.1",
            "X-Amz-Target": "AWSCognitoIdentityProviderService.GetUser",
          },
        }
      );
      user = data;
      // Set Cache
      setUserAccessData(accessToken, user);
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed" + error + accessToken,
    });
  }
};

export default authentication;
