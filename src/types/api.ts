/**
 * @file src/types/api.ts
 * @purpose General API response interfaces for server actions and routes.
 * @tags types, api, server-actions, response
 */

export interface ActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SessionPayload {
  uid: string;
  email?: string;
  admin: boolean;
}
