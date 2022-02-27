import { AbstractRepository, EntityRepository, getConnection } from 'typeorm';
import { User } from '@src/entities/profile/user.entity';
// import { Auth } from '@src/entities/profile/auth.entity';
import { Follow } from '@src/entities/profile/follow.entity';
// import { Desc } from '@src/entities/profile/desc.entitiy';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  // 이메일로 유저정보를 찾는 쿼리입니다.
  findUserByEmail(email: string) {
    return this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
  }

  // 닉네임으로 유저정보를 찾는 쿼리입니다.
  findUserByNickname(nickname: string) {
    return this.createQueryBuilder('user').where('user.nickname = :nickname', { nickname }).getOne();
  }

  // PK id로 유저정보를 찾는 쿼리입니다.
  findUserById(id: number) {
    return this.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
  }

  // 비밀번호 변경시 사용되는 pwToken으로 유저정보를 찾는 쿼리입니다.
  findUserByPwToken(pwToken: string) {
    return this.createQueryBuilder('user').where('user.pwToken = :pwToken', { pwToken }).getOne();
  }

  updateEmail(id: number, email: string) {
    return this.createQueryBuilder('user').update(User).set({ email }).where('id=:id', { id }).execute();
  }

  updateNickname(id: number, nickname: string) {
    return this.createQueryBuilder('user').update(User).set({ nickname }).where('id = :id', { id }).execute();
  }

  // 로그인 상태에서 비밀번호변경으로 비밀번호를 변경하는 쿼리입니다.
  updatePw(id: number, pw: string) {
    return this.createQueryBuilder('user').update(User).set({ pw }).where('id = :id', { id }).execute();
  }

  // 로그인이 안된 상태에서 비밀번호찾기로 비밀번호를 변경하는 쿼리입니다.
  updatePwAndPwToken(id: number, pw: string, pwToken: string) {
    return this.createQueryBuilder('user').update(User).set({ pw, pwToken }).where('id = :id', { id }).execute();
  }

  updateAvatar(id: number, avatar: string, avatarKey: string) {
    return this.createQueryBuilder('user').update(User).set({ avatar, avatarKey }).where('id = :id', { id }).execute();
  }

  updateDesc(id: number, desc: string) {
    return this.createQueryBuilder('user').update(User).set({ desc }).where('user_id = :id', { id }).execute();
  }

  deleteUser(id: number) {
    return this.createQueryBuilder('user').delete().from(User).where('id = :id', { id }).execute();
  }
}

@EntityRepository(Follow)
export class FollowRepository extends AbstractRepository<Follow> {
  getFolloweeNum(id: number) {
    return this.createQueryBuilder('follow').select('count(*)').where('follow.from_id = :id', { id }).getRawOne();
  }

  getFollowerNum(id: number) {
    return this.createQueryBuilder('follow').select('count(*)').where('follow.to_id = :id', { id }).getRawOne();
  }

  isFollowing(id: number, profileId: number) {
    return this.createQueryBuilder('follow')
      .where('follow.from_id = :id', { id })
      .andWhere('follow.to_id = :profileId', { profileId })
      .getOne();
  }

  follow(id: number, profileId: number) {
    return this.createQueryBuilder('follow').insert().into(Follow).values({ from_id: id, to_id: profileId }).execute();
  }

  unFollow(id: number, profileId: number) {
    return this.createQueryBuilder('follow')
      .delete()
      .from(Follow)
      .where('from_id = :id', { id })
      .andWhere('to_id = :profileId', { profileId })
      .execute();
  }

  deleteFollow(id: number) {
    return this.createQueryBuilder('follow')
      .delete()
      .from(Follow)
      .where('from_id = :from_id', { from_id: id })
      .orWhere('to_id = :to_id', { to_id: id })
      .execute();
  }
}
