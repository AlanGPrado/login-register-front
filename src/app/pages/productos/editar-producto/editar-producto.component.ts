import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from 'src/app/components/dialog-window/dialog-window.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent {
  backendUrl = 'http://localhost:3000';
  private productsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public products$: Observable<any[]> = this.productsSubject.asObservable();
  showMenuIndex: number | null = null;
  products: any[] = [];
  noItemsFound: boolean = false;

  constructor(private http: HttpClient, private dialogRef: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.http.get(`${this.backendUrl}/get/product`)
      .subscribe(this.productObserver);
  }

  private productObserver: Observer<any> = {
    next: (res: any) => {
      if (res.success) {
        console.log(res.data);
        this.productsSubject.next(res.data);
        this.products = res.data;
        this.getParentStyle();
        (res.message === false) ? this.noItemsFound = true : this.noItemsFound = false;
      } else {
        console.log('Error occurred');
      }
    },
    error: (error: any) => {
      console.error('HTTP request error:', error);
    },
    complete: () => {
      console.log('HTTP request completed.');
    }
  }

  getParentStyle() {
    if (this.products.length === 1) {
      return {
        'grid-template-columns': 'none',
        'width': '50%'
      };
    } else {
      return {};
    }
  }

  openDialogDelete(index: number) {
    const dialog = this.dialogRef.open(DialogWindowComponent, {
      data: {
        message: '¿Estas seguro de eliminar este producto?',
        buttonText: {
          ok: 'Eliminar',
          cancel: 'No'
        }
      }
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.snackBar.open('Producto eliminado correctamente.', 'Cerrar', {
          duration: 5000,
        });
        this.deleteProduct(index);
      }
    })
  }

  openDialogEdit(index: number) {
    const dialog = this.dialogRef.open(AgregarProductoComponent, {
      data: {
        product: this.products[index],
        title: 'EDITAR ',
        header: false,
        update: () => this.getProducts(),
      }
    });

    setTimeout(() => {
      document.body.classList.add('dialog-open');
    }, 1);

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      document.body.classList.remove('dialog-open');

      if (confirmed) {
        this.snackBar.open('Producto eliminado correctamente.', 'Cerrar', {
          duration: 5000,
        });
        this.deleteProduct(index);
      }
    })
  }

  deleteProduct(index: number) {
    this.http.delete(`${this.backendUrl}/delete/product/${this.products[index].id_product}`)
      .subscribe(
        (res: any) => {
          if (res.success) {
            console.log(res.data);
            this.getProducts();
          } else {
            console.log('Error ocurred');
          }
        },
        (error: any) => {
          console.error('HTTP request error:', error);
        }
      );
  }

  toggleMenu(index: number) {
    (this.showMenuIndex === index) ? this.showMenuIndex = null : this.showMenuIndex = index;
  }
}
