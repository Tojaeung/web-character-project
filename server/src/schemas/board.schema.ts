import { object, z, string } from 'zod';

export const getBoardSchema = object({
  params: object({
    board: string(),
  }),
});

export type GetBoardInput = z.infer<typeof getBoardSchema>;
