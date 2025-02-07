module.exports = function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy("content/styles.css");
  eleventyConfig.addPassthroughCopy("content/search.js");
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  // Get pathPrefix from environment variable or use empty string
  const pathPrefix = process.env.PATH_PREFIX || '';

  return {
    dir: {
      input: "content",
      output: "dist"
    },
    pathPrefix: pathPrefix
  };
};
