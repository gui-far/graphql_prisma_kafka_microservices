import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface GetByCourseAndStudentIdParams {
    studentId: string
    courseId: string,
}

interface CreateEnrollmentParams {
    studentId: string
    courseId: string,
}

@Injectable()
export class EnrollmentsService {
    constructor(
        private prismaService: PrismaService
    ) {

    }

    listAllEnrollments() {
        return this.prismaService.enrollment.findMany({
            where: {
                canceledAt: null,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    getByCourseAndStudentId({studentId, courseId} : GetByCourseAndStudentIdParams) {

        return this.prismaService.enrollment.findFirst({
            where: {
                studentId,
                courseId,
                canceledAt: null
            }
        })
    }

    listEnrollmentsByStudent(studentId: string){
        return this.prismaService.enrollment.findMany({
            where: {
                studentId,
                canceledAt: null,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    createEnrollment({studentId, courseId} : CreateEnrollmentParams) {

        return this.prismaService.enrollment.create({
            data: {
                studentId,
                courseId,
                canceledAt: null
            }
        })
    }
}