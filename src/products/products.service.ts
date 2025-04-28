import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4} from 'uuid'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private products: Product[] = [];

  create(createProductDto: CreateProductDto) {
    
    const { name, price, description} = createProductDto;

    const newProduct = new Product(
      uuidv4(), 
      name, 
      description, 
      price
    );

    this.products.push( newProduct );

    return newProduct;

  }

  findAll() {
    return this.products;
  }

  findOne(id: string): Product {

    const product = this.products.find( product => product.id === id );

    if(!product) throw new NotFoundException(`Product with id: ${id} not found.`)

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const {id:__, name, description, price} = updateProductDto;

    const productToUpdate = this.findOne( id );

    productToUpdate?.updateWith({ name, description, price });

    return productToUpdate;

  }

  remove(id: string): Product {
    const productToDelete = this.findOne( id );
    this.products = this.products.filter( product => product.id !== id );
    return productToDelete;
  }
}
