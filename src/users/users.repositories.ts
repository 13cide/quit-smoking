import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { CollectionReference, Query, Timestamp } from "@google-cloud/firestore";
import { getUniqueId } from "src/helpers/id";
import { RegisterUserDto } from "./dto/register-user.dto";
import * as firebase from "firebase-admin";
import { LoginDto } from "./dto/login.dto";
import axios from "axios";



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

        const document = this.collection.doc(validPayload.id)
        await document.set(validPayload)

        return validPayload
    }

    async registerUser(registerUserDTo: RegisterUserDto) {
        console.log(registerUserDTo);
        try {
            const userRecord = await firebase.auth().createUser({
                displayName: registerUserDTo.username,
                email: registerUserDTo.email,
                password: registerUserDTo.password,
            });

            console.log('User Record:', userRecord);
            return userRecord;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('User registration failed'); // Handle errors gracefully
        }
    }



    
    async loginUser(payload: LoginDto) {
        const { email, password } = payload;
        try {
          const { idToken, refreshToken, expiresIn } =
            await this.signInWithEmailAndPassword(email, password);
          return { idToken, refreshToken, expiresIn };
        } catch (error: any) {
          if (error.message.includes('EMAIL_NOT_FOUND')) {
            throw new Error('User not found.');
          } else if (error.message.includes('INVALID_PASSWORD')) {
            throw new Error('Invalid password.');
          } else {
            throw new Error(error.message);
          }
        }
      }
      private async signInWithEmailAndPassword(email: string, password: string) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.APIKEY}`;
        return await this.sendPostRequest(url, {
          email,
          password,
          returnSecureToken: true,
        });
      }
      private async sendPostRequest(url: string, data: any) {
        try {
          const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json' },
          });
          return response.data;
        } catch (error) {
          console.log('error', error);
        }
      }






    async update(id: string, updateUserData: UpdateUserData) {
        const doc = this.collection.doc(id)

        await doc.update({ ...updateUserData, updatedAt: Timestamp.now() })

        return (await doc.get()).data()
    }

    async delete(id: string) {
        await this.collection.doc(id).delete()
    }

}