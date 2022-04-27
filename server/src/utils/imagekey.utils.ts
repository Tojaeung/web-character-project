import { getRepository } from 'typeorm';
import _ from 'lodash';
import FreeImageKey from '@src/entities/board/free/imageKey.entity';
import CommissionImageKey from '@src/entities/board/commission/imageKey.entity';
import RequeImageKey from '@src/entities/board/reque/imageKey.entity';
import SaleImageKey from '@src/entities/board/sale/imageKey.entity';
import { s3Delete } from '@src/utils/s3.utils';

export const createImageKey = (board: string, imageKeys: string[], userId: number, postId: number) => {
  if (board === 'free') {
    const freeImageKey = new FreeImageKey();
    imageKeys.forEach(async (imageKey) => {
      freeImageKey.imageKey = imageKey;
      freeImageKey.user_id = userId;
      freeImageKey.free_id = postId;
      await getRepository(FreeImageKey).save(freeImageKey);
    });
  } else if (board === 'commission') {
    const commissionImageKey = new CommissionImageKey();
    imageKeys.forEach(async (imageKey) => {
      commissionImageKey.imageKey = imageKey;
      commissionImageKey.user_id = userId;
      commissionImageKey.commission_id = postId;
      await getRepository(FreeImageKey).save(commissionImageKey);
    });
  } else if (board === 'reque') {
    const requeImageKey = new RequeImageKey();
    imageKeys.forEach(async (imageKey) => {
      requeImageKey.imageKey = imageKey;
      requeImageKey.user_id = userId;
      requeImageKey.reque_id = postId;
      await getRepository(FreeImageKey).save(requeImageKey);
    });
  } else if (board === 'sale') {
    const saleImageKey = new SaleImageKey();
    imageKeys.forEach(async (imageKey) => {
      saleImageKey.imageKey = imageKey;
      saleImageKey.user_id = userId;
      saleImageKey.sale_id = postId;
      await getRepository(FreeImageKey).save(saleImageKey);
    });
  }
};

export const deleteImageKey = async (board: string, userId: number, postId: number) => {
  if (board === 'free') {
    const ImageKeysBeforeUpdate = await getRepository(FreeImageKey).find({
      user_id: userId,
      free_id: postId,
    });
    await getRepository(FreeImageKey).delete({
      user_id: userId,
      free_id: postId,
    });
    const existingImageKeys = _.map(ImageKeysBeforeUpdate, 'imageKey');
    existingImageKeys.forEach(async (imageKey) => {
      await getRepository(FreeImageKey).delete({ imageKey });
      await s3Delete(imageKey);
    });
  } else if (board === 'commission') {
    const ImageKeysBeforeUpdate = await getRepository(CommissionImageKey).find({
      user_id: userId,
      commission_id: postId,
    });
    await getRepository(CommissionImageKey).delete({
      user_id: userId,
      commission_id: postId,
    });
    const existingImageKeys = _.map(ImageKeysBeforeUpdate, 'imageKey');
    existingImageKeys.forEach(async (imageKey) => {
      await getRepository(CommissionImageKey).delete({ imageKey });
      await s3Delete(imageKey);
    });
  } else if (board === 'reque') {
    const ImageKeysBeforeUpdate = await getRepository(RequeImageKey).find({
      user_id: userId,
      reque_id: postId,
    });
    await getRepository(RequeImageKey).delete({
      user_id: userId,
      reque_id: postId,
    });
    const existingImageKeys = _.map(ImageKeysBeforeUpdate, 'imageKey');
    existingImageKeys.forEach(async (imageKey) => {
      await getRepository(RequeImageKey).delete({ imageKey });
      await s3Delete(imageKey);
    });
  } else if (board === 'sale') {
    const ImageKeysBeforeUpdate = await getRepository(SaleImageKey).find({
      user_id: userId,
      sale_id: postId,
    });
    await getRepository(SaleImageKey).delete({
      user_id: userId,
      sale_id: postId,
    });
    const existingImageKeys = _.map(ImageKeysBeforeUpdate, 'imageKey');
    existingImageKeys.forEach(async (imageKey) => {
      await getRepository(SaleImageKey).delete({ imageKey });
      await s3Delete(imageKey);
    });
  }
};
