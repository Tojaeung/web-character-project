import { AbstractRepository, EntityRepository } from 'typeorm';
import Free from '@src/entities/board/free/free.entity';
import Commission from '@src/entities/board/commission/commission.entity';
import Reque from '@src/entities/board/reque/reque.entity';
import Sale from '@src/entities/board/sale/sale.entity';

@EntityRepository(Free)
export class FreeRepository extends AbstractRepository<Free> {}
@EntityRepository(Commission)
export class CommissionRepository extends AbstractRepository<Commission> {}

@EntityRepository(Reque)
export class RequeRepository extends AbstractRepository<Reque> {}

@EntityRepository(Sale)
export class SaleRepository extends AbstractRepository<Sale> {}
