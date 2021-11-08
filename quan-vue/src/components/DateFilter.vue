<template>
    <div class="flex">
        <div v-if="label" class="mr-2">Date:</div>
        <div v-if="open" class="flex flex-col border rounded w-52 absolute z-10 bg-white">
            <div class="px-6 py-4 relative">
                <div class="flex flex-col items-start">
                    <label for="month-year">Month:</label>
                    <input
                        type="month"
                        id="month-year"
                        class="border rounded w-full"
                        v-model="dateMonth"
                        @change="updateFilter"
                    />
                </div>
                <div class="absolute -bottom-3 -right-3 cursor-pointer text-white">
                    <div
                        class="w-6 h-6 rounded-full flex items-center justify-center bg-green-500"
                        @click="open = false"
                    >
                        <svg
                            width="10"
                            height="10"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 4.00002C0 3.86741 0.0526785 3.74024 0.146447 3.64647C0.240215 3.5527 0.367392 3.50002 0.5 3.50002H6.293L4.146 1.35402C4.05211 1.26013 3.99937 1.1328 3.99937 1.00002C3.99937 0.867246 4.05211 0.739908 4.146 0.646021C4.23989 0.552135 4.36722 0.49939 4.5 0.49939C4.63278 0.49939 4.76011 0.552135 4.854 0.646021L7.854 3.64602C7.90056 3.69247 7.93751 3.74764 7.96271 3.80839C7.98792 3.86913 8.00089 3.93425 8.00089 4.00002C8.00089 4.06579 7.98792 4.13091 7.96271 4.19165C7.93751 4.2524 7.90056 4.30758 7.854 4.35402L4.854 7.35402C4.76011 7.44791 4.63278 7.50065 4.5 7.50065C4.36722 7.50065 4.23989 7.44791 4.146 7.35402C4.05211 7.26013 3.99937 7.1328 3.99937 7.00002C3.99937 6.86725 4.05211 6.73991 4.146 6.64602L6.293 4.50002H0.5C0.367392 4.50002 0.240215 4.44734 0.146447 4.35358C0.0526785 4.25981 0 4.13263 0 4.00002Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <hr />
            <div class="px-6 p-4 text-left">
                <div>
                    <label for="start-date">Start:</label>
                    <input
                        type="date"
                        id="start-date"
                        class="border rounded w-full"
                        v-model="dateStart"
                        @change="updateFilter"
                    />
                </div>
                <div class="mt-2">
                    <label for="end-date">End:</label>
                    <input
                        type="date"
                        id="end-date"
                        class="border rounded w-full"
                        v-model="dateEnd"
                        @change="updateFilter"
                    />
                </div>
            </div>
        </div>
        <div v-else class="cursor-pointer border rounded w-fit px-2" @click="open = true">
            <div v-if="dateMonth">{{ dateMonth }}</div>
            <div v-else-if="dateStart && dateEnd">
                {{ dateStart | monthDay }} to {{ dateEnd | monthDay }}
            </div>
            <div v-else>None</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DateFilter",
    props: {
        start: {
            type: String,
            default: () => {
                const subMonth = new Date();
                subMonth.setMonth(subMonth.getMonth() - 1);
                return subMonth.toISOString().split("T")[0];
            }
        },
        end: {
            type: String,
            default: () => {
                return new Date().toISOString().split("T")[0];
            }
        },
        label: {
            type: Boolean,
            default: true
        },
        default: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dateFilter: {},
            dateStart: this.start,
            dateEnd: this.end,
            dateMonth: "",
            open: false
        };
    },
    methods: {
        // Update and emit date filter based on selected inputs
        updateFilter() {
            // For now default to month if set, else check and set range
            if (this.dateMonth) {
                this.dateFilter = { month: this.dateMonth };
            } else {
                if (this.dateStart) {
                    this.dateFilter = { gt: this.dateStart };
                }
                if (this.dateEnd) {
                    if (this.dateFilter.gt) {
                        this.dateFilter.lt = this.dateEnd;
                    } else {
                        // Date object not previously defined, so define here
                        this.dateFilter = { lt: this.dateEnd };
                    }
                }
            }
            // Emit dateFilter value for v-model input
            this.$emit("input", this.dateFilter);
        }
    },
    mounted: function() {
        // Call update filter to set and emit initial date filter
        this.updateFilter();
    }
};
</script>
