'use client'
import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'

import { TabItem } from './TabItem'

import { HouseList } from '../ui/house-list'

export function SettingsTabs() {
  const [currentTab, setCurrentTab] = useState('tab1')

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
        <HouseList />
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
