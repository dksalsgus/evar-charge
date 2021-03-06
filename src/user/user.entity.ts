import { BaseEntity } from 'src/cls/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum EnRole {
  ADMIN = 0,
  USER = 1,
}

@Entity()
export class User extends BaseEntity {
  /**
   * 회원 번호
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  userNo: number;
  /**
   * 회원 아이디
   */
  @Column({ type: 'varchar', unique: true })
  userId: string;
  /**
   * 회원 비밀번호
   */
  @Column({ type: 'varchar' })
  userPw: string;
  /**
   * 회원 이메일
   */
  @Column({ type: 'varchar' })
  userEmail: string;

  @Column({ type: 'enum', enum: EnRole, default: EnRole.USER })
  userRole: EnRole;
}
