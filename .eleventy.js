module.exports = function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy("content/styles.css");
  eleventyConfig.addPassthroughCopy("content/search.js");
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  return {
    dir: {
      input: "content",
      output: "dist"
    }
  };
};
