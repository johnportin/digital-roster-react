'use client';

import CreateCourseForm from '@/forms/CreateCourseForm';
import CreateUserForm from '@/forms/CreateUserForm';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

const DashboardPage = () => {
  // This open close state should really be put into a submit function which is
  // passed to the form component. Then we need to take care of passing the form schema type.
  const [courseOpen, setCourseOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <div className="flex flex-col w-full items-center">
      <Dialog open={courseOpen} onOpenChange={setCourseOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create Course</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a course</DialogTitle>
            <CreateCourseForm setOpen={setCourseOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={userOpen} onOpenChange={setUserOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create User</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a user</DialogTitle>
            <CreateUserForm setOpen={setUserOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
