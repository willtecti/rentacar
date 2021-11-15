import { fetcher } from 'infra/fetcher'
import useSWR from 'swr'

const urlGatway = "http://localhost:3002"

export interface ReservasResp {
    veiculoNome: string,
    valor: number,
    localRetirada: string,
    imagem: string
}
export function  useListarResevasPorCidadeEData(cidade: string, dataHoraRetirada: string, dataHoraDevolucao: string): Array<ReservasResp> | [] {
    const {data: reservas, error} = useSWR<Array<ReservasResp>>(`${urlGatway}/locadoras/movida`, fetcher)
    return !reservas ? [] : reservas

}