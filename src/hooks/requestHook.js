import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { dataActions } from "../store/dataSlice";

export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendGetRequest = useCallback(async (path) => {
    setLoading(true);
    const { data } = await axios.get(path, {
      headers: {
        Authorization: "Bearer " + token,
      },
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.loaded === progressEvent.total) {
          setLoading(false);
        }
      },
    });

    if (data.expired) {
      dispatch(authActions.logout());
      dispatch(dataActions.clearData());
      navigate("/login");
    }

    return data;
  }, []);

  const sendPostRequest = useCallback(async (path, body) => {
    setLoading(true);
    const { data } = await axios.post(path, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.loaded === progressEvent.total) {
          setLoading(false);
        }
      },
    });

    return data;
  }, []);

  return { loading, sendGetRequest, sendPostRequest };
};
