import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import moment from "moment";
import CryptoJS from "crypto-js";
import axios from "axios";

function encryptDataAES(payload) {
  const encryptedData = CryptoJS.AES.encrypt(
    payload,
    import.meta.env.VITE_APP_AES_SECRET
  ).toString();
  return encryptedData;
}

function decryptDataAES(payload) {
  const bytes = CryptoJS.AES.decrypt(
    payload,
    import.meta.env.VITE_APP_AES_SECRET
  );
  const rawData = bytes.toString(CryptoJS.enc.Utf8);
  try {
    let parsedData;
    parsedData = JSON.parse(rawData);
    return parsedData;
  } catch (err) {
    throw new Error("Invalid Payload");
  }
}

async function fetchResp(url, options) {
  // console.log("options", options);
  if (options.body) {
    options.body = { payload: encryptDataAES(options.body) };
  }

  const axiosConfig = {
    url,
    method: options.method,
    headers: {
      ...options.headers,
    },
    data: options.body,
    params: options.params,
  };
  try {
    const resp = await axios.request(axiosConfig);
    const __resp = resp.data;
    const __decryptData = decryptDataAES(__resp["payload"]);
    resp.data = JSON.parse(__decryptData);
    return Promise.resolve(createResponseFromAxiosResp(resp, resp));
  } catch (err) {
    // console.error("Axios error:", err);
    // if (err?.response?.data?.payload) {
    //   console.log("err", decryptDataAES(err.response.data.payload));
    // }

    // // Destructure this for accurate server error message
    const serverError = { ...err };
    throw serverError;
  }
}

function createResponseFromAxiosResp(axiosResp, data) {
  data = data || axiosResp.data;
  // use Response will cause url be empty, as apollo-link-http use response.text() to get string data
  let ret = new Response(JSON.stringify(axiosResp.data), {
    ...axiosResp,
  });
  return ret;
}

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${encryptDataAES(
        JSON.stringify({
          reqApp: "portfolio-v1",
          expiresAt: moment().unix() + 2 * 60, // Valid for 2 mins
          passKey: import.meta.env.VITE_APP_AUTH_PASSKEY || "",
        })
      )}`,
    },
  });
  return forward(operation);
});

const link = ApolloLink.from([
  authLink,
  new HttpLink({
    uri: import.meta.env.VITE_APP_BACKEND_URL,
    fetch: fetchResp,
  }),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
