import PropTypes from "prop-types";
import axios from "../heplers/apiHelper";
import axiosRefresh from "../heplers/appManagerApiHelper";

import {
  Get_DeleteFile_URL,
  Get_FileInfo_URL,
  Get_File_URL,
  Get_LanguageDictionary_URL,
} from "../constants/apiUrls";
import { SERVER_URL } from "../constants";
import authService from "../utils/authUtils";
let isAlreadyFetchingAccessToken = false;
let getsubscribers = [];
let postsubscribers = [];

export async function validateAuthentication(type, callback) {

  if (isAlreadyFetchingAccessToken) {
    type === "get"
      ? getsubscribers.push(callback)
      : postsubscribers.push(callback);
  } else if (authService.isAuthenticated()) {
    await callback(authService.getUserToken());
  } else if (authService.isRefreshAuthenticated()) {
    isAlreadyFetchingAccessToken = true;
    const resp = await authService.tryRefresh(axiosRefresh);

    isAlreadyFetchingAccessToken = false;
    if (resp) {
      await callback(resp.accessToken);
      // req.headers.Authorization = `Bearer ${authService.getUserToken()}`;
      // return req;
        callGetSubscribers(resp.accessToken);
        callPostSubscribers(resp.accessToken);
      
    } else {
      await callback(authService.getUserToken());
    }
  } else {
    await callback(authService.getUserToken());
  }
}


function callGetSubscribers(token) {
  getsubscribers.forEach(async sub => {
    await sub(token)
  })
  getsubscribers = []
}

function callPostSubscribers(token) {
  // alert("calling post "+postsubscribers.length)
  postsubscribers.forEach(async sub => {
    await sub(token);
  })
  postsubscribers = []
}


export async function Get(payload, actionUrl, history, onSuccess, onError) {
  try {
    await validateAuthentication("get", async (token) => {
      try {
        const response = await axios(token).get(actionUrl, { params: payload });
        onSuccess(response);
      } catch (error) {
        console.log("Error => ",error)
        if (onError) onError(error.response);
        if (error.response.status === 401) {
          authService.logout();
          window.location.reload();
        }
      }
    });
  } catch (error) {
    if (error.response?.status === 401) {
      window.location.reload();
    }
  }
}

Get.propTypes = {
  payload: PropTypes.node.isRequired,
  actionUrl: PropTypes.string.isRequired,
  history: PropTypes.any.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export async function Post(payload, actionUrl, history, onSuccess, onError) {
  await validateAuthentication("post", async (token) => {
    try {
      const response = await axios(token).post(actionUrl, payload);
      onSuccess(response);
    } catch (error) {
      onError(error.response);
    }
  });
}

Post.propTypes = {
  payload: PropTypes.node.isRequired,
  actionUrl: PropTypes.string.isRequired,
  history: PropTypes.any.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export function GetFile(fileAddress) {
  return `${SERVER_URL}FileManager/Get?fileName=${fileAddress}&customerId=${authService.getCustomerId()}`;
}

Upload.propTypes = {
  payload: PropTypes.node.isRequired,
  actionUrl: PropTypes.string.isRequired,
};

export async function Upload(
  payload,
  actionUrl,
  onError,
  onComplete,
  onProgressChange
) {
  try {
    let formData = new FormData();

    formData.append("formFile", payload);
    await axios(null)
      .post(actionUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          onProgressChange(event);
        },
      })
      .then((resp) => {
        onComplete(resp);
      })
      .catch((error) => {
        onError(error.response);
      });
  } catch (error) {
    onError(error.data);
  }
}

Upload.propTypes = {
  payload: PropTypes.node.isRequired,
  actionUrl: PropTypes.string.isRequired,
};

export async function DownloadFile(fileAddress) {
  try {
    window.open(
      SERVER_URL + Get_File_URL + "?fileName=" + fileAddress+"&customerId="+authService.getCustomerId(),
      "_blank"
    );
    //  await axios(null).get(Get_File_URL,{params:{fileName:uploadedVM.fileAddress}},
    //     {
    //         responseType: "blob"
    //     }).then(resp=>{
    //     const url = window.URL.createObjectURL(new Blob([resp.data]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', "file.jpg");
    //     document.body.appendChild(link);
    //     link.click();
    // });
  } catch (error) {}
}
DownloadFile.propTypes = {
  fileName: PropTypes.string.isRequired,
};

export async function DeleteFile(fileAddress, onSuccess, onError) {
  try {
    //window.open("https://localhost:44316/"+Get_File_URL+"?fileName="+fileAddress,"_blank")
    await axios(null)
      .get(Get_DeleteFile_URL, { params: { fileName: fileAddress } })
      .then((resp) => {
        onSuccess(resp.data);
      })
      .catch((error) => {
        onError(error.response);
      });
  } catch (error) {}
}
DeleteFile.propTypes = {
  fileName: PropTypes.string.isRequired,
};

export async function GetFileInfo(fileAddress, onSuccess, onError) {
  try {
    //window.open("https://localhost:44316/"+Get_File_URL+"?fileName="+fileAddress,"_blank")
    console.log("ak;jd;wjkldjkla", fileAddress);
    await axios(null)
      .get(Get_FileInfo_URL, { params: { fileName: fileAddress } })
      .then((resp) => {
        onSuccess(resp.data);
      })
      .catch((error) => {
        onError(error.response);
      });
  } catch (error) {}
}
GetFileInfo.propTypes = {
  fileName: PropTypes.string.isRequired,
};
