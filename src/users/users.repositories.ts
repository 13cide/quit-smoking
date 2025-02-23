import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "./entities/userEntity";
import { CollectionReference, Query, Timestamp } from "@google-cloud/firestore";
import { getUniqueId } from "src/helpers/id";
import { CreateUserDto } from "./dto/CreateUserDto";
import { UpdateUserDto } from "./dto/UpdateUserDto";

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

        // const validPayload: UserEntity = {
        //     id: getUniqueId(),
        //     username: payload.username,
        //     email: payload.email,
        //     age: payload.age,
        //     bio: payload.bio ?? '',
        //     createdAt: time,
        //     updatedAt: time,
        //   }

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

    async update(id: string, updateUserDto: UpdateUserDto) {
        const doc = await this.collection.doc(id)
        const snapshot = await doc.get()
    
        if (!snapshot.exists) {
          throw new NotFoundException('User document does not exist')
        } 
        let response = snapshot.data()

        if (!response) {
            throw new NotFoundException('User document does not exist')
        }
        response = { ...response, ...updateUserDto }
        //const response: UserEntity = { ...snapshot.data(), ...updateUserDto }
        response.updatedAt = Timestamp.now()
        const changedKeys = Object.keys(updateUserDto)
        const valuesToUpdate: UpdateUserDto = {}

        for (const key of changedKeys) {
            const newValue = response?.[key]
            const currentValue = doc?.[key]

            if (newValue !== currentValue) {
                valuesToUpdate[key] = newValue
            }
        }

        if (Object.keys(valuesToUpdate).length > 0) {
            await doc.update({ ...valuesToUpdate, updatedAt: response?.updatedAt })
        }

        return response
      }

      async delete(id: string) {
        const doc = await this.collection.doc(id)
        const snapshot = await doc.get()
    
        if (!snapshot.exists) {
          throw new NotFoundException('User document does not exist')
        }
    
        await doc.delete()

        const response = snapshot.data()

        if (!response) {
            throw new NotFoundException('User document does not exist')
        }
    
        return response
      }

}