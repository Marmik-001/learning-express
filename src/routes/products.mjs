import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  // console.log(request.headers.cookie);
  // console.log("parsed", request.cookies);
  // console.log("signed: " , request.signedCookies.hello);
  console.log("product normal:", request.session);
  console.log("product normal:", request.sessionID);

  request.sessionStore.get(request.sessionID, (err, sessionData) => {
    if(err) throw err
    console.log('session data:',sessionData);
    
  });

  if (request.cookies.hello && request.cookies.hello === "world")
    return response.send({ id: 123, name: "egg" });
  return response.send({ msg: "you dont have the correct cookie" });
});

export default router;
