import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Drawing from '@src/entities/drawing/drawing.entity';
import DrawingComment from '@src/entities/drawing/comment.entity';
import Commission from '@src/entities/board/commission/commission.entity';
import CommissionComment from '@src/entities/board/commission/comment.entity';
import CommissionImageKey from '@src/entities/board/commission/imageKey.entity';
import Free from '@src/entities/board/free/free.entity';
import FreeComment from '@src/entities/board/free/comment.entity';
import FreeImageKey from '@src/entities/board/free/imageKey.entity';
import Request from '@src/entities/board/request/request.entity';
import RequestComment from '@src/entities/board/request/comment.entity';
import RequestImageKey from '@src/entities/board/request/imageKey.entity';
import Sale from '@src/entities/board/sale/sale.entity';
import SaleComment from '@src/entities/board/sale/comment.entity';
import SaleImageKey from '@src/entities/board/sale/imageKey.entity';

class Relation {
  @OneToMany(() => Drawing, (drawing) => drawing.user)
  drawings: Drawing[];

  @OneToMany(() => DrawingComment, (drawingComment) => drawingComment.user)
  drawingComments: DrawingComment[];

  @OneToMany(() => Commission, (commission) => commission.user)
  commissions: Commission[];

  @OneToMany(() => CommissionComment, (commissionComment) => commissionComment.user)
  commissionComments: CommissionComment[];

  @OneToMany(() => CommissionImageKey, (commissionimageKey) => commissionimageKey.user)
  commissionImageKeys: CommissionImageKey[];

  @OneToMany(() => Free, (free) => free.user)
  frees: Free[];

  @OneToMany(() => FreeComment, (freeComment) => freeComment.user)
  freeComments: FreeComment[];

  @OneToMany(() => FreeImageKey, (freeImageKey) => freeImageKey.user)
  freeImageKeys: FreeImageKey[];

  @OneToMany(() => Request, (request) => request.user)
  requests: Request[];

  @OneToMany(() => RequestComment, (requestComment) => requestComment.user)
  requestComments: RequestComment[];

  @OneToMany(() => RequestImageKey, (requestimageKey) => requestimageKey.user)
  requestImageKeys: RequestImageKey[];

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  @OneToMany(() => SaleComment, (saleComment) => saleComment.user)
  saleComments: SaleComment[];

  @OneToMany(() => SaleImageKey, (saleimageKey) => saleimageKey.user)
  saleImageKeys: SaleImageKey[];
}

@Entity('user', { schema: 'profile' })
class User extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'chat_id' })
  @Generated('uuid')
  chatId: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  nickname: string;

  @Column({ nullable: true, default: null })
  desc: string;

  @Column({
    default: process.env.DEFAULT_AVATAR_URL as string,
  })
  avatar: string;

  @Column({
    default: process.env.DEFAULT_AVATAR_KEY as string,
    name: 'avatar_key',
  })
  avatarKey: string;

  @Column({
    default: process.env.DEFAULT_COVER_URL as string,
  })
  cover: string;

  @Column({
    default: process.env.DEFAULT_COVER_KEY as string,
    name: 'cover_key',
  })
  coverKey: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'varchar', select: false })
  pw: string;

  @Column({ type: 'varchar', name: 'email_token', nullable: true, select: false })
  emailToken: string | null;

  @Column({ type: 'varchar', name: 'pw_token', select: false })
  pwToken: string;

  @Column({
    default: false,
    name: 'is_verified',
  })
  isVerified: boolean;

  @Column({ type: 'integer', default: 0, nullable: true })
  exp: number | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
