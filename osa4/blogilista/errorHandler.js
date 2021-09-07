const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError")
    return response.status(400).send({ error: error.message.split(":")[0] });

  if (error.message.includes("password"))
    return response.status(400).send({ error: error.message });

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

export default errorHandler;
