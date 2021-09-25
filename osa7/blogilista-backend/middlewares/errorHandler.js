const errorHandler = (error, request, response, next) => {
  if (error.message.includes("Invalid blog title or url"))
    return response.status(400).send({ error: error.message });

  if (error.message.includes("Not Authorized"))
    return response.status(401).send({ error: error.message });

  if (error.message.includes("jwt must be provided"))
    return response.status(401).send({ error: error.message });

  if (error.message.includes("Not Found")) return response.send(404);

  if (error.name === "ValidationError")
    return response.status(400).send({ error: error.message.split(":")[0] });

  if (error.message.includes("password"))
    return response.status(400).send({ error: error.message });

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  return response.send(500);
};

export default errorHandler;
