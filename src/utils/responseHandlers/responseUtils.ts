export const successHandler = (res, successMsg, successData) => {
  return res.status(200).json({
    success: true,
    data: successData,
    ...(successMsg ? {message: successMsg}: {}),
  });
};
