<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <select
            ref="select"
            :value="value"
            @change="onChange"
            v-bind="$attrs"
            class="m-2 border rounded w-inherit"
        >
            <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
            <option v-for="opt in data" :value="opt[keyId]" :key="opt[keyId]">
                {{ opt[valId] }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "Select",
    props: {
        // Label
        label: String,
        // Represents selected option. Used by v-model
        value: String,
        // Placeholder option
        placeholder: String,
        // Options for select element. Should be array of objects in format [{ $key: X, $val: Y }]
        data: Array,
        // Key identifier
        keyId: String,
        // Value identifier
        valId: String
    },
    methods: {
        // Input event will trigger v-model on this component in parent
        onChange(event) {
            this.$emit("input", event.target.value);
        }
    },
    updated: function() {
        // Handle setting value prop after options change (select element re-renders)
        if (this.value && this.value != this.$refs.select.value) {
            this.$refs.select.value = this.value;
        }
    }
};
</script>
