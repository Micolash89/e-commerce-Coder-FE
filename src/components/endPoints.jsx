export const END_POINTS = {
  NODE_ENV: "production",
  PROD: "https://e-commerce-nodejs-2-4qw3.onrender.com",
  DEV: "http://localhost:8080",
  URL: function () {
    return END_POINTS.NODE_ENV === "production"
      ? END_POINTS.PROD
      : END_POINTS.DEV;
  },
};
