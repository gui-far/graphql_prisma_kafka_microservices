import { Parent, Query, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql';
import { Product } from '../models/product';

import { Customer } from '../models/customer';
import { CustomersService } from 'src/services/customers.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { Purchase } from '../models/purchase';
import { PurchasesService } from 'src/services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {

    constructor(
        private customersServices: CustomersService,
        private purchasesService: PurchasesService
    ) { }

    @UseGuards(AuthorizationGuard)
    @Query(() => Customer)
    me(@CurrentUser() user: AuthUser) {

        return this.customersServices.getCustomerByAuthUserId(user.sub);
    }

    @ResolveField(() => Purchase)
    purchases(@Parent() customer: Customer) {

        return this.purchasesService.listAllFromCustomer(customer.id)

    }

    @ResolveReference()
    resolverReference(reference: {authUserId : string}) {
        return this.customersServices.getCustomerByAuthUserId(reference.authUserId)
    }
}
