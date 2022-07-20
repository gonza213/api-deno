import client from "../db.ts";

export const findById = async (id: number | string): Promise<boolean> => {
  const result = await client.query(
    "SELECT COUNT(*) count FROM user WHERE id = ?",
    [id]
  );
  return result[0].count >= 1;
};

