/**
 * global error handler
 */
export const errorHandler = (err:any, req:any, res:any, next:any) => {
  switch (true) {
    // TODO further error cases more explicitly ? 
    case err.name === "UnauthorizedError":
      return res.status(401).json({ message: "Unauthorized" });
    default:
      return res.status(500).json({ message: err.message });
  }
};
