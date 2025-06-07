import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  ModalController,
} from '@ionic/angular/standalone';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/types/Paciente';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss'],
  imports: [
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCard,
    IonIcon,
    IonButton,
    IonInput,
    IonContent,
    IonItem,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
  standalone: true,
})
export class CadastroPacienteComponent implements OnInit {
  @Input() paciente!: Paciente;

  private pacienteService = inject(PacienteService);
  private modalController = inject(ModalController);

  ngOnInit(): void {
    if (!this.paciente) {
      this.paciente = {
        id: 0,
        nome: '',
        idade: 0,
        peso: 0,
        raca: '',
        tipoAnimal: '',
        tutor: '',
      };
    }
  }

 public async salvar() {
    await this.pacienteService.salvar(this.paciente);
    this.modalController.dismiss();
  }
}
