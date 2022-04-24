import { AbstractRepository, EntityRepository } from 'typeorm';
import { User } from '@src/entities/user/user.entity';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  // 비밀번호 변경시 사용되는 pwToken으로 유저정보를 찾는 쿼리입니다.
  // pwToken은 엔티티에서 select: false 처리가 되어있기 때문에 콕 집어서 불러내야한다.
  selectPwTokenByEmail(email: string) {
    return this.createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.nickname')
      .addSelect('user.pwToken')
      .where('user.email = :email', { email })
      .getOne();
  }

  // 로그인이 안된 상태에서 비밀번호찾기로 비밀번호를 변경하는 쿼리입니다.
  updatePwAndPwToken(id: number, pw: string, pwToken: string) {
    return this.createQueryBuilder('user').update(User).set({ pw, pwToken }).where('id = :id', { id }).execute();
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

  updateAvatar(id: number, avatar: string, avatarKey: string) {
    return this.createQueryBuilder('user').update(User).set({ avatar, avatarKey }).where('id = :id', { id }).execute();
  }

  updateCover(id: number, cover: string, coverKey: string) {
    return this.createQueryBuilder('user').update(User).set({ cover, coverKey }).where('id = :id', { id }).execute();
  }

  deleteUser(id: number) {
    return this.createQueryBuilder('user').delete().from(User).where('id = :id', { id }).execute();
  }

  // 댓글, 게시글 작성시 영감력(user테이블의 exp칼럼) 상승
  calcExp(id: number, calcedValue: number) {
    return this.createQueryBuilder('user')
      .update(User)
      .set({ exp: () => `exp + ${calcedValue}` })
      .where('id =:id', { id })
      .execute();
  }

  updateExp(id: number, exp: number | null) {
    return this.createQueryBuilder('user').update(User).set({ exp }).where('id =:id', { id }).execute();
  }
}
