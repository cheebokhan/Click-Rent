

const checkResponse = (response )=>{
    if (
      (response.status >= 200 && response.status < 300) 
      // (response.data.statusCode >= 200 && response.data.statusCode < 300)
    ) {
      return null;
    } else if (
      (response.status >= 300 && response.status < 500) 
    ) {
      if (response.data.errors) {
        return response.data.errors;
      } else {
        return [{ message: response.data }];
      }
    } else {
      return [{ message: "Server Error" }];
    }

}

export default checkResponse;