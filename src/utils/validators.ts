import { z } from 'zod';

// User Schema validation
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Case Schema validation
export const createCaseSchema = z.object({
  caseNumber: z.string().min(1, 'Case number is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['OPEN', 'CLOSED', 'PENDING', 'IN_PROGRESS']).refine(val => 
    ['OPEN', 'CLOSED', 'PENDING', 'IN_PROGRESS'].includes(val), {
    message: 'Invalid case status',
  }),
  clientName: z.string().min(1, 'Client name is required'),
  startDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Start date must be a valid date',
  }),
  endDate: z.string().refine(val => !val || !isNaN(Date.parse(val)), {
    message: 'End date must be a valid date or empty',
  }).optional(),
  outcome: z.enum(['WON', 'LOST', 'SETTLED', 'DISMISSED']).refine(val => 
    ['WON', 'LOST', 'SETTLED', 'DISMISSED'].includes(val), {
    message: 'Invalid case outcome',
  }),
});

export const updateCaseSchema = createCaseSchema.partial(); 

// Login Schema validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
