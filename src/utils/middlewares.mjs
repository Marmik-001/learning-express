import { temparr } from "./usersArr.mjs";
import patchUserSchema from "./userPathValidationSchema.mjs";
export const resolveUserByIndexId = (request, response, next) => {
  const {
    params: { id },
  } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(401);

  const findUserIndex = temparr.findIndex((user) => user.id === parsedId);
  console.log(findUserIndex);

  if (findUserIndex === -1) return response.send({ mgg: "user not found" });
  request.findUserIndex = findUserIndex;
  console.log('middleware: ',request.findUserIndex);
  
  next();
};

const allowedPostUrls = ["/api/users","/api/auth" ,"/api/cart" ,"/api/local-auth" , "/api/local-auth/logout"];
export const resolvePOSTmiddleware = (request, response, next) => {
  if (request.method === "POST" && !allowedPostUrls.includes(request.path)) {
    return response.status(405).send({ error: "cannot POST to this URL" });
  }
  next();
};


export const validatePatchReq = (request , response , next) => {
  const {error} = patchUserSchema.validate(request.body)
  if(error){
    return response.status(400).send(error.details)
  }
  next()
}
