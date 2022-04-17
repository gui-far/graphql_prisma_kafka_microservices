import { Injectable, Options } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import slugify from 'slugify';

interface CreateCourseParams {
    slug?: string;
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

    getCourseBySlug(slug: string) {
        return this.prismaService.course.findUnique({
            where: {
                slug
            }
        })
    }

    async createCourse({ title, slug = slugify(title, { lower: true }) }: CreateCourseParams) {

        const courseAlreadyExists = await this.prismaService.course.findUnique({
            where: {
                slug
            }
        })

        if (courseAlreadyExists) {
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