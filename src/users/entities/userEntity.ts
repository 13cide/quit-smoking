import { Timestamp } from '@google-cloud/firestore'

export class UserEntity {
  static collectionName = 'users'

  id: string
  username: string
  email: string
  age: number
  bio?: string | null
  createdAt?: Timestamp | null
  updatedAt?: Timestamp | null
}