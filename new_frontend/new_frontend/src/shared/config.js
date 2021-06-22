const config = {
    api: "http:localhost:8081",
    token: {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };
  
  export { config };