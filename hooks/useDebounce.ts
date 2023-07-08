import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce;

// このカスタムフックはuseDebounce、valueの変更があった場合、指定された遅延時間の後にその値をデバウンスして返します。デバウンスにより、連続して発生する変更を制御し、処理の頻度を制限することができますこれは、入力フィールドのライブ検索など、リクエストや処理の負荷を軽減するために使用される場合があります。

