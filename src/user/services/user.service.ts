import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOneById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(payload: CreateUserDTO) {
    const exists = await this.findOneByEmail(payload.email);
    if (exists) return new HttpException('Email already registered', 400);

    return await this.prisma.user.create({
      data: payload,
    });
  }
}
