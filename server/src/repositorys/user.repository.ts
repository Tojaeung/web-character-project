import { AbstractRepository, EntityRepository } from 'typeorm';
import { User } from '@src/entities/user/user.entity';
import { Follow } from '@src/entities/user/follow.entity';

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

  findUserByUserId(userId: string) {
    return this.createQueryBuilder('user').where('user.userId = :userId', { userId }).getOne();
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

  updateDesc(id: number, desc: string) {
    return this.createQueryBuilder('user').update(User).set({ desc }).where('id = :id', { id }).execute();
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

  updateCover(id: number, cover: string, coverKey: string) {
    return this.createQueryBuilder('user').update(User).set({ cover, coverKey }).where('id = :id', { id }).execute();
  }

  deleteUser(id: number) {
    return this.createQueryBuilder('user').delete().from(User).where('id = :id', { id }).execute();
  }

  /*
   * getProfile API에 사용된다.
   * 프로필유저 정보와 프로필유저의 팔로우, 팔로잉 정보를 가져온다.
   * user테이블과 follow 테이블이 결합한다.
   */
  findProfile(profileId: number) {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.followers', 'followers')
      .leftJoinAndSelect('user.followings', 'followings')
      .where('user.id = :profileId', { profileId })
      .getOne();
  }
}

@EntityRepository(Follow)
export class FollowRepository extends AbstractRepository<Follow> {
  unFollow(userId: number, profileId: number) {
    return this.createQueryBuilder('follow')
      .delete()
      .from(Follow)
      .where('from_id = :userId', { userId })
      .andWhere('to_id = :profileId', { profileId })
      .execute();
  }

  // 계정삭제 할때 모든 팔로우 정보 삭제
  deleteFollow(id: number) {
    return this.createQueryBuilder('follow')
      .delete()
      .from(Follow)
      .where('from_id = :from_id', { from_id: id })
      .orWhere('to_id = :to_id', { to_id: id })
      .execute();
  }
}
