<template>
    <div class="px-28">
        <h1 class="text-3xl font-bold">Categories</h1>
        <div class="flex items-center justify-center mt-5">
            <div class="flex flex-col items-start w-52 h-12 mr-4">
                <label>Date:</label>
                <DateFilter v-model="dateFilter" :label="false" />
            </div>
            <button
                @click="this.fetchTxsByCategory"
                class="bg-purple-600 text-white px-2 py-1 h-fit rounded mt-4"
            >
                Fetch
            </button>
        </div>
        <div
            class="flex py-12 items-center justify-around flex-col lg:flex-row"
            v-if="transactions.length"
        >
            <DonutChart
                :data="summedTxs"
                :total="txTotal | currency"
                class="min-w-96 h-96"
                @click="showTransactions"
            />
            <div class="min-w-80 mt-16 lg:mt-0">
                <div
                    v-for="(cat, title) in summedTxs"
                    :key="title"
                    class="flex items-center pb-1 cursor-pointer"
                    @click="showTransactions(title)"
                >
                    <div class="w-3 h-3 rounded-full" :style="{ background: cat.color }"></div>
                    <div class="pl-6">{{ title | capitalCase }}</div>
                    <div class="ml-auto">{{ cat.amount | currency }}</div>
                </div>
                <hr />
                <div class="flex items-center pt-2">
                    <div class="w-3"></div>
                    <div class="ml-6">Total</div>
                    <div class="ml-auto">{{ txTotal | currency }}</div>
                </div>
            </div>
        </div>
        <div class="w-fit mx-auto my-12" v-if="transactions.length">
            <h2 class="text-2xl font-semibold pb-6 text-left">Transactions</h2>
            <Transaction v-for="tx in listTxs" :key="tx.id" v-bind="tx" :acct="tx.account.title" />
            <div v-if="!listTxs.length">
                Select a category to view it's transactions.
            </div>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import DateFilter from "../components/DateFilter.vue";
import DonutChart from "../components/DonutChart.vue";
import Transaction from "../components/Transaction.vue";

export default {
    name: "Categories",
    components: {
        DateFilter,
        DonutChart,
        Transaction
    },
    data() {
        return {
            transactions: [],
            txTotal: 0.0,
            listTxs: [],
            dateFilter: {}
        };
    },
    methods: {
        async fetchTxsByCategory() {
            const variables = {
                account: 0,
                date: this.dateFilter
            };

            try {
                const result = await this.$apollo.query({
                    query: gql`
                        query GetTransactions($date: DateFilter, $account: Int) {
                            transactions(date: $date, account: $account) {
                                id
                                description
                                amount
                                category
                                date
                                account {
                                    title
                                }
                            }
                        }
                    `,
                    variables: variables
                });

                this.transactions = result.data.transactions;
            } catch (error) {
                console.error(error);
            }
        },
        // Display transactions for category 'title'
        showTransactions(title) {
            this.listTxs = this.transactions.filter(tx => tx.category === title);
        }
    },
    computed: {
        // Sum transactions by category
        summedTxs() {
            this.txTotal = 0.0;
            const summed = [...this.transactions].reduce((acc, tx) => {
                acc[tx.category] = tx.category in acc ? acc[tx.category] + tx.amount : tx.amount;
                this.txTotal += tx.amount;
                return acc;
            }, {});

            for (var cat in summed) {
                let amt = summed[cat];
                summed[cat] = {
                    amount: Math.abs(amt).toFixed(2),
                    color: `rgb(${randInt(256)},${randInt(256)},${randInt(256)},1.0)`
                };
            }
            return summed;

            function randInt(max) {
                return Math.floor(Math.random() * max);
            }
        }
    }
};
</script>
