import * as logger from "../logs/logger";

export function returnError(err, req, res, next) {
  logger.error(err);
  return res.status(err.statusCode || 500).json({
    success: false, 
    message: err.message,
    ...(err.errorKey ? {errorKey: err.errorKey} : {})
  });
}
