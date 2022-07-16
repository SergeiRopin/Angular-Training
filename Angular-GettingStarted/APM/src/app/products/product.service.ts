import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { IProduct } from './product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productsUrl = 'api/products/products.json';

    constructor(private httpClient: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
        return this.httpClient.get<IProduct[]>(this.productsUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    // Get one product
    // Since we are working with a json file, we can only retrieve all products
    // So retrieve all products and then find the one we want using 'map'
    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts()
            .pipe(
                map((products: IProduct[]) => products.find(p => p.productId === id))
            );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured ${err.error.message}`;
        } else {
            errorMessage = `Server returned code ${err.status} with message: ${err.message}`;
        }

        console.log();
        return throwError(errorMessage);
    }
}