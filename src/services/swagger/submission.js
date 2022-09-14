import { request } from 'umi';
import { PROXY_URL } from '@/const';
import token from '@/utils/token';

export async function getSubmissionTypeList() {
  return request(`${PROXY_URL}/api/submission-type-list/`, {
    method: 'GET',
    headers: token.getHeader()
  });
}

export async function getSubmissionList(params) {
  return request(`${PROXY_URL}/api/submission-list/`, {
    method: 'GET',
    params: { ...params },
    headers: token.getHeader()
  });
}

export async function getSubmissionDetail(systemId) {
  return request(`${PROXY_URL}/api/submission-detail/${systemId}/`, {
    method: 'GET',
    headers: token.getHeader()
  });
}

export async function getInternalCommentList(params) {
  return request(`${PROXY_URL}/api/internal-comment-list/`, {
    method: 'GET',
    params: { ...params },
    headers: token.getHeader()
  });
}

export async function createInternalComment(body) {
  return request(`${PROXY_URL}/api/internal-comment/`, {
    method: 'POST',
    data: body,
    headers: token.getHeader()
  })
}


export async function getSubmissionRevList(systemId) {
  return request(`${PROXY_URL}/api/submission-rev-list/${systemId}/`, {
    method: 'GET',
    headers: token.getHeader()
  })
}

export async function getTradeList() {
  return request(`${PROXY_URL}/api/trade-list/`, {
    method: 'GET',
    headers: token.getHeader()
  });
}

export async function createSubmission(body, options) {
  return request(`${PROXY_URL}/api/submission/`, {
    method: 'POST',
    headers: token.getHeader(),
    data: body,
    ...(options || {}),
  });
}

export async function previewSubmissionDetail(systemId) {
  return request(`${PROXY_URL}/api/pdf/${systemId}`, {
    method: 'GET',
    headers: token.getHeader()
  });
}

export async function updateSubmission(systemId, body) {
  return request(`${PROXY_URL}/api/submission-update/${systemId}/`, {
    method: 'PATCH',
    headers: token.getHeader(),
    data: body,
  });
}

export async function checkDocumentNumber(projectId, documentNumber) {
  return request(`${PROXY_URL}/api/check-document-number/${projectId}/${documentNumber}/`, {
    method: 'GET',
    headers: token.getHeader()
  })
}

export async function getApprovalFlowList() {
  return request(`${PROXY_URL}/api/approval-flow-list/`, {
    method: 'GET',
    headers: token.getHeader()
  })
}

export async function getReveiwerList(projectId) {
  return request(`${PROXY_URL}/api/get-reviewer-list/${projectId}`, {
    method: 'GET',
    headers: token.getHeader()
  })
}

export async function submitForApproval(body) {
  return request(`${PROXY_URL}/api/submit-for-approval/`, {
    method: 'POST',
    data: body,
    headers: token.getHeader()
  })
}
