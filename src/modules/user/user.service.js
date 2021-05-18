import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

exports.createToken = (user) => {
  const payload = {
    sub: user._id,
    userName: user.userName,
    iat: dayjs().unix(),
    exp: dayjs().add(14, 'day').unix(),
  };
  return jwt.sign(payload, process.env.SECRET_TOKEN);
};
