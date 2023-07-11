'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { addCourse } from '@/app/actions/addCourse';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import courseSchema from '@/schemas/course';

interface CreateCourseFormProps {
  setOpen: (open: boolean) => void;
}

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({ setOpen }) => {
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: '',
      courseCode: 0,
      courseDescription: '',
    },
  });

  function onSubmit(values: z.infer<typeof courseSchema>, e: any) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setOpen(false);
    addCourse(values);
    e.preventDefault();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl">
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Introduction to Topics" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseCode"
          render={({ field }) => (
            <FormItem itemType="number">
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...form.register('courseCode', {
                    valueAsNumber: true,
                    setValueAs: (v) => parseInt(v),
                  })}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the code for your course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your course..." {...field} />
              </FormControl>
              <FormDescription>
                This is the description for your course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateCourseForm;
