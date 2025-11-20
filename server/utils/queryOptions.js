import { Op } from "sequelize";

export function buildQueryOptions(query, searchableFields = []) {
  const {
    page = 1,
    limit = 10,
    sort = "createdAt",
    order = "DESC",
    search = "",
    ...filters
  } = query;

  const offset = (page - 1) * Number(limit);

  let where = { ...filters };

  if (search && searchableFields.length > 0) {
    where[Op.or] = searchableFields.map((field) => ({
      [field]: {
        [Op.iLike]: `%${search}%`,
      },
    }));
  }

  return {
    where,
    order: [[sort, order.toUpperCase() === "ASC" ? "ASC" : "DESC"]],
    limit: Number(limit),
    offset,
  };
}
