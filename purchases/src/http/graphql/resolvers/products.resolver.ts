import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/services/products.service';
import { Product } from '../models/product';

import slugify from 'slugify';
import { CreateProductInput } from '../inputs/create-product-input';

@Resolver(()=>Product)
export class ProductsResolver {

    constructor( private productService: ProductsService ){ }

    @Query(()=> [Product])
    //@UseGuards(AuthorizationGuard)
    products() {
        return this.productService.listAllProducts();
    }

    @Mutation(()=>Product)
    createProduct(@Args('data') data: CreateProductInput) {
        return this.productService.createProduct(data);
    }

}
