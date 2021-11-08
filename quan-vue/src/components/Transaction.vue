<template>
    <div
        class="flex items-center w-fit my-2 py-6 px-10 rounded-md bg-gray-100 relative"
        :class="{ 'opacity-50': hidden }"
    >
        <div class="w-8 h-8 mr-6 rounded-md" :class="colorStyle"></div>
        <div class="w-64 mr-8 text-left flex flex-col">
            <div class="font-semibold text-lg overflow-scroll whitespace-nowrap">
                <div v-if="!edit">{{ input.description }}</div>
                <input
                    v-else
                    type="text"
                    name="description"
                    v-model="input.description"
                    class="border"
                />
            </div>
            <div class="text-sm font-light text-gray-700">
                {{ acct }}
            </div>
        </div>
        <div>
            <div class="flex items-center">
                <div
                    class="w-4 h-4 mr-1 rounded-full flex items-center justify-center"
                    :class="outerDotStyle"
                >
                    <div class="w-2 h-2 rounded-full" :class="colorStyle"></div>
                </div>
                <div v-if="!edit" class="w-28 p-1 mr-6 font-semibold text-sm text-left">
                    {{ input.category | capitalCase }}
                </div>
                <Select
                    v-if="edit"
                    class="w-28 mr-6"
                    style="max-width: 110px"
                    :data="categories"
                    v-model="input.category"
                    keyId="name"
                    valId="name"
                />
            </div>
        </div>
        <div class="w-16 mr-6 text-left">{{ date | monthDay }}</div>
        <div
            :class="{ 'text-green-600': amount > 0 }"
            class="w-20 mr-6 flex items-center justify-end text-lg font-semibold"
        >
            <div v-if="amount > 0">+</div>
            <div v-else>-</div>
            {{ amount | currency }}

            <!-- ${{ Math.floor(amount) }}.
            <div class="font-semibold text-md">{{ String(amount.toFixed(2)).split(".")[1] }}</div> -->
        </div>
        <div>
            <div>
                <div v-if="edit" class="bg-white p-1.5 rounded-full cursor-pointer" @click="saveTx">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            class="fill-gray"
                            d="M17.12 5.71L12.29 0.88C11.7279 0.31723 10.9654 0.000700208 10.17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V15C0 15.7956 0.316071 16.5587 0.87868 17.1213C1.44129 17.6839 2.20435 18 3 18H15C15.7956 18 16.5587 17.6839 17.1213 17.1213C17.6839 16.5587 18 15.7956 18 15V7.83C17.9993 7.03462 17.6828 6.27207 17.12 5.71V5.71ZM7 16V14H11V16H7ZM16 15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H13V13C13 12.7348 12.8946 12.4804 12.7071 12.2929C12.5196 12.1054 12.2652 12 12 12H6C5.73478 12 5.48043 12.1054 5.29289 12.2929C5.10536 12.4804 5 12.7348 5 13V16H3C2.73478 16 2.48043 15.8946 2.29289 15.7071C2.10536 15.5196 2 15.2652 2 15V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H5V7C5 7.26522 5.10536 7.51957 5.29289 7.70711C5.48043 7.89464 5.73478 8 6 8H10C10.2652 8 10.5196 7.89464 10.7071 7.70711C10.8946 7.51957 11 7.26522 11 7C11 6.73478 10.8946 6.48043 10.7071 6.29289C10.5196 6.10536 10.2652 6 10 6H7V2H10.17C10.4348 2.00368 10.6884 2.10727 10.88 2.29L15.71 7.12C15.8027 7.21344 15.876 7.32426 15.9258 7.44609C15.9755 7.56793 16.0008 7.69839 16 7.83V15Z"
                        />
                    </svg>
                </div>
                <div v-else class="bg-white p-1.5 rounded-full cursor-pointer" @click="edit = true">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path
                            class="fill-gray"
                            d="M16.4 3.34001L13.66 0.60001C13.3024 0.264106 12.8338 0.0713693 12.3433 0.0584625C11.8529 0.0455557 11.3748 0.21338 11 0.530011L1.99999 9.53001C1.67676 9.85598 1.4755 10.2832 1.42999 10.74L0.999992 14.91C0.98652 15.0565 1.00553 15.2041 1.05565 15.3424C1.10578 15.4807 1.18579 15.6062 1.28999 15.71C1.38343 15.8027 1.49425 15.876 1.61609 15.9258C1.73792 15.9755 1.86838 16.0008 1.99999 16H2.08999L6.25999 15.62C6.71679 15.5745 7.14403 15.3732 7.46999 15.05L16.47 6.05001C16.8193 5.68098 17.0081 5.18852 16.995 4.68055C16.9818 4.17257 16.7679 3.69052 16.4 3.34001V3.34001ZM6.07999 13.62L3.07999 13.9L3.34999 10.9L8.99999 5.32001L11.7 8.02001L6.07999 13.62ZM13 6.68001L10.32 4.00001L12.27 2.00001L15 4.73001L13 6.68001Z"
                        />
                    </svg>
                </div>
            </div>
            <div
                v-if="edit"
                class="absolute flex w-5 h-5 rounded-full -top-2 -right-2 bg-red-500 cursor-pointer text-white"
                @click="hideTx"
                title="Hide"
            >
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" class="m-auto h-2.5">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14 3V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0H6C5.46957 0 4.96086 0.210714 4.58579 0.585786C4.21071 0.960859 4 1.46957 4 2V3H1C0.734784 3 0.48043 3.10536 0.292893 3.29289C0.105357 3.48043 0 3.73478 0 4C0 4.26522 0.105357 4.51957 0.292893 4.70711C0.48043 4.89464 0.734784 5 1 5H2V16C2 16.7956 2.31607 17.5587 2.87868 18.1213C3.44129 18.6839 4.20435 19 5 19H13C13.7956 19 14.5587 18.6839 15.1213 18.1213C15.6839 17.5587 16 16.7956 16 16V5H17C17.2652 5 17.5196 4.89464 17.7071 4.70711C17.8946 4.51957 18 4.26522 18 4C18 3.73478 17.8946 3.48043 17.7071 3.29289C17.5196 3.10536 17.2652 3 17 3H14ZM12 2H6V3H12V2ZM14 5H4V16C4 16.2652 4.10536 16.5196 4.29289 16.7071C4.48043 16.8946 4.73478 17 5 17H13C13.2652 17 13.5196 16.8946 13.7071 16.7071C13.8946 16.5196 14 16.2652 14 16V5Z"
                        fill="currentColor"
                    />
                    <path d="M6 7H8V15H6V7Z" fill="currentColor" />
                    <path d="M10 7H12V15H10V7Z" fill="currentColor" />
                </svg>
            </div>
            <div
                v-if="hidden"
                class="absolute flex w-5 h-5 rounded-full -top-2 -right-2 bg-green-500 cursor-pointer text-white"
                @click="restoreTx"
                title="Restore"
            >
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" class="m-auto h-2.5">
                    <path
                        d="M9 8H1M9 16V8V16ZM9 8V0V8ZM9 8H17H9Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import Select from "@/components/Select.vue";

