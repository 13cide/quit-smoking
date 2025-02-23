import { Timestamp } from "@google-cloud/firestore"


export class ChallengeEntity {
    static collectionName = 'challenges'
  
    initiatorId: string
    opponentId: string
    status: 'PENDING' | 'ACTIVE' | 'ENDED'
    startDate: Timestamp
    endDate?: Timestamp | null
}