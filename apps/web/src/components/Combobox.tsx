"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react";
import { flushSync } from "react-dom";

type props = {
  items: { label: string, value: string }[],  // 選択アイテムの候補
  value: string[],                            // コールバックで変化する変数
  onValueChange: (value: string[]) => void,   // アイテム選択時のコールバック
  placeholder: string,                        // 入力を促す指示
  title: string | null                        // コンボボックスのタイトル
}

/**
 *
 * @param param0
 */
export const ComboboxComponent = ({
  items,
  value,
  onValueChange,
  placeholder,
  title
}: props) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  // 入力値によるフィルタリング処理用関数
  const { startsWith } = useFilter({ sensitivity: "base" });
  // 選択アイテムの作成
  const { collection, filter, reset } = useListCollection({
    initialItems: items,
    filter: startsWith,
  })
  // 仮想スクロール
  const virtualizer = useVirtualizer({
    count: collection.size,
    getScrollElement: () => contentRef.current,
    estimateSize: () => 35,
    overscan: 1,
    scrollPaddingEnd: 32,
  })

  // スクロール制御ハンドラー
  const handleScrollToIndexFn = (details: { index: number }) => {
    flushSync(() => {
      virtualizer.scrollToIndex(details.index, {
        align: "center",
        behavior: "auto",
      })
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-left">{title}</label>
      <Combobox.Root
        collection = { collection }
        onInputValueChange={(e) => filter(e.inputValue)}
        value={value}
        onValueChange={(e) => { onValueChange(e.value) }}
        scrollToIndexFn={handleScrollToIndexFn}
        openOnClick
        width={'full'}
      >
        <Combobox.Control>
          <Combobox.Input placeholder={placeholder} boxShadow={'2xl'}/>
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger />
            <Combobox.Trigger onClick={reset}/>
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content ref={contentRef}>
              <div
                style={{
                  height: `200px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const item = collection.items[virtualItem.index]
                  return (
                    <Combobox.Item
                      key={item.value}
                      item={item}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Combobox.ItemText truncate>
                        { item.label }
                      </Combobox.ItemText>
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  )
                })}
              </div>
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </div>
  )
}
