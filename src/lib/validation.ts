import {z} from "zod";

export const resultLookupSchema = z.object({
  semester: z.string().min(1, "semesterRequired")
});

export type ResultLookupValues = z.infer<typeof resultLookupSchema>;
