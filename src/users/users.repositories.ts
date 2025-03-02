import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { CollectionReference, Query, Timestamp } from "@google-cloud/firestore";
import { getUniqueId } from "src/helpers/id";



type CreateUserData = Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>
type UpdateUserData = Partial<CreateUserData>

@Injectable()
export class UsersRepository {
    
    constructor(
        @Inject(UserEntity.collectionName)
        private collection: CollectionReference<UserEntity>,
    ) {}

    private findGenerator() {
        const collectionRef = this.collection
        let query: Query<UserEntity> = collectionRef
    
        return query
      }


    async findAll(): Promise<UserEntity[]> {
        const list: UserEntity[] = []
        let query = this.findGenerator()
        query = query.orderBy('createdAt', 'desc')

        const snapshot = await query.get()

        snapshot.forEach((doc) => list.push(doc.data()))

        return list
    }

    async findOne(id: string): Promise<UserEntity | null> {
        const snapshot = await this.collection.doc(id).get();

        return snapshot.data() || null
    }

    async create(payload: CreateUserData) {
        const time = Timestamp.now()

        const validPayload: UserEntity = {
            id: getUniqueId(),
            ...payload,
            createdAt: time,
            updatedAt: time,
        }

        const document = await this.collection.doc(validPayload.id)
        await document.set(validPayload)

        return validPayload
    }

    async update(id: string, updateUserData: UpdateUserData) {
        const doc = await this.collection.doc(id)

        await doc.update({ ...updateUserData, updatedAt: Timestamp.now() })

        return (await doc.get()).data() ?? null
      }

      async delete(id: string) {
        const doc = await this.collection.doc(id)
        await doc.delete()
      }

}