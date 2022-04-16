import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import slugify from 'slugify';

interface CreateCourseParams {
    title: string;
}

@Injectable()
export class CoursesService {

    constructor(
        private prismaService: PrismaService
    ) { }

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

    async createCourse({ title }: CreateCourseParams) {
        
        const slug = slugify(title);

        const courseAlreadyExists = await this.prismaService.course.findUnique({
            where: {
                slug
            }
        })

        if(courseAlreadyExists) {
            throw new Error("Course Already Exists")
        }

        return this.prismaService.course.create({
            data: {
                title,
                slug
            }
        })

    }
}