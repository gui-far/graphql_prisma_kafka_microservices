import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { EnrollmentsService } from "../../../services/enrollments.service";
import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { AuthUser, CurrentUser } from "../../auth/current-user";
import { Enrollment } from "../models/enrollment";
import { Student } from "../models/student";

@Resolver(() => Student)
export class StudentsResolver {

    constructor(
        private studentsService: StudentsService,
        private enrollmentsService: EnrollmentsService
    ) { }

    @Query(() => [Student])
    @UseGuards(AuthorizationGuard)
    students() {
        return this.studentsService.listAllStudetns();
    }

    @ResolveField(() => [Enrollment])
    enrollments(@Parent() student: Student) {
        return this.enrollmentsService.listEnrollmentsByStudent(student.id)
    }

    // @Query(() => Student)
    // @UseGuards(AuthorizationGuard)
    // me(@CurrentUser() user: AuthUser) {
    //     console.log(user)
    //     return this.studentsService.getStudentByAuthUserId(user.sub)
    // }

}