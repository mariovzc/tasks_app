export default async function (model, page = 1, limit = 10) {
  const total_items = await model.find().count();

  const total_pages = total_items > 0 ? Math.ceil(total_items / limit) : 1;
  const prev = page > 1 ? page - 1 : null;
  const next =  page < total_pages ? page + 1 : null;
  return {
    total_items,
    total_pages,
    limit,
    page,
    prev,
    next,
  };
}
