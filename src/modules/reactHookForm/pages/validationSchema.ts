import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
});
