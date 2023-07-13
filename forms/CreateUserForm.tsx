'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { addUser } from '@/app/actions/addUser';
import { startTransition, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

import userSchema from '@/schemas/user';
import { Course } from '@prisma/client';

interface CreateUserFormProps {
  setOpen: (open: boolean) => void;
}

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;

const CreateUserForm: React.FC<CreateUserFormProps> = ({ setOpen }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  useEffect(() => {
    setCoursesLoading(true);
    fetch('/api/course')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setCoursesLoading(false);
      });
  }, []);

  console.log(courses);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: 'john',
      userEmail: 'john@email.com',
      userRole: 'STUDENT',
      userCourse: '0000 - Course Name',
    },
  });

  function onSubmit(values: z.infer<typeof userSchema>, e: any) {
    setOpen(false);
    startTransition(() => {
      addUser(values);
    });
    // e.preventDefault();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>This is the users name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@email.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is the users email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Role</FormLabel>
              <FormControl>
                <Select
                  // onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="TEACHER">Teacher</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is the users role.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userCourse"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Course</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value && courses
                        ? courses.find(
                            (course: Course) => course.id === field.value
                          )?.name
                        : 'Select a course'}
                      {/* {field.value
                        ? courses ??
                          courses.find((course) => course.id === field.value)
                            ?.name
                        : 'Select a course'} */}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search courses..."
                      className="h-9"
                    />
                    <CommandEmpty>No course found.</CommandEmpty>
                    <CommandGroup>
                      {courses &&
                        courses.map((course: Course) => (
                          <CommandItem
                            value={course.id}
                            key={course.id}
                            onSelect={(value) => {
                              form.setValue('userCourse', value);
                            }}
                          >
                            {course.name}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                course.id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the course the user will be associated with.
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

export default CreateUserForm;
