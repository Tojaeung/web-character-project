import { getRepository } from 'typeorm';
import _ from 'lodash';
import ImageKey from '@src/entities/board/imageKey.entity';
import s3Delete from '@src/utils/s3.utils';

export const createImageKey = (imageKeys: string[]) => {
  imageKeys.forEach(async (imageKey) => await getRepository(ImageKey).insert({ key: imageKey }));
};

export const deleteImageKey = async (userId: number, postId: number) => {
  const imageKeys = await getRepository(ImageKey).find({
    where: {
      user_id: userId,
      post_id: postId,
    },
  });

  imageKeys.forEach(async (imageKey) => {
    await getRepository(ImageKey).delete({ key: imageKey.key });
    await s3Delete(imageKey.key);
  });
};
