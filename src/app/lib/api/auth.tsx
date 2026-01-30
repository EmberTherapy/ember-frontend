const base_api_url = "http://localhost:5000/";

// returns boolean`
export async function authenticateUser(email: string, password: string): Promise<boolean> {
  const response = await fetch(base_api_url + "api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, passkey: password }),
    });

  if (!response.ok) return false;

  const data = await response.json();
  console.log("Authentication response:", data);
  return data.status === "success";
}

export async function validateSession() {
    const response = await fetch(base_api_url + "api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({}),
    });

    if (!response.ok) return false;
    
    const data = await response.json();
    return data.status === "success";
}

export async function createUser(email: string, password: string, firstName: string, lastName: string) {
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
            return true;

        } else {
            return false;
        }
    })
    .catch((error) => {
        return false;
    });
}
