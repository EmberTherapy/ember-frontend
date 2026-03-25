const base_api_url = "http://localhost:5000/";

type HttpMethod = "GET" | "POST" | "DELETE";

export async function createResponse(endpoint: string, method: HttpMethod, body: any = null) {
    body = body ? JSON.stringify(body) : null;
    
    const response = await fetch(base_api_url + "api/" + endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: body,
    });
    
    const data = await response.json();
    return data;
}

