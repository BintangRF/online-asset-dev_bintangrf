import { ref, computed } from "vue";

export function useQueryParams(defaults = {}) {
  const DEFAULT_PAGE = defaults.page ?? 1;
  const DEFAULT_LIMIT = defaults.limit ?? 10;
  const DEFAULT_SORT_KEY = defaults.sortKey ?? "id";
  const DEFAULT_SORT_ORDER = defaults.sortOrder ?? "DESC";

  const page = ref(DEFAULT_PAGE);
  const limit = ref(DEFAULT_LIMIT);
  const search = ref("");
  const sortKey = ref(DEFAULT_SORT_KEY);
  const sortOrder = ref(DEFAULT_SORT_ORDER);

  const isInitialLoad = ref(true);

  const queryKey = computed(() => [
    "query",
    page.value,
    limit.value,
    search.value,
    sortKey.value,
    sortOrder.value,
  ]);

  function buildOptionalParams() {
    const params = {};
    if (page.value !== DEFAULT_PAGE) params.page = page.value;
    if (limit.value !== DEFAULT_LIMIT) params.limit = limit.value;
    if (search.value) params.search = search.value;
    if (sortKey.value !== DEFAULT_SORT_KEY) params.sort = sortKey.value;
    if (sortOrder.value !== DEFAULT_SORT_ORDER) params.order = sortOrder.value;
    return params;
  }

  function setDefaultsFromBE(data) {
    if (isInitialLoad.value) {
      page.value = data.page ?? page.value;
      limit.value = data.limit ?? limit.value;
      sortKey.value = data.sort ?? sortKey.value;
      sortOrder.value = data.order ?? sortOrder.value;
      isInitialLoad.value = false;
    }
  }

  return {
    page,
    limit,
    search,
    sortKey,
    sortOrder,
    isInitialLoad,
    queryKey,
    buildOptionalParams,
    setDefaultsFromBE,
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    DEFAULT_SORT_KEY,
    DEFAULT_SORT_ORDER,
  };
}
