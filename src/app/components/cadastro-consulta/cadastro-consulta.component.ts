import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  ModalController, IonTextarea } from '@ionic/angular/standalone';
import { ConsultaService } from 'src/app/services/consulta.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Consulta } from 'src/app/types/Consulta';
import { Paciente } from 'src/app/types/Paciente';

@Component({
  selector: 'app-cadastro-consulta',
  templateUrl: './cadastro-consulta.component.html',
  styleUrls: ['./cadastro-consulta.component.scss'],
  imports: [IonTextarea, 
    IonIcon,
    IonButton,
    IonInput,
    IonItem,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class CadastroConsultaComponent implements OnInit {
  @Input() consulta!: Consulta;

  public pacientes: Paciente[] = [];

  private consultaService = inject(ConsultaService);
  private pacienteService = inject(PacienteService);
  private modalController = inject(ModalController);

  ngOnInit() {
    this.carregarPacientes();

    if (!this.consulta) {
      this.consulta = {
        id: '',
        paciente: {},
        medico: '',
        data: new Date(),
        valor: '',
        observacoes:''
      };
    }
  }

  private async carregarPacientes() {
    const pacientes = await this.pacienteService.buscarTodos();
    this.pacientes = pacientes;
  }

  public salvar() {
    this.consultaService.salvar(this.consulta).subscribe(() => {
      this.modalController.dismiss();
    });
  }
}
