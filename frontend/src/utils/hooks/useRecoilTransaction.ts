/* eslint-disable camelcase */
import { useRecoilTransaction_UNSTABLE } from 'recoil';

type RecoilTransaction = Parameters<typeof useRecoilTransaction_UNSTABLE>[0];

export type TransactionCreator<T, P extends T[] = T[]> = (...params: P) => RecoilTransaction;

export const useRecoilTransaction = <T, P extends T[]>(fn: TransactionCreator<T, P>, deps: P) =>
	useRecoilTransaction_UNSTABLE(fn(...deps), deps);
