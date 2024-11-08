import { serial, varchar, pgTable, integer, boolean } from 'drizzle-orm/pg-core';

export const GRADES = pgTable('grades',{
        id:serial('id').primaryKey(),
        grade:varchar('grade',{length:10}).notNull()
});

export const STUDENTS = pgTable('students',{
        id:serial('id').primaryKey(),
        name:varchar('name',{length:20}).notNull(),
        grade:varchar('grade',{length:10}).notNull(),
        address:varchar('address',{length:50}),
        contact:varchar('contact',{length:11}),
})

export const ATTENDACE=pgTable('attendance',{
        id:serial('id',{length:11}).primaryKey(),
        studentId:integer('studentId',{length:11}).notNull(),
        present:boolean('present').default(false),
        day:integer('day',{length:11}).notNull(),//22
        date:varchar('date',{length:20}).notNull()//05/2023
})
