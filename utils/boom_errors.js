export default function isBoomError(err, res) {
  if (err.isBoom) {
    const {
      output: { statusCode, payload },
    } = err;
    res.status(statusCode).json(payload);
  } else {
    res.status(500).json({ message: err.message });
  }
}
