module.exports = function(eleventyConfig) {
    eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("about/**/*.{css,js,png}");
    eleventyConfig.addPassthroughCopy("portfolio/**/*.{css,js,png}");

}