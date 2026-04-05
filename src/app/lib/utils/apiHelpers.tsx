const api_url = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "DELETE";

export async function createResponse<TBody>(
  endpoint: string,
  method: HttpMethod,
  body: TBody | null = null
) {
  const requestBody = body ? JSON.stringify(body) : null;

  const response = await fetch(`${api_url}/api/${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: requestBody,
  });

  const data = await response.json();
  return data;
}