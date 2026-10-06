"use client";

import { Select, createListCollection, Portal } from "@chakra-ui/react"

type DropdownMenuProps = {
  items: {
    label: string; value: string // 選択対象にアイコンをつける場合を想定
  }[],
  size: { width: string | undefined; height: string | undefined } // ドロップダウンメニューのサイズ
  value: string[]
  onValueChange: (value: string[]) => void // 選択時のコールバック
  placeholder?: string;
}

/**
 * @brief ドロップダウンメニューを表示するコンポーネント
 * @param param0
 * @returns
 */
export const DropdownMenu = ({
  items,
  size = { width: '100%', height: '10%' },
  value,
  onValueChange,
  placeholder,
}: DropdownMenuProps) => {
  // コレクションを作成
  const collection = createListCollection({ items })

  return (
    // コレクションを使ったドロップダウンメニュー
    // サイズはpropsから設定する
    <Select.Root
      w={size.width}
      h={size.height}
      collection={collection}
      value={value}
      onValueChange={(e) => { onValueChange(e.value) }}>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((e) => (
              <Select.Item item={e} key={e.value}>
                {e.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
