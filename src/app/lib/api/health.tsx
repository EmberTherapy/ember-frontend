import { createResponse } from "@/app/lib/utils/apiHelpers";

export async function healthCheck(){
    console.log("Performing health check...");
    const data = await createResponse("health", "GET");
    return data;
}

