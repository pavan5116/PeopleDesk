const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api').replace(/\/$/, '');
const EMPLOYEE_URL = `${API_BASE_URL}/employees`;

async function request(url, options = {}) {
  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        Accept: 'application/json',
        ...options.headers,
      },
    });
  } catch (error) {
    throw new Error('Cannot connect to the backend. Check that Spring Boot is running and the API URL is correct.');
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      message = body.message || body.error || body.detail || message;
      if (body.errors && typeof body.errors === 'object') {
        message = Object.values(body.errors).join(' ');
      }
    } catch {
      // Some backend errors return plain text or an empty body.
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function unwrapEmployees(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.employees)) return payload.employees;
  return [];
}

export const employeeService = {
  async getAll() {
    const payload = await request(EMPLOYEE_URL);
    return unwrapEmployees(payload);
  },
  async search(keyword) {
    const payload = await request(`${EMPLOYEE_URL}/search?keyword=${encodeURIComponent(keyword)}`);
    return unwrapEmployees(payload);
  },
  getById(id) {
    return request(`${EMPLOYEE_URL}/${id}`);
  },
  create(employee) {
    return request(EMPLOYEE_URL, { method: 'POST', body: JSON.stringify(employee) });
  },
  update(id, employee) {
    return request(`${EMPLOYEE_URL}/${id}`, { method: 'PUT', body: JSON.stringify(employee) });
  },
  remove(id) {
    return request(`${EMPLOYEE_URL}/${id}`, { method: 'DELETE' });
  },
};
