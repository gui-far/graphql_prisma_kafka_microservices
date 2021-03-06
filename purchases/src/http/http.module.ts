import path from 'node:path'

import { Module } from '@nestjs/common';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from '../database/database.module';

import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';

import { ProductsService } from '../services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { CustomersService } from 'src/services/customers.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { MessagingModule } from 'src/messaging/messaging.module';



@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        MessagingModule,
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql')
        })
    ],
    providers: [
        ProductsResolver,
        PurchasesResolver,
        CustomersResolver,

        PurchasesService,
        ProductsService,
        CustomersService
    ]
})
export class HttpModule { }
