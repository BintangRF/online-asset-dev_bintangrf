<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { api } from "../api/api";
import DataTable from "../components/DataTable.vue";
import { useQueryParams } from "../composables/useQueryParams";

const {
  page,
  limit,
  search,
  sortKey,
  sortOrder,
  queryKey,
  buildOptionalParams,
  setDefaultsFromBE,
} = useQueryParams({
  page: 1,
  limit: 10,
  sortKey: "id",
  sortOrder: "DESC",
});

const { isPending, data, refetch } = useQuery({
  queryKey: queryKey,
  queryFn: async () => {
    const params = buildOptionalParams();
    const res = await api.get("/users", { params });

    setDefaultsFromBE(res.data);

    return res.data;
  },
  keepPreviousData: true,
});

const { mutate: createMutation } = useMutation({
  mutationFn: (payload) => api.post("/users", payload),
});

const { mutate: updateMutation } = useMutation({
  mutationFn: ({ row, payload }) => api.put(`/users/${row.id}`, payload),
});

const { mutate: deleteMutation } = useMutation({
  mutationFn: (row) => api.delete(`/users/${row.id}`),
});

const actions = {
  create: (payload) =>
    new Promise((resolve, reject) => {
      createMutation(payload, {
        onSuccess: (res) => resolve(res.data),
        onError: reject,
      });
    }),

  update: (row, payload) =>
    new Promise((resolve, reject) => {
      updateMutation(
        { row, payload },
        {
          onSuccess: (res) => resolve(res.data),
          onError: reject,
        }
      );
    }),

  delete: (row) =>
    new Promise((resolve, reject) => {
      deleteMutation(row, {
        onSuccess: (res) => resolve(res.data),
        onError: reject,
      });
    }),
};

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
        { label: 'No', key: 'id' },
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
      :actions="actions"
      @refresh="refetch"
      @search="handleSearch"
      @sort="handleSort"
      @change-page="handleChangePage"
    />
  </div>
</template>
