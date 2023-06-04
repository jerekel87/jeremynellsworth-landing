import axios from "axios";

export async function fetchData(endpoint) {
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API_URL}/${endpoint}`,
      {
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
