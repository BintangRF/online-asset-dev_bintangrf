<script setup>
import { ref, computed } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue-sonner";

const props = defineProps({
  data: Array,
  columns: Array,
  isLoading: Boolean,
  total: Number,
  page: Number,
  limit: Number,
  actions: Object,
  form: Object,
});

const emits = defineEmits(["refresh", "search", "sort", "change-page"]);

const localSearch = ref("");
const showModal = ref(false);
const editing = ref(null);
const submitting = ref(false);

const formValues = ref({});

let searchTimer = null;
const onSearch = () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => emits("search", localSearch.value), 300);
};

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / props.limit))
);

const go = (p) => {
  if (p < 1 || p > totalPages.value) return;
  emits("change-page", p);
};

const sortKey = ref("");
const sortOrder = ref("asc");

const sort = (key) => {
  if (sortKey.value === key)
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
  emits("sort", { key: sortKey.value, order: sortOrder.value });
};

const openCreate = () => {
  editing.value = null;
  formValues.value = { ...(props.form.initial || {}) };
  showModal.value = true;
};

const openEdit = (row) => {
  editing.value = row;
  formValues.value = { ...(props.form.initial || {}), ...row };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editing.value = null;
  submitting.value = false;
};

const yupSchema = computed(() => {
  const shape = {};

  props.form.fields.forEach((f) => {
    let v = f.type === "number" ? yup.number() : yup.string();

    const rules = (f.rules || "").split("|");

    rules.forEach((r) => {
      if (r === "required") v = v.required("Required");
      if (r.startsWith("min:")) v = v.min(+r.split(":")[1]);
      if (r.startsWith("max:")) v = v.max(+r.split(":")[1]);
    });

    shape[f.name] = v;
  });

  return yup.object().shape(shape);
});

const submitForm = async (values) => {
  submitting.value = true;

  try {
    if (editing.value) {
      const res = await props.actions.update(editing.value, values);
      toast.success(res?.message || "Updated!");
    } else {
      const res = await props.actions.create(values);
      toast.success(res?.message || "Created!");
    }

    closeModal();
    emits("refresh");
  } catch (e) {
    toast.error(e?.message || "Failed");
    submitting.value = false;
  }
};

const del = async (row) => {
  if (!confirm("Delete item?")) return;
  try {
    const res = await props.actions.delete(row);
    toast.success(res?.message || "Deleted!");
    emits("refresh");
  } catch (e) {
    toast.error(e?.message || "Failed");
  }
};
</script>

<template>
  <div class="w-full">
    <!-- Top bar -->
    <div class="flex justify-between mb-3">
      <input
        class="input input-bordered w-64"
        placeholder="Search..."
        v-model="localSearch"
        @input="onSearch"
      />

      <button v-if="actions.create" class="btn btn-primary" @click="openCreate">
        Add New
      </button>
    </div>

    <div class="overflow-x-auto border rounded-lg bg-white">
      <table class="table">
        <thead class="bg-base-200">
          <tr>
            <th
              v-for="c in columns"
              :key="c.key"
              @click="sort(c.key)"
              class="cursor-pointer"
            >
              {{ c.label }}
              <span v-if="sortKey === c.key">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </th>
            <th v-if="actions.update || actions.delete">Actions</th>
          </tr>
        </thead>

        <tbody class="text-black">
          <tr v-if="isLoading">
            <td :colspan="columns.length + 1" class="text-center py-3">
              Loading...
            </td>
          </tr>

          <tr v-else-if="!data.length">
            <td :colspan="columns.length + 1" class="text-center py-3">
              No data
            </td>
          </tr>

          <tr v-else v-for="row in data" :key="row.id">
            <td v-for="c in columns" :key="c.key">
              {{ row[c.key] }}
            </td>

            <td class="flex gap-2">
              <button
                v-if="actions.update"
                class="btn btn-sm"
                @click="openEdit(row)"
              >
                Edit
              </button>
              <button
                v-if="actions.delete"
                class="btn btn-sm btn-error"
                @click="del(row)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-2 mt-4">
      <button class="btn" :disabled="page === 1" @click="go(page - 1)">
        Prev
      </button>

      <button
        v-for="p in totalPages"
        :key="p"
        class="btn"
        :class="p === page ? 'btn-primary' : ''"
        @click="go(p)"
      >
        {{ p }}
      </button>

      <button class="btn" :disabled="page === totalPages" @click="go(page + 1)">
        Next
      </button>
    </div>

    <!-- Modal -->
    <dialog class="modal" :open="showModal">
      <div class="modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold mb-4">
          {{ editing ? "Edit" : "Add New" }}
        </h3>

        <Form
          :initial-values="formValues"
          :validation-schema="yupSchema"
          @submit="submitForm"
        >
          <div class="flex flex-col gap-4">
            <div
              v-for="f in form.fields"
              :key="f.name"
              class="flex flex-col gap-1"
            >
              <label>{{ f.label }}</label>

              <Field :name="f.name" v-slot="{ field }">
                <input
                  class="input input-bordered w-full"
                  v-bind="field"
                  :type="f.type === 'number' ? 'number' : 'text'"
                />
              </Field>

              <ErrorMessage :name="f.name" class="text-error text-sm" />
            </div>

            <div class="flex justify-end gap-2 mt-2">
              <button class="btn" @click="closeModal" type="button">
                Cancel
              </button>
              <button
                class="btn btn-primary"
                type="submit"
                :disabled="submitting"
              >
                {{ submitting ? "Saving..." : "Save" }}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </dialog>
  </div>
</template>
