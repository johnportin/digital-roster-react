'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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
import { startTransition } from 'react';

const formSchema = z.object({
  userName: z.string().min(2).max(50),
  userEmail: z.string().email(),
});

interface CreateUserFormProps {
  setOpen: (open: boolean) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ setOpen }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: 'john',
      userEmail: 'john@email.com',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>, e: any) {
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
              <FormDescription>This is the user's name.</FormDescription>
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
              <FormDescription>This is the user's email.</FormDescription>
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
