import { Injectable } from '@angular/core';
import { Paciente } from '../types/Paciente';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  private readonly chave = 'pacientes';

  public async buscarTodos(): Promise<Paciente[]> {
    const pacientes = await Preferences.get({ key: this.chave});
    return pacientes && pacientes.value ? JSON.parse(pacientes.value) : [];
  }

  public async salvar(paciente: Paciente) {
    if (paciente.id && paciente.id > 0) {
      return this.atualizar(paciente);
    }
    const pacientes = await this.buscarTodos();
    const id = pacientes.length + 1;
    pacientes.push({ ...paciente, id });
    await Preferences.set({ key: this.chave, value: JSON.stringify(pacientes) });
  }

  public async excluir(paciente: Paciente) {
    let pacientes = await this.buscarTodos();
    pacientes = pacientes.filter(a => a.id !== paciente.id);
    await Preferences.set({ key: this.chave, value: JSON.stringify(pacientes) });
  }

   public async atualizar(paciente: Paciente) {
    const pacientes = await this.buscarTodos();
    const index = pacientes.findIndex(a => a.id === paciente.id);
    if (index !== -1) {
      pacientes[index] = paciente;
      await Preferences.set({ key: this.chave, value: JSON.stringify(pacientes) });
    }
  }
}
