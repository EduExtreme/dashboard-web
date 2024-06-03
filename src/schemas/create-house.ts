import z from 'zod'

export const createHouseSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O nome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'O nome deve ter no maximo 50 caracteres' }),
  address: z
    .string()
    .min(3, { message: 'O endereço deve ter pelo menos 3 caracteres' }),
  number: z
    .string()
    .min(1, { message: 'O número deve ter pelo menos 1 caracteres' }),
  price: z.string().min(0, { message: 'O campo deve ser maior ou igual a 0' }),
})

export type CreateHouseSchema = z.infer<typeof createHouseSchema>
