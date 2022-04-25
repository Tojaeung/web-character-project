import { AbstractRepository, EntityRepository } from 'typeorm';
import { User } from '@src/entities/user/user.entity';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  // 비밀번호 변경시 사용되는 pwToken으로 유저정보를 찾는 쿼리입니다.
  // pwToken은 엔티티에서 select: false 처리가 되어있기 때문에 addSelect이용해서 불러내야한다.
  findWithPwTokenByEmail(email: string) {
    return this.createQueryBuilder('user').addSelect('user.pwToken').where('user.email = :email', { email }).getOne();
  }

  // 로그인시, 입력 비밀번호와 데이터 해시된 비밀번호를 비교해야한다.
  // pw은 엔티티에서 select: false 처리가 되어있기 때문에 addSelect이용해서 불러내야한다.
  findWithPwByEmail(email: string) {
    return this.createQueryBuilder('user').addSelect('user.pw').where('user.email = :email', { email }).getOne();
  }

  // 비밀번호 변경시, 입력 비밀번호와 데이터 해시된 비밀번호를 비교해야한다.
  // pw은 엔티티에서 select: false 처리가 되어있기 때문에 addSelect이용해서 불러내야한다.
  findWithPwById(id: number) {
    return this.createQueryBuilder('user').addSelect('user.pw').where('user.id = :id', { id }).getOne();
  }

  // 로그인이 안된 상태에서 비밀번호찾기로 비밀번호를 변경하는 쿼리입니다.
  // 레파지토리 API로 2번 업데이트 해야하므로 쿼리빌더를 사용해서 한번에 업데이트 하는게 합리적이다.
  updatePwAndPwToken(id: number, pw: string, pwToken: string) {
    return this.createQueryBuilder('user').update(User).set({ pw, pwToken }).where('id = :id', { id }).execute();
  }

  // 프로필 사진을 변경하는 쿼리에서 사용됩니다.
  // 레파지토리 API로 2번 업데이트 해야하므로 쿼리빌더를 사용해서 한번에 업데이트 하는게 합리적이다.
  updateAvatarAndAvatarKey(id: number, avatar: string, avatarKey: string) {
    return this.createQueryBuilder('user').update(User).set({ avatar, avatarKey }).where('id = :id', { id }).execute();
  }

  // 커버 사진을 변경하는 쿼리에서 사용됩니다.
  // 레파지토리 API로 2번 업데이트 해야하므로 쿼리빌더를 사용해서 한번에 업데이트 하는게 합리적이다.
  updateCoverAndCoverKey(id: number, cover: string, coverKey: string) {
    return this.createQueryBuilder('user').update(User).set({ cover, coverKey }).where('id = :id', { id }).execute();
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
