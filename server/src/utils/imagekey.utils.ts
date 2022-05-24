import { getRepository } from 'typeorm';
import ImageKey from '@entities/board/imageKey.entity';
import s3Delete from '@utils/s3.utils';

export const createImageKey = (imageKeys: string[], id: number, postId: number) => {
  imageKeys.forEach(
    async (imageKey) => await getRepository(ImageKey).insert({ key: imageKey, user_id: id, post_id: postId })
  );
};

export const deleteImageKey = async (id: number, postId: number) => {
  const imageKeys = await getRepository(ImageKey).find({
    where: {
      user_id: id,
      post_id: postId,
    },
  });

  imageKeys.forEach(async (imageKey) => {
    await s3Delete(imageKey.key);
  });
};
