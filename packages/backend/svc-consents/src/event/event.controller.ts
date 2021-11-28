import { Request } from 'express';

import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ConsentEventItemRequest, ConsentEventItemResponse } from '$/dto';
import { ApiGroup } from '$/enum/api-group.enum';
import { BadRequestError, InternalServerError } from '$/error';
import { EventService } from '$/event/event.service';
import { JwtAuthGuard } from '$/guards/jwt-auth.guard';

const TAG = ApiGroup.Event;

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Allows a user to create a new consent event.',
    description: 'Creates a new consent event for the authenticated user',
  })
  @ApiTags(TAG)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Consent event has been successfully created.',
    type: ConsentEventItemResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid payload provided.',
    type: BadRequestError,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An internal error occurred.',
    type: InternalServerError,
  })
  create(
    @Req() req: Request,
    @Body() dto: ConsentEventItemRequest,
  ): Promise<ConsentEventItemResponse> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.eventService.create(dto.id, dto.enabled, req.userUuid!);
  }
}
