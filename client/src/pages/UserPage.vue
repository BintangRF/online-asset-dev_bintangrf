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

const usersQueryKey = computed(() => [
  "users",
  page.value,
  limit.value,
  search.value,
  sortKey.value,
  sortOrder.value,
]);

const { isPending, data, refetch } = useQuery({
  queryKey: usersQueryKey,
  queryFn: async () => {
    const res = await api.get("/users", {
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
        { label: 'Email', key: 'email' },
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
            name: 'email',
            label: 'Email',
            type: 'email',
            rules: 'required|email',
          },
        ],
        initial: { name: '', email: '' },
      }"
      :actions="{
        create: async (payload) => {
          const res = await api.post('/users', payload);
          return res.data;
        },
        update: async (row, payload) => {
          const res = await api.put('/users/' + row.id, payload);
          return res.data;
        },
        delete: async (row) => {
          const res = await api.delete('/users/' + row.id);
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
