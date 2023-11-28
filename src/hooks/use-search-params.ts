import { usePathname, useRouter, useSearchParams as useNextSearchParams } from 'next/navigation';

export const useSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useNextSearchParams();

  const setSearchParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    router.push(`${pathname}?${params.toString()}`);
  };

  const deleteSearchParam = (name: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(name);

    router.push(`${pathname}?${params.toString()}`);
  };

  const getSearchParam = (name: string) => {
    return searchParams.get(name);
  };

  const hasSearchParam = (name: string) => {
    return searchParams.has(name);
  };

  return {
    searchParams,
    setSearchParam,
    deleteSearchParam,
    getSearchParam,
    hasSearchParam,
  };
};
