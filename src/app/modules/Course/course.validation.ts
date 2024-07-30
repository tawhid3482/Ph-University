import {z} from 'zod'

const preRequisiteCoursesValidationSchema = z.object({
    course:z.string(),
    isDeleted: z.boolean().optional()
})

 const courseValidationSchema = z.object({
    body:z.object({
        title: z.string(),
        prefix:z.string(),
        code:z.number(),
        credits:z.number(),
        preRequisiteCourses: z.array(preRequisiteCoursesValidationSchema).optional(),
        isDeleted: z.boolean().optional() 

    })
}) 

const updateCourseValidationSchema = courseValidationSchema.partial()

export const CourseValidation = {
    courseValidationSchema,
    updateCourseValidationSchema
}
