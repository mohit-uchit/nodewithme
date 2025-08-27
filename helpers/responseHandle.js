// {
//       result: true,
//       message: 'Success',
//       payload: response,
//     }

const handleOk = (res, data) => {
  return res.status(200).send({
    result: true,
    message: 'success',
    payload: data,
  });
};

const handleError = (res, err) => {
  return res.status(500).send({
    result: false,
    message: err.message,
    payload: null,
  });
};

module.exports = {
  handleOk,
  handleError,
};
