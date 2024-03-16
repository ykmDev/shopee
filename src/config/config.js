const localConfig = {
  baseUrl: "https://dummyjson.com/",
  appUrl: "http://localhost:5173/",
  appAssetsUrl: "http://localhost:5173/public",
};

const productionConfig = {
  baseUrl: "https://dummyjson.com/auth/login",
  appUrl: "https://punyarrama.com/",
  appAssetsUrl: "https://punyarrama.com/public",
};

console.log("mode", import.meta.env.MODE);

export default import.meta.env.MODE === "production"
  ? productionConfig
  : localConfig;
