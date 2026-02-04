function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function isRole(value) {
    return value === 'intern' || value === 'mentor' || value === 'admin';
}
function isUser(value) {
    if (!isRecord(value))
        return false;
    const id = value['id'];
    const email = value['email'];
    const role = value['role'];
    return typeof id === 'string' && typeof email === 'string' && isRole(role);
}
export function parseUserConfig(input) {
    let data;
    try {
        data = JSON.parse(input);
    }
    catch {
        return { ok: false, error: 'Invalid JSON' };
    }
    if (!isUser(data)) {
        return { ok: false, error: 'Invalid User shape' };
    }
    return { ok: true, value: data };
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
        return { ok: false, error: 'Invalid Users shape' };
    }
    for (const el of data) {
        if (!isUser(el)) {
            return { ok: false, error: 'Invalid Users shape' };
        }
    }
    return { ok: true, value: data };
}
