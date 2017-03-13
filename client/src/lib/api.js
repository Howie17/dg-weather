export const baseURL = '/api/';

export function apiRequest(path) {
  return fetch(new Request(`${baseURL}${path}`)).then(r => r.json());
}

export function getCourse(course) {
  return apiRequest(`course/${course}`);
}
