import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false}),
}));

// createライブラリから関数がzustandインポートされてカスタム ストアが作成されます。

// インターフェイスAuthModalStoreは、ストアの状態の形状を指定するために定義されます。この場合、isOpenブール型のプロパティが 1 つと、状態をそれぞれと に設定する2 つの関数onOpenと があります。onCloseisOpentruefalse

// フックuseAuthModalはコールバック関数を使用して作成されcreate、コールバック関数に渡されます(set) => ({})。引数は、ストアの状態を更新するためsetに によって提供される関数です。zustand

// コールバック関数内では、初期状態オブジェクトが に設定されて定義されisOpenますfalse。

// 関数onOpenが定義されており、呼び出されると、にset設定して状態を更新する関数が呼び出されます。isOpentrue

// 関数onCloseも同様に定義され、isOpenに設定されますfalse。

// フックuseAuthModalは、ストアで定義された状態と関数を含むオブジェクトを返します。これにより、コンポーネントが認証モーダルの状態にアクセスして更新できるようになります。
