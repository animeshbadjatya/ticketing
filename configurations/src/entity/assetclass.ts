import { Entity, Column, PrimaryColumn, Generated, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class AssetClass {
    @PrimaryGeneratedColumn()
    id: string

    @Column({type:'varchar', length:30, unique:true})
    assetClass: string

    @Column({type:'varchar', length:200})
    assetDescription: string

    @Column()
    userId: string

    // Createdtimestamp
    //createdByUserId: string
    //isDeleted: boolean
    //LastModifiedByUserId: string
    //LastModifiedDate: string
    //DeletedTimestamp: string
    //DeletedByUserId: string

}
