import { request } from 'umi';
import { PROXY_URL } from '@/const';
import token from '@/utils/token';

export async function getProjectList(params) {
  return request(`${PROXY_URL}/api/get-and-fetch-project-list/`, {
    method: 'GET',
    params: { ...params },
    headers: token.getHeader()
  });
}

export async function getProjectDetail(projectId) {
  return request(`${PROXY_URL}/api/project-details/${projectId}/`, {
    method: 'GET',
    headers: token.getHeader()
  })
}
