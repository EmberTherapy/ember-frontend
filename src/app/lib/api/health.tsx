import { createResponse } from "@/app/lib/utils/apiHelpers";

export async function healthCheck(){
    const data = await createResponse("health", "GET");
    return data;
}

