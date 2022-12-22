import { Component, OnInit } from '@angular/core';
import { Beneficiario } from 'src/app/model/beneficiario.model';
import { BeneficiarioService } from 'src/app/service/beneficiario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.scss']
})
export class BeneficiarioComponent implements OnInit {

  form: FormGroup;

  beneficiarios: Beneficiario[];

  constructor(private beneficiarioService: BeneficiarioService, private _fb: FormBuilder, private msgService: MessageService) { }

  ngOnInit(): void {
    this.initForm();
    this.listar();
  }

  initForm() {
    this.form = this._fb.group({
      id: [],
      nome: ['', Validators.required],
      cpf: ['',  [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idade: ['', Validators.required]
    })
  }


  private listar() {
    this.beneficiarioService.list().subscribe(planos => {
      this.beneficiarios = planos;
    });
  }

  save(){
    this.beneficiarioService.save(this.form.value).subscribe(() => {
      this.msgService.add({ summary: 'Beneficiário', detail: 'Beneficiário Salvo com sucesso.', severity: 'success' });
      this.listar();
      this.form.reset();
      setTimeout(() =>{ this.msgService.clear(); }, 2000);
    });
  }
}
