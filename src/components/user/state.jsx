export function handleState(response, resp, danger) {
  response({
    received: true,
    danger: danger,
    message: danger
      ? resp.error
        ? resp.error
        : "Invalid Request"
      : resp.success,
  });
  setTimeout(() => {
    response({
      received: false,
      danger: false,
      message: "",
    });
  }, 2000);
}
