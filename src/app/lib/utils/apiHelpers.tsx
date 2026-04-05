/* eslint-disable @typescript-eslint/no-explicit-any */
const api_url = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "DELETE";

export async function createResponse(endpoint: string, method: HttpMethod, body: any = null) {
    body = body ? JSON.stringify(body) : null;
    
    const response = await fetch(`${api_url}/api/${endpoint}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: body,
    });
    
    const data = await response.json();
    return data;
}

