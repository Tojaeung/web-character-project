import { AbstractRepository, EntityRepository } from 'typeorm';
import { User } from '@src/entities/user.entity';
import { Auth } from '@src/entities/auth.entity';
import { Follower } from '@src/entities/follower.entity';
import { Following } from '@src/entities/following.entity';
import { Desc } from '@src/entities/desc.entitiy';

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
    return this.createQueryBuilder('user').update(User).set({ email }).where('user.id=:id', { id }).execute();
  }

  updateNickname(id: number, nickname: string) {
    return this.createQueryBuilder('user').update(User).set({ nickname }).where('user.id = :id', { id }).execute();
  }

  updatePw(id: number, pw: string) {
    return this.createQueryBuilder('user').update(User).set({ pw }).where('user.id = :id', { id }).execute();
  }

  updateAvatar(id: number, avatar: string, avatarKey: string) {
    return this.createQueryBuilder('user')
      .update(User)
      .set({ avatar, avatarKey })
      .where('user.id = :id', { id })
      .execute();
  }

  deleteUser(id: number) {
    return this.createQueryBuilder('user').delete().from(User).where('user.id = :id', { id }).execute();
  }

  getProfileUser(id: number) {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.desc', 'desc')
      .leftJoinAndSelect('user.followers', 'follow')
      .leftJoinAndSelect('user.followings', 'follow')
      .where('user.id = :id', { id })
      .getOne();
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
  updateDesc(id: number, content: string) {
    return this.createQueryBuilder('desc').update(Desc).set({ content }).where('desc.user_id = :id', { id }).execute();
  }

  deleteDesc(id: number) {
    return this.createQueryBuilder('desc').delete().from(Desc).where('desc.user_id = :id', { id }).execute();
  }
}

@EntityRepository(Follower)
export class FollowerRepository extends AbstractRepository<Follower> {
  follow(id: number, profileId: number) {
    return this.createQueryBuilder('follow')
      .insert()
      .into(Follower)
      .values({ follower_id: profileId, user_id: id })
      .execute();
  }

  unfollow(id: number, profileId: number) {
    return this.createQueryBuilder('follow')
      .delete()
      .from(Follower)
      .where('follower.follower_id = :profileId', { profileId })
      .andWhere('follower.follower_id = :id', { id })
      .execute();
  }

  deleteFollower(id: number) {
    return this.createQueryBuilder('follower')
      .delete()
      .from(Follower)
      .where('follower.user_id = :id', { id })
      .execute();
  }
}

@EntityRepository(Following)
export class FollowingRepository extends AbstractRepository<Following> {
  follow(id: number, profileId: number) {
    return this.createQueryBuilder('follow')
      .insert()
      .into(Following)
      .values({ following_id: id, user_id: profileId })
      .execute();
  }

  unfollow(id: number, profileId: number) {
    return this.createQueryBuilder('follow')
      .delete()
      .from(Following)
      .where('following.following_id = :profileId', { profileId })
      .andWhere('following.following_id = :id', { id })
      .execute();
  }

  deleteFollowing(id: number) {
    return this.createQueryBuilder('follower')
      .delete()
      .from(Following)
      .where('following.user_id = :id', { id })
      .execute();
  }
}
