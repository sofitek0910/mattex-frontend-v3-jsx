import { request } from 'umi';
import token from '@/utils/token';

import { PROXY_URL } from '@/const';

export async function getUserListByProjectId({ projectId }) {
  return request(`${PROXY_URL}/api/get-user-list/${projectId}/`, {
    method: 'GET',
    headers: token.getHeader()
  });
}

export async function getTemplateList(params) {
  return request(`${PROXY_URL}/api/template-list/`, {
    method: 'GET',
    params: { ...params },
    headers: token.getHeader()
  });
}

export async function createTemplate(body) {
  return request(`${PROXY_URL}/api/template/`, {
    method: 'POST',
    headers: token.getHeader(),
    data: body
  })
}

export async function getTemplateDetail(template_id) {
  return request(`${PROXY_URL}/api/template-detail/${template_id}/`, {
    method: 'GET',
    headers: token.getHeader()
  })
}

export async function getLabraryList(params) {
  return request(`${PROXY_URL}/api/library-list/`, {
    method: 'GET',
    params: { ...params },
    headers: token.getHeader()
  });
}

export async function createLibrary(body) {
  return request(`${PROXY_URL}/api/library/`, {
    method: 'POST',
    headers: token.getHeader(),
    data: body
  })
}

export async function deleteLibrary(id) {
  return request(`${PROXY_URL}/api/library-delete/${id}`, {
    method: 'DELETE',
    headers: token.getHeader()
  })
}

export async function getLibrarySetList(params) {
  return request(`${PROXY_URL}/api/library-set-list/`, {
    method: 'GET',
    params: { ...params },
    headers: token.getHeader()
  });
}

export async function createLibrarySet(body) {
  return request(`${PROXY_URL}/api/library-set/`, {
    method: 'POST',
    headers: token.getHeader(),
    data: body
  })
}
