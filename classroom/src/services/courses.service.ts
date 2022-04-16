import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

@Injectable()
export class CoursesService {
    constructor(
        private prismaService: PrismaService
    ) {

    }

    listAllCourses() {
        return this.prismaService.course.findMany();
    }

    getCourseById(id: string) {
        return this.prismaService.course.findUnique({
            where: {
                id
            }
        })
    }
}