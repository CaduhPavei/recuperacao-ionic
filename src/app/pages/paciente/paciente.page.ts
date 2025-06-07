import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
  IonBackButton,
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { Paciente } from 'src/app/types/Paciente';
import { CadastroPacienteComponent } from 'src/app/components/cadastro-paciente/cadastro-paciente.component';
import { PacienteService } from './../../services/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonList,
    IonText,
    IonIcon,
    IonLabel,
    IonItem,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
    IonBackButton,
  ],
})
export class PacientePage implements OnInit {
  public pacientes: Paciente[] = [];

  private modalController = inject(ModalController);
  private pacienteService = inject(PacienteService);

  ngOnInit() {
    this.carregarPacientes();
  }

  public async abrirModal(paciente?: Paciente) {
    const modal = await this.modalController.create({
      component: CadastroPacienteComponent,
      breakpoints: [1.5, 0.75, 0.95],
      initialBreakpoint: 0.75,
      componentProps: {
        paciente: paciente,
      },
    });
    modal.present();
    
    modal.onDidDismiss().then(() => {
      this.carregarPacientes();
    });
  }

  public async carregarPacientes() {
    this.pacientes = await this.pacienteService.buscarTodos();
  }

  public async excluirPaciente(paciente: Paciente) {
    await this.pacienteService.excluir(paciente);
    this.carregarPacientes();
  }
}
