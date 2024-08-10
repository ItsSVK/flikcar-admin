import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

const addressSchema = z.object({
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
});

const docsImagePathsSchema = z.object({
  path: z.string().optional(),
  type: z.string().optional(),
});

export const userSchema = z.object({
  id: z.string().optional(),
  phone: z.string().optional(),
  userTypeStatus: z.string().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  profile: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  shop: z
    .object({
      name: z.string().optional(),
      gstNumber: z.string().optional(),
      phone: z.string().optional(),
      addresses: z.array(addressSchema).optional(),
    })
    .optional(),
  dealerOnboardFormData: z
    .object({
      addressProofNumber: z.string().optional(),
      cancelledChequeNumber: z.string().optional(),
      name: z.string().optional(),
      panCardNumber: z.string().optional(),
      pinCode: z.string().optional(),
      selectedCity: z.string().optional(),
      selectedState: z.string().optional(),
      shopAddress: z.string().optional(),
      shopName: z.string().optional(),
      tradeLicenseNumber: z.string().optional(),
      email: z.string().optional(),
      docsImagePaths: z.array(docsImagePathsSchema).optional(),
    })
    .optional(),
});

export const adminSchema = z.object({
  id: z.string(),
  phone: z.string().optional().nullable(),
  email: z.string().optional(),
  name: z.string().optional().nullable(),
  password: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  createdAt: z.number().optional(),
});

export const colorSchema = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  status: z.string().optional(),
  code: z.string().optional(),
});

export const rtoSchema = z.object({
  id: z.string(),
  rtoName: z.string().optional().nullable(),
  rtoCode: z.string().optional(),
});

export type Admin = z.infer<typeof adminSchema>;
export type Color = z.infer<typeof colorSchema>;
export type RTO = z.infer<typeof rtoSchema>;
export type User = z.infer<typeof userSchema>;
