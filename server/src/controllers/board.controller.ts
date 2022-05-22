import { Request, Response } from 'express';
import { getRepository, ILike } from 'typeorm';
import logger from '@src/helpers/winston.helper';
import ApiError from '@src/errors/api.error';
import User from '@src/entities/profile/user.entity';
import Post from '@src/entities/board/post.entity';
import Board from '@src/entities/board/board.entity';
import Comment from '@src/entities/board/comment.entity';

export const getAllBoards = async (req: Request, res: Response): Promise<any> => {
  const free = await getRepository(Post).find({
    where: { board_id: 1 },
    order: { id: 'DESC' },
    take: 10,
    relations: ['user', 'board'],
  });
  const commission = await getRepository(Post).find({
    where: { board_id: 2 },
    order: { id: 'DESC' },
    take: 10,
    relations: ['user', 'board'],
  });
  const reque = await getRepository(Post).find({
    where: { board_id: 3 },
    order: { id: 'DESC' },
    take: 10,
    relations: ['user', 'board'],
  });
  const sale = await getRepository(Post).find({
    where: { board_id: 4 },
    order: { id: 'DESC' },
    take: 10,
    relations: ['user', 'board'],
  });

  logger.info('게시판 모두 가져오기 성공하였습니다.');
  return res.status(200).json({
    ok: true,
    message: '게시판 모두 가져오기 성공하였습니다.',
    free,
    commission,
    reque,
    sale,
  });
};

export const getBoard = async (req: Request, res: Response): Promise<any> => {
  const board = req.params.board;

  // 유효하지 않는 게시판 예외처리
  const isExistingBoard = await getRepository(Board).findOne({ enName: board });

  if (!isExistingBoard) {
    logger.warn('존재하지 않는 게시판을 가져오려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }
  const boardId = isExistingBoard.id;

  const page = Number(req.query.page as string) || 1;
  const limit = Number(req.query.limit as string) || 10;

  const searchType = req.query.searchType as string;
  const keyword = req.query.keyword as string;
  // 게시판 불러오기 시작점
  const offset = (page - 1) * limit;
  // 가져온 게시물들
  let posts;
  // 게시판의 전체 게시물 수
  let totalPostsNum;

  // 검색없이 게시판 페이지네이션
  if (!searchType || !keyword) {
    posts = await getRepository(Post).find({
      where: { board_id: boardId },
      order: { id: 'DESC' },
      skip: offset,
      take: limit,
      relations: ['user', 'board'],
    });
    totalPostsNum = await getRepository(Post).count({ where: { board_id: boardId } });

    logger.info(`${board} 게시판 가져오기 성공하였습니다.`);
    return res.status(200).json({ ok: true, message: '게시판 가져오기 성공하였습니다.', posts, totalPostsNum });
  }

  // 제목 기준으로 검색할때
  if (searchType === 'title') {
    posts = await getRepository(Post).find({
      order: { id: 'DESC' },
      skip: offset,
      take: limit,
      where: { board_id: boardId, title: ILike(`%${keyword}%`) },
      relations: ['user', 'board'],
    });
    totalPostsNum = await getRepository(Post).count({
      where: { board_id: boardId, title: ILike(`%${keyword}%`) },
    });
  }
  // 내용 기준으로 검색할때
  else if (searchType === 'content') {
    posts = await getRepository(Post).find({
      order: { id: 'DESC' },
      skip: offset,
      take: limit,
      where: { board_id: boardId, content: ILike(`%${keyword}%`) },
      relations: ['user', 'board'],
    });
    totalPostsNum = await getRepository(Post).count({
      where: { board_id: boardId, content: ILike(`%${keyword}%`) },
    });
  }
  // 작성자 기준으로 검색할떄
  else if (searchType === 'nickname') {
    // 게시글을 작성한 작성자를 찾는다.
    const author = await getRepository(User).findOne({ nickname: keyword });
    if (!author) {
      logger.warn('존재하지 않는 작성자로 검색하려고 시도합니다.');
      throw ApiError.BadRequest('존재하지 않는 작성자 입니다.');
    }

    // 닉네임으로 찾은 작성자 정보의 id로 찾는다.
    posts = await getRepository(Post).find({
      order: { id: 'DESC' },
      skip: offset,
      take: limit,
      where: { board_id: boardId, user_id: author.id },
      relations: ['user', 'board'],
    });
    totalPostsNum = await getRepository(Post).count({
      where: { board_id: boardId, user_id: author.id },
    });
  } else {
    logger.warn('존재하지 않는 검색기준으로 정보를 불러오는 시도가 있습니다.');
    throw ApiError.BadRequest('존재하지 않는 검색기준입니다.');
  }

  logger.info(`"${board}" 게시판에서 "${keyword}"로 검색한 정보를 가져오기 성공하였습니다.`);
  return res
    .status(200)
    .json({ ok: true, message: `"${keyword}"로 검색한 게시판 가져오기 성공하였습니다.`, posts, totalPostsNum });
};

export const getAllMyPosts = async (req: Request, res: Response): Promise<any> => {
  const id = req.session.user?.id as number;
  const page = Number(req.query.page);
  const limit = 10;

  const offset = (page - 1) * limit;

  const allMyPosts = await getRepository(Post).find({
    where: { user_id: id },
    skip: offset,
    take: limit,
    relations: ['board'],
    order: { created_at: 'DESC' },
  });

  const totalPostsNum = await getRepository(Post).count({ where: { user_id: id } });

  logger.info(`${id}가 작성한 모든 게시물을 가져왔습니다.`);
  return res
    .status(200)
    .json({ ok: true, message: '내가 작성한 모든 게시물을 가져왔습니다.', allMyPosts, totalPostsNum });
};

export const getAllMyComments = async (req: Request, res: Response): Promise<any> => {
  const id = req.session.user?.id as number;
  const page = Number(req.query.page);
  const limit = 10;

  const offset = (page - 1) * limit;

  const allMyComments = await getRepository(Comment).find({
    where: { user_id: id },
    skip: offset,
    take: limit,
    relations: ['board'],
    order: { created_at: 'DESC' },
  });

  const totalCommentsNum = await getRepository(Comment).count({ where: { user_id: id } });

  logger.info(`${id}가 작성한 모든 댓글을 가져왔습니다.`);
  return res
    .status(200)
    .json({ ok: true, message: '내가 작성한 모든 댓글을 가져왔습니다.', allMyComments, totalCommentsNum });
};
