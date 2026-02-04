function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function isRole(value) {
    return value === 'intern' || value === 'mentor' || value === 'admin';
}
function validateUser(value) {
    if (!isRecord(value)) {
        return { ok: false, error: 'Invalid type for expected object' };
    }
    if (!('id' in value)) {
        return { ok: false, error: 'Missing field: id' };
    }
    if (!('email' in value)) {
        return { ok: false, error: 'Missing field: email' };
    }
    if (!('role' in value)) {
        return { ok: false, error: 'Missing field: role' };
    }
    const id = value['id'];
    const email = value['email'];
    const role = value['role'];
    if (typeof id !== 'string') {
        return { ok: false, error: 'Invalid type for id (expected string)' };
    }
    if (typeof email !== 'string') {
        return { ok: false, error: 'Invalid type for email (expected string)' };
    }
    if (typeof role !== 'string') {
        return { ok: false, error: 'Invalid type for role (expected string)' };
    }
    if (!isRole(role)) {
        return {
            ok: false,
            error: 'Invalid role (expected intern|mentor|admin)',
        };
    }
    return { ok: true, value: { id, email, role } };
}
export function parseUserConfig(input) {
    let data;
    try {
        data = JSON.parse(input);
    }
    catch {
        return { ok: false, error: 'Invalid JSON' };
    }
    return validateUser(data);
}
export function parseUsersConfig(input) {
    let data;
    try {
        data = JSON.parse(input);
    }
    catch {
        return { ok: false, error: 'Invalid JSON' };
    }
    if (!Array.isArray(data)) {
        return { ok: false, error: 'Invalid type for expected array' };
    }
    const users = [];
    for (let i = 0; i < data.length; i++) {
        const r = validateUser(data[i]);
        if (!r.ok) {
            return { ok: false, error: `Invalid user at index ${i}: ${r.error}` };
        }
        users.push(r.value);
    }
    return { ok: true, value: users };
}
