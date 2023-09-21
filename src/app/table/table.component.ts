import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PeriodicElement } from "./PeriodicElement";
import { FormGroup, FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'btn', 'name', 'weight', 'symbol', 'type', 'date'];
  dataSource = [...ELEMENT_DATA];
  formmode = true;
  index: any;
  selected: any;
  @ViewChild(MatTable)
  table!: MatTable<PeriodicElement>;
  @ViewChild('mydialog') myform!: TemplateRef<any>;


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this.formmode = true;
    this.dialog.open(this.myform);
  }
  
  addNew() {
    this.formmode = true;
    let element = {
      position: this.dataSource.length + 1,
      name: this.form.value.name,
      weight: this.form.value.weight,
      symbol: this.form.value.symbol,
      type: this.form.value.type,
      description: this.form.value.description,
      date: this.form.value.date
    }
    console.log(element);
    this.dataSource.push(element);
    this.table.renderRows();
    this.form.reset();
  }


  onEdit(index: number) {
    this.formmode = false;

    this.form.patchValue({
      position: this.dataSource[index].position,
      name: this.dataSource[index].name,
      weight: this.dataSource[index].weight,
      symbol: this.dataSource[index].symbol,
      type: this.dataSource[index].type,
      description: this.dataSource[index].description,
      date: this.dataSource[index].date
    })
    this.dialog.open(this.myform);
  }


  updateRow() {
    const position = this.form.get('position')?.value;
    const updatedElement = {
      position: this.form.get('position')?.value,
      name: this.form.get('name')?.value,
      weight: this.form.get('weight')?.value,
      symbol: this.form.get('symbol')?.value,
      type: this.form.get('type')?.value,
      description: this.form.get('description')?.value,
      date: this.form.get('date')?.value
    }

    const index = this.dataSource.findIndex(
      (element) => { return element.position === position }
    )
    if (index !== -1) {
      this.dataSource.splice(index, 1, updatedElement);
      this.table.renderRows();
      this.dialog.closeAll();
      this.form.reset();
    }
    else {
      this.form.reset();
    }
  }

  

  onDelete(position: number) {
    const del = this.dataSource.findIndex((dele) => dele.position === position);

    if (del !== -1) {
      this.dataSource.splice(del, 1),
        this.table.renderRows();
    }
  }
  form = new FormGroup({
    position: new FormControl(),
    name: new FormControl(),
    weight: new FormControl(),
    symbol: new FormControl(),
    type: new FormControl(),
    description: new FormControl(),
    date: new FormControl()
  });

}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H", type: 'Reactive non-metals', description: 'Enter Message', date: new Date() },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He", type: 'Nobel gases', description: 'Enter Message', date: new Date() },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li", type: 'Alkali metals', description: 'Enter Message', date: new Date() },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be", type: 'Alkaline earth metals', description: 'Enter Message', date: new Date() },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B", type: 'Metalloids', description: 'Enter Message', date: new Date() },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C", type: 'Reactive non-metals', description: 'Enter Message', date: new Date() },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N", type: 'Reactive non-metals', description: 'Enter Message', date: new Date() },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O", type: 'Reactive non-metals', description: 'Enter Message', date: new Date() },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F", type: 'Reactive non-metals', description: 'Enter Message', date: new Date() },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne", type: 'Noble gases', description: 'Enter Message', date: "08-09-2023" },
]
