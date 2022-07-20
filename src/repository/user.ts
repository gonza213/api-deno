import client from "../db.ts";

/** Obtener Usuario o Usuarios */
interface Params {
  id?: string | number;
}
const search = async (params: Params = {}) => {
  if (Object.keys(params).length !== 0) {
    return await client.execute("SELECT * FROM user WHERE id = ?", [params.id]);
  } else {
    return await client.execute("SELECT * FROM user");
  }
};

/** Crear Usuario */
interface insertParams {
  name: string;
  country: string;
}
const insert = async ({ name, country }: insertParams) => {
  return await client.execute(
    "INSERT INTO user (name, country) VALUES (?, ?)",
    [name, country]
  );
};
/** Editar Usuario */
const update = async (name: string, country: string, id: string | number) => {
  return await client.execute(
    "UPDATE user SET name = ?, country = ? WHERE id = ?",
    [name, country, id]
  );
};
/** Eliminar Usuario */
const remove = async (id: string) => {
  return await client.execute("DELETE FROM user WHERE id = ?", [id]);
};

export { search, insert, update, remove };
