import { Station } from "@/types/timetableTypes";

// input要素にファイルがアップロードされた場合に発火するイベント
export const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  // 選択されたファイル
  const file = event.target.files?.[0];
  // ファイルが選択されていない場合は処理を終了する
  if (!file) return;
  // ファイル読み込み用オブジェクト
  const reader = new FileReader();
  // ファイルの読み込みに成功したときにおこるイベント処理
  reader.onload = async () => {
    // ファイルの内容を取得する
    const csvText = reader.result as string;
    /* CSVテキストを行ごとに分割し、各列を解析する */
    const lines = csvText.split("\n").map((line) => line.trim());
    const data = lines.slice(1, -1); // ヘッダー行をスライスして除去

    const parsedData: Station[] = data.map((line) => {
      // 行をカンマで分割し、各列を解析する
      const [name, hour, minute, day, direction] = line.split(",");
      return {
        name: name,
        hour: parseInt(hour),
        minute: parseInt(minute),
        day: day,
        direction: direction,
      };
    });

    console.log(parsedData);

    const response = await fetch("/api/timetable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedData),
    });

    // レスポンス内容をコンソールで確認
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const errorData = await response.json();
      console.error(errorData);
    }
  };
  // fileの読み込み
  reader.readAsText(file);
};