export default {
    name: "Transaction",
    components: {
        Select
    },
    props: {
        id: [String, Number],
        description: String,
        date: String,
        category: String,
        amount: Number,
        acct: String
    },
    data() {
        return {
            edit: false,
            hidden: false,
            categories: [],
            color: "blue",
            input: {
                description: this.description,
                category: this.category
            }
        };
    },
    methods: {
        // Save changes to transaction via mutation
        saveTx() {
            // Turn off edit mode
            this.edit = false;

            // Execute GQL mutation
            this.$apollo
                .mutate({
                    mutation: gql`
                        mutation($id: ID!, $description: String, $category: CategoryType) {
                            updateTransaction(
                                id: $id
                                category: $category
                                description: $description
                            ) {
                                id
                                description
                                amount
                                category
                                date
                            }
                        }
                    `,
                    variables: {
                        id: this.id,
                        description: this.input.description,
                        category: this.input.category
                    }
                    // Update the cache with the result - see https://apollo.vuejs.org/guide/apollo/mutations.html
                    // update: (store, { data: { addTag } }) => {}
                })
                .catch(error => {
                    console.error(
                        error.networkError ? error.networkError.result.errors[0].message : error
                    );
                });
        },
        // Hide transaction - save changes to tx via mutation, initially "grey out"
        async hideTx() {
            try {
                await this.updateHidden(true);
                this.hidden = true;
                this.edit = false;
            } catch (error) {
                console.error(
                    error.networkError ? error.networkError.result.errors[0].message : error
                );
            }
        },
        // Restore transaction
        async restoreTx() {
            try {
                await this.updateHidden(false);
                this.hidden = false;
            } catch (error) {
                console.error(
                    error.networkError ? error.networkError.result.errors[0].message : error
                );
            }
        },
        // Set transaction "hidden" boolean to hidden parameter
        updateHidden(hidden = false) {
            return this.$apollo.mutate({
                mutation: gql`
                    mutation($id: ID!, $hidden: Boolean) {
                        updateTransaction(id: $id, hidden: $hidden) {
                            id
                        }
                    }
                `,
                variables: {
                    id: this.id,
                    hidden: hidden
                }
            });
        }
    },
    computed: {
        // Select random color for avatar square
        colorStyle() {
            return `bg-${this.color}-500`;
        },
        outerDotStyle() {
            return `bg-${this.color}-300`;
        }
    },
    apollo: {
        // Apollo Client will fetch categories from cache once requested, so this isn't horrible
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
            update: data => data.__type.enumValues
        }
    },
    mounted: function() {
        // On mount, randomly select a color for this transaction. This is temporary/for show
        const colors = ["red", "yellow", "green", "blue", "indigo", "purple", "pink"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
};
</script>
