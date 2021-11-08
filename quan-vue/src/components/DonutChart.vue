<template>
    <div class="relative">
        <canvas ref="canvas"></canvas>
        <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="text-2xl font-semibold mt-4 leading-6">{{ total }}</div>
            <div class="text-md text-gray-500">total</div>
        </div>
    </div>
</template>

<script>
import { Chart, DoughnutController, ArcElement, Tooltip } from "chart.js";
Chart.register(DoughnutController, ArcElement, Tooltip);

export default {
    props: {
        data: Object,
        total: String
    },
    data() {
        return {
            chart: null
        };
    },
    methods: {
        initChart() {
            const options = {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: data => {
                                return `${data.label}: $${data.raw}`;
                            }
                        }
                    }
                },
                onClick: (event, item, chart) => {
                    this.$emit("click", chart.data.labels[item[0].index].toUpperCase());
                }
            };

            this.chart = new Chart(this.$refs.canvas, {
                type: "doughnut",
                data: this.buildChartData(),
                options: options
            });
        },
        buildChartData() {
            return {
                labels: Object.keys(this.data).map(this.$root.$options.filters.capitalCase),
                datasets: [
                    {
                        label: "Category Spending",
                        data: Object.values(this.data).map(cat => cat.amount),
                        backgroundColor: Object.values(this.data).map(cat => cat.color)
                    }
                ]
            };
        }
    },
    watch: {
        // Update chart data when prop updated
        data: function() {
            this.chart.data = this.buildChartData();
            this.chart.update();
        }
    },
    mounted() {
        this.initChart();
    }
};
</script>
