'use client'
import { useEffect, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { TabItem } from './TabItem'
import axios from 'axios'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface HousesTypes {
  id: string
  name: string
  address: string
  number: number
  price: string
}

export function SettingsTabs() {
  const [currentTab, setCurrentTab] = useState('tab1')
  const [houses, setHouses] = useState<HousesTypes[]>([])
  console.log(houses)

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

  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
      <Tabs.List className="mt-6 flex w-full items-center gap-4 border-b border-zinc-200">
        <TabItem
          value="tab1"
          title="Lista dos Pontos"
          isSelected={currentTab === 'tab1'}
        />
        <TabItem
          value="tab2"
          title="Alugados"
          isSelected={currentTab === 'tab2'}
        />
        <TabItem
          value="tab3"
          title="Não Alugados"
          isSelected={currentTab === 'tab3'}
        />
        <TabItem
          value="tab4"
          title="Clientes"
          isSelected={currentTab === 'tab4'}
        />
      </Tabs.List>

      <Tabs.Content value="tab1">
        <div className="mt-6 flex flex-col">
          <div className="align-center flex justify-between border-b border-zinc-200 pb-5">
            <div className="space-y-1">
              <h2 className="text-lg font-medium text-zinc-900">
                Informações dos pontos
              </h2>
              <span className="text-sm text-zinc-500">
                listagem com alguns detalhes dos pontos.
              </span>
            </div>
          </div>
          <div className="mt-5 h-full w-full space-y-6">
            {houses.map((house) => (
              <Card key={house.id}>
                <CardHeader>
                  <CardTitle>{house.name}</CardTitle>
                  <CardDescription>{house.address}</CardDescription>
                  <CardDescription>{house.number}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </Tabs.Content>

      <Tabs.Content value="tab2">
        <div className="mt-6 flex flex-col">
          <div className="align-center flex justify-between border-b border-zinc-200 pb-5">
            <div className="space-y-1">
              <h2 className="text-lg font-medium text-zinc-900">
                Informações dos pontos
              </h2>
              <span className="text-sm text-zinc-500">
                Update your photo and personal details
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button">Cancel</button>
              <button type="submit" form="settings">
                Save
              </button>
            </div>
          </div>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  )
}
