import { Building, Edit, Trash2 } from 'lucide-react'
import { Button } from './button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { CreateHouseSchema, createHouseSchema } from '@/schemas/create-house'

interface HousesTypes {
  id: string
  name: string
  address: string
  number: number
  price: string
}

export function HouseList() {
  const [houses, setHouses] = useState<HousesTypes[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateHouseSchema>({
    resolver: zodResolver(createHouseSchema),
  })

  console.log('errors:', errors)

  useEffect(() => {
    axios
      .get('https://imobi-app-api-production.up.railway.app/houses')
      .then((response) => {
        setHouses(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the houses data!', error)
      })
  }, [])

  function handleDeleteHouse(id: string) {
    axios
      .delete(`https://imobi-app-api-production.up.railway.app/house`, {
        params: { id },
      })
      .then((response) => {
        setHouses(houses.filter((house) => house.id !== id))
      })
      .catch((error) => {
        console.error('There was an error deleting the house!', error)
      })
  }

  function handleCreateHouse(form: CreateHouseSchema) {
    console.log('form ? ', form)
    axios
      .post('https://imobi-app-api-production.up.railway.app/house', {
        name: form.name,
        address: form.address,
        number: Number(form.number),
        price: form.price,
      })
      .then((response) => {
        console.log('response', response)
      })
      .catch((error) => {
        console.error('There was an error creating the house!', error)
      })
  }

  return (
    <>
      <div className="mt-6 flex flex-col">
        <div className="align-center flex justify-between border-b border-zinc-200 pb-5">
          <div className="space-y-1 ">
            <h2 className="text-lg font-medium text-zinc-900">
              Informações dos pontos
            </h2>
            <span className="text-sm text-zinc-500">
              listagem com alguns detalhes dos pontos.
            </span>
          </div>
          <div className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover:blue-800 bg-blue-600">
                  Criar ponto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Criar ponto
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados para criar um novo ponto...
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(handleCreateHouse)}
                  className="flex flex-col gap-4"
                  id="create-house"
                >
                  <label>
                    <span className="mb-1 block text-sm">Nome*</span>
                    <Input
                      placeholder="Digite o nome do imóvel..."
                      className={` ${errors.name && 'border-red-500'}`}
                      {...register('name')}
                    />
                  </label>
                  <label>
                    <span className="mb-1 block text-sm">Endereço*</span>
                    <Input
                      placeholder="Digite o endereço..."
                      className={` ${errors.address && 'border-red-500'}`}
                      {...register('address')}
                    />
                  </label>
                  <label>
                    <span className="mb-1 block text-sm">
                      Número do imóvel*
                    </span>
                    <Input
                      placeholder="Digite o número do imóvel..."
                      className={` ${errors.number && 'border-red-500'}`}
                      {...register('number')}
                    />
                  </label>
                  <label>
                    <span className="mb-1 block text-sm">
                      Valor do aluguel*
                    </span>
                    <Input
                      placeholder="Digite o valor do aluguel..."
                      className={` ${errors.price && 'border-red-500'}`}
                      {...register('price')}
                    />
                  </label>
                </form>
                <DialogFooter className="w-full">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-800"
                    type="submit"
                    form="create-house"
                  >
                    Criar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-5 h-full w-full space-y-6 ">
          {houses.map((house) => (
            <Card
              key={house.id}
              className="flex w-full items-center justify-between"
            >
              <CardHeader className="w-[355px]">
                <CardTitle>{house.name}</CardTitle>
                <CardDescription>{house.number},</CardDescription>
                <CardDescription>{house.address}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(parseFloat(house.price))}
              </CardContent>
              <CardFooter className="flex items-center gap-2 px-3 py-0">
                <Button className="h-12 w-12 bg-blue-600 p-0 hover:bg-blue-800">
                  <Edit className="h-8 w-8 text-white" />
                </Button>
                <Button
                  variant="destructive"
                  className="h-12 w-12  p-0 hover:bg-red-700"
                  onClick={() => handleDeleteHouse(house.id)}
                >
                  <Trash2 className="h-8 w-8 text-white" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
