import { AbstractRepository, EntityRepository, getConnection } from 'typeorm';
import { User } from '@src/entities/profile/user.entity';
import { Auth } from '@src/entities/profile/auth.entity';
import { Follow } from '@src/entities/profile/follow.entity';
import { Desc } from '@src/entities/profile/desc.entitiy';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  findUserByEmail(email: string) {
    return this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
  }
  findUserByNickname(nickname: string) {
    return this.createQueryBuilder('user').where('user.nickname = :nickname', { nickname }).getOne();
  }

  findUserById(id: number) {
    return this.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
  }

  updateEmail(id: number, email: string) {
    return this.createQueryBuilder('user').update(User).set({ email }).where('id=:id', { id }).execute();
  }

  updateNickname(id: number, nickname: string) {
    return this.createQueryBuilder('user').update(User).set({ nickname }).where('id = :id', { id }).execute();
  }

  updatePw(id: number, pw: string) {
    return this.createQueryBuilder('user').update(User).set({ pw }).where('id = :id', { id }).execute();
  }

  updateAvatar(id: number, avatar: string, avatarKey: string) {
    return this.createQueryBuilder('user').update(User).set({ avatar, avatarKey }).where('id = :id', { id }).execute();
  }

  deleteUser(id: number) {
    return this.createQueryBuilder('user').delete().from(User).where('id = :id', { id }).execute();
  }
}

@EntityRepository(Auth)
export class AuthRepository extends AbstractRepository<Auth> {
  findAuthByEmailToken(emailToken: string) {
    return this.createQueryBuilder('auth').where('auth.emailToken = :emailToken', { emailToken }).getOne();
  }

  findAuthByUser_id(id: number) {
    return this.createQueryBuilder('auth').where('auth.user_id = :user_id', { user_id: id }).getOne();
  }

  findAuthByPwToken(pwToken: string) {
    return this.createQueryBuilder('auth').where('auth.pwToken = :pwToken', { pwToken }).getOne();
  }

  updatePwToken(id: number, pwToken: string) {
    return this.createQueryBuilder('auth').update(Auth).set({ pwToken }).where('auth.user_id = :id', { id }).execute();
  }

  deleteAuth(id: number) {
    return this.createQueryBuilder('auth').delete().from(Auth).where('auth.user_id = :id', { id }).execute();
  }
}

@EntityRepository(Desc)
export class DescRepository extends AbstractRepository<Desc> {
  findDescByid(id: number) {
    return this.createQueryBuilder('desc').where('desc.user_id = :id', { id }).getOne();
  }

  updateDesc(id: number, content: string) {
    return this.createQueryBuilder('desc').update(Desc).set({ content }).where('user_id = :id', { id }).execute();
  }

  deleteDesc(id: number) {
    return this.createQueryBuilder('desc').delete().from(Desc).where('user_id = :id', { id }).execute();
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
