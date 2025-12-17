const base_api_url = "http://localhost:5000/";

export async function authenticateUser(email: string, password: string) {
    // await new Promise((resolve) => setTimeout(resolve, 500));
    // return { status: true, token: "fake-jwt-token" };
    const jsonBody = {
        email: email,
        passkey: password
    };

    const response = await fetch(base_api_url + "api/login", {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? "Login failed");
    }

    // console.log(data.user + "");
    // console.log("RAW RESPONSE:", data + "");
    return true;
}

export async function createUser(email: string, password: string, firstName: string, lastName: string) {
    // await new Promise((resolve) => setTimeout(resolve, 500));
    // return { status: true };
    const jsonBody = {
        email: email,
        passkey: password,
        first_name: firstName,
        last_name: lastName
    };

    const response = await fetch(base_api_url + "api/create_user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
    });
    response.json().then(data => {
        if (data.status == "success") {
            console.log('Success:', data);
            return true;

        } else {
            console.log('Failed:', data);
            return false;
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        return false;
    });
}
