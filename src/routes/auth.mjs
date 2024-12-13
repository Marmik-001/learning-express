import { Router } from "express";
import { temparr } from "../utils/usersArr.mjs";
const router = Router();

router.post("/api/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;

  const findUser = temparr.find((user) => user.username === username);
  if (!findUser) {
    return response.send({ msg: "unautheticated" }).status(404);
  }

  if (findUser.password !== password)
    return response.status(401).send({ msg: "wrong password bish" });

  console.log("current session cookie", request.session.cookie);

  request.session.user = findUser;
  response.status(200).send(findUser);
});

router.get("/api/auth/status", (request, response) => {
  if (request.session.user)
    return response.status(200).send(request.session.user);

  response.status(401).send({ msg: "user unauthorized" });
});

router.post("/api/cart", (request, response) => {
  if (!request.session.user)
    return response.send({ msg: "buddy not authorized" });
  const { body: item } = request;
  const { cart } = request.session;
  if (cart) {
    cart.push(item);
  } else {
    request.session.cart = [item];
    return response.status(200).send(request.session.cart);
  }
  console.log("cart", item);

  return response.send(cart);
});
router.get("/api/cart", (request, response) => {
  if (!request.session.user)
    return response.send({ msg: "buddy not authorized" });
  return response.send(request.session.cart);
});

export default router