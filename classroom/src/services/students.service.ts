import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

@Injectable()
export class StudentsService {
    constructor(
        private prismaService: PrismaService
    ) { }

    listAllStudetns() {
        return this.prismaService.student.findMany()
    }
    
    getStudentById(id: string) {
        return this.prismaService.student.findUnique({
            where: {
                id
            }
        })
    }
}