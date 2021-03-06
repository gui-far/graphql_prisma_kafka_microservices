import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface CreateStudenParams {
    authUserId: string
}

@Injectable()
export class StudentsService {
    constructor(
        private prismaService: PrismaService
    ) { }

    listAllStudetns() {
        return this.prismaService.student.findMany()
    }
    
    getStudentByAuthUserId(authUserId: string) {
        return this.prismaService.student.findUnique({
            where :{
                authUserId
            }
        })
    }

    getStudentById(id: string) {
        return this.prismaService.student.findUnique({
            where: {
                id
            }
        })
    }

    createStudent({authUserId} : CreateStudenParams) {
        return this.prismaService.student.create({
            data: {
                authUserId
            }
        })
    }
}