import { createResponse } from "@/app/lib/utils/apiHelpers";

export async function getFlagsPanelData(client_id: number) {
    const body = { "client_id": client_id };
    const data = await createResponse("get_flags_ecs_panel", "POST", body);

    return data.panel_data;
}

export async function isFlagged(client_id: number) {
    const body = { "client_id": client_id };
    const data = await createResponse("is_flagged", "POST", body);
    return data.is_flagged;
}


export async function resolveFlags(client_id: number) {
    const body = { "client_id": client_id };
    const data = await createResponse("resolve_flags", "POST", body);
    return data.status;
}