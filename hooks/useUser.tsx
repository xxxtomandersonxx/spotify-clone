import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs"
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

import { Subscription, UserDetails } from "@/types";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
};

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext();

  const user = useSupaUser();

  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from('users').select('*').single();
  const getSubscription = () =>
    supabase
      .from('subscription')
      .select('*, prices(*, product(*))')
      .in('status', ['trialing', 'active'])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsLoadingData(false);
        }
      )
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
  };

  return <UserContext.Provider value={value} {...props} />
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider');
  }

  return context;
}

// コードの概要は次のとおりです。

// 必要な依存関係とタイプをインポートします。

// createContext、、、、useContextおよびパッケージuseEffectから。useStatereact
// Userパッケージから @supabase/auth-helpers-nextjs。
// useSessionContextそしてパッケージuseUserから @supabase/auth-helpers-react。
// SubscriptionおよびモジュールUserDetailsから @/types(カスタム タイプ)。
// UserContextTypeユーザー コンテキスト オブジェクトの形状を指定するインターフェイスを定義します。

// UserContextusingを作成しcreateContext、UserContextType初期値として を指定します。

// Propsコンポーネントに渡すことができる props を表すインターフェイスを定義しますMyUserContextProvider。

// MyUserContextProviderユーザー コンテキストの状態を管理し、ユーザーの詳細とサブスクリプション情報を取得するコンポーネントを実装します。props引数として受け取ります。

// 内で、パッケージによって提供されるフックとフックMyUserContextProviderから必要な値を抽出します。useSessionContextuseSupaUser @supabase/auth-helpers-react

// フックを使用して状態変数を設定しますuseState。

// isLoadingDataデータがロードされているかどうかを追跡します。
// userDetailsユーザーの詳細を保存します。
// subscriptionサブスクリプション情報を保存します。
// 2 つのヘルパー関数と を定義します。getUserDetailsこれらgetSubscriptionは、supabaseクライアントを使用してデータベースからユーザーの詳細とサブスクリプション データを取得します。

// フックを使用して、または の状態が変化しuseEffectたときにユーザーの詳細とサブスクリプション情報の非同期フェッチを処理します。ユーザーがログインしていて、必要なデータがまだロードされていない場合は、関数と関数が呼び出されます。データが取得されると、それに応じて状態変数が更新されます。userisLoadingUsergetUserDetailsgetSubscription

// ユーザーがログアウトすると、userDetailsと のsubscription状態が にリセットされますnull。

// valueの値として渡されるオブジェクトを作成しますUserContext.Provider。これには、、、、、、accessTokenおよび状態がuser含まれます。userDetailsisLoadingsubscription

// オブジェクトを値プロパティとしてUserContext.Provider渡して、コンポーネントをレンダリングします。value残りのプロパティを展開してprops、追加の props が確実に転送されるようにしますMyUserContextProvider。

// useUserからコンテキスト値を返すカスタム フックを作成しますUserContext。コンテキスト値が の場合、内で使用する必要があるundefinedことを示すエラーがスローされます。useUserMyUserContextProvider

// このコードは、React アプリケーションでユーザー認証と関連データを管理するための基盤を提供します。ただし、モジュール(カスタム タイプ)だけでなく、 および パッケージ @supabase/auth-helpers-nextjsが存在することを前提としています。このコードを完全に理解して活用するには、必要な依存関係がインストールされていることを確認し、プロジェクト内で Supabase 認証とデータベース統合がどのように機能するかを理解する必要がある場合があります。@supabase/auth - helpers - react@/types
