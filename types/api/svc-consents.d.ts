/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Note: This file is auto generated and should NOT be edited manually.
 */
declare namespace SvcConsentsApi {
  export interface BadRequestError {
    /**
     * The HTTP response code.
     * example:
     * 400
     */
    code: number;
    /**
     * An array of error details.
     * example:
     * []
     */
    errors: {
      [key: string]: any;
    }[];
    /**
     * The error message.
     * example:
     * The server could not understand the request due to invalid syntax / arguments.
     */
    message: string;
    /**
     * The name of the error.
     * example:
     * BadRequest
     */
    name: string;
  }
  export interface BaseUserResponse {
    /**
     * The user's unique id.
     * example:
     * 343c6ac5-2b72-4c41-a9eb-28f5ae49af80
     */
    id: string;
  }
  export interface ConsentEventItemRequest {
    /**
     * The id (i.e. type internally) of the consent event.
     */
    id: 'email_notifications' | 'sms_notifications';
    /**
     * Whether or not the consent event with the provided id is enabled or disabled.
     * example:
     * true
     * false
     */
    enabled: boolean;
  }
  export interface ConsentEventItemResponse {
    /**
     * The id of the consent.
     * example:
     * email_notifications
     * sms_notifications
     */
    id: 'email_notifications' | 'sms_notifications';
    /**
     * The state of the consent, i.e. whether or not the user granted consent.
     * example:
     * true
     * false
     */
    enabled: boolean;
  }
  export interface ConsentEventResponse {
    /**
     * A slim version of the user's profile.
     * example:
     * {
     *   "id": "343c6ac5-2b72-4c41-a9eb-28f5ae49af80"
     * }
     */
    user: {
      /**
       * The user's unique id.
       * example:
       * 343c6ac5-2b72-4c41-a9eb-28f5ae49af80
       */
      id: string;
    };
    /**
     * The list of user consents.
     * example:
     * [
     *   {
     *     "id": "email_notifications",
     *     "enabled": false
     *   },
     *   {
     *     "id": "sms_notifications",
     *     "enabled": true
     *   }
     * ]
     */
    consents: ConsentEventItemResponse[];
  }
  export interface HealthCheckResponse {
    /**
     * The health status of the API.
     * example:
     * OK
     */
    status: string;
  }
  export interface InternalServerError {
    /**
     * The HTTP response code.
     * example:
     * 500
     */
    code: number;
    /**
     * An array of error details.
     * example:
     * []
     */
    errors: any[][];
    /**
     * The error message.
     * example:
     * The server has encountered a situation it doesn't know how to handle.
     */
    message: string;
    /**
     * The name of the error.
     * example:
     * InternalServerError
     */
    name: string;
  }
  export interface JwtResponse {
    /**
     * The jwt token.
     * example:
     * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMzQzYzZhYzUtMmI3Mi00YzQxLWE5ZWItMjhmNWFlNDlhZjgwIiwiaWF0IjoxNjM4MDkxNjEzLCJleHAiOjE2MzgwOTI1MTMsImlzcyI6InN1cHBvcnRAZ3Jhbml0ZS5jb20iLCJqdGkiOiJiZDZiMzMzZS04NWZkLTQ3YzgtOWMxMy03NDhhNDZjYTE5MmIifQ.jlMl8fFBUdItwkTiQsna74OqwhC6itNxc8IUyU4Imxs
     */
    token: string;
  }
  export interface LoginRequest {
    /**
     * The user's email address.
     * example:
     * john.doe@example.com
     */
    email: string;
    /**
     * The user's password.
     * example:
     * secret
     */
    password: string;
  }
  export interface UnauthorizedError {
    /**
     * The HTTP response code.
     * example:
     * 401
     */
    code: number;
    /**
     * An array of error details.
     * example:
     * []
     */
    errors: any[][];
    /**
     * The error message.
     * example:
     * You are not authorized to access this endpoint.
     */
    message: string;
    /**
     * The name of the error.
     * example:
     * Unauthorized
     */
    name: string;
  }
  export interface UserProfileResponse {
    /**
     * The user's unique id.
     * example:
     * 343c6ac5-2b72-4c41-a9eb-28f5ae49af80
     */
    id: string;
    /**
     * The user's email address.
     * example:
     * john.doe@example.com
     */
    email: string;
    /**
     * The list of user consents.
     * example:
     * [
     *   {
     *     "id": "email_notifications",
     *     "enabled": false
     *   },
     *   {
     *     "id": "sms_notifications",
     *     "enabled": true
     *   }
     * ]
     */
    consents: ConsentEventItemResponse[];
  }
  export interface UserRegistrationRequest {
    /**
     * The user's email address.
     * example:
     * john.doe@example.com
     */
    email: string;
    /**
     * The user's password.
     * example:
     * secret
     */
    password: string;
  }
  export interface UserRegistrationResponse {
    /**
     * The user's unique id.
     * example:
     * 343c6ac5-2b72-4c41-a9eb-28f5ae49af80
     */
    id: string;
    /**
     * The user's email address.
     * example:
     * john.doe@example.com
     */
    email: string;
    /**
     * The list of user consents.
     * example:
     * [
     *   {
     *     "id": "email_notifications",
     *     "enabled": false
     *   },
     *   {
     *     "id": "sms_notifications",
     *     "enabled": true
     *   }
     * ]
     */
    consents: ConsentEventItemResponse[];
  }
}
