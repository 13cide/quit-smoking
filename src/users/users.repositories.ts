import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/userEntity";
import { CollectionReference, Query, Timestamp } from "@google-cloud/firestore";
import { getUniqueId } from "src/helpers/id";
import { CreateUserDto } from "./dto/CreateUserDto";

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

        if (!snapshot.exists) {
            return null
          } else {
            return snapshot.data() || null
          }
    }

    async create(payload: CreateUserDto) {
        const time = Timestamp.now()

        const validPayload = {
            id: getUniqueId(),
            username: payload.username,
            email: payload.email,
            age: payload.age,
            bio: payload.bio ?? '',
            createdAt: time,
            updatedAt: time,
          }

        const document = await this.collection.doc(validPayload.id)
        await document.set(validPayload)

        return validPayload
    }

    async update(id: number, updateUserDto: any) {
        return
    }

    async delete(id: number) {
        return
    }

}