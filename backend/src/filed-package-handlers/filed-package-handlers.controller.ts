import { Controller } from '@nestjs/common';
import {
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Patch,
} from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guard/roles.guard';
import {
  CreateFieldPackageHandlerDto,
  UpdateFieldPackageHandlerDto,
} from './dto/packageHandlers.dto';
import { FiledPackageHandlersService } from './filed-package-handlers.service';
import { ParseIntPipe } from '@nestjs/common/pipes';

@Controller('filed-package-handlers')
export class FiledPackageHandlersController {
  constructor(
    private filedPackageHandlersService: FiledPackageHandlersService,
  ) {}

  // GET /filed-package-handlers
  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async filedPackageHandlers() {
    return this.filedPackageHandlersService.fieldPackageHandlers(
      {},
      {
        include: {
          User: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              roles: true,
            },
          },
        },
      },
    );
  }

  // GET /filed-package-handlers/1
  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async filedPackageHandler(@Param('id', ParseIntPipe) id: number) {
    return this.filedPackageHandlersService.fieldPackageHandler(
      { id },
      {
        include: {
          User: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              roles: true,
            },
          },
        },
      },
    );
  }

  // POST /filed-package-handlers
  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createFieldPackageHandler(
    @Body(ValidationPipe)
    createFieldPackageHandlerDto: CreateFieldPackageHandlerDto,
  ) {
    return this.filedPackageHandlersService.createFieldPackageHandler(
      createFieldPackageHandlerDto,
    );
  }

  // patch /filed-package-handlers/1
  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateFieldPackageHandler(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateFieldPackageHandlerDto: UpdateFieldPackageHandlerDto,
  ) {
    return this.filedPackageHandlersService.updateFieldPackageHandler({
      where: { id },
      data: updateFieldPackageHandlerDto,
    });
  }
}
