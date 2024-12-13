import Joi from "joi";
import { Router } from "express";
import {
  checkSchema,
  validationResult,
  matchedData,
} from "express-validator";
import { queryValidationSchema } from "../utils/queryValidationSchema.mjs";
import { userValidationBodySchema } from "../utils/validationSchema.mjs";
import { temparr } from "../utils/usersArr.mjs";
import {
  resolvePOSTmiddleware,
  resolveUserByIndexId,
  validatePatchReq,
} from "../utils/middlewares.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import express from "express";
import { hashPassword } from "../utils/helpers.mjs";
const router = Router();
router.use(express.json());
router.use(resolvePOSTmiddleware);
router.get(
  "/api/users",
  checkSchema(queryValidationSchema),
  (request, response) => {
    console.log(request.query);
    const result = validationResult(request);
    console.log("query body: ", result);

    const {
      query: { filter, value },
    } = request;
    console.log("value", value);

    if (!filter || !value) {
      return response.send(temparr);
    }
    if (filter && value) {
      const filteredUsers = temparr.filter((user) =>
        user[filter].includes(value)
      );
      return response.send(filteredUsers);
    }
  }
);

router.post(
  "/api/users",
  checkSchema(userValidationBodySchema),
  async (request, response) => {
    const result = validationResult(request);
    if (!result) return response.send(result);

    const data = matchedData(request);
    console.log(data.password);

    data.password = await hashPassword(data.password);
    console.log(data.password);
    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      return response.status(201).send(savedUser);
    } catch (error) {
      console.log("errro:", error);
      return response.status(400).send({ msg: `error ${error}` });
    }
  }
);

router.get("/api/users/:id", (request, response) => {
  // const usersArr = readUsersFromFile();
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: "error bad request" });
  }

  const user = temparr.find((user) => user.id === parsedId);
  console.log("user", user);

  if (!user) {
    return response.sendStatus(404);
  }

  console.log(user);
  response.send(user);
});

router.patch(
  "/api/users/:id",
  resolveUserByIndexId,
  validatePatchReq,
  (request, response) => {
    const { body, findUserIndex } = request;

    temparr[findUserIndex] = { ...temparr[findUserIndex], ...body };
    console.log("answer :", temparr[findUserIndex]);
    response.send(temparr[findUserIndex]);
  }
);

router.delete("/api/users/:id", resolveUserByIndexId, (request, response) => {
  const { findUserIndex } = request;
  temparr.splice(findUserIndex, 1);

  response.send(temparr);
});

router.put(
  "/api/users/:id",
  resolveUserByIndexId,
  checkSchema(userValidationBodySchema),
  (request, response) => {
    // const usersArr = readUsersFromFile();
    const {
      body,
      // params: { id },
      findUserIndex,
    } = request;
    const result = validationResult(request);
    if (!result.isEmpty())
      return response.status(400).send({ error: result.array() });
    console.log("read this: ", findUserIndex);
    temparr[findUserIndex] = { id: temparr[findUserIndex].id, ...body };
    // console.log(temparr[findUserIndex]);
    console.log("upddated user: ", temparr[findUserIndex]);

    // updateUsersToFile(temparr);
    return response.sendStatus(200);
  }
);

export default router;

// const usersArr = readUsersFromFile();
// // console.log("Request body:", request.body); // Log the request body to see the received data
// const result = validationResult(request);
// console.log("result:", result);

// if (!result.isEmpty())
//   return response.status(400).send({ error: result.array() });

// const data = matchedData(request);
// console.log("data", data);

// const {
//   body: { name, username },
// } = request;
// if (!name || !username) {
//   return response.send({ error: "need to provide username and name" });
// }
// const newUserId = temparr.length + 1;
// const newUser = request.body;
// const orderedNewUser = { id: newUserId, ...newUser };
// temparr.push(orderedNewUser);
// // temparr[temparr.length - 1].id = temparr.length
// console.log("Updated users array:", temparr); // Debugging statement
// response.status(201).send(newUser);
