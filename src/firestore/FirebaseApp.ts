import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as firebase from "firebase-admin";
import * as fs from 'fs';

@Injectable()
export class FirebaseApp {
    private firebaseApp: firebase.app.App;


    constructor(private configService: ConfigService) {
        const accountPath = configService.get<string>('SA_KEY');
        if (!accountPath) {
            throw new Error('Service Account key path is required')
        }
        const serviceAccount: any = JSON.parse(fs.readFileSync(accountPath, 'utf8'))

        const adminConfig: firebase.ServiceAccount = {
            projectId: serviceAccount.project_id,
            privateKey: serviceAccount.private_key,
            clientEmail: serviceAccount.client_email,
        }

        this.firebaseApp = firebase.initializeApp({
            credential: firebase.credential.cert(adminConfig),
            databaseURL: `https://${adminConfig.projectId}.firebaseio.com`,
          })
    }

    getAuth = (): firebase.auth.Auth => {
        return this.firebaseApp.auth();
    }

    firestore = (): firebase.firestore.Firestore => {
        return this.firebaseApp.firestore();
    }
    
}