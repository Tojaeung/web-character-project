import { AbstractRepository, EntityRepository } from 'typeorm';
import User from '@entities/profile/user.entity';

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
}
