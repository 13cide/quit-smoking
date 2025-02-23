import { UserEntity } from "src/users/entities/userEntity"

export const FirestoreDatabaseProvider = 'firestoredb'
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [UserEntity.collectionName]