module.exports = {
    printWidth: 100,
    tabWidth: 4,
    overrides: [
        {
            files: "*.yml",
            options: {
                tabWidth: 2,
            },
        },
        {
            files: ["api", "legacy/**/*.js"],
            options: {
                tabWidth: 4,
            },
        },
    ],
};
