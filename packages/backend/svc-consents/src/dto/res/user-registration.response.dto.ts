import { EventType } from '$/enum/event-type.enum';

import { BaseUserProfileResponse } from './base-user-profile.response.dto';

export class UserRegistrationResponse extends BaseUserProfileResponse {
  constructor(data: {
    uuid: Uuid;
    email: Email;
    events?: { type: EventType; enabled: boolean }[];
  }) {
    super(data);
  }
}
