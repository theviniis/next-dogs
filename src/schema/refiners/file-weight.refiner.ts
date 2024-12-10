const handler = (file: File) => file.size <= 5 * 1024 * 1024;

const data = {
  handler,
  message: "File must be smaller than 5MB",
};

export default data;
