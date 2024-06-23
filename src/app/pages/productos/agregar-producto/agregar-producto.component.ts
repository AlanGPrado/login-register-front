import { Component, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent {
  productForm: FormGroup;
  backendUrl = 'http://localhost:3000';
  imageUrl?: string;
  imageLocal: string = '';
  imgToServer: any;
  categories = [
    "Materias Primas",
    "Productos Químicos Básicos",
    "Productos Químicos Especializados",
    "Productos de Limpieza y Desinfección",
    "Químicos para Tratamiento de Agua"
  ];
  title: string = 'AGREGAR PRODUCTO';
  flagDialog: boolean = true;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<AgregarProductoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      sku: ['', Validators.required],
      costo: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.editProduct();
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.postProduct();
    }
  }

  editProduct() {
    if (this.data.product) {
      this.productForm.patchValue(
        {
          nombre: this.data.product.name_product,
          descripcion: this.data.product.desc_product,
          categoria: this.data.product.category_id,
          sku: this.data.product.sku,
          costo: this.data.product.cost,
          precio: this.data.product.price,
          imagen: this.data.product.image
        }
      );
      // this.imageLocal = this.data.product.image;
      this.title = this.data.product.name_product.toUpperCase();
      this.flagDialog = this.data.header;
    }
  }

  uploadImage(event: any) {
    let image = event.target.files[0];
    if (image) {
      let formData = new FormData();
      formData.append('image', image);
      this.imageLocal = URL.createObjectURL(image);
      this.imgToServer = formData;
      this.productForm.patchValue({ imagen: this.imageLocal });
    }
  }

  postImage(formData: any) {
    return this.http.post(`${this.backendUrl}/upload`, formData).toPromise();
  }

  async postProduct() {
    try {
      const imageResponse: any = await this.postImage(this.imgToServer);
      if (imageResponse.success) {
        this.imageUrl = `${this.backendUrl}/${imageResponse.data}`;
        this.productForm.patchValue({ imagen: this.imageUrl });

        const productResponse: any = await this.http.post(`${this.backendUrl}/add/product`, this.productForm.value).toPromise();
        if (productResponse.success) {
          console.log("Product successfully added", productResponse.data);
          this.snackBar.open('Producto agregado correctamente.', 'Cerrar', {
            duration: 5000,
          });
          this.productForm.reset();
          this.imageLocal = '';
        } else {
          console.log('Error occurred while adding product');
        }
      } else {
        console.log('Error occurred while uploading image');
      }
    } catch (error) {
      console.error('HTTP request error:', error);
    }
  }

  editItem(): void {
    this.http.patch(`${this.backendUrl}/edit/product/${this.data.product.id_product}`, this.productForm.value)
    .subscribe(this.productObserver);
  }

  private productObserver: Observer<any> = {
    next: (res: any) => {
      if (res.success) {
        console.log(res.data);
        this.data.update()
        this.snackBar.open('Producto editado correctamente.', 'Cerrar', {
          duration: 5000,
        });
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
}

