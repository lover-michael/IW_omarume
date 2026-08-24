/**
 * @abstract 各コンポーネントでの動作ログを一括して管理するためのコンテキストを定義
 *
 */

"use client";

import {
  createContext,
  useState,
  useContext,
  useReducer
} from "react";

export type Log = {
  // ログの内容を表すオブジェクト
  message: string;  // ログのメッセージ
  level: "info" | "warn" | "error";  // ログのレベル
  timestamp: string;  // ログのタイムスタンプ
}

// 現在のセットされているログの状態を確認するためのコンテキスト
const LogContext = createContext<Log[] | undefined>(undefined);
// ログの状態を更新するためのコンテキスト
const LogDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

// ログの状態を管理するためのプロバイダーコンポーネント
export function LogProvider({ children }: { children: React.ReactNode }) {
  // ログをリストとして管理するためユニークな操作を行うためにuseReducerを使用
  const [logs, dispatch] = useReducer(logsReducer, []);

  return (
    <LogContext.Provider value={logs}>
      <LogDispatchContext.Provider value={dispatch}>
        {children}
      </LogDispatchContext.Provider>
    </LogContext.Provider>
  )
}
// ログの状態を更新するためのアクションの型
type Action =
  | { type: "add", log: Log }
  | { type: "clear" }
  | { type: "remove", index: number }

// actionに対応した処理の定義
function logsReducer(logs: Log[], action: Action) {
  switch (action.type) {
    case "add": {
      return [...logs, action.log];
    }
    case "clear": {
      return [];
    }
    case "remove": {
      return logs.filter((_, index) => index !== action.index);
    }
  }
}

// 現在のログの状態を取得するためのカスタムフック
export const useLog = () => {
  const context = useContext(LogContext);
  if(context === undefined) {
    throw new Error("useLog must be used within a LogProvider");
  }
  return context;
}

export const useLogDispatch = () => {
  const context = useContext(LogDispatchContext);
  if (context === undefined) {
    throw new Error("useLogDispatch must be used within a LogProvider");
  }
  return context;
}
