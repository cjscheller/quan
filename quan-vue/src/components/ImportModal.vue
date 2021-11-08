<template>
    <div v-if="showModal" class="absolute top-0 left-0 h-full w-full flex justify-center">
        <div
            class="z-10 absolute h-full w-full bg-black opacity-10"
            @click="showModal = false"
        ></div>
        <div class="z-20 py-6 px-8 mt-28 h-fit bg-white rounded max-w-md">
            <div class="flex items-center">
                <h2 class="font-semibold text-lg">Import Transactions</h2>
                <div class="ml-auto font-bold text-xl cursor-pointer" @click="showModal = false">
                    <img src="@/assets/img/x.svg" alt="Close Modal" />
                </div>
            </div>
            <p class="text-left font-light my-4">
                <!-- <p class="text-left font-light my-4 pl-4 border-l-4 border-purple-400"> -->
                Import transactions for specified account. Import file should be in CSV format with
                header as first row and transactions in second row.
            </p>
            <div class="flex flex-col text-left">
                <Select
                    label="Accounts:"
                    placeholder="Select an account ..."
                    :data="accounts"
                    v-model="importAccount"
                    keyId="id"
                    valId="title"
                ></Select>
                <input type="file" ref="fileImport" accept=".csv" class="my-4" />
                <p v-if="flash" class="text-green-600">{{ flash }}</p>
                <button
                    class="bg-purple-600 text-white py-1 rounded mt-4 w-20 mx-auto"
                    @click="importCSV"
                >
                    Upload
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import Select from "@/components/Select.vue";

export default {
    name: "ImportModal",
    components: {
        Select
    },
    props: {
        show: Boolean,
        accounts: Array
    },
    data() {
        return {
            showModal: this.show,
            importAccount: "0",
            flash: ""
        };
    },
    methods: {
        async importCSV() {
            const files = this.$refs.fileImport.files;
            try {
                const result = await this.$apollo.mutate({
                    mutation: gql`
                        mutation($account: ID!, $file: Upload!) {
                            importCSV(account: $account, file: $file) {
                                success
                                count
                            }
                        }
                    `,
                    variables: {
                        account: this.importAccount,
                        file: files[0]
                    }
                });
                if (result.data.importCSV.success) {
                    this.flash = `Successfully imported ${result.data.importCSV.count} transactions.`;
                    setTimeout(() => {
                        this.flash = "";
                    }, 5000);
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
    watch: {
        show: function() {
            this.showModal = this.show;
        }
    }
};
</script>
