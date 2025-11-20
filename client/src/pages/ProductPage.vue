<script setup>
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { api } from "../api/api";
import DataTable from "../components/DataTable.vue";

const page = ref(1);
const limit = ref(10);
const search = ref("");
const sortKey = ref("");
const sortOrder = ref("");

const productsQueryKey = computed(() => [
  "products",
  page.value,
  limit.value,
  search.value,
  sortKey.value,
  sortOrder.value,
]);

const { isPending, data, refetch } = useQuery({
  queryKey: productsQueryKey,
  queryFn: async () => {
    const res = await api.get("/products", {
      params: {
        page: page.value,
        limit: limit.value,
        search: search.value,
        sort: sortKey.value || "createdAt",
        order: sortOrder.value || "DESC",
      },
    });
    return res.data;
  },
  keepPreviousData: true,
});

const handleSearch = (value) => {
  search.value = value;
  page.value = 1;
};

const handleSort = (v) => {
  sortKey.value = v.key || "";
  sortOrder.value = (v.order || "").toLowerCase() === "asc" ? "asc" : "desc";
  page.value = 1;
};

const handleChangePage = (p) => {
  page.value = p;
};
</script>

<template>
  <div class="p-6">
    <DataTable
      :data="data?.data || []"
      :columns="[
        { label: 'ID', key: 'id' },
        { label: 'Name', key: 'name' },
        { label: 'Price', key: 'price' },
        { label: 'Category', key: 'category' },
      ]"
      :is-loading="isPending"
      :total="data?.total || 0"
      :page="page"
      :limit="limit"
      :form="{
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            rules: 'required|min:3',
          },
          {
            name: 'price',
            label: 'Price',
            type: 'number',
            rules: 'required|number|min:0',
          },
          {
            name: 'category',
            label: 'Category',
            type: 'text',
            rules: 'required|min:3',
          },
        ],
        initial: { name: '', price: 0, category: '' },
      }"
      :actions="{
        create: async (payload) => {
          const res = await api.post('/products', payload);
          return res.data;
        },
        update: async (row, payload) => {
          const res = await api.put('/products/' + row.id, payload);
          return res.data;
        },
        delete: async (row) => {
          const res = await api.delete('/products/' + row.id);
          return res.data;
        },
      }"
      @refresh="refetch"
      @search="handleSearch"
      @sort="handleSort"
      @change-page="handleChangePage"
    />
  </div>
</template>
