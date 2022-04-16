import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

@Injectable()
export class EnrollmentsService {
    constructor(
        private prismaService: PrismaService
    ) {

    }

    listAllEnrollments() {
        return this.prismaService.enrollment.findMany();
    }
}