module.exports = function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy("content/styles.css");
  eleventyConfig.addPassthroughCopy("content/search.js");

  return {
    dir: {
      input: "content",
      output: "dist"
    }
  };
};
