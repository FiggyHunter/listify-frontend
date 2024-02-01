// We will get an error from the backend, and display it in a secure and context-appropriate manner to the frontend
export const handleResponseError = (error, setter) => {
  if (error === "Register") {
    setter({
      email: "There has been an error processing your request.",
      firstName: "There has been an error processing your request.",
      lastName: "There has been an error processing your request.",
      password: "There has been an error processing your request.",
      repeatPassword: "There has been an error processing your request.",
    });
    return;
  }

  if (error === "Login") {
    setter({
      email: "Invalid creditentials",
      password: "Invalid creditentials",
    });
    return;
  }
};
