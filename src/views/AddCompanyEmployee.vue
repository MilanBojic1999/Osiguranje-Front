<script setup>
import { ref, reactive, computed, onMounted, inject } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { companyAPI } from "../api/companyAPI";
import axios from "axios";

    const companies = ref([]);
    const loading = ref(false);
    const toast = inject("toast");
    const router = useRouter();

    onMounted(() => {
      companyAPI.getCompanies().then((res) => {
        companies.value = res.data;
        console.log(companies.value);
      });
    });

    const form = reactive({
      companyId: 1,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      companyPosition: "",
      note: "",
    });
    const rules = computed(() => {
      return {
        companyId: { required },
        firstName: { required },
        lastName: { required },
        phoneNumber: { required },
        email: { required, email },
        companyPosition: { required },
      };
    });
    const v$ = useVuelidate(rules, form);

    function onSubmit(evt) {
      v$.value.$validate().then(() => {
        if (!v$.value.$invalid) {
          loading.value = true;
          let data = {
            name: form.firstName,
            surname: form.lastName,
            phone: form.phoneNumber,
            email: form.email,
            companyPosition: form.companyPosition,
            description: form.note
          }
          companyAPI
            .addCompanyEmployeeContact(form.companyId, data)
            .then((res) => {
              loading.value = false;
              toast.success("Employee contact added successfully");
              router.push("/company/" + form.companyId);
            })
            .catch((err) => {
              loading.value = false;
              toast.error("Something went wrong");
            });
        } else {
          evt.preventDefault();
        }
      });
    }


</script>

<template>
  <vue-element-loading :active="loading" spinner="bar-fade-scale" style="height: 100vh" />
  <div class="container">
    <h2 class="mt-5 text-center">Employee contact</h2>
    <br />
    <div class="row justify-content-center">
      <div class="col-5">
        <form @submit.prevent="onSubmit">
          <div class="row">
            <div class="form-outline mb-4">
              <label for="company">Company:</label>
              <select class="form-select" id="company" v-model="form.companyId">
                <option :selected="i === 0" v-for="(company, i) in companies" :value="company.id">
                  {{ company.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <input
                type="text"
                v-model="form.firstName"
                class="form-control"
                id="firstName"
              />
            </div>
            <div
              class="input-errors"
              v-for="error of v$.firstName.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <input
                type="text"
                v-model="form.lastName"
                class="form-control"
                id="lastName"
              />
            </div>
            <div
              class="input-errors"
              v-for="error of v$.lastName.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <input
                type="text"
                v-model="form.phoneNumber"
                class="form-control"
                id="phoneNumber"
              />
            </div>
            <div
              class="input-errors"
              v-for="error of v$.phoneNumber.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                v-model="form.email"
                class="form-control"
                id="email"
              />
            </div>
            <div
              class="input-errors"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="companyPosition" class="form-label"
                >Company Position</label
              >
              <input
                type="text"
                v-model="form.companyPosition"
                class="form-control"
                id="companyPosition"
              />
            </div>
            <div
              class="input-errors"
              v-for="error of v$.companyPosition.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="note" class="form-label">Note</label>
              <textarea
                type="text"
                v-model="form.note"
                class="form-control"
                id="note"
              >
              </textarea>
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Submit</button>
          
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>
.error-msg {
  color: red;
}
</style> 