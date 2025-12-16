export async function getUserInfo() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return {
        first_name: "Elie",
        last_name: "Esses"
    }
}

export async function getUserFirstName() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return "Elie";
}