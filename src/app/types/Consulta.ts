import { Paciente } from "./Paciente";

export type Consulta = {
    id?: string,
    data: Date,
    medico: string,
    paciente: Partial<Paciente>,
    valor: string,
    observacoes: string
}