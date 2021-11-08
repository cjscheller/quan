<template>
    <div>
        <h1 class="text-3xl font-bold">Transactions</h1>
        <div class="pt-8 pb-4 flex items-center justify-center">
            <div class="flex flex-col items-start mr-4">
                <label for="txId" class="mr-2">ID:</label>
                <input type="text" id="txId" v-model="txId" class="w-20 border rounded" />
            </div>

            <div class="flex flex-col items-start mr-2">
                <label class="pl-2">Category:</label>
                <Select
                    placeholder="Select a category ..."
                    :data="categories"
                    v-model="category"
                    keyId="name"
                    valId="name"
                ></Select>
            </div>

            <div class="flex flex-col items-start mr-2">
                <label class="pl-2">Accounts:</label>
                <Select
                    placeholder="Select an account ..."
                    :data="accounts"
                    v-model="account"
                    keyId="id"
                    valId="title"
                ></Select>
            </div>

            <div class="flex flex-col items-start mr-4 w-32 h-12">
                <label>Date:</label>
                <DateFilter v-model="dateFilter" :label="false" start="" end="" />
            </div>

            <br />
        </div>
        <div class="pb-10 flex items-center justify-center">
            <button @click="fetchTransactions" class="bg-purple-600 text-white px-2 py-1 rounded">
                Fetch
            </button>
            <button class="bg-gray-400 text-white px-2 py-1 rounded ml-4" @click="modal = true">
                Import
            </button>
        </div>
        <h3 v-if="$apollo.loading">Loading</h3>
        <div class="w-fit mx-auto mb-20">
            <Transaction
                v-for="tx in transactions"
                :key="tx.id"
                v-bind="tx"
                :acct="accounts[parseInt(tx.account.id)].title"
            />
        </div>

        <ImportModal :show="modal" :accounts="accounts" />
    </div>
</template>

<script>
import gql from "graphql-tag";
import Select from "@/components/Select.vue";
import DateFilter from "@/components/DateFilter.vue";
import Transaction from "../components/Transaction.vue";
import ImportModal from "../components/ImportModal.vue";

export default {
    name: "Transactions",
    components: {
        Select,
        DateFilter,
        Transaction,
        ImportModal
    },
    data() {
        return {
            transactions: [],
            accounts: [],
            categories: [],
            txId: "",
            category: "All",
            account: "0",
            dateFilter: {},
            modal: false
        };
    },
    methods: {
        async fetchTransactions() {
            // Dynamically define query variables based on provided form fields
            const variables = {
                id: this.txId
            };
            if (this.category != "All") {
                variables.category = this.category;
            }
            if (this.account != "0") {
                variables.account = parseInt(this.account);
            }
            variables.date = this.dateFilter;

            try {
                const result = await this.$apollo.query({
                    query: gql`
                        query GetTransactions(
                            $id: ID
                            $category: CategoryType
                            $account: Int
                            $date: DateFilter
                        ) {
                            transactions(
                                id: $id
                                category: $category
                                account: $account
                                date: $date
                            ) {
                                id
                                description
                                amount
                                category
                                date
                                account {
                                    id
                                }
                            }
                        }
                    `,
                    variables: variables
                });

                this.transactions = result.data.transactions;
            } catch (error) {
                console.error(
                    error.networkError ? error.networkError.result.errors[0].message : error
                );
            }
        }
    },
    apollo: {
        categories: {
            query: gql`
                query GetEnumCategories($name: String!) {
                    __type(name: $name) {
                        enumValues {
                            name
                        }
                    }
                }
            `,
            variables: {
                name: "CategoryType"
            },
            update: data => [{ name: "All" }, ...data.__type.enumValues]
        },
        accounts: {
            query: gql`
                query GetAccounts {
                    accounts {
                        id
                        title
                    }
                }
            `,
            update: data => [{ id: 0, title: "All" }, ...data.accounts]
        }
    }
};
</script>
