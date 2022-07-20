import { insert, remove, search, update } from "../repository/user.ts";
import { findById } from "../libs/userExist.ts";

/** Obtener Usuarios */
const getAllUsers = async (ctx: any) => {
  try {
    const { rows } = await search();
    ctx.response.body = rows;
  } catch (error) {
    console.log(error);
  }
};

/** Obtener Usuario */
const getUser = async ({ response, params }: any) => {
  const userExist = await findById(params.id);
  if (userExist) {
    const { rows } = await search(params);
    response.body = rows[0];
    response.status = 200;
  } else {
    response.body = { msg: "User not found" };
    response.status = 404;
  }
};

/** Crear Usuario */
const addUser = async ({ response, request }: any) => {
  const { value } = await request.body();
  const user = await value;

  if (user.hasOwnProperty("name") && user.hasOwnProperty("country")) {
    await insert(user);
    response.body = {
      msg: "ok",
      user,
    };
    response.status = 201;
  } else {
    response.body = {
      msg: "Request invalid",
    };
    response.status = 400;
  }
};

/** Editar Usuario */
const updateUser = async ({ response, request, params }: any) => {
  const userExist = await findById(params.id);

  if (userExist) {
    const { value } = await request.body();
    const user: any = await value;

    await update(user.name, user.country, params.id);

    response.status = 200;
    response.body = { msg: "ok", user };
  } else {
    response.status = 404;
    response.body = { msg: "User not found" };
  }
};

/** Eliminar Usuario */
const deleteUser = async ({ response, params }: any) => {
  const userExist = await findById(params.id);

  if (userExist) {
    const resp = await remove(params.id);
    response.status = 200;
    response.body = { msg: "ok" };
  } else {
    response.status = 404;
    response.body = { msg: "User not found" };
  }
};

export { getAllUsers, getUser, addUser, updateUser, deleteUser };
