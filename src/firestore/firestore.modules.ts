import { Firestore } from '@google-cloud/firestore'
import { DynamicModule, Module } from '@nestjs/common'

import * as fp from './firestore.providers'
import { FirestoreModuleOptions } from './types'

@Module({})
export class FirestoreModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const collectionProviders = fp.FirestoreCollectionProviders.map((providerName) => ({
      provide: providerName,
      useFactory: (db) => db.collection(providerName),
      inject: [fp.FirestoreDatabaseProvider],
    }))

    const optionsProvider = {
      provide: fp.FirestoreOptionsProvider,
      useFactory: options.useFactory,
      inject: options.inject,
    }

    const dbProvider = {
      provide: fp.FirestoreDatabaseProvider,
      useFactory: (config) => new Firestore(config),
      inject: [fp.FirestoreOptionsProvider],
    }

    return {
      global: true,
      module: FirestoreModule,
      imports: options.imports,
      providers: [optionsProvider, dbProvider, ...collectionProviders],
      exports: [dbProvider, ...collectionProviders],
    }
  }
}